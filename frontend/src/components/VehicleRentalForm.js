import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { bookingSchema } from "../schemas/bookingSchema";
import Step1Name from "./steps/Step1Name";
import Step2Wheels from "./steps/Step2Wheels";
import Step3Type from "./steps/Step3Type";
import Step4Model from "./steps/Step4Model";
import Step5DateRange from "./steps/Step5DateRange";
import bookingClient from "../apiClient/bookingClient";
import toast from "react-hot-toast";

const steps = [
  { label: "Personal Info", component: Step1Name },
  { label: "Wheels", component: Step2Wheels },
  { label: "Vehicle Type", component: Step3Type },
  { label: "Model", component: Step4Model },
  { label: "Date Range", component: Step5DateRange },
];

const VehicleRentalForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      wheels: null,
      typeId: "",
      vehicleId: "",
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
      const res = await bookingClient.bookVehicle(payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Booking successful!");
      methods.reset();
      setActiveStep(0);
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  const CurrentStep = steps[activeStep].component;
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = async () => {
    const stepFields = [
      ["firstName", "lastName"],
      ["wheels"],
      ["typeId"],
      ["vehicleId"],
      ["startDate", "endDate"],
    ];

    const isValid = await methods.trigger(stepFields[activeStep]);
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const onSubmit = methods.handleSubmit((data) => mutation.mutate(data));

  return (
    <FormProvider {...methods}>
      <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Vehicle Rental
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box component="form" onSubmit={onSubmit}>
            <CurrentStep />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", pt: 4 }}
            >
              {isLastStep ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Submit Booking"
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  color="primary"
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
};

export default VehicleRentalForm;
