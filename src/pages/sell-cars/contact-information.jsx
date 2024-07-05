import {
  getUserProfile,
  updateUserDetails,
} from "@/api/apiCalling/authenticationApi";
import { countries } from "@/assests/country";
import LinkTab from "@/components/linktab";
import { isEmail, isPhonenumber } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { contactValidation } from "@/utils/validation";
import CheckIcon from "@mui/icons-material/Check";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "react-loading";
import { addCar, getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import AddCarDetails from "@/components/carDetails";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { countriesflag } from "@/assests/countries";
const ContactInformation = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    email: "",
  });
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    countryCode: "",
    email: "",
  });
  const inputRef = useRef();
  const [phone, setPhone] = useState("");
  const handlePhoneNumber = (newphone, countryData) => {
    setPhone(newphone);
    setState({ ...state, phoneNumber: countryData.nationalNumber });

    const isValid = matchIsValidTel(newphone);
    if (isValid) {
      setError({ ...error, phoneNumber: "" });
      const data = countriesflag.find((val) => {
        return val.country_code === countryData.countryCode;
      });
      if (data) {
        setState((prevState) => ({
          ...prevState,
          country: data.country_name,
          countryCode: data.idd_code,
        }));
      } else {
      }
    } else {
      setError((prevError) => ({
        ...prevError,
        phoneNumber: "Please Enter Valid Phone Number",
      }));
    }
  };
  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email Id"
          : "",
    });
  };

  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    if (matchIsValidTel(state.phoneNumber)) {
      setError({ ...error, phoneNumber: "Please Enter Phone Number" });
      return;
    }

    if (contactValidation({ state, error, setError, setLoading })) {
      let body = {
        name: state.name,
        countryName: state.country,
        zipCode: state.zipCode,
        phoneNo: state.phoneNumber,
        countryCode: state.countryCode,
      };
      let data = {
        id: carInfo.id,
        contactInfo: body,
      };

      addCar({
        body: data,
        router,
        dispatch,
        path: "/sell-cars/upload-picture",
        setLoading,
      });
    } else {
      setLoading(false);
      return;
    }
  };

  const [carData, setCarData] = useState(null);

  const [show, setShow] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setShow(true);
    } else {
      setShow(false);
    }

    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        getCarInfo({ data: carId, dispatch });
        getCarDetails({ carId, setCarData, setLoading });
      } else {
        return () => {};
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setState({
      ...state,
      name: (carInfo && carInfo.contactInfo && carInfo.contactInfo.name) || "",
      phoneNumber:
        (carInfo && carInfo.contactInfo && carInfo.contactInfo.phoneNo) || "",

      zipCode:
        (carInfo && carInfo.contactInfo && carInfo.contactInfo.zipCode) || "",
      country:
        (carInfo && carInfo.contactInfo && carInfo.contactInfo.countryName) ||
        "",
      countryCode:
        (carInfo && carInfo.contactInfo && carInfo.contactInfo.countryCode) ||
        "",
      email:
        (carInfo && carInfo.contactInfo && carInfo.contactInfo.email) || "",
    });
    setPhone(
      `${carInfo && carInfo.contactInfo && carInfo.contactInfo.countryCode} ${
        carInfo && carInfo.contactInfo && carInfo.contactInfo.phoneNo
      }  ` || "+49"
    );
  }, [carInfo]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.phoneNo]);
  return (
    <div>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={12}>
            <LinkTab />

            <Card>
              <h5 className="border-bottom p-4">Contact information</h5>
              {show ? (
                <Grid
                  container
                  sx={{ backgroundColor: "#0080001f", padding: "8px" }}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={6}>
                    <Stack direction="row" className="text-success fw-bold p-3">
                      <CheckIcon className="me-2" />
                      <p className="mb-0">Please Confirm Your Details</p>
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                <Grid container className="p-3 mt-2">
                  <Grid item xs={6}>
                    <TextField
                      id="email"
                      onChange={inputHandler}
                      label="Email*"
                      fullWidth
                      sx={loginTextField}
                      error={Boolean(error.email)}
                      helperText={error.email}
                      value={state.email}
                    />
                  </Grid>
                </Grid>
              )}

              <form onSubmit={submitHandler}>
                <Grid container spacing={2} className=" p-3">
                  <Grid item xs={6}>
                    <TextField
                      label="Full Name*"
                      fullWidth
                      sx={loginTextField}
                      onChange={inputHandler}
                      id="name"
                      variant="outlined"
                      error={Boolean(error.name)}
                      helperText={error.name}
                      value={state.name}
                      focused={
                        state.name === "" || state.name === null ? false : true
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MuiTelInput
                      inputRef={inputRef}
                      fullWidth
                      value={phone}
                      onChange={handlePhoneNumber}
                      label="Enter Phone Number"
                      defaultCountry="DE"
                      continents={["EU"]}
                      error={Boolean(error.phoneNumber)}
                      helperText={error.phoneNumber}
                      sx={{
                        ".MuiHelperText-root": {
                          color: "#ff0000",
                        },
                      }}
                      id="phoneNumber"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} className=" p-3">
                  <Grid item xs={6}>
                    {/* <Autocomplete
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
                          error={Boolean(error.country)}
                          helperText={error.country}
                        />
                      )}
                    /> */}
                    <TextField
                      label="Email"
                      onChange={inputHandler}
                      sx={loginTextField}
                      id="email"
                      error={Boolean(error.email)}
                      helperText={error.email}
                      value={state.email}
                      focused={
                        state.email === "" || state.email === null
                          ? false
                          : true
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Zip Code*"
                      fullWidth
                      type="number"
                      id="zipCode"
                      onChange={inputHandler}
                      sx={loginTextField}
                      error={Boolean(error.zipCode)}
                      helperText={error.zipCode}
                      value={state.zipCode}
                      focused={
                        state.zipCode === "" || state.zipCode === null
                          ? false
                          : true
                      }
                    />
                  </Grid>
                </Grid>
                <div className="text-end my-3 p-3">
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      border: "1px solid #000",
                      ":hover": {
                        color: "#000",
                        backgroundColor: "#fff",
                      },
                      width: 150,
                    }}
                  >
                    {loading ? (
                      <Loading
                        type="bars"
                        color="#d7d7d7"
                        className="m-auto"
                        width={20}
                        height={20}
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </Grid>
          {/* <Grid item lg={4}>
            {carData && <AddCarDetails data={carData} loading={loading} />}
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default ContactInformation;
