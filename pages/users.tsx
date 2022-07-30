import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UsersPage = () => {
  return (
    <div>
      <Link href={`/user/${'1'}`} >
        <div className='cursor-pointer flex justify-between items-center hover:bg-item'>
          <div className='flex items-center'>
            <div className="px-20 my-10">
              <Image className='img-rounded' width={60} height={60} src="https://st.depositphotos.com/1607888/4263/v/450/depositphotos_42631253-stock-illustration-lady-geek-logo-template.jpg" alt="user profile image" />
            </div>
            <div >
              <div className='subtitle-text bold'>Lady Geek</div>
              <div className='subtitle-text py-5'>ladygeek@gmail.com</div>
            </div>
          </div>
          <div className='px-20'>
            <div className='subtitle-text'>editar</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default UsersPage