import { useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

const Step5DateRange = () => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  console.log('endDate: ', endDate);

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
     <DatePicker
  label="Start Date"
  value={startDate ? dayjs(startDate) : null}
  onChange={(date) => setValue('startDate', date?.toDate(), { shouldValidate: false })}  // Ensure no validation on initial render
  slotProps={{
    textField: {
      variant: 'outlined',
      fullWidth: true,
    },
  }}
/>
      <DatePicker 
        label="End Date" 
        value={endDate ? dayjs(endDate) : null} 
        onChange={(date) => setValue('endDate', date?.toDate())}
        slotProps={{
          textField: {
            variant: 'outlined',
            fullWidth: true,
          },
        }}
      />
    </Stack>
  );
};

export default Step5DateRange;