import React from "react";

class InstructorFunc extends React.Component {
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
        Name: {this.props.instructor.name}
        <br />
        Email: {this.props.instructor.email}
        <br />
        Phone: {this.props.instructor.phone}
      </div>
    );
  }
}

export default InstructorFunc;
