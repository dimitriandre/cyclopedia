import React, { useState, useEffect } from "react";

const InstructorFunc = (props) => {
  useEffect(() => {
    return () => {
      console.log("Instructor - UNMOUNTED");
    };
  }, []);

  return (
    <div className="p-3">
      Name: {props.instructor.name}
      <br />
      Email: {props.instructor.email}
      <br />
      Phone: {props.instructor.phone}
    </div>
  );
};

export default InstructorFunc;
