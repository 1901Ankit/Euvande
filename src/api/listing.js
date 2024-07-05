import SecuredAPI from "./config";
import publicAPI from "./config";
import vehicleSecuredAPI from "./config";
import vehiclePublicAPI from "./config";
export const listingController = {
  getuserAddress: async () => {
    try {
      let result = await SecuredAPI.securedAPI.get("/api/address/getAddresses");
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSellerPendingCars: async ({ status, page, pageSize }) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        status
          ? `/api/cars/getSellerCars?status=${status}&page=${
              page === 0 ? 1 : page
            }&pageSize=${pageSize}`
          : `/api/cars/getSellerCars?page=${page}&pageSize=${pageSize}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicMake: async () => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.get(
        "/api/make/public/getAllMake"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicPeriod: async (data) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.post(
        "/api/period/public/getPeriodByMake",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicModel: async (data) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.post(
        "/api/model/public/getModelByYear",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCars: async ({ body, page, pageSize }) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        `/api/newCars/getCarList?page=${(page && page) || "1"}&&pageSize=${
          (pageSize && pageSize) || "10"
        }`,
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCarDetailsByCarId: async ({ carId, userId }) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.get(
        userId
          ? `/api/newCars/getCarDetailById/${carId}?userId:${userId}`
          : `/api/newCars/getCarDetailById/${carId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getDefaultSpecificationPublic: async (data) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.get(
        "/api/carSpecification/public/getDefaultSpecification"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getMakeCarsCount: async () => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.get(
        "api/newCars/public/getCountWithMake"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
