import React, { useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import propertyRegistryStyles from "../styles/PropertyRegistry.module.css";
import { FormControl, FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as FilterActions from "../redux/actions/FilterActions";
import TextField from "@material-ui/core/TextField";

const drawerWidth = 500;

const reverseOrientation = (orientation) => {
  return orientation.toUpperCase() == "ASC" ? "DESC" : "ASC";
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
  const FilterInfo = useSelector((state) => state.FilterReducer);
  const { withPhotos } = FilterInfo?.status?.withPhotos;
  const { withContact } = FilterInfo?.status?.withContact;

  const [currentProperty, setCurrentProperty] = React.useState(null);
  const propertyInfos = useSelector((store) => store.PropertyReducer);

  useEffect(() => {
    setCurrentProperty(propertyInfos.activeProperty);
  }, [propertyInfos]);

  const handleChange = (event) => {
    dispatch(
      FilterActions.SetFilter({ [event.target.name]: event.target.checked })
    );
  };

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
        <FormControl component="fieldset">
          <img
            src={
              currentProperty?.imagemImovelDtoList[0]
                ? "data:image/png;base64," +
                  currentProperty?.imagemImovelDtoList[0].imagemBase64
                : ""
            }
            className={propertyRegistryStyles.registryImg}
          />
          <FormGroup className={propertyRegistryStyles.registryForm}>
            <TextField
              id="price"
              size="small"
              defaultValue={currentProperty?.preco}
              helperText="Incorrect entry."
              inputProps={{ style: { textAlign: "center" } }}
              fullWidth
            />
            <TextField
              error
              id="outlined-error-helper-text"
              label="Error"
              size="small"
              defaultValue="Hello World"
              helperText="Incorrect entry."
              variant="outlined"
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Divider />
    </Drawer>
  );
}
