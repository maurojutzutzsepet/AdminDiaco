import React, { useEffect } from "react";
import Formsy from "formsy-react";
import { Button } from "@material-ui/core";
import { Grid, Paper, Box, makeStyles } from "@material-ui/core";
import TextMultiline from "@fuse/components/FomBase/TextMultiline";
import { useLocalStorage } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  changeKeyQueja,
  clearQueja,
  createQueja,
  getQueja,
  updateQueja,
} from "../store/actions";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducers";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  paperForm: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 48,
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
      padding: 4,
    },
  },
  collapse: {
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      padding: 16,
    },
  },
  marginTable: {
    marginTop: 24,
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
}));

function CrearQueja() {
  //const [isFormValid, setIsFormValid] = useState(false);
  const [userInfo] = useLocalStorage("infoUser", "");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { idQueja } = useParams();

  useEffect(() => {
    if (idQueja) {
      dispatch(getQueja(idQueja));
    }
    return () => {
      dispatch(clearQueja());
    };
  }, [idQueja, dispatch]);
  //   function disableButton() {
  //     setIsFormValid(false);
  //   }
  const formatedQueja = useSelector(
    ({ quejaReducer }) => quejaReducer.reducerQueja.formatedQueja
  );

  const handleSubmit = () => {
    if (idQueja) {
      dispatch(updateQueja(idQueja, formatedQueja));
    } else {
      dispatch(createQueja({ ...formatedQueja, user: userInfo.cui }));
    }
  };

  const changeKey = (event) => {
    let data = {
      [event.target.name]: event.target.value,
    };

    dispatch(changeKeyQueja(data));
  };

  //   function enableButton() {
  //     setIsFormValid(true);
  //   }

  //   function disableButton() {
  //     setIsFormValid(false);
  //   }

  const descripcionQueja = {
    id: "id_descripcion",
    name: "descripcion",
    label: "Descripcion de la queja",
    value: formatedQueja.descripcion,
    onChange: changeKey,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },
    required: true,
    maxCount: 200,
    rows: 4,
    md: 12,
    sm: 12,
    xs: 12,
  };

  const descripcionNit = {
    id: "nit",
    name: "nit",
    label: "NIT del comercio",
    value: formatedQueja.nit,
    onChange: changeKey,
    required: true,
    maxCount: 13,
    minCount: 13,
    rows: 1,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },
    md: 12,
    sm: 12,
    xs: 12,
  };

  return (
    <div className={"m-48"}>
      <Formsy
        onValidSubmit={handleSubmit}
        // onValid={enableButton}
        // onInvalid={disableButton}
        //ref={formRef}
        //className={classes.preTitle}
      >
        <Paper className={classes.paperForm}>
          <Grid item md={12} sm={12} xs={12}>
            <Box style={{ padding: 12 }}>
              <TextMultiline {...descripcionNit} />
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Box style={{ padding: 12 }}>
              <TextMultiline {...descripcionQueja} />
            </Box>
          </Grid>
        </Paper>
        <Button
          //className="mt-32 lg:mx-48 md:mx-16 sm:mx-48 rounded-full"
          type="submit"
          variant="contained"
          color="primary"
          aria-label="LOG IN"
          //disabled={!isFormValid}
          value="legacy"
        >
          AGREGAR
        </Button>
      </Formsy>
    </div>
  );
}

export default withReducer("quejaReducer", reducer)(CrearQueja);
