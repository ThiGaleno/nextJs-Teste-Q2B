import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Axios } from '../services/axios'
import { chevronLeft, chevronRight } from '../src/components/icons'

type User = {
  id: number
  name: string
  document: string,
  email: string,
  bank: {
    bankName: string
    code: string
    agency: string
    account: string
  }
}
const UsersPage = () => {
  const { isLoggedIn } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [isLogged, setIsLogged] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const itensPerPage = 5
  const startItens = currentPage * itensPerPage
  const endItens = startItens + itensPerPage
  const numberOfPages = Math.ceil(users.length / itensPerPage)

  const currentItens = users.slice(startItens, endItens)

  useLayoutEffect(() => {
    setIsLogged(isLoggedIn())
    if (isLoggedIn() === false) {
      Router.push('/login')
    }
  }, [isLoggedIn])

  useEffect(() => {
    Axios.get('/clients')
      .then(Response => {
        const { data } = Response;
        setUsers(data)
      })
  }, [])
  const nextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }
  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      {isLogged &&
        <>
          <h1>Clientes</h1>
          <div className='flex items-center justify-end w-full'>
            <button title='Página anterior' disabled={currentPage === 0} className='btn-pagination' onClick={previousPage}>
              <i> {chevronLeft} </i>
            </button>
            <span style={{ margin: '0 12px', fontSize: '12px' }} className='subtitle-text'>
              {currentPage + 1} de {numberOfPages}
            </span>
            <button title='Próxima página' disabled={currentPage === numberOfPages -1} className='btn-pagination' onClick={nextPage}>
              <span>{chevronRight}</span>
            </button>
          </div>
         
          <ul className='wrapper w-600 sm:w-full'>
            {currentItens.map(user => {
              return (
                <li key={user.id}>
                  <Link href={`/user/${user.id}`} >
                    <div className='cursor-pointer flex justify-between items-center hover:bg-item'>
                      <div className='flex items-center'>
                        <div className="px-20 my-10">
                          <Image className='aimg-rounded' width={60} height={60} src="https://st.depositphotos.com/1607888/4263/v/450/depositphotos_42631253-stock-illustration-lady-geek-logo-template.jpg" alt="user profile image" />
                        </div>
                        <div >
                          <div className='subtitle-text bold'>{user.name}</div>
                          <div className='subtitle-text py-5'>{user.email}</div>
                        </div>
                      </div>
                      <div className='px-20'>
                        <div className='subtitle-text'>editar</div>
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </>
      }

    </div>
  )
}

export default UsersPage