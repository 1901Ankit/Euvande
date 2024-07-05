import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
import CarInfo from "../car-info";
import { useSelector } from "react-redux";
const Doors = ({ data, setActiveStep, activeStep, setState, state }) => {
  const [doors, setDoors] = useState("");
  const carInfo = useSelector((state) => state.CarInformation);
  const handleChangeDoors = (doors) => {
    setDoors(doors);
    setActiveStep(activeStep + 1);
    setState({ ...state, doors: doors });
  };
  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {data.map((val, i) => (
          <Button
            key={i}
            onClick={() => handleChangeDoors(val)}
            sx={{
              color: state.doors
                ? state.doors === val
                  ? "#fff"
                  : "#000"
                : carInfo &&
                  carInfo.specification &&
                  carInfo.specification.doors === val
                ? "#fff"
                : "#000",
              backgroundColor: state.doors
                ? state.doors === val
                  ? "#000"
                  : "#fff"
                : carInfo &&
                  carInfo.specification &&
                  carInfo.specification.doors === val
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
            type="button"
          >
            {val}
          </Button>
        ))}
      </Stack>
      <Button
        onClick={() => setActiveStep(activeStep - 1)}
        sx={{ mt: 2 }}
        color="inherit"
      >
        <FaAngleLeft /> Back
      </Button>
    </div>
  );
};

export default Doors;
