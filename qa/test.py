import pytest
from validate_url import *

# Demonstrate how the use pytest
def example_func(x):
    return x + 1

def test_example_failure():
    assert example_func(3) == 5

def test_example_success():
    assert example_func(1) == 2

# Example with our function
def test_identity():
    assert validate_url("www.austintexas.gov") == "www.austintexas.gov"

# Write your own tests below
# The names of your functions must be prefixed with "test_" in order for pytest to pick them up.
