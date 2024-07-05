import { verifyForgotPasswordOTP } from "@/api/apiCalling/authenticationApi";
import styles from "@/styles/Login.module.css";
import { loginTextField } from "@/utils/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Loading from "react-loading";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
const OTPverifyPassword = () => {
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    otp: "",
    password: "",
  });
  const [tooglePassword, setTooglePassword] = useState(false);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    let body = {
      otp: otp,
      referenceId: JSON.parse(localStorage.getItem("referenceId")),
      password: password,
    };
    e.preventDefault();
    if (otp === "" || password === "") {
      setError({
        ...error,
        otp: otp === "" && "Please Enter OTP",
        password: password === "" && "Please Enter Password",
      });
      return false;
    } else {
      verifyForgotPasswordOTP({ body, setLoading, dispatch });
      return true;
    }
  };
  return (
    <Box width={500}>
      <Typography fontSize={20} fontWeight={550}>
        Verify OTP
      </Typography>
      <Divider sx={{ backgroundColor: "#000" }} />
      <form onSubmit={submitHandler} style={{ marginTop: "2rem" }}>
        <OTPInput
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <input {...props} className={styles.inputOTP} />
          )}
          containerStyle={{
            justifyContent: "space-between",
          }}
          onChange={setOTP}
          value={otp}
        />
        {error.otp && <p className="f-12 text-danger">{error.otp}</p>}

        <TextField
          type={tooglePassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => setTooglePassword(!tooglePassword)}>
                  {tooglePassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={loginTextField}
          className="mt-3"
          label="Enter New password*"
          helperText={error.password}
          error={error.password}
        />
        <Button
          sx={{
            border: "1px solid #d7d7d7",
            color: "#000",
            ":hover": {
              boxShadow: "0xp 0px 2px 2px #00000040",
              backgroundColor: "#fff",
            },
            transition: "0.5s ease all",
            p: 1,
            mt: 2,
          }}
          fullWidth
          type="submit"
        >
          {loading ? (
            <Loading
              type="bars"
              color="#000"
              width={20}
              height={20}
              className="m-auto"
            />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default OTPverifyPassword;
