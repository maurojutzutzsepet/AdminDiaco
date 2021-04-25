import React, { useEffect } from "react";
import Formsy from "formsy-react";
import { Button } from "@material-ui/core";
import {
  Grid,
  Paper,
  Box,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import TextMultiline from "@fuse/components/FomBase/TextMultiline";
import { useLocalStorage } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  changeKeyQueja,
  clearQueja,
  createQueja,
  getComercio,
  getQueja,
  updateQueja,
} from "../store/actions";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducers";
import { useParams } from "react-router";
import { findByCatalog } from "app/utils/findByCatalogo";
import {
  catalogDepartameto,
  catalogMunicipio,
  catalogRegion,
} from "app/utils/constanst";

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
  //const history = useHistory();
  const [open, setOpen] = React.useState(false);

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

  const comercio = useSelector(
    ({ quejaReducer }) => quejaReducer.reducerQueja.comercio
  );

  const handleSubmit = () => {
    if (idQueja) {
      dispatch(updateQueja(idQueja, formatedQueja));
    } else {
      dispatch(createQueja({ ...formatedQueja, user: userInfo.cui }));
    }
    setOpen(false);
    //history.push("/quejas");
  };

  const changeKey = (event) => {
    let data = {
      [event.target.name]: event.target.value,
    };

    dispatch(changeKeyQueja(data));
  };

  const handleClickOpen = (item) => {
    //setQuejaSelected(item);
    dispatch(getComercio(formatedQueja.nit));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          //type="submit"
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          aria-label="LOG IN"
          //disabled={!isFormValid}
          value="legacy"
        >
          {idQueja ? "EDITAR" : "AGREGAR"}
        </Button>
      </Formsy>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {idQueja ? "Editar queja" : "Agregar queja"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {comercio ? (
              <>
                Se adjuntara la queja al siguiente comercio:
                <br />
                <b> Nombre comercio:</b> {comercio.nombre_comercio}
                <br />
                <b>Nit comercio:</b> {comercio.nit}
                <br />
                <b>Dirección:</b> {comercio.direccion}
                <br />
                <b>Municipio:</b>{" "}
                {findByCatalog(comercio.municipio, catalogMunicipio)}
                <br />
                <b>Departamento:</b>
                {findByCatalog(comercio.departamento, catalogDepartameto)}
                <br />
                <b>Region:</b> {findByCatalog(comercio.region, catalogRegion)}
              </>
            ) : (
              <>
                Cargando...
                <br />
                Asegurese de ingresar bien el nit del comercio
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            autoFocus
          >
            {idQueja ? "Editar queja" : "Agregar queja"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withReducer("quejaReducer", reducer)(CrearQueja);
