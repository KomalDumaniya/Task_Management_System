import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, handleSaveTask, newTask, setNewTask, errors, setErrors, assignees, editMode }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? 'Edit Task' : 'Add New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Task Title <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={newTask.title}
              onChange={e => {
                setNewTask({ ...newTask, title: e.target.value });
                setErrors({ ...errors, title: '' });
              }}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={newTask.description}
              onChange={e => {
                setNewTask({ ...newTask, description: e.target.value });
                setErrors({ ...errors, description: '' });
              }}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assignee <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={newTask.assignee}
              onChange={e => {
                setNewTask({ ...newTask, assignee: e.target.value });
                setErrors({ ...errors, assignee: '' });
              }}
              isInvalid={!!errors.assignee}
            >
              <option value="">Select Assignee</option>
              {assignees.map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.assignee}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSaveTask}>{editMode ? 'Save Changes' : 'Add Task'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
