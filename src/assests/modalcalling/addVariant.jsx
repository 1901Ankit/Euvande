import { vehicleController } from "@/api/addVehicle";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  responsiveFontSizes,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import data from "../data";
import Loading from "react-loading";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideModal } from "@/redux/reducers/modal";

const Addvariant = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    modelId: "",
    modelName: "",
    carId: "",
    variantName: "",
    fuelType: "",
  });
  const [error, setError] = useState({
    variantName: "",
    fuelType: "",
  });
  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({ ...error, [id]: "" });
  };

  const fuelTypeHandler = (e, newValue) => {
    if (newValue) {
      setState({ ...state, fuelType: newValue.id });
      setError({ ...error, fuelType: "" });
    } else {
      setState({ ...state, fuelType: "" });
    }
  };
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();

    if (state.fuelType === "" || state.variantName === "") {
      setError({
        ...error,
        variantName: state.variantName === "" && "Please Enter  Variant Name",
        fuelType: state.fuelType === "" && "Please Select Fuel Type",
      });
    } else {
      setLoading(true);
      let body = {
        variantName: state.variantName,
        modelId: state.modelId,
        id: state.carId,
        fuelType: state.fuelType,
      };
      vehicleController
        .addVehicle(body)
        .then((res) => {
          setLoading(false);

          router.push("/sell-cars/ownership");
          dispatch(hideModal())
        })
        .catch((err) => {
          let errMessage =
            (err.response && err.response.data.message) || err.message;
          toast.error(errMessage);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const fetchData = () => {
      const carId = localStorage.getItem("carId");
      vehicleController
        .getVehicleDetails(carId)
        .then((res) => {
          const response = res.data.data;
          if (response) {
            setState({
              ...state,
              modelId: (response.model && response.model.id) || "",
              modelName: (response.model && response.model.modelName) || "",
              carId: response && response.id,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h6" fontWeight={600}>
        Add Variant
      </Typography>
      <Divider sx={{ backgroundColor: "#000" }} />
      <form onSubmit={submitHandler}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              id="modelName"
              fullWidth
              sx={loginTextField}
              label="Model Name"
              value={state.modelName}
            />
            <TextField
              sx={loginTextField}
              id="variantName"
              label="Enter Variant Name"
              onChange={inputHandler}
              error={Boolean(error.variantName)}
              helperText={error.variantName}
            />
            {/* <ReactSelect
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: 8,
                  border: "1px solid #000",
                  boxShadow: "none",
                  ":hover": {
                    border: "1px solid #000",
                  },
                  zIndex: 999,
                }),
              }}
              components={{
                IndicatorSeparator: () => null,
              }}
              options={data.variantTypes.map((val, i) => {
                return {
                  label: val.label,
                  id: val.id,
                };
              })}
              placeholder="Select Fuel Type"
              onChange={fuelTypeHandler}
            /> */}
            <Autocomplete
              renderInput={(params) => (
                <TextField {...params} label="Select Fuel Type" />
              )}
              options={data.variantTypes}
              getOptionLabel={(option) => option.label}
              onChange={fuelTypeHandler}
            />
            <FormHelperText sx={{ color: "#ff0000" }}>
              {error.fuelType}
            </FormHelperText>
            <Button
              sx={{
                color: "#000",
                backgroundColor: "#fff",
                border: "1px solid #d7d7d7",
                ":hover": {
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                },
                p: 1,
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loading
                  type="bars"
                  width={20}
                  height={20}
                  className="m-auto"
                  color="#000"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
};

export default Addvariant;
