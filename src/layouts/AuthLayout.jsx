import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    
    return (
        <>
            <main className='container mx-auto mt-0 md:mt-5 p-5 md:flex md:justify-center'>
                <div className='md:w-full lg:w-2/5'>
                    <Outlet/>
                </div>
            </main>
        </>
    )
}

export default AuthLayout
