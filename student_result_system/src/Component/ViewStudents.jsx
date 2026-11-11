import React, { useEffect, useState } from "react";
import {
  getStudents,
  updateStudent,
  deleteStudent
} from "../api/api";

function ViewStudents() {

  const [students, setStudents] = useState([]);

  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: ""
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student.id);

    setFormData({
      name: student.name || "",
      email: student.email || "",
      course: student.course || ""
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {

    try {

      await updateStudent(editingStudent, formData);

      alert("Student updated successfully!");

      setEditingStudent(null);

      loadStudents();

    } catch (error) {

      console.error(error);

      alert("Failed to update student.");

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteStudent(id);

      alert("Student deleted successfully!");

      loadStudents();

    } catch (error) {

      console.error(error);

      alert("Failed to delete student.");

    }
  };

  return (

    <div className="students-page">

      <div className="students-header">

        <div>
          <h1>Students</h1>
          <p>Manage all student records</p>
        </div>

        <div className="student-count">
          Total: {students.length}
        </div>

      </div>


      {/* Edit Form */}

      {editingStudent && (

        <div className="edit-box">

          <h2>Edit Student</h2>

          <div className="edit-form">

            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
            />

            <button
              className="update-btn"
              onClick={handleUpdate}
            >
              Update
            </button>

            <button
              className="cancel-btn"
              onClick={() => setEditingStudent(null)}
            >
              Cancel
            </button>

          </div>

        </div>

      )}


      {/* Student Table */}

      <div className="students-table-box">

        <table className="students-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>COURSE</th>
              <th>ACTION</th>
            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student.id}>

                <td>{student.id}</td>

                <td className="student-name">
                  {student.name}
                </td>

                <td>
                  {student.email}
                </td>

                <td>
                  <span className="course-badge">
                    {student.course}
                  </span>
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {students.length === 0 && (
          <div className="no-students">
            No students found.
          </div>
        )}

      </div>

    </div>

  );
}

export default ViewStudents;