import React from 'react'

const users = [
  {
    name: "Sachin",
    email: "sachin@test.com",
    password: "test"
  },
  {
    name: "Rahul",
    email: "rahul@test.com",
    password: "rahul123"
  },
  {
    name: "Amit",
    email: "amit@test.com",
    password: "amit456"
  },
  {
    name: "Priya",
    email: "priya@test.com",
    password: "priya789"
  },
  {
    name: "Neha",
    email: "neha@test.com",
    password: "neha321"
  }
];






const App = () => {
  return (
    <div className='bg-emerald-900 p-5 w-screen h-screen text-white'>
      <div className='bg-linear-to-r from-black to-emerald-700 w-125 h-90 absolute top-1/2 left-1/2 -translate-1/2 rounded-xl p-4 text-center'>
      <h2 className='text-4xl font-light text-center whitespace-nowrap'>Welcome to login page</h2>
      <h4 className='mt-10 text-2xl font-mono'>Login your account</h4>
      <form className='p-2 text-center '>
        <input className='border-zinc-800 border-3 outline-none mb-4 px-2 py-1  rounded w-90 h-10' type="email" name="email" placeholder='Enter Email' required />
        <input className='border-zinc-800 border-3 outline-none mb-2 px-2 py-1 rounded w-90 h-10'  type="text" name="password" placeholder='Enter password' required/>
        <button className='bg-cyan-700 px-4 py-2 rounded w-85  active:scale-95 mt-5 '>Login account</button>
      </form>
      
      </div>
    </div>
  )
}

export default App
