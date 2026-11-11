import { useState } from "react";
import { addResult } from "../api/api";

export default function AddResult() {
  const [result, setResult] = useState({ studentId: "", subject: "", marks: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addResult(result);
    alert("Result added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <input className="form-control mb-2" placeholder="Student ID"
             onChange={(e) => setResult({ ...result, studentId: e.target.value })} />
      <input className="form-control mb-2" placeholder="Subject"
             onChange={(e) => setResult({ ...result, subject: e.target.value })} />
      <input className="form-control mb-2" placeholder="Marks"
             onChange={(e) => setResult({ ...result, marks: e.target.value })} />
      <button className="btn btn-success" type="submit">Add Result</button>
    </form>
  );
}
