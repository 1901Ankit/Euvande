import { getCarDetailsById } from "@/api/apiCalling/listingApi";
import Thankyou from "@/assests/modalcalling/thankyou";
import FeatureCard from "@/components/featureCard";
import dummyCars from "@/icons/cars.jpg";
import { showModal } from "@/redux/reducers/modal";
import { OPTION_TYPE } from "@/utils/enum";
import { Done, Favorite, LocationOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCalendar, BsFuelPump } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
const CarDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userInfo);
  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(router.query.slug);
      if (carId) {
        user.isAuthenticated
          ? await getCarDetailsById({
              carId,
              setCarData,
              setLoading,
              userId: user.id,
            })
          : await getCarDetailsById({
              carId,
              setCarData,
              setLoading,
            });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, [router, user]);

  const specificationArray = [
    {
      icon: <GiRoad />,
      label: "Mileage",
      value: carData && carData.odometer,
    },
    {
      icon: <BsCalendar />,
      label: "First Registration",
      value: carData && carData.period && carData.period.year,
    },
    {
      icon: <GiGearStickPattern />,
      label: "Transmission",
      value:
        carData && carData.specification && carData.specification.transmission,
    },
    {
      icon: <PiEngine />,
      label: "Power",
      value: `${
        carData && carData.specification && carData.specification.power
      } kw`,
    },
    {
      icon: <BsFuelPump />,
      label: "Fuel",
      value: carData && carData.variant && carData.variant.fuelType,
    },
  ];
  const details = [
    {
      label: "Make",
      value: carData && carData.make && carData.make.makeName,
    },
    {
      label: "Model",
      value: carData && carData.model && carData.model.modelName,
    },
    {
      label: "Body Color",
      value: carData && carData.specification && carData.specification.color,
    },
    {
      label: "Interior Material",
      value:
        carData &&
        carData.specification &&
        carData.specification.interiorMaterial,
    },
    {
      label: "Body",
      value:
        carData && carData.specification && carData.specification.vehicleType,
    },
    {
      label: "Doors",
      value: carData && carData.specification && carData.specification.doors,
    },
    {
      label: "Seats",
      value: carData && carData.specification && carData.specification.seats,
    },
    {
      label: "VIN",
      value: (carData && carData.vin) || "Not Published by the Seller",
    },
  ];
  const engine = [
    {
      label: "Fuel",
      value: carData && carData.variant && carData.variant.fuelType,
    },
    {
      label: "Transmission",
      value:
        carData && carData.specification && carData.specification.transmission,
    },
    {
      label: "Drive Type",
      value:
        carData &&
        carData.specification &&
        carData.specification.driveType4WD === OPTION_TYPE.Yes
          ? "4x4"
          : "4x2",
    },
    {
      label: "Power",
      value: `${
        carData && carData.specification && carData.specification.power
      } kw`,
    },
  ];
  const vehicleCondition = [
    {
      label: "Mileage",
      value: carData && carData.odometer,
    },
    {
      label: "First registration",
      value: carData && carData.period && carData.period.year,
    },
  ];

  const handleOpenThank = () => {
    router.push("/thankyou");
  };

  return (
    <Container maxWidth={1400} sx={{ mb: 5 }}>
      <Box sx={{ p: 2 }}>
        <Button onClick={() => router.back()} sx={{ fontSize: 10 }}>
          <FaAngleLeft />
          back to results
        </Button>
      </Box>
      <Grid container>
        <Grid item lg={7} p={2}>
          {loading ? (
            <Skeleton variant="text" width={300} />
          ) : (
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography fontSize={30} fontWeight={600}>
                {carData && carData.make && carData.make.makeName}
              </Typography>
              <Typography fontSize={30} fontWeight={600}>
                {carData && carData.variant && carData.variant.variantName}
              </Typography>
              <Typography fontSize={30} fontWeight={600}>
                {carData && carData.model && carData.model.modelName}
              </Typography>
            </Stack>
          )}
          {loading ? (
            <Skeleton variant="text" />
          ) : (
            <Box display={"flex"} flexWrap={"wrap"} my={2}>
              {carData &&
                carData.specification &&
                carData.specification.equipments &&
                carData.specification.equipments.slice(0, 5).map((val, i) => (
                  <Chip
                    avatar={
                      <Avatar sx={{ p: 1, backgroundColor: "#ffffff" }}>
                        <Done sx={{ fontSize: 8, fill: "#000" }} />
                      </Avatar>
                    }
                    label={val}
                    key={i}
                    sx={{
                      backgroundColor: "#000000",
                      color: "#fff",
                      mx: 1,
                      my: 0.3,
                      textTransform: "capitalize",
                      // borderRadius: 0,
                      fontSize: 10,
                    }}
                  />
                ))}
            </Box>
          )}
          {loading ? (
            <Skeleton variant="rectangular" width={400} height={400} />
          ) : (
            <Card>
              <Carousel
                dynamicHeight={true}
                showIndicators={false}
                autoPlay={true}
                infiniteLoop={true}
              >
                {carData && carData.carImages ? (
                  carData.carImages.map((val, i) => <img src={val} key={i} />)
                ) : (
                  <img src={dummyCars.src} />
                )}
              </Carousel>
            </Card>
          )}
        </Grid>
        <Grid item lg={5} p={2}>
          {loading ? (
            <Skeleton variant="text" />
          ) : (
            <Box textAlign={"center"}>
              <Typography fontSize={30} fontWeight={600}>
                {carData && carData.price} €
              </Typography>
              <Typography fontSize={10}>
                {carData &&
                carData.specification &&
                carData.specification.vatDeduction === OPTION_TYPE.No
                  ? "Without VAT Deduction"
                  : "With VAT Deduction"}
              </Typography>
            </Box>
          )}
          <Card sx={{ mt: 6, mb: 2, borderRadius: 4 }}>
            {loading ? (
              <Skeleton variant="text" />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <LocationOn />
                  <Typography fontSize={12}>Location</Typography>
                </Stack>
                <Typography fontSize={12}>
                  {carData && carData.location && carData.location.city}
                </Typography>
              </Box>
            )}
          </Card>
          <Card sx={{ p: 1 }}>
            {loading ? (
              <Skeleton variant="text" />
            ) : (
              specificationArray.map((val, i) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                  key={i}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    {val.icon}
                    <Typography fontSize={12}>{val.label}</Typography>
                  </Stack>
                  <Typography fontSize={12}>{val.value}</Typography>
                </Box>
              ))
            )}
          </Card>
          <Stack direction={"row"} alignItems={"center"} mt={3} spacing={2}>
            {/* <IconButton sx={{ border: "1px solid #eee" }}>
              <Favorite
                sx={{ fill: carData && carData.favourite ? "#ff0000" : "" }}
              />
            </IconButton> */}
            <Button
              fullWidth
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                p: 1,
                border: "1px solid #fff",
                "&:hover": {
                  color: "#000",
                  backgroundColor: "#fff",
                  border: "1px solid #000",
                },
              }}
              onClick={handleOpenThank}
            >
              Buy
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: "#eee",
          p: 3,
        }}
      >
        <Grid container>
          <Grid item lg={8}>
            <Typography fontSize={25} fontWeight={600}>
              Details
            </Typography>
            <Grid container mt={3} columnSpacing={2}>
              <Grid lg={5}>
                <Card sx={{ p: 2,height:"100%" }}>
                  <Typography fontSize={15} fontWeight={550}>
                    VEHICLE DETAIL
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <FeatureCard data={details} />
                  </Box>
                </Card>
              </Grid>
              <Grid lg={1}></Grid>
              <Grid lg={5}>
                <Card sx={{ p: 2, mb: 2 }}>
                  <Typography fontSize={15} fontWeight={550}>
                    Engine
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <FeatureCard data={engine} />
                  </Box>
                </Card>
                <Card sx={{ p: 2 }}>
                  <Typography fontSize={15} fontWeight={550}>
                    Vehicle Condition
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <FeatureCard data={vehicleCondition} />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} sx={{ position: "relative" }}>
            <Card sx={{ p: 2, backgroundColor: "#000", height: 150 }}>
              <Typography
                color={"#fff"}
                textAlign={"center"}
                fontSize={20}
                fontWeight={550}
              >
                {carData && carData.make && carData.make.makeName}{" "}
                {carData && carData.variant && carData.variant.variantName}{" "}
                {carData && carData.model && carData.model.modelName}
              </Typography>
              {/* <Typography textAlign={"center"} fontSize={12} color={"#fff"}>
                TOTAL PRICE OF THE CAR INCL. SERVICES
              </Typography>
              <Typography
                textAlign={"center"}
                color={"#fff"}
                my={1}
                fontSize={30}
                fontWeight={600}
              >
                {carData && carData.price} €
              </Typography>
              <Typography textAlign={"center"} fontSize={12} color={"#fff"}>
                This price is final, with no hidden fees.
              </Typography> */}
            </Card>
            <Card
              sx={{
                width: 300,
                margin: "auto",
                p: 2,
                position: "absolute",
                left: 60,
                top: 80,
              }}
            >
              <Typography
                color={"#000"}
                textAlign={"center"}
                fontSize={25}
                fontWeight={550}
              >
                {carData && carData.price} €
              </Typography>
              <FormHelperText sx={{ textAlign: "center", mt: 1, mb: 1 }}>
                {carData &&
                carData.specification &&
                carData.specification.vatDeduction === OPTION_TYPE.Yes
                  ? "With VAT Deduction"
                  : "Without VAT Deduction"}
              </FormHelperText>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {/* <IconButton sx={{ border: "1px solid #eee" }}>
                  <Favorite
                    sx={{ fill: carData && carData.favourite ? "#ff0000" : "" }}
                  />
                </IconButton> */}
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    "&:hover": {
                      border: "1px solid #000",
                      backgroundColor: "#fff",
                      color: "#000",
                    },
                    fontWeight: 550,
                  }}
                  onClick={handleOpenThank}
                >
                  Buy
                </Button>
              </Stack>
            </Card>
            <Card sx={{ mt: 10, p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontSize={12}>
                  CarAudit <sup>TM</sup>
                </Typography>
                <Typography fontSize={12}>
                  {(carData && carData.carAudit) || "Not Included"}
                </Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Divider
                  sx={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    color: "#000",
                    fontWeight: 550,
                  }}
                >
                  Additional Services
                </Divider>
                <Box>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography fontSize={12}>Home Delivery</Typography>
                    <Typography fontSize={12}>
                      {(carData && carData.homedelivery) || "Not Included"}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
              <Box>
                <Divider
                  sx={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  Optional Services
                </Divider>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={2}
                  mb={1}
                >
                  <Typography fontSize={12} fontWeight={600}>
                    Extended Warranty
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    disabled
                    sx={{
                      fontSize: 10,
                      cursor: "text",
                      "&:disabled": {
                        color: "#fff",
                        backgroundColor: "green",
                      },
                    }}
                  >
                    Free
                  </Button>
                </Stack>
                <FormHelperText sx={{ fontSize: 10 }}>
                  When ordering a car, you can choose additional ancillary
                  services.
                </FormHelperText>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CarDetails;
