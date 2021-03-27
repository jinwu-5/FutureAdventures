const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const authInitialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT: {
      return {
        ...state,
        ...authInitialState,
      };
    }

    default:
      return state;
  }
};

export { authInitialState, authReducer };
