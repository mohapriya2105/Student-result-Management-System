import React, { useState } from "react";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student added:", student);
    setStudent({ name: "", email: "", course: "" });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-success text-white text-center">
          <h4>Add Student</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <input
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="email"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="col-md-4">
                <select
                  name="course"
                  value={student.course}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success px-4">
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
