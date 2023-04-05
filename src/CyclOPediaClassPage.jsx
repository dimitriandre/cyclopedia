import React from "react";
import Instructor from "./Instructor";
import { getRandomUser } from "./Utility/api";

class CyclopediaClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  }

  componentDidMount = async () => {
    console.log("Component did mount");
    if (JSON.parse(localStorage.getItem("cyclopediaState"))) {
      this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
    } else {
      const response = await getRandomUser();
      console.log(response);
      this.setState((prevState) => {
        return {
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
            inputName: "",
            inputFeedback: "",
          },
        };
      });
    }
  };

  componentDidUpdate() {
    console.log("Component did update");
    localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  handleAddStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  handleRemoveAllStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  handleToggleInstructor = () => {
    this.setState((prevState) => {
      return {
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };
  render() {
    console.log("Render Component");
    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success">Instructor </span>
          <i
            className={`${
              this.state.hideInstructor
                ? "bi bi-toggle-off btn btn-success btn-sm"
                : "bi bi-toggle-on btn btn-success btn-sm"
            }`}
            onClick={this.handleToggleInstructor}
          ></i>
          {!this.state.hideInstructor ? (
            <Instructor instructor={this.state.instructor} />
          ) : null}
        </div>

        <div className="p-3">
          <span className="h4 text-success">Feedback</span>
          <br />
          <input
            type="text"
            value={this.state.inputName}
            placeholder="Name..."
            onChange={(e) => {
              this.setState({ inputName: e.target.value });
            }}
          ></input>
          <br />
          <textarea
            value={this.state.inputFeedback}
            placeholder="Give me your best Jojo reference.."
            onChange={(e) => {
              this.setState({ inputFeedback: e.target.value });
            }}
          ></textarea>{" "}
          Text area: {this.state.inputFeedback}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Students</span> <br />
          <div>Student Count : {this.state.studentCount}</div>
          <button
            className="btn btn-success btn-sm"
            onClick={this.handleAddStudent}
          >
            Add Student
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={this.handleRemoveAllStudent}
          >
            Remove All Students
          </button>
        </div>
      </div>
    );
  }
}

export default CyclopediaClassPage;
