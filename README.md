# boggle
![image of boggle game home screen](static/imgs/main.jpg)
## About The Project
**Boggle game is a fun word finding game**
This project was created using Python, JavaScript, CSS and HTML. 
- Backend of the application is created using python module Flask which is a web application framework.
- Fontend is handled with JavaScript and AJAX Javascript library for handling frontend http requests. 
- CSS handles all of the styling of the application.

This project does not use any databases for storage of data. User's scores and number of visits are stored in cookies and handled by flask session

### How to get started with Boggle Game
1. Download the zip file and extract the contents.
2. Using terminal go to the location of the file and open it
3. Create a virtual environment 
  - `python -m venv venv`
4. Activate the virtual environment to containarize installation of required python packages
  - `venv\scripts\activate`
  - you'll know that venv has been activated when you see (venv) infront of your directory path
5. Install required python packages for the poject that are listed in requirements.txt file
  - `pip install -r requirements.txt`
6. Run Boggle game in the terminal window
  - `python app.py`

Running tests
In the terminal while venv is activated
`python -m unittest test_app.py`


## Game Rules:
When the user enters the home page the timer starts counting down from 60 seconds. 
During that time user needs to find any many words as possible by using the letters on the game board cubes. 
- Words must be at least three letters in length.
- Each letter after the first must be a horizontal, vertical, or diagonal neighbor of the one before it.
- No individual letter cube may be used more than once in a word.
- No capitalized or hyphenated words are allowed.
When the timer runs out user score will be sent to backend and will be stored in cookies using flask session.
User can view their scores on a "High Scores" page.
Each time the user visits the page their visit is recorded in cookies using flask session and then displayed in "Number of Trials"

## Feedback messages for the user:
During the game user recieves feedback messages based on the words they enter.
These messages are handled by JavaScript and AJAX Javascript library. 
Each message is set to disapear after 3 seconds. 
- Success! The word user entered does exist and they have not found it previously
- ![image of message to the user - great job](static/imgs/great.jpg)
- Error! The word user entered does not exist on a game board
- ![mimage of message to the user - error](static/imgs/on_board.jpg)
- Error! The word user entered has already been found by user and has been recorded. 
- ![image of message to the user - error](static/imgs/found.jpg)

At the end of the game user also recieves the message that time is up indicating that the game is over. 
User input field and submit buttons are disabled at this time to prevent any further user inputs. 
- ![image of message to the user - time is up](static/imgs/boggle_time_up.jpg)
