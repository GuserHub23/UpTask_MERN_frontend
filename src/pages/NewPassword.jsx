import { useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import Alerta from '../components/Alerta'
import { clienteAxios } from '../config/clienteAxios'

const NewPassword = () => {
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [ tokenValido, setTokenValido ] = useState(false)

    const [ alerta, setAlerta ] = useState({})

    const [ verPassword, setVerPassword ] = useState(false)
    const [ verPasswordRepetido, setVerPasswordRepetido ] = useState(false)
    
    const params = useParams()
    const navigate = useNavigate()

    const { token } = params
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/reset-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    },[])



    const verPasswordInput = () => {
        setVerPassword(!verPassword)
    }
    
    const verRepetirPasswordInput = () => {
        setVerPasswordRepetido(!verPasswordRepetido)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (password.length < 8 && repetirPassword.length < 8) {
            setAlerta({
                msg: 'La contraseña debe contener al menos 8 caracteres',
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

        try {
            const url = `/usuarios/reset-password/${token}`

             var { data } = await clienteAxios.post(url, {
                password
            })

            setAlerta({
                msg: data.msg,
                error: false
            })
            console.log(data)

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        setTimeout(() => {
            navigate('/')
        },2000)
        setPassword('')
        setRepetirPassword('')
    }

    return (
        <div className='w-4/5 mx-auto'>
            <h1 className='text-sky-500 font-black text-4xl'>
                Reestablecer tu {''}
                <span className='text-stone-100'>
                    contraseña
                </span>
            </h1>
            {
                alerta.msg && <Alerta alerta={alerta}/>
            }

            {
                tokenValido && (
                    <form 
                        className='my-10 bg-white drop-shadow-md rounded-lg px-10 py-10'
                        onSubmit={handleSubmit}
                    >

                        <div className='my-5'>
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
                                        {
                                            verPassword ? 'ocultar' : 'ver'
                                        }
                                    </button>
                            }
                        </div>

                        <div className='my-5'>
                            <label
                                className='uppercase text-gray-600 block text-sm font-bold'
                                htmlFor='new-password'
                            >
                                Repetir Contraseña
                            </label>
                            <input 
                                id='new-password'
                                autoComplete='on'
                                type={verPasswordRepetido ? 'text' : 'password'}
                                placeholder='Repetir Contraseña'
                                className={`${repetirPassword !== '' ? 'w-4/5 border-y border-l rounded-l-xl' : 'w-full border rounded-xl'} mt-3 p-3 bg-gray-50 text-sm outline-none`}
                                value={repetirPassword}
                                onChange={e => setRepetirPassword(e.target.value)}
                            />
                            {
                                repetirPassword !== '' &&
                                    <button 
                                        type='button'
                                        onClick={verRepetirPasswordInput} 
                                        className='text-sm w-1/5 border-y border-r rounded-r-xl py-3 bg-gray-50 text-slate-400 hover:text-sky-600'
                                    >
                                        {
                                            verPasswordRepetido ? 'ocultar' : 'ver'
                                        }
                                    </button>
                            }
                        </div>
                        <input 
                            type="submit" 
                            value='Reestablecer contraseña'
                            className='text-sm mb-5 bg-sky-500 hover:bg-sky-800 transition-colors w-full rounded-xl py-3 text-white uppercase font-bold mt-5 hover:cursor-pointer'
                        />

                    </form>

                )
            }

            <Link
                className='block text-center my-5 text-slate-100 hover:text-gray-400 text-sm'
                to='/'
            >
                Iniciar Sesión
            </Link>
        </div>
    )
}

export default NewPassword