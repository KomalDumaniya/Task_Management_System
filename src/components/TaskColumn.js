import React from 'react';
import { Col } from 'react-bootstrap';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, handleEditTask, handleDeleteTask, handleStatusChange, statuses }) => {
  return (
    <Col md={4}>
      <h4 className="text-center text-secondary">{status}</h4>
      <div className="status-column">
        {tasks.filter(task => task.status === status).map(task => (
          <TaskCard
            key={task.id}
            task={task}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            handleStatusChange={handleStatusChange}
            statuses={statuses}
          />
        ))}
      </div>
    </Col>
  );
};

export default TaskColumn;
