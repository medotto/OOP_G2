import React, { useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import propertyRegistryStyles from "../styles/PropertyRegistry.module.css";
import { FormControl, FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import RestoreIcon from "@material-ui/icons/Restore";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import * as ToasterActions from "../redux/actions/ToasterActions";

const drawerWidth = 500;
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="R$ "
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function PropertyRegistry(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentProperty, setCurrentProperty] = React.useState(null);
  const propertyInfos = useSelector((store) => store.PropertyReducer);
  const [values, setValues] = React.useState(null);

  useEffect(() => {
    setCurrentProperty(propertyInfos.activeProperty);
    setValues(propertyInfos.activeProperty);
  }, [propertyInfos]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleChangeCheckbox = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked ? "S" : "N",
    });
  };
  const handleUndoChanges = () => {
    setValues(propertyInfos.activeProperty);
    dispatch(
      ToasterActions.PushToaster("success", "As alterações foram descartadas.")
    );
  };
  const handleSaveChanges = () => {
    //TODO -> Implement
  };

  useEffect(() => {
    if (!props.open) setValues(null);
  }, [props.open]);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}></div>
      <Divider />
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        className={propertyRegistryStyles.filterGrid}
      >
        <Divider />
        {currentProperty && (
          <FormControl component="fieldset">
            <img
              src={
                currentProperty?.imagemImovelDtoList[0]
                  ? "data:image/png;base64," +
                    currentProperty?.imagemImovelDtoList[0].imagemBase64
                  : "https://django-metabuscador.s3.amazonaws.com/static/home/images/no-photo.png"
              }
              className={propertyRegistryStyles.registryImg}
            />
            <FormGroup className={propertyRegistryStyles.registryForm}>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  label="Preço"
                  placeholder="Preço"
                  value={values?.preco}
                  onChange={handleChange}
                  name="preco"
                  id="preco"
                  error={values && values.preco <= 0}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  defaultValue={currentProperty.preco}
                  key={currentProperty.id}
                  multiline
                  helperText={
                    values && values.preco <= 0
                      ? "O preço deve ser maior do que 0."
                      : ""
                  }
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  className={propertyRegistryStyles.precoInput}
                  fullWidth
                />
              </Grid>

              <TextField
                error={values && values.preco <= 0}
                name="endereco"
                id="endereco"
                label="Endereço"
                key={currentProperty.id}
                onChange={handleChange}
                size="small"
                defaultValue={currentProperty.endereco}
                className={propertyRegistryStyles.field}
                variant="outlined"
              />
              <TextField
                error={values && values.bairro === ""}
                name="bairro"
                id="bairro"
                label="Bairro"
                onChange={handleChange}
                size="small"
                defaultValue={currentProperty.bairro}
                className={propertyRegistryStyles.field}
                variant="outlined"
              />
              <TextField
                error={values && values.cidade === ""}
                name="cidade"
                id="cidade"
                label="Cidade"
                onChange={handleChange}
                size="small"
                defaultValue={currentProperty.cidade}
                className={propertyRegistryStyles.field}
                variant="outlined"
              />
              {/* TODO -> DROPDOWN LIST
              <TextField
                error={values && values.preco <= 0}
                name="proprietario."
                id="outlined-error-helper-text"
                label="Proprietário"
                onChange={handleChange}
                size="small"
                defaultValue={currentProperty.endereco}
                className={propertyRegistryStyles.field}
                variant="outlined"
              /> */}
              <TextField
                error={values && values.proprietario.telefone === ""}
                name="telefone"
                id="telefone"
                label="Telefone"
                onChange={handleChange}
                size="small"
                disabled
                defaultValue={currentProperty.proprietario.telefone}
                className={propertyRegistryStyles.field}
                variant="outlined"
              />
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.flFinanciado === "S"}
                        onChange={handleChangeCheckbox}
                        className={propertyRegistryStyles.checkboxes}
                        name="flFinanciado"
                      />
                    }
                    label="Financiado"
                  />
                </Grid>{" "}
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.flNegociacao === "S"}
                        onChange={handleChangeCheckbox}
                        className={propertyRegistryStyles.checkboxes}
                        name="flNegociacao"
                      />
                    }
                    label="Negociação"
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.flProprietario === "S"}
                        onChange={handleChangeCheckbox}
                        className={propertyRegistryStyles.checkboxes}
                        name="flProprietario"
                      />
                    }
                    label="Proprietário"
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values?.flInativo === "S"}
                        onChange={handleChangeCheckbox}
                        className={propertyRegistryStyles.checkboxes}
                        name="flInativo"
                      />
                    }
                    label="Inativo"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
        )}
      </Grid>
      <Divider />
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            classes={classes.fullHeightButton}
            onClick={handleUndoChanges}
            className={propertyRegistryStyles.undoButton}
            startIcon={<RestoreIcon />}
          >
            Descartar Alterações
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            size="medium"
            onClick={handleSaveChanges}
            className={propertyRegistryStyles.saveButton}
            startIcon={<SaveRoundedIcon />}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
}
