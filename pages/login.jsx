import React, { useEffect, useState } from "react";
import SubmitButton from '../src/components/submitButton'

const Login = () => {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleLogin = (e) => {
    e.preventDefault();
    setIsPending(true);
  }

  return (
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
          <div className="flex w-full justify-right">
            <SubmitButton
              isPending={isPending}
              text="Entrar"
              pendingText="Carregando..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login