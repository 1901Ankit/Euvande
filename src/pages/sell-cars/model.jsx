import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { loginTextField } from "@/utils/styles";
import { Search } from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
import { vehicleController } from "@/api/addVehicle";
import { addCar, getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import { useDispatch, useSelector } from "react-redux";
import AddCarDetails from "@/components/carDetails";
const Model = () => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const [model, setModel] = useState("");
  const router = useRouter();
  const handleSelectModel = (modelName) => {
    setModel(modelName);
    setSelected(true);
    let body = {
      id: carInfo.id,
      modelId: modelName,
    };
    addCar({ body, router, path: "/sell-cars/variant", dispatch });
  };
  const [modelName, setModelName] = useState([]);

  const getModel = (body) => {
    vehicleController
      .getModels(body)
      .then((res) => {
        setModelName(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(localStorage.getItem("carId"));
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
        getCarDetails({ carId, setCarData, setLoading, dispatch });
      } else {
        console.log("not callinng");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchModel = async () => {
      if (carInfo.id) {
        let body = {
          makeId: carInfo.make,
          periodId: carInfo.period,
        };
        await getModel(body);
      } else {
        () => {};
      }
    };

    fetchModel();
  }, [carInfo.id]);

  return (
    <>
      <Head>
        <title>Select Model of your Car</title>
      </Head>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={12}>
            <LinkTab />

            <Card className="p-3">
              <h5 className="mb-3">Select Your Car Model</h5>

              <Grid container spacing={2}>
                {modelName.map((val, i) => (
                  <Grid item xs={4} key={i}>
                    <Button
                      sx={{
                        width: 150,
                        border:
                          carInfo.model === val.id
                            ? "1px solid #000"
                            : "1px solid #eee",
                        color: carInfo.model === val.id ? "#fff" : "#000",
                        backgroundColor:
                          carInfo.model === val.id ? "#000" : "transparent",
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "#000",
                        },
                      }}
                      onClick={() => handleSelectModel(val.id)}
                    >
                      {val.modelName}
                    </Button>
                  </Grid>
                ))}
              </Grid>
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

export default Model;
