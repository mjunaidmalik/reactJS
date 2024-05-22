import React, { DragEvent } from 'react';
import Card from 'react-bootstrap/Card';
import Task from '../Task/Task';
import { TaskType } from '../../types';

interface LaneProps {
  color: string;
  laneId: number;
  title: string;
  loading: boolean;
  error: string;
  tasks: TaskType[];
  onDragStart: (event: DragEvent, id: string) => void;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent, laneId: number) => void;
}

const Lane: React.FC<LaneProps> = ({
  color,
  laneId,
  title,
  loading,
  error,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <Card bg='light' style={{ minHeight: '50vh', marginBottom: '5%', marginRight: '1rem' }} onDragOver={onDragOver} onDrop={(e) => onDrop(e, laneId)}>
      <Card.Header className={color}>{title}</Card.Header>
      <Card.Body>
        {loading || error ? 
        (<span>{error || 'Loading...'}</span>) : (
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              body={task.body}
              onDragStart={onDragStart}
            />
          ))
        )}
      </Card.Body>
    </Card>
  );
}

export default Lane;