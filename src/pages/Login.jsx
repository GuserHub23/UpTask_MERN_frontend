import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import Alerta from '../components/Alerta'
import { clienteAxios } from '../config/clienteAxios'
import { useAuth } from '../hooks/useAuthProvider'

const Login = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ alerta, setAlerta ] = useState(false)

    const [ verPassword, setVerPassword ] = useState(false)


    const { auth, setAuth } = useAuth()

    const navigate = useNavigate()



    const borrarEmail = () => {
        if (email !== '') setEmail('')
    }

    const verPasswordInput = () => {
        setVerPassword(!verPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', {
                email,
                password
            })

            localStorage.setItem('token', data.token)
            
            setAuth(data) 
            setAlerta({})
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    return (
        !auth._id ? (
            <div className='md:w-4/5 mx-auto'>
                <h1 className='text-sky-500 font-black text-4xl'>
                    Inicia sesión y administra tus {''}
                    <span className='text-stone-100'>
                        proyectos
                    </span>
                </h1>
                {
                    alerta.msg && <Alerta alerta={alerta}/>
                }
                <form 
                    className='my-5 mx-auto bg-white drop-shadow-md rounded-lg px-10 py-10'
                    onSubmit={handleSubmit}    
                >
                    <div className='my-5'>
                        <label
                            className='uppercase ttex-gray-600 block text-sm font-bold'
                            htmlFor='email'
                        >
                            Email
                        </label>
                        <input 
                            autoFocus
                            id='email'
                            type='email'
                            placeholder='Email'
                            className={`${email !== '' ? 'w-4/5 border-y border-l rounded-l-xl' : 'w-full border rounded-xl'} mt-3 p-3 bg-gray-50 text-sm outline-none`}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {
                            email !== '' &&
                                <button onClick={borrarEmail} className='text-sm w-1/5 rounded-r-xl border-y border-r p-3 bg-gray-50 font-bold text-slate-400 hover:text-red-600'>X</button>
                        }
                    </div>
                    <div className=''>
                        <label
                            className='uppercase text-gray-600 block text-sm font-bold'
                            htmlFor='password'
                        >
                            Contraseña
                        </label>
                        <input 
                            id='password'
                            type={verPassword ? 'text' : 'password'} 
                            placeholder='Contraseña'
                            className={`${password !== '' ? 'w-4/5 border-y border-l rounded-l-xl' : 'w-full border rounded-xl'} mt-3 p-3 bg-gray-50 text-sm outline-none`}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete='on'
                        />
                        {
                            password !== '' &&
                            <button 
                                type='button'
                                onClick={verPasswordInput} 
                                className='text-sm w-1/5 border-y border-r rounded-r-xl py-3 bg-gray-50 text-slate-400 hover:text-sky-600'
                            >
                                {verPassword ? 'ocultar' : 'ver'}
                            </button>
                        }
                    </div>

                    <input 
                        type="submit" 
                        value='Iniciar sesión'
                        className='mb-5 bg-sky-500 hover:bg-sky-800 transition-colors w-full rounded-xl py-3 text-white text-sm uppercase font-bold mt-10 hover:cursor-pointer'
                    />

                </form>
                
                <nav className='lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-slate-100 hover:text-gray-400 text-sm'
                        to='registrar'
                    >
                        ¿No tienes una cuenta? Registrate aquí
                    </Link>
                    <Link
                        className='block text-center my-5 text-slate-100 hover:text-gray-400 text-sm'
                        to='olvide-contraseña'
                    >
                        Olvide mi contraseña
                    </Link>
                </nav>
            </div>
        ) : <Navigate to='/proyectos'/>
    )
}

export default Login