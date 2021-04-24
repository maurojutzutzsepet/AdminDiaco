import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent } from "@material-ui/core";
import { darken } from "@material-ui/core/styles/colorManipulator";
import clsx from "clsx";
import { FuseAnimate } from "@fuse";
import Transition from "./tabs/Transition";

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "linear-gradient(to right, " +
      "#1976d2" +
      " 0%, " +
      darken(theme.palette.primary.main, 0.5) +
      " 100%)",
    color: theme.palette.primary.contrastText,
  },
  formCardXS: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      height: "100%",
    },
  },
  flexUno: {
    [theme.breakpoints.down("xs")]: {
      flex: "1 1 0%",
    },
  },
}));

function Login() {
  const classes = useStyles();
  return (
    <div
      //style={{ backgroundImage: "url(assets/images/logos/diaco2.jpg)" }}
      className={clsx(
        classes.root,
        "flex flex-col flex-1 flex-shrink-0 md:flex-row md:p-0 bg-center bg-cover"
      )}
    >
      <div className="flex flex-col flex-grow-0 text-white text-center md:items-center md:flex-shrink-0 md:flex-1 md:text-center">
        <FuseAnimate animation="transition.expandIn">
          <img
            className="m-24 ml-32 mr-32 sm:m-auto"
            src="assets/images/logos/DiacoLogo1.svg"
            alt="logo"
          />
        </FuseAnimate>
      </div>
      <FuseAnimate animation={{ translateX: [0, "100%"] }}>
        <div
          className={clsx(
            classes.formCardXS,
            "lg:w-1/3 lg:mx-auto md:w-1/3 md:mx-auto sm:w-1/2 sm:mx-auto m-0 mb-0 "
          )}
        >
          <Card className={clsx(classes.flexUno, "sm:h-full")} square>
            <CardContent className="flex justify-center lg:mt-128 lg: md:mt-128">
              <Transition />
            </CardContent>
          </Card>
        </div>
      </FuseAnimate>
    </div>
  );
}
export default Login;
