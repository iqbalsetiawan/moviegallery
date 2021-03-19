import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
  Grid,
  Typography,
  TextField,
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
  IconButton,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Favorite, Schedule, Close, Search } from "@material-ui/icons";

import DatePicker from "react-date-picker";

import { dateWithSec } from "../utils/date";

import NotFound from "../assets/NotFound.png";

const styled = withStyles((theme) => ({
  container: {
    padding: 20,
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
      searchData: "",
      searchDate: null,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    this.setState({ isFetching: true });
    axios
      .get("https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies")
      .then((res) => {
        this.setState({
          moviesData: res.data,
          isFetching: false,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isFetching: false });
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

  handleChangeDate = (date) => {
    const { moviesData } = this.state;
    this.setState(
      {
        searchDate: date,
      },
      () => {
        if (date === null) {
          this.fetchMovies();
          return;
        }
        const filteredData = moviesData.filter(
          (dt) =>
            new Date(dt.showTime).toLocaleDateString() ===
            new Date(date).toLocaleDateString()
        );
        this.setState({
          moviesData: filteredData,
        });
      }
    );
  };

  handleFilter = () => {
    const { moviesData, searchData } = this.state;
    if (searchData === "") {
      this.fetchMovies();
      return;
    }
    const filteredData = moviesData.filter((dt) => dt.title === searchData);
    this.setState({
      moviesData: filteredData,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      openDetail,
      moviesData,
      selectedMovie,
      searchData,
      searchDate,
      isFetching,
    } = this.state;
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
                            {dateWithSec(selectedMovie.showTime)}
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
          <Grid item xs={6} style={{ padding: "0px 20px 20px" }}>
            <Typography variant="h2" color="primary">
              Search:
            </Typography>
            <div style={{ display: "flex" }}>
              <Autocomplete
                freeSolo
                style={{ width: 500 }}
                disableClearable
                options={moviesData.map((option) => option.title)}
                inputValue={searchData}
                onInputChange={(event, newInputValue) => {
                  this.setState({ searchData: newInputValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a movie"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
              <IconButton onClick={this.handleFilter}>
                <Search />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2" color="primary">
              Filter:
            </Typography>
            <div style={{ paddingTop: 15 }}>
              <DatePicker onChange={this.handleChangeDate} value={searchDate} />
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          {!isFetching && moviesData.length === 0 ? (
            <Grid item xs={12} container justify="center">
              <img src={NotFound} alt="Not Found" />
            </Grid>
          ) : (
            moviesData.map(($item) => (
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
                          {dateWithSec($item.showTime)}
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
            ))
          )}
        </Grid>
      </div>
    );
  }
}

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default styled(Movie);
