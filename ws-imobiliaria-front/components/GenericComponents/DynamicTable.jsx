import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
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

export default function DynamicTable(props) {
  const dispatch = useDispatch();
  const [changes, setChanges] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [headers, setHeaders] = useState(Object.keys(props.data.slice()[0]));
  const [values, setValues] = useState(props.data.slice());

  const DynamicTableSelector = useSelector(
    (state) => state.DynamicTableReducer
  );

  function handleBackToReadonlyMode() {
    setIsEditing(false);
    if (isAdding) {
      let aux = values.map((el) => el);
      aux.pop();
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
    setIsDeleting(true);
  }

  function handleSave() {
    if (isEditing && props.putFunc)
      props.putFunc(changes.map((change) => values[change.row]));
    if (isAdding && props.postFunc && changes[0]) props.postFunc(changes[0]);
    if (isDeleting && props.deleteFunc) props.deleteFunc(values);
    handleBackToReadonlyMode();
  }

  const handleChange = (event) => {
    if (isEditing) {
      let [index, column] = event.target.id.split(",");
      let aux = changes.map((el) => el);
      let indexChange = aux.findIndex((el) => el.row === index);
      if (indexChange === -1)
        aux.push({
          row: index,
          changedProp: column,
          oldValue: values[index][column],
          newValue: event.target.value,
        });
      else {
        aux[indexChange].newValue = event.target.value;
      }
      setChanges(aux);

      aux = values.map((el) => el);
      aux[index][column] = event.target.value;
      setValues(aux);
    }
    if (isAdding) {
      let aux = changes;
      aux[0] = changes[0] || {};
      let column = event.target.id.split(",")[1];
      aux[0][column] = event.target.value;
      setChanges(aux);
    }
  };

  useEffect(() => {
    if (DynamicTableSelector.length > 0) setValues(DynamicTableSelector);
  }, [DynamicTableSelector]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={9}>
        <Typography variant="h4" color="inherit">
          {props.title}
        </Typography>

        <hr />

        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell align="left">{header.toUpperCase()}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((emp, index) => (
              <TableRow key={index}>
                {headers.map((header) => {
                  return (
                    <TableCell align="left">
                      {!isEditing &&
                        (!isAdding || index !== values.length - 1) &&
                        emp[header]}
                      {isEditing && (
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
      </Grid>
      <Grid item xs={2}>
        <Grid
          container
          className={DynamicTableStyles.buttonContainer}
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
        >
          {!isEditing && (
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
          {!isAdding && (
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
          {!isDeleting && (
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
          {(isEditing || isDeleting || isAdding) && (
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
                Salvar
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
    </Grid>
  );
}

DynamicTable.defaultProps = {
  title: "No Title",
};
