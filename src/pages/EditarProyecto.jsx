import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import FormularioProyecto from '../components/FormularioProyecto'
import { useProyectos } from '../hooks/useProyectos'

const EditarProyecto = () => {
    const params = useParams()
    
    const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos()
    
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    const { nombre, _id } = proyecto

    
    const handleClick = () => {
        if (confirm('¿Desea eliminar este proyecto?')) {
            eliminarProyecto(_id)
        }
    }

    if (cargando) return 'cargando...'

    return (
        <>
            <button>
                <Link
                    to={`/proyectos/${_id}`}
                    className='flex mb-3 items-center gap-2 hover:text-gray-800 text-gray-600 hover:bg-gray-300 bg-gray-200 py-2 px-3 text-md shadow-lg uppercase rounded-md'
                    >
                    atras
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>

                </Link>
            </button>
            <div className='p-4 flex justify-between items-center'>
              
                <h1 className='font-bold text-4xl'>
                    {nombre}
                </h1>
                <div>
                    <button
                        type='button'
                        onClick={handleClick}
                        className='flex items-center uppercase justify-between gap-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded text-sm font-bold'
                    >
                        Eliminar
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none"
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-8 h-8"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
                            />
                        </svg>
                    </button>
                </div>
              

            </div>
            <div className='mt-10 flex justify-center'>
                <FormularioProyecto/>
            </div>
        </>
    )
}

export default EditarProyecto