import { useFormContext, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import api from '../../apiClient/api';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
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
    <FormControl error={!!errors.vehicleId}>
      <FormLabel>Select Model</FormLabel>
      <RadioGroup>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.map((v) => (
            <FormControlLabel
              key={v.id}
              value={v.id}
              control={<Radio />}
              label={v.name}
              {...register('vehicleId')}
            />
          ))
        )}
      </RadioGroup>
      <p className="text-red-500 text-sm">{errors.vehicleId?.message}</p>
    </FormControl>
  );
};

export default Step4Model;
