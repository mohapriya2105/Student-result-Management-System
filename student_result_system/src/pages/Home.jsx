import React, { useEffect, useState } from "react";
import { getStudents, getResults } from "../api/api";

function Home() {

  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const studentResponse = await getStudents();
      const resultResponse = await getResults();

      setStudents(studentResponse.data);
      setResults(resultResponse.data);

    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce(
            (total, result) => total + Number(result.marks || 0),
            0
          ) / results.length
        )
      : 0;

  return (
    <div className="home-page">

      <h1>Dashboard</h1>

      <p className="welcome-text">
        Welcome back. Here's an overview of your student result system.
      </p>

      {/* Welcome Banner */}
      <div className="dashboard-banner">
        <div>
          <h2>Manage student records with ease.</h2>
          <p>
            Add students, maintain course information and view academic
            records from one place.
          </p>
        </div>

        <div className="sr-box">
          SR
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <p>Total Students</p>
          <h2>{students.length}</h2>
          <span>Students in database</span>
        </div>

        <div className="dashboard-card">
          <p>Courses</p>
          <h2>
            {[...new Set(students.map(student => student.course))].filter(Boolean).length}
          </h2>
          <span>Active courses</span>
        </div>

        <div className="dashboard-card">
          <p>Results Published</p>
          <h2>{results.length}</h2>
          <span>Results available</span>
        </div>

        <div className="dashboard-card">
          <p>Average Score</p>
          <h2>{averageScore}%</h2>
          <span>Current results</span>
        </div>

      </div>

      {/* Recent Students */}
      <div className="recent-students">

        <div className="recent-header">
          <h2>Recent Students</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>COURSE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {students.slice(-5).reverse().map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <span className="active-status">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Home;