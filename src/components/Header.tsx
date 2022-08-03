import Router from 'next/router';
import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const { username, logout } = useAuth();

    return (
        <header className='p-24 flex justify-between wrapper-header sm:p-18'>
            <div className='subtitle-text'>
                <p>Seja bem vindo <strong className='text-primary'>{username || ''}</strong></p>
            </div>
            <a onClick={logout}>Sair</a>
        </header>
    )
}

export default Header