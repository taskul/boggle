from boggle import Boggle
from flask import Flask, redirect, request,flash, render_template, session, jsonify

boggle_game = Boggle()

app = Flask(__name__)

app.config['SECRET_KEY'] = 'helloCheesecakeMyOldFriend'

@app.route('/')
def home():
    '''creates a list of characters used for boggle game and adds them to flask session'''
    number_of_trials = session.get('number_of_visits',0)
    board = boggle_game.make_board()
    session['board'] = board
    session['number_of_visits'] = session.get('number_of_visits',0) +1
    return render_template('index.html', game_board=board, game_attempts=number_of_trials)

@app.route('/add-word', methods=['POST'])
def add_word():
    '''recieves user input word from front end through post request.
        Then checks to see if it is a valid word.
        Finally send back a JSON response with a message to front end.
        Front end handles how to proceed based on the message content'''
    word_by_user = request.json['message']
    board = session['board']
    is_this_a_word = boggle_game.check_valid_word(board, word_by_user)
    return jsonify({'result': is_this_a_word})

@app.route('/high-scores')
def high_scores():
    '''Sorts the high score list stored in flask session,
        then renders high score page.'''
    score_list = session.get('score-list', [])
    score_list.sort(reverse=True)
    return render_template('high-scores.html', scores=score_list)

@app.route('/record-score', methods=['POST'])
def record_score():
    '''Gets user score from front end post request.
        Adds user score to a list of high scores.
        Updates number of times user completed the game.
        Updates high score and number of attempts in flask session'''
    score = request.json['score']
    if score > 0:
        score_list = session.get('score-list', [])
        score_list.append(score)
        session['score-list'] = score_list
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)