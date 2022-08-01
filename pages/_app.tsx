import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../src/components/Header'
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAuth();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isLoggedIn());
  }, [isLoggedIn])
  return (
    <>
    {
      isLogged === true ? <Header /> : null
    }
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
