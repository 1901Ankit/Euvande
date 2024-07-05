import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import TabPanel from "@/components/tabPanel";
import { varianttabButton } from "@/utils/styles";
import {
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { vehicleController } from "@/api/addVehicle";
import { useDispatch, useSelector } from "react-redux";
import {
  addCar,
  getCarDetails,
  getCarInfo,
  getFuelType,
} from "@/api/apiCalling/vehicle";
import AddCarDetails from "@/components/carDetails";
import { showModal } from "@/redux/reducers/modal";
import Addvariant from "@/assests/modalcalling/addVariant";
const Variant = () => {
  const [value, setValue] = useState(0);
  const [fuel, setFuel] = useState([]);
  // const [variantType, setVariantType] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const handleClick = (variant) => {
    setVariantType(variant);
    let body = {
      id: carInfo.id,
      variantId: variant,
    };
    addCar({ body, router, path: "/sell-cars/ownership", dispatch });
  };
  const [fuelType, setFuelType] = useState([]);
  const [variantType, setVariantType] = useState(null);

  useEffect(() => {
    if (fuelType && fuelType.length > 0) {
      setVariantType(fuelType[0]);
    }
  }, [fuelType]);

  const handleChange = (e, newvalue) => {
    setValue(newvalue);
    setVariantType(e.target.id);
    let body = {
      modelId: carInfo.model,
      fuelType: e.target.id,
    };
    getModel(body);
  };

  const getModel = (body) => {
    vehicleController
      .getVariants(body)
      .then((res) => {
        setFuel(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
        getCarDetails({ carId, setCarData, setLoading });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, []);

  const handleAddVariantModal = () => {
    dispatch(showModal(<Addvariant />));
  };

  useEffect(() => {
    const fetchVariant = async () => {
      if (carInfo.id) {
        let body = {
          modelId: carInfo.model,
          fuelType: variantType,
        };
        await getModel(body);
      } else {
        return () => {};
      }
    };

    fetchVariant();
  }, [variantType]);

  useEffect(() => {
    if (carInfo.model) {
      getFuelType({ setFuelType, modelId: carInfo.model });
    }
  }, [carInfo.model]);

  return (
    <>
      <Head>
        <title>Variant</title>
      </Head>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={12}>
            <LinkTab />
            <Card className="p-3">
              <h5 className="mb-3">Select Variant</h5>
              <Tabs
                onChange={handleChange}
                value={value}
                sx={{
                  border: "1px solid #000",
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 0.8,
                }}
              >
                {fuelType.map((val, i) => (
                  <Tab
                    label={val}
                    id={val}
                    key={i}
                    sx={{
                      color: "#000",
                      width: 150,
                      fontSize: 12,
                      "&.Mui-selected": {
                        color: "#000",
                        // border: "#000",
                        // backgroundColor: "#000",
                        borderRadius: 8,
                        width: 150,
                        border: "1px solid #eee",
                        boxShadow:
                          " -20px -20px 60px #bebebe, 20px 20px 60px #ffffff",
                      },
                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: 8,
                        width: 150,
                      },
                      my: 0.3,
                      padding: 2,
                    }}
                  />
                ))}
              </Tabs>
              {data.variants.map((val, i) => (
                <TabPanel value={value} index={i} className="mt-3 p-2">
                  {/* <h6>{val.label}</h6> */}
                  {fuel.length ? (
                    <Grid container spacing={3}>
                      {fuel.map((val, i) => (
                        <Grid item xs={3} key={i}>
                          <Card
                            onClick={() => handleClick(val.id)}
                            sx={{
                              p: 1,
                              border:
                                carInfo.variant === val.id
                                  ? "1px solid #000"
                                  : "1px solid #eee",
                              color:
                                carInfo.variant === val.id ? "#fff" : "#000",
                              cursor: "pointer",
                              "&:hover": {
                                color: "#fff",
                                backgroundColor: "#000",
                                border: "1px solid #000",
                              },
                              mt: 1,
                              backgroundColor:
                                carInfo.variant === val.id ? "#000" : "#fff",
                            }}
                          >
                            {val.variantName}
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography marginTop={2}>No Variants Found</Typography>
                      <Button
                        color="inherit"
                        sx={{ fontSize: 12 }}
                        onClick={handleAddVariantModal}
                      >
                        {" "}
                        Add Variant +
                      </Button>
                    </Stack>
                  )}
                </TabPanel>
              ))}
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

export default Variant;
