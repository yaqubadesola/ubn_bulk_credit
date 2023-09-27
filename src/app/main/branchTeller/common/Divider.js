import React from "react";
import { Grid, Divider as MuiDivider } from "@material-ui/core";

const TheDivider = ({ children, ...props }) => (
  <Grid container alignItems="center" spacing={3} {...props}>
    <Grid item xs>
      <MuiDivider style={{border: "1px hash black"}} />
    </Grid>
    <Grid item>{children}</Grid>
    <Grid item xs>
      <MuiDivider style={{border: "px hash black"}} />
    </Grid>
  </Grid>
);

export default TheDivider;
