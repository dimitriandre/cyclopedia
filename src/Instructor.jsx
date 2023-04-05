import React from "react";

class Instructor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    console.log("Did Mount - Instructor");
  };

  componentDidUpdate() {
    console.log("Did Update - Instructor");
  }

  componentWillUnmount() {
    console.log("Will UnMount - Instructor");
  }

  render() {
    console.log("Render - Instructor");
    return (
      <div className="p-3">
        <span className="h4 text-success">Instructor</span>
        <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
        <br />
        Name: {this.props.instructor.name}
        <br />
        Email: {this.props.instructor.email}
        <br />
        Phone: {this.props.instructor.phone}
      </div>
    );
  }
}

export default Instructor;
