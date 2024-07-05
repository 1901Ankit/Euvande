import { vehicleController } from "@/api/addVehicle";
import {
  addImageUpload,
  getCarDetails,
  getCarInfo,
} from "@/api/apiCalling/vehicle";
import data from "@/assests/data";
import Button from "@/components/button";
import AddCarDetails from "@/components/carDetails";
import ImageUpload from "@/components/imageUpload";
import LinkTab from "@/components/linktab";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Container,
  Divider,
  Grid,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const UploadPicture = () => {
  const inputRefs = useRef({});
  const dispatch = useDispatch();
  const [carId, setCarId] = useState("");
  const carInfo = useSelector((state) => state.CarInfo);
  const [imagePreviews, setImagePreviews] = useState({});
  const [state, setState] = useState({
    frontView: null,
    frontLeft: null,
    frontRight: null,
    rearView: null,
    rearLeft: null,
    headlamp: null,
    engine: null,
    driverDoor: null,
    driverSeat: null,
    passengerSeat: null,
    instrumentPanel: null,
    dashboard: null,
    rearPanelOfCenterConsole: null,
    rearSeat: null,
    Headlining: null,
    frontLeftWheel: null,
    backLeftWheel: null,
    backRightWheel: null,
    frontRightWheel: null,
    frontLeftTyre: null,
    backLeftTyre: null,
    backRightTyre: null,
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({});
  const handleImageUpload = async (id) => {
    const file = inputRefs.current[id].files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        [id]: imageUrl,
      }));
      setState({ ...state, [id]: file });
      const formData = new FormData();
      formData.append(id, file);
      formData.append("carId", carInfo && carInfo.id);

      try {
        const result = await vehicleController.uploadPhotos(
          formData,
          (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress((prevProgress) => ({
              ...prevProgress,
              [id]: progress,
            }));
          }
        );

        setProgress((prevProgress) => {
          const updatedProgress = { ...prevProgress };
          delete updatedProgress[id];
          return updatedProgress;
        });
      } catch (error) {
        console.log(error);
        // Handle errors
        // console.error(`${id} upload failed:`, error);
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const isAtLeastOneImageUploaded = Object.values(state).some(
      (image) => image !== null
    );
    if (!isAtLeastOneImageUploaded) {
      // Notify the user to upload at least one image
      toast.error("Please upload at least one image before submitting.");
      return;
    } else {
      setLoading(true);
      router.push("/sell-cars/car-details");
    }
  };

  const [carData, setCarData] = useState(null);
  const [carDataLoading, setCarDataLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      setCarId(carId);
      if (carId) {
        getCarInfo({ data: carId, dispatch });
        getCarDetails({ carId, setCarData, setLoading: setCarDataLoading });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        vehicleController
          .getVehicleDetails(carId)
          .then((res) => {
            const response = res.data.data.media.images;
            if (response) {
              setImagePreviews((prevPreviews) => ({
                ...prevPreviews,
                frontLeft: response.frontLeft || null,
                frontView: response.frontView || null,
                frontRight: response.frontRight || null,
                rearRight: response.rearRight || null,
                rearView: response.rearView || null,
                rearLeft: response.rearLeft || null,
                Headlining: response.Headlining || null,
                headlamp: response.headlamp || null,
                engine: response.engine || null,
                driverDoor: response.driverDoor || null,
                backLeftTyre: response.backLeftTyre || null,
                backLeftWheel: response.backLeftWheel || null,
                backRightTyre: response.backRightTyre || null,
                backRightWheel: response.backRightWheel || null,
                dashboard: response.dashboard || null,
                driverDoor: response.driverDoor || null,
                driverSeat: response.driverSeat || null,
                engine: response.engine || null,
                frontLeftTyre: response.frontLeftTyre || null,
                frontLeftWheel: response.frontLeftWheel || null,
                frontRightTyre: response.frontRightTyre || null,
                frontRightWheel: response.frontRightWheel || null,
                instrumentPanel: response.instrumentPanel || null,
                passengerSeat: response.passengerSeat || null,
                rearPanelOfCenterConsole:
                  response.rearPanelOfCenterConsole || null,
                rearSeat: response.rearSeat || null,
              }));
              setState((state) => ({
                ...state,
                frontLeft: response.frontLeft || null,
                frontView: response.frontView || null,
                frontRight: response.frontRight || null,
                rearRight: response.rearRight || null,
                rearView: response.rearView || null,
                rearLeft: response.rearLeft || null,
                Headlining: response.Headlining || null,
                headlamp: response.headlamp || null,
                engine: response.engine || null,
                driverDoor: response.driverDoor || null,
                backLeftTyre: response.backLeftTyre || null,
                backLeftWheel: response.backLeftWheel || null,
                backRightTyre: response.backRightTyre || null,
                backRightWheel: response.backRightWheel || null,
                dashboard: response.dashboard || null,
                driverDoor: response.driverDoor || null,
                driverSeat: response.driverSeat || null,
                engine: response.engine || null,
                frontLeftTyre: response.frontLeftTyre || null,
                frontLeftWheel: response.frontLeftWheel || null,
                frontRightTyre: response.frontRightTyre || null,
                frontRightWheel: response.frontRightWheel || null,
                instrumentPanel: response.instrumentPanel || null,
                passengerSeat: response.passengerSeat || null,
                rearPanelOfCenterConsole:
                  response.rearPanelOfCenterConsole || null,
                rearSeat: response.rearSeat || null,
              }));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <Head>
        <title>Upload Photos-car</title>
      </Head>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={12}>
            <LinkTab />
            <form onSubmit={submitHandler}>
              <Card className=" py-3">
                <div className="p-2">
                  <h5>Vehicle Photo Documentation</h5>
                </div>
                <Divider style={{ backgroundColor: "#000" }} />
                <div className="p-2">
                  <p className="f-12 fw-semibold mt-2">
                    Take photos of the car from all four sides as well as the
                    dashboard and interior equipment, including any damage or
                    wear to the interior and exterior (paint damage, curbed
                    rims, cracks, etc.).
                  </p>
                  <div>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <h4 className="mb-2">Exterior</h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ImageUpload
                          data={data.photoUpload}
                          handleImageUpload={handleImageUpload}
                          imagePreviews={imagePreviews}
                          inputRefs={inputRefs}
                          progress={progress}
                        />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <h4 className="mb-2">Interior</h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ImageUpload
                          data={data.interiorPhotoUpload}
                          handleImageUpload={handleImageUpload}
                          imagePreviews={imagePreviews}
                          inputRefs={inputRefs}
                          progress={progress}
                        />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <h4 className="mb-2">Wheel and Tyres</h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ImageUpload
                          data={data.tyres}
                          handleImageUpload={handleImageUpload}
                          imagePreviews={imagePreviews}
                          inputRefs={inputRefs}
                          progress={progress}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div className="text-end mt-2">
                    <Button
                      className="custom_btn"
                      type="submit"
                      width={150}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loading
                          type="bars"
                          width={20}
                          height={20}
                          className="m-auto"
                          color="#ff0000"
                        />
                      ) : (
                        <>
                          <span>Continue</span>
                          <span>Continue</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </form>
          </Grid>
          {/* <Grid item lg={4}>
            {carData && (
              <AddCarDetails data={carData} loading={carDataLoading} />
            )}
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default UploadPicture;
