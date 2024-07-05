import securedAPI from "./config";
import publicAPI from "./config";
export const authControllers = {
  RegisterUser: async (body) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "api/user/register",
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyOtp: async (body) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "api/user/verify",
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (body) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "/api/user/login",
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserDetails: async () => {
    try {
      let result = await securedAPI.securedAPI.get(
        "/api/user/getUserDetail"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateUserDetails: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/api/user/updateUserDetail",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/api/user/changePassword",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (data) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "/api/forgotPassword",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyForgotPasswordOTP: async (data) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "/api/forgotPassword/verify",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addAddress: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/api/address/addAddress",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  updatePhoneNumber: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/api/updatePhone/addOrUpdatePhone",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  removeAddress: async (data) => {
    try {
      let result = await securedAPI.securedAPI.get(
        `/api/address/removeAddress/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyPhoneOTP: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/api/updatePhone/phoneNoVerification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  editAddress: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/api/address/editAddress",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
