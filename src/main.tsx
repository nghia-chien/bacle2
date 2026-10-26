import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/playfair-display/900.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/700-italic.css'
import '@fontsource/mrs-saint-delafield/400.css'
import '@fontsource/be-vietnam-pro/300.css'
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/500.css'
import './styles/index.css'
import App from './app/App'

const root = document.getElementById('root')
if (!root) throw new Error('Không tìm thấy #root')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
