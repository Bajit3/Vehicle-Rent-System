import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VehicleRentalForm from './components/VehicleRentalForm';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <VehicleRentalForm />
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
