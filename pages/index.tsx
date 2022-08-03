import Router from 'next/router'
import React from 'react'
import { Loading } from '../src/components/icons'

const Home = () => {
    const [isLogged, setIsLogged] = React.useState(false)

    React.useEffect(() => {
        const header = document.querySelector('header')
        if (header) {
            header.style.display = 'none'
        }
        Router.push('/login')
    }, [])
    return (
        <>
            <div className='flex items-center justify-center' 
            style={{ height: '100vh', width: '100vw', backgroundColor: '#fd909e' }}>
                <i><Loading /></i>
                <p>Carregando...</p>
            </div>
        </>
    )
}

export default Home