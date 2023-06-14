import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import "./App.css";

const PAT = "645b039b4882440f916800b3f6e48397";
const USER_ID = "mzclarifai";
const APP_ID = "my-first-application";
const MODEL_ID = "face-detection";

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgURL: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0]?.data?.regions[0]?.region_info?.bounding_box;

    const image = document.getElementById("inputimage");
    const width = +image.width;
    const height = +image.height;

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => this.setState({ box });

  onInputChange = (e) => this.setState({ input: e.target.value });

  getClarifaiRequestOptions = (imgURL) => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imgURL,
            },
          },
        },
      ],
    });
    return {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
  };

  onButtonSubmit = () => {
    this.setState({ imgURL: this.state.input });

    const requestOptions = this.getClarifaiRequestOptions(this.state.input);

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signout") this.setState({ isSignedIn: false });
    else if (route === "home") this.setState({ isSignedIn: true });
    this.setState({ route });
  };

  render() {
    const { isSignedIn, imgURL, box, route } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" type="cobweb" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imgURL={imgURL} />{" "}
          </>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register />
        )}
      </div>
    );
  }
}

export default App;
