const { default: axios } = require("axios");
const { serverconstants } = require("./serverconstant");

const securedAPI = axios.create({
  baseURL: serverconstants.authenticationServerURL,
});
const vehicleSecuredAPI = axios.create({
  baseURL: serverconstants.vehicleServerURL,
});

securedAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.accessToken = `${token}`;
  return config;
});
vehicleSecuredAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.accessToken = `${token}`;
  return config;
});

const publicAPI = axios.create({
  baseURL: serverconstants.authenticationServerURL,
});
const vehcilePublicAPI = axios.create({
  baseURL: serverconstants.vehicleServerURL,
});

export default { securedAPI, publicAPI, vehicleSecuredAPI, vehcilePublicAPI };
