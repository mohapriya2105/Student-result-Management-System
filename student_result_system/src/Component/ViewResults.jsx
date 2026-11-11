import { useState } from "react";
import { getResultsByStudent } from "../api/api";

export default function ViewResults() {
  const [results, setResults] = useState([]);
  const [studentId, setStudentId] = useState("");

  const handleSearch = async () => {
    const res = await getResultsByStudent(studentId);
    setResults(res.data);
  };

  return (
    <div className="p-3">
      <input className="form-control mb-2" placeholder="Enter Student ID"
             onChange={(e) => setStudentId(e.target.value)} />
      <button className="btn btn-info mb-3" onClick={handleSearch}>View Results</button>
      <table className="table table-bordered">
        <thead>
          <tr><th>Subject</th><th>Marks</th></tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.id}>
              <td>{r.subject}</td><td>{r.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
