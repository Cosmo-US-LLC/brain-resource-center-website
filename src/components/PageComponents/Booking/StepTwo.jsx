import React, { useState, useRef, useMemo } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSection from "./PaymentSection";
import { createPaymentIntent } from "@/services/stripe";

function formatNiceDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function TextInput({ label, value, onChange, placeholder, type = "text", id }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1.5"
      />
    </div>
  );
}

function MeetingOption({ type, selected, onClick, icon, label }) {
  const active = selected === type;
  return (
    <button
      type="button"
      onClick={() => onClick(type)}
      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
        active ? "border-[#004F97] bg-[#004F97]/5" : "border-gray-300 dark:border-gray-600"
      }`}
    >
      {icon}
      <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>
    </button>
  );
}

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export default function StepTwo({ booking = {}, onBack, onConfirm, onPayNow }) {
  const {
    condition = "My condition isn't listed",
    customCondition = "",
    selectedDateIso = new Date().toISOString().slice(0, 10),
    selectedTime = "9:00am",
    price = 350,
  } = booking;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [meetingPref, setMeetingPref] = useState("in_person");
  const [issues, setIssues] = useState("");
  const [termsChecked, setTermsChecked] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [initializingPayment, setInitializingPayment] = useState(false);
  const [paymentSetupError, setPaymentSetupError] = useState("");
  const [paymentResult, setPaymentResult] = useState(null);

  const paymentRef = useRef(null);

  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(price),
    [price],
  );

  const isFormValid = () => {
    return fullName.trim() && /^\S+@\S+\.\S+$/.test(email) && phone.trim() && termsChecked;
  };

  const buildPayload = () => ({
    condition,
    customCondition,
    selectedDateIso,
    selectedTime,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: `${countryCode} ${phone.trim()}`,
    meetingPref,
    issues: issues.trim(),
    price,
  });

  const initializePayment = async (payload) => {
    setPaymentSetupError("");
    setInitializingPayment(true);
    try {
      const { clientSecret: secret } = await createPaymentIntent({
        amount: Math.round((payload.price || price) * 100),
        metadata: {
          customer_name: payload.fullName,
          customer_email: payload.email,
          meeting_preference: payload.meetingPref,
          preferred_date: payload.selectedDateIso,
          preferred_time: payload.selectedTime,
          condition: payload.condition,
        },
      });
      setClientSecret(secret);
    } catch (error) {
      setPaymentSetupError(error.message || "Unable to initialize payment.");
    } finally {
      setInitializingPayment(false);
    }
  };

  const handleFormSubmit = async () => {
    if (!isFormValid()) return;
    setSubmitting(true);
    try {
      const payload = buildPayload();
      if (onConfirm) await onConfirm(payload);
      setPaymentResult(null);
      await initializePayment(payload);
      setShowPayment(true);
      paymentRef.current?.scrollIntoView({ behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayLater = () => {
    const payload = { ...buildPayload(), paid: false };
    setPaymentResult({
      status: "pending",
      message: "You chose to pay later. We'll remind you before your consultation.",
    });
    onConfirm?.(payload);
  };

  const handlePayNowSuccess = (paymentSummary) => {
    const payload = { ...buildPayload(), paid: true, ...paymentSummary };
    setPaymentResult({
      status: "success",
      message: "Payment successful. A receipt has been sent to your email.",
    });
    onPayNow?.(payload);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-6 -ml-3 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-8">
        <Clock className="w-4 h-4" />
        <span>
          {formatNiceDate(selectedDateIso)} at {selectedTime}
        </span>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 lg:p-12">
        <div className="font-serif text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Your Information
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Please provide your details to complete the booking
        </p>

        <form className="space-y-6 mb-10" onSubmit={(e) => e.preventDefault()}>
          <TextInput id="fullName" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Smith" />
          <TextInput id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex gap-2 mt-1.5">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="flex h-9 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                style={{ width: 96 }}
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
                <option value="+92">+92</option>
                <option value="+91">+91</option>
              </select>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
              How would you prefer to meet?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <MeetingOption
                type="in_person"
                selected={meetingPref}
                onClick={setMeetingPref}
                icon={
                  <svg className="w-6 h-6 mb-2 text-[#004F97]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                }
                label="In Person"
              />
              <MeetingOption
                type="online"
                selected={meetingPref}
                onClick={setMeetingPref}
                icon={
                  <svg className="w-6 h-6 mb-2 text-[#004F97]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                    <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                  </svg>
                }
                label="Online"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="issues">
              What specific issues or concerns would you like to address? (Optional)
            </label>
            <textarea
              id="issues"
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
              placeholder="Please share any relevant details..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base min-h-[100px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1.5"
            />
          </div>

          <div className="flex items-start gap-3">
            <button
              type="button"
              aria-checked={termsChecked}
              onClick={() => setTermsChecked((s) => !s)}
              className={`peer h-4 w-4 shrink-0 rounded-sm border ${termsChecked ? "bg-[#004F97] text-white" : ""} flex items-center justify-center`}
            >
              {termsChecked && (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              )}
            </button>
            <label className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer leading-relaxed">
              I agree to the{" "}
              <button type="button" className="text-[#004F97] underline hover:text-[#004F97]/80">
                Terms and Conditions
              </button>
            </label>
          </div>

          <button
            onClick={handleFormSubmit}
            disabled={!isFormValid() || submitting}
            className="inline-flex items-center justify-center gap-2 w-full bg-[#004F97] hover:bg-[#004F97]/90 text-white h-12 text-base font-medium rounded-md disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Continue to Payment"}
          </button>
        </form>

        {showPayment && (
          <div ref={paymentRef} className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="mb-6">
              <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Payment</div>
              <p className="text-gray-600 dark:text-gray-400">
                Consultation Fee: <span className="font-semibold text-[#004F97] text-lg">{formattedPrice}</span>
              </p>
            </div>

            {initializingPayment && (
              <div className="p-4 border rounded-xl bg-blue-50 text-blue-900 mb-4">Initializing secure checkout…</div>
            )}

            {paymentSetupError && (
              <div className="p-4 border border-red-200 rounded-xl bg-red-50 text-red-700 mb-4">{paymentSetupError}</div>
            )}

            {stripePromise && clientSecret && !paymentSetupError && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "flat",
                    variables: {
                      colorPrimary: "#004F97",
                      colorBackground: "#ffffff",
                      colorText: "#0f172a",
                      borderRadius: "8px",
                    },
                  },
                }}
              >
                <PaymentSection
                  amount={price}
                  clientSecret={clientSecret}
                  bookingDetails={buildPayload()}
                  onPayLater={handlePayLater}
                  onPaymentCompleted={handlePayNowSuccess}
                />
              </Elements>
            )}

            {!stripePromise && (
              <div className="p-4 border border-yellow-200 rounded-xl bg-yellow-50 text-yellow-800">
                Stripe publishable key is missing. Please add <code>VITE_STRIPE_PUBLISHABLE_KEY</code> to your environment.
              </div>
            )}

            {paymentResult && (
              <div
                className={`mt-4 rounded-xl p-4 ${
                  paymentResult.status === "success" ? "bg-green-50 text-green-800" : "bg-blue-50 text-blue-900"
                }`}
              >
                {paymentResult.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
