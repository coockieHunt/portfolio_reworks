import { createFileRoute } from '@tanstack/react-router'


import { HighContrastContainer } from '@/containers/_page/highContrast.container';

export const Route = createFileRoute('/_page/guide_mode_contrast_elevee')({
  component: RouteComponent,
})



function RouteComponent() {
    return (
        <HighContrastContainer />
    )
}
