import React, { useState, useRef } from "react";
import { ArrowLeft, Clock } from "lucide-react";

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

  const paymentRef = useRef(null);

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

  const handleFormSubmit = async () => {
    if (!isFormValid()) return;
    setSubmitting(true);
    try {
      if (onConfirm) await onConfirm(buildPayload());
      setShowPayment(true);
      paymentRef.current?.scrollIntoView({ behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
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
        <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Your Information
        </h1>
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Payment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Consultation Fee: <span className="font-semibold text-[#004F97] text-lg">${price}</span>
            </p>

            <div className="StripeElement mb-4">
              <div className="h-12 flex items-center px-3 rounded-md border border-gray-300 bg-white text-sm text-gray-700">
                Secure card input (Stripe Element placeholder)
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => onPayNow && onPayNow(buildPayload())}
                className="inline-flex items-center justify-center gap-2 w-full bg-[#004F97] hover:bg-[#004F97]/90 text-white h-12 text-base font-medium rounded-md"
              >
                Pay Now
              </button>
              <button
                onClick={() => onConfirm && onConfirm({ ...buildPayload(), paid: false })}
                className="inline-flex items-center justify-center gap-2 w-full bg-[#004F97] hover:bg-[#004F97]/90 text-white h-12 text-base font-medium rounded-md"
              >
                Pay Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
