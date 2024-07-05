import {
  ChevronRightTwoTone,
  Favorite,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaAngleRight, FaHeart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import dummyCars from "@/icons/cars.jpg";
import Dot from "./dot";
import { CarStatus } from "@/utils/enum";
import { useRouter } from "next/router";
const CarCard = ({ data }) => {
  const [favourite, setFavourite] = useState(false);
  const favouriteHandler = () => {
    setFavourite(!favourite);
  };
  const router = useRouter();
  const details = (carId) => {
    router.push(`vehicles/${carId}/car-details`);
  };
  return (
    <Card
      sx={{
        height: 420,
        ":hover": {
          // transform: "scale(1.1)",
          // zIndex: 999,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        },
        transition: "0.5s ease all",
      }}
    >
      <Carousel
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        swipeable={false}
      >
        {data && data.carImages ? (
          data.carImages.map((val, i) => <img src={val} key={i} height={230} />)
        ) : (
          <img src={dummyCars.src} height={230} loading="lazy" />
        )}
      </Carousel>
      <Box sx={{ p: 1.2 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            textTransform={"capitalize"}
            fontSize={18}
            fontWeight={550}
          >
            {data && data.make && data.make.makeName}{" "}
            {data && data.model && data.model.modelName}
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography fontSize={12}>
            {data.vin || "VIN not disclosed"}
          </Typography>
          <Dot width={3} height={3} bgColor={"#000"} />
          <Typography fontSize={12}>
            {(data && data.specification && data.specification.transmission) ||
              "Not Disclosed"}
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1} my={1}>
          {data && data.variant && data.variant.fuelType && (
            <Typography fontSize={12}>
              {data && data.variant && data.variant.fuelType}
            </Typography>
          )}
          {data && data.period && <Dot width={3} height={3} bgColor={"#000"} />}
          {data && data.period && (
            <Typography fontSize={12}>
              {data && data.period && data.period.year}
            </Typography>
          )}
          {data && data.specification && data.specification.transmission && (
            <Dot width={3} height={3} bgColor="#000" />
          )}
          {data && data.specification && data.specification.transmission && (
            <Typography fontSize={12}>
              {data && data.specification && data.specification.transmission}
            </Typography>
          )}
          {data && data.ownership && (
            <Dot width={3} height={3} bgColor="#000" />
          )}
          {data && data.ownership && (
            <Typography fontSize={12}>{data && data.ownership}</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mb: 2 }}
        >
          {data && data.status && (
            <Typography
              fontSize={12}
              color={
                data && data.status === CarStatus.Available ? "green" : "red"
              }
              alignSelf={"end"}
            >
              {data && data.status}
            </Typography>
          )}
          {data && data.price && (
            <Typography textAlign={"end"} mt={2} fontSize={20} fontWeight={550}>
              {data && data.price} €
            </Typography>
          )}
        </Stack>
      </Box>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider sx={{ backgroundColor: "#000" }} />
        <Button
          fullWidth
          sx={{ color: "#000", fontSize: 13 }}
          onClick={() => details(data.id)}
        >
          View Details <ChevronRightTwoTone />{" "}
        </Button>
      </Box>
    </Card>
  );
};

export default CarCard;
