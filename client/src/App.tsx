import { AppRoutes } from "./routes/app-routes";
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <AppRoutes />
    </>
  );
}

export default App;
