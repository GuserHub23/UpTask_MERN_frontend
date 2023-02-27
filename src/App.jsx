import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ProyectoProvider } from './context/ProyectoProvider'

import AuthLayout from './layouts/AuthLayout'

import Login from './pages/Login'
import Register from './pages/Register'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import NewPassword from './pages/NewPassword'
import ResetPassword from './pages/ResetPassword'

import RutaProtegida from './layouts/RutaProtegida'
import Proyectos from './pages/Proyectos'
import NuevoProyecto from './pages/NuevoProyecto'
import Proyecto from './pages/Proyecto'
import EditarProyecto from './pages/EditarProyecto'
import NuevoColaborador from './pages/NuevoColaborador'

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ProyectoProvider>
                    <Routes>
                        <Route path='/' element={<AuthLayout/>}>
                            <Route index element={<Login/>}/>
                            <Route path='registrar' element={<Register/>}/>
                            <Route path='olvide-contraseña' element={<ResetPassword/>}/>
                            <Route path='olvide-contraseña/:token' element={<NewPassword/>}/>
                            <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
                        </Route>

                        <Route path='/proyectos' element={<RutaProtegida/>}>
                            <Route index element={<Proyectos/>}/>
                            <Route path='crear-proyecto' element={<NuevoProyecto/>}/>
                            <Route path='nuevo-colaborador/:id' element={<NuevoColaborador/>}/>
                            <Route path=':id' element={<Proyecto/>}/>
                            <Route path='editar/:id' element={<EditarProyecto/>}/>
                        </Route>
                    </Routes>
                </ProyectoProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
