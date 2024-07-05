import { forgotPassword } from "@/api/apiCalling/authenticationApi";
import { isEmail } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const inputChangeHandler = (e) => {
    if (isEmail(e.target.value)) {
      setEmail(e.target.value);
      setError("");
    } else {
      setError("Please Enter Valid Email*");
    }
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let body = {
      email: email,
    };
    if (!isEmail(email)) {
      setError("Please Enter Valid Email*");
      setLoading(false);

      return;
    }

    if (email === "") {
      setError("Email Cannot Be Empty");
      setLoading(false);
    } else {
      forgotPassword({ body, setLoading, dispatch });
    }
  };
  return (
    <Box width={500}>
      <Box>
        <Typography
          variant="h1"
          fontSize={20}
          fontWeight={600}
          letterSpacing={1}
          padding={1}
        >
          Forgot Password
        </Typography>
        <Divider style={{ backgroundColor: "#000" }} />
      </Box>
      <Box marginTop={2}>
        <Typography variant="p" fontSize={15} marginBottom={3}>
          Enter Email Address and an OTP wiil be sent to your Email Address
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Email Address*"
            className="mt-4"
            id="email"
            onChange={inputChangeHandler}
            sx={loginTextField}
            error={error}
            helperText={error}
          />
          <Box textAlign={"center"} mt={2}>
            <Button
              sx={{
                border: "1px solid #d7d7d7",
                p: 1.3,
                color: "#000",
                ":hover": {
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  backgroundColor: "#fff",
                },
                transition: "0.5s ease all",
              }}
              type="submit"
              fullWidth
            >
              {loading ? (
                <Loading
                  color="#000"
                  width={20}
                  height={20}
                  className="m-auto"
                />
              ) : (
                "Submit"
              )}
              
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
