import { CarStatus, OPTION_TYPE } from "@/utils/enum";
import { CalendarMonth, DirectionsCar } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import CustomButton from "./button2";
import { sendForApprovalCar } from "@/api/apiCalling/vehicle";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "react-loading";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import { loginTextField } from "@/utils/styles";

const CarInfoCard = ({
  carData,
  loading,
  onChange,
  onSubmit,
  priceLoading,
  setEdit,
  edit,
  price,
}) => {
  const router = useRouter();
  const carSpecifications = [
    {
      icon: <GiRoad />,
      data: carData && carData.odometer,
    },
    {
      icon: <CalendarMonth />,
      data: carData && carData.period && carData.period.year,
    },
    {
      icon: <PiEngine />,
      data:
        `${
          carData && carData.specification && carData.specification.power
        } kw` || "Not Disclosed",
    },
    {
      icon: <GiGearStickPattern />,
      data:
        (carData &&
          carData.specification &&
          carData.specification.transmission) ||
        "Not Disclosed",
    },
    {
      icon: <BsFuelPump style={{ marginLeft: "4px" }} />,
      data:
        (carData && carData.variant && carData.variant.fuelType) ||
        "Not Disclosed",
    },
    {
      icon: <DirectionsCar />,
      data:
        (carData &&
          carData.specification &&
          carData.specification.vehicleType) ||
        "Not Disclosed",
    },
  ];

  const [approvalLoading, setApprovalLoading] = useState(false);
  const approvalSending = () => {
    setApprovalLoading(true);
    if (carData && carData.price) {
      sendForApprovalCar({
        carId: carData.id,
        setLoading: setApprovalLoading,
        router,
      });
    } else {
      toast.error("Please Enter Price First");
      setApprovalLoading(false);
    }
  };

  return (
    <Card sx={{ position: "relative", bottom: 120 }}>
      <Grid container>
        <Grid item lg={5}>
          {loading ? (
            <Skeleton variant="rectangular" width={300} height={300} />
          ) : (
            <Carousel showThumbs={false} showIndicators={false}>
              {carData &&
                carData.carImages.map((val) => <img src={val} height={350} />)}
            </Carousel>
          )}
        </Grid>
        <Grid item lg={7} p={2}>
          {loading ? (
            <Skeleton variant="text" width={100} />
          ) : (
            <>
              <Typography
                fontSize={18}
                fontWeight={600}
                letterSpacing={0.2}
                color={"#495254"}
                textTransform={"capitalize"}
              >
                {carData.make.makeName} - {carData.model.modelName}{" "}
                {carData && carData.variant && carData.variant.variantName}
              </Typography>

              <Typography fontSize={12} color={"#495254"}>
                {carData.vin || "Not Disclosed"}
              </Typography>
            </>
          )}

          <Box my={2}>
            <Grid container>
              {carSpecifications.map((val, i) => (
                <Grid item lg={4} key={i} mb={1}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    {val.icon}
                    <Typography fontSize={12} textTransform={"capitalize"}>
                      {val.data}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
          {edit ? (
            <Grid container alignItems={"center"} spacing={1}>
              <Grid item lg={6}>
                <TextField
                  label="Enter Desired Amount"
                  sx={loginTextField}
                  fullWidth
                  value={price}
                  onChange={onChange}
                  type="number"
                />
              </Grid>
              <Grid item lg={6}>
                {/* <CustomButton
                  className="custom-btn"
                  padding="18px"
                  width="100%"
                  fs="13px"
                  border="1px solid #495254"
                  onClick={onSubmit}
                >
                  {priceLoading ? (
                    <Loading type="bars" width={20} height={20} color="red" />
                  ) : (
                    "Add Price"
                  )}
                </CustomButton> */}
                <Button
                  sx={{
                    border: "1px solid #d7d7d7",
                    color: "#000",
                    p: 2,
                    ":hover": {
                      boxShadow: "0px 0px 2px 2px #eee",
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={onSubmit}
                  fullWidth
                >
                  {priceLoading ? (
                    <Loading
                      type="bars"
                      width={20}
                      height={20}
                      color="#000"
                      className="m-auto"
                    />
                  ) : (
                    "Add Price"
                  )}
                </Button>
              </Grid>
            </Grid>
          ) : carData && carData.price ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box textAlign={"start"}>
                <Typography fontSize={30} fontWeight={600}>
                  {carData.price} €
                </Typography>
                <Typography fontSize={12}>
                  {carData &&
                  carData.specification &&
                  carData.specification.vatDeduction === OPTION_TYPE.No
                    ? "Without VAT Deduction"
                    : "Included With VAT Deduction"}
                </Typography>
              </Box>
              <Button onClick={() => setEdit(true)}>Edit price</Button>
            </Box>
          ) : (
            <Grid container alignItems={"center"} spacing={1}>
              <Grid item lg={6}>
                <TextField
                  label="Enter Desired Amount"
                  sx={loginTextField}
                  fullWidth
                  onChange={onChange}
                  type="number"
                />
              </Grid>
              <Grid item lg={6}>
                {/* <CustomButton
                  className="custom-btn"
                  padding="18px"
                  width="100%"
                  fs="13px"
                  border="1px solid #495254"
                  onClick={onSubmit}
                >
                  {priceLoading ? (
                    <Loading type="bars" width={20} height={20} color="red" />
                  ) : (
                    "Add Price"
                  )}
                </CustomButton> */}
                <Button
                  sx={{
                    border: "1px solid #d7d7d7",
                    color: "#000",
                    p: 2,
                    ":hover": {
                      boxShadow: "0px 0px 2px 2px #eee",
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={onSubmit}
                  fullWidth
                >
                  {priceLoading ? (
                    <Loading
                      type="bars"
                      width={20}
                      height={20}
                      color="#000"
                      className="m-auto"
                    />
                  ) : (
                    "Add Price"
                  )}
                </Button>
              </Grid>
            </Grid>
          )}

          <Grid container mt={2}>
            <Grid lg={12}>
              <Button
                fullWidth
                onClick={approvalSending}
                disabled={carData && !carData.price ? true : false}
                sx={{
                  "&.Mui-disabled": {
                    color: "#d7d7d7",
                  },
                  color: "#000",
                  backgroundColor: "#fff",
                  border: "1px solid #d7d7d7",
                  padding: 1,
                  ":hover": {
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  },
                  transition: "0.5s ease all",
                }}
              >
                {approvalLoading ? (
                  <Loading type="bars" color="#000" width={20} height={20} />
                ) : carData && carData.status === CarStatus.Pending ? (
                  "Waiting for EuVande Approval"
                ) : (
                  " Put car up for the Approval"
                )}
              </Button>
            </Grid>
          </Grid>
          {/* <Grid container>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Checkbox id="terms" />
              <label htmlFor="terms" className="f-12">
                I agree{" "}
              </label>
              <a
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
                href="#"
              >
                with the terms & conditions
              </a>
            </Stack>
          </Grid> */}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CarInfoCard;
