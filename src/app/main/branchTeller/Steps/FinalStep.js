import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { myStyles } from "../common/styles";
import { renderText } from "../common/DisplayComponent";

const FinalStep = ({ data }) => {
  return (
    <Paper style={myStyles.steps}>
      <Grid mt={2} mb={2}>
        {renderText({
          label: "Your Submitted Data",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Grid>

      {JSON.stringify(data, null, 4)}
    </Paper>
  );
};

export default FinalStep;
