import { addCarsToFavorite } from "@/api/apiCalling/vehicle";
import dummyCar from "@/icons/cars.jpg";
import { OPTION_TYPE } from "@/utils/enum";
import {
  CalendarMonth,
  ChevronRight,
  Done,
  Favorite,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import Loading from "react-loading";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
const BoxCar = ({ data, setCarData, setLoading, page, pageSize }) => {
  const [favourites, setFavourites] = useState(
    new Array(data.length).fill(false)
  );
  const router = useRouter();

  const user = useSelector((state) => state.userInfo);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const favouriteHandler = (carId, index, favourite) => {
    if (user.isAuthenticated) {
      setFavoriteLoading(true);

      let body = {
        favourite: favourite ? false : true,
        carId: carId,
      };

      addCarsToFavorite({
        data: body,
        setCarData,
        setLoading,
        page,
        pageSize,
        setFavoriteLoading,
        user,
      });
    } else {
      router.push("/login");
    }
  };

  const carDetails = (carId) => {
    router.push(`/vehicles/${carId}/car-details`);
  };
  return (
    <Box>
      {favoriteLoading ? (
        <Backdrop open={favoriteLoading}>
          <Loading type="bars" color="#fff" width={30} height={30} />
        </Backdrop>
      ) : (
        data.map((val, i) => (
          <Card
            sx={{
              "&:hover": {
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              },
              mb: 2,
            }}
            key={i}
          >
            <Grid container>
              <Grid item lg={4} xs={4}>
                <Carousel
                  showThumbs={false}
                  swipeable={true}
                  showIndicators={false}
                >
                  {val && val.carImages ? (
                    val.carImages.map((image, index) => (
                      <img
                        src={image}
                        width={"100%"}
                        key={index}
                        height={230}
                        // style={{ objectFit: "fill" }}
                      />
                    ))
                  ) : (
                    <img src={dummyCar.src} height={225} />
                  )}
                </Carousel>
              </Grid>
              <Grid item lg={8} p={2} xs={8}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="h5"
                    marginBottom={3}
                    fontSize={18}
                    fontWeight={600}
                  >
                    {val && val.make && val.make.makeName}{" "}
                    {val && val.model && val.model.modelName}
                    {val && val.variant && val.variant.variantName}{" "}
                    {val && val.variant && val.variant.fuelType}
                  </Typography>
                  {val.favourite ? (
                    <Favorite
                      sx={{ fill: "#ff0000", cursor: "pointer" }}
                      onClick={() => favouriteHandler(val.id, i, val.favourite)}
                    />
                  ) : (
                    <FavoriteBorderOutlined
                      onClick={() => favouriteHandler(val.id, i, val.favourite)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </Stack>
                <Typography fontSize={12}>
                  {(val && val.vin) || "VIN not disclosed"}
                </Typography>
                <Stack
                  direction={{ lg: "row" }}
                  spacing={2}
                  marginBottom={2}
                  marginTop={2}
                >
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Box>
                      <GiRoad />
                      <Typography
                        ml={1}
                        variant="p"
                        fontWeight={400}
                        fontSize={12}
                      >
                        {(val && val.odometer) || "Not Disclosed"}
                      </Typography>
                    </Box>
                    <Box>
                      <CalendarMonth />
                      <Typography
                        ml={1}
                        variant="p"
                        fontWeight={400}
                        fontSize={12}
                      >
                        {(val && val.period && val.period.year) ||
                          "Not Disclosed"}
                      </Typography>
                    </Box>
                    <Box>
                      <PiEngine />
                      <Typography
                        ml={1}
                        variant="p"
                        fontWeight={400}
                        fontSize={12}
                      >
                        {(val &&
                          val.specification &&
                          val.specification.power) ||
                          "Not Disclosed"}
                      </Typography>
                    </Box>
                    <Box>
                      <GiGearStickPattern />
                      <Typography
                        ml={1}
                        variant="p"
                        fontWeight={400}
                        fontSize={12}
                      >
                        {(val &&
                          val.specification &&
                          val.specification.transmission) ||
                          "Not Disclosed"}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  {val &&
                    val.specification &&
                    val.specification.equipments &&
                    val.specification.equipments.slice(0, 2).map((item, id) => (
                      <Chip
                        sx={{ bgcolor: "#000", color: "#fff", fontSize: 10 }}
                        avatar={
                          <Avatar sx={{ padding: 1, bgcolor: "#fff" }}>
                            <Done sx={{ fill: "blue", fontSize: 10 }} />
                          </Avatar>
                        }
                        label={item}
                        key={id}
                      />
                    ))}
                  {val &&
                    val.specification &&
                    val.specification.equipments &&
                    val.specification.equipments.length > 2 && (
                      <Chip
                        sx={{
                          bgcolor: "#000",
                          color: "#fff",
                          border: "1px solid #0000ff75",
                          fontSize: 10,
                          // "&:hover": {
                          //   bgcolor: "transparent",
                          //   border: "1px solid #0000ff75",
                          //   color: "#000",
                          // },
                          // transition: "0.5s ease all",
                          // cursor: "pointer",
                        }}
                        label={`+${
                          val.specification.equipments.length - 2
                        } more`}
                      />
                    )}
                </Stack>

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt={2}
                >
                  <Box>
                    <Typography fontSize={20} fontWeight={550}>
                      {val && val.price != null
                        ? `${val.price} €`
                        : "Not Disclosed"}
                    </Typography>
                    <Typography fontSize={12}>
                      {val &&
                      val.specification &&
                      val.specification.vatDeduction === OPTION_TYPE.No
                        ? "Without VAT Deduction"
                        : "Including VAT Deduction"}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => carDetails(val.id)}
                    color="inherit"
                    sx={{ fontSize: 12 }}
                  >
                    View Car Details <ChevronRight sx={{ fontSize: 15 }} />
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

export default BoxCar;
