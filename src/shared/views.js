import { atom } from 'jotai';
import { getUser } from '../util/persistence';

const isLoggedIn = (getUser().id ? true : false);
export const viewAtom = atom((isLoggedIn ? 'home' : 'login'));
