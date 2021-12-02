import react, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getOwners } from "../services/ImobiliariaService";
import { useSelector } from "react-redux";
import { phoneNumberFormatter } from "../services/General";
import Grid from "@material-ui/core/Grid";
import propertyRegistryStyles from "../styles/PropertyRegistry.module.css";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import firebase from "firebase";

export default function OwnerSelector(props) {
  const [owners, setOwners] = useState([]);
  const userSelector = useSelector((state) => state.UserReducer);
  const [selectedOwner, selectOwner] = useState(-1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const handleChange = (event) => {
    let selectedOwner = event.target.value;
    selectOwner(selectedOwner);
    setPhoneNumber(
      phoneNumberFormatter(
        owners.find((owner) => owner.id === selectedOwner).telefone
      )
    );
    props.getSelectedOwner(selectedOwner);
  };

  useEffect(() => {
    if (props.currentPropertyOwner) selectOwner(props.currentPropertyOwner);
  }, [props.currentPropertyOwner]);

  useEffect(() => {
    setIsLogged(
      firebase.auth().currentUser || localStorage.getItem("userCredentials")
    );
  }, []);

  useEffect(() => {
    if (userSelector.token || localStorage.getItem("userCredentials")) {
      getOwners(
        userSelector.token ||
          JSON.parse(localStorage.getItem("userCredentials")).access_token
      ).then((resp) => {
        if (resp) {
          resp.unshift({ id: -1, nome: "Selecione:", email: "", telefone: "" });
          setOwners(resp);
        }
      });
    }
  }, [userSelector.token]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <FormControl
          variant="outlined"
          size="small"
          className={propertyRegistryStyles.ownerFormControl}
        >
          <InputLabel
            id="demo-simple-select-outlined-label"
            className={propertyRegistryStyles.ownerSelect}
          >
            Proprietário
          </InputLabel>
          <Select
            className={propertyRegistryStyles.field}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={selectedOwner}
            disabled={!isLogged}
            onChange={handleChange}
            label="Proprietário"
            // input={<Input id="name" />}
          >
            {owners.map((owner, index) => {
              return (
                <MenuItem value={owner.id} key={index}>
                  <em>{`${owner.nome}`}</em>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="telefone"
          id="telefone"
          label="Telefone"
          size="small"
          value={phoneNumber}
          className={propertyRegistryStyles.field}
          disabled
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}
