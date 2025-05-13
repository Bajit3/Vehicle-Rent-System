import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

const Step1Name = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <TextField
        fullWidth
        label="First Name"
        {...register('firstName', { required: true })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        fullWidth
        label="Last Name"
        {...register('lastName', { required: true })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
    </div>
  );
};

export default Step1Name;
