import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { Card, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import AddCarDetails from "@/components/carDetails";
const Ownership = () => {
  const [ownership, setOwnership] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const handleClick = (ownerShip) => {
    setOwnership(ownerShip);
    let body = {
      id: carInfo.id,
      ownership: ownerShip,
    };
    addCar({ body, router, path: "/sell-cars/odometer", dispatch });
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
        return () => {};
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Ownership</title>
      </Head>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-12 ">
            <LinkTab />
            <Card className="p-3">
              <h5>Select Car Ownership</h5>
              <Stack spacing={3}>
                {data.carOwnerShip.map((val, i) => (
                  <Card
                    key={i}
                    onClick={() => handleClick(val.ownership)}
                    sx={{
                      p: 1,
                      cursor: "pointer",
                      color:
                        carInfo.ownership === val.ownership ? "#fff" : "#000",
                      backgroundColor:
                        carInfo.ownership === val.ownership ? "#000" : "#fff",
                      border:
                        carInfo.ownership === val.ownership
                          ? "1px solid #000"
                          : "1px solid #fff",
                      "&:hover": {
                        border: "1px solid #000",
                        backgroundColor: "#000",
                        color: "#fff",
                        transition: "0.5s all",
                      },
                    }}
                  >
                    {val.ownership}
                  </Card>
                ))}
              </Stack>
            </Card>
          </div>
          {/* <div className="col-sm-3">
            {carData && <AddCarDetails loading={loading} data={carData} />}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Ownership;
