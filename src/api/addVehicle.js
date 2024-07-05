import securedAPI from "./config";
import vehicleSecuredAPI from "./config";
import vehiclePublicAPI from "./config";
export const vehicleController = {
  getMake: async () => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.get(
        "/api/make/getAllMake"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPeriodByMake: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        "/api/period/getPeriodByMake",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getModels: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        "/api/model/getModel",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getVariants: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        "/api/variant/getVariantByModel",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getSpecifications: async () => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.get(
        "/api/carSpecification/getDefaultSpecification"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addVehicle: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        "/api/cars/addCar",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCarInfo: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.get(
        `/api/cars/getCarById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addSpecifications: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        "/api/cars/addSpecification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  uploadPhotos: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        "/api/cars/addMedia",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getVehicleDetails: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.get(
        `/api/cars/getCarDetailById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  sendForApprovals: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.get(
        `/api/cars/sendForApproval/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  deletePendingCars: async (carId) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.delete(
        `/api/cars/deleteCar/${carId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  favoriteCars: async (data) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        "api/favouriteCar/favourite",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getFavoriteCars: async () => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.get(
        "api/favouriteCar/getFavouriteCars"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getFuelType: async (modelId) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.get(
        `api/variant/public/getFuelType/${modelId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
