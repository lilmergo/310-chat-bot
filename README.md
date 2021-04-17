# COSC 310 - Project Repository. Customer Service Chatbot.
Our respository for the COSC 310 Assignments/Project for group 21.

Members include Joshua Medina-Quiaro, Ramisa Mahboob, Fareeha Hayat, Shreyasi Chauhan, and Megan Nguyen.

[Assignment 2 Documentation](#assignment-2-documentation)

[Assignment 3 Documentation](#assignment-3-readme-documentation)

### How to run the program:
To run the program, download the repository and type node server.js within the console to launch the client on localhost:8080. Visit in your preferred browser (we used Chrome).

# Documentation for Individual Project
## APIs used
### PayPal  API  (sandbox  only)
I chose this API to make the transaction of becoming a premium customer more realistic. The user is given the option to complete payment with a Paypal button once they agree to either a monthly or an annual payment. The Paypal button renders when user says yes to becoming a premium customer, and payment amount for their checkout will be automatically set to either $9.99 or $71.88 depending on whether they chose a monthly or a yearly subscription. Once the transaction is subbmited, this payment shows up in the client's and merchant's sandbox account, and the buttons disappear from the page

### Google Static Maps API 
I chose this API to provide more visual information to the user, a map showing the business's 'office location' will be displayed when the user asks for contact information of an agent/executive. For future implementation, I would like to implement more APIs to collect the user's actual address and route them to the nearest office on an interactive map.

# Assignment 3 README Documentation

### Link to the Presentation (A3):
https://drive.google.com/file/d/1L-itEHEDi_JCdrWF3VKpFtjZxbjrETAH/view?usp=sharing

## Branching Structure:
![Branching Structure](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/BranchingStructure.png)

## Features:
### Text Track Switching: 
The script is now effectively doubled and handles switching the users between "tracks" of dialogue in order to gain a better understanding of their needs and to created understanding of the specific information they are trying to achieve based on the current "flow" of the conversation. This will create a better illusion of understanding for the user.
#### Example Output:
![Track Switching](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/Track.PNG)

### Second Topic (Premium User): 
The script now has a second topic of allowing the user to subcribe through the bot to a premium service offered by the company. This creates a wider range of topics the user can talk about to the bot. Along with this are some alternate topics the bot can cover.
#### Example Output:
![Topic 2](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/Topic2.PNG)

### NLP Sentiment Analysis: 
This feature allows the bot to understand the sentiment of the user in any given message. It will tell the bot in certain scenarios to give once answers over another in order to increase understandability of the bot.
#### Example Output:
![Sentiment](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/SentimentAnalysis.PNG)

### NLP Spelling Mistake Correction: 
This feature will correct user spelling mistakes in order to allow the user to be less specific and consistent with their spelling. This will improve the system to allow less errors of understandings in the conversation.
#### Example Output:
![Spelling Correction](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/Spelling.PNG)

### NLP Named Entity Recognition: 
This feature will allow the bot to understand names and places of entites the user is talking about. This will improve the system and conversation in order to make the bot able to recognize specific keywords and use them within conversation.
#### Example Output:
![NLPNER](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/NamedEntity.PNG)

## Level 0 DFD:
![Level 0 DFD](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/Level0_Version1.JPG)

### Description:
This diagram shows the data flow between the 0 level components of our bot. Within you can see a very simplified representation of the data flow of the user chatting back and forth to the chat bot which takes its responses from words.js. The data flows from the user to the bot which flows to the words.js back to the bot which sends an output to the user.

## Level 1 DFD:
![Level 1 DFD](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/dfd1.JPG)

### Description:
The level 1 DFD highlights the processes and data stores that are used for the chatbot implementation.
Each data flow into and out of the system is highlighted with their paths. The user input is collected using GUI which flows into a process called “clean input” where the user’s input is altered by removing non-alphabetical characters. The input is then processed to check spelling mistakes using NLP implementation. The input is further passed into another process called “sentiment analyzer” that also uses NLP. Finally, the input is sent to a process where it’s compared using a database. The received response after comparison is sent back to GUI and which sends output to user.

## Sample Output:
![Sample Output](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/A3Output1.PNG)
![Sample Output](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/A3Output2.PNG)
![Sample Output](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/A3Output3.PNG)
![Sample Output](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/A3Output4.PNG)
![Sample Output](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/A3Output5.PNG)
![Sample Output](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/A3Output6.PNG)
![Sample Output](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/A3Output7.PNG)
![Sample Output](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/A3Output8.PNG)


## Limitations:
The limitations of our program are large as most of it feigns responsiveness but since the previous assignment we have reimplemented our text system and added nlp libraries that help narrow down the users intentions. Yet we still have some limitations, some general case limitations are:

 - Specific informational queries cannot be answered as no actual product is shown
 - Handles synonyms to a certain extent
 - Specific nouns are feigned to be learned but are not actually recognized
 - Multiple questions do not work
 - Cannot gauge complex questions.
 - Unaware of true user intent, feigns knowledge.

## Limitations Output:
Handles synonyms to a certain extent
![Limitations1](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/Limitations1.PNG)
Multiple questions do not work
![Limitations2](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/Limitations2.PNG)

## Features that could be extracted into an API:
- Compare Method: With some tweaking, our comparing method that searches the arrays for the proper string that matches the user's input could be very valuable in an API format. With some tweaking it could be able to search arrays and find the corresponding responses quickly and easily.
- Add chat method: Used to publish chat messages onto an HTML chat window, our addchat method could be implemented into an API in order to help others similarly add messages or constant outputs to their HTML pages through javascript.
- Words.js: A huge complitation of customer service sentences that could be utilized very effectively for a API and tweaked for other programs. It is a large undertaking and the double array method of finding statements could be beneficial to those not familar with other data structures.
- Front/Back End Methods: These methods allow the user to create a local site using express.js and communicate with a back end server in order to hide responses from the user. This implemenation would be used into an API with dependencies to quickly and easily host a frontend and backend setup.
- Set timeout: Our settime out function is relatively simple but has massive benefits for anyone who needs to implement a chabot that has implied consiousness such as ours. It allows the chat bot to have a timeout before replying so it feels as if you are talking to a person or bot that actually ponders a reply.

## Test Cases Documentation Document:
https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/UnitTestDocumentation.txt

#
#
#
#
#
#

# Assignment 2 Documentation

### Link to the Presentation (A2):
https://drive.google.com/file/d/1GBU4GQIVI5s4NGTmxxGdJdIVavXHbXqI/view?usp=sharing

# Assignment 2 Class Breakdown:

## App.js: 
This class is the main class that will handle the bots main functionality. It listens to the document for user inputs and will generate the proper actions in receiving and appending text to the chat bot, it will call words.js in order to find what messages to reply as. Functions included in app.js are:

### read(userInput)
This function cleans up the user input and tries to find a match in our prompts array with compare(). Once a match is found, it outputs the reply with addchat().

### compare(arrayPrompt, arrayReplies, string)
This function takes a string and tries to find a match in arrayPrompt. Once a match is found, the functions returns a corresponding reply from arrayReplies.

### addChat(userMessage, botMessage)
This function prints the message typed by the user as well as the response from the bot.


## Words.js
This class is responsible for holding the datastructure of the prompt words and responses for each sequence. It contains an order 2-D list of prompts and responses and as well will hold the default responses to null prompt statements. This essentialy contains two arrays - prompts and responses. Prompts consists of all the possible phrases that the user might enter. 

# Project Waterfall Development Plan:

## Description:
Our group has decided on creating a chatbot that focuses on customer satisfaction. The chatbot is intended to be deployed on web stores to gather customer feedback on their experience of the goods/services received. The chatbot should be able to mimic an understanding of what the customer is expressing and respond accordingly (i.e display a sympathetic tone when receiving a complaint from the customer) as well as offer to carry out appropriate actions (direct customer to related FAQ section, offer to file a complaint, connect customer to a live agent, etc.)

https://github.com/COSC310-Group21/project

## SDLC: Waterfall
The key aspect of a waterfall model is gathering all the requirements at the beginning of the project, allowing every other phase to be planned without further customer correspondence until the product is complete. Since the customer service bot we are developing is a relatively simple one and we already know the deliverables we can easily use a sequential development model. 

### Phase 0: Project Plan
- Description
- SDLC
  - List phases
  - List tasks
- WBS
- Gantt Chart

### Phase 1: Requirements
- Gather user requirements
- Gather system requirements
- Gather resource requirements

### Phase 2: System Design Plans
- Create chat-bot flow structure
  - Find general cases to lead to other
  - Cases that lead to a default ending
- Create class breakdown

### Phase 3: Implementation 
- Code in classes 
- Create methods for classes
- Code implementation for base chat-bot structure
  - Comment code

### Phase 4: Integration, Testing
- Code reviews to find any potential errors within
- Test program using edge cases and general conversation
  - Fix where unknown breaks are found

## WBS:
This breakdown structure shows the amount of hours each team member put into the project in our various phases. You can see here we have different categories of work within from the initial planning stages onto the coding and testing of the bot program.

![Work Breakdown Structure](https://github.com/COSC310-Group21/310-chat-bot/blob/main/DocumentationIMGS/Work%20Breakdown%20Structure%402x.png)

## Gantt Chart:

![The first section of the Gantt Chart](https://user-images.githubusercontent.com/60419500/110990210-425d1f00-8330-11eb-8bc7-0c4b3b66f177.PNG)
![The second section of the Gantt Chart](https://user-images.githubusercontent.com/60419500/110990212-42f5b580-8330-11eb-901e-144f9686f90a.png)

This chart was created with our task list within Trello where we have used the labels as milestones that are all dependent on each other in order to follow our plan based project. The milestones go in order of green-> yellow -> orange  -> red -> purple in gradient order. The milestones made in our plan also act as dependencies for the next task as they are in order. Off of this we assigned people to each task and within Trello we can organize the tasks of each member.


## Limitations:
The limitations of our program are very vast as most of it feigns responsiveness. Some general case limitations are:
 - Specific informational queries cannot be answered as no actual product is shown
 - Spelling mistakes cannot be accounted for
 - Handles synonyms to a certain extent
 - Specific nouns are feigned to be learned but are not actually recognized
 - Multiple questions do not work
 - Queries with mutiple emotions do not work (I am disappointed with this product even though my sister is happy with it)

## Sample Output: 

![1](https://user-images.githubusercontent.com/60419500/111050770-d51ebc00-840b-11eb-8fb1-8c2bb6dbcff7.PNG)
![2](https://user-images.githubusercontent.com/60419500/111050771-d5b75280-840b-11eb-8a7c-772be609d949.PNG)
![3](https://user-images.githubusercontent.com/60419500/111050772-d5b75280-840b-11eb-8f2a-d0358324f266.PNG)
![4](https://user-images.githubusercontent.com/60419500/111050773-d5b75280-840b-11eb-8163-05e47e346336.PNG)
![5](https://user-images.githubusercontent.com/60419500/111050774-d64fe900-840b-11eb-80fd-52b715539381.PNG)

## Limitations Output:

![Limitations 1](https://user-images.githubusercontent.com/60419500/111050792-ec5da980-840b-11eb-94d2-c831a30fdc5b.png)
![Limitations 2](https://user-images.githubusercontent.com/60419500/111050791-ebc51300-840b-11eb-9bf9-80e86b4a8594.png)

## Meeting Times:

M1) Monday . . . February 22, 2021 12:00 PM - 2:00 PM
- Discussed project and decided who would work on which parts of plan
- Learned CASE tools and how to create our chat bot
- Wrote Project Plan Description
- Wrote SDLC Description
- Created the tasks for our Trello

M2) Wednesday . . . February 24, 2021 2:00 PM- 3:30 PM
- Created our Gantt chart off of our Trello and organized it
- Created Java project, and repository
- Writing classes for project

M3) Sunday . . . February 28, 2021 1:00 PM - 3:30 PM

- Created class breakdown structure
- Coded class structure
- Wrote bot script https://docs.google.com/document/d/1zeG5EIxBwp9Zs1pyxpFQ05yKEaw1mAj2MkaP1VBdMvI/edit
- Created proper README

M4) Wednesday . . . March 3, 2021 2:00 PM - 3:00 PM
- OpenNLP Maven setup

M5) Wednesday . . . March 10, 2021 2:00 PM - 4:00 PM
- Revamped program to be HTML Javascript imbedded
- Created new file structure and class structure for new setup
- Planned full scale and flow of bot
- Created event listener for user input
- Added read function to app.js
- Added compare function to app.js
- Started adding to words.js
- Finished writing bot script 


M6) Friday . . . March 12, 2021 10:10 AM - 8:00 PM
- Formatted the chat containers in the HTML and CSS files
- Fixed the image position on CSS 
- Edited read function 
- Edited addChat function
- Completed words.js
- Updated README
- Finished Work Breakdown Structure
