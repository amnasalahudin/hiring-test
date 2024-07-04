import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import { Container, Spinner, Button, Toast } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Task1and3 = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activationCode, setActivationCode] = useState('');
  const [showForm, setShowForm] = useState(false);
 

  const fetchActivationCode = async () => {
    try {
      const response = await axios.post('https://api.findofficers.com/hiring_test/get_activation_code');
      setActivationCode(response.data.activationCode);
    } catch (error) {
      console.error('Error fetching activation code:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      if (activationCode) {
        const response = await axios.post('https://api.findofficers.com/hiring_test/get_all_employee', {
          activationCode
        });
        console.log('Employee Data:', response.data);
        const employeeArray = Array.isArray(response.data) ? response.data : [response.data];
        setEmployees(employeeArray); // Set the employees data
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      const existingEmployee = employees.find(emp => emp.employeeID === employeeData.employeeID);
      if (existingEmployee) {
        toast.error('Employee ID already exists. Please use a different ID.');
        return;
      }
      await axios.post('https://api.findofficers.com/hiring_test/add_employee', { ...employeeData, activationCode });
      fetchEmployees();
      toast.success('Employee added successfully!')
      setShowForm(false);
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Failed to add employee.');
    }
  };

  useEffect(() => {
    fetchActivationCode();
  }, []);

  useEffect(() => {
    if (activationCode) {
      fetchEmployees();
    }
  }, [activationCode]);

  return (
    <Container className="mt-5">
    <h2>Employee Data</h2>
    <Button variant="primary" className="my-5" onClick={() => setShowForm(true)}>Add New Employee</Button>
    {showForm && <EmployeeForm onSubmit={addEmployee} onCancel={() => setShowForm(false)} />}
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable pauseOnFocusLoss newestOnTop />
    {loading ? <Spinner animation="border" /> : <EmployeeTable data={employees} />}
  </Container>
  );
};

export default Task1and3;
