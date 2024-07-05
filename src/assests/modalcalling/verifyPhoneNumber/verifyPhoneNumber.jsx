import { authControllers } from "@/api/authentication";
import Button from "@/components/button";
import { isPhonenumber } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { countries } from "../../country";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "@/redux/reducers/modal";
import VerifyPhoneOTP from "./verifyotp";

const VerifyPhone = ({ user, userDetails, setUser }) => {
  //   const [phone, setPhone] = useState();
  const [state, setState] = useState({
    countryCode: user.countryCode,
    phoneNumber: user.phoneNo,
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({
    phoneNumber: "",
    countryCode: "",
  });
  const inputHandler = (e) => {
    setState({ ...state, phoneNumber: e.target.value });
    setError(
      isPhonenumber(e.target.value) ? "" : "Please Enter Valid Phone Number"
    );
  };
  const [country, setCountry] = useState({
    label: user.countryName || "",
    phone: user.countryCode || "",
  });
  const handleCountryChange = (e, newValue) => {
    setCountry(newValue);
    if (newValue) {
      setState({ ...state, countryCode: newValue.phone });
    }
    setError({ ...error, countryCode: "" });
  };
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    if (state.phoneNumber === "" || state.countryCode === "") {
      setError({
        ...error,
        phoneNumber:
          state.phoneNumber === "" && "Please Enter Valid Phone Number",
        countryCode: state.countryCode === "" && "Please Select Country Code",
      });
      setLoading(false);
      return false;
    } else {
      let body = {
        phoneNo: state.phoneNumber,
        countryCode: state.countryCode,
      };
      authControllers
        .updatePhoneNumber(body)
        .then((res) => {
          toast.success(res.data.message);
          localStorage.setItem("referenceId", res.data.data.referenceId);
          setLoading(false);
          dispatch(hideModal());
          dispatch(
            showModal(
              <VerifyPhoneOTP userDetails={userDetails} setUser={setUser} />
            )
          );
        })
        .catch((err) => {
          let errMessage =
            err.message || err.response.data.message || "Network Error";
          toast.error(errMessage);
          setLoading(false);
          return true;
        });
    }
  };
  return (
    <div>
      <Typography fontSize={20} fontWeight={600}>
        Verify Phone Number
      </Typography>
      <Divider sx={{ backgroundColor: "#000" }} />
      <FormControl sx={{ marginTop: 4, width: "100%" }}>
        <form onSubmit={submitHandler}>
          <Autocomplete
            id="country"
            options={countries}
            autoHighlight
            onChange={handleCountryChange}
            sx={loginTextField}
            className="mb-4"
            value={country}
            fullWidth
            getOptionLabel={(option) => (option ? option.label || "" : "")}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label}
                {`+${option.phone}`}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country*"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                error={error.countryCode}
                helperText={error.countryCode}
              />
            )}
          />
          <TextField
            sx={loginTextField}
            value={state.phoneNumber}
            label="Phone Number"
            fullWidth
            className="mb-4"
            onChange={inputHandler}
            error={error.phoneNumber}
            helperText={error.phoneNumber}
          />
          <Button
            className="custom_btn"
            width="100%"
            padding="15px"
            rounded="4px"
            disabled={loading}
          >
            <span>Send OTP</span>
            <span>Send OTP</span>
          </Button>
        </form>
      </FormControl>
    </div>
  );
};

export default VerifyPhone;
