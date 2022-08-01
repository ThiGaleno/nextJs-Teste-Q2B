import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Axios } from '../services/axios'

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

  useLayoutEffect(() => {
    setIsLogged(isLoggedIn())
    if(isLoggedIn() === false) {
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
  return (
    <div className='flex flex-col items-center'>
      {isLogged &&
        <>
          <h1>Clientes</h1>
          <ul className='wrapper w-600 sm:w-full'>
            {users.map(user => {
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