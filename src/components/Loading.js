import React from "react";
import PropTypes from "prop-types";
import { Grid, CircularProgress, withStyles } from "@material-ui/core";

const Loading = ({ isLoading, error, classes }) => {
  if (isLoading) {
    return (
      <Grid container className={classes.wrapper}>
        <Grid item xs={12} container justify="center">
          <CircularProgress size={70} />
        </Grid>
      </Grid>
    );
  } else if (error) {
    return (
      <div className={classes.wrapper}>
        Sorry, there was a problem loading the page.
      </div>
    );
  }
  return null;
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.any,
  error: PropTypes.any,
};

Loading.defaultProps = {
  isLoading: true,
  error: false,
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default withStyles(styles)(Loading);
