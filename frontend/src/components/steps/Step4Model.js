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

const Step4Model = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const typeId = useWatch({ control, name: 'typeId' });

  const { data, isLoading } = useQuery({
    queryKey: ['models', typeId],
    queryFn: async () => {
      const res = await getClient.getVehicleById(typeId);
      return res.data;
    },
    enabled: !!typeId,
  });

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl error={!!errors.vehicleId} fullWidth>
        <FormLabel sx={{ mb: 2, fontWeight: 'bold' }}>Select Model</FormLabel>
        <RadioGroup>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={24} />
            </Box>
          ) : data?.length > 0 ? (
            data.map((v) => (
              <FormControlLabel
                key={v.id}
                value={v.id}
                control={<Radio />}
                label={v.name}
                {...register('vehicleId', { required: 'Please select a model' })}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No models available for this vehicle type.
            </Typography>
          )}
        </RadioGroup>
        {errors.vehicleId && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errors.vehicleId.message}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default Step4Model;