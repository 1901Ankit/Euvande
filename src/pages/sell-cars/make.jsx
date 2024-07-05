import { vehicleController } from "@/api/addVehicle";
import { addCar, getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import { listingController } from "@/api/listing";
import Brands from "@/components/brands";
import AddCarDetails from "@/components/carDetails";
import LinkTab from "@/components/linktab";
import styles from "@/styles/tabs.module.css";
import { loginTextField } from "@/utils/styles";
import { Search } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Make = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [selected, setSelected] = useState(false);

  const carInfo = useSelector((state) => state.CarInfo);
  const [carId, setCarId] = useState("");
  const brandSelectHandler = (brandName) => {
    setBrand(brandName);
    let body = carId
      ? {
          makeId: brandName,
          id: parseInt(carId),
        }
      : {
          makeId: brandName,
        };
    addCar({ body, router, path: "/sell-cars/period", dispatch });
    setSelected(true);
  };
  const [brandSelector, setBrandSelector] = useState([]);
  const [carData, setCarData] = useState(null);
  const getMake = () => {
    listingController
      .getPublicMake()
      .then((res) => {
        setBrandSelector(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(localStorage.getItem("carId"));
      if (carId) {
        getCarInfo({ data: carId, dispatch });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(localStorage.getItem("carId"));
      if (carId) {
        await getCarDetails({ carId, setCarData, setLoading, dispatch });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, []);

  const carinfo = useSelector((state) => state);

  useEffect(() => {
    getMake();
    const car = localStorage.getItem("carId");
    setCarId(car);
  }, []);

  return (
    <>
      <Head>
        <title>Select bar brand to estimate car selling price</title>
      </Head>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <LinkTab brandSelected={!brand} />
            <Card className="p-5">
              <h4 className="mb-3">Select Your Car Brand</h4>

              <div className={styles.overflow_wrapper}>
                <div className="row ">
                  {brandSelector.map((val, i) => (
                    <div className="col-sm-2 mb-3 text-center" key={i}>
                      <Brands
                        img={val.logo}
                        key={i}
                        brands={val.makeName}
                        onClick={() => brandSelectHandler(val.id)}
                        width={100}
                        height={100}
                        selected={val.id === carInfo.make}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Grid>
          {/* <Grid item xs={4}>
            {carData && <AddCarDetails data={carData} loading={loading} />}
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

export default Make;
