import React, { useState } from 'react';
import { Trash } from './Icons';
import { Confirm, taskAlert } from '../util/talert';
import { updateTask } from '../api/task'

export default function TaskItem({ task, delAction, finishAction }) {
    const [description, setDescription] = useState(task.description);
    const isFinished = (task.finishedAt != null);

    const formatDate = (dt) => {
        const opts = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
        }
        return new Intl.DateTimeFormat('en-US', opts).format(new Date(dt));
    }

    const finishClick = (ev) => {
        finishAction(task);
    }

    const editClick = () => {
        taskAlert(description).then(res => {
            if (res != '') {
                updateTask(task.project, task.id, res).then(result => setDescription(res));
            }
        })
    }

    const delClick = (ev) => {
        ev.preventDefault();
        Confirm('Confirm remove this task ?', () => { 
            delAction(task);
        });
    }

    const clsName = (isFinished ? 'flex-grow bg-white p-2 rounded-r mt-1 border-b border-grey' : 
        'flex-grow bg-white p-2 rounded-r mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter');

    return (
        <div className="flex  flex-row">
            {isFinished ? null : (<div className="p-2 rounded-l bg-white mt-1">
                <input type="checkbox" onClick={finishClick} className="mr-3" />
            </div>)}

            <div data-id={task.id} className={clsName} onClick={editClick}>    
                {description}
                {isFinished ? (<span className="block text-xs text-gray-400">Finished at {formatDate(task.finishedAt)}</span>) : null}
            </div>
            {isFinished ? null : (<a href="#" onClick={delClick} className="px-2 mt-3"><Trash /></a>)}
        </div>
    )
}
