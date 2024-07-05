import { Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import Button from "@/components/button";
import OTPInput from "react-otp-input";
import { authControllers } from "@/api/authentication";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideModal } from "@/redux/reducers/modal";
import { getUserInfo } from "@/api/apiCalling/listingApi";
import { getUserProfile } from "@/api/apiCalling/authenticationApi";
const VerifyPhoneOTP = ({ userDetails, setUser }) => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (otp) => {
    setOTP(otp);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (otp === "") {
      setError("Please Enter OTP");
      return false;
    } else {
      let body = {
        otp: otp,
        referenceId: localStorage.getItem("referenceId"),
      };
      authControllers
        .verifyPhoneOTP(body)
        .then((res) => {
          toast.success(res.data.message);
          dispatch(hideModal());
          getUserProfile({ dispatch, setUser });
        })
        .catch((err) => {
          let errMessage = err.message || err.response.data.message;
          toast.error(errMessage);
        });
      return true;
    }
  };
  return (
    <div>
      <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
        Verify Phone Number
      </Typography>
      <Divider sx={{ backgroundColor: "#000" }} />
      <Typography textAlign={"center"} marginTop={2}>
        We've sent OTP to your Entered Number Please Verify to Update the Mobile
        Number
      </Typography>
      <form onSubmit={submitHandler}>
        <OTPInput
          numInputs={6}
          renderSeparator={
            <span className={error ? "text-danger" : ""}>-</span>
          }
          renderInput={(props) => (
            <input
              {...props}
              className={`${
                error ? styles.errorInputOTP : styles.inputOTP
              } mx-4 my-4`}
            />
          )}
          onChange={changeHandler}
          value={otp}
          containerStyle={{
            justifyContent: "center",
          }}
        />
        <Button className="custom_btn" width="100%">
          <span>Verify OTP</span>
          <span>Verify OTP</span>
        </Button>
      </form>
    </div>
  );
};

export default VerifyPhoneOTP;
