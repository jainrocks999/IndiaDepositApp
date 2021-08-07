initialstate = {
  isFetching: false,
  UserDetails: [],
  RegisterDetails: [],
  Logout: [],
  MLoginDetails:[],

};
export default (state = initialstate, action) => {
  switch (action.type) {
    //Login
    case 'User_Login_Request':
      return { ...state, isFetching: true };
    case 'User_Login_Success':
      return { ...state, isFetching: false, UserDetails: action.payload };
    case 'User_Login_Error':
      return { ...state, isFetching: false };

    case 'User_MLogin_Request':
      return { ...state, isFetching: true };
    case 'User_MLogin_Success':
      return { ...state, isFetching: false, MLoginDetails: action.payload };
    case 'User_MLogin_Error':
      return { ...state, isFetching: false };

    //Register
    case 'User_Register_Request':
      return { ...state, isFetching: true };
    case 'User_Register_Success':
      return { ...state, isFetching: false, RegisterDetails: action.payload };
    case 'User_Register_Error':
      return { ...state, isFetching: false };
    //Logout
    case 'User_Logout_Request':
      return { ...state, isFetching: true };
    case 'User_Logout_Success':
      return { ...state, isFetching: false, Logout: action.payload };
    case 'User_Logout_Error':
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
