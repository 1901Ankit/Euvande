import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { FaAngleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
const Vatdeduction = ({ setActiveStep, activeStep, setState, state, data }) => {
  const handleChangeVat = (vat) => {
    setState({ ...state, vatDeduction: vat });
    setActiveStep(activeStep + 1);
  };

  // Retrieve carInfo from Redux state
  const carInfo = useSelector((state) => state.CarInformation);

  return (
    <div>
      <Stack direction={"row"} flexWrap={"wrap"} spacing={2}>
        {data.map((val, i) => (
          <Button
            sx={{
              color: state.vatDeduction
                ? state.vatDeduction === val
                  ? "#fff"
                  : "#000"
                : carInfo &&
                  carInfo.specification &&
                  carInfo.specification.vatDeduction === val
                ? "#fff"
                : "#000",
              backgroundColor: state.vatDeduction
                ? state.vatDeduction === val
                  ? "#000"
                  : "#fff"
                : carInfo &&
                  carInfo.specification &&
                  carInfo.specification.vatDeduction === val
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
            key={i}
            onClick={() => handleChangeVat(val)}
            type="button"
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

export default Vatdeduction;
