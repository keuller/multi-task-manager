import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api/project';
import TopNavBar from '../lib/TopNavBar';
import ProjectCard from '../lib/ProjectCard';

function Cards({ projects, deleteProject }) {
    if (projects.length == 0) {
        return (
            <div className="w-full pt-24 text-lg text-gray-500 font-semibold text-center">
                No projects are added.
                <span className="block pt-4">Add a new project and enjoy.</span>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-3 gap-2">
            {projects.map(project => (
                <ProjectCard id={project.id} 
                    title={project.title} 
                    key={project.id} 
                    removeAction={deleteProject} />)
            )}
        </div>
    );
}

export default function Home() {
    const [projects, setProjects] = useState([]);

    useEffect(async () => {
        setProjects(await fetchProjects());
    }, []);

    const addProject = (project) => {
        setProjects([...projects, project]) 
    };

    const delProject = (id) => {
        const list = projects.filter(project => project.id != id);
        setProjects([...list]);
    }

    return (
        <div>
            <TopNavBar addProject={addProject} />

            <Cards projects={projects} deleteProject={delProject} />
        </div>
    )
}
