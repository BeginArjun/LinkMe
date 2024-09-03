'use client'
import Navbar from '../components/DashNavbar';
import { Providers } from '../provider';
import UserProvider from '../context/User';
import PreviewLink from '../components/Dashboard/PreviewLink';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';


export default function Hierarchy({children}: {children: React.ReactNode}) {
    return (
        <Providers>
            <Provider store={store}>
                <UserProvider>
                    <div className="flex">
                        <Navbar />
                        <main className="flex-1 bg-white lg:w-1/2 md:w-2/3 w-full md:ml-64 lg:mr-[280px] xl:mr-[380px] 2xl:mr-[480px] transition-all duration-300 ease-in-out">
                            {children}
                        </main>
                        <PreviewLink />
                    </div>
                </UserProvider>
            </Provider>
        </Providers>
    )
}