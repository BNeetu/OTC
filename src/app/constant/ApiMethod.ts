export enum ApiMethod { 
     GET = "GET",  
     POST = "POST",
    }
export const AuthEndPoints: any = {
      REGISTER_USER:'/usercategories',
      SubUserCategory: '/usersubcategories',
      Sign_Up: '/signup',
      Otp_Verify  :'/signup/otpverify',
      SIGNUP_USER__DATA : '/v1/admin/get-signup-user',
      ADMIN_PROFILE  : '/profile',
      USER_PROFILE_IMG : '/getprofileimage',
      TWO_FACT_AUTH : '/2fa-change-request',
      TWO_FACT_VER               : '/2fa-change-verification',
      UPDATE_PROFILE : '/uploadprofileimage'       
    }


