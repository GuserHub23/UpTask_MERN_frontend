import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import { useProyectos } from '../hooks/useProyectos'

const FormularioProyecto = () => {

    const [ id, setId] = useState(null)
    const [ nombre, setNombre] = useState('')
    const [ descripcion, setDescripcion] = useState('')
    const [ cliente, setCliente] = useState('')
    const [ fechaEntrega, setFechaEntrega] = useState('')


    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    const params = useParams()
    useEffect(() => {
        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setCliente(proyecto.cliente)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0].split('T'))
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault()

        if([nombre, descripcion, cliente, fechaEntrega].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            await submitProyecto({
                id,
                nombre, 
                descripcion, 
                cliente, 
                fechaEntrega
            })
        } catch (error) {
            console.log(error)
        } finally {
            setId(null)
            setNombre('')
            setDescripcion('')
            setCliente('')
            setFechaEntrega('')
        }
    }

    return (
        <>

            <form
                onSubmit={handleSubmit}
                className='bg-white py-10 px-5 lg:w-3/5 md:w-3/4 rounded-lg shadow-lg'
            >
                {
                    alerta.msg ? <Alerta alerta={alerta}/> :
                    <>
                    
                        <div className='mb-5'>
                            <label
                                htmlFor='nombre'
                                className='text-gray-700 uppercase font-bold text-sm'
                            >
                                Nombre Proyecto
                            </label>
                            <div className='flex'>
                                <input 
                                    id='nombre'
                                    type='text'
                                    className={`${nombre !== '' ? 'w-10/12 border-y border-l rounded-l-md' : 'border rounded-md'} bg-gray-100 p-2 border-gray-300 w-full mt-2 outline-none`}
                                    placeholder='Nombre'
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                                {
                                    nombre !== '' && (
                                        <button
                                            type='button'
                                            onClick={() => setNombre('')}
                                            className='mt-2 w-2/12 uppercase font-bold text-slate-400 hover:text-red-600 border-y border-r border-gray-300 bg-gray-100 rounded-r-md'
                                        >
                                            x
                                        </button>
                                    )
                                }
                            </div>
                        </div>
        
                        <div className='mb-5'>
                            <label
                                htmlFor='descripcion'
                                className='text-gray-700 uppercase font-bold text-sm'
                            >
                                Descripción
                            </label>
                            <textarea 
                                id='descripcion'
                                type='text'
                                rows={3}
                                className='resize bg-gray-100 p-2 rounded-md border border-gray-300 w-full mt-2 outline-none'
                                placeholder='Descripción'
                                value={descripcion}
                                onChange={e => setDescripcion(e.target.value)}
                            />
                        </div>
                        
                        <div className='mb-5'>
                            <label
                                htmlFor='cliente'
                                className='text-gray-700 uppercase font-bold text-sm'
                            >
                                Cliente
                            </label>
                            <div className='flex'>
                                <input 
                                    id='cliente'
                                    type='text'
                                    className={`${cliente !== '' ? 'w-10/12 border-y border-l rounded-l-md' : 'border rounded-md'} bg-gray-100 p-2 border-gray-300 w-full mt-2 outline-none`}
                                    placeholder='Cliente'
                                    value={cliente}
                                    onChange={e => setCliente(e.target.value)}
                                />
                                {
                                    cliente !== '' && (
                                        <button
                                            type='button'
                                            onClick={() => setCliente('')}
                                            className='mt-2 w-2/12 uppercase font-bold text-slate-400 hover:text-red-600 border-y border-r border-gray-300 bg-gray-100 rounded-r-md'
                                        >
                                            x
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        <div className='mb-5'>
                            <label
                                htmlFor='fecha-entrega'
                                className='text-gray-700 uppercase font-bold text-sm'
                            >
                                Fecha de entrega
                            </label>
                            <input 
                                id='fecha-entrega'
                                type='date'
                                className='bg-gray-100 p-2 rounded-md border border-gray-300 w-full mt-2 outline-none'
                                value={fechaEntrega}
                                onChange={e => setFechaEntrega(e.target.value)}
                            />
                        </div>
                        
                        <input 
                            type='submit' 
                            value={params.id ? 'Editar Proyecto' : 'Crear Proyeto'}
                            className='bg-sky-600 hover:bg-sky-700 transition-colors w-full p-3 rounded-lg cursor-pointer uppercase font-bold text-sm text-white'
                        />
                    </>
                }
            </form>
        </>
    )
}

export default FormularioProyecto
