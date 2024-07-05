import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { countries } from "../../country";
import Button from "@/components/button";
import { addAddressValidation } from "@/utils/validation";
import { toast } from "react-toastify";
import { authControllers } from "@/api/authentication";
import { useDispatch } from "react-redux";
import { hideModal } from "@/redux/reducers/modal";

const AddAddress = ({ getAddress }) => {
  const [state, setState] = useState({
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    countryName: "",
    addressType: "home",
  });
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState({
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    countryName: "",
  });
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({ ...error, [id]: "" });
  };

  const handleCountryChange = (event, newValue) => {
    setCountry(newValue);
    if (newValue) {
      setState({
        ...state,
        countryName: newValue.label,
      });
      setError({ ...error, countryName: "" });
    }
  };
  const handleAddressType = (e) => {
    let { checked, value } = e.target;
    if (value === "home" || value === "office") {
      setState({ ...state, addressType: value });
    } else {
      setState({ ...state, addressType: value });
    }
  };

  const addUserAddress = () => {
    let body = {
      street: state.street,
      houseNo: state.houseNumber,
      postalCode: state.postalCode,
      city: state.city,
      country: state.countryName,
      isDefault: false,
      addressType: state.addressType,
    };
    authControllers
      .addAddress(body)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(hideModal());
        getAddress();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (addAddressValidation({ state, setError, error })) {
      addUserAddress();
    } else {
      toast.error("Please Enter Required Fields");
    }
  };
  return (
    <div style={{ width: "500px" }}>
      <Box>
        <Typography variant="h6">Add New Address </Typography>
        <Divider style={{ backgroundColor: "#000" }} />

        <Typography fontSize={10} color={"#ff0000"} variant="p">
          *Indicates Required
        </Typography>
        <form className="mt-2" onSubmit={submitHandler}>
          <Box>
            <Grid container className="mb-3" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Street*"
                  fullWidth
                  sx={loginTextField}
                  id="street"
                  onChange={inputChangeHandler}
                  error={error.street}
                  helperText={error.street}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="House Number*"
                  fullWidth
                  sx={loginTextField}
                  id="houseNumber"
                  onChange={inputChangeHandler}
                  error={error.houseNumber}
                  helperText={error.houseNumber}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-3" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Postal Code*"
                  fullWidth
                  sx={loginTextField}
                  id="postalCode"
                  onChange={inputChangeHandler}
                  error={error.postalCode}
                  helperText={error.postalCode}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City*"
                  fullWidth
                  sx={loginTextField}
                  id="city"
                  helperText={error.city}
                  error={error.city}
                  onChange={inputChangeHandler}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-3">
              <Grid item xs={12}>
                <Autocomplete
                  id="country"
                  options={countries}
                  autoHighlight
                  onChange={handleCountryChange}
                  sx={loginTextField}
                  value={country}
                  fullWidth
                  getOptionLabel={(option) =>
                    option ? option.label || "" : ""
                  }
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
                      error={error.countryName}
                      helperText={error.countryName}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <FormLabel>Address Type*</FormLabel>
            <RadioGroup
              row
              defaultValue={"home"}
              onChange={handleAddressType}
              id="addressType"
            >
              <FormControlLabel
                value={"home"}
                control={<Radio defaultValue={"home"} />}
                label="Home"
              />
              <FormControlLabel
                value={"office"}
                control={<Radio defaultValue={"office"} />}
                label="Office"
              />
              <FormControlLabel
                value={"other"}
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {state.addressType === "home" || state.addressType === "office" ? (
              <></>
            ) : (
              <TextField
                type="text"
                label="Address Type*"
                sx={loginTextField}
                id="addressType"
                className="mb-3"
                onChange={handleAddressType}
              />
            )}
            <div className="text-center ">
              <Button className="custom_btn" width={250}>
                <span>Add Address</span>
                <span>Add Address</span>
              </Button>
            </div>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default AddAddress;
