import React, { useState, useRef, useMemo, useEffect } from "react"; 
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, X } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSection from "./PaymentSection";
import { createPaymentIntent } from "@/services/stripe";

const updateUrlParams = (key, value) => {
  const url = new URL(window.location);
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  window.history.replaceState({}, '', url);
};
const getUrlParam = (key) => {
  return new URLSearchParams(window.location.search).get(key);
};

function SuccessModal({ bookingDetails, formattedPrice, onClose, onRedirect }) {
  const {
    email,
    meetingPref,
    condition,
    selectedDateIso,
    selectedTime,
  } = bookingDetails;

  const niceDate = formatNiceDate(selectedDateIso);
  const meetingLabel = meetingPref === "in_person" ? "In Person" : "Online";
  const isOnline = meetingPref === "online";

  const handleClose = () => {
    onClose(); 
    updateUrlParams("booking_status", "");
    onRedirect("/"); 
  };

  return (
     <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a3] !py-[70px] p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-[700px] border border-gray-500 w-full p-6 lg:p-12">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center ">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h2
            id="payLaterModalHeading"
            className="font-[LT Superior Serif] !text-[32px] font-semibold text-gray-900 mb-4"
          >
            Payment Complete!
          </h2>
          <div className="text-gray-600 text-sm flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-50 border border-blue-200 mx-auto mb-8 w-fit max-w-md">
            <Clock className="w-4 h-4 text-blue-600" />
            {isOnline 
              ? "Your online appointment is confirmed. You will receive a meeting link via email shortly."
              : "Your in-person appointment is confirmed. We look forward to seeing you at our location."
            }
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="font-semibold text-lg text-gray-900 border-t border-gray-200 pt-6 mb-4">
            Appointment Details
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Date & Time</span>
            <span className="text-gray-900">
              {niceDate} at {selectedTime}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Condition</span>
            <span className="text-gray-900">{condition}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Meeting Type</span>
            <span className="text-gray-900">{meetingLabel}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Email</span>
            <span className="text-gray-900">{email}</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleClose}
            className="inline-flex items-center cursor-pointer justify-center w-full bg-[#004F97] hover:bg-[#004F97]/90 text-white h-12 text-base font-medium rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function PayLaterModal({ bookingDetails, formattedPrice, onClose, onRedirect }) {
  const {
    fullName,
    email,
    phone,
    meetingPref,
    condition,
    selectedDateIso,
    selectedTime,
  } = bookingDetails;

  const niceDate = formatNiceDate(selectedDateIso);
  const meetingLabel = meetingPref === "in_person" ? "In Person" : "Online";
  const isOnline = meetingPref === "online";

  const handleClose = () => {
    onClose(); 
    updateUrlParams("booking_status", ""); 
    onRedirect("/"); 
  };

  return (
  <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a3] !py-[70px] p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-[700px] border border-gray-500 w-full p-6 lg:p-12">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center ">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h2
            id="payLaterModalHeading"
            className="font-[LT Superior Serif] !text-[32px] font-semibold text-gray-900 mb-4"
          >
            Thank You!
          </h2>
          <div className="text-gray-600 text-sm flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-50 border border-blue-200 mx-auto mb-8 w-fit">
            <Clock className="w-4 h-4 text-blue-600" />
            {isOnline 
              ? "Your online appointment has been reserved. You will receive a payment link via email to complete your booking."
              : "Your appointment has been reserved. You will receive a payment link via email to complete your booking and confirm your in-person visit."
            }
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="font-semibold text-lg text-gray-900 border-t border-gray-200 pt-6 mb-4">
            Appointment Details
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Date & Time</span>
            <span className="text-gray-900">
              {niceDate} at {selectedTime}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Condition</span>
            <span className="text-gray-900">{condition}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Meeting Type</span>
            <span className="text-gray-900">{meetingLabel}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Email</span>
            <span className="text-gray-900">{email}</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleClose}
            className="inline-flex items-center cursor-pointer justify-center w-full bg-[#004F97] hover:bg-[#004F97]/90 text-white h-12 text-base font-medium rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}


const trackKlaviyoEvent = (payload) => {
  const _learnq = window._learnq || [];

  _learnq.push([
    "identify",
    {
      $email: payload.email,
      FullName: payload.fullName,
      Phone: payload.phone,
    },
  ]);
  const eventName = payload.paid
    ? "Booked Consultation"
    : "Booked Consultation Pay Later";
  const trackedPrice = payload.paid
    ? payload.price
    : payload.originalPrice || payload.price;

  _learnq.push([
    "track",
    // "Booked Consultation",
    eventName,
    {
      FullName: payload.fullName,
      IssuesNoted: payload.issues,
      condition: payload.condition,
      meetingPref: payload.meetingPref,
      selectedDateIso: payload.selectedDateIso,
      selectedTime: payload.selectedTime,
      price: trackedPrice,
      PaymentStatus: payload.paid ? "Paid" : "Pending",
      ChargeID: payload.ChargeID || "",
      SubmittedAt: new Date().toISOString(),
      PhoneNumber: payload.phone,
    },
  ]);
};

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
function TextInput({ label, value, onChange, placeholder, type = "text", id, required = false, error = "", onBlur }) {
  const hasError = error && error.trim().length > 0;
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 " htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`flex h-9 w-full rounded-md border-[1px] bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground outline-none mt-1.5 ${
          hasError 
            ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
            : "border-input"
        }`}
      />
      {hasError && (
        <p className="text-red-600 text-xs mt-1">{error}</p>
      )}
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
        active
          ? "border-[#004F97] bg-[#004F97]/5"
          : "border-gray-300 dark:border-gray-600"
      }`}
    >
      {icon}
      <span className="font-medium text-gray-900 ">{label}</span>
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
  
  const navigate = (path) => {
    window.location.href = path; 
  }

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [meetingPref, setMeetingPref] = useState("in_person");
  const [issues, setIssues] = useState("");
  const [termsChecked, setTermsChecked] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Validation errors state
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    terms: "",
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    terms: false,
  });
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [initializingPayment, setInitializingPayment] = useState(false);
  const [paymentSetupError, setPaymentSetupError] = useState("");
  const [paymentResult, setPaymentResult] = useState(null);

  const [showPayLaterModal, setShowPayLaterModal] = useState(false); 
  const [payLaterPayload, setPayLaterPayload] = useState({});
    
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [successModalPayload, setSuccessModalPayload] = useState({});

  const paymentRef = useRef(null);

    useEffect(() => {
        const status = getUrlParam("booking_status");
        if (status === "reserved" && Object.keys(payLaterPayload).length === 0) {
            if (Object.keys(payLaterPayload).length) {
                setShowPayLaterModal(true);
            }
        } else if (status === "confirmed" && Object.keys(successModalPayload).length === 0) {
            if (Object.keys(successModalPayload).length) {
                setShowSuccessModal(true);
            }
        }
    }, [payLaterPayload, successModalPayload]); 


  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(price),
    [price]
  );


  const isValidPhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7;
  };

  const validateField = (fieldName, value) => {
    let error = "";
    
    switch (fieldName) {
      case "fullName":
        if (!value.trim()) {
          error = "Full Name is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Phone Number is required";
        } else if (!isValidPhone(value)) {
          error = "Please enter a valid phone number (at least 7 digits)";
        }
        break;
      case "terms":
        if (!value) {
          error = "You must agree to the Terms and Conditions";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const validateAllFields = () => {
    const newErrors = {
      fullName: validateField("fullName", fullName),
      email: validateField("email", email),
      phone: validateField("phone", phone),
      terms: validateField("terms", termsChecked ? true : false),
    };
    
    // Force synchronous updates to ensure errors display immediately
    flushSync(() => {
      // Set all fields as touched first to ensure errors show
      setTouched({
        fullName: true,
        email: true,
        phone: true,
        terms: true,
      });
      
      // Set all errors
      setErrors(newErrors);
      
      // Also update phoneError for consistency with phone field display
      if (newErrors.phone) {
        setPhoneError(newErrors.phone);
      } else if (phone && !isValidPhone(phone)) {
        setPhoneError("Please enter a valid phone number.");
      } else {
        setPhoneError("");
      }
    });
    
    return !Object.values(newErrors).some(error => error !== "");
  };

  const isFormValid = () => {
    return (
      fullName.trim() &&
      /^\S+@\S+\.\S+$/.test(email) &&
      phone.trim() &&
      isValidPhone(phone) &&
      termsChecked
    );
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

  const handlePayNow = async () => {
    // Validate all fields first
    const isValid = validateAllFields();
    
    if (!isValid) {
      // Force re-render to show errors
      setTimeout(() => {
        // Scroll to first error
        const firstErrorField = document.querySelector('[id="fullName"], [id="email"], [id="phone"]');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
          firstErrorField.focus();
        }
      }, 0);
      return;
    }
    
    setSubmitting(true);
    try {
      const payload = buildPayload();
      if (onConfirm) await onConfirm(payload);
      setPaymentResult(null);
      await initializePayment(payload);
      setShowPayment(true);
      // Smooth scroll to payment section with animation
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } finally {
      setSubmitting(false);
    }
  };


  const handlePayLater = () => {
    // Validate all fields first
    const isValid = validateAllFields();
    
    if (!isValid) {
      // Force re-render to show errors
      setTimeout(() => {
        // Scroll to first error
        const firstErrorField = document.querySelector('[id="fullName"], [id="email"], [id="phone"]');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
          firstErrorField.focus();
        }
      }, 0);
      return;
    }
    

    const basePayload = buildPayload();

    const finalPayload = {
      ...basePayload,
      paid: false,
      ChargeID: "PAY_LATER",
      originalPrice: basePayload.price, 
      price: 0, 
    };

    trackKlaviyoEvent(finalPayload);
    setPaymentResult({
      status: "pending",
      message:
        "You chose to pay later. We've reserved your slot and sent a payment link to your email.",
    });
    onConfirm?.(finalPayload);
    setPayLaterPayload(finalPayload);

    updateUrlParams("booking_status", "reserved");
    setShowPayLaterModal(true);

    console.log("Pay Later Payload:", finalPayload);
  };

  const handlePayNowSuccess = (paymentSummary) => {
    const payload = { ...buildPayload(), paid: true, ...paymentSummary };
    trackKlaviyoEvent(payload);
    setPaymentResult({
      status: "success",
      message: "Payment successful. A receipt has been sent to your email.",
    });
    
  
    setSuccessModalPayload(payload);
    updateUrlParams("booking_status", "confirmed");
    setShowSuccessModal(true);

    onPayNow?.(payload);
  };

  return (
    <div className="max-w-6xl mx-auto px-0 lg:px-8 py-8 lg:py-12">
      <button
        onClick={onBack}
        className="inline-flex items-center cursor-pointer gap-2 -ml-3 text-gray-600  hover:text-gray-900 "
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex items-center justify-center gap-2 text-gray-600 ">
        <Clock className="w-4 h-4" />
        <span>
          {formatNiceDate(selectedDateIso)} at {selectedTime}
        </span>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl !mt-8 border border-gray-200 shadow-sm p-6 lg:p-12">
        <div className="font-[LT Superior Serif] text-[36px] font-semibold text-gray-900 mb-3">
          Your Information
        </div>
        <p className="text-gray-600 text-[14px] mb-8">
          Please provide your details to complete the booking
        </p>

        <form className="space-y-6 mb-10" onSubmit={(e) => e.preventDefault()}>
          <TextInput
            id="fullName"
            label="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (touched.fullName) {
                setErrors({ ...errors, fullName: validateField("fullName", e.target.value) });
              }
            }}
            onBlur={() => {
              setTouched({ ...touched, fullName: true });
              setErrors({ ...errors, fullName: validateField("fullName", fullName) });
            }}
            placeholder="John Smith"
            required
            error={errors.fullName}
          />
          <TextInput
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) {
                setErrors({ ...errors, email: validateField("email", e.target.value) });
              }
            }}
            onBlur={() => {
              setTouched({ ...touched, email: true });
              setErrors({ ...errors, email: validateField("email", email) });
            }}
            placeholder="john@example.com"
            required
            error={errors.email}
          />

          <div>
            <label
              className="text-sm font-medium text-gray-700 "
              htmlFor="phone"
            >
              Phone Number
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-2 mt-1.5">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="flex h-9 items-center justify-between rounded-md border-[1px] border-input bg-background px-3 py-2 text-sm outline-none"
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
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  setPhone(digitsOnly);
                  const phoneErrorMsg = validateField("phone", digitsOnly);
                  setErrors({ ...errors, phone: phoneErrorMsg });
                  if (touched.phone) {
                    if (!isValidPhone(digitsOnly)) {
                      setPhoneError("Please enter a valid phone number.");
                    } else {
                      setPhoneError("");
                    }
                  }
                }}
                onBlur={() => {
                  setTouched({ ...touched, phone: true });
                  const phoneErrorMsg = validateField("phone", phone);
                  setErrors({ ...errors, phone: phoneErrorMsg });
                  if (!isValidPhone(phone)) {
                    setPhoneError("Please enter a valid phone number.");
                  } else {
                    setPhoneError("");
                  }
                }}
                placeholder="(555) 123-4567"
                className={`flex h-9 w-full rounded-md border-[1px] bg-background px-3 py-2 text-base outline-none ${
                  (errors.phone || phoneError) ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input"
                }`}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {(errors.phone || phoneError) && (
              <div className="text-red-600 text-xs mt-1">{errors.phone || phoneError}</div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700  block">
              How would you prefer to meet?
            </label>
            <div className="grid grid-cols-2 gap-3 mt-1.5">
              <MeetingOption
                type="in_person"
                selected={meetingPref}
                onClick={setMeetingPref}
                icon={
                  <svg
                    className="w-6 h-6 mb-2 text-[#004F97]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
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
                  <svg
                    className="w-6 h-6 mb-2 text-[#004F97]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                    <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                  </svg>
                }
                label="Online"
              />
            </div>
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 "
              htmlFor="issues"
            >
              What specific issues or concerns would you like to address?
              (Optional)
            </label>
          <div className="!mt-1.5">
    <textarea
              id="issues"
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
              placeholder="Please share any relevant details..."
              className="flex w-full rounded-md border-[1px] border-input bg-background px-3 py-2 text-base min-h-[100px] outline-none  "
            />
</div>
          </div>

          <div>
            <div className="flex items-start gap-3">
              <button
                type="button"
                aria-checked={termsChecked}
                onClick={() => {
                  const newValue = !termsChecked;
                  setTermsChecked(newValue);
                  if (touched.terms) {
                    setErrors({ ...errors, terms: validateField("terms", newValue) });
                  }
                }}
                onBlur={() => {
                  setTouched({ ...touched, terms: true });
                  setErrors({ ...errors, terms: validateField("terms", termsChecked) });
                }}
                className={`peer h-4 w-4 shrink-0 rounded-sm border ${
                  termsChecked ? "bg-[#004F97] text-white" : ""
                } ${
                  errors.terms ? "border-red-500" : ""
                } flex items-center justify-center`}
              >
                {termsChecked && (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                )}
              </button>
              <label className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link to="/terms-conditions"
                  type="button"
                  className="text-[#004F97] underline hover:text-[#004F97]/80"
                >
                  Terms and Conditions
                </Link>
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-600 text-xs mt-1 ml-7">{errors.terms}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePayNow}
              disabled={submitting || initializingPayment}
              className={`inline-flex items-center cursor-pointer justify-center gap-2 flex-1 bg-[#004F97] 
              hover:bg-[#004F97]/90 text-white py-[10px] border-2 border-[#004F97]
              text-base font-medium rounded-md disabled:opacity-60 disabled:cursor-not-allowed transition-all ${
                !isFormValid() ? "opacity-50" : ""
              }`}
            >
              {submitting || initializingPayment ? "Processing..." : "Proceed to Payment"}
            </button>
            <button
              onClick={handlePayLater}
              disabled={submitting}
              className={`inline-flex items-center cursor-pointer justify-center
              gap-2 flex-1 bg-white border-2 border-[#004F97] text-[#004F97]
              hover:bg-[#004F97]/5 py-[10px] text-base font-medium rounded-md disabled:opacity-60 disabled:cursor-not-allowed transition-all ${
                !isFormValid() ? "opacity-50" : ""
              }`}
            >
              Pay Later
            </button>
          </div>
        </form>

        {showPayment && (
          <div
            ref={paymentRef}
            className="border-t border-gray-200 dark:border-gray-700 pt-8 animate-slide-up"
          >
            <div className="mb-6">
              <div className="text-3xl font-semibold text-gray-900  mb-2">
                Payment
              </div>
              <p className="text-gray-600 ">
                Consultation Fee:{" "}
                <span className="font-semibold text-[#004F97] text-lg">
                  {formattedPrice}
                </span>
              </p>
            </div>

            {initializingPayment && (
              <div className="p-4 border rounded-xl bg-blue-50 text-blue-900 mb-4">
                Initializing secure checkout…
              </div>
            )}

            {paymentSetupError && (
              <div className="p-4 border border-red-200 rounded-xl bg-red-50 text-red-700 mb-4">
                {paymentSetupError}
              </div>
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
                Stripe publishable key is missing. Please add{" "}
                <code>VITE_STRIPE_PUBLISHABLE_KEY</code> to your environment.
              </div>
            )}

            {paymentResult && (
              <div
                className={`mt-4 rounded-xl p-4 ${
                  paymentResult.status === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-blue-50 text-blue-900"
                }`}
              >
                {paymentResult.message}
              </div>
            )}
          </div>
        )}
      </div>
      {showPayLaterModal && (
        <PayLaterModal
         bookingDetails={payLaterPayload}
          formattedPrice={formattedPrice}
          onRedirect={navigate} 
          onClose={() => setShowPayLaterModal(false)}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          bookingDetails={successModalPayload}
          formattedPrice={formattedPrice}
          onRedirect={navigate} 
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
}