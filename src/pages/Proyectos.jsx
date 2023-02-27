import Alerta from "../components/Alerta"
import PreviewProyecto from "../components/PreviewProyecto"
import { useProyectos } from "../hooks/useProyectos"

const Proyectos = () => {

    const { proyectos, alerta } = useProyectos()
    
    return (
        <>
            <h1 className='text-3xl text-gray-800 font-black'>
                Proyectos
            </h1>

            {
                alerta.msg && <Alerta alerta={alerta}/>
            }
            <div className='bg-white shadow mt-6 rounded-lg'>
                {
                    proyectos.length ? 
                        proyectos.map(proyecto => (
                            <PreviewProyecto
                                key={proyecto._id}
                                proyecto={proyecto}
                            />
                        ))
                        : <p className='text-center text-gray-600 uppercase p-4'>No hay Proyectos aún</p>
                }
            </div>
        </>
    )
}

export default Proyectos
