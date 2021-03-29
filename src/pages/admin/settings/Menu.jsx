import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useState } from "react";
import StyledInput from "../../../components/forms/StyledInput";
import StyledSelect from "../../../components/forms/StyledSelect";

const conditions = [
  {
    text: "-",
    value: "-",
  },
  {
    text: "Contains",
    value: "1",
  },
  {
    text: "Equal",
    value: "2",
  },
  {
    text: "Start With",
    value: "3",
  },
  {
    text: "End With",
    value: "4",
  },
];

const fields = [];

const useStyles = makeStyles({
  card: {
    borderRadius: 15,
  },
});

const Menu = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("-");
  const [field, setField] = useState("-");

  return (
    <Fragment>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">Menu</Typography>
        </Grid>
        <Grid item>
          <Button className="__btn" variant="contained" color="secondary">
            Create New
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={2} className={classes.card}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <StyledInput
                    value={search}
                    onChange={setSearch}
                    variant="filled"
                    prefixIcon="fas fa-search"
                    label="What are you looking for?"
                    inputProps={{ placeholder: "Search for ID, Fields, etc" }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <StyledSelect
                    label="Condition"
                    value={condition}
                    onSelected={setCondition}
                    items={conditions}
                  />
                </Grid>
                <Grid item xs={2}>
                  <StyledSelect
                    label="Fields"
                    value={field}
                    onSelected={setField}
                    items={fields}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Menu;
