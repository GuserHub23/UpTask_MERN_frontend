import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuthProvider'

const PreviewProyecto = ({proyecto}) => {

    const { 
        _id, 
        nombre, 
        cliente,
        colaboradores
    } = proyecto
    
    const { auth } = useAuth()

    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div className='flex-1 flex flex-col md:flex-row gap-2 items-center'>
                <p className='text-sm'>{nombre}</p>
                <p className='text-sm text-gray-500 uppercase'>
                    {cliente}
                </p>
                <div>
                    <span className={`${colaboradores.includes(auth._id) ? 'bg-slate-600' : 'bg-indigo-600'} p-1 rounded-lg text-white text-sm uppercase font-bold`}>
                        {colaboradores.includes(auth._id) ? 'colaborador' : 'creador'}
                    </span>
                </div>
            </div>
            <Link
                to={`${_id}`}
                className='ml-2 md:ml-0 bg-emerald-500 hover:bg-emerald-700 p-3 text-white  uppercase text-xs font-bold'
            >
                Ver Proyecto
            </Link>
        </div>
    )
}

export default PreviewProyecto