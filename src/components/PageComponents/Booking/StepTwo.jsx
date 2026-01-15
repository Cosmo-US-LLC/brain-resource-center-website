import React, { useState, useRef, useMemo, useEffect } from "react";
import { flushSync } from "react-dom";
// import { Link, useNavigate } from "react-router-dom";
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
  window.history.replaceState({}, "", url);
};
const getUrlParam = (key) => {
  return new URLSearchParams(window.location.search).get(key);
};

function SuccessModal({
  bookingDetails,
  // formattedPrice,
  onClose,
  onRedirect,
  onClearData,
}) {
  const { email, meetingPref, condition, selectedDateIso, selectedTime } =
    bookingDetails;

  const niceDate = formatNiceDate(selectedDateIso);
  const meetingLabel = meetingPref === "in_person" ? "In Person" : "Online";
  const isOnline = meetingPref === "online";

  const handleClose = () => {
    onClose();
    updateUrlParams("booking_status", "");
    // Clear all cookies when modal is closed
    if (onClearData) {
      onClearData();
      // Use setTimeout to ensure cookies are fully cleared before redirect
      setTimeout(() => {
        onRedirect("/");
      }, 200);
    } else {
      // Fallback if onClearData is not provided
      setTimeout(() => {
        onRedirect("/");
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a3] !py-[70px] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[700px] border border-gray-500 w-full p-6 lg:p-12">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center">
          <div className="flex justify-center items-center mx-auto mb-3 w-16 h-16 bg-green-100 rounded-full">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h2
            id="payLaterModalHeading"
            className="font-[LT Superior Serif] !text-[32px] font-semibold text-gray-900 mb-4"
          >
            Payment Complete!
          </h2>
          <div className="flex gap-2 justify-center items-center px-4 py-2 mx-auto mb-8 max-w-md text-sm text-gray-600 bg-blue-50 rounded-lg border border-blue-200 w-fit">
            <Clock className="w-4 h-4 text-blue-600" />
            {isOnline
              ? "Your online appointment is confirmed. You will receive a meeting link via email shortly."
              : "Your in-person appointment is confirmed. We look forward to seeing you at our location."}
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="pt-6 mb-4 text-lg font-semibold text-gray-900 border-t border-gray-200">
            Appointment Details
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Date & Time</span>
            <span className="text-gray-900">
              {niceDate} at {selectedTime}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Condition</span>
            <span className="text-gray-900">{condition}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Meeting Type</span>
            <span className="text-gray-900">{meetingLabel}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Email</span>
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

function PayLaterModal({
  bookingDetails,
  // formattedPrice,
  onClose,
  onRedirect,
  onClearData,
}) {
  const {
    // fullName,
    email,
    // phone,
    meetingPref,
    condition,
    selectedDateIso,
    selectedTime,
  } = bookingDetails;

  const niceDate = formatNiceDate(selectedDateIso);
  const meetingLabel = meetingPref === "in_person" ? "In Person" : "Online";
  // const isOnline = meetingPref === "online"; // Not used after message update

  const handleClose = () => {
    onClose();
    updateUrlParams("booking_status", "");
    // Clear all cookies when modal is closed
    if (onClearData) {
      onClearData();
      // Use setTimeout to ensure cookies are fully cleared before redirect
      setTimeout(() => {
        onRedirect("/");
      }, 200);
    } else {
      // Fallback if onClearData is not provided
      setTimeout(() => {
        onRedirect("/");
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a3] !py-[70px] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[700px] border border-gray-500 w-full p-6 lg:p-12">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center">
          <div className="flex justify-center items-center mx-auto mb-3 w-16 h-16 bg-green-100 rounded-full">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h2
            id="payLaterModalHeading"
            className="font-[LT Superior Serif] !text-[32px] font-semibold text-gray-900 mb-4"
          >
            Thank You!
          </h2>
          <div className="flex gap-2 justify-center items-center px-4 py-2 mx-auto mb-8 text-sm text-gray-600 bg-blue-50 rounded-lg border border-blue-200 w-fit">
            <Clock className="w-4 h-4 text-blue-600" />
            We've received your request! One of our representatives will contact
            you via email regarding your consultation.
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="pt-6 mb-4 text-lg font-semibold text-gray-900 border-t border-gray-200">
            Appointment Details
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Date & Time</span>
            <span className="text-gray-900">
              {niceDate} at {selectedTime}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Condition</span>
            <span className="text-gray-900">{condition}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Meeting Type</span>
            <span className="text-gray-900">{meetingLabel}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Email</span>
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
  // Validate required fields
  if (!payload || !payload.email || !payload.fullName) {
    console.error("❌ Klaviyo: Missing required fields in payload", {
      hasEmail: !!payload?.email,
      hasFullName: !!payload?.fullName,
      payload,
    });
    return;
  }

  // Check if Klaviyo is loaded
  if (typeof window === "undefined") {
    console.warn("⚠️ Klaviyo: window is undefined");
    return;
  }

  // Initialize _learnq if it doesn't exist
  if (!window._learnq) {
    window._learnq = [];
    console.warn("⚠️ Klaviyo: _learnq not found, initializing queue");
  }

  const _learnq = window._learnq;

  // Step 1: Update profile with ALL custom properties FIRST
  // CRITICAL: Properties used in Klaviyo segments MUST be in the identify call
  // Segments evaluate profile properties, not event properties
  const profileProperties = {
    $email: payload.email,
    FullName: payload.fullName,
    Phone: payload.phone,
    PhoneNumber: payload.phone,
    // Custom properties for segmentation - MUST match Klaviyo segment conditions exactly
    bookingStatus: payload.bookingStatus || "",
    condition: payload.condition || "",
    meetingPref: payload.meetingPref || "",
    paymentStatus: payload.paid
      ? "paid"
      : payload.ChargeID === "PAY_LATER" ||
        payload.ChargeID === "REQUEST_APPOINTMENT"
      ? "requested"
      : "pending",
    selectedDateIso: payload.selectedDateIso || "",
    selectedTime: payload.selectedTime || "",
    issues: payload.issues || "",
    LastBookingDate: payload.selectedDateIso || "",
    LastBookingTime: payload.selectedTime || "",
  };

  // Debug logging to verify what's being sent
  console.log("🔵 Klaviyo Identify - Profile Properties:", profileProperties);
  console.log("🔵 Klaviyo Identify - bookingStatus:", payload.bookingStatus);
  console.log(
    "🔵 Klaviyo Identify - bookingStatus VALUE:",
    profileProperties.bookingStatus
  );
  console.log(
    "🔵 Klaviyo Identify - paymentStatus VALUE:",
    profileProperties.paymentStatus
  );
  console.log("🔵 Klaviyo _learnq available:", !!window._learnq);

  try {
    _learnq.push(["identify", profileProperties]);
    console.log("✅ Klaviyo Identify - Pushed to queue");
  } catch (error) {
    console.error("❌ Klaviyo Identify Error:", error);
  }

  // Step 2: Track the event separately (after profile is updated)
  const eventName = payload.paid
    ? "Booked Consultation"
    : "Requested Appointment";
  const trackedPrice = payload.paid
    ? payload.price
    : payload.originalPrice || payload.price;

  const eventProperties = {
    $email: payload.email, // Email is required for Klaviyo event tracking
    FullName: payload.fullName,
    Email: payload.email, // Also include as Email property
    IssuesNoted: payload.issues || "",
    condition: payload.condition || "",
    meetingPref: payload.meetingPref || "",
    bookingStatus: payload.bookingStatus || "",
    selectedDateIso: payload.selectedDateIso || "",
    selectedTime: payload.selectedTime || "",
    price: trackedPrice,
    paymentStatus: payload.paid
      ? "paid"
      : payload.ChargeID === "PAY_LATER" ||
        payload.ChargeID === "REQUEST_APPOINTMENT"
      ? "requested"
      : "pending",
    ChargeID: payload.ChargeID || "",
    SubmittedAt: new Date().toISOString(),
    PhoneNumber: payload.phone,
  };

  console.log("🟢 Klaviyo Track - Event:", eventName);
  console.log("🟢 Klaviyo Track - Properties:", eventProperties);
  console.log(
    "🟢 Klaviyo Track - bookingStatus VALUE:",
    eventProperties.bookingStatus
  );
  console.log(
    "🟢 Klaviyo Track - paymentStatus VALUE:",
    eventProperties.paymentStatus
  );

  try {
    _learnq.push(["track", eventName, eventProperties]);
    console.log("✅ Klaviyo Track - Pushed to queue");
  } catch (error) {
    console.error("❌ Klaviyo Track Error:", error);
  }
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
// Email validation helpers
const popularProviders = [
  // Google
  "gmail.com",

  // Microsoft
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "microsoft.com",

  // Yahoo
  "yahoo.com",

  // Apple
  "icloud.com",
  "me.com",
  "mac.com",

  // AOL
  "aol.com",

  // Zoho
  "zoho.com",

  // Proton
  "protonmail.com",

  // GMX
  "gmx.com",

  // Yandex
  "yandex.com",
];

const blockedTlds = ["con", "comm", "cim", "cmo", "vom", "xom", "c"];

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;

function isValidEmail(value) {
  const email = value.trim().toLowerCase();

  // Basic structure
  if (!emailRegex.test(email)) {
    return { valid: false, reason: "Invalid email format" };
  }

  const domain = email.split("@")[1];
  const tld = domain.split(".").pop();

  // ❌ Block typo TLDs everywhere
  if (tld && blockedTlds.includes(tld)) {
    return { valid: false, reason: "Invalid email domain" };
  }

  // ✅ Popular providers → only allow exact domains in the list
  if (popularProviders.includes(domain)) {
    return { valid: true };
  }

  const providerRoot = domain.split(".")[0]; // e.g. "gmail" from "gmail.co"
  const popularRoots = popularProviders.map((p) => p.split(".")[0]);

  // If domain looks like a typo of a popular provider (gmail.co, yahoo.org, etc.)
  if (popularRoots.includes(providerRoot)) {
    return {
      valid: false,
      reason: "Please check your email provider (did you mean .com?)",
    };
  }

  // Other (company / private) domains allowed
  return { valid: true };
}
function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  id,
  required = false,
  error = "",
  onBlur,
}) {
  const hasError = error && error.trim().length > 0;
  return (
    <div>
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
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
      {hasError && <p className="mt-1 text-xs text-red-600">{error}</p>}
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
      {icon} <span className="font-medium text-gray-900">{label}</span>{" "}
    </button>
  );
}

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export default function StepTwo({
  booking = {},
  onBack,
  onConfirm,
  onPayNow,
  initialData,
  onDataChange,
  onClearData,
}) {
  const {
    condition = "My condition isn't listed",
    customCondition = "",
    selectedDateIso = new Date().toISOString().slice(0, 10),
    selectedTime = "9:00am",
    price = 350,
  } = booking;

  // Use React Router's navigate hook for proper navigation
  // const navigate = useNavigate();

  // Helper function for modal redirects (uses window.location for full page reload)
  const navigateToPage = (path) => {
    window.location.href = path;
  };

  // Initialize form fields from initialData if available
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [email, setEmail] = useState(initialData?.email || "");

  // Handle phone initialization - check if phone includes country code
  const getInitialPhone = () => {
    if (!initialData?.phone) return "";
    // If phone is already separated, use it directly
    if (initialData.phone && !initialData.phone.startsWith("+")) {
      return initialData.phone;
    }
    // If phone includes country code, extract just the number part
    if (initialData.phone && initialData.phone.includes(" ")) {
      const parts = initialData.phone.split(" ");
      return parts.slice(1).join(" "); // Everything after country code
    }
    return initialData.phone.replace(/\D/g, ""); // Extract digits only
  };

  const getInitialCountryCode = () => {
    if (initialData?.countryCode) return initialData.countryCode;
    // Try to extract from phone if it's combined
    if (initialData?.phone && initialData.phone.startsWith("+")) {
      const match = initialData.phone.match(/^(\+\d+)/);
      return match ? match[1] : "+1";
    }
    return "+1";
  };

  const [countryCode, setCountryCode] = useState(getInitialCountryCode());
  const [phone, setPhone] = useState(getInitialPhone());
  const [phoneError, setPhoneError] = useState("");
  const [meetingPref, setMeetingPref] = useState(
    initialData?.meetingPref || "in_person"
  );
  const [issues, setIssues] = useState(initialData?.issues || "");
  const [termsChecked, setTermsChecked] = useState(
    initialData?.termsChecked !== undefined ? initialData.termsChecked : true
  );
  const [hiddenFieldValue, setHiddenFieldValue] = useState("");
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
    } else if (
      status === "confirmed" &&
      Object.keys(successModalPayload).length === 0
    ) {
      if (Object.keys(successModalPayload).length) {
        setShowSuccessModal(true);
      }
    }
  }, [payLaterPayload, successModalPayload]);

  // Persist StepTwo data whenever form fields change
  useEffect(() => {
    if (onDataChange) {
      const stepTwoFormData = {
        fullName,
        email,
        countryCode,
        phone,
        meetingPref,
        issues,
        termsChecked,
      };
      onDataChange(stepTwoFormData);
    }
  }, [
    fullName,
    email,
    countryCode,
    phone,
    meetingPref,
    issues,
    termsChecked,
    onDataChange,
  ]);

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

  // Helper function to create bookingStatus in simple format: "meetingPreference - paymentStatus"
  // Updated to return only meeting preference (payment removed from flow)
  const getBookingType = (meetingPref, paymentStatus) => {
    // For backward compatibility, still accept paymentStatus but ignore it
    const meeting = meetingPref === "in_person" ? "in-person" : "online";
    // Return just the meeting preference since payment is removed
    return meeting;
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
        } else {
          const result = isValidEmail(value);
          if (!result.valid) {
            error = result.reason;
          }
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

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const isFormValid = () => {
    return (
      fullName.trim() &&
      isValidEmail(email).valid &&
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
    bookingStatus: hiddenFieldValue,
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

  // Payment functionality commented out - payment removed from flow
  // const handlePayNow = async () => {
  //   // Validate all fields first
  //   const isValid = validateAllFields();

  //   if (!isValid) {
  //     // Force re-render to show errors
  //     setTimeout(() => {
  //       // Scroll to first error
  //       const firstErrorField = document.querySelector(
  //         '[id="fullName"], [id="email"], [id="phone"]'
  //       );
  //       if (firstErrorField) {
  //         firstErrorField.scrollIntoView({
  //           behavior: "smooth",
  //           block: "center",
  //         });
  //         firstErrorField.focus();
  //       }
  //     }, 0);
  //     return;
  //   }

  //   // Set bookingStatus in simple format: "meetingPreference - paymentStatus"
  //   const bookingType = getBookingType(meetingPref, "pending");
  //   setHiddenFieldValue(bookingType);
  //   console.log("📋 Meeting Preference:", meetingPref);
  //   console.log("📋 Payment Status: pending");
  //   console.log("📋 Booking Status:", bookingType);

  //   setSubmitting(true);
  //   try {
  //     const payload = { ...buildPayload(), bookingStatus: bookingType };
  //     console.log("💳 Pay Now Payload:", payload);

  //     // Track to Klaviyo immediately when user clicks "Proceed to Payment"
  //     // This ensures data is sent even if payment is not completed
  //     const klaviyoPayload = {
  //       ...payload,
  //       paid: false,
  //       ChargeID: "PENDING",
  //       originalPrice: payload.price,
  //     };
  //     console.log(
  //       "📤 Sending to Klaviyo - Booking Status:",
  //       klaviyoPayload.bookingStatus
  //     );
  //     trackKlaviyoEvent(klaviyoPayload);

  //     if (onConfirm) await onConfirm(payload);
  //     setPaymentResult(null);
  //     await initializePayment(payload);
  //     setShowPayment(true);
  //     // Smooth scroll to payment section with animation
  //     setTimeout(() => {
  //       paymentRef.current?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }, 100);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleRequestAppointment = () => {
    // Validate all fields first
    const isValid = validateAllFields();

    if (!isValid) {
      // Force re-render to show errors
      setTimeout(() => {
        // Scroll to first error
        const firstErrorField = document.querySelector(
          '[id="fullName"], [id="email"], [id="phone"]'
        );
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          firstErrorField.focus();
        }
      }, 0);
      return;
    }

    // Set bookingStatus - only track meeting preference (in-person or online)
    // No payment status needed since payment is removed from flow
    const bookingType = meetingPref === "in_person" ? "in-person" : "online";
    setHiddenFieldValue(bookingType);
    console.log("📋 Meeting Preference:", meetingPref);
    console.log("📋 Booking Status:", bookingType);

    const basePayload = buildPayload();

    // Validate email is present before tracking
    if (!basePayload.email || !basePayload.email.trim()) {
      console.error("❌ Email is missing from payload");
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      setTouched((prev) => ({
        ...prev,
        email: true,
      }));
      return;
    }

    const finalPayload = {
      ...basePayload,
      bookingStatus: bookingType, // Just "in-person" or "online"
      paid: false,
      ChargeID: "REQUEST_APPOINTMENT",
      originalPrice: basePayload.price,
      price: 0,
      paymentStatus: "requested", // Set paymentStatus for Klaviyo tracking
    };

    console.log("📧 Final Payload Email:", finalPayload.email);
    console.log("📧 Final Payload Full Name:", finalPayload.fullName);
    console.log("📧 Complete Final Payload:", finalPayload);

    // Track to Klaviyo - still sends in-person or online
    console.log(
      "🚀 About to call trackKlaviyoEvent with email:",
      finalPayload.email
    );
    try {
      trackKlaviyoEvent(finalPayload);
      console.log("✅ trackKlaviyoEvent called successfully");
    } catch (error) {
      console.error("❌ Error calling trackKlaviyoEvent:", error);
    }
    onConfirm?.(finalPayload);
    setPayLaterPayload(finalPayload);

    updateUrlParams("booking_status", "reserved");
    setShowPayLaterModal(true);
  };

  // Payment success handler commented out - payment removed from flow
  // const handlePayNowSuccess = (paymentSummary) => {
  //   // Set bookingStatus in simple format: "meetingPreference - paymentStatus"
  //   const bookingType = getBookingType(meetingPref, "paid");
  //   // Update hiddenFieldValue to reflect paid status
  //   setHiddenFieldValue(bookingType);
  //   const payload = {
  //     ...buildPayload(),
  //     bookingStatus: bookingType,
  //     paid: true,
  //     ChargeID:
  //       paymentSummary?.paymentIntentId || paymentSummary?.ChargeID || "",
  //     ...paymentSummary,
  //   };
  //   console.log("📋 Meeting Preference:", meetingPref);
  //   console.log("📋 Payment Status: paid");
  //   console.log("📋 Booking Status:", bookingType);
  //   console.log("📋 ChargeID (Stripe Payment Intent):", payload.ChargeID);
  //   console.log("✅ Pay Now Success Payload:", payload);
  //   trackKlaviyoEvent(payload);
  //   setPaymentResult({
  //     status: "success",
  //     message: "Payment successful. A receipt has been sent to your email.",
  //   });

  //   setSuccessModalPayload(payload);
  //   updateUrlParams("booking_status", "confirmed");
  //   setShowSuccessModal(true);

  //   onPayNow?.(payload);
  // };

  return (
    <div className="px-0 py-8 mx-auto max-w-6xl lg:px-8 lg:py-12">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onBack) {
            onBack();
          }
        }}
        className="inline-flex gap-2 items-center -ml-3 text-gray-600 cursor-pointer hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>{" "}
      <div className="flex gap-2 justify-center items-center text-gray-600">
        <Clock className="w-4 h-4" />{" "}
        <span>
          {formatNiceDate(selectedDateIso)} at {selectedTime}{" "}
        </span>{" "}
      </div>{" "}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl !mt-8 border border-gray-200 shadow-sm p-6 lg:p-12">
        {" "}
        <div className="font-[LT Superior Serif] text-[36px] font-semibold text-gray-900 mb-3">
          Your Information{" "}
        </div>{" "}
        <p className="text-gray-600 text-[14px] mb-8">
          Please provide your details to complete the booking{" "}
        </p>
        <form className="mb-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <TextInput
            id="fullName"
            label="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (touched.fullName) {
                setErrors({
                  ...errors,
                  fullName: validateField("fullName", e.target.value),
                });
              }
            }}
            onBlur={() => {
              setTouched({ ...touched, fullName: true });
              setErrors({
                ...errors,
                fullName: validateField("fullName", fullName),
              });
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
                setErrors({
                  ...errors,
                  email: validateField("email", e.target.value),
                });
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
              className="text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone Number
              <span className="ml-1 text-red-500">*</span>
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
                  errors.phone || phoneError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-input"
                }`}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {(errors.phone || phoneError) && (
              <div className="mt-1 text-xs text-red-600">
                {errors.phone || phoneError}
              </div>
            )}
          </div>{" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-gray-700">
              How would you prefer to meet?{" "}
            </label>{" "}
            <div className="grid grid-cols-2 gap-3 mt-1.5">
              {" "}
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
                    {" "}
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>{" "}
                  </svg>
                }
                label="In Person"
              />{" "}
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
                    {" "}
                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>{" "}
                    <rect x="2" y="6" width="14" height="12" rx="2"></rect>{" "}
                  </svg>
                }
                label="Online"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="issues"
            >
              What specific issues or concerns would you like to address?
              (Optional){" "}
            </label>{" "}
            <div className="!mt-1.5">
              {" "}
              <textarea
                id="issues"
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                placeholder="Please share any relevant details..."
                className="flex w-full rounded-md border-[1px] border-input bg-background px-3 py-2 text-base min-h-[100px] outline-none "
              />
            </div>{" "}
          </div>
          <div>
            <div className="flex gap-3 items-start">
              <button
                type="button"
                aria-checked={termsChecked}
                onClick={() => {
                  const newValue = !termsChecked;
                  setTermsChecked(newValue);
                  if (touched.terms) {
                    setErrors({
                      ...errors,
                      terms: validateField("terms", newValue),
                    });
                  }
                }}
                onBlur={() => {
                  setTouched({ ...touched, terms: true });
                  setErrors({
                    ...errors,
                    terms: validateField("terms", termsChecked),
                  });
                }}
                className={`peer h-4 w-4 shrink-0 rounded-sm border ${
                  termsChecked ? "bg-[#004F97] text-white" : ""
                } ${
                  errors.terms ? "border-red-500" : ""
                } flex items-center justify-center`}
              >
                {termsChecked && (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                )}
              </button>
              <label className="text-sm leading-relaxed text-gray-600 cursor-pointer">
                I agree to the{" "}
                <a
                  href="/terms-conditions"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // Ensure step=2 is in URL before navigating (for browser back button)
                    const currentUrl = new URL(window.location);
                    if (!currentUrl.searchParams.has("step")) {
                      currentUrl.searchParams.set("step", "2");
                      window.history.replaceState(
                        {},
                        "",
                        currentUrl.toString()
                      );
                    }

                    // Navigate to terms page
                    window.location.href = "/terms-conditions";
                  }}
                  className="text-[#004F97] underline hover:text-[#004F97]/80 cursor-pointer"
                >
                  Terms and Conditions
                </a>
                <span className="ml-1 text-red-500">*</span>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 ml-7 text-xs text-red-600">{errors.terms}</p>
            )}
          </div>
          {/* Hidden field to track meeting preference */}
          <input type="hidden" name="bookingStatus" value={hiddenFieldValue} />
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Payment option commented out - removed from flow */}
            {/* <button
              onClick={handlePayNow}
              disabled={submitting || initializingPayment}
              className={`inline-flex items-center cursor-pointer justify-center gap-2 flex-1 bg-[#004F97] 
              hover:bg-[#004F97]/90 text-white py-[10px] border-2 border-[#004F97]
              text-base font-medium rounded-md disabled:opacity-60 disabled:cursor-not-allowed transition-all ${
                !isFormValid() ? "opacity-50" : ""
              }`}
            >
              {submitting || initializingPayment
                ? "Processing..."
                : "Proceed to Payment"}
            </button> */}
            <button
              onClick={handleRequestAppointment}
              disabled={submitting}
              className={`inline-flex items-center cursor-pointer justify-center
              gap-2 flex-1 bg-[#004F97] hover:bg-[#004F97]/90 text-white
              py-[10px] border-2 border-[#004F97] text-base font-medium rounded-md disabled:opacity-60 disabled:cursor-not-allowed transition-all ${
                !isFormValid() ? "opacity-50" : ""
              }`}
            >
              {submitting ? "Processing..." : "Request an Appointment"}
            </button>
          </div>{" "}
        </form>
        {/* Payment section commented out - payment removed from flow */}
        {/* {showPayment && (
          <div
            ref={paymentRef}
            className="pt-8 border-t border-gray-200 dark:border-gray-700 animate-slide-up"
          >
            <div className="mb-6">
              <div className="mb-2 text-3xl font-semibold text-gray-900">
                Payment
              </div>
              <p className="text-gray-600">
                Consultation Fee:{" "}
                <span className="font-semibold text-[#004F97] text-lg">
                  {formattedPrice}
                </span>
              </p>
            </div>
            {initializingPayment && (
              <div className="p-4 mb-4 text-blue-900 bg-blue-50 rounded-xl border">
                Initializing secure checkout…
              </div>
            )}
            {paymentSetupError && (
              <div className="p-4 mb-4 text-red-700 bg-red-50 rounded-xl border border-red-200">
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
              <div className="p-4 text-yellow-800 bg-yellow-50 rounded-xl border border-yellow-200">
                Stripe publishable key is missing. Please add
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
        )} */}
      </div>{" "}
      {showPayLaterModal && (
        <PayLaterModal
          bookingDetails={payLaterPayload}
          formattedPrice={formattedPrice}
          onRedirect={navigateToPage}
          onClose={() => setShowPayLaterModal(false)}
          onClearData={onClearData}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          bookingDetails={successModalPayload}
          formattedPrice={formattedPrice}
          onRedirect={navigateToPage}
          onClose={() => setShowSuccessModal(false)}
          onClearData={onClearData}
        />
      )}{" "}
    </div>
  );
}
