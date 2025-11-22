import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PostPage from "./PostPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostPage />
  </StrictMode>,
)
