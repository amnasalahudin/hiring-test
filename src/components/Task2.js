import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Container, Spinner } from 'react-bootstrap';

const Task2 = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const fetchEmployees = async () => {
    try {
      const response = await axios.post('https://api.findofficers.com/hiring_test/get_activation_code');
      const activationCode = response.data.activationCode;
      const employeeResponse = await axios.post('https://api.findofficers.com/hiring_test/get_all_employee', {
        activationCode
      });
      console.log('Employee Data:', employeeResponse.data);
      setEmployees(Array.isArray(employeeResponse.data) ? employeeResponse.data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const mapContainerStyle = {
    height: '600px',
    width: '100%'
  };

  const center = {
    lat: 54.5260,
    lng: -1.5849
  };

  return (
    <Container className="mt-5">
      <h2>Employee Locations</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={6}
            center={center}
          >
            {employees.map(employee => (
              <Marker
                key={employee.Hiring_TestID}
                position={{ lat: parseFloat(employee.latitude), lng: parseFloat(employee.longitude) }}
                title={`${employee.firstName} ${employee.lastName}`}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </Container>
  );
};

export default Task2;
