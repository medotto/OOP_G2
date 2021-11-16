import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { Checkbox } from "@material-ui/core";
import propertyFiltersStyles from "../styles/PropertySearch.module.css";
import { FormControl, FormGroup, FormControlLabel } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as FilterActions from "../redux/actions/FilterActions";

const drawerWidth = 200;

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
    marginLeft: drawerWidth,
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
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
export default function PropertyFilters(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const FilterInfo = useSelector((state) => state.FilterReducer);

  const { withPhotos } = FilterInfo?.status?.withPhotos;

  const handleChange = (event) => {
    dispatch(
      FilterActions.SetFilter({ [event.target.name]: event.target.checked })
    );
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}></div>
      <Divider />
      <Divider />
      <FormControl
        component="fieldset"
        className={propertyFiltersStyles.filterForm}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={withPhotos}
                onChange={handleChange}
                name="withPhotos"
              />
            }
            label="Com fotos"
          />
        </FormGroup>
      </FormControl>
    </Drawer>
  );
}
