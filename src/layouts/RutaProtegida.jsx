import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'

import {useAuth} from '../hooks/useAuthProvider'

const RutaProtegida = () => {
    const { auth, cargando } = useAuth()

    if (cargando) return 'cargando...'
    return (
        <>
            {
                auth._id ? (
                    <div className='bg-gray-100'>
                        <Header/>
                        <div className='md:flex min-h-screen'>
                            <SideBar/>
                            <main className='flex-1 p-5 md:p-10'>
                                <Outlet /> 
                            </main>
                        </div>
                    </div>
                )
                : <Navigate to='/'/>
            }
        </>
    )
}

export default RutaProtegida