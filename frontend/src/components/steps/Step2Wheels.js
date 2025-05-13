import { useFormContext } from 'react-hook-form';
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const Step2Wheels = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormControl error={!!errors.wheels}>
      <FormLabel>Number of Wheels</FormLabel>
      <RadioGroup row>
        <FormControlLabel value={2} control={<Radio />} label="2" {...register('wheels')} />
        <FormControlLabel value={4} control={<Radio />} label="4" {...register('wheels')} />
      </RadioGroup>
      <p className="text-red-500 text-sm">{errors.wheels?.message}</p>
    </FormControl>
  );
};

export default Step2Wheels;
