import { loginUser } from "@/api/apiCalling/authenticationApi";
import { isEmail } from "@/utils/regex";
import { loginTextField, loginWhiteTextField } from "@/utils/styles";
import { loginValidation } from "@/utils/validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import OTPinput from "./otpInput";
import { showModal } from "@/redux/reducers/modal";
import ForgotPassword from "@/assests/modalcalling/forgot-password";
import Loading from "react-loading";
const LoginForm = ({ otpShow, setOtpShow }) => {
  const [state, setState] = useState({
    identity: "",
    countryCode: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    let { id, value } = e.target;

    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "identity"
          ? isEmail(value)
            ? ""
            : "Please Enter valid Email"
          : "",
    });
  };

  const [error, setError] = useState({
    identity: "",
    countryCode: "",
    password: "",
  });

  const ForgotPasswordModal = () => {
    dispatch(showModal(<ForgotPassword />));
  };

  const [loading, setLoading] = useState(false);

  const loginsubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEmail(state.identity)) {
      setError({ ...error, identity: "Please Enter Valid Email Id" });
      setLoading(false);
      return;
    }
    let body = {
      email: state.identity,
      password: state.password,
    };

    if (loginValidation({ state, setError, error })) {
      loginUser({ body, router, setLoading, dispatch });
    } else {
      toast.error("Please Enter Valid Details");
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box sx={{ height: "100%" }}>
      {!otpShow ? (
        <Box sx={{ height: "100%", display: "grid", placeItems: "center" }}>
          <form onSubmit={loginsubmitHandler}>
            {/* <Image src={logo} width={200} className="" /> */}
            <Box textAlign={"center"}>
              <Typography fontWeight={600} fontSize={25} color={"#fff"}>
                Welcome Back to EuVande!
              </Typography>
              <Typography fontSize={12} color={"#fff"}>
                If you're already a member, logging in is a breeze.
              </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
              <TextField
                variant="outlined"
                label="Enter Your Email*"
                sx={loginWhiteTextField}
                fullWidth
                type="text"
                onChange={inputHandler}
                error={error.identity}
                helperText={error.identity}
                className="my-4"
                id="identity"
              />
              <TextField
                type={showPassword ? "text" : "password"}
                className="mb-4"
                variant="outlined"
                fullWidth
                label="Password"
                sx={loginWhiteTextField}
                id="password"
                onChange={inputHandler}
                error={error.password}
                helperText={error.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? (
                          <Visibility sx={{ fill: "#fff" }} />
                        ) : (
                          <VisibilityOff sx={{ fill: "#fff" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                sx={{
                  color: "#fff",
                  backgroundColor: "#000",
                  ":hover": {
                    color: "#fff",
                    backgroundColor: "transparent",
                    border: "1px solid #fff",
                  },
                  border: "1px solid #000",
                  p: 1.4,
                  transition: "0.5s ease all",
                }}
                fullWidth
                type="submit"
              >
                {loading ? (
                  <Loading type="bars" width={20} height={20} color="#fff" />
                ) : (
                  "Sign In"
                )}
              </Button>
              <Box textAlign={"start"}>
                <Typography
                  textAlign={"start"}
                  color={"#fff"}
                  fontSize={12}
                  mt={1}
                  sx={{ cursor: "pointer" }}
                  onClick={ForgotPasswordModal}
                >
                  Forgot Password ?
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
      ) : (
        <div className="p-3">
          <h5 className="text-center">EuVande Login</h5>
          <p className="f-12 text-center">
            Welcome back! To ensure the security of your account, we need to
            verify your identity. Please enter the One-Time Password (OTP) sent
            to your registered mobile number.
          </p>
          <OTPinput />
        </div>
      )}
    </Box>
  );
};

export default LoginForm;
