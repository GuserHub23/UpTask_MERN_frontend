import axios from 'axios'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { clienteAxios } from '../config/clienteAxios'

const ResetPassword = () => {
    const [ email, setEmail ] = useState('')
    const [ alerta, setAlerta ] = useState({})
    const borrarValorState = () => {
        if (email !== '') setEmail('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '') {
            setAlerta({
                msg: 'Introduzca un Email válido',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post(`/usuarios/reset-password`, {
                email
            })
            console.log(data)
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    return (
        <div className='w-4/5 mx-auto'>
            <h1 className='text-sky-500 font-black text-4xl'>
                Recupera tu cuenta para no perder tus {''}
                <span className='text-stone-100'>
                    proyectos
                </span>
            </h1>
            {
                alerta.msg && <Alerta alerta={alerta}/>
            }
            <form 
                className='my-10 bg-white drop-shadow-md rounded-lg px-10 py-10'
                onSubmit={handleSubmit}
            >
                
                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-sm font-bold'
                        htmlFor='email'
                    >
                        Email
                    </label>
                    <input 
                        autoFocus
                        id='email'
                        type='email'
                        placeholder='Ingresar email'
                        className={`${email !== '' ? 'w-4/5 border-y border-l rounded-l-xl' : 'w-full border rounded-xl'} mt-3 p-3 bg-gray-50 text-sm outline-none`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {
                        email !== '' &&
                            <button 
                                onClick={borrarValorState} 
                                className='text-sm w-1/5 bg-gray-50 text-sm rounded-r-xl border-y border-r p-3 font-bold text-slate-400 hover:text-red-600'
                            >
                                X
                            </button>
                    }
                </div>

                <input 
                    type="submit" 
                    value='Enviar'
                    className='mb-5 bg-sky-500 hover:bg-sky-800 transition-colors w-full rounded-xl py-3 text-white text-sm uppercase font-bold mt-10 hover:cursor-pointer'
                />

            </form>

            <nav className='lg:flex lg:justify-between flex-wrap pb-20'>
                <Link
                    className='block text-center my-5 text-slate-100 hover:text-gray-400 text-sm'
                    to='/'
                >
                    Iniciar Sesión
                </Link>
                <Link
                    className='block text-center my-5 text-slate-100 hover:text-gray-400 text-sm'
                    to='/registrar'
                >
                    ¿No tienes una cuenta? Registrate aquí
                </Link>

            </nav>
        </div>
    )
}

export default ResetPassword