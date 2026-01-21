// src/routes/blog.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';

//containers
import { FooterContainer } from '@/containers/_root/Footer/footer.container';
import { SettingContainer } from '@/containers/_root/Setting/Setting.container';
import { NavigationComponent, INavItem } from '@/containers/_root/Navigation/navigations.container';

export const Route = createFileRoute('/blog')({
    component: BlogLayout,
});

function BlogLayout() {
    return (
        <>
            <SettingContainer />

            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            <FooterContainer id="footer" />
        </>
    );
}
