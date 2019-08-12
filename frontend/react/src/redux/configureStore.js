import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
);

export default function configureStore(preloadedState) {
  return createStore(reducer, preloadedState, enhancer);
}
