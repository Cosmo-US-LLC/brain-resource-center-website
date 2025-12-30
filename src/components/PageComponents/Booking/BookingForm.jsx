import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

export default function BookingForm() {
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState(null);
  // Store StepOne data separately for persistence
  const [stepOneData, setStepOneData] = useState(null);
  // Store StepTwo data separately for persistence
  const [stepTwoData, setStepTwoData] = useState(null);

  return (
    <div className="px-4 mx-auto max-w-3xl md:p-8">
      {step === 1 && (
        <StepOne
          initialData={stepOneData}
          onContinue={(data) => {
            setBookingData(data);
            setStepOneData(data); // Persist StepOne data
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepTwo
          booking={bookingData}
          initialData={stepTwoData}
          onBack={() => setStep(1)}
          onDataChange={(data) => {
            // Save StepTwo data whenever it changes
            setStepTwoData(data);
          }}
        />
      )}
    </div>
  );
}
