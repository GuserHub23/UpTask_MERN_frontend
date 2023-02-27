import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import FormularioColaborador from '../components/FormularioColaborador'
import { useProyectos } from '../hooks/useProyectos'

const NuevoColaborador = () => {

    const { 
        obtenerProyecto, 
        proyecto, 
        cargando,
        colaborador,
        agregarColaborador,
        alerta
    } = useProyectos()

    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    if (!proyecto?._id) return <Alerta alerta={alerta}/>

    return (
        <>
            <button>
                <Link
                    to={`/proyectos/${params.id}`}
                    className='flex mb-3 items-center gap-2 hover:text-gray-800 text-gray-600 hover:bg-gray-300 bg-gray-200 py-2 px-3 text-md shadow-lg uppercase rounded-md'
                >
                    atras
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>

                </Link>
            </button>
            <h1 
                className='text-3xl text-gray-800 font-black'
            >
                Añadir Colaborador/a 
                <br/> 
                Proyecto: {proyecto.nombre}
            </h1>
            
            <div className='mt-10 flex justify-center'>
                <FormularioColaborador/>
            </div>

            {
                cargando ? 'cargando...' :
                    colaborador?._id && (
                        <div 
                            className='flex justify-center mt-10'
                        >
                            <div className='bg-white py-10 px-5 md:w-2/4 w-full rounded-lg shadow'>
                                <h2 className='text-center mb-10 text-md font-bold'>
                                    Resultado: 
                                </h2>
                                <div className='flex justify-between flex-col items-center'>
                                    <div className='text-sm'>
                                        <p className='text-lg'>
                                            Nombre: {''}
                                            <span className='font-bold'>
                                                {colaborador.nombre}
                                            </span>
                                        </p>
                                        <p className='text-lg'>
                                            Email: {''}
                                            <span className='font-bold'>
                                                {colaborador.email}
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => agregarColaborador({
                                            email: colaborador.email
                                        })}
                                        className='flex items-center gap-2 justify-center mt-5 w-4/5 px-2 py-3 bg-emerald-500 hover:bg-emerald-700 rounded-sm text-white uppercase font-bold text-sm'
                                    >
                                        Agregar al proyecto
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 24 24" 
                                            fill="currentColor" 
                                            className="w-6 h-6"
                                        >
                                            <path 
                                                d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" 
                                            />
                                        </svg>
                                    </button>
                                </div>

                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default NuevoColaborador