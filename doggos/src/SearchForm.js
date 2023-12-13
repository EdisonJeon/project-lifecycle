import React from "react";

class SearchFrom extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
    };
  }

  render() {
    return (
      <>
        <input
          type="text"
          placeholder="breed"
          value={this.state.inputValue}
          onChange={(e) => this.setState({ inputValue: e.target.value })}
        />
        <input
          type="submit"
          onClick={() => this.props.searchDogs(this.state.inputValue)}
        />
      </>
    );
  }
}

export default SearchFrom;
