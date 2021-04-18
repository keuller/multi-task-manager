import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { getUser } from './util/persistence';

const isLoggedIn = (getUser().id ? true : false);
const viewAtom = atom((isLoggedIn ? 'home' : 'login'));

export default function App() {
    const [view, setView] = useAtom(viewAtom);
    
    const switchView = (selectedView) => {
        switch (selectedView) {
            case 'login': {
                return (<Login doRegister={() => setView('register')} doAuth={() => setView('home')} />);
            }
            case 'register': {
                return (<Register doLogin={() => setView('login')} />);
            }
            default: {
                return (<Home />);
            }
        }
    }

    useEffect(() => {
        return () => {}
    }, [view])

    return (
        <div>
            {switchView(view)}
        </div>
    )
}
