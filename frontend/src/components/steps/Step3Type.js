import { useFormContext, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import getClient from '../../apiClient/getClient';

const Step3Type = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const wheels = useWatch({ control, name: 'wheels' });
  
  const { data, isLoading } = useQuery({
    queryKey: ['vehicle-types', wheels],
    queryFn: async () => {
      const res = await getClient.getVehicleByWheels(wheels);
      return res.data;
    },
    enabled: wheels == 2 || wheels == 4,
  });

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl error={!!errors.typeId} fullWidth>
        <FormLabel sx={{ mb: 2, fontWeight: 'bold' }}>Vehicle Type</FormLabel>
        <RadioGroup>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={24} />
            </Box>
          ) : data?.length > 0 ? (
            data.map((type) => (
              <FormControlLabel
                key={type.id}
                value={type.id}
                control={<Radio />}
                label={type.name}
                {...register('typeId', { required: 'Please select a vehicle type' })}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No vehicle types available for {wheels} wheels.
            </Typography>
          )}
        </RadioGroup>
        {errors.typeId && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errors.typeId.message}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default Step3Type;