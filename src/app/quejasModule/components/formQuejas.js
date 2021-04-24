import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";

import {
  Box,
  Button,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuejas } from "../store/actions";
import { useLocalStorage } from "@fuse/hooks";
import reducer from "../store/reducers";
import withReducer from "app/store/withReducer";
import { findByCatalog } from "app/utils/findByCatalogo";
import { catalogDepartameto, catalogMunicipio } from "app/utils/constanst";

// const styles = (theme) => ({
//   root: {
//     width: "100%",
//     marginTop: 3,
//     overflowX: "auto",
//   },
//   table: {
//     minWidth: 700,
//   },
// });

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

function FormQuejas() {
  //const [value, setValue] = React.useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const [userInfo] = useLocalStorage("infoUser", "");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const classes = useStyles();
  const quejas = useSelector(
    ({ quejaReducerList }) => quejaReducerList.reducerQueja.quejas
  );
  //console.log("state", quejas);

  useEffect(() => {
    dispatch(getAllQuejas(userInfo.cui));
  }, [dispatch, userInfo.cui]);

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  const sendToEdit = (item) => {
    history.push("/queja/editar/" + item.id);
  };

  return (
    <div>
      {/* <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Listado de quejas" />
        </Tabs>
      </Paper> */}
      <div className="flex justify-end m-24">
        <Button
          variant="contained"
          color="primary"
          className="justify-end"
          onClick={() => history.push("/queja/crear")}
          //endIcon={<Icon>save</Icon>}
        >
          Crear queja
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
                    Descripción
                  </Box>
                </TableCell>
                <TableCell align="center"></TableCell>
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
                          {row.descripcion}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <IconButton onClick={() => sendToEdit(row)}>
                            <Icon>edit</Icon>
                          </IconButton>
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
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel> */}
    </div>
  );
}

export default withReducer("quejaReducerList", reducer)(FormQuejas);
