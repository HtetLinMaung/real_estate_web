import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";

const useStyles = makeStyles({
  root: {
    transition: "all 0.3s",
    boxSizing: "border-box",
    display: "flex",
    borderRadius: 10,
    border: "1px solid #c4c4c4",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: ".5rem",
  },
  input: {
    fontSize: 12,
    padding: "0.5rem 0",
    backgroundColor: "transparent",
    flex: 1,
    borderWidth: 0,
    "&:focus": {
      outline: "none",
    },
  },
  filled: {
    borderWidth: 0,
  },
  icon: {
    padding: "0 0.5rem",
  },
});

const StyledInput = ({
  variant = "outlined",
  filledColor = "#E9EDF3",
  prefixIcon = "",
  postfixIcon = "",
  inputProps = {},
  label = "",
  value = "",
  onChange = () => {},
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      {label ? <div className={classes.label}>{label}</div> : null}
      <div
        className={clsx(classes.root, {
          [classes.filled]: variant === "filled",
        })}
        style={{ backgroundColor: filledColor }}
      >
        {prefixIcon ? (
          <i className={prefixIcon + " " + classes.icon}></i>
        ) : null}
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={classes.input}
          type="text"
          {...inputProps}
        />
        {postfixIcon ? (
          <i className={postfixIcon + " " + classes.icon}></i>
        ) : null}
      </div>
    </Fragment>
  );
};

export default StyledInput;
