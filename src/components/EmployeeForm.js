import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmployeeForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    latitude: '',
    longitude: '',
    employeeID: '',
    city: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Employee</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Latitude</Form.Label>
            <Form.Control type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Longitude</Form.Label>
            <Form.Control type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Employee ID</Form.Label>
            <Form.Control type="text" name="employeeID" value={formData.employeeID} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" type="submit">Add Employee</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
