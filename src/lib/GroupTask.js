import React from 'react';
import TaskItem from './TaskItem';

export default function GroupTask({ project, title, tasks, finishTaskAction, delTaskAction }) {
    return (
        <div>
            <div className="font-semibold mt-4">{title}</div>

            {tasks.map(task => {
                task['project'] = project;
                return (<TaskItem task={task} 
                    key={task.id} 
                    finishAction={finishTaskAction} 
                    delAction={delTaskAction} />)
            })}
        </div>
    )
}
