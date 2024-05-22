import { useState, useEffect, DragEvent } from 'react';
import Lane from '../../../../components/Lane/Lane';
import { TaskType } from '../../../../types';
import useDataFetching from '../../../../hooks/useDataFetching';

interface Lane {
    id: number;
    title: string;
    color: string;
}

function Board() {

    const [loading, error, data] = useDataFetching<TaskType>('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/tasks');

    const [tasks, setTasks] = useState<TaskType[]>([]);
    useEffect(() => {
        setTasks(data);
    }, [data]);

    // Mock data for lanes, replace it with your actual data source
    const lanes: Lane[] = [
        { id: 1, title: 'To Do', color: 'text-bg-light'},
        { id: 2, title: 'In Progress', color: 'text-bg-warning'},
        { id: 3, title: 'Review', color: 'text-bg-primary'},
        { id: 4, title: 'Done', color: 'text-bg-success'},
    ];

    return (
        <div className="row">
            {lanes.map((lane) => (
                <div key={lane.id} className="col-xl-3">
                    <Lane
                        color={lane.color}
                        title={lane.title}
                        loading={loading}
                        error={error}
                        tasks={tasks.filter((task) => task.lane === lane.id)}
                        laneId={lane.id}
                        onDragStart={function (event: DragEvent<Element>, id: string): void {
                            event.dataTransfer.setData('id', id);
                        }}
                        onDragOver={function (event: DragEvent<Element>): void {
                            event.preventDefault();
                        }}
                        onDrop={function (event: DragEvent<Element>, laneId: number): void {
                            const id = event.dataTransfer.getData('id');

                            const updatedTasks = tasks.filter((task) => {
                                if (task.id.toString() === id) {
                                    task.lane = laneId;
                                }
                                return task;
                            });

                            setTasks(updatedTasks);
                        }} />
                </div>
            ))}

        </div>
    );
}

export default Board;
