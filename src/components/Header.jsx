import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuthProvider"
import { useProyectos } from "../hooks/useProyectos"
import Busqueda from "./Busqueda"

const Header = () => {
    const navigate = useNavigate()

    const { handleBuscador, cerrarSesionProyectos } = useProyectos()
    
    const { cerrarSesionAuth } = useAuth()
    
    const handleCerrarSesion = () => {
        cerrarSesionProyectos()
        cerrarSesionAuth()
        localStorage.removeItem('token')
        setTimeout(() => {
            navigate(0)
        }, 1000);
    }
    
    return (
        <header 
            className='px-4 py-3 bg-white border-b'
        >   
            <div className='md:flex md:justify-between'>

                <Link
                    to='/'
                >
                    <h2 className='text-3xl mb-5 md:mb-0 text-sky-600 font-black text-center'>
                        UpTask
                    </h2>
                </Link>
                    

                <div className='flex flex-col md:flex-row items-center gap-5 md:gap-10 justify-center md:mt-0 mt-5'>
                    
                    <button
                        type='button'
                        className='font-bold uppercase rounded-lg bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm shadow drop-shadow'
                        onClick={handleBuscador}
                    >
                        Buscar proyecto
                    </button>

                    <div className='flex gap-10'>
                        <Link 
                            to='/proyectos'
                            className='font-bold uppercase hover:text-gray-800 hover:bg-gray-200 bg-gray-100 p-2 rounded-md shadow drop-shadow text-sm'
                        >
                            Proyectos
                        </Link>
                        <button
                            type='button'
                            className='p-2 bg-red-500 hover:bg-red-700 rounded-md text-white text-sm font-bold shadow-red-800 shadow'
                            onClick={handleCerrarSesion}
                        >
                            Cerrar Sesión
                        </button>
                        <Busqueda/> 
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
