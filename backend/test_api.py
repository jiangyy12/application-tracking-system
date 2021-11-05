import json
import unittest
import sys
import app
import requests
import pytest

sys.path.append(".")

from data.connection import connect
from data import connection

class Api(unittest.TestCase):

    # def setUp(self):
    #     self.db = connect()
    #     self.connection = connection
    #
    # def test_hello(self):
    #     response = requests.get('http://localhost:5000')
    #     self.assertEqual(response.status_code, 200)

    def setUp(self):
        self.app = app.app.test_client()
        self.app.testing = True

    def test_hello(self):
        home = self.app.get('/')
        self.assertIn('Hello World!', str(home.data))


if __name__ == "__main__":
    unittest.main()