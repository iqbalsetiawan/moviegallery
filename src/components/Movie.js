import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import {
  Grid,
  Typography,
  Modal,
  Button,
  Card,
  CardContent,
  CardActionArea,
  withStyles,
  CardActions,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { Favorite, Schedule, Close } from "@material-ui/icons";

const styled = withStyles((theme) => ({
  container: {
    padding: "50px 30px 0 30px",
  },
  root: {
    width: "75%",
    marginBottom: "3em",
  },
  media: {
    height: 180,
  },
  time: {
    display: "flex",
  },
  like: {
    display: "flex",
    paddingTop: 10,
  },
  time1: {
    marginLeft: 10,
  },
  modalRoot: {
    overflowY: "hidden",
  },
  paper: {
    top: "1%",
    left: "50%",
    transform: "translate(-50%, 0)",
    position: "absolute",
    width: 900,
    height: "60%",
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 8,
    margin: `${theme.spacing(4)}px 0`,
    overflowY: "auto",
  },
  dialogTitle: {
    fontSize: "32px",
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.22,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#0971b5",
    marginBottom: theme.spacing(2),
  },
}));

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
      openDetail: false,
      idSelected: "",
      selectedMovie: {},
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    axios
      .get("https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies")
      .then((res) => {
        this.setState({
          moviesData: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fetchMovieDetail = (data) => {
    axios
      .get(
        `https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies/${data.id}`
      )
      .then((res) => {
        this.setState({
          openDetail: true,
          idSelected: res.data.id,
          selectedMovie: res.data,
        });
      });
  };

  onClose = () => {
    this.setState({ openDetail: false, idSelected: "", selectedMovie: {} });
  };

  render() {
    const { classes } = this.props;
    const { openDetail, moviesData, selectedMovie } = this.state;
    return (
      <div className={classes.container}>
        {openDetail && (
          <Modal
            open={openDetail}
            onClose={this.onClose}
            classes={{
              root: classes.modalRoot,
            }}
          >
            <div className={classes.paper}>
              <DialogTitle className={classes.title} id="alert-dialog-title">
                <DialogActions>
                  <Button onClick={this.onClose}>
                    <Close />
                  </Button>
                </DialogActions>
                <div className={classes.dialogTitle}>Movie Detail</div>
              </DialogTitle>
              <DialogContent>
                <Grid container item xs={12}>
                  <Grid item xs={6} container justify="center">
                    <img
                      style={{ width: "85%" }}
                      src={selectedMovie.image}
                      alt="mahkota"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={2}
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={12}>
                        <Typography variant="h5">
                          Title: {selectedMovie.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5" className={classes.time}>
                          <Schedule />
                          <Typography variant="body1" className={classes.time1}>
                            {format(
                              new Date(selectedMovie.showTime),
                              "dd/MM/yyyy (HH:mm)",
                              { locale: id }
                            )}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5" className={classes.time}>
                          <Favorite color="secondary" />
                          <Typography variant="body1" className={classes.time1}>
                            {selectedMovie.like}
                          </Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </div>
          </Modal>
        )}
        <Grid container item xs={12}>
          {moviesData.map(($item) => (
            <Grid key={$item.id} container item xs={4} justify="center">
              <Card className={classes.root}>
                <CardActionArea>
                  <img
                    style={{ width: "inherit" }}
                    src={$item.image}
                    alt="mahkota"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {$item.title}
                    </Typography>
                    <div className={classes.time}>
                      <Schedule />
                      <Typography variant="body1" className={classes.time1}>
                        {format(
                          new Date($item.showTime),
                          "dd/MM/yyyy (HH:mm)",
                          { locale: id }
                        )}
                      </Typography>
                    </div>
                    <div className={classes.like}>
                      <Favorite color="secondary" />
                      <Typography variant="body1" className={classes.time1}>
                        {$item.like}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => this.fetchMovieDetail($item)}
                    color="primary"
                    variant="contained"
                  >
                    Detail
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default styled(Movie);
