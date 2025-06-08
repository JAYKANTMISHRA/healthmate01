import React, { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAtoken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', {
          email,
          password,
        })

        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAtoken(data.token)
          navigate('/admin-dashboard') // Go to admin dashboard
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', {
          email,
          password,
        })

        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          navigate('/doctor-dashboard') // Go to doctor dashboard
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-[90%] max-w-md text-zinc-600"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl">
            <i className="fa fa-user" />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-black">
            {state === 'Admin' ? 'Admin Login' : 'Doctor Login'}
          </h2>
          <p className="text-sm text-gray-500">
            Please log in to continue
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-2 rounded-md text-white font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          {state === 'Admin' ? 'Doctor Login? ' : 'Admin Login? '}
          <span
            onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
