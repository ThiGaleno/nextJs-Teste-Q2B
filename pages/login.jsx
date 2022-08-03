import React, { useEffect, useLayoutEffect, useState } from "react";
import SubmitButton from '../src/components/submitButton'
import { Axios } from '../services/axios';
import Router, { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { setAuth, isLoggedIn } = useAuth();

  const [isLogged, setIsLogged] = useState(undefined);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const verifyLogin = () => {
    const email = process.env.NEXT_PUBLIC_EMAIL;
    const password = process.env.NEXT_PUBLIC_PASSWORD;
    if (formData.email === email && formData.password === password) {
      return true
    }
    return false
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      Axios.get('/users')
        .then(response => {
          const user = response.data.find(user => verifyLogin())
          if (verifyLogin(user)) {
            if (response.status === 200) {
              setAuth(user.username, user.token);
            }
          } else {
            alert("Login ou senha nao encontrados");
            setIsPending(false);
          }
        })
    } , 3000);
  }
  useLayoutEffect(() => {
    if (isLoggedIn()) {
      Router.push("/users");
    } else {
      setIsLogged(false)
    }
  }, [isLoggedIn, setIsLogged]);
  return (
    <>
      {isLogged === false &&
        <div className="flex h-screen justify-center items-center">
          <div className="md:hidden h-screen w-full bg-red">
            <h1>Login</h1>
          </div>
          <div className="wrapper ">
            <form className="w-350" onSubmit={handleLogin}>
              <div className="my-10">
                <label htmlFor="email">E-mail</label>
                <input onChange={e => setFormData({ ...formData, email: e.target.value })} required placeholder="E-mail" type="email" id="email" />
              </div>
              <div className="my-10">
                <label htmlFor="password">Senha</label>
                <input onChange={e => setFormData({ ...formData, password: e.target.value })} required placeholder="Senha" type="password" id="password" />
              </div>
              <div className="flex w-full justify-end flex-col">
                <SubmitButton
                  isPending={isPending}
                  text="Entrar"
                  pendingText="Carregando..."
                />
                <div className="flex justify-center">
                  <a href="#" className=" btn-ghost">
                    Não possuo uma conta
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
}
export default LoginPage