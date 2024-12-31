import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const TaskCard = ({ task, handleEditTask, handleDeleteTask, handleStatusChange, statuses }) => {
  return (
    <Card key={task.id} className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          Title: {task.title}
          <Badge bg={task.status === 'Pending' ? 'warning' : task.status === 'In Progress' ? 'primary' : 'dark'}>
            {task.status}
          </Badge>
        </Card.Title>
        <Card.Text>Description: {task.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Assignee: {task.assignee}</Card.Subtitle>
        <div className="d-flex justify-content-between">
          {task.status !== 'Completed' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => handleStatusChange(task.id, statuses[statuses.indexOf(task.status) + 1])}
            >
              Move to {statuses[statuses.indexOf(task.status) + 1]}
            </Button>
          )}
          <Button variant="info" size="sm" onClick={() => handleEditTask(task.id)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
