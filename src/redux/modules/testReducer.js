const TEST = 'universal-react-redux/test/TEST';
const TEST_SUCCESS = 'universal-react-redux/test/TEST_SUCCESS';
const TEST_FAIL = 'universal-react-redux/test/TEST_FAIL';

const initialState = {
  tested: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        testing: true
      };
    case TEST_SUCCESS:
      return {
        ...state,
        testing: false,
        tested: true,
        testResult: action.result
      };
    case TEST_FAIL:
      return {
        ...state,
        testing: false,
        tested: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function test() {
  return {
    types: [TEST, TEST_SUCCESS, TEST_FAIL],
    promise: (client) => client.get('/test', {
      isAuthenticated: true
    })
  };
}
