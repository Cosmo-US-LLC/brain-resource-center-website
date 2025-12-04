import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

export default function BookingForm() {
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-8">
      {step === 1 && (
        <StepOne
          onContinue={(data) => {
            setBookingData(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepTwo
          data={bookingData}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  );
}
