import { loginTextField } from "@/utils/styles";
import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Features = ({ setActiveStep, activeStep, state, setState }) => {
  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({ ...error, [id]: "" });
  };
  const [error, setError] = useState({
    power: "",
    color: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (state.power === "" || state.color === "") {
      setError({
        ...error,
        power: state.power === "" && "Please Enter Engine Power in KWs",
        color: state.color === "" && "Please enter the Car Color",
      });
      return false;
    } else {
      setActiveStep(activeStep + 1);
      //   console.log(state);
      return true;
    }
  };
  const carInfo = useSelector((state) => state.CarInformation);

  useEffect(() => {
    setState({
      ...state,
      power:
        (carInfo && carInfo.specification && carInfo.specification.power) ||
        state.power,
      color:
        (carInfo && carInfo.specification && carInfo.specification.color) ||
        state.color,
    });
  }, [carInfo]);
  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <TextField
            sx={loginTextField}
            label="Power (kw)*"
            id="power"
            onChange={inputHandler}
            error={Boolean(error.power)}
            helperText={error.power}
            value={state.power}
            focused={state.power != "" ? true : false}
          />
          <TextField
            sx={loginTextField}
            label="Color*"
            id="color"
            onChange={inputHandler}
            error={Boolean(error.color)}
            helperText={error.color}
            value={state.color}
            focused={state.color != "" ? true : false}
          />
        </Stack>
        <Stack
          direction={"row"}
          marginTop={2}
          alignItems={"center"}
          spacing={2}
        >
          <Button
            sx={{
              width: 100,
              backgroundColor: "#000",
              color: "#fff",
              ":hover": {
                color: "#000",
                backgroundColor: "#fff",
              },
              border: "1px solid #000",
              transition: "0.5s ease all",
            }}
            type="submit"
          >
            Submit
          </Button>
          <Button
            onClick={() => setActiveStep(activeStep - 1)}
            sx={{
              color: "#000",
              backgroundColor: "#fff",
              ":hover": {
                color: "#fff",
                backgroundColor: "#000",
              },
              border: "1px solid #000",
              width: 100,
            }}
          >
            Back
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Features;
