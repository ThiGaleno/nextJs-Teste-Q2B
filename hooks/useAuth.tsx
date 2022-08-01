import Router from 'next/router';
import React, { useEffect, useState } from 'react'

export const useAuth = () => {
    const [username, setUsername] = useState<string>('');
    const [token, setToken] = useState<string>('');
    
    const setAuth = (username: string, token: string) => {
        localStorage.setItem('username', username)
        localStorage.setItem('token', token)
        Router.push('/users');
    }
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken('');
        setUsername('');
        Router.push('/login');
    }
    const isLoggedIn = () => {
        const isBrowser = typeof window !== 'undefined'
        if (isBrowser) {
            const token = localStorage.getItem('token') || '';
            const username = localStorage.getItem('username') || '';
            if (token.length > 2 && username.length > 2) {
                return true;
            }
            return false;
        }
        return false;
    }

    useEffect(() => {
        const isBrowser = typeof window !== 'undefined'
        if (isBrowser) {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (token && username) {
                setToken(token);
                setUsername(username);
            }
        }
    }, [])
    return { username, token, isLoggedIn, setAuth, logout }
}
