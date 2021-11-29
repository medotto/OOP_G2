import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import propertyRegistryStyles from "../styles/PropertyRegistry.module.css";
import { FormControl, FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import RestoreIcon from "@material-ui/icons/Restore";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import * as ToasterActions from "../redux/actions/ToasterActions";
import Upload from "../components/ImageComponent/ImageUpload";
import OwnerSelector from "./OwnerSelector";
import SituationSelector from "./SituationSelector";
import { postProperty, editProperty } from "../services/ImobiliariaService";
import { formatBase64forApi } from "../services/General";
import CarouselPreview from "./ImageComponent/CarouselPreview";
import * as PropertyActions from "../redux/actions/PropertyActions";

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
const initialValues = {
  bairro: "",
  cidade: "",
  dtAlteracao: null,
  dtCadastro: "",
  endereco: "",
  flFinanciado: "N",
  flInativo: "N",
  flNegociacao: "N",
  flProprietario: "N",
  imagemImovelDtoList: [],
  owner:"",
  pais: "",
  preco: 0,
  proprietario: { id: -1 },
  situacao: { id: -1 },
};
export default function PropertyRegistry(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentProperty, setCurrentProperty] = useState(null);
  const [selectedOwner, setOwner] = useState({});
  const [images, setImages] = useState([]);
  const [selectedSituation, setSituation] = useState({});
  const [registerDateSize, setRegisterDateSize] = useState(12);
  const propertyInfos = useSelector((store) => store.PropertyReducer);
  const userSelector = useSelector((state) => state.UserReducer);
  const addingImageSelector = useSelector((state) => state.addingImageSelector);

  const [values, setValues] = useState(initialValues);

  //#region Effects
  useEffect(() => {
    if (propertyInfos?.activeProperty?.dtAlteracao) setRegisterDateSize(6);
    setCurrentProperty(propertyInfos.activeProperty);
    setValues(propertyInfos.activeProperty);
  }, [propertyInfos]);

  useEffect(() => {
    if (props.open?.origin === "add") setValues(initialValues);
  }, [props.open]);

  useEffect(() => {
    if (selectedOwner)
      setValues({
        ...values,
        proprietario: { id: selectedOwner },
      });
  }, [selectedOwner]);

  useEffect(() => {
    if (selectedSituation)
      setValues({
        ...values,
        situacao: { id: selectedSituation },
      });
  }, [selectedSituation]);

  useEffect(() => {
    if (selectedSituation)
      setValues({
        ...values,
        imagemImovelDtoList: images.map((image, index) => {
          return { id: index, imagemBase64: formatBase64forApi(image.base64) };
        }),
      });
  }, [images]);

  useEffect(() => {
    console.log(currentProperty);
  }, [currentProperty]);

  //#endregion
  //#region Internal handlers
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
    switch (props.open?.origin) {
      case "add":
        postProperty(
          values,
          userSelector.token ||
            JSON.parse(sessionStorage.getItem("userCredentials")).access_token
        );
        break;
      case "edit":
        editProperty(
          { ...values, id: currentProperty.id },
          userSelector.token ||
            JSON.parse(sessionStorage.getItem("userCredentials")).access_token
        );
        break;
      default:
        break;
    }
    dispatch(PropertyActions.RefreshProperties(true));
  };

  //#endregion

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open.value}
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
        <FormControl component="fieldset">
          {currentProperty && (
            <>
              {currentProperty?.imagemImovelDtoList.length <= 1 && (
                <img
                  src={
                    currentProperty?.imagemImovelDtoList[0]
                      ? "data:image/png;base64," +
                        currentProperty?.imagemImovelDtoList[0].imagemBase64
                      : "https://django-metabuscador.s3.amazonaws.com/static/home/images/no-photo.png"
                  }
                  className={propertyRegistryStyles.registryImg}
                />
              )}
              {currentProperty?.imagemImovelDtoList.length > 1 && (
                <CarouselPreview
                  images={
                    currentProperty?.imagemImovelDtoList[0]
                      ? currentProperty?.imagemImovelDtoList.map((imagem) => {
                          return {
                            legend: "",
                            base64:
                              "data:image/png;base64," + imagem.imagemBase64,
                          };
                        })
                      : [
                          {
                            legend: "",
                            base64:
                              "https://django-metabuscador.s3.amazonaws.com/static/home/images/no-photo.png",
                          },
                        ]
                  }
                />
              )}
            </>
          )}
          {!currentProperty && (
            <Upload
              className={propertyRegistryStyles.registryImg}
              getUploadedImages={setImages}
            />
          )}
          <FormGroup className={propertyRegistryStyles.registryForm}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
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
              <Grid item xs={6}>
                <TextField
                  name="endereco"
                  id="endereco"
                  label="Endereço"
                  onChange={handleChange}
                  size="small"
                  value={values?.endereco}
                  className={propertyRegistryStyles.field}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="bairro"
                  id="bairro"
                  label="Bairro"
                  onChange={handleChange}
                  size="small"
                  value={values?.bairro}
                  className={propertyRegistryStyles.field}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="cidade"
                  id="cidade"
                  label="Cidade"
                  onChange={handleChange}
                  size="small"
                  value={values?.cidade}
                  className={propertyRegistryStyles.field}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="pais"
                  id="pais"
                  label="País"
                  onChange={handleChange}
                  size="small"
                  value={values?.pais}
                  className={propertyRegistryStyles.field}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="owner"
                  id="owner"
                  label="Owner do agenciamento"
                  onChange={handleChange}
                  size="small"
                  value={values?.owner}
                  className={propertyRegistryStyles.field}
                  variant="outlined"
                />
              </Grid>
              <SituationSelector
                getSelectedSituation={setSituation}
                currentPropertySituation={values?.situacao?.id}
              />
              <OwnerSelector
                getSelectedOwner={setOwner}
                currentPropertyOwner={values?.proprietario?.id}
              />
              <Grid item xs={registerDateSize}>
                <TextField
                  name="dtCadastro"
                  id="dtCadastro"
                  label="Data de Cadastro"
                  onChange={handleChange}
                  size="small"
                  disabled
                  value={values?.dtCadastro}
                  className={propertyRegistryStyles.field}
                  variant="outlined"
                />
              </Grid>
              {values?.dtAlteracao && (
                <Grid item xs={6}>
                  <TextField
                    name="dtAlteracao"
                    id="dtAlteracao"
                    label="Última alteração"
                    onChange={handleChange}
                    size="small"
                    value={values?.dtAlteracao}
                    className={propertyRegistryStyles.field}
                    variant="outlined"
                  />
                </Grid>
              )}
            </Grid>
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
              </Grid>
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
