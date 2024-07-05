import styles from "@/styles/specifications.module.css";
import { Button, Stack } from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
const DriveType = ({ setActiveStep, activeStep, setState, state, data }) => {
  const handleChangeDriveType = (driveType) => {
    setActiveStep(activeStep + 1);
    setState({ ...state, driveType4WD: driveType });
  };

  const carInfo = useSelector((state) => state.CarInformation);
  return (
    <div>
      <Stack direction="row" spacing={2}>
        {data.map((val, i) => (
          <Button
            key={i}
            sx={{
              color: state.driveType4WD
                ? state.driveType4WD === val
                  ? "#fff"
                  : "#000"
                : carInfo &&
                  carInfo.specification &&
                  carInfo.specification.driveType4WD === val
                ? "#fff"
                : "#000",
              backgroundColor: state.driveType4WD
                ? state.driveType4WD === val
                  ? "#000"
                  : "#fff"
                : carInfo &&
                  carInfo.specification &&
                  carInfo.specification.driveType4WD === val
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
            onClick={() => handleChangeDriveType(val)}
            type="button"
          >
            {val}
          </Button>
        ))}
      </Stack>
      <Button
        sx={{ mt: 2 }}
        color="inherit"
        onClick={() => setActiveStep(activeStep - 1)}
      >
        <FaAngleLeft /> Back
      </Button>
    </div>
  );
};

export default DriveType;
