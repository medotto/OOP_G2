import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Grid } from "@material-ui/core";
import propertyFiltersStyles from "../styles/PropertySearch.module.css";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import PropertyFilters from "./PropertyFilters";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

export default function PropertySearch(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <div className={propertyFiltersStyles.filterTip}></div>
      <IconButton
        className={
          open
            ? propertyFiltersStyles.drawerButtonMoved
            : propertyFiltersStyles.drawerButtonClosed
        }
        onClick={handleDrawer}
      >
        {open ? <ChevronLeftIcon /> : <FilterListRoundedIcon />}
      </IconButton>
      <CssBaseline />
      <PropertyFilters open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
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
    </div>
  );
}
