initialstate = {
  isFetching: false,
  UserDetails: [],
  RegisterDetails: [],
  Logout: [],
  MLoginDetails:[],
  AboutUs:[],
  Contact:[],
  Faq:[],
  Privacy:[],
  Security:[],
  TermCondition:[],
  Trending:[],
  Notification:[],
  FaqArray:[],
  Blog:[],
  BankList:[],
  BankNameList:[],
  NomineeList:[],
  CountryList:[],
  StateList:[],
  CityList:[],
  FDList:[],
  SBList:[],
  FDDetail:[],
  SBDetail:[],
  Story:[],
  FDCompareDetail:[],
  SBCompareDetail:[],
  UserData:[],
  FamilyList:[],
  ResendData:'',
  ResenData:'',
  Data:'',
  MYFDList:[],
  MYFDetail:'',
  NBFCList:[],
  NBFCDetail:[],
  NBFCCompareDetail:[],
  NBFCNameList:[]
};
// Resend_Otp_Success
export default (state = initialstate, action) => {
  switch (action.type) {
    //Login 
    case 'User_Detail_Request':
      return { ...state, isFetching: true };
    case 'User_Detail_Success':
      return { ...state, isFetching: false, UserData: action.payload };
    case 'User_Detail_Error':
      return { ...state, isFetching: false };

      case 'Resend_Otp_Request':
        return { ...state, isFetching: true };
      case 'Resend_Otp_Success':
        return { ...state, isFetching: false, ResendData: action.payload };
      case 'Resend_Otp_Error':
        return { ...state, isFetching: false };

        case 'Verify_Otp_Request':
          return { ...state, isFetching: true };
        case 'Verify_Otp_Success':
          return { ...state, isFetching: false, ResendData: action.payload };
        case 'Verify_Otp_Error':
          return { ...state, isFetching: false };


          case 'Verifyf_Otp_Request':
            return { ...state, isFetching: true };
          case 'Verifyf_Otp_Success':
            return { ...state, isFetching: false, ResenData: action.payload };
          case 'Verifyf_Otp_Error':
            return { ...state, isFetching: false };

      case 'Resen_Otp_Request':
        return { ...state, isFetching: true };
      case 'Resen_Otp_Success':
        return { ...state, isFetching: false, ResenData: action.payload };
      case 'Resen_Otp_Error':
        return { ...state, isFetching: false };

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
    _Success
    case 'Send_RegOtp_Request':
      return { ...state, isFetching: true };
    case 'Send_RegOtp_Success':
      return { ...state, isFetching: false,};
    case 'Send_RegOtp_Error':
      return { ...state, isFetching: false };

      case 'User_Register_Request':
      return { ...state, isFetching: true };
    case 'User_Register_Success':
      return { ...state, isFetching: false, RegisterDetails: action.payload };
    case 'User_Register_Error':
      return { ...state, isFetching: false };

    case 'Send_Otp_Request':
      return { ...state, isFetching: true };
    case 'Send_Otp_Success':
      return { ...state, isFetching: false };
    case 'Send_Otp_Error':
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
   //About us 
    case 'Contact_Detail_Request':
     return { ...state, isFetching: true };
    case 'Contact_Detail_Success':
     return { ...state, isFetching: false, Contact: action.payload };
    case 'Contact_Detail_Error':
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

   //Notification 
  case 'Notification_Request':
    return { ...state, isFetching: true };
  case 'Notification_Success':
    return { ...state, isFetching: false, Notification: action.payload };
  case 'Notification_Error':
  return { ...state, isFetching: false };

  ///Support
  case 'Support_Request':
    return { ...state, isFetching: true };
  case 'Support_Success':
    return { ...state, isFetching: false,};
  case 'Support_Error':
  return { ...state, isFetching: false };

  //Contact us
  case 'Contact_Us_Request':
    return { ...state, isFetching: true };
  case 'Contact_Us_Success':
    return { ...state, isFetching: false,};
  case 'Contact_Us_Error':
  return { ...state, isFetching: false };


  //change password
  case 'Change_Password_Request':
    return { ...state, isFetching: true };
  case 'Change_Password_Success':
    return { ...state, isFetching: false,};
  case 'Change_Password_Error':
  return { ...state, isFetching: false };

   //change password
  case 'Feedback_Request':
    return { ...state, isFetching: true };
  case 'Feedback_Success':
    return { ...state, isFetching: false,};
  case 'Feedback_Error':
  return { ...state, isFetching: false };

  case 'Create_Pin_Request':
    return { ...state, isFetching: true };
  case 'Create_Pin_Success':
    return { ...state, isFetching: false,};
  case 'Create_Pin_Error':
  return { ...state, isFetching: false };

  case 'Edit_Profile_Request':
    return { ...state, isFetching: true };
  case 'Edit_Profile_Success':
    return { ...state, isFetching: false,};
  case 'Edit_Profile_Error':
  return { ...state, isFetching: false };

  case 'Get_Faq_Request':
    return { ...state, isFetching: true };
  case 'Get_Faq_Success':
    return { ...state, isFetching: false, FaqArray: action.payload };
  case 'Get_Faq_Error':
  return { ...state, isFetching: false };

  case 'Get_Blog_Request':
    return { ...state, isFetching: true };
  case 'Get_Blog_Success':
    return { ...state, isFetching: false, Blog: action.payload };
  case 'Get_Blog_Error':
  return { ...state, isFetching: false };

  case 'Get_Story_Request':
    return { ...state, isFetching: true };
  case 'Get_Story_Success':
    return { ...state, isFetching: false, Story: action.payload };
  case 'Get_Story_Error':
  return { ...state, isFetching: false };
  
  case 'Bank_List_Request':
    return { ...state, isFetching: true };
  case 'Bank_List_Success':
    return { ...state, isFetching: false, BankList: action.payload };
  case 'Bank_List_Error':
  return { ...state, isFetching: false };

  case 'Bank_Name_Request':
    return { ...state, isFetching: true };
  case 'Bank_Name_Success':
    return { ...state, isFetching: false, BankNameList: action.payload };
  case 'Bank_Name_Error':
  return { ...state, isFetching: false };

  case 'Nominee_List_Request':
    return { ...state, isFetching: true };
  case 'Nominee_List_Success':
    return { ...state, isFetching: false, NomineeList: action.payload };
  case 'Nominee_List_Error':
  return { ...state, isFetching: false };

  case 'Country_List_Request':
    return { ...state, isFetching: true };
  case 'Country_List_Success':
    return { ...state, isFetching: false, CountryList: action.payload };
  case 'Country_List_Error':
  return { ...state, isFetching: false };

  case 'State_List_Request':
    return { ...state, isFetching: true };
  case 'State_List_Success':
    return { ...state, isFetching: false, StateList: action.payload };
  case 'State_List_Error':
  return { ...state, isFetching: false };

  case 'City_List_Request':
    return { ...state, isFetching: true };
  case 'City_List_Success':
    return { ...state, isFetching: false, CityList: action.payload };
  case 'City_List_Error':
  return { ...state, isFetching: false };

  case 'FD_Search_Request':
    return { ...state, isFetching: true };
  case 'FD_Search_Success':
    return { ...state, isFetching: false, FDList: action.payload };
  case 'FD_Search_Error':
  return { ...state, isFetching: false };

  case 'SB_Search_Request':
    return { ...state, isFetching: true };
  case 'SB_Search_Success':
    return { ...state, isFetching: false, SBList: action.payload };
  case 'SB_Search_Error':
  return { ...state, isFetching: false };

  case 'FD_Detail_Request':
    return { ...state, isFetching: true };
  case 'FD_Detail_Success':
    return { ...state, isFetching: false, FDDetail: action.payload };
  case 'FD_Detail_Error':
  return { ...state, isFetching: false };

  case 'SB_Detail_Request':
    return { ...state, isFetching: true };
  case 'SB_Detail_Success':
    return { ...state, isFetching: false, SBDetail: action.payload };
  case 'SB_Detail_Error':
  return { ...state, isFetching: false };
  
  case 'FD_Compare_Request':
    return { ...state, isFetching: true };
  case 'FD_Compare_Success':
    return { ...state, isFetching: false, FDCompareDetail: action.payload };
  case 'FD_Compare_Error':
  return { ...state, isFetching: false };

  case 'SB_Compare_Request':
    return { ...state, isFetching: true };
  case 'SB_Compare_Success':
    return { ...state, isFetching: false, SBCompareDetail: action.payload };
  case 'SB_Compare_Error':
  return { ...state, isFetching: false };

  case 'Add_Family_Request':
    return { ...state, isFetching: true };
  case 'Add_Family_Success':
    return { ...state, isFetching: false };
  case 'Add_Family_Error':
  return { ...state, isFetching: false };

  case 'Edit_Family_Request':
    return { ...state, isFetching: true };
  case 'Edit_Family_Success':
    return { ...state, isFetching: false };
  case 'Edit_Family_Error':
  return { ...state, isFetching: false };

  case 'Family_List_Request':
    return { ...state, isFetching: true };
  case 'Family_List_Success':
    return { ...state, isFetching: false, FamilyList: action.payload };
  case 'Family_List_Error':
  return { ...state, isFetching: false };

  case 'Create_FD_Request':
    return { ...state, isFetching: true };
  case 'Create_FD_Success':
    return { ...state, isFetching: false,};
  case 'Create_FD_Error':
  return { ...state, isFetching: false };

  case 'MYFD_List_Request':
    return { ...state, isFetching: true };
  case 'MYFD_List_Success':
    return { ...state, isFetching: false,MYFDList:action.payload};
  case 'MYFD_List_Error':
    return { ...state, isFetching: false };

  case 'MYFD_Detail_Request':
    return { ...state, isFetching: true };
  case 'MYFD_Detail_Success':
    return { ...state, isFetching: false,MYFDetail:action.payload};
  case 'MYFD_Detail_Error':
     return { ...state, isFetching: false };

  case 'NBFC_Search_Request':
    return { ...state, isFetching: true };
  case 'NBFC_Search_Success':
    return { ...state, isFetching: false, NBFCList: action.payload };
  case 'NBFC_Search_Error':
    return { ...state, isFetching: false };

  case 'NBFC_Detail_Request':
    return { ...state, isFetching: true };
  case 'NBFC_Detail_Success':
    return { ...state, isFetching: false, NBFCDetail: action.payload };
  case 'NBFC_Detail_Error':
  return { ...state, isFetching: false };

  case 'NBFC_Compare_Request':
    return { ...state, isFetching: true };
  case 'NBFC_Compare_Success':
    return { ...state, isFetching: false, NBFCCompareDetail: action.payload };
  case 'NBFC_Compare_Error':
  return { ...state, isFetching: false };
   
  case 'NBFC_Name_Request':
    return { ...state, isFetching: true };
  case 'NBFC_Name_Success':
    return { ...state, isFetching: false, NBFCNameList: action.payload };
  case 'NBFC_Name_Error':
  return { ...state, isFetching: false };


    default:
      return state;
  }
};
