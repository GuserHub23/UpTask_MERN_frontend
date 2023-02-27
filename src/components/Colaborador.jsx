import React from 'react'
import useAdmin from '../hooks/useAdmin'
import { useAuth } from '../hooks/useAuthProvider'
import { useProyectos } from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {

    const { email, nombre, _id } = colaborador

    const { handleModalEliminarColaborador } = useProyectos()

    const admin = useAdmin()

    const { auth } = useAuth()
    
    return (
        <div 
            className='border-b last:border-b-0 p-5 flex flex-col lg:flex-row justify-between items-start md:items-center'
        >
            <div>
                <p className='mb-2 text-lg font-bold uppercase'>
                    {nombre}
                    <span className='text-md capitalize'>
                        {auth._id === _id && ' (Tú)'}
                    </span>
                </p>
                <p className='mb-2 text-md text-gray-500'>
                    {email}
                </p>

            </div>
            {
                admin &&
                    <div className=''>
                        <button
                            className='mt-5 lg:my-auto items-center text-sm px-3 py-2 flex justify-between gap-2 mb-3 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-sm text-white uppercase'
                            onClick={() => handleModalEliminarColaborador(colaborador)}
                        >
                            Eliminar del proyecto
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="w-5 h-5"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" 
                                />
                            </svg>
                        </button>
                    </div>
            }
        </div>
    )
}

export default Colaborador