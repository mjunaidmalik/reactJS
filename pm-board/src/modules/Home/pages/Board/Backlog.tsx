import { TaskType } from '../../../../types';
import Task from '../../../../components/Task/Task';
import useDataFetching from '../../../../hooks/useDataFetching';
import { Card } from 'react-bootstrap';

// No-operation function
const noop = () => {};

function Backlog() {
    const [loading, error, tasks] = useDataFetching<TaskType>('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks');
    return (
        <Card bg='light' style={{ minHeight: '50vh', marginBottom: '5%', marginRight: '1rem' }}>
          <Card.Header>Backlog</Card.Header>
          <Card.Body>
            {loading || error ? 
            (<span>{error || 'Loading...'}</span>) : (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  body={task.body}
                  onDragStart={noop}
                />
              ))
            )}
          </Card.Body>
        </Card>
      );
}
export default Backlog;