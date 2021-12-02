import { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getPropertySituations } from "../services/ImobiliariaService";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import propertyRegistryStyles from "../styles/PropertyRegistry.module.css";
import FormControl from "@material-ui/core/FormControl";
import firebase from "firebase";

export default function SituationSelector(props) {
  const [situations, setSituations] = useState([]);
  const userSelector = useSelector((state) => state.UserReducer);
  const [selectedSituation, selectSituation] = useState(-1);
  const [isLogged, setIsLogged] = useState(false);

  const handleChange = (event) => {
    let situation = event.target.value;
    selectSituation(situation);
    props.getSelectedSituation(situation);
  };

  useEffect(() => {
    if (props.currentPropertySituation)
      selectSituation(props.currentPropertySituation);
  }, [props.currentPropertySituation]);

  useEffect(() => {
    setIsLogged(
      firebase.auth().currentUser || localStorage.getItem("userCredentials")
    );
  }, []);

  useEffect(() => {
    if (userSelector.token || localStorage.getItem("userCredentials")) {
      getPropertySituations(
        userSelector.token ||
          JSON.parse(localStorage.getItem("userCredentials")).access_token
      ).then((resp) => {
        if (resp) {
          resp.unshift({ id: -1, situacao: "Selecione:" });
          setSituations(resp);
        }
      });
    }
  }, [userSelector.token]);

  return (
    <Grid item xs={6}>
      <FormControl
        variant="outlined"
        size="small"
        className={propertyRegistryStyles.ownerFormControl}
      >
        <InputLabel
          id="demo-simple-select-outlined-label"
          className={propertyRegistryStyles.ownerSelect}
          disabled={!isLogged}
        >
          Situação
        </InputLabel>
        <Select
          className={propertyRegistryStyles.field}
          value={selectedSituation}
          onChange={handleChange}
          disabled={!isLogged}
          label="Situação"
        >
          {situations.map((situation, index) => {
            return (
              <MenuItem value={situation?.id} key={index}>
                <em>{`${situation?.situacao}`}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
}
