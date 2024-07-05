import OTPInput from "react-otp-input";
import styles from "@/styles/Login.module.css";
import { useState } from "react";
import Button from "@/components/button";
import { toast } from "react-toastify";
import {
  otpEmailVerify,
  verifyEmailOTP,
} from "@/api/apiCalling/authenticationApi";
import { useDispatch } from "react-redux";
export const VerifyOtp = ({ setEmailVerify }) => {
  const dispatch = useDispatch();
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      referenceId: JSON.parse(localStorage.getItem("referenceId")),
      otp: otp,
    };
    if (otp === "") {
      setError("Kindly enter the OTP that was sent to your email address.");
    } else {
      otpEmailVerify({ data: body, dispatch, setEmailVerify });
    }
  };
  return (
    <div className="">
      <div className="mt-2">
        <h4 className="text-center mb-3">🔐 OTP Verification 📬</h4>
        <p className="text-center f-12">
          Welcome back! We've sent a secret code to your registered email
          address. To ensure it's really you, please check your inbox and enter
          the code below:
        </p>

        <div>
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
                  } mx-4`}
                />
              )}
              containerStyle={{
                justifyContent: "center",
              }}
              onChange={setOTP}
              value={otp}
            />
            <Button className="custom_btn mt-2" width="100%">
              <span>Verify OTP</span>
              <span>Verify OTP</span>
            </Button>
            <p className="text-danger f-12 fw-normal">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};
