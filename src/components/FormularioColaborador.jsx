import { useState } from "react"
import { useProyectos } from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioColaborador = () => {

    const [ email, setEmail ] = useState('')
    
    const { 
        mostrarAlerta, 
        alerta, 
        submitColaborador 
    } = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if (!email) {
            mostrarAlerta({
                msg: 'El Email es obligatorio',
                error: true
            })
            return
        }

        submitColaborador(email)
    }
    return (
        <form 
            className='bg-white py-10 px-5 md:w-2/3 w-full rounded-lg shadow'
            onSubmit={handleSubmit}
        >
            {
                alerta.msg ? <Alerta alerta={alerta}/> :
                <>
                    <div className='mb-10'>
                        <label
                            className='text-gray-700 uppercase text-sm font-bold'
                            htmlFor='email'
                            >
                                Email del colaborador/a
                        </label>
                        <input 
                            id='email'
                            type='email'
                            placeholder='Ingrese aquí el email del usuario'
                            className={`${email ? 'border-y border-l rounded-l-md w-10/12' : 'rounded-md border w-full' }  p-2 mt-2 placeholder-gray-400 bg-gray-100 outline-none`}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {
                            email && 
                                <button
                                    type='button'
                                    onClick={() => setEmail('')}
                                    className='p-2 w-2/12 uppercase font-bold text-slate-400 hover:text-red-600 border-y border-r bg-gray-100 rounded-r-md'
                                >
                                    x
                                </button>
                        }
                    </div>
                    <input 
                        type='submit' 
                        className='bg-sky-400 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md text-sm'
                        value='Buscar Usuario'
                    />
                </>
            }
        </form>
    )
}

export default FormularioColaborador
