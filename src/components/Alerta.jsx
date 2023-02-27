
const Alerta = ({alerta}) => {
    return (
        <>
            <div 
                className={`${alerta.error ? 'bg-red-600' : !alerta.error ? 'bg-emerald-600' : 'hidden'}  mx-auto w-full bg-gradient-to-br text-center p-3 shadow-xl uppercase text-white font-bold text-sm m-5`}
            >
                {alerta.msg}
            </div>        
        </>
    )
}

export default Alerta