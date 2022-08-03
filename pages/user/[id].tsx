import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Axios } from '../../services/axios'
import SubmitButton from '../../src/components/submitButton'

const EditUserPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const { isLoggedIn } = useAuth()

  const [isPending, setIsPending] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [securityCode, setSecurityCode] = useState<string>('');
  const [agency, setAgency] = useState<string>('');
  const [account, setAccount] = useState<string>('');
  const [isLogged, setIsLogged] = useState(false)

  const updateClient = (e: any) => {
    e.preventDefault();
    setIsPending(true);

    setTimeout(() => {

      Axios.put(`/clients/${id}`, {
        name,
        document,
        email,
        bank: {
          bankName,
          code: securityCode,
          agency,
          account
        }
      }).then(() => {
        setIsPending(false);
        router.push('/users')
      })
    }, 3000);


  }
  useEffect(() => {
    setIsLogged(isLoggedIn())
    if (isLoggedIn() === false) {
      Router.push('/login')
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (id) {
      Axios.get(`/clients/${id}`)
        .then(Response => {
          const { data } = Response;
          console.log(data)
          setName(data.name);
          setDocument(data.document);
          setEmail(data.email);
          setBankName(data.bank.bankName);
          setSecurityCode(data.bank.code);
          setAgency(data.bank.agency);
          setAccount(data.bank.account);
        }
        )
    }
  }, [id])
  return (
    isLogged ?
      <>
        <h1>Editar Cliente</h1>
        <div className='wrapper flex justify-center'>
          <form className="w-600 sm:w-full" onSubmit={updateClient}>
            <section className='flex justify-between items-center sm:justify-center border-b'>
              <div className='p-24 sm:hidden'>
                <p className='subtitle-text'>Dados pessoais</p>
              </div>
              <div className='w-350'>
                <p className='my-20 hidden sm:flex subtitle-text'>Dados pessoais</p>
                <div className='my-10'>
                  <label htmlFor="name">Nome</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required id="name" type="text" />
                </div>
                <div className='my-10'>
                  <label htmlFor="documento">Documento</label>
                  <input value={document} onChange={e => setDocument(e.target.value)} placeholder="Documento" required id="documento" type="text" />
                </div>
                <div className='my-10'>
                  <label htmlFor="email">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required id="email" type="email" />
                </div>
              </div>
            </section>
            <section className='flex justify-between items-center sm:justify-center'>
              <div className='p-24 sm:hidden'>
                <p className='subtitle-text'>Dados bancários</p>
              </div>
              <div className='w-350'>
              <p className='my-20 hidden sm:flex subtitle-text'>Dados Bancários</p>
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
      </>
      : <></>
  )
}

export default EditUserPage
