// src/routes/blog.tsx
import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { FooterContainer } from '@/containers/_root/Footer/footer.container'
import { SettingContainer } from '@/containers/_root/Setting/Setting.container'

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
})

function BlogLayout() {
  return (
      <>
        <SettingContainer />
      
        <main style={{ flex: 1 }}>
          <Outlet /> 
        </main>

        <FooterContainer id='footer' />
      </>
  )
}