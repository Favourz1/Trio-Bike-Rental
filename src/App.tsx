import React from 'react'
import AppRoutes from 'routes/app.routes'
import './styles/global.css'
import { Toaster } from 'sonner'
import 'sonner/dist/styles.css';


const App: React.FC = () => (
    <>
        <AppRoutes />
        <Toaster position="top-center" richColors closeButton />
    </>
)

export default App
