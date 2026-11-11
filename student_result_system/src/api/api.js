import axios from "axios";

const API_URL = "http://localhost:8080";

// STUDENTS
export const addStudent = (student) =>
  axios.post(`${API_URL}/students`, student);

export const getStudents = () =>
  axios.get(`${API_URL}/students`);

export const getStudentById = (id) =>
  axios.get(`${API_URL}/students/${id}`);

export const updateStudent = (id, student) =>
  axios.put(`${API_URL}/students/${id}`, student);

export const deleteStudent = (id) =>
  axios.delete(`${API_URL}/students/${id}`);

// RESULTS
export const addResult = (result) =>
  axios.post(`${API_URL}/results`, result);

export const getResults = () =>
  axios.get(`${API_URL}/results`);

export const getResultsByStudent = (id) =>
  axios.get(`${API_URL}/results/student/${id}`);

export const getResultSummary = (id) =>
  axios.get(`${API_URL}/results/student/${id}/summary`);

export const deleteResult = (id) =>
  axios.delete(`${API_URL}/results/${id}`);