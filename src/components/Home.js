import React, { useEffect, Suspense } from 'react';
import { atom, useAtom } from 'jotai';
import { fetchProjects } from '../api/project';
import TopNavBar from '../lib/TopNavBar';
import ProjectCard from '../lib/ProjectCard';

const projectsAtom = atom([]);

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
    const Loading = () => (<div className="w-full pt-24 text-lg text-gray-500 font-semibold text-center"> Loading... </div>)
    const [projects, setProjects] = useAtom(projectsAtom);

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

            <Suspense fallback={<Loading />}>
                <Cards projects={projects} deleteProject={delProject} />
            </Suspense>
        </div>
    )
}
