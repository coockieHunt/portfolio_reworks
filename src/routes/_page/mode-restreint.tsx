import { createFileRoute } from '@tanstack/react-router'
import { RestrictedMondeContainer } from '@/containers/_page/restrictedMode.container';

export const Route = createFileRoute('/_page/mode-restreint')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RestrictedMondeContainer />
}
