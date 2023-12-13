import React from "react";
import axios from "axios";
import SearchFrom from "./SearchForm";

class App extends React.Component {
  constructor() {
    console.log("'App' => *** CONSTRUCTOR *** ran.");
    super();
    this.state = {
      doggos: [],
      breed: "husky",
    };
  }

  componentDidMount() {
    console.log("'App' => *** componentDidMount *** ran.");
    axios
      .get(`https://dog.ceo/api/breed/${this.state.breed}/images`)
      .then((res) => {
        this.setState({ doggos: res.data.message });
      })
      .catch((err) => {
        console.err(
          "'App' => *** componentDidMount axios call *** failed with error: ",
          err
        );
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("'App' => *** componentDidUpdate *** ran.");
    console.log(
      "'App' => *** componentDidUpdate *** prevState is: ",
      prevState
    );
    console.log("*** componentDidUpdate *** current State is: ", this.state);
    if (prevState.doggos !== this.state.doggos) {
      console.log("the dogs have changed");
      if (this.state.breed === "chihuahua") {
        console.log(
          "can force component to do something here, like force to search husky."
        );
      }
    }
  }

  searchDogs = (dogName) => {
    console.log("'App' => *** searchDogs *** ran.");
    axios
      .get(`https://dog.ceo/api/breed/${dogName}/images`)
      .then((res) => {
        this.setState({ doggos: res.data.message, breed: dogName });
      })
      .catch((err) =>
        console.err("'App' => *** searchDogs *** failed with error: ", err)
      );
  };

  componentWillUnmount() {
    console.log("did i ever unmount?");
  }

  render() {
    console.log("'App' => *** RENDER *** ran.");
    return (
      <>
        <h1>My App</h1>
        <SearchFrom searchDogs={this.searchDogs} />
        {this.state.doggos.map((dog, idx) => (
          <img
            width="200"
            src={dog}
            key={idx}
            alt={`picture of a random, "${this.state.breed}".`}
          />
        ))}
      </>
    );
  }
}

export default App;

/* REACT LIFECYCLE AS FOLLOWS:
  1. constructor
  2. render
  3. componentDidMount
  4. render
  5. componentDidUpdate
  6. *function that does something E.G. make axios call for other animals*
  7. render
  8. componentdidUpdate
  
  *** componentWillUnmount *** => when no longer needed E.G. navigating away, hiding an element.

*/
