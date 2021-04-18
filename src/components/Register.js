import React, { useState } from 'react';
import { registerUser } from '../api/user';
import { Alert } from '../util/talert';

export default function Register({ doLogin }) {
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createClick = (ev) => {
        ev.preventDefault();
        const isInvalid = (name == '' || email == '' || password == '');
        if (isInvalid) {
            Alert('Please fill all fields to create an account.');
            return;
        }

        registerUser({ name, email, password }).then(res => {
            if (res != '') {
                setErrorMsg(res);
                return;
            }
            doLogin();
        })
    }

    const loginClick = (ev) => {
        ev.preventDefault();
        doLogin();
    }

    const showMessage = () => {
        if (errorMsg == '') return null;
        return (
            <p className="pt-2 pb-2 w-full bg-red-100 rounded">
                <span className="block text-red-500 font-semibold text-center w-full">{errorMsg}</span>
            </p>
        )
    }

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50">
            <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="md:h-auto md:w-1/2">
                        <img aria-hidden="true" className="object-cover w-full" style={{ height: '40rem' }}
                            src="/assets/img/login-office.jpeg" alt="Office" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700">Register</h1>
                            
                            {showMessage()}

                            <label className="block text-sm">
                                <span className="text-gray-700">Name</span>
                                <input type="text" maxLength={35}
                                    value={name}
                                    onChange={(el) => setName(el.target.value)}
                                    className="block w-full mt-1 text-sm focus:border-indigo-400 focus:outline-none focus:shadow-outline-indigo form-input"
                                    placeholder="Maria Silva" />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700">Email</span>
                                <input type="text" maxLength={100}
                                    value={email}
                                    onChange={(el) => setEmail(el.target.value)}
                                    className="block w-full mt-1 text-sm focus:border-indigo-400 focus:outline-none focus:shadow-outline-indigo form-input"
                                    placeholder="maria@gmail.com" />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700">Password</span>
                                <input type="password" maxLength={20}
                                    value={password}
                                    onChange={(el) => setPassword(el.target.value)}
                                    className="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                    placeholder="************"  />
                            </label>

                            <a className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                href="#" onClick={createClick}>
                                Create account
                             </a>

                            <hr className="my-8" />

                            <p className="mt-4">
                                <a className="text-sm font-medium text-purple-600 dark:text-indigo-400 hover:underline"
                                    href="#" onClick={loginClick}>
                                    Has already an account? Login
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
