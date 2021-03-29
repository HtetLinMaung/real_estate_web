import { v4 } from "uuid";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import React, { Fragment, useState } from "react";

const useStyles = makeStyles({
  select: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 34,
    border: "1px solid #c4c4c4",
    width: "100%",
    fontSize: 12,
    borderRadius: 10,
    boxSizing: "border-box",
    padding: "0.5rem 0.75rem",
    "&:focus": {
      outline: "none",
    },
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: ".5rem",
  },
});

const StyledSelect = ({
  label = "",
  value = "",
  items = [],
  onSelected = () => {},
}) => {
  const id = v4();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [width, setWidth] = useState("auto");

  const findByValue = (value) => {
    const item = items.find((e) => e.value === value);
    if (item) {
      return item.text;
    } else {
      return "";
    }
  };

  const handleClick = (event) => {
    setWidth(document.getElementById(id)?.offsetWidth);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    onSelected(value);
  };

  return (
    <Fragment>
      {label ? <div className={classes.label}>{label}</div> : null}
      <div id={id} className={classes.select} onClick={handleClick}>
        {findByValue(value) || "-"}
        <i className="fas fa-chevron-down"></i>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem
            style={{ fontSize: 12, width }}
            key={item.value}
            onClick={handleClose.bind(this, item.value)}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default StyledSelect;
