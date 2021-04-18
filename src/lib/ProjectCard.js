import React, { useEffect, useState } from 'react';
import GroupTask from './GroupTask';
import AddTask from './AddTask';
import { Edit, Trash } from './Icons';
import { Confirm, projectAlert } from '../util/talert';
import { editProject, removeProject } from '../api/project';
import { fetchTasks, createTask, removeTask, finishTask } from '../api/task';

function CardHeader({title, edit, del}) {
    return (
        <div className="flex justify-between py-1">
            <h3 className="text-sm text-indigo-500 font-semibold">{title}</h3>
            <div className="flex flex-row">
                <a href="#" onClick={edit} className="px-2">
                    <Edit />
                </a>
                <a href="#" onClick={del} className="px-2">
                    <Trash />
                </a>
            </div>
        </div>
    )
}

export default function ProjectCard({ id, title, removeAction }) {
    const [projectTitle, setProjectTitle] = useState(title)
    const [todos, setTodos] = useState([]);
    const [dones, setDones] = useState([]);

    useEffect(() => {
        fetchTasks(id).then(res => {
            const taskList = res.tasks;
            let _todos = taskList.filter(task => task.finishedAt == null);
            let _dones = taskList.filter(task => task.finishedAt != null);
            setTodos(_todos);
            setDones(_dones);
        });
    }, []);

    const addTask = (description) => {
        createTask(id, description).then(res => {
            if (res.status != 'OK') return;
            const task = { id: res.taskId, description, finishedAt: null };
            const list = [...todos, task];
            setTodos(list);
        });
    }

    const delProjectClick = (ev) => {
        ev.preventDefault();
        Confirm('Confirm remove this project ?', async () => { 
            const res = await removeProject(id);
            if (res.status == 'OK') {
                removeAction(id); 
            }
        });
    };

    const editProjectClick = async (ev) => {
        ev.preventDefault();
        const res = await projectAlert(title);
		if (res != '') {
			let project = await editProject(id, res);
			if (project.status == 'OK') {
                setProjectTitle(res);
			}
		}
    }

    const delTaskAction = (task) => {
        removeTask(id, task.id).then(res => {
            if (res.status == 'OK') {
                const idx = todos.findIndex(item => task.id == item.id);
                if (idx == -1) return;
                todos.splice(idx, 1);
                setTodos([...todos]);
            }
        });
    }

    const finishTaskAction = (task) => {
        finishTask(id, task.id).then(res => {
            if (res.status == 'OK') {
                const idx = todos.findIndex(item => task.id == item.id);
                if (idx == -1) return;
                const [item] = todos.splice(idx, 1);
                item.finishedAt = new Date();
                setTodos([...todos]);
                setDones([...dones, item])
            }
        });
    }

    return (
        <div className="w-full p-4 flex justify-center font-sans">
            <div className="rounded bg-gray-200 w-full p-3 shadow-md">
                <CardHeader title={projectTitle} edit={editProjectClick} del={delProjectClick} />

                <div className="text-sm mt-2">
                    <AddTask addAction={addTask} />

                    <GroupTask title="To Do" 
                        project={id}
                        tasks={todos} 
                        finishTaskAction={finishTaskAction}
                        delTaskAction={delTaskAction} />

                    <GroupTask title="Completed" tasks={dones} />
                </div>
            </div>
        </div>
    )
}
