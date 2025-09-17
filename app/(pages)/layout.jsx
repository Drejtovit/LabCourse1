/* eslint-disable react-refresh/only-export-components */
import Header from "@/components/Header.jsx";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/global.css';
export default function RootLayout({ children }) {
    return (
        <>
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
                transition={Bounce}
            />
            {children}
        </>
    );
}
