import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import "./App.css";

import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getResults,
  addResult,
  deleteResult
} from "./api/api";


/* =====================================================
   ADMIN LOGIN
===================================================== */

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (username === "admin" && password === "admin123") {

      sessionStorage.setItem("adminLoggedIn", "true");

      onLogin();

    } else {

      alert("Invalid username or password");

    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>Admin Login</h1>

        <form onSubmit={handleLogin}>

          <div className="login-group">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>

          <div className="login-group">

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}


/* =====================================================
   LAYOUT
===================================================== */

function Layout({ onLogout }) {

  return (

    <div className="app-container">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">

          <h2>
            Student Result
          </h2>

          <span>
            Management System
          </span>

        </div>


        <nav className="sidebar-menu">

          {/* DASHBOARD */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "menu-link active"
                : "menu-link"
            }
          >
            <span>▦</span>
            Dashboard
          </NavLink>


          {/* ADD STUDENT */}

          <NavLink
            to="/add-student"
            className={({ isActive }) =>
              isActive
                ? "menu-link active"
                : "menu-link"
            }
          >
            <span>＋</span>
            Add Student
          </NavLink>


          {/* VIEW STUDENTS */}

          <NavLink
            to="/view-students"
            className={({ isActive }) =>
              isActive
                ? "menu-link active"
                : "menu-link"
            }
          >
            <span>☷</span>
            View Students
          </NavLink>


          {/* RESULTS */}

          <NavLink
            to="/results"
            className={({ isActive }) =>
              isActive
                ? "menu-link active"
                : "menu-link"
            }
          >
            <span>▤</span>
            Results
          </NavLink>


          {/* ABOUT */}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "menu-link active"
                : "menu-link"
            }
          >
            <span>ⓘ</span>
            About
          </NavLink>

        </nav>


        <div className="sidebar-footer">

          Academic Portal

          <br />

          <span>
            2026
          </span>

        </div>

      </aside>


      {/* MAIN AREA */}

      <div className="main-area">

        <header className="top-header">

          <div className="breadcrumb">
            Student Result System
          </div>


          <div className="admin-profile">

            <div className="avatar">
              SR
            </div>

            <span>
              Admin
            </span>

            <button
              className="logout-button"
              onClick={onLogout}
            >
              Logout
            </button>

          </div>

        </header>


        <main className="page-content">

          <Routes>

            {/* DASHBOARD */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* ADD STUDENT */}

            <Route
              path="/add-student"
              element={<AddStudent />}
            />


            {/* VIEW STUDENTS */}

            <Route
              path="/view-students"
              element={<ViewStudents />}
            />


            {/* RESULTS */}

            <Route
              path="/results"
              element={<Results />}
            />


            {/* ABOUT */}

            <Route
              path="/about"
              element={<About />}
            />

          </Routes>

        </main>

      </div>

    </div>

  );
}


/* =====================================================
   HOME / DASHBOARD
===================================================== */

function Home() {

  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);


  useEffect(() => {

    loadDashboard();

  }, []);


  const loadDashboard = async () => {

    try {

      const studentResponse =
        await getStudents();

      const resultResponse =
        await getResults();


      setStudents(
        studentResponse.data || []
      );

      setResults(
        resultResponse.data || []
      );

    } catch (error) {

      console.error(
        "Dashboard loading error:",
        error
      );

    }

  };


  /* UNIQUE COURSES */

  const courses = [
    ...new Set(
      students
        .map(
          (student) => student.course
        )
        .filter(
          (course) => course
        )
    )
  ];


  /* AVERAGE SCORE */

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce(
            (total, result) =>
              total +
              Number(result.marks || 0),
            0
          ) / results.length
        )
      : 0;


  return (

    <>

      <h1 className="page-title">
        Dashboard
      </h1>


      <p className="page-subtitle">
        Welcome back. Here's an overview
        of your student result system.
      </p>


      {/* HERO */}

      <div className="hero-section">

        <div>

          <h2>
            Manage student records with ease.
          </h2>

          <p>
            Add students, maintain course
            information and view academic
            records from one place.
          </p>

        </div>


        <div className="hero-logo">
          SR
        </div>

      </div>


      {/* STATISTICS */}

      <div className="stats-container">


        {/* TOTAL STUDENTS */}

        <div className="stat-card">

          <p>
            Total Students
          </p>

          <h2>
            {students.length}
          </h2>

          <span>
            Students in database
          </span>

        </div>


        {/* COURSES */}

        <div className="stat-card">

          <p>
            Courses
          </p>

          <h2>
            {courses.length}
          </h2>

          <span>
            Active courses
          </span>

        </div>


        {/* RESULTS */}

        <div className="stat-card">

          <p>
            Results Published
          </p>

          <h2>
            {results.length}
          </h2>

          <span>
            Results available
          </span>

        </div>


        {/* AVERAGE */}

        <div className="stat-card">

          <p>
            Average Score
          </p>

          <h2>
            {averageScore}%
          </h2>

          <span>
            Current results
          </span>

        </div>

      </div>


      {/* RECENT STUDENTS */}

      <div className="content-card">

        <div className="card-header">

          <h3>
            Recent Students
          </h3>


          <NavLink
            to="/view-students"
            className="view-link"
          >
            View all →
          </NavLink>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Course
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {students.length === 0 ? (

                <tr>

                  <td colSpan="5">
                    No students found
                  </td>

                </tr>

              ) : (

                students
                  .slice(-5)
                  .reverse()
                  .map((student) => (

                    <tr
                      key={student.id}
                    >

                      <td>
                        {student.id}
                      </td>

                      <td>
                        {student.name}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>

                        <span className="status">
                          Active
                        </span>

                      </td>

                    </tr>

                  ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

}


/* =====================================================
   ADD STUDENT
===================================================== */

function AddStudent() {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      course: ""
    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      await addStudent(formData);


      alert(
        "Student added successfully!"
      );


      setFormData({
        name: "",
        email: "",
        course: ""
      });

    } catch (error) {

      console.error(
        "Add student error:",
        error
      );

      alert(
        "Failed to add student."
      );

    }

  };


  return (

    <div className="form-wrapper">

      <div className="form-card">

        <div className="form-header">

          <h2>
            Add New Student
          </h2>

          <p>
            Enter student details to
            create a new record.
          </p>

        </div>


        <form
          className="student-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">


            {/* NAME */}

            <div className="form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* COURSE */}

            <div className="form-group">

              <label>
                Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select course
                </option>

                <option value="BCA">
                  BCA
                </option>

                <option value="B.Sc Computer Science">
                  B.Sc Computer Science
                </option>

                <option value="B.Com">
                  B.Com
                </option>

                <option value="BBA">
                  BBA
                </option>

              </select>

            </div>

          </div>


          <button
            type="submit"
            className="primary-button"
          >
            Add Student
          </button>

        </form>

      </div>

    </div>

  );

}


/* =====================================================
   VIEW STUDENTS
===================================================== */

function ViewStudents() {

  const [students, setStudents] =
    useState([]);


  const [
    editingStudent,
    setEditingStudent
  ] = useState(null);


  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      course: ""
    });


  useEffect(() => {

    loadStudents();

  }, []);


  /* LOAD STUDENTS */

  const loadStudents = async () => {

    try {

      const response =
        await getStudents();

      setStudents(
        response.data || []
      );

    } catch (error) {

      console.error(
        "Loading students error:",
        error
      );

    }

  };


  /* EDIT */

  const handleEdit = (student) => {

    setEditingStudent(
      student.id
    );


    setFormData({

      name:
        student.name || "",

      email:
        student.email || "",

      course:
        student.course || ""

    });

  };


  /* INPUT CHANGE */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  /* UPDATE */

  const handleUpdate = async () => {

    try {

      await updateStudent(
        editingStudent,
        formData
      );


      alert(
        "Student updated successfully!"
      );


      setEditingStudent(null);


      loadStudents();

    } catch (error) {

      console.error(
        "Update error:",
        error
      );


      alert(
        "Failed to update student."
      );

    }

  };


  /* DELETE */

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await deleteStudent(id);


      alert(
        "Student deleted successfully!"
      );


      loadStudents();

    } catch (error) {

      console.error(
        "Delete error:",
        error
      );


      alert(
        "Failed to delete student."
      );

    }

  };


  return (

    <>

      <h1 className="page-title">
        Student List
      </h1>


      <p className="page-subtitle">
        View and manage all registered
        students.
      </p>


      {/* EDIT BOX */}

      {editingStudent && (

        <div className="content-card">

          <div className="card-header">

            <h3>
              Edit Student
            </h3>

          </div>


          <div className="form-grid">


            {/* NAME */}

            <div className="form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>


            {/* COURSE */}

            <div className="form-group">

              <label>
                Course
              </label>

              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
              />

            </div>

          </div>


          <button
            className="primary-button"
            onClick={handleUpdate}
          >
            Update Student
          </button>


          <button
            className="cancel-button"
            onClick={() =>
              setEditingStudent(null)
            }
          >
            Cancel
          </button>

        </div>

      )}


      {/* STUDENT TABLE */}

      <div className="content-card">

        <div className="card-header">

          <h3>
            All Students
          </h3>


          <NavLink
            to="/add-student"
            className="add-link"
          >
            ＋ Add Student
          </NavLink>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Course
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {students.length === 0 ? (

                <tr>

                  <td colSpan="6">
                    No students found
                  </td>

                </tr>

              ) : (

                students.map(
                  (student) => (

                    <tr
                      key={student.id}
                    >

                      <td>
                        {student.id}
                      </td>

                      <td>
                        {student.name}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>

                        <span className="status">
                          Active
                        </span>

                      </td>

                      <td>

                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit(
                              student
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(
                              student.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

}


/* =====================================================
   RESULTS
===================================================== */

function Results() {

  const [students, setStudents] =
    useState([]);


  const [results, setResults] =
    useState([]);


  const [formData, setFormData] =
    useState({
      studentId: "",
      subject: "",
      marks: ""
    });


  useEffect(() => {

    loadData();

  }, []);


  /* LOAD STUDENTS + RESULTS */

  const loadData = async () => {

    try {

      const studentResponse =
        await getStudents();

      const resultResponse =
        await getResults();


      setStudents(
        studentResponse.data || []
      );

      setResults(
        resultResponse.data || []
      );

    } catch (error) {

      console.error(
        "Result loading error:",
        error
      );

    }

  };


  /* GET GRADE */

  const getGrade = (marks) => {

    const value =
      Number(marks);


    if (value >= 90) {
      return "A+";
    }

    if (value >= 80) {
      return "A";
    }

    if (value >= 70) {
      return "B";
    }

    if (value >= 60) {
      return "C";
    }

    if (value >= 50) {
      return "D";
    }

    return "F";

  };


  /* INPUT CHANGE */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  /* ADD RESULT */

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !formData.studentId ||
      !formData.subject ||
      formData.marks === ""
    ) {

      alert(
        "Please fill all fields."
      );

      return;

    }


    const marks =
      Number(formData.marks);


    if (
      marks < 0 ||
      marks > 100
    ) {

      alert(
        "Marks must be between 0 and 100."
      );

      return;

    }


    try {

      const resultData = {

        studentId:
          Number(formData.studentId),

        subject:
          formData.subject,

        marks:
          marks

      };


      await addResult(resultData);


      alert(
        "Result added successfully!"
      );


      setFormData({

        studentId: "",
        subject: "",
        marks: ""

      });


      loadData();

    } catch (error) {

      console.error(
        "Add result error:",
        error
      );


      alert(
        "Failed to add result."
      );

    }

  };


  /* DELETE RESULT */

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this result?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await deleteResult(id);


      alert(
        "Result deleted successfully!"
      );


      loadData();

    } catch (error) {

      console.error(
        "Delete result error:",
        error
      );


      alert(
        "Failed to delete result."
      );

    }

  };


  /* FIND STUDENT NAME */

  const getStudentName = (studentId) => {

    const student =
      students.find(
        (item) =>
          Number(item.id) ===
          Number(studentId)
      );


    return student
      ? student.name
      : "Unknown Student";

  };


  return (

    <>

      <h1 className="page-title">
        Student Results
      </h1>


      <p className="page-subtitle">
        Add and manage academic results
        for students.
      </p>


      {/* ADD RESULT FORM */}

      <div className="content-card">

        <div className="card-header">

          <h3>
            Add Result
          </h3>

        </div>


        <form
          className="student-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">


            {/* STUDENT */}

            <div className="form-group">

              <label>
                Student
              </label>

              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select student
                </option>


                {students.map(
                  (student) => (

                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* SUBJECT */}

            <div className="form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>


            {/* MARKS */}

            <div className="form-group">

              <label>
                Marks
              </label>

              <input
                type="number"
                name="marks"
                placeholder="Enter marks"
                min="0"
                max="100"
                value={formData.marks}
                onChange={handleChange}
                required
              />

            </div>


            {/* GRADE */}

            <div className="form-group">

              <label>
                Grade
              </label>

              <input
                type="text"
                value={
                  formData.marks === ""
                    ? ""
                    : getGrade(
                        formData.marks
                      )
                }
                placeholder="Auto calculated"
                readOnly
              />

            </div>

          </div>


          <button
            type="submit"
            className="primary-button"
          >
            Add Result
          </button>

        </form>

      </div>


      {/* RESULTS TABLE */}

      <div className="content-card">

        <div className="card-header">

          <h3>
            All Results
          </h3>

          <span>
            {results.length} result(s)
          </span>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Student
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Marks
                </th>

                <th>
                  Grade
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {results.length === 0 ? (

                <tr>

                  <td colSpan="6">
                    No results found
                  </td>

                </tr>

              ) : (

                results.map(
                  (result) => (

                    <tr
                      key={result.id}
                    >

                      <td>
                        {result.id}
                      </td>


                      <td>
                        {getStudentName(
                          result.studentId
                        )}
                      </td>


                      <td>
                        {result.subject}
                      </td>


                      <td>
                        {result.marks}
                      </td>


                      <td>

                        <span className="status">
                          {getGrade(
                            result.marks
                          )}
                        </span>

                      </td>


                      <td>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(
                              result.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

}


/* =====================================================
   ABOUT
===================================================== */

function About() {

  return (

    <>

      <h1 className="page-title">
        About the System
      </h1>


      <p className="page-subtitle">
        A clean academic management
        solution built for student
        records and results.
      </p>


      <div className="about-grid">


        {/* ABOUT */}

        <div className="about-card">

          <h2>
            Student Result Management
            System
          </h2>


          <p className="about-text">

            This application helps
            institutions manage student
            information, courses and
            academic results through a
            simple web interface.

          </p>


          <div className="feature">

            <strong>
              Frontend
            </strong>

            <p>
              React.js with responsive
              modern UI.
            </p>

          </div>


          <div className="feature">

            <strong>
              Backend
            </strong>

            <p>
              Spring Boot REST APIs for
              student management.
            </p>

          </div>


          <div className="feature">

            <strong>
              Database
            </strong>

            <p>
              MySQL for storing student
              and result data.
            </p>

          </div>

        </div>


        {/* STACK */}

        <div className="about-card">

          <h2>
            Project Stack
          </h2>


          <div className="feature">

            <strong>
              React
            </strong>

            <p>
              Interactive user interface
            </p>

          </div>


          <div className="feature">

            <strong>
              Spring Boot
            </strong>

            <p>
              Backend and REST API
            </p>

          </div>


          <div className="feature">

            <strong>
              MySQL
            </strong>

            <p>
              Persistent database
            </p>

          </div>


          <div className="feature">

            <strong>
              2026
            </strong>

            <p>
              Student Result Management
              System
            </p>

          </div>

        </div>

      </div>

    </>

  );

}


/* =====================================================
   APP
===================================================== */

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("adminLoggedIn") === "true"
  );


  const handleLogin = () => {

    setIsLoggedIn(true);

  };


  const handleLogout = () => {

    sessionStorage.removeItem("adminLoggedIn");

    setIsLoggedIn(false);

  };


  return (

    <BrowserRouter>

      {isLoggedIn ? (

        <Layout onLogout={handleLogout} />

      ) : (

        <Routes>

          <Route
            path="*"
            element={
              <Login
                onLogin={handleLogin}
              />
            }
          />

        </Routes>

      )}

    </BrowserRouter>

  );

}