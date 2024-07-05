import { userVerify } from "@/api/apiCalling/authenticationApi";
import styles from "@/styles/Login.module.css";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
const OTPinput = (props) => {
  const dispatch = useDispatch();
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      otp: otp,
      referenceId: JSON.parse(localStorage.getItem("referenceId")),
    };
    setLoading(true);
    if (otp === "") {
      setError("Please Enter OTP");
      setLoading(false);
      return false;
    } else {
      userVerify({ body, router, setLoading, dispatch });
      return true;
    }
  };
  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ position: "relative", m: 1 }}>
        <IconButton
          sx={{ position: "absolute", border: "1px solid #fff", right: 0 }}
          onClick={props.onClose}
        >
          <Close sx={{ fill: "#fff" }} />
        </IconButton>
      </Box>
      <form
        onSubmit={submitHandler}
        style={{
          height: "100%",
          display: "grid",
          placeItems: "center",
          padding: 10,
        }}
      >
        <Box>
          <Box textAlign={"center"} mb={3}>
            <Typography color={"#fff"} fontSize={18}>
              Ultimate Car Marketplace OTP Verification{" "}
            </Typography>
            <Typography
              variant="p"
              textAlign={"center"}
              fontSize={12}
              color={"#fff"}
            >
              we need to verify your identity. Buckle up for a quick and easy
              OTP (One-Time Password) verification process.
            </Typography>
          </Box>

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

          <Button
            fullWidth
            sx={{
              color: "#fff",
              backgroundColor: "#000",
              border: "1px solid #000",
              ":hover": {
                color: "#fff",
                border: "1px solid #fff",
              },
              transition: "0.5s ease all",
              mt: 3,
            }}
            type="submit"
          >
            {loading ? (
              <Loading type="bars" color="#fff" width={20} height={20} />
            ) : (
              "Submit"
            )}
          </Button>
          <p className="f-12 text-danger">{error}</p>
        </Box>
      </form>
    </Box>
  );
};

export default OTPinput;
