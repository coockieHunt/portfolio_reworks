// src/routes/blog.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

//containers
const FooterContainer = lazy(() =>
    import('@/containers/_root/Footer/footer.container').then((module) => ({
        default: module.FooterContainer,
    })),
);

const SettingContainer = lazy(() =>
    import('@/containers/_root/Setting/Setting.container').then((module) => ({
        default: module.SettingContainer,
    })),
);

export const Route = createFileRoute('/blog')({
    component: BlogLayout,
});

function BlogLayout() {
    return (
        <>
            <Suspense fallback={null}>
                <SettingContainer />
            </Suspense>

            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            <Suspense fallback={<div style={{ height: 100 }} />}>
                <FooterContainer id="footer" />
            </Suspense>
        </>
    );
}
