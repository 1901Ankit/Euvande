import { ChevronLeft, Delete, Done } from "@mui/icons-material";
import { Box, Button, Chip, Grid } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Equipment = ({ setActiveStep, activeStep, setState, state, data }) => {
  const [equipment, setEquipment] = useState([]);

  state.equipments = Array.isArray(state.equipments) ? state.equipments : [];

  const handleSelectEquipment = (data) => {
    const previousEquipment = equipment.includes(data);
    if (previousEquipment) {
      const findIndex = equipment.findIndex((item) => item === data);
      const updatedEquipment = [...equipment];
      updatedEquipment.splice(findIndex, 1);
      setEquipment(updatedEquipment);
      setState({ ...state, equipments: updatedEquipment });
    } else {
      setEquipment((prevEquiment) => [...prevEquiment, data]);
      setState({ ...state, equipments: [...state.equipments, data] });
    }
  };

  const carInfo = useSelector((state) => state.CarInformation);
  // const selector = useSelector((state) => state);
  const getChipBgColor = (data) => {
    if (equipment && equipment.includes(data)) {
      return "#000000";
    } else if (
      carInfo &&
      carInfo.specification &&
      carInfo.specification.equipments &&
      carInfo.specification.equipments.includes(data)
    ) {
      return "#000000";
    } else {
      return "";
    }
  };

  const getChiptextColor = (data) => {
    if (equipment && equipment.includes(data)) {
      return "#ffffff";
    } else if (
      carInfo &&
      carInfo.specification &&
      carInfo.specification.equipments &&
      carInfo.specification.equipments.includes(data)
    ) {
      return "#ffffff";
    } else {
      return "";
    }
  };
  console.log("carInfo", carInfo);

  return (
    <Box>
      <Grid container spacing={2}>
        {data.map((val, i) => (
          <Grid item lg={4} key={i}>
            <Chip
              label={val}
              sx={{
                textTransform: "capitalize",
                bgcolor: getChipBgColor(val),
                color: getChiptextColor(val),
                "&:hover": {
                  bgcolor: getChipBgColor(val),
                },
              }}
              onClick={() => handleSelectEquipment(val)}
              deleteIcon={equipment ? <Done /> : <Delete />}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        color="inherit"
        onClick={() => setActiveStep(activeStep - 1)}
        sx={{ marginTop: 2 }}
      >
        <ChevronLeft /> Back
      </Button>
    </Box>
  );
};

export default Equipment;
