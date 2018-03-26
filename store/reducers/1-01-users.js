import { actionTypes } from "@actions";

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.USERS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
