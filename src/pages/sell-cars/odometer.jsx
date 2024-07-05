import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { Card, Container, Grid, Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
import { vehicleController } from "@/api/addVehicle";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import AddCarDetails from "@/components/carDetails";
const Odometer = () => {
  const [driven, setDriven] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const handleClick = (driven) => {
    setDriven(driven);
    let body = {
      id: carInfo.id,
      odometer: driven.driven,
    };
    addCar({ body, router, path: "/sell-cars/location", dispatch });
  };
  const [odometer, setOdoMeter] = useState([]);
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
        getCarDetails({ setCarData, setLoading, carId, dispatch });
      } else {
        return () => {};
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Odometer</title>
      </Head>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={12}>
            <LinkTab />

            <Card sx={{ p: 1 }}>
              <h5 className="mb-2">Select Km Driven</h5>
              <Stack spacing={3}>
                {data.odometer.map((val, i) => (
                  <Card
                    key={i}
                    sx={{
                      cursor: "pointer",
                      p: 1,
                      border:
                        carInfo.odometer === val.driven
                          ? "1px solid #000"
                          : "1px solid #fff",
                      color: carInfo.odometer === val.driven ? "#fff" : "#000",
                      backgroundColor:
                        carInfo.odometer === val.driven ? "#000" : "#fff",
                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#000",
                        border: "1px solid #000",
                        transition: "0.5s all",
                      },
                    }}
                    onClick={() => handleClick(val)}
                  >
                    {val.driven}
                  </Card>
                ))}
              </Stack>
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

export default Odometer;
