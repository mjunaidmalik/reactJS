import React, { DragEvent } from 'react';
import Card from 'react-bootstrap/Card';

interface TaskProps {
  id: string;
  title: string;
  body: string;
  onDragStart: (event: DragEvent, id: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, body, onDragStart }) => {
  return (
    <Card style={{ width: '16rem', marginBottom: '1rem' }} draggable onDragStart={(e) => onDragStart(e, id)}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {body}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Task;