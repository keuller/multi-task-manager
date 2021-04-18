import React from 'react';
import { projectAlert } from '../util/talert';
import { getUser, clearStorage } from '../util/persistence';
import { createProject } from '../api/project';

export default function TopNavBar({ addProject }) {
	const newProject = async (ev) => {
		ev.preventDefault();
		const title = await projectAlert();
		if (title != '') {
			let project = await createProject(title);
			if (project.id) {
				addProject(project);
			}
		}
	};

	const logoutClick = (ev) => {
		ev.preventDefault();
		clearStorage();
		window.location.reload();
	};

    return (
        <div className="flex-1 flex flex-col">
		<nav className="px-4 flex justify-between bg-white h-16 border-b-2">
			<ul className="flex items-center">
				<li className="h-6 w-24">
					<span className="text-indigo-600 font-semibold">TODO List</span>
				</li>
			</ul>

			<ul className="flex items-center">
				<li>
					<button type="button" onClick={newProject} 
						className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-sm text-white rounded-lg focus:outline-none">Add Project</button>
				</li>
			</ul>

			<ul className="flex items-center">
				<li className="pr-6">
					{getUser().name}
				</li>
				<li className="pr-6">
					<a href="#" onClick={logoutClick}>Logout</a>
				</li>
			</ul>

		</nav>
	</div>
    )
}
