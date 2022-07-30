import type { NextPage } from 'next'
import { useState } from 'react'
import SubmitButton from '../../src/components/submitButton'

const EditUserPage: NextPage = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [securityCode, setSecurityCode] = useState<string>('');
  const [agency, setAgency] = useState<string>('');
  const [account, setAccount] = useState<string>('');

  const submitTeste = (e: any) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      alert('Enviado com sucesso!');
    }, 2000);
  }
  return (
    <div className='wrapper flex justify-center'>
      <form className="w-600 sm:w-full" onSubmit={submitTeste}>
        <section className='flex justify-between items-center sm:justify-center border-b'>
          <div className='p-24 sm:hidden'>
            <p>Dados pessoais</p>
          </div>
          <div className='w-350'>
            <div className='my-10'>
              <label htmlFor="name">Nome</label>
              <input value={name} onChange={e => setName(e.target.value) } placeholder="Nome" required id="name" type="text" />
            </div>
            <div className='my-10'>
              <label htmlFor="documento">Documento</label>
              <input value={document} onChange={e => setDocument(e.target.value)} placeholder="Documento" required id="documento" type="text" />
            </div>
          </div>
        </section>
        <section className='flex justify-between items-center sm:justify-center'>
          <div className='p-24 sm:hidden'>
            <p>Dados bancários</p>
          </div>
          <div className='w-350'>
            <div className='my-10'>
              <label htmlFor="bankName">Banco</label>
              <input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="Banco" required id="bankName" type="text" />
            </div>
            <div className='my-10'>
              <label htmlFor="agency">Agência</label>
              <input value={agency} onChange={e => setAgency(e.target.value)} placeholder="Agência" required id="agency" type="text" />
            </div>
            <div className='my-10'>
              <label htmlFor="bankAccount">Conta</label>
              <input value={account} onChange={e => setAccount(e.target.value)} placeholder="Conta bancária" required id="bankAccount" type="text" />
            </div>
            <div className='my-10'>
              <label htmlFor="security-code">Código de segurança</label>
              <input value={securityCode} onChange={e => setSecurityCode(e.target.value)} placeholder="Código de segurança" required id="security-code" type="text" />
            </div>
          </div>
        </section>
        <div className='flex justify-end sm:justify-center'>
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </div>
  )
}

export default EditUserPage
