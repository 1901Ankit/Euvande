// import Button from "@/components/button";
import LinkTab from "@/components/linktab";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import detectloc from "@/icons/detectLoc.svg";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "react-loading";
import AddCarDetails from "@/components/carDetails";
const Location = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const [state, setState] = useState({
    city: (carInfo && carInfo.location && carInfo.location.city) || "",
    lat: "",
    long: "",
  });
  const handleClearClick = () => {
    setState({ ...state, city: "" });
  };
  const handleChange = (e) => {
    setState({ ...state, city: e.target.value });
  };
  const handleClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?key=d8f80813a79c4255b03221765ad65a3c&language=en&pretty=1&q=${latitude}+${longitude}`
            );

            const city = response.data.results[0]?.components?.city;

            setState({
              ...state,
              city: city || "",
              lat: latitude,
              long: longitude,
            });
          } catch (error) {
            console.error("Error getting location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    if (state.city === "") {
      toast.error("Please Enter Your City");
      setLoading(false);
      return;
    } else {
      let body =
        state.lat && state.long != ""
          ? {
              id: carInfo.id,
              location: {
                latitude: state.lat,
                longitude: state.long,
                city: state.city,
              },
            }
          : {
              id: carInfo.id,

              location: {
                city: state.city,
              },
            };

      addCar({
        body,
        router,
        path: "/sell-cars/specifications",
        dispatch,
        setLoading,
      });
      return true;
    }
  };

  const [carData, setCarData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
        getCarDetails({ carId, setCarData, setLoading, dispatch });
      } else {
        () => {};
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Location</title>
      </Head>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={12}>
            <LinkTab />

            <Card sx={{ p: 3 }}>
              <h5>What is Your Location?</h5>
              <p className="f-12 fw-normal">
                In which city you are looking to sell your car?
              </p>
              <form onSubmit={submitHandle} className="mt-3">
                <Grid container alignItems={"center"} spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      sx={loginTextField}
                      onChange={handleChange}
                      label="Enter Your City Name"
                      fullWidth
                      value={state.city}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton onClick={handleClearClick}>
                              <Close />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      sx={{ color: "#000", border: "1px solid #d8d8d8", p: 2 }}
                      onClick={handleClick}
                      fullWidth
                    >
                      <span>
                        <img src={detectloc.src} /> Use Current Location
                      </span>
                    </Button>
                  </Grid>
                </Grid>

                <div className="text-end my-4">
                  <Button
                    sx={{
                      border: "1px solid #d7d7d7",
                      width: 290,
                      color: "#000",
                      ":hover": {
                        boxShadow: "0px 0px 2px 2px #00000040",
                      },
                      transition: "0.5s ease all",
                      p: 1.2,
                    }}
                    type="submit"
                  >
                    {loading ? (
                      <Loading
                        type="bars"
                        width={20}
                        height={20}
                        color="#000"
                        className="m-auto"
                      />
                    ) : (
                      "Continue"
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
    </>
  );
};

export default Location;
