import React, { useState, useEffect } from "react";
import Instructor from "./InstructorFunc";
import { getRandomUser } from "./Utility/api";

const CyclopediaClassPageFunc = () => {
  const [state, setState] = useState({
    instructor: undefined,
    studentList: [],
    studentCount: 0,
    hideInstructor: false,
  });

  const [inputName, setInputName] = useState(() => {
    return "";
  });

  const [inputFeedback, setInputFeedback] = useState(() => {
    return "";
  });

  const getUser = async () => {
    const response = await getRandomUser();
    console.log(response);
    setState((prevState) => {
      return {
        ...prevState,
        instructor: {
          name: response.data.first_name + " " + response.data.last_name,
          email: response.data.email,
          phone: response.data.phone_number,
          inputName: "",
          inputFeedback: "",
        },
      };
    });
  };

  useEffect(() => {
    console.log("This will be called on every render");
  });

  useEffect(() => {
    console.log("This will only be called on initial/first render/mount");
    getUser();
  }, []);

  useEffect(() => {
    console.log(
      "This will be called on whenever value of hideInstructor changes"
    );
    if (state.hideInstructor) {
      getUser();
    }
  }, [state.hideInstructor]);

  useEffect(() => {
    console.log("This will only be called on initial/first render/mount");
    return () => {
      console.log("This will be called on when component will  be UNMOUNTED");
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomUser();
      console.log(response);
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
            ...prevState.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    };

    if (state.studentList.length < state.studentCount) {
      getUser();
    } else if (state.studentList.length > state.studentCount) {
      setState((prevState) => {
        return { ...prevState, studentList: [] };
      });
    }
  }, [state.studentCount]);

  // componentDidMount = async () => {
  //   console.log("Component did mount");
  //   if (JSON.parse(localStorage.getItem("cyclopediaState"))) {
  //     this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
  //   } else {
  //     const response = await getRandomUser();
  //     console.log(response);
  //     this.setState((prevState) => {
  //       return {
  //         instructor: {
  //           name: response.data.first_name + " " + response.data.last_name,
  //           email: response.data.email,
  //           phone: response.data.phone_number,
  //           inputName: "",
  //           inputFeedback: "",
  //         },
  //       };
  //     });
  //   }
  // };

  // componentDidUpdate = async (previousProps, previousState) => {
  //   console.log("Component did update");
  //   localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
  //   console.log("Old State - " + previousState.studentCount);
  //   console.log("New State - " + this.state.studentCount);
  //   if (previousState.studentCount < this.state.studentCount) {
  //     const response = await getRandomUser();
  //     this.setState((prevState) => {
  //       return {
  //         studentList: [
  //           ...prevState.studentList,
  //           {
  //             name: response.data.first_name + " " + response.data.last_name,
  //           },
  //         ],
  //       };
  //     });
  //   } else if (previousState.studentCount > this.state.studentCount) {
  //     const response = await getRandomUser();
  //     this.setState((prevState) => {
  //       return {
  //         studentList: [],
  //       };
  //     });
  //   }
  // };

  // componentWillUnmount() {
  //   console.log("Component will unmount");
  // }

  const handleAddStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: 0,
      };
    });
  };

  const handleToggleInstructor = () => {
    setState((prevState) => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  console.log("Render Component");
  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success">Instructor </span>
        <i
          className={`${
            state.hideInstructor
              ? "bi bi-toggle-off btn btn-success btn-sm"
              : "bi bi-toggle-on btn btn-success btn-sm"
          }`}
          onClick={handleToggleInstructor}
        ></i>
        {!state.hideInstructor && state.instructor ? (
          <Instructor instructor={state.instructor} />
        ) : null}
      </div>

      <div className="p-3">
        <span className="h4 text-success">Feedback</span>
        <br />
        <input
          type="text"
          value={inputName}
          placeholder="Name..."
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        ></input>
        <br />
        <textarea
          value={inputFeedback}
          placeholder="Give me your best Jojo reference.."
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
        ></textarea>{" "}
        Text area: {inputFeedback}
      </div>
      <div className="p-3">
        <span className="h4 text-success">Students</span> <br />
        <div>Student Count : {state.studentCount}</div>
        <button className="btn btn-success btn-sm" onClick={handleAddStudent}>
          Add Student
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={handleRemoveAllStudent}
        >
          Remove All Students
        </button>
        {state.studentList.map((student, index) => {
          return (
            <div className="text-white" key={index}>
              {student.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CyclopediaClassPageFunc;
