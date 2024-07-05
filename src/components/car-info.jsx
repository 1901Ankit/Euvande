import { Box, Card, Skeleton, Stack, Typography } from "@mui/material";
import Dot from "./dot";
import logo from "@/logo/EUVandeLogoBlack.svg";
const CarInfo = ({ carData, loading }) => {
  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        {loading ? (
          <Skeleton variant="rectangular" width={100} height={100} />
        ) : (
          <Card sx={{ p: 2 }}>
            <img src={carData.make.logo || logo.src} width={100} />
          </Card>
        )}
        {loading ? (
          <Skeleton variant="rectangular" width={200} />
        ) : (
          <Box>
            <Typography
              textAlign={"start"}
              fontSize={40}
              fontWeight={600}
              letterSpacing={2}
              textTransform={"capitalize"}
            >
              {carData.make.makeName} - {carData.model.modelName}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography fontSize={12}>
                {carData.vin || "VIN not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {(carData.period && carData.period.year) || "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {(carData.variant && carData.variant.fuelType) ||
                  "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {(carData.specification &&
                  carData.specification.transmission) ||
                  "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {carData.odometer || "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12} textTransform={"capitalize"}>
                {(carData.specification && carData.specification.vehicleType) ||
                  "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {(carData.variant && carData.variant.variantName) ||
                  "Not Disclosed"}
              </Typography>
            </Stack>
          </Box>
        )}
      </Stack>
    </div>
  );
};

export default CarInfo;
