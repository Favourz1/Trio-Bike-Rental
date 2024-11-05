import React from 'react'
import AppRoutes from 'routes/app.routes'
import './styles/global.css'
import { Toaster } from 'sonner'

const App: React.FC = () => (
    <>
        <AppRoutes />
        <Toaster position="top-center" richColors />
    </>
)

export default App
