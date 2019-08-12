import {
  BAD_DOGGOS_FAIL,
  BAD_DOGGOS_SUCCESS,
  BAD_DOGGOS,
} from './actions';

const initialState = {
  doggos: [],
  error: '',
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(type, payload);

  switch (type) {
    case BAD_DOGGOS:
      return {
        ...state,
        isLoading: true,
      };
    case BAD_DOGGOS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: 'Please try again later.',
      };
    case BAD_DOGGOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        doggos: payload,
      };
    default:
      return state;
  }
};

export default reducer;
