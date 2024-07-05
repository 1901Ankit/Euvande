import { toast } from "react-toastify";
import { vehicleController } from "../addVehicle";
import { setCarDetails } from "@/redux/reducers/vehicleInformation";
import { setVehicleInformation } from "@/redux/reducers/carInformation";
import { getCars, getSellerPendingCars } from "./listingApi";
import { hideModal } from "@/redux/reducers/modal";
import { listingController } from "../listing";

export const addCar = ({
  body,
  router,
  path,
  dispatch,
  setLoading,
  setCarData,
  setEdit,
}) => {
  vehicleController
    .addVehicle(body)
    .then((res) => {
      dispatch(setCarDetails({ ...res.data.data }));
      setLoading && setLoading(false);
      getCarDetails({ setCarData, setLoading, carId: res.data.data.id });
      localStorage.setItem("carId", res.data.data.id);
      router && path && router.push(path);
      setEdit && setEdit(false);
    })
    .catch((err) => {
      let errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
      setLoading && setLoading(false);
    });
};
export const getCarInfo = ({ data, dispatch }) => {
  vehicleController
    .getCarInfo(data)
    .then((res) => {
      //   console.log("carInfo", res.data.data);
      dispatch(setCarDetails({ ...res.data.data }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSpecification = ({ data, router, path, setLoading }) => {
  vehicleController
    .addSpecifications(data)
    .then((res) => {
      router.push(path);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

export const getSpecification = (setSpecification) => {
  vehicleController
    .getSpecifications()
    .then((res) => {
      setSpecification(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addImageUpload = ({ data, router, setLoading }) => {
  vehicleController
    .uploadPhotos(data)
    .then((res) => {
      setLoading(false);
      router.push("/sell-cars/car-details");
    })
    .catch((err) => {
      let errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
      setLoading(false);
    });
};

export const getCarDetails = ({ carId, setCarData, setLoading, dispatch }) => {
  vehicleController
    .getVehicleDetails(carId)
    .then((res) => {
      setCarData(res.data.data);
      setLoading && setLoading(false);
      dispatch && dispatch(setVehicleInformation({ ...res.data.data }));
    })
    .catch((error) => {
      console.log(error);
      setLoading && setLoading(true);
    });
};

export const sendForApprovalCar = ({ carId, setLoading, router }) => {
  vehicleController
    .sendForApprovals(carId)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.removeItem("carId");
      setLoading(false);
      router.push("/user-profile");
    })
    .catch((err) => {
      let errMessage =
        (err.response && err.response.data.message) ||
        err.message ||
        "Network Error";
      toast.error(errMessage);
      setLoading(false);
    });
};

export const removePendingCar = ({
  carId,
  dispatch,
  setData,
  setLoading,
  page,
  pageSize,
}) => {
  vehicleController
    .deletePendingCars(carId)
    .then((res) => {
      toast.success("Car removed Successfully");
      getSellerPendingCars({ setData, setLoading, page, pageSize });
      dispatch(hideModal());
      localStorage.removeItem("carId");
    })
    .catch((err) => {
      let errMessage =
        (err.response && err.response.data.message) || err.message;
      toast.error(errMessage);
    });
};

export const addCarsToFavorite = ({
  data,
  setCarData,
  setLoading,
  page,
  pageSize,
  setFavoriteLoading,
  user,
}) => {
  vehicleController
    .favoriteCars(data)
    .then((res) => {
      setFavoriteLoading && setFavoriteLoading(false);
      getCars({
        setCarData,
        loading: setLoading,
        page,
        pageSize,
        body: { userId: user.id },
      });
    })
    .catch((err) => {
      let errMessage =
        (err.response && err.response.data.message) || err.message;
      toast.error(errMessage);
      setFavoriteLoading && setFavoriteLoading(false);
    });
};

export const getFavouriteCars = ({ setCarData, loading }) => {
  vehicleController
    .getFavoriteCars()
    .then((res) => {
      setCarData(res.data.data);
      loading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFuelType = ({ setFuelType, modelId }) => {
  vehicleController
    .getFuelType(modelId)
    .then((res) => {
      setFuelType(res.data.data.fuelType);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const vehicleMakeCount = ({ setMake }) => {
  listingController
    .getMakeCarsCount()
    .then((res) => {
      setMake(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
