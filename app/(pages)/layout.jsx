/* eslint-disable react-refresh/only-export-components */
import Header from "@/components/Header.jsx";
export default function RootLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
