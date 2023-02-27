import { useState } from 'react'

import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { clienteAxios } from '../config/clienteAxios'

const Register = () => {
    
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [ alerta, setAlerta ] = useState({})


    const [ verPassword, setVerPassword ] = useState(false)
    const [ verPasswordRepetido, setVerPasswordRepetido ] = useState(false)
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        setVerPassword(false)
        setVerPasswordRepetido(false)

        if([ nombre, email, password, repetirPassword ].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        
        if (password !== repetirPassword) {
            setAlerta({
                msg: 'La contraseña debe coincidir',
                error: true
            })
            return
        }

        if (password.length < 8) {
            setAlerta({
                msg: 'La contraseña debe contener al menos 8 caracteres',
                error: true
            })
            return
        }
        setAlerta({})
        try {
            const { data } = await clienteAxios.post(`/usuarios`, {nombre, email, password} )

            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    


    const borrarNombre = () => {
        setNombre('')
    }

    const borrarEmail = () => {
        setEmail('')
    }

    const verPasswordInput = () => {
        setVerPassword(!verPassword)
    }
    const verPasswordRepetidoInput = () => {
        setVerPasswordRepetido(!verPasswordRepetido)
    }

    return (
        <div className='w-4/5 mx-auto'>
            <h1 className='text-sky-500 font-black text-4xl'>
                Registrate para comenzar a crear {''}
                <span className='text-stone-100'>
                    proyectos
                </span>
            </h1>
            {
                alerta.msg && <Alerta alerta={alerta} />
            }
            <form 
                onSubmit={handleSubmit}
                className='my-10 bg-white drop-shadow-md rounded-lg p-10'
            >
                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-sm font-bold'
                        htmlFor='nombre'
                    >
                        Nombre
                    </label>
                    <input 
                        autoFocus
                        id='nombre'
                        type='text'
                        placeholder='Tu Nombre'
                        className={`${nombre !== '' ? 'w-4/5 border-y border-l rounded-l-xl' : 'w-full border rounded-xl'} mt-3 p-3 bg-gray-50 text-sm outline-none`}
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    {
                        nombre !== '' &&
                            <button 
                                onClick={borrarNombre} 
                                className='text-sm w-1/5 bg-gray-50 rounded-r-xl border-y border-r p-3 font-bold text-slate-400 hover:text-red-600'
                            >
                                X
                            </button>
                    }
                </div>
                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-sm font-bold'
                        htmlFor='email'
                    >
                        Email
                    </label>
                    <input 
                        id='email'
                        type='email'
                        placeholder='Email'
                        className={`${email !== '' ? 'w-4/5 border-y border-l rounded-l-xl' : 'w-full border rounded-xl'} mt-3 p-3 bg-gray-50 text-sm outline-none`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {
                        email !== '' &&
                            <button 
                                onClick={borrarEmail} 
                                className='text-sm w-1/5 bg-gray-50 rounded-r-xl border-y border-r p-3 font-bold text-slate-400 hover:text-red-600'
                            >
                                X
                            </button>
                    }
                </div>

                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-sm font-bold'
                        htmlFor='password'
                    >
                        Contraseña
                    </label>

                    <input 
                        id='password'
                        type={`${verPassword ? 'text' : 'password'}`} 
                        placeholder='Contraseña'
                        className={`${password !== '' ? 'w-9/12 border-y border-l rounded-l-xl' : 'w-full border rounded-xl'} mt-3 p-3 bg-gray-50 text-sm outline-none`}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete='on'
                    />
                    {
                        password !== '' &&
                            <button 
                                type='button'
                                onClick={verPasswordInput} 
                                className='text-sm w-3/12 border-y border-r rounded-r-xl py-3 bg-gray-50 text-slate-400 hover:text-sky-600'
                            >
                                {
                                    verPassword ? 'ocultar' : 'ver'
                                }
                            </button>
                    }
                </div>

                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-sm font-bold'
                        htmlFor='password2'
                    >
                        Repetir Contraseña
                    </label>

                    <input 
                        id='password2'
                        type={`${verPasswordRepetido === true ? 'text' : 'password'}`}  
                        placeholder='Repetir Contraseña'
                        className={`${repetirPassword !== '' ? 'w-9/12 border-y border-l rounded-l-xl' : 'w-full border rounded-xl '} mt-3 p-3 bg-gray-50 text-sm outline-none`}
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                        autoComplete='on'
                    />
                    {
                        repetirPassword !== '' &&
                            <button 
                                type='button'
                                onClick={verPasswordRepetidoInput} 
                                className='text-sm w-3/12 border-y border-r rounded-r-xl p-3 bg-gray-50 text-slate-400 hover:text-sky-600'
                            >
                                {
                                    verPasswordRepetido ? 'ocultar': 'ver'
                                }
                            </button>

                    }
                </div>
                <input 
                    type="submit" 
                    value='Registrarse'
                    className='mb-5 bg-sky-500 hover:bg-sky-800 transition-colors w-full rounded-xl py-3 text-white text-sm uppercase font-bold mt-10 hover:cursor-pointer'
                />

            </form>

            <nav className='lg:flex lg:justify-between pb-20'>
                <Link
                    className='block text-center my-5 text-slate-100 text-sm hover:text-gray-400'
                    to='/'
                >
                    Iniciar Sesión
                </Link>
                <Link
                    className='block text-center my-5 text-slate-100 text-sm hover:text-gray-400'
                    to='/olvide-contraseña'
                >
                    Olvide mi contraseña
                </Link>
            </nav>
        </div>
    )
}

export default Register