import React from "react";
import { useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import DiacoTabLogin from "./DiacoTabLogin";
import DiacoCreateUser from "./DiacoCreateUser";

const login_recuperarContraseña = [
  {
    componente: <DiacoTabLogin />,
  },
  {
    componente: <DiacoCreateUser />,
  },
];

function Transition() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = login_recuperarContraseña.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="grid">
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {login_recuperarContraseña.map((step, index) => (
          <div key={index}>
            {login_recuperarContraseña[activeStep].componente}
          </div>
        ))}
      </SwipeableViews>
      <Link
        className="mt-32 cursor-pointer"
        onClick={() => {
          handleNext();
        }}
        hidden={activeStep === maxSteps - 1}
        style={{ color: "initial" }}
      >
        <Typography className="mx-auto text-center" color="secondary">
          Crear usuario
        </Typography>
      </Link>
      <Link
        className="cursor-pointer"
        onClick={() => {
          handleBack();
        }}
        hidden={activeStep === 0}
        style={{ color: "initial" }}
      >
        <Typography className="mt-32 mx-auto text-center" color="primary">
          Regresar
        </Typography>
      </Link>
    </div>
  );
}
export default Transition;
