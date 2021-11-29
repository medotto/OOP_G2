import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Grid } from "@material-ui/core";
import propertyFiltersStyles from "../styles/PropertySearch.module.css";
import propertyRegistryStyles from "../styles/PropertyRegistry.module.css";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import PropertyFilters from "./PropertyFilters";
import PropertyRegistry from "./PropertyRegistry";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useSelector, useDispatch } from "react-redux";
import * as PropertyActions from "../redux/actions/PropertyActions.js";

const drawerLeftWidth = 200;
const drawerRightWidth = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  contentLeft: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerLeftWidth,
  },
  contentLeftShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contentRight: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerRightWidth,
  },
  contentRightShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function PropertySearch(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openFilters, setOpenFilters] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  const propertyInfos = useSelector((store) => store.PropertyReducer);

  useEffect(() => {
    setOpenInfo({ value: !!propertyInfos.activeProperty, origin: "edit" });
  }, [propertyInfos]);

  return (
    <div className={classes.root}>
      <div className={propertyFiltersStyles.filterTip}></div>
      <IconButton
        className={
          openFilters
            ? propertyFiltersStyles.drawerButtonMoved
            : propertyFiltersStyles.drawerButtonClosed
        }
        onClick={() => setOpenFilters(!openFilters)}
      >
        {openFilters ? <ChevronLeftIcon /> : <FilterListRoundedIcon />}
      </IconButton>
      <IconButton
        className={
          openInfo.value
            ? propertyRegistryStyles.drawerButtonMoved
            : propertyRegistryStyles.drawerButtonClosed
        }
        onClick={() => {
          if (openInfo.value) dispatch(PropertyActions.SetActiveProperty(null));
          setOpenInfo({ value: !openInfo.value, origin: "add" });
        }}
      >
        {openInfo.value ? <ChevronRightIcon /> : <AddRoundedIcon />}
      </IconButton>
      <CssBaseline />
      <PropertyFilters open={openFilters} />
      <main
        className={
          clsx(classes.contentLeft, {
            [classes.contentLeftShift]: openFilters,
          }) +
          " " +
          clsx(classes.contentRight, {
            [classes.contentRightShift]: openInfo.value,
          })
        }
      >
        <Grid
          container
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          className={propertyFiltersStyles.mainContainer}
        >
          {props.children}
        </Grid>
      </main>
      <PropertyRegistry open={openInfo} />
    </div>
  );
}
