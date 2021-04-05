import "./App.css";
import { TextField, Button } from "@material-ui/core";
import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const API_KEY = "Kl04L8vLxbDqWBvcfqaR5i8avP9SxBQh3JCfIjAs";

interface Props extends RouteComponentProps {
  history: any;
}

interface State {
  asteroidId: string;
  isAsteroidIdValid: boolean;
  randomAsteroidId: string;
  asteroidDetails: object;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    console.log("APP ==================", props);

    this.state = {
      asteroidId: "",
      isAsteroidIdValid: true,
      randomAsteroidId: "",
      asteroidDetails: {},
    };
  }

  getAsteroid = (id: any) => {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          asteroidDetails: data,
        });
        this.props.history.push("/asteroid", { data: data });
      })
      .catch((err) => {
        this.setState({
          isAsteroidIdValid: false,
        });
      });
  };

  getRandomAsteroidId = () => {
    let randomNumber = Math.floor(Math.random() * 20);
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          {
            randomAsteroidId: data.near_earth_objects[randomNumber].id,
          },
          () => {
            this.getAsteroid(this.state.randomAsteroidId);
          }
        )
      );
  };

  render() {
    return (
      <div className="App">
        <Grid container spacing={3} direction="column">
          <Grid style={{marginTop: 30}} item>
            <TextField 
              onChange={(e) => {
                this.setState({
                  asteroidId: e.target.value,
                  isAsteroidIdValid: true,
                });
              }}
              id="outlined-basic"
              placeholder="Enter Asteroid ID"
              value={this.state.asteroidId}
            />
          </Grid>
          <Grid item>
            {!this.state.isAsteroidIdValid && (
              <h3 style={{ color: "red" }}>Please Enter Valid Id</h3>
            )}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.asteroidId === ""}
              onClick={() => this.getAsteroid(this.state.asteroidId)}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.getRandomAsteroidId()}
            >
              Random Asteroid
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
