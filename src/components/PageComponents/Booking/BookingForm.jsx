import { useState, useEffect, useCallback, useRef } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

// Cookie keys
const COOKIE_KEYS = {
  STEP: "bookingStep",
  BOOKING_DATA: "bookingData",
  STEP_ONE_DATA: "stepOneData",
  STEP_TWO_DATA: "stepTwoData",
};

// Cookie helper functions
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    try {
      return JSON.parse(decodeURIComponent(parts.pop().split(";").shift()));
    } catch {
      return decodeURIComponent(parts.pop().split(";").shift());
    }
  }
  return null;
};

const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const cookieValue = typeof value === "string" ? value : JSON.stringify(value);
  document.cookie = `${name}=${encodeURIComponent(
    cookieValue
  )};expires=${expires.toUTCString()};path=/`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export default function BookingForm() {
  // Track if component has initialized (prevents re-clearing on re-renders)
  const hasInitialized = useRef(false);
  // Track if we're currently clearing cookies (prevents useEffect from interfering)
  const isClearingCookies = useRef(false);

  // Initialize state from cookies
  const getInitialStep = () => {
    const stepCookie = getCookie(COOKIE_KEYS.STEP);
    return stepCookie ? parseInt(stepCookie) : 1;
  };

  // Check if booking_status is in URL (completed booking) - clear cookies only on fresh page load
  const getInitialState = () => {
    // Only run initialization logic once
    if (hasInitialized.current) {
      // On subsequent calls, just restore from cookies
      return {
        step: getInitialStep(),
        bookingData: getCookie(COOKIE_KEYS.BOOKING_DATA),
        stepOneData: getCookie(COOKIE_KEYS.STEP_ONE_DATA),
        stepTwoData: getCookie(COOKIE_KEYS.STEP_TWO_DATA),
      };
    }

    hasInitialized.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const bookingStatus = urlParams.get("booking_status");

    // Check if cookies exist (user is in active booking flow)
    const hasActiveCookies =
      getCookie(COOKIE_KEYS.STEP) ||
      getCookie(COOKIE_KEYS.BOOKING_DATA) ||
      getCookie(COOKIE_KEYS.STEP_ONE_DATA) ||
      getCookie(COOKIE_KEYS.STEP_TWO_DATA);

    // Only clear cookies if booking_status exists AND no active cookies exist (fresh page load)
    // This prevents clearing cookies during active booking session
    if (
      (bookingStatus === "reserved" || bookingStatus === "confirmed") &&
      !hasActiveCookies
    ) {
      Object.values(COOKIE_KEYS).forEach((key) => {
        deleteCookie(key);
      });
      return {
        step: 1,
        bookingData: null,
        stepOneData: null,
        stepTwoData: null,
      };
    }

    // Otherwise, restore from cookies (preserve data during active session)
    return {
      step: getInitialStep(),
      bookingData: getCookie(COOKIE_KEYS.BOOKING_DATA),
      stepOneData: getCookie(COOKIE_KEYS.STEP_ONE_DATA),
      stepTwoData: getCookie(COOKIE_KEYS.STEP_TWO_DATA),
    };
  };

  const initialState = getInitialState();
  const [step, setStep] = useState(initialState.step);
  const [bookingData, setBookingData] = useState(initialState.bookingData);
  const [stepOneData, setStepOneData] = useState(initialState.stepOneData);
  const [stepTwoData, setStepTwoData] = useState(initialState.stepTwoData);
  const handleStepTwoDataChange = useCallback(
    (data) => {
      setStepTwoData(data);
    },
    [setStepTwoData]
  );

  // Update cookies and URL when state changes
  useEffect(() => {
    if (step) {
      setCookie(COOKIE_KEYS.STEP, step.toString());

      // Update URL query param
      const url = new URL(window.location);
      if (step === 2) {
        url.searchParams.set("step", "2");
      } else {
        url.searchParams.delete("step");
      }
      window.history.replaceState({}, "", url.pathname + (url.search || ""));
    } else {
      deleteCookie(COOKIE_KEYS.STEP);
    }
  }, [step]);

  useEffect(() => {
    // Skip if we're clearing cookies
    if (isClearingCookies.current) return;

    if (bookingData) {
      setCookie(COOKIE_KEYS.BOOKING_DATA, bookingData);
    } else {
      deleteCookie(COOKIE_KEYS.BOOKING_DATA);
    }
  }, [bookingData]);

  useEffect(() => {
    // Skip if we're clearing cookies
    if (isClearingCookies.current) return;

    if (stepOneData) {
      setCookie(COOKIE_KEYS.STEP_ONE_DATA, stepOneData);
    } else {
      deleteCookie(COOKIE_KEYS.STEP_ONE_DATA);
    }
  }, [stepOneData]);

  useEffect(() => {
    // Skip if we're clearing cookies
    if (isClearingCookies.current) return;

    if (stepTwoData) {
      setCookie(COOKIE_KEYS.STEP_TWO_DATA, stepTwoData);
    } else {
      deleteCookie(COOKIE_KEYS.STEP_TWO_DATA);
    }
  }, [stepTwoData]);

  // Clear all cookies and URL params
  const clearAllCookies = useCallback(() => {
    // Set flag to prevent useEffect hooks from interfering
    isClearingCookies.current = true;

    // Delete all cookies immediately and synchronously
    Object.values(COOKIE_KEYS).forEach((key) => {
      deleteCookie(key);
      // Also try to delete with different path variations to ensure complete removal
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/booking;`;
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${window.location.hostname};`;
    });

    // Clear URL params
    const url = new URL(window.location);
    url.searchParams.delete("step");
    url.searchParams.delete("booking_status");
    window.history.replaceState({}, "", url.pathname + (url.search || ""));

    // Reset state
    setStep(1);
    setBookingData(null);
    setStepOneData(null);
    setStepTwoData(null);

    // Reset flag after a short delay to allow state updates to complete
    setTimeout(() => {
      isClearingCookies.current = false;
    }, 100);
  }, []);

  // Sync step from URL (for browser back/forward and Terms page return)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get("step");
    const urlStep = stepParam === "2" ? 2 : 1;

    // Only sync if URL step is different from current step
    if (urlStep !== step) {
      // If returning to step 2, restore bookingData if needed
      if (urlStep === 2) {
        const storedBookingData = getCookie(COOKIE_KEYS.BOOKING_DATA);
        const storedStepOneData = getCookie(COOKIE_KEYS.STEP_ONE_DATA);

        if (!storedBookingData && storedStepOneData) {
          setBookingData(storedStepOneData);
        }
      }

      setStep(urlStep);
    }
  }, []); // Only run on mount and when URL changes via popstate

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const stepParam = urlParams.get("step");
      const urlStep = stepParam === "2" ? 2 : 1;

      if (urlStep !== step) {
        if (urlStep === 2) {
          const storedBookingData = getCookie(COOKIE_KEYS.BOOKING_DATA);
          const storedStepOneData = getCookie(COOKIE_KEYS.STEP_ONE_DATA);

          if (!storedBookingData && storedStepOneData) {
            setBookingData(storedStepOneData);
          }
        }
        setStep(urlStep);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [step]);

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
          onDataChange={handleStepTwoDataChange}
          onClearData={clearAllCookies}
        />
      )}
    </div>
  );
}
