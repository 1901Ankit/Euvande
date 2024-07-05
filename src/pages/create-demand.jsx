import data from "@/assests/data";
import Button from "@/components/button";
import ProgressStep from "@/components/stepper";
import { Card } from "@mui/material";
import { useState } from "react";
import styles from "@/styles/createDemand.module.css";
const CreateDemand = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  return (
    <div>
      <div className={styles.image_bg}>
        <ProgressStep data={data.carModifySteps} activeStep={activeStep} />
      </div>
      <Card>
        <Button onClick={handleNext} className="mt-4">
          Next
        </Button>
      </Card>
    </div>
  );
};

export default CreateDemand;
