import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import * as FilterActions from "../redux/actions/FilterActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
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

export default function PriceFilter(props) {
  const filterInfo = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [values, setValues] = useState({ min: 100000, max: 200000 });

  useEffect(() => {
    dispatch(
      FilterActions.SetPriceRange({
        min: values.min,
        max: values.max,
      })
    );
  }, [values]);

  const handleChange = async (event) => {
    setValues({
      ...values,
      [event.target.name]: Number(event.target.value),
    });
  };

  return (
    <div className={classes.root}>
      <TextField
        label="De"
        value={values.min}
        onChange={handleChange}
        name="min"
        id="min"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <TextField
        label="Até"
        value={values.max}
        onChange={handleChange}
        name="max"
        id="max"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </div>
  );
}
