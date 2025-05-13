import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@mui/material';
import api from '../apiClient/api'
import { bookingSchema } from '../schemas/bookingSchema';
import Step1Name from './steps/Step1Name';
import Step2Wheels from './steps/Step2Wheels';
import Step3Type from './steps/Step3Type';
import Step4Model from './steps/Step4Model';
import Step5DateRange from './steps/Step5DateRange';

const steps = [Step1Name, Step2Wheels, Step3Type, Step4Model, Step5DateRange];

const VehicleRentalForm = () => {
  const [step, setStep] = useState(0);
 const methods = useForm({
  resolver: zodResolver(bookingSchema),
  defaultValues: {
    firstName: '',
    lastName: '',
    wheels: null,
    typeId: '',
    vehicleId: '',
    startDate: null,
    endDate: null,
  },
});


  const mutation = useMutation({
  mutationFn: async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      vehicleId: data.vehicleId,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    const res = await api.post('/bookings', payload);
    return res.data;
  },
  onSuccess: () => {
    alert('Booking successful!');
    methods.reset();
    setStep(0);
  },
  onError: (err) => {
    alert(err?.response?.data?.message || 'Booking failed');
  },
});


  const CurrentStep = steps[step];
  const isLast = step === steps.length - 1;

  const onNext = async () => {
  const stepFields = [
    ['firstName', 'lastName'],
    ['wheels'],
    ['typeId'],
    ['vehicleId'],
    ['startDate', 'endDate'],
  ];

  const isValid = await methods.trigger(stepFields[step]);

  if (isValid) setStep((prev) => prev + 1);
};

  const onBack = () => setStep((prev) => prev - 1);

  const onSubmit = methods.handleSubmit((data) => mutation.mutate(data));

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="max-w-xl mx-auto p-6 border rounded space-y-6">
        <CurrentStep />
        <div className="flex justify-between pt-4">
          {step > 0 && <Button onClick={onBack}>Back</Button>}
          {isLast ? (
            <Button type="submit" variant="contained">Submit</Button>
          ) : (
            <Button variant="contained" onClick={onNext}>Next</Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default VehicleRentalForm;
