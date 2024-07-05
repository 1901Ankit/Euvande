import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import carDummy from "@/icons/cars.jpg";
import {
  ArrowCircleRightOutlined,
  Favorite,
  FavoriteBorder,
  LocationOnOutlined,
} from "@mui/icons-material";
import Dot from "../dot";
const CarGridCard = (props) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <div>
      <Card>
        <img src={props.carImage || carDummy.src} width={"100%"} />
        <Box p={2}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontSize={17} fontWeight={600}>
              {props.year} {props.make && props.make.makeName}{" "}
              {props.model && props.model.modelName}{" "}
              {props.variant && props.variant.variantName}
            </Typography>
            {favorite ? (
              <Favorite
                sx={{ fill: "red", cursor: "pointer" }}
                onClick={() => setFavorite(!favorite)}
              />
            ) : (
              <FavoriteBorder
                onClick={() => setFavorite(!favorite)}
                sx={{ cursor: "pointer" }}
              />
            )}
          </Stack>
          <Typography fontSize={12} color={"#455259"}>
            {props.vin || "Not Disclosed"}
          </Typography>

          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography fontSize={12}>{props.odometer}</Typography>
            <Dot width={3} height={3} bgColor={"#000"} />
            <Typography fontSize={12}>
              {props.variant && props.variant.fuelType}
            </Typography>
            <Dot width={3} height={3} bgColor={"#000"} />
            <Typography fontSize={12}>
              {props.specification && props.specification.transmission}
            </Typography>
          </Stack>
          <Typography fontSize={15} mt={1} mb={1} onClick={props.carDetails}>
            Check Car Details{" "}
            <ArrowCircleRightOutlined sx={{ fill: "#000" }} />
          </Typography>
          <Divider sx={{ backgroundColor: "#000", mt: 1 }} />
          <Typography fontSize={12} mt={1}>
            <LocationOnOutlined sx={{ fontSize: 15 }} />
            {props.location && props.location.city},
            {props.location && props.location.country}
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default CarGridCard;
