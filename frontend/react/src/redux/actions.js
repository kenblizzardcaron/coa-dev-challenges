import axios from 'axios';

export const BAD_DOGGOS = 'BAD_DOGGOS';
export const BAD_DOGGOS_FAIL = 'BAD_DOGGOS_FAIL';
export const BAD_DOGGOS_SUCCESS = 'BAD_DOGGOS_SUCCESS';

// Sync action creators
export const badDoggos = () => ({
  type: BAD_DOGGOS,
  payload: null,
});

export const badDoggosFail = () => ({
  type: BAD_DOGGOS_FAIL,
  payload: null,
});

export const badDoggosSuccess = (res) => ({
  type: BAD_DOGGOS_SUCCESS,
  payload: res,
});

// Thunk action creators
export const fetchBadDoggos = () => dispatch => {
  dispatch(badDoggos());
  //return axios.get('./testData.json')
  return axios.get('https://data.austintexas.gov/resource/h8x4-nvyi.json')
    .then(({ data }) => dispatch(badDoggosSuccess(data)))
    .catch(() => dispatch(badDoggosFail()));
};
