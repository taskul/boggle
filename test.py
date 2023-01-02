from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_home(self):
        with app.test_client() as client:
            res = client.get('/')
            self.assertTrue(len(session['board']) > 0)
            self.assertEqual(res.status_code, 200)
            self.assertEqual(session['number_of_visits'],1)

    def test_add_word(self):
        with app.test_client() as client:
            with client.session_transaction() as sess:
                sess['board'] = [["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"]]
        headers = {
            'content-Type': 'application/json'
        }
        res = client.post('/add-word', headers=headers, data={"message":"CAT"})
        print(res)
        # self.assertEqual(res.json['result'], 'ok')
            
    def test_high_scores(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['score-list'] = [5,3]
            res = client.get('/high-scores')

            self.assertEqual(res.status_code, 200)
            self.assertEqual(session['score-list'][0], 5)




