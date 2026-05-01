import { AppShell } from './components/layout/AppShell'
import { ValidationObserver } from './components/validation/ValidationObserver'

export default function App() {
  return (
    <>
      <ValidationObserver />
      <AppShell />
    </>
  )
}
