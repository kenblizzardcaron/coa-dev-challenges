# DTIF Dev Frontend Homework using React

## An example using React and Socrata SODA API

### To get started:

- Install dependencies: `yarn`
- Run a local server: `yarn start`
- Find `TODO:`s in the code and build from there.

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Dev Notes

I made a simple redux example from the example, you'll see I moved the axios call to a thunk action. From
there I simply used `react-bootstrap` to display paginated data of the Socrata SODA API. I used the provided
coordinates to make a google maps link of the location. I went ahead and updated react as well so I could
take advantage of hooks.
