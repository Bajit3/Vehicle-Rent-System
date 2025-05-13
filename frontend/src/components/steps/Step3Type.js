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

const Step3Type = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const wheels = useWatch({ control, name: 'wheels' });
  
  const { data, isLoading } = useQuery({
    queryKey: ['vehicle-types', wheels],
    queryFn: async () => {
      const res = await api.get(`/vehicles/types?wheels=${wheels}`);
      return res.data;
    },
    enabled: wheels == 2 || wheels == 4,
  });
  console.log("data",data)

  return (
    <FormControl error={!!errors.typeId}>
      <FormLabel>Vehicle Type</FormLabel>
      <RadioGroup>
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.length > 0 ? (
          data.map((type) => (
            <FormControlLabel
              key={type.id}
              value={type.id}
              control={<Radio />}
              label={type.name}
              {...register('typeId')}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No vehicle types found.</p>
        )}
      </RadioGroup>
      <p className="text-red-500 text-sm">{errors.typeId?.message}</p>
    </FormControl>
  );
};

export default Step3Type;
