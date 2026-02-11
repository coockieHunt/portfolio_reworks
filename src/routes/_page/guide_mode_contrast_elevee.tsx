import { createFileRoute } from '@tanstack/react-router'

import { Suspense, lazy } from 'react';

import { HighContrastContainer } from '@/containers/_page/highContrast.container';

const SettingContainer = lazy(() =>
    import('@/containers/_root/Setting/Setting.container').then(m => ({ default: m.SettingContainer }))
);

export const Route = createFileRoute('/_page/guide_mode_contrast_elevee')({
  component: RouteComponent,
})



function RouteComponent() {
    return (
        <HighContrastContainer />
    )
}
