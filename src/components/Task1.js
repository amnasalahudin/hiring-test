import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeTable from './EmployeeTable';
import { Container, Spinner } from 'react-bootstrap';

const Task1 = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activationCode, setActivationCode] = useState('');

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
      {loading ? <Spinner animation="border" /> : <EmployeeTable data={employees} />}
    </Container>
  );
};

export default Task1;
