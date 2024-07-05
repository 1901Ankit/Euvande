import { addCarsToFavorite, getFavouriteCars } from "@/api/apiCalling/vehicle";
import {
  AddRoad,
  CalendarMonth,
  ChevronRight,
  Favorite,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import Loading from "react-loading";
import { Carousel } from "react-responsive-carousel";
import dummyCars from "@/icons/cars.jpg";
import { useSelector } from "react-redux";
import { vehicleController } from "@/api/addVehicle";
const ShortListedVehicle = () => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const router = useRouter();
  useEffect(() => {
    getFavouriteCars({
      setCarData,
      loading: setLoading,
    });
  }, []);

  const user = useSelector((state) => state.userInfo);
  const removefavourite = (value) => {
    setLoading(true);
    let body = {
      favourite: false,
      carId: value.id,
    };
    vehicleController
      .favoriteCars(body)
      .then((res) => {
        getFavouriteCars({ setCarData, loading: setLoading });
      })
      .catch((err) => {
        console.log(err);
      });

    // addCarsToFavorite({
    //   data: {
    //     favourite: false,
    //     carId: value.id,
    //   },
    //   setCarData,
    //   setLoading,
    //   page,
    //   pageSize,
    //   user,
    // });
  };

  const routerPage = (id) => {
    router.push(`/vehicles/${id}/car-details`);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={20} fontWeight={600}>
          Shortlisted Vehicles
        </Typography>
        <TablePagination
          count={carData && carData.totalDocs}
          rowsPerPage={10}
          page={page}
        />
      </Box>
      {loading ? (
        <Loading
          type="bars"
          width={30}
          height={30}
          color="#000"
          className="m-auto"
        />
      ) : (
        carData &&
        carData.docs &&
        carData.docs.map((val, i) => (
          <Card key={i} sx={{ my: 3 }}>
            <Grid container spacing={3}>
              <Grid item lg={4}>
                <Carousel showThumbs={false} showIndicators={false}>
                  {val.carImages ? (
                    val.carImages.map((image, index) => (
                      <img src={image} key={index} height={200} />
                    ))
                  ) : (
                    <img src={dummyCars.src} height={200} />
                  )}
                </Carousel>
              </Grid>
              <Grid item lg={8}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  pt={2}
                >
                  <Typography
                    fontSize={20}
                    fontWeight={600}
                    textTransform={"capitalize"}
                  >
                    {val && val.make && val.make.makeName}{" "}
                    {val && val.model && val.model.modelName}
                  </Typography>

                  <IconButton onClick={() => removefavourite(val)}>
                    <Favorite sx={{ fill: val.favourite ? "#ff0000" : "" }} />
                  </IconButton>
                </Stack>
                <Typography fontSize={10}>
                  {val.vin || "VIN not disclosed"}
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  my={1}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <AddRoad sx={{ fontSize: 12 }} />
                    <Typography fontSize={12}>{val && val.odometer}</Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <CalendarMonth sx={{ fontSize: 12 }} />
                    <Typography fontSize={12}>
                      {val && val.period && val.period.year}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <BsFuelPump sx={{ fontSize: 12 }} />
                    <Typography fontSize={12}>
                      {(val && val.variant && val.variant.fuelType) ||
                        "Not Disclosed"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <GiGearStickPattern sx={{ fontSize: 12 }} />
                    <Typography fontSize={12}>
                      {(val &&
                        val.specification &&
                        val.specification.transmission) ||
                        "Not Disclosed"}
                    </Typography>
                  </Stack>
                </Stack>
                {val &&
                  val.specification &&
                  val.specification.equipments &&
                  val.specification.equipments.slice(0, 3).map((label) => (
                    <Chip
                      label={label}
                      sx={{
                        mx: 1,
                        fontSize: 10,
                        backgroundColor: "#000",
                        color: "#fff",
                        textTransform: "capitalize",
                      }}
                    />
                  ))}
                {val &&
                  val.specification &&
                  val.specification.equipments &&
                  val.specification.equipments.length > 3 && (
                    <Chip
                      label={`+ ${
                        val &&
                        val.specification &&
                        val.specification.equipments.length - 3
                      } more`}
                      sx={{ fontSize: 12 }}
                    />
                  )}
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  {val && val.price && (
                    <Typography
                      fontSize={25}
                      fontWeight={600}
                      mt={2}
                      mb={2}
                      alignSelf={"center"}
                    >
                      {`${val && val.price} €` || "Not Disclosed"}
                    </Typography>
                  )}

                  <Button
                    color="inherit"
                    sx={{ fontSize: 12, alignSelf: "end" }}
                    onClick={() => routerPage(val.id)}
                  >
                    View Car Details <ChevronRight />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ShortListedVehicle;
