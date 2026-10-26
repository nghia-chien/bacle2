import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/300-italic.css'
import '@fontsource/great-vibes/400.css'
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
