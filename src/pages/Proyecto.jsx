import { useEffect } from 'react'

import Colaborador from '../components/Colaborador'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import Tarea from '../components/Tarea'

import useAdmin from '../hooks/useAdmin'
import { useProyectos } from '../hooks/useProyectos'

import { Link, useParams } from 'react-router-dom'

import io from 'socket.io-client'

let socket;


const Proyecto = () => {
    
    const params = useParams()
    const { 
        obtenerProyecto, 
        proyecto, 
        cargando, 
        handleModalTarea,
        submitTareasProyecto,
        eliminarTareaProyecto,
        editarTareaProyecto,
        completarTareaProyecto
    } = useProyectos()

    const admin = useAdmin()
    
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL,{
            reconnectionDelay: 1000,
            reconnection: true,
            reconnectionAttemps: 10,
            transports: ['websocket'],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false
        })

        socket.emit('abrir proyecto', params.id)
    }, [])
    
    useEffect(() => {
        socket.on('tarea agregada', tareaNueva => {
            if(tareaNueva.proyecto === proyecto._id) {
                submitTareasProyecto(tareaNueva)
            }
        })

        socket.on('tarea eliminada', tareaEliminada => {
            if(tareaEliminada.proyecto === proyecto._id) {
                eliminarTareaProyecto(tareaEliminada)
            }
        })

        socket.on('tarea editada', tareaEditada => {
            if(tareaEditada.proyecto._id === proyecto._id) {
                editarTareaProyecto(tareaEditada)
            }
        })

        socket.on('nuevo estado', tareaCompletada => {
            if(tareaCompletada.proyecto._id === proyecto._id) {
                completarTareaProyecto(tareaCompletada)
            }
        })
    })

    const { nombre, tareas, colaboradores } = proyecto
    
    console.log(proyecto)
    if( cargando ) return 'cargando...'

    return (
        <>
            <button>
                <Link
                    to='/proyectos'
                    className='flex mb-3 items-center gap-2 hover:text-gray-800 text-gray-600 hover:bg-gray-300 bg-gray-200 py-2 px-3 text-md shadow-lg uppercase rounded-md'
                >
                    atras
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>

                </Link>
            </button>
            <div className='bg-white p-4 rounded-lg shadow-lg flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>
                    {nombre}
                </h1>
                {
                    admin && 
                        <div>
                            <Link
                                to={`/proyectos/editar/${params.id}`}
                                className='flex items-center uppercase justify-between gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2 px-3 rounded'
                            >
                                Editar
                                <svg 
                                    className="w-5 h-5" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                                    />
                                </svg>
                            </Link>
                        </div>
                }
            </div>

            {
                admin &&
                    <button
                        type='button'
                        onClick={handleModalTarea}
                        className='flex justify-between items-center gap-2 mt-5 text-sm px-5 py-3 w-full md:w-auto rounded-sm uppercase font-bold bg-sky-400 hover:bg-sky-700 text-white text-center'
                    >
                        Nueva Tarea
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
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>

                    </button>
            }
            <p className='font-bold text-xl mt-10'>
                {
                    tareas && tareas.length ? 'Tareas del proyecto' : 'Aún no hay tareas para este proyecto'
                }
            </p>
            {
                tareas && tareas.length > 0 &&
                (
                    <div className='bg-white p-4 shadow mt-10 rounded-md'>
                        {
                            tareas.map(tarea => (
                                <Tarea
                                    key={tarea._id}
                                    tarea={tarea}
                                />
                            ))
                        }
                    </div>
                ) 
            }
            <ModalFormularioTarea  />
            <ModalEliminarTarea />
            <ModalEliminarColaborador/>

            <div className='flex items-center justify-between mt-10'>
                <p className='font-bold text-xl'>Colaboradores</p>
                {
                    admin &&
                        <Link
                            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                            className='flex items-center gap-2 text-gray-100 uppercase font-bold bg-neutral-500 hover:bg-neutral-700 px-3 py-2 rounded-sm'
                        >
                            Añadir
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
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>
                        </Link>
                }
            </div>
            {
                colaboradores && colaboradores.length > 0 ?
                    (
                        <div className='bg-white p-4 shadow mt-10 rounded-md'>
                            {
                                colaboradores?.map(colaborador => (
                                    <Colaborador 
                                        key={colaborador._id}
                                        colaborador={colaborador}
                                    />
                                ))
                            }
                        </div>
                    ) : 
                    <p className='text-center my-5 p-10 text-lg'>
                        No hay colaboradores para este proyecto
                    </p>
            }
        </>


    )
}

export default Proyecto

