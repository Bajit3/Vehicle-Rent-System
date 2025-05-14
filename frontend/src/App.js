import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VehicleRentalForm from './components/VehicleRentalForm';
import { Toaster } from 'react-hot-toast';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <VehicleRentalForm />
        <Toaster position="top-right" reverseOrder={false} />
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
