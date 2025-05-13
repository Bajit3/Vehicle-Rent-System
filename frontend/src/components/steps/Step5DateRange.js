import { useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';

const Step5DateRange = () => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  return (
    <Stack spacing={2}>
      <DatePicker label="Start Date" value={startDate ? dayjs(startDate) : null} onChange={(date) => setValue('startDate', date?.toDate())} />
      <DatePicker label="End Date" value={endDate ? dayjs(endDate) : null} onChange={(date) => setValue('endDate', date?.toDate())} />
      <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
      <p className="text-red-500 text-sm">{errors.endDate?.message}</p>
    </Stack>
  );
};

export default Step5DateRange;
