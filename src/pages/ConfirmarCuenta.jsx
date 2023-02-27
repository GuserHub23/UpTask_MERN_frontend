import { useEffect, useState } from 'react'

import { useParams, Link } from 'react-router-dom'

import axios from 'axios'

import Alerta from '../components/Alerta'
import { clienteAxios } from '../config/clienteAxios'

const ConfirmarCuenta = () => {

    const [ alerta, setAlerta ] = useState({})

    const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false)

    const params = useParams()
    
    const { id } = params

    useEffect(() => {
        const url = `/usuarios/confirmar/${id}`

        const confirmarCuenta = async () => {
            try {
                const { data } = await clienteAxios.get(url)

                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true)                
            } catch (error) {
                console.log(error)
            }
        }
        confirmarCuenta()
    },[])

        
    
    return (
        <>
            <h1 className='text-sky-500 font-black text-4xl'>
                Confirma tu cuenta y crea tus {''}
                <span className='text-stone-100'>
                    Proyectos
                </span>
            </h1>
            {
                cuentaConfirmada &&
                    <div className='mt-20 md:mt-10 shadow-lg px-10 py-5 rounded-lg bg-white'>
                        <Alerta alerta={alerta}/>
                        
                        <Link
                            className='text-sm block text-center my-5 text-white hover:text-gray-100 text-md font-bold border rounded-lg bg-sky-500 hover:bg-sky-600 w-2/3 mx-auto p-3'
                            to='/'
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
            }
        </>
    )
}

export default ConfirmarCuenta