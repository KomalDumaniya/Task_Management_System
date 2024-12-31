import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TaskColumn from './components/TaskColumn';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee: '', status: 'Pending' });
  const [errors, setErrors] = useState({});

  const assignees = ['ABC', 'XYZ', 'ABCD '];
  const statuses = ['Pending', 'In Progress', 'Completed'];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setNewTask({ title: '', description: '', assignee: '', status: 'Pending' });
    setErrors({});
    setEditMode(false);
    setCurrentTaskId(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!newTask.title) newErrors.title = 'Task title is required';
    if (!newTask.description) newErrors.description = 'Description is required';
    if (!newTask.assignee) newErrors.assignee = 'Assignee is required';
    return newErrors;
  };

  const handleSaveTask = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      if (editMode) {
        setTasks(tasks.map(task => (task.id === currentTaskId ? { ...newTask, id: currentTaskId } : task)));
      } else {
        setTasks([...tasks, { ...newTask, id: Date.now() }]);
      }
      handleClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setNewTask(taskToEdit);
    setEditMode(true);
    setCurrentTaskId(id);
    handleShow();
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="text-center text-dark">Task Management System</h1>
          <p className="text-center text-secondary">Manage and track your team's tasks</p>
          <Button variant="primary" onClick={handleShow} className="my-3">+ Add New Task</Button>
        </Col>
      </Row>

      <Row>
        {statuses.map(status => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleStatusChange={handleStatusChange}
            statuses={statuses}
          />
        ))}
      </Row>

      <TaskForm
        show={show}
        handleClose={handleClose}
        handleSaveTask={handleSaveTask}
        newTask={newTask}
        setNewTask={setNewTask}
        errors={errors}
        setErrors={setErrors} 
        assignees={assignees}
        editMode={editMode}
      />
    </Container>
  );
};

export default App;
