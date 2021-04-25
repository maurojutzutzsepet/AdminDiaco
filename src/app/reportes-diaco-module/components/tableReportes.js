import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import withReducer from "app/store/withReducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllQuejas,
  changeKeyFilter,
  getAllQuejaDepartamento,
  getAllQuejaRegion,
  getAllQuejaMunicipio,
  getAllQuejaByNit,
} from "../store/actions";
import reducer from "../store/reducers";
import {
  Box,
  Button,
  //Icon,
  //IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
} from "@material-ui/core";
import SelectField from "@fuse/components/FomBase/SelectField";
import Formsy from "formsy-react";
import TextMultiline from "@fuse/components/FomBase/TextMultiline";
import {
  catalogDepartameto,
  catalogMunicipio,
  catalogRegion,
} from "app/utils/constanst";
import { findByCatalog } from "app/utils/findByCatalogo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 3,
    overflowX: "auto",
  },
  header: {
    width: "100%",
    marginTop: 8,
    marginBottom: 17,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
}));

function TableReportes() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const quejas = useSelector(
    ({ reportesReducer }) => reportesReducer.reportesReducer.quejas
  );
  const filterReporte = useSelector(
    ({ reportesReducer }) => reportesReducer.reportesReducer.filterReporte
  );

  useEffect(() => {
    dispatch(getAllQuejas());
  }, [dispatch]);

  const handleSubmit = () => {};
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  const changeKey = (event) => {
    let data = {
      [event.target.name]: event.target.value,
    };
    dispatch(changeKeyFilter(data));
  };

  function handleChangePage(event, page) {
    setPage(page);
  }

  const sendToSearch = () => {
    switch (filterReporte.tipo_filtro) {
      case 1:
        dispatch(getAllQuejaByNit(filterReporte));
        break;
      case 2:
        dispatch(getAllQuejaMunicipio(filterReporte));
        break;
      case 3:
        dispatch(getAllQuejaDepartamento(filterReporte));
        break;
      case 4:
        dispatch(getAllQuejaRegion(filterReporte));
        break;
      default:
        break;
    }
  };

  const propsTipoFiltro = {
    id: "tipo_filtro",
    name: "tipo_filtro",
    label: "Tipo de filtro",
    value: filterReporte.tipo_filtro,
    opciones: [
      { id: 1, titulo: "Nit" },
      { id: 2, titulo: "Municipio" },
      { id: 3, titulo: "Departamento" },
      { id: 4, titulo: "Region" },
    ],
    onChange: changeKey,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "CAMPO_REQUERIDO",
    },
    xs: 12,
    sm: 12,
    md: 3,
  };

  const propsNit = {
    id: "nit",
    name: "nit",
    label: "NIT del comercio",
    value: filterReporte.nit, //formatedQueja.nit,
    onChange: changeKey,
    maxCount: 13,
    minCount: 13,
    rows: 1,
    md: 12,
    sm: 12,
    xs: 12,
  };

  const propsMunicipio = {
    id: "municipio",
    name: "municipio",
    label: "Municipio",
    value: filterReporte.municipio,
    opciones: catalogMunicipio,
    onChange: changeKey,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "CAMPO_REQUERIDO",
    },
    xs: 12,
    sm: 12,
    md: 3,
  };

  const propsDepartamento = {
    id: "departamento",
    name: "departamento",
    label: "Departamento",
    value: filterReporte.departamento,
    opciones: catalogDepartameto,
    onChange: changeKey,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "CAMPO_REQUERIDO",
    },
    xs: 12,
    sm: 12,
    md: 3,
  };

  const propsRegion = {
    id: "region",
    name: "region",
    label: "Region",
    value: filterReporte.region,
    opciones: catalogRegion,
    onChange: changeKey,
    validationErrors: {
      matchRegexp: "ENTRADA_NO_VALIDA",
      isDefaultRequiredValue: "CAMPO_REQUERIDO",
    },
    xs: 12,
    sm: 12,
    md: 3,
  };
  const filter = () => {
    switch (filterReporte.tipo_filtro) {
      case 1:
        return (
          <Grid item md={3} sm={12} xs={12}>
            <Box style={{ padding: 12 }}>
              <TextMultiline {...propsNit} />
            </Box>
          </Grid>
        );
      case 2:
        return <SelectField {...propsMunicipio} />;
      case 3:
        return <SelectField {...propsDepartamento} />;
      case 4:
        return <SelectField {...propsRegion} />;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="m-24">
        <Paper className={classes.header}>
          <Formsy
            onValidSubmit={handleSubmit}
            // onValid={enableButton}
            // onInvalid={disableButton}
            //ref={formRef}
            //className={classes.preTitle}
          >
            <div className="flex">
              <div>
                <Box style={{ border: "solid", margin: 24 }}>
                  <Typography
                    className="m-8"
                    variant="h6"
                    children={quejas.length}
                  />
                </Box>
                <p className="ml-8">No. Quejas</p>
              </div>
              <Grid container justify="flex-end">
                <SelectField {...propsTipoFiltro} />
                {filter()}
                <Grid>
                  <Button
                    className="mt-24 m-2"
                    variant="contained"
                    color="primary"
                    aria-label="search"
                    onClick={() => sendToSearch()}
                    //disabled={!isFormValid}
                    value="legacy"
                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Formsy>
        </Paper>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box fontWeight={990} m={1}>
                    Nombre del Comercio
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box fontWeight={900} m={1}>
                    Nit del comercio
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box fontWeight={900} m={1}>
                    Municipio
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box fontWeight={900} m={1}>
                    Departamento
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box fontWeight={900} m={1}>
                    Region
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box fontWeight={900} m={1}>
                    Descripción
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quejas &&
                quejas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.comercio.nombre_comercio}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.comercio.nit}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {findByCatalog(
                            row.comercio.municipio,
                            catalogMunicipio
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {findByCatalog(
                            row.comercio.departamento,
                            catalogDepartameto
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {findByCatalog(row.comercio.region, catalogRegion)}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.descripcion}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {/* <IconButton
                          //onClick={() => sendToEdit(row)}
                          >
                            <Icon>edit</Icon>
                          </IconButton> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={quejas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
export default withReducer("reportesReducer", reducer)(TableReportes);
