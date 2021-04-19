import React from 'react';
import { useAtom } from 'jotai';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { viewAtom } from './shared/views';

export default function App() {
    const [view] = useAtom(viewAtom);
    
    const switchView = (selectedView) => {
        switch (selectedView) {
            case 'login': {
                return (<Login />);
            }
            case 'register': {
                return (<Register doLogin={() => setView('login')} />);
            }
            default: {
                return (<Home />);
            }
        }
    }

    return (
        <div>
            {switchView(view)}
        </div>
    )
}
