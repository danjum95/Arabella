export const addUserInfo = userInfo => (
  {
    type: 'ADD_USER_INFO',
    payload: userInfo,
  }
);

export const addUserRole = userRole => (
  {
    type: 'ADD_USER_ROLE',
    payload: userRole,
  }
);

export const addUserSchool = userSchool => (
  {
    type: 'ADD_USER_SCHOOL',
    payload: userSchool,
  }
);