import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditRounded from "@material-ui/icons/EditRounded";
import TextField from "@material-ui/core/TextField";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import { useDispatch, useSelector } from "react-redux";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import AddIcon from "@material-ui/icons/AddRounded";
import DeleteIcon from "@material-ui/icons/CloseRounded";
import Grid from "@material-ui/core/Grid";
import DynamicTableStyles from "../../styles/DynamicTable.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import { DataGrid } from "@material-ui/data-grid";

export default function DynamicTable(props) {
  const [changes, setChanges] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [headers, setHeaders] = useState(
    Object.keys(props.data.length > 0 ? props.data.slice()[0] : {})
  );
  const [values, setValues] = useState(
    props.data.length > 0 ? props.data.slice() : []
  );
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  
  //#region Handlers
  function handleBackToReadonlyMode() {
    setIsEditing(false);
    if (isAdding) {
      let aux = values.map((el) => el);
      aux.pop();
      setValues(aux);
    }
    if (isDeleting) {
      let aux = headers.slice();
      aux.pop();
      setHeaders(aux);
      aux = values.slice();
      aux.forEach((row) => delete row["apagar"]);
      setValues(aux);
    }
    setIsAdding(false);
    setIsDeleting(false);
    setChanges([]);
  }

  function handleUndoChanges() {
    let aux = values.map((el) => el);
    changes.forEach((change) => {
      aux[change.row][change.changedProp] = change.oldValue;
    });
    setValues(aux);
    handleBackToReadonlyMode();
  }

  function handleAdd() {
    setIsAdding(true);
    let aux = values.map((el) => el);
    let auxObj = {};
    Object.keys(values[0]).forEach((key) => (auxObj[key] = ""));
    aux.push(auxObj);
    setValues(aux);
  }

  function handleDelete() {
    let aux = headers.slice();
    aux.push("apagar");
    setHeaders(aux);

    aux = values.map((value) => {
      value.apagar = false;
      return value;
    });
    setValues(aux);
    setIsDeleting(true);
  }

  function handleSave() {
    if (isEditing && props.putFunc)
      props.putFunc(changes.map((change) => values[change.row]));
    if (isAdding && props.postFunc && changes[0]) props.postFunc(changes[0]);
    if (isDeleting && props.deleteFunc)
      props.deleteFunc(values.filter((value) => value.apagar === true));
    handleBackToReadonlyMode();
  }

  const updatePropertyValue = (index, column, newValue) => {
    let aux = changes.slice();

    aux = values.map((el) => el);
    aux[index][column] = newValue;
    setValues(aux);
  };

  const handleChange = (event, isCheckbox = false) => {
    let [index, column] = event.target.id.split(",");
    let aux = changes.map((el) => el);

    if (isDeleting) updatePropertyValue(index, column, event.target.checked);
    if (isEditing) {
      let indexChange = aux.findIndex((el) => el.row === index);
      if (indexChange === -1)
        aux.push({
          row: index,
          changedProp: column,
          oldValue: values[index][column],
          newValue: isCheckbox ? event.target.checked : event.target.value,
        });
      else {
        aux[indexChange].newValue = isCheckbox
          ? event.target.checked
          : event.target.value;
      }
      setChanges(aux);
      updatePropertyValue(
        index,
        column,
        isCheckbox ? event.target.checked : event.target.value
      );
    }
    if (isAdding) {
      aux[0] = changes[0] || {};
      aux[0][column] = event.target.value;
      setChanges(aux);
    }
  };
  //#endregion
  //#region Effects
  useEffect(() => {
    let auxColumns = [];
    let auxRows = [];
    headers.forEach((header) => {
      auxColumns.push({
        field: header,
        headerName: header.toUpperCase(),
        width: header === "id" ? 95 : 150,
      });
    });
    values.forEach((value) => {
      auxRows.push(value);
    });
    setColumns(auxColumns);
    setRows(auxRows);
  }, [values, headers]);

  useEffect(() => {
    setHeaders(Object.keys(props.data.length > 0 ? props.data.slice()[0] : {}));
    setValues(props.data.length > 0 ? props.data.slice() : []);
  }, [props.data]);

  //#endregion
  
  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={props.postFunc || props.putFunc || props.deleteFunc ? 9 : 11}
      >
        <Typography variant="h4" color="inherit">
          {props.title}
        </Typography>
        {(props.postFunc || props.putFunc || props.deleteFunc) && (
          <Table className={DynamicTableStyles.table}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header} align="left">
                    {header.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((emp, index) => (
                <TableRow key={index}>
                  {headers.map((header) => {
                    return (
                      <TableCell key={index + "," + header} align="left">
                        {!isEditing &&
                          (!isAdding || index !== values.length - 1) &&
                          (!(
                            header.toUpperCase().includes("ST") ||
                            header.toUpperCase().includes("FL")
                          )
                            ? emp[header]
                            : emp[header]
                            ? "Sim"
                            : "Não")}
                        {isEditing &&
                          !(
                            header.toUpperCase().includes("ST") ||
                            header.toUpperCase().includes("FL")
                          ) && (
                            <TextField
                              name={header}
                              id={index + "," + header}
                              label=""
                              disabled={header === "id"}
                              onChange={handleChange}
                              size="small"
                              fullWidth
                              value={values[index][header]}
                              variant="outlined"
                            />
                          )}
                        {isEditing &&
                          (header.toUpperCase().includes("ST") ||
                            header.toUpperCase().includes("FL")) && (
                            <Checkbox
                              id={index + "," + header}
                              checked={values[index][header]}
                              name={header}
                              onChange={(event) => handleChange(event, true)}
                            />
                          )}
                        {isDeleting && header.toUpperCase() === "APAGAR" && (
                          <Checkbox
                            id={index + "," + header}
                            checked={values[index][header]}
                            name={header}
                            onChange={handleChange}
                          />
                        )}
                        {isAdding && index === values.length - 1 && (
                          <TextField
                            name={header}
                            id={index + "," + header}
                            label=""
                            disabled={header === "id"}
                            onChange={handleChange}
                            size="small"
                            fullWidth
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!props.postFunc && !props.putFunc && !props.deleteFunc && (
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={rows}
              autoHeight
              columns={columns}
              pageSize={15}
              checkboxSelection={props.hasCheckboxes}
              disableSelectionOnClick
              density={"compact"}
            />
          </div>
        )}
      </Grid>
      {(props.postFunc || props.putFunc || props.deleteFunc) && (
        <Grid item xs={2}>
          <Grid
            container
            className={DynamicTableStyles.buttonContainer}
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
          >
            {!isAdding && !isEditing && !isDeleting && props.putFunc && (
              <Grid item xs={12}>
                <Button
                  className={DynamicTableStyles.buttonDynamicTable}
                  variant="contained"
                  color="primary"
                  size="medium"
                  fullWidth
                  onClick={() => setIsEditing(true)}
                  startIcon={<EditRounded />}
                >
                  Editar
                </Button>
              </Grid>
            )}
            {!isAdding && !isEditing && !isDeleting && props.postFunc && (
              <Grid item xs={12}>
                <Button
                  className={DynamicTableStyles.buttonDynamicTable}
                  variant="contained"
                  style={{ backgroundColor: "orange", color: "white" }}
                  size="medium"
                  fullWidth
                  onClick={() => handleAdd()}
                  startIcon={<AddIcon />}
                >
                  Adicionar
                </Button>
              </Grid>
            )}
            {!isAdding && !isEditing && !isDeleting && props.deleteFunc && (
              <Grid item xs={12}>
                <Button
                  className={DynamicTableStyles.buttonDynamicTable}
                  variant="contained"
                  style={{ backgroundColor: "red", color: "white" }}
                  size="medium"
                  fullWidth
                  onClick={() => handleDelete()}
                  startIcon={<DeleteIcon />}
                >
                  Apagar
                </Button>
              </Grid>
            )}
            {(isEditing || isDeleting || isAdding) &&
              (props.postFunc || props.putFunc || props.deleteFunc) && (
                <Grid item xs={12}>
                  <Button
                    className={DynamicTableStyles.buttonDynamicTable}
                    variant="contained"
                    style={{ backgroundColor: "green", color: "white" }}
                    size="medium"
                    fullWidth
                    onClick={() => handleSave()}
                    startIcon={<SaveRoundedIcon />}
                  >
                    {!isDeleting ? <span>Salvar</span> : <span>Confirmar</span>}
                  </Button>
                </Grid>
              )}
            {(isEditing || isDeleting || isAdding) && (
              <Grid item xs={12}>
                <Button
                  className={DynamicTableStyles.buttonDynamicTable}
                  variant="contained"
                  color="primary"
                  size="medium"
                  fullWidth
                  onClick={() => handleUndoChanges()}
                  startIcon={<HistoryRoundedIcon />}
                >
                  Cancelar
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

DynamicTable.defaultProps = {
  title: "No Title",
};
