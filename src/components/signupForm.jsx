import { userRegister } from "@/api/apiCalling/authenticationApi";
import countryData from "@/assests/countries.json";
import { isEmail, isPhonenumber } from "@/utils/regex";
import { loginWhiteTextField } from "@/utils/styles";
import { registerValidation } from "@/utils/validation";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
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
import Loading from "react-loading";
import { useDispatch } from "react-redux";
// import Button from "./button";
import OTPinput from "./otpInput";
const SignupForm = () => {
  const [togglePassword, setTogglePassword] = useState(true);
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [emailDisabled, setEmailDisAbled] = useState(true);
  const [phoneDisabled, setPhoneDisabled] = useState(true);
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    if (id === "email" && isEmail(value)) {
      setEmailDisAbled(false);
    }

    if (id === "phone" && isPhonenumber(value)) {
      setPhoneDisabled(false);
    }
    setError({
      ...error,
      [id]:
        id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email"
          : id === "phone"
          ? isPhonenumber(value)
            ? ""
            : "Please Enter Valid Phone Number "
          : "",
    });
  };
  const [emailverify, setEmailVerify] = useState(false);
  const [phoneverify, setPhoneVerify] = useState(false);
  const [selected, setSelected] = useState("NL");
  const [dialcode, setDialCode] = useState("+31");
  const onSelect = (e) => {
    setSelected(e);
    const dial_Code = countryData.find((country) => country.code == e);
    if (dial_Code) {
      setDialCode(dial_Code.dial_code);
    } else {
      console.log("no data found");
    }
  };
  const [loading, setLoading] = useState(false);
  const [openPopOverEmail, setOpenPopOverEmail] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const submitHandler = (e) => {
    let body = {
      email: state.email,
      name: state.name,
      password: state.password,
    };

    setLoading(true);
    e.preventDefault();
    if (registerValidation({ state, error, setError })) {
      userRegister({ setLoading, body, setEmailVerify, dispatch });
    } else {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ height: "100%" }}>
      {emailverify ? (
        <OTPinput onClose={() => setEmailVerify(false)} />
      ) : (
        <Box sx={{ height: "100%" }}>
          <Box sx={{ position: "relative",m:1 }}>
            <IconButton
              sx={{ border: "1px solid #fff", position: "absolute", right: 6 }}
              onClick={() => router.back()}
            >
              <Close sx={{ fill: "#fff" }} />
            </IconButton>
          </Box>

          <Box
            sx={{ p: 2, display: "grid", placeItems: "center", height: "100%" }}
          >
            <form onSubmit={submitHandler}>
              <Box textAlign={"center"} mb={3}>
                <Typography fontWeight={600} fontSize={25} color={"#fff"}>
                  Welcome to EuVande!
                </Typography>
                <Typography fontSize={12} color={"#fff"}>
                  {" "}
                  Ready to get started? Signing up is quick and easy.
                </Typography>
              </Box>
              <TextField
                label="Name*"
                variant="outlined"
                fullWidth
                sx={loginWhiteTextField}
                className="mb-3"
                onChange={inputChangeHandler}
                id="name"
                error={error.name}
                helperText={error.name}
              />
              <TextField
                label="Email*"
                variant="outlined"
                fullWidth
                sx={loginWhiteTextField}
                className="mb-3"
                id="email"
                onChange={inputChangeHandler}
                error={error.email}
                helperText={error.email}
              />

              <TextField
                label="Password*"
                variant="outlined"
                fullWidth
                type={!togglePassword ? "text" : "password"}
                sx={loginWhiteTextField}
                className="mb-3"
                id="password"
                onChange={inputChangeHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setTogglePassword(!togglePassword)}
                      >
                        {togglePassword ? (
                          <Visibility sx={{ fill: "#fff" }} />
                        ) : (
                          <VisibilityOff sx={{ fill: "#fff" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={error.password}
                helperText={error.password}
              />

              <Button
                sx={{
                  backgroundColor: "#000",
                  p: 1.5,
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "transparent",
                    border: "1px solid #fff",
                  },
                  border: "1px solid #000",
                }}
                fullWidth
                type="submit"
              >
                {loading ? (
                  <Loading type="bars" width={20} height={20} />
                ) : (
                  "Sign UP"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
