import json
import unittest
import sys
import requests
import pytest

sys.path.append(".")

from data.connection import connect
from data import connection

class Api(unittest.TestCase):
    def setUp(self):
        self.db = connect()
        self.connection = connection

    def test_hello(self):
        response = requests.get("http://localhost:5000")
        self.assertEqual(response.status_code, 200)
