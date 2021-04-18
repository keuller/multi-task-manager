import React, { useState } from 'react';

export default function AddTask({ addAction }) {
    const [description, setDescription] = useState('');

    const addClick = (ev) => {
        ev.preventDefault();
        if (description !== '') {
            addAction(description);
            setDescription('');
        }
    };

    const pressEnter = (ev) => {
        if (ev.keyCode == 13) {
            addClick(ev);
        }
    }

    return (
        <div className="flex flex-row pb-2 border-b-2 border-gray-300">
            <input type="text" 
                placeholder="task"
                value={description}
                onChange={(el) => setDescription(el.target.value)}
                onKeyDown={pressEnter}
                className="block w-full mt-2 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input-card"
                />

                <a className="block px-5 py-2 mt-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    href="#" onClick={addClick}>Add</a>
        </div>
    )
}
