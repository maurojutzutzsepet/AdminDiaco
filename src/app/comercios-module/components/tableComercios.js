import React, { useEffect } from "react";
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllComercios,
  deleteComercio,
} from "../store/actions/comercios.actions";
import reducer from "../store/reducers";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Box,
  TableBody,
  TablePagination,
  Button,
  IconButton,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { findByCatalog } from "app/utils/findByCatalogo";
import {
  catalogDepartameto,
  catalogMunicipio,
  catalogRegion,
} from "app/utils/constanst";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
}));

function TableComercios() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [comercioSelected, setComercioSelected] = React.useState(null);

  const comercios = useSelector(
    ({ comercioReducer }) => comercioReducer.comercioReducer.comercios
  );

  useEffect(() => {
    dispatch(getAllComercios());
  }, [dispatch]);

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  const sendToEdit = (item) => {
    history.push("/comercio/editar/" + item.id);
  };

  const handleClickOpen = (item) => {
    setComercioSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteComercio(comercioSelected.id));
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end m-24">
        <Button
          variant="contained"
          color="primary"
          className="justify-end"
          onClick={() => history.push("/comercio/crear")}
          //endIcon={<Icon>save</Icon>}
        >
          Crear comercio
        </Button>
      </div>
      <div className="m-24">
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
                    Tel??fono
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box fontWeight={900} m={1}>
                    Direcci??n
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
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comercios &&
                comercios
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.nombre_comercio}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.nit}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.telefono}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.direccion}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {findByCatalog(row.municipio, catalogMunicipio)}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {findByCatalog(row.departamento, catalogDepartameto)}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {findByCatalog(row.region, catalogRegion)}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <IconButton onClick={() => sendToEdit(row)}>
                            <Icon>edit</Icon>
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <IconButton onClick={() => handleClickOpen(row)}>
                            <Icon color="error">delete</Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={comercios.length}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar comercio</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acci??n es irreversible, el comercio se eliminara.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withReducer("comercioReducer", reducer)(TableComercios);
