import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Formsy from "formsy-react";
import { Box, Button, Grid, Paper } from "@material-ui/core";
import TextMultiline from "@fuse/components/FomBase/TextMultiline";
import SelectField from "@fuse/components/FomBase/SelectField";
import {
  changeKeyComercio,
  createComercio,
  getComercio,
  clearComercio,
  updateComercio,
} from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import reducer from "../store/reducers";
import withReducer from "app/store/withReducer";
import { useParams } from "react-router";
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

function FormComercio() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { idComercio } = useParams();

  const formatedComercio = useSelector(
    ({ reducerComercio }) => reducerComercio.comercioReducer.formatedComercio
  );

  useEffect(() => {
    if (idComercio) {
      dispatch(getComercio(idComercio));
    }
    return () => {
      dispatch(clearComercio());
    };
  }, [idComercio, dispatch]);

  const changeKey = (event) => {
    let data = {
      [event.target.name]: event.target.value,
    };
    dispatch(changeKeyComercio(data));
  };

  const handleSubmit = () => {
    if (idComercio) {
      dispatch(updateComercio(idComercio, formatedComercio));
    } else {
      dispatch(createComercio(formatedComercio));
    }
  };

  const propsNit = {
    id: "nit",
    name: "nit",
    label: "NIT del comercio",
    value: formatedComercio.nit, //formatedQueja.nit,
    //disabled: !detalleProcesoPenal.estatus || !hasDelitosSelected,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },
    required: true,
    onChange: changeKey,

    maxCount: 13,
    minCount: 13,
    rows: 1,
    md: 12,
    sm: 12,
    xs: 12,
  };

  const propsNombreComercio = {
    id: "nombre_comercio",
    name: "nombre_comercio",
    label: "Nombre del comercio",
    value: formatedComercio.nombre_comercio, //formatedQueja.nit,
    //disabled: !detalleProcesoPenal.estatus || !hasDelitosSelected,
    onChange: changeKey,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },
    required: true,
    //onBlur: (e) => console.log(e), //changeKey,
    maxCount: 100,
    minCount: 10,
    rows: 1,
    md: 12,
    sm: 12,
    xs: 12,
    //...validations.narracion_except_single_quote,
  };

  const propsTelefono = {
    id: "telefono",
    value: formatedComercio.telefono,
    name: "telefono",
    autoComplete: "off",
    label: "Teléfono",
    required: true,
    //...validations.textFieldCommonValidation,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },

    inputProps: {
      maxLength: 15,
    },
    onChange: changeKey,
    rows: 1,
    md: 12,
    sm: 12,
    xs: 12,
  };

  const propsEmail = {
    id: "email",
    value: formatedComercio.email,
    name: "email",
    autoComplete: "off",
    label: "Correo",
    required: true,
    //...validations.textFieldCommonValidation,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },
    inputProps: {
      maxLength: 40,
    },
    onChange: changeKey,
    rows: 1,
  };

  const propsMunicipio = {
    id: "municipio",
    name: "municipio",
    label: "Municipio",
    value: formatedComercio.municipio,
    opciones: catalogMunicipio,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },
    valueKey: "id",
    required: true,
    onChange: changeKey,
    xs: 12,
    sm: 12,
    md: 4,
  };
  const propsDepartamento = {
    id: "departamento",
    name: "departamento",
    label: "Departamento",
    value: formatedComercio.departamento,
    opciones: catalogDepartameto,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },
    valueKey: "id",
    required: true,
    onChange: changeKey,
    xs: 12,
    sm: 12,
    md: 4,
  };

  const propsRegion = {
    id: "region",
    name: "region",
    label: "Region",
    value: formatedComercio.region,
    opciones: catalogRegion,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },

    valueKey: "id",
    required: true,
    onChange: changeKey,
    //...validations.selectValidation,
    xs: 12,
    sm: 12,
    md: 4,
  };

  const propsDireccion = {
    id: "direccion",
    value: formatedComercio.direccion,
    name: "direccion",
    autoComplete: "off",
    label: "Direccion",
    required: true,
    //...validations.textFieldCommonValidation,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "Campo requerido",
    },

    onChange: changeKey,
    rows: 3,
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
              <TextMultiline {...propsNit} />
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Box style={{ padding: 12 }}>
              <TextMultiline {...propsNombreComercio} />
            </Box>
          </Grid>
          <Grid container>
            <Grid item md={6} sm={12} xs={12}>
              <Box style={{ padding: 12 }}>
                <TextMultiline {...propsTelefono} />
              </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Box style={{ padding: 12 }}>
                <TextMultiline {...propsEmail} />
              </Box>
            </Grid>
            <SelectField {...propsMunicipio} />

            <SelectField {...propsDepartamento} />
            <SelectField {...propsRegion} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Box style={{ padding: 12 }}>
              <TextMultiline {...propsDireccion} />
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
export default withReducer("reducerComercio", reducer)(FormComercio);
