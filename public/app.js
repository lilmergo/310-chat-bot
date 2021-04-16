var globalPrompts;//current prompt track
var globalReplies;//current reply track

//event listener for user input
document.addEventListener("DOMContentLoaded", function getInput() {//when page is fully loaded, call function getInput
    //initially assign global prompts and replies to default track
    globalPrompts = prompts;
    globalReplies = replies;

    var userField = document.getElementById("input");//identify text input field
    addChat('', 'Hi! Thank you for choosing our store. How are you doing today?');
    userField.addEventListener("keydown", event => {
        if (event.keyCode == 13) {//if enter keydown detected
            var userInput = userField.value; //grab user input
            //clean input
            var cleanedInput = clean(userInput);
            //compare input, save reply, then switch tracks if neccessary
            $.ajax({
                type: 'POST',
                url: '/message',
                dataType: "JSON",
                async: false,
                data: { cleanedInput }, //Sends input to server for NLP process
                success: function (response) {
                    cleanedInput = JSON.stringify(response); // replaces cleaned input with new unclean JSON string from server
                    cleanedInput = cleanedInput.substring(cleanedInput.indexOf(':') + 2, cleanedInput.lastIndexOf('"'));
                    console.log("Recieved JSON from server: " + cleanedInput)
                },
                error: function () {
                }
            });
            var botReply = compare(globalPrompts, globalReplies, cleanedInput);

            if (botReply === "") { // if no bot reply found
                //find outside topic reponses
                botReply = compare(outsidePrompts, outsideReplies, cleanedInput);
                if (botReply === "") { // if bot is unable to respond to outside topic
                    botReply = "I'm sorry, I didn't quite get that. Maybe try asking different topic.";
                }
            }
            //addchat
            addChat(userInput, botReply);
            userField.value = null;//reset the user input field
        }
    })
})


//cleaning up user input and trying to match it to a prompt in our script with compare(). Then replying with a response with write()
function clean(userInput) {
    var cleanedInput = userInput;

    //lowercase input
    cleanedInput = cleanedInput.toLowerCase();
    //remove unecessary white spaces
    cleanedInput = cleanedInput.trim();
    //remove non alphabetical characters (all prompts are purely alphabetical)
    cleanedInput = cleanedInput.replace(/[^\w\s]/gi, '');

    // find a bot reply based on user input
    /*var reply = compare(prompts, replies, cleanedInput);
    if (reply === "") { // if no bot reply found
        //find outside topic reponses
        reply = compare(outsidePrompts, outsideReplies, cleanedInput);
        if (reply === "") { // if bot is unable to respond to outside topic
            reply = "I'm sorry, I didn't quite get that. Maybe try asking different topic.";
        }
    }
    */
    return cleanedInput;
}
module.exports = clean;

function compare(arrayPrompt, arrayReplies, string) {
    let reply = "";
    let foundReply = false;
    for (let x = 0; x < arrayPrompt.length; x++) {
        for (let y = 0; y < arrayPrompt[x].length; y++) {
            if (string.includes(arrayPrompt[x][y])) {
                let replies = arrayReplies[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                switchTracks(x, globalPrompts);
                foundReply = true;
                //no need to go through all the prompts, break from loop once a match is found
                break;
            }
        }
        if (foundReply) {
            // break from outer loop as well once a respond is found 
            break;
        }
    }
    return reply;
}

function addChat(userMessage, botMessage) {
    const messagesContainer = document.getElementById("messages");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.style.textAlign = "right";
    userDiv.style.backgroundColor = "#f2f2f2";
    userDiv.innerHTML += userMessage;

    messagesContainer.appendChild(userDiv);


    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "bot response";
    botText.innerHTML = "Typing...";
    botDiv.appendChild(botText);

    var delaytime = 1000; //1 second

    setTimeout(function () {
        botText.innerHTML = "Bot: " + botMessage;
        botDiv.appendChild(botText);
        messagesContainer.appendChild(botDiv);
    }, delaytime);

    //keeps most recent messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
}

function switchTracks(x, track) {//check if current track need to be switched based on user prompt
    if (track == prompts) {
        if (x == 4) {
            globalPrompts = goodProductTrack;
            globalReplies = goodProductTrackReplies
        } else if (x == 6) {
            globalPrompts = premiumTrack;
            globalReplies = premiumTrackReplies;
        }
        else if (x == 8 || x == 9) {
            globalPrompts = badProductTrack;
            globalReplies = badProductTrackReplies;
        }
        else if (x == 10) {
            globalPrompts = replacementTrack;
            globalReplies = replacementTrackReplies;
        }
        else if (x == 11) {
            globalPrompts = refundTrack;
            globalReplies = refundTrackReplies;
        }
        else if (x == 12 || x == 13) {
            globalPrompts = talkToOtherTrack;
            globalReplies = talkToOtherTrackReplies
        }
        else if (x == 14) {
            globalPrompts = prompts;
            globalReplies = replies;
        }
        else if (x == 15) {
            globalPrompts = ratingTrack;
            globalPrompts = ratingTrackReplies
        }
        else if (x == 16) {
            globalPrompts = complaintTrack;
            globalReplies = complaintTrackReplies;
        }
    } else if (track == goodProductTrack) {
        if (x == 0 || x == 3) {
            globalPrompts = prompts;
            globalReplies = replies;
        }
        if (x == 2) {
            globalPrompts = premiumTrack;
            globalReplies = premiumTrackReplies;
        }
    }
    else if (track == premiumTrack) {
        if (x == 2) {//add paypal buttons with monthly payment value 9.99
            paypal.Buttons({
                createOrder: function (data, actions) {
                    // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '9.99'
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then(function (details) {
                        // This function shows a transaction success message to your buyer.
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        document.getElementById("paypal-button-container").style.display = "none";//hide buttons once transaction is complete
                    });
                }
            }).render('#paypal-button-container');
        }
        else if (x == 3) {//add paypal buttons with annual payment for 12*5.99=71.88
            paypal.Buttons({
                createOrder: function (data, actions) {
                    // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '71.88'
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then(function (details) {
                        // This function shows a transaction success message to your buyer.
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        document.getElementById("paypal-button-container").style.display = "none";//hide buttons once transaction is complete
                    });
                }
            }).render('#paypal-button-container');
        }
        if (x == 2 || x == 3 || x == 4 || x == 5) {
            globalPrompts = prompts;
            globalReplies = replies;
        }

    }
    else if (track == badProductTrack) {
        if (x == 2 || x == 3 || x == 4) {
            globalPrompts = prompts;
            globalReplies = replies;
        }
        else if (x == 1) {
            globalPrompts = refundTrack;
            globalReplies = refundTrackReplies;
        }
    } else if (track == replacementTrack) {
        if (x == 1 || x == 2 || x == 3) {
            globalPrompts = prompts;
            globalReplies = replies;
        }
    } else if (track == refundTrack) {
        if (x == 2 || x == 3 || x == 4 || x == 5) {
            globalPrompts = prompts;
            globalReplies = replies;
        }
    } else if (track == talkToOtherTrack) {
        if (x == 0 || x == 1 || x == 2) {
            globalPrompts = prompts;
            globalReplies = replies;
        }
    } else if (track == ratingTrack) {
        if (x == 0 || x == 5 || x == 6) {
            globalPrompts = prompts;
            globalReplies = replies;
        }
    } else if (track == complaintTrack) {
        if (x == 1 || x == 2 || x == 3) {
            globalPrompts = prompts;
            globalReplies = replies;
        }
    }



}
