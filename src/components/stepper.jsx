import { Step, StepButton, Stepper } from "@mui/material";

const ProgressStep = (props) => {
  return (
    <div>
      <Stepper activeStep={props.activeStep}>
        {props.data.map((val, i) => (
          <Step key={i}>
            <StepButton>{val.name}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProgressStep;
