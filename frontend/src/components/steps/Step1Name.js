import { useFormContext } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';

const Step1Name = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Grid>
    </Grid>
  );
};

export default Step1Name;