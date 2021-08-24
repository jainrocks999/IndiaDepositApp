initialstate = {
  isFetching: false,
  UserDetails: [],
  RegisterDetails: [],
  Logout: [],
  MLoginDetails:[],
  AboutUs:[],
  Faq:[],
  Privacy:[],
  Security:[],
  TermCondition:[],
  Trending:[],

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

    case 'Forget_Password_Request':
      return { ...state, isFetching: true };
    case 'Forget_Password_Success':
      return { ...state, isFetching: false };
    case 'Forget_Password_Error':
      return { ...state, isFetching: false };
      
    //Logout
    case 'User_Logout_Request':
      return { ...state, isFetching: true };
    case 'User_Logout_Success':
      return { ...state, isFetching: false, Logout: action.payload };
    case 'User_Logout_Error':
      return { ...state, isFetching: false };

     //About us 
    case 'About_Us_Request':
      return { ...state, isFetching: true };
    case 'About_Us_Success':
      return { ...state, isFetching: false, AboutUs: action.payload };
    case 'About_Us_Error':
    return { ...state, isFetching: false };

    //Faq
    case 'Faq_Request':
      return { ...state, isFetching: true };
    case 'Faq_Success':
      return { ...state, isFetching: false, Faq: action.payload };
    case 'Faq_Error':
    return { ...state, isFetching: false };

    //Privacy
    case 'Privacy_Request':
      return { ...state, isFetching: true };
    case 'Privacy_Success':
      return { ...state, isFetching: false, Privacy: action.payload };
    case 'Privacy_Error':
    return { ...state, isFetching: false };

    //Security
    case 'Security_Request':
      return { ...state, isFetching: true };
    case 'Security_Success':
      return { ...state, isFetching: false, Security: action.payload };
    case 'Security_Error':
    return { ...state, isFetching: false };

    //TermAndCondition
    case 'TermAndCondition_Request':
      return { ...state, isFetching: true };
    case 'TermAndCondition_Success':
      return { ...state, isFetching: false, TermCondition: action.payload };
    case 'TermAndCondition_Error':
    return { ...state, isFetching: false };

   //Trending
   case 'Trending_Request':
    return { ...state, isFetching: true };
  case 'Trending_Success':
    return { ...state, isFetching: false, Trending: action.payload };
  case 'Trending_Error':
  return { ...state, isFetching: false };
    default:
      return state;
  }
};
