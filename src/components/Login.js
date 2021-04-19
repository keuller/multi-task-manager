import React, { useState, useEffect } from 'react';
import { authenticate } from '../api/user';

export default function Login({ doRegister, doAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const logIn = async (ev) => {
        ev.preventDefault();
        const ret = await authenticate(email, password);
        if (ret == '') {
            doAuth();
        } else {
            setMessage(ret);
        }
    }

    const showMessage = () => {
        if (message == '') return null;
        return (
            <p className="pb-2 w-full">
                <span className="block text-red-500 font-semibold text-center w-full">{message}</span>
            </p>
        )
    }

    const pressEnter = (ev) => {
        if (ev.keyCode == 13) {
            logIn(ev);
        }
    }

    const registerClick = (ev) => {
        ev.preventDefault();
        doRegister();
    }

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50">
            <div className="flex-1 h-2/3 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-28 md:h-auto md:w-1/2">
                        <img aria-hidden="true" className="object-cover w-full" style={{height: '29rem'}} src="/assets/img/login-office.jpeg" alt="Office" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700">Task Manager</h1>

                            {showMessage()}

                            <label className="block text-sm">
                                <span className="text-gray-700 ">E-mail</span>
                                <input type="text" placeholder="carlos@mail.com"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    className="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                    />
                            </label>

                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700">Password</span>
                                <input value={password}
                                    onChange={(ev) => setPassword(ev.target.value)}
                                    onKeyDown={pressEnter}
                                    className="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                    placeholder="***************" type="password" />
                            </label>

                            <button type="button"
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={logIn}>Log in</button>

                            <hr className="my-8" />

                            <p className="mt-1">
                                <a className="text-sm font-medium text-purple-600 hover:underline" 
                                    href="#" onClick={registerClick}>
                                    Create an account
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
