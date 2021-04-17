/*
This class stores all the possible word cases within the string and stores a response to the script that the bot will reply to. 
It uses 2D arrays to store the data that the bot will sort through in order to find the proper case.
*/ 
const prompts = [
    //0
    ["im good", "im fine", "im great", "im decent", "im ok", "i am good", "i am fine", "i am great", "i am decent", "i am ok"], //Feeling Good
    //1
    ["im feeling bad", "im terrible", "im awful", "i am not ok", "i am bad", "i am terrible", "i am not great", "i am feeling awful"],  //Feeling bad
    //2
    ["my name is", "im called", "call me", "i am called"],//name (Name recognition needed)
    //3
    ["my order","order number", "number"],//order number
    //4
    ["happy with", "satisfied with", "pleased with", "works well", "loved it"], //likes product, (high sentiment) ([0,4] requires happy with product track)
    //5
    ["told my", "gave it to", "recommended to"], //referred product ([0,5] requires happy with product track)
    //6
    ["want more", "premium", "i want to become a premium customer", "subscribe"], //Wants to become a premium customer ([0,6] requires premium track)
    //7
    ["i don't want to be a premium customer", "unsubscribe", "cancel subscription"], //Cancel premium customer
    //8
    ["not working", "need repairs", "damaged", "does not work", "broken"],  //broken product ([0,8] requires bad product track)
    //9
    ["hate", "dislike","unhappy", "bad quality", "dissatisfied","unsatisfied"], //Unhappy (low sentiment) ([0,9] requires bad product track)
    //10
    ["replace", "exchange"], //replace ([0,10] requires replacement track])
    //11
    ["refund", "money back","reimburse"],  //refund ([0,11] requires refund track)
    //12
    ["executive", "talk with a person", "chat with a person"], // talk to an executive track ([0,12] requires talk to other track])
    //13
    ["do not understand", "confused", "assistance", "assist", "not sure how"], //confused about product ([0,13] requires talk to other track])
    //14
    ["another product","another order","different product","different order", "something else"], //other product
    //15
    ["rate",'rating', 'feedback','report', "thanks for your help", "all done", "no more help needed", "finished talking"], //done talking ([0,15] requires rating track])
    //16
    ["yes", "file complaint", "complaint"] //file a complaint ([0,16] requires complaint track])
]



//Ideal script followed by any default replies
const replies = [
    //0
    ["I am glad to hear that! Could I please get your name?"],  //Feeling Good
    //1
    ["I am very sorry to hear that, I truely hope your day gets better! Could I please get your name?"],  //Feeling bad
    //2
    ["Nice to meet you! Could I get your order number or your issue?"],  //name response
    //3
    ["Got it! How can we assist you with your product?"], //order number response
    //4
    ["We are happy to receive this positive feedback! Could you tell us a bit more about what you liked? Or you can subscribe to become a premium customer?"],  //likes product, (high sentiment) ([0,4] requires good product track)
    //5
    ["Perfect! I'm so glad you liked our product enough to recomend it to another. Could you tell us a bit more about what you liked? Or you can subscribe to become a premium customer?"],  //referred product ([0,5] requires good product track)
    //6
    ["I would love to help you become a premium customer! How long would you like to become a premium customer? We can also tell you our rates or benefits first."],  //Wants to become a premium customer ([0,6] requires premium track)
    //7
    ["We're sorry to hear that you would no longer like to be a premium customer, we will now cancel your benefits right now. What can I help you with now?"], //Cancel premium customer your next payment will be cancelled along with your subscription. May we ask what are you are unsatisfied with?"
    //8 
    ["I am so sorry for your experience. Please enter your order number."],  //broken product ([0,8] requires bad product track)
    //9
    ["I am so sorry for your experience, we want to ensure the highest of qualities of product! How can we fix our mistake?"], //Unhappy (low sentiment) ([0,9] requires bad product track)
    //10
    ["I'm so sorry to hear that your product requires a replacement, could we hear more about what is wrong?"], //replace ([0,10] requires replacement track])
    //11
    ["I'm so sorry to hear that you product needs to be refunded, could you give us more details about what went wrong?"], //refund ([0,11] requires refund track)
    //12
    ["Of course! I know not even a bot as smart as myself can compete with a human. What type of represenative would you like to talk to? We have customer service represenative, or an executive."],  // talk to an executive track ([0,12] requires talk to other track])
    //13
    ["I'm sorry to hear that you've been having trouble with your product, I can't provide specific information but I can refer you to an human to talk to. Please let me know if you'd like to speak to a customer service represenative, an executive or a partnership coordinator."],  // ([0,13] requires talk to other track])"],
    //14
    ["Sure! That works too! Could I get your order number or your issue?"],
    //15
    ["Thank you so much for using our bot, could you give us some feedback? First please give us a rating out of ten."], //done talking ([0,15] requires rating track])
    //16
    ["I'm so sorry to hear you are unhappy with our services! Could you please give us some feedback? "], //file a complaint ([0,16] requires complaint track])
]

const goodProductTrack = [
    //0
    ["another product","another order","different product","different order", "something else"], //other product, done: BACK TO MAIN TRACK
    //1
    ["high quality","happy with", "satisfied with", "pleased with", "works well", "loved it", "good", "great"], //what the client was happy with
    //2
    ["yes","want more", "premium", "i want to become a premium customer", "subscribe", "sure","sign up"], //premium customer (requires premium track)
    //3
    ["no","another time", "dont want", "do not want", "its okay", "no thank"] //client doesn't want
]

const goodProductTrackReplies = [
    //0
    ["Of course! I am happy to help you with something else, how can I assist?"], //other product, done: BACK TO MAIN TRACK
    //1
    ["Thank you for your positive feedback, we value our customer's opinion and your response will be used to improve future products! Would you like to become a premium customer?"],//ask if client wants to become a premium customer
    //2
    ["I would love to help you become a premium customer! How long would you like to become a premium customer? We can also tell you our rates or benefits first."], //(switch to premium track)
    //3
    ["Maybe another time! How else may I assist you?"] // done: back to main
]

const premiumTrack = [
    //0
    ["rates","benefits","tell me", "more info"], // client ask about rates/benefits
    //1
    ["yes", "sure", "sign me up", "sign up"],
    //2
    ["monthly","month"],
    //3
    ["yearly","year", "annual"],
    //4
    ["no","another time", "dont want", "do not want", "its okay", "no thank"],
    //5
    ["another product","another order","different product","different order", "something else"] //other product, done: BACK TO MAIN TRACK
]

const premiumTrackReplies = [
    //0
    ["Our premium members enjoy 10% off on all purchases, and earn twice the number of points on every dollar spent! We also offer free delivery! Members can subscribe monthly for $9.99/month, and we also offer an annual subscription for $70.99! Would you like to subscribe?"], //information about plan 
    //1
    ["Awesome! How long would you like to become a member for? You can sign up for a monthly subscription for $9.99/month, or enjoy almost 40% off if you choose our annual subscription plan valued at $5.99/month!"],
    //2
    ["Monthly plan: You can choose to immediately pay through our PayPal portal, or you will be charged automatically within 48 hours through your account's preffered method of payment. How else may I assist you?"],//print paypal thing here
    //3
    ["Yearly plan: You can choose to immediately pay through our PayPal portal, or you will be charged automatically within 48 hours through your account's preffered method of payment. How else may I assist you?"],//print paypal thing here
    //4
    ["Maybe another time! How else may I assist you?"],
    //5
    ["Of course! I am happy to help you with something else, how can I assist?"] //other product, done: BACK TO MAIN TRACK
]

const badProductTrack = [
    //0
    ["my order","order number"],//order number
    //1
    ["refund", "money back","reimburse"],  //refund ([0,11] requires refund track)
    //2
    ["replace", "exchange"], //replace ([0,10] requires replacement track])
    //3
    ["no","another time", "dont want", "do not want", "its okay", "no thank"],
    //4
    ["another product","another order","different product","different order", "something else"], //other product, done: BACK TO MAIN TRACK
]

const badProductTrackReplies = [
    //0
    ["Thank you for letting us know, we will look into this issue. Could we offer you a refund or a replacement for this product?"], //order number recieved
    //1
    ["Certainly. Would you like your reimbursement in the form of store points, or directly deposited back to your account's preferred payment method?"], // switch to refund track
    //2
    ["Certainly. Your new product wil be shipped to you in 5-10 business days. How else can I assist you?"],//done, back to main
    //3
    ["I'm sorry that we could not help you with this problem. How else can I assist you?"],//done, back to main
    //4
    ["Of course! I am happy to help you with something else, how can I assist?"] //other product, done: BACK TO MAIN TRACK

]

const replacementTrack = [
    //0
    ["not working", "need repairs", "damaged", "does not work", "broken", "hate", 
    "dislike","unhappy", "bad quality", "dissatisfied","unsatisfied", "bad quality", "not functional"],//client explaining what's wrong with the product
    //1
    ["yes", "sure", "please", "of course"],//customer wants replacement
    //2
    ["no","another time", "dont want", "do not want", "its okay", "no thank"],//customer dont want replacement
    //3
    ["another product","another order","different product","different order", "something else"] //other product, done: BACK TO MAIN TRACK

]

const replacementTrackReplies = [
    //0
    ["Thank you for letting us know, we will look into this matter. Can I confirm with you one more time that you'd like a replacement?"],// replacement confirmation
    //1
    ["Certainly. The replacement product will arrive within 5-10 business days. How else can I assist you today?"],//replacement sent, back to main
    //2
    ["I'm sorry that we could not help you with this problem. How else can I assist you?"], //done, back to main
    //3
    ["Of course! I am happy to help you with something else, how can I assist?"] //other product, done: BACK TO MAIN TRACK
]

const refundTrack = [
    //0
    ["not working", "need repairs", "damaged", "does not work", "broken", "hate", 
    "dislike","unhappy", "bad quality", "dissatisfied","unsatisfied", "bad quality", "not functional"],//client explaining what's wrong with the product
    //1
    ["yes", "sure", "please", "of course"],//customer wants refund
    //2
    ["no","another time", "dont want", "do not want", "its okay", "no thank"],//customer dont want replacement
    //3
    ["store points", "points", "store credit", "point"], //store point option
    //4
    ["direct deposit", "bank", "credit card", "debit card", "payment method", "original"],//direct deposit option
    //5
    ["another product","another order","different product","different order", "something else"] //other product, done: BACK TO MAIN TRACK
]

const refundTrackReplies = [
    //0
    ["Thank you for letting us know, we will look into this matter. Can I confirm with you one more time that you'd like a refund?"],// replacement confirmation
    //1
    ["Certainly. Would you like your reimbursement in the form of store points, or directly deposited back to your account's preferred payment method?"],//checking refund method
    //2
    ["I'm sorry that we could not help you with this problem. How else can I assist you?"], //done, back to main
    //3
    ["Certainly, you have been refunded for your product in the form of store points. Your balance will be updated within 24 hours. How else can I assist you?"], //back to main
    //4
    ["Certainly, you have been refunded for your product through your preferred method of payment. Your balance will be updated within 24 hours. How else can I assist you?"], //back to main
    //5
    ["Of course! I am happy to help you with something else, how can I assist you?"] //other product, done: BACK TO MAIN TRACK
]

const talkToOtherTrack = [
    //0
    ["customer representative", "agent", "customer", "rep"],// talk to lower agent
    //1
    ["executive", "manager", "boss"],//talk to executive
    //2
    ["another product","another order","different product","different order", "something else"] //other product, done: BACK TO MAIN TRACK
]

const talkToOtherTrackReplies = [
    //0
    ["Certainly, a customer representative will be in touch shortly through your account's preferred contact method. You could also visit us during office hours at 1555 Banks Rd, Kelowna, BC V1X 7Y8. How else can I assist you?"],//back to main
    //1
    ["Certainly, an executive will be in touch shortly through your account's preferred contact method. You could also visit us during office hours at 1555 Banks Rd, Kelowna, BC V1X 7Y8. How else can I assist you?"],//back to main
    ///2
    ["Of course! I am happy to help you with something else, how can I assist?"] //other product, done: BACK TO MAIN TRACK
]

const ratingTrack = [
    //0
    ["another product","another order","different product","different order", "something else"], //other product, done: BACK TO MAIN TRACK
    //1
    ["0","1", "2", "3", "4", "zero", "one", "two", "three", "four"], //bad rating
    //2
    ["5", "6", "7", "five", "six", "seven"], //decent rating
    //3
    ["8", "9", "10", "eight", "nine", "ten"], //good rating
    //4
    ["11", "12", "eleven", "twelve"], //insane rating
    //5
    ["hate", "dislike","unhappy", "bad", "dissatisfied","unsatisfied", "not help"], //bad feedback (low sentiment)
    //6
    ["happy", "satisfied", "pleased", "works well", "loved","helped","loved","friendly"], //likes product, (high sentiment) ([0,4] requires happy with product track)
]

const ratingTrackReplies = [
    //0
    ["Of course! I am happy to help you with something else, how can I assist?"], //other product, done: BACK TO MAIN TRACK
    //1
    ["We are so sorry that you have had a negative experience with me. Could you give some specifics and details please?"], //bad rating
    //2
    ["Thank you for your feedback, it still seems we have some work to do. Could you tell me what I could improve upon?"],  //decent rating
    //3
    ["Thank you so much for that rating! We love to hear that you appreciate our service. Could you tell me what I did right?"],  //good rating
    //4
    ["WOW! Does not compute, that's such a high rating thank you so much! We love to hear that you appreciate our service. Could you tell me what I did right?"], //insane rating
    //5
    ["I'm so sorry to hear this, this feedback will be taken in right away. Thank you for your help. How else can I assist you?"], //bad feedback, done: BACK TO MAIN TRACK
    //6
    ["Thank you for your kind words! I'm blushing! We love to hear your feedback and I will take this into our system, thank you! How else can I assist you?"], //good feedback, done: BACK TO MAIN TRACK
]

const complaintTrack = [
    //0
    ["not working", "need repairs", "damaged", "does not work", "broken", "hate", 
    "dislike","unhappy", "bad quality", "dissatisfied","unsatisfied", "bad quality", "not functional",
    "frustrating, confusing, doesn't make sense, bad, terrible, unbelievable, horrendous, buggy"],
    //1
    ["yes", "sure", "please", "of course"],//yes send confirmation email
    //2
    ["no","another time", "dont want", "do not want", "its okay", "no thank"],//customer dont want replacement
    //3
    ["another product","another order","different product","different order", "something else"], //other product, done: BACK TO MAIN TRACK
]

const complaintTrackReplies = [
    //0
    ["I'm so sorry to hear this, your response has been submitted and we are working as quickly as we can to resolve this issue. Would you like to receive a confirmation email of this formal complaint?"]//receive notifications on formal complaint?
    //1
    ["Certainly, you will receive a confirmation email along with your complaint id within the next few minutes. How else may I assist you?"],//done, back to main'
    //2
    ["Once again, I'm very sorry for your experience. You are a valued customer and we are working hard to resolve this issue. How else may I assist you?"],//done, back to main
    //3
    ["Of course! I am happy to help you with something else, how can I assist?"], //other product, done: BACK TO MAIN TRACK
]

const outsidePrompts = [
    //1
    ["covid", "corona", "conoravirus", "covid19", "covid 19", "pandemic"], // covid topic
    //2
    ["i love you"],// client tries flirting with the bot
    //3
    ["whats your name", "what are you called", "your name","what do you call yourself"], // ask for bot's name
    //4
    ["how are you", "how is your day", "how is it going", "how is life"], // awkward small talk
    //5
    ["tell me something funny", "tell me a joke", "joke", "funny", "make me laugh"] // jokes
]



//Ideal script followed by any default replies
const outsideReplies = [  
    //1  
    ["The pandemic has been tough on everyone and we hear you. We're working our best to still deliver satisfactory virtual assistance - that's why I exist!", 
    "Due to the pandemic, we are limiting in person services to keep you and our employees safe! So sorry for any inconvenience!", 
    "To help lighten the workload for our employees during the pandemic, some of our operations have been delegated to me!",
    "Remember to wear a mask! Contagion probability reduces to 1.5% if everyone wore a mask!",
    "These are scary times, but we're in this together!"],  // covid 19
    //2
    ["Sorry! As a chatbot, I'm not capable of feelings, but you're a great friend!",
    "This is awkward...",
    "I appreciate it! If I were not just a collection of code, I probably would love you too! Probably.",
    "Nice! Thanks!",
    "Oh wow, that's really sweet!"], // client tries flirting with the bot
    //3
    ["I was not given a name, you can call me whatever you want!", 
    "I don't have one. Could I have yours?",
    "My creator did not give me one, but for a while they thought naming me Jerolt would be good!"], // ask for bots name
    //4
    ["I'm doing great! Thanks for asking!", 
    "I'm very happy to be talking with you!", 
    "I'm having a blast! I love existing!"], // awkward small talk
    //5
    ["what is a frog's favourite drink? a Croakacola!", 
    "I hate Russian dolls, they're so full of themselves.", 
    "What do you call a farm that makes bad jokes? Corny!", 
    "What do you call it when one cow spies on another? A steak out!",
    "What do you call a fish with no eye? Fssshh."
    ]// jokes
]