import { Button, Stack } from "@mui/material";
import React from "react";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
const Interior = ({ setState, state, setActiveStep, activeStep, data }) => {
  const handelChangeInterior = (interior) => {
    setState({ ...state, interiorMaterial: interior });
    setActiveStep(activeStep + 1);
  };
  const carInfo = useSelector((state) => state.CarInformation);
  return (
    <div>
      <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
        {data.map((val, i) => (
          <Button
            key={i}
            onClick={() => handelChangeInterior(val)}
            type="button"
            sx={{
              color: state.interiorMaterial
                ? state.interiorMaterial === val
                  ? "#fff"
                  : "#000"
                : carInfo &&
                  carInfo.specification &&
                  carInfo.specification.interiorMaterial === val
                ? "#fff"
                : "#000",
              backgroundColor: state.interiorMaterial
                ? state.interiorMaterial === val
                  ? "#000"
                  : "#fff"
                : carInfo &&
                  carInfo.specification &&
                  carInfo.specification.interiorMaterial === val
                ? "#000"
                : "#fff",
              border: "1px solid #000",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#000",
                border: "1px solid #000",
              },
              textTransform: "capitalize",
              width: 100,
            }}
          >
            {val}
          </Button>
        ))}
      </Stack>
      <Button
        onClick={() => setActiveStep(activeStep - 1)}
        sx={{ mt: 2, color: "#000" }}
      >
        <FaAngleLeft /> Back
      </Button>
    </div>
  );
};

export default Interior;
