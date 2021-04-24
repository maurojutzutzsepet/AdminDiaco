import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import { Button, InputAdornment, Icon } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useDispatch } from "react-redux";
import { signupDiaco } from "app/diaco/store/actions";

const useStyles = makeStyles((theme) => ({
  iconCLose: {
    zIndex: 50,
    position: "relative",
    float: "right",
    marginRight: 24,
    marginTop: 2,
    padding: 0,
  },
  title: {
    [theme.breakpoints.up("xs")]: {
      margin: "24px  24px 12px",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "24px",
    },
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    marginTop: 16,
  },
  icon: {
    color: theme.palette.delete,
  },
  preTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginTop: "48px",
    [theme.breakpoints.up("xs")]: {
      marginTop: "0px",
    },
  },
  postTitle: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: "16px !important",
    },
  },
}));

function DiacoCreateUser() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleSubmit(model) {
    dispatch(signupDiaco(model));
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function disableButton() {
    setIsFormValid(false);
  }

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className={classes.preTitle}
      >
        <Typography
          variant="h5"
          className={clsx(
            "text-indigo-900 font-black font-sans text-center md:w-full mb-48",
            classes.postTitle
          )}
        >
          Crear usuario
        </Typography>
        <TextFieldFormsy
          className="mb-24 md:mx-16 lg:mx-48"
          type="text"
          name="cui"
          label="DPI"
          value=""
          autoComplete="off"
          validations={{
            matchRegexp: /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$)|^(\d{13,13})$/,
          }}
          validationErrors={{
            matchRegexp: "Entrada no válida, verifique su DPI/Email",
          }}
          variant="filled"
          required
        />
        <TextFieldFormsy
          className="mb-24 md:mx-16 lg:mx-48"
          type="text"
          name="email"
          label="EMAIL"
          value=""
          autoComplete="off"
          validations={{
            matchRegexp: /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$)|^(\d{13,13})$/,
          }}
          validationErrors={{
            matchRegexp: "Entrada no válida, verifique su DPI/Email",
          }}
          variant="filled"
          required
        />

        <TextFieldFormsy
          className="mb-20 md:mx-16 lg:mx-48 mt-32"
          type={values.showPassword ? "text" : "password"}
          name="password"
          label="Contraseña"
          value={values.password}
          onChange={handleChange("password")}
          validations={{
            minLength: 1,
          }}
          validationErrors={{
            minLength: "Min character length is 4",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  className="cursor-pointer"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </Icon>
              </InputAdornment>
            ),
          }}
          variant="filled"
          required
        />

        <Button
          className="mt-32 lg:mx-48 md:mx-16 sm:mx-48 rounded-full"
          type="submit"
          variant="contained"
          color="primary"
          aria-label="LOG IN"
          disabled={!isFormValid}
          value="legacy"
        >
          CREAR USUARIO
        </Button>
      </Formsy>
    </div>
  );
}
export default DiacoCreateUser;
