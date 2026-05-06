import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import NotFoundPage from './pages/not-found'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
