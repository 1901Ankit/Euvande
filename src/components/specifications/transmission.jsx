import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import styles from "@/styles/specifications.module.css";
import Loading from "react-loading";
import { useSelector } from "react-redux";
const Transmission = ({
  setActiveStep,
  activeStep,
  data,
  setState,
  state,
  loading,
}) => {
  const [transmission, setTransmission] = useState("");
  const onTransmissionSelect = (transmission) => {
    setTransmission(transmission);
    setActiveStep(activeStep + 1);
    setState({ ...state, transmission: transmission });
  };
  const carInfo = useSelector((state) => state.CarInformation);

  return (
    <div>
      {loading ? (
        <Loading type="bars" className="m-auto" width={20} height={20} />
      ) : (
        <Stack direction={"row"} spacing={2}>
          {data.map((val, i) => (
            <Button
              key={i}
              sx={{
                color: state.transmission
                  ? state.transmission === val
                    ? "#fff"
                    : "#000"
                  : carInfo &&
                    carInfo.specification &&
                    carInfo.specification.transmission === val
                  ? "#fff"
                  : "#000",
                backgroundColor: state.transmission
                  ? state.transmission === val
                    ? "#000"
                    : "#fff"
                  : carInfo &&
                    carInfo.specification &&
                    carInfo.specification.transmission === val
                  ? "#000"
                  : "#fff",
                border: state.transmission
                  ? state.transmission === val
                    ? "1px solid #000"
                    : "1px solid  #000"
                  : carInfo &&
                    carInfo.specification &&
                    carInfo.specification.transmission === val
                  ? "1px solid #000"
                  : "1px solid #000",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "#000",
                  border: "1px solid #000",
                },
              }}
              type="button"
              onClick={() => onTransmissionSelect(val)}
            >
              {val}
            </Button>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default Transmission;
