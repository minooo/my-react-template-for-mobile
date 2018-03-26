export const actionTypes = {
  USERS: "USERS"
};

// 用户列表
export const getUsers = payload => ({
  type: actionTypes.USERS,
  payload
});
