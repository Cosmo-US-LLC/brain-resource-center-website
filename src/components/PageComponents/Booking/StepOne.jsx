import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

function formatNiceDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

// Helper function to check if date is Sunday
function isSunday(iso) {
  const d = new Date(iso);
  return d.getDay() === 0; // 0 = Sunday
}

// Generate time slots based on day of week
function generateTimeSlots(iso) {
  const d = new Date(iso);
  const dayOfWeek = d.getDay(); // 0=Sunday, 6=Saturday

  // Sunday is closed - shouldn't reach here as we filter Sundays
  if (dayOfWeek === 0) {
    return [];
  }

  // Saturday: 9am - 2pm
  if (dayOfWeek === 6) {
    return [
      "9:00am",
      "9:30am",
      "10:00am",
      "10:30am",
      "11:00am",
      "11:30am",
      "12:00pm",
      "12:30pm",
      "1:00pm",
      "1:30pm",
    ];
  }

  // Weekdays (Mon-Fri): 9am - 6pm
  return [
    "9:00am",
    "9:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "1:30pm",
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
    "5:30pm",
  ];
}

// Generate booked slots (20% of available slots) with consistent randomization per date
function generateBookedSlots(iso, timeSlots) {
  if (timeSlots.length === 0) return [];

  // Use date as seed for consistent random booking per day
  const seed = iso.split("-").join("");
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Seeded random function
  const seededRandom = (index) => {
    const x = Math.sin(hash + index) * 10000;
    return x - Math.floor(x);
  };

  // Calculate 25% of slots (at least 1 if there are slots)
  const numToBook = Math.max(1, Math.floor(timeSlots.length * 0.25));

  // Create array of indices and shuffle using seeded random
  const indices = timeSlots.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(i) * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Take first numToBook indices as booked
  const bookedIndices = new Set(indices.slice(0, numToBook));

  return timeSlots.map((time, index) => ({
    time,
    booked: bookedIndices.has(index),
  }));
}

export default function StepOne({ onContinue, initialData }) {
  const isPastDate = (iso) => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3); // Skip today and next 2 days
    minDate.setHours(0, 0, 0, 0);
    const date = new Date(iso);
    return date < minDate;
  };
  const conditions = [
    "Depression",
    "Anxiety Disorders",
    "Post-Traumatic Stress Disorder (PTSD)",
    "Obsessive-Compulsive Disorder (OCD)",
    "ADHD",
    "Bipolar Disorder (Depressive Phase)",
    "Autism Spectrum Disorder (ASD)",
    "Insomnia & Sleep Disorders",
    "Cognitive Decline & Brain Fog",
    "Traumatic Brain Injury (TBI)",
    "My condition isn't listed",
  ];

  // Initialize condition state from initialData or empty
  const getInitialCondition = () => {
    if (!initialData?.condition) return "";
    // Check if condition is in the list
    if (conditions.includes(initialData.condition)) {
      return initialData.condition;
    }
    // It's a custom condition
    return "My condition isn't listed";
  };

  const getInitialCustomCondition = () => {
    if (!initialData?.condition) return "";
    // If condition is not in the list, it's custom
    if (initialData.condition && !conditions.includes(initialData.condition)) {
      return initialData.condition;
    }
    return "";
  };

  const [condition, setCondition] = useState(getInitialCondition());
  const [customCondition, setCustomCondition] = useState(
    getInitialCustomCondition()
  );
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);

  // Set default date to 3 days from today (skipping today and next 2 days) or use initialData
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3); // Skip today and next 2 days
    return d.toISOString().slice(0, 10);
  };
  const [selectedDateIso, setSelectedDateIso] = useState(
    initialData?.selectedDateIso || getDefaultDate()
  );

  // Generate dates starting from 3 days after today, excluding Sundays (show 14 days)
  const dateOptionsIso = Array.from({ length: 18 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 3); // Start from 3 days after today (skip today and next 2 days)
    return d.toISOString().slice(0, 10);
  }).filter((iso) => !isSunday(iso)); // Filter out Sundays

  // Generate time slots dynamically based on selected date
  const timeSlots = generateTimeSlots(selectedDateIso);
  const times = generateBookedSlots(selectedDateIso, timeSlots);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showNativeDateInput, setShowNativeDateInput] = useState(false);

  const [selectedTime, setSelectedTime] = useState(
    initialData?.selectedTime || ""
  );

  const conditionRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (conditionRef.current && !conditionRef.current.contains(e.target)) {
        setShowConditionDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleContinue = () => {
    onContinue({
      condition:
        condition === "My condition isn't listed" ? customCondition : condition,
      selectedDateIso,
      selectedTime,
    });
  };

  const isConditionFilled =
    condition && (condition !== "My condition isn't listed" || customCondition);

  // Initialize flags based on initialData - if data exists, user has already selected
  const [dateWasEverSelected, setDateWasEverSelected] = useState(
    !!initialData?.selectedDateIso
  );

  const [timeWasEverSelected, setTimeWasEverSelected] = useState(
    !!initialData?.selectedTime
  );

  const isDateSelected = isConditionFilled && dateWasEverSelected;
  const isTimeFilled = isDateSelected && (selectedTime || timeWasEverSelected);

  return (
    <div className="px-0 py-0 mx-auto max-w-6xl lg:px-8 lg:py-0">
      <div className="md:max-w-3xl mx-auto px-0 !py-0">
        <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm lg:p-12">
          <h2 className="font-[LT Superior Serif] text-[36px] lg:!text-[36px] font-semibold text-gray-900 mb-3 text-center">
            Book Your Consultation
          </h2>
          <p className="text-gray-600 !text-[14px] mb-10 text-center">
            Select the condition you need treatment for and choose your
            appointment time
          </p>

          <div className="">
            <div className="!mb-0" ref={conditionRef}>
              <label
                className="text-base font-medium text-gray-900"
                htmlFor="condition"
              >
                What do you need treatment for?
              </label>
              <button
                type="button"
                onClick={() => setShowConditionDropdown((s) => !s)}
                className="flex w-full items-center justify-between rounded-md border-[1px] border-input bg-background px-3 py-2 mt-4 h-12 text-base "
              >
                <span>{condition || "Select condition"}</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </button>

              {showConditionDropdown && (
                <div className="mt-2 border-[1px] border-input rounded-md bg-white  shadow p-2 max-h-60 overflow-y-auto">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCondition(c);
                        setShowConditionDropdown(false);
                      }}
                      className="px-3 py-2 w-full text-left rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {condition === "My condition isn't listed" && (
                <input
                  type="text"
                  placeholder="Enter your condition"
                  value={customCondition}
                  onChange={(e) => setCustomCondition(e.target.value)}
                  className="px-3 mt-3 w-full h-12 rounded-md border"
                />
              )}
            </div>

            {isConditionFilled && (
              <div
                ref={dateRef}
                className="mb-4 opacity-0 transition-all duration-500 ease-in-out translate-y-4 animate-fadein"
                style={{
                  animationDelay: "0.1s",
                  animationFillMode: "forwards",
                }}
              >
                <label className="block mb-4 text-base font-medium text-gray-900">
                  Select a Date
                </label>
                <button
                  className="flex w-full items-center justify-between rounded-md border-[1px] border-input bg-background px-3 py-2 mt-2 h-12 text-base "
                  onClick={() => {
                    setShowDateDropdown((s) => !s);
                    setShowNativeDateInput(false);
                  }}
                >
                  <span>{formatNiceDate(selectedDateIso)}</span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </button>

                {showDateDropdown && (
                  <div className="mt-2 border-[1px] border-input rounded-md bg-white  shadow p-2 max-h-60 overflow-y-auto">
                    {dateOptionsIso
                      .filter((iso) => !isPastDate(iso))
                      .map((iso) => (
                        <button
                          key={iso}
                          onClick={() => {
                            setSelectedDateIso(iso);
                            setShowDateDropdown(false);
                            setDateWasEverSelected(true);
                          }}
                          className="px-3 py-2 w-full text-left rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {formatNiceDate(iso)}
                        </button>
                      ))}
                    <button
                      onClick={() => {
                        setShowNativeDateInput(true);
                        setShowDateDropdown(false);
                      }}
                      className="px-3 py-2 mt-2 w-full text-left rounded border-t hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Select a different date...
                    </button>
                  </div>
                )}

                {showNativeDateInput && (
                  <input
                    type="date"
                    value={selectedDateIso}
                    onChange={(e) => {
                      setSelectedDateIso(e.target.value);
                      setDateWasEverSelected(true);
                    }}
                    className="w-full mt-2 border-[1px] border-input outline-none rounded-md px-3 h-12"
                  />
                )}
              </div>
            )}

            {isDateSelected && (
              <div
                className="opacity-0 transition-all duration-500 ease-in-out translate-y-4 animate-fadein"
                style={{
                  animationDelay: "0.2s",
                  animationFillMode: "forwards",
                }}
              >
                <label className="block mb-4 text-base font-medium text-gray-900">
                  Select a Time
                </label>

                {times.length === 0 ? (
                  <div className="p-4 text-center text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                    No available time slots for this date.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                    {times.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={slot.booked}
                        onClick={() => {
                          setSelectedTime(slot.time);
                          setTimeWasEverSelected(true);
                        }}
                        className={`h-10 rounded-md text-sm font-medium transition-all ${
                          slot.booked
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : selectedTime === slot.time
                            ? "bg-[#004F97] text-white shadow-md"
                            : "bg-white  border border-gray-300 dark:border-gray-600 text-gray-900 hover:border-[#004F97] hover:bg-[#004F97]/5"
                        }`}
                      >
                        {slot.booked ? "Booked" : slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {isTimeFilled && (
            <>
              <div
                className="opacity-0 transition-all duration-500 ease-in-out translate-y-4 animate-fadein"
                style={{
                  animationDelay: "0.3s",
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex gap-2 items-center p-4 mt-6 text-blue-900 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className=""
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <span className="font-medium">
                    Selected: {formatNiceDate(selectedDateIso)} at{" "}
                    {selectedTime}
                  </span>
                </div>
                <button
                  onClick={handleContinue}
                  className="inline-flex items-center justify-center gap-2 w-full mt-6 h-12 bg-[#004F97] hover:bg-[#004F97]/90 text-white text-base font-medium rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
