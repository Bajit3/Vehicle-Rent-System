import { useFormContext } from 'react-hook-form';
import { 
  FormControl, 
  FormLabel, 
  FormControlLabel, 
  Radio, 
  RadioGroup,
  Typography,
  Box 
} from '@mui/material';

const Step2Wheels = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl error={!!errors.wheels} fullWidth>
        <FormLabel sx={{ mb: 2, fontWeight: 'bold' }}>
          Number of Wheels
        </FormLabel>
        <RadioGroup row>
          <FormControlLabel 
            value={2} 
            control={<Radio />} 
            label="2" 
            {...register('wheels', { required: 'Please select number of wheels' })} 
          />
          <FormControlLabel 
            value={4} 
            control={<Radio />} 
            label="4" 
            {...register('wheels')} 
          />
        </RadioGroup>
        {errors.wheels && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errors.wheels.message}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default Step2Wheels;