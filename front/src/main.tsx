import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrawlerProvider } from './context/BrawlerContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrawlerProvider>
      <App />
    </BrawlerProvider>
  </StrictMode>,
)
