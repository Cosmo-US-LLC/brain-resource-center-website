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

export default function StepOne({ onContinue }) {
  const conditions = [
    "ADHD",
    "Anxiety",
    "Depression",
    "Sleep Issues",
    "Migraines",
    "My condition isn't listed",
  ];

  const dateOptionsIso = [
    "2025-12-04",
    "2025-12-05",
    "2025-12-06",
    "2025-12-08",
    "2025-12-09",
    "2025-12-10",
    "2025-12-11",
    "2025-12-12",
    "2025-12-13",
    "2025-12-15",
  ];

  const times = [
    { time: "9:00am", booked: false },
    { time: "9:30am", booked: false },
    { time: "10:00am", booked: false },
    { time: "10:30am", booked: false },
    { time: "11:00am", booked: true },
    { time: "11:30am", booked: false },
    { time: "12:00pm", booked: true },
    { time: "12:30pm", booked: false },
    { time: "1:00pm", booked: true },
    { time: "1:30pm", booked: false },
    { time: "2:00pm", booked: true },
    { time: "2:30pm", booked: false },
  ];

  const [condition, setCondition] = useState("");
  const [customCondition, setCustomCondition] = useState("");
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);

  const [selectedDateIso, setSelectedDateIso] = useState("2025-12-05");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showNativeDateInput, setShowNativeDateInput] = useState(false);

  const [selectedTime, setSelectedTime] = useState("");

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
      condition: condition === "My condition isn't listed" ? customCondition : condition,
      selectedDateIso,
      selectedTime,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 lg:p-12">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">
            Book Your Consultation
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-center">
            Select the condition you need treatment for and choose your appointment time
          </p>

          <div className="space-y-8">
            <div ref={conditionRef}>
              <label className="text-base font-medium text-gray-900 dark:text-gray-100" htmlFor="condition">
                What do you need treatment for?
              </label>
              <button
                type="button"
                onClick={() => setShowConditionDropdown((s) => !s)}
                className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 mt-2 h-12 text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <span>{condition || "Select condition"}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>

              {showConditionDropdown && (
                <div className="mt-2 border rounded-md bg-white dark:bg-gray-900 shadow p-2 max-h-60 overflow-y-auto">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCondition(c);
                        setShowConditionDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
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
                  className="w-full mt-3 border rounded-md px-3 h-12"
                />
              )}
            </div>

            <div ref={dateRef}>
              <label className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4 block">
                Select a Date
              </label>
              <button
                className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 mt-2 h-12 text-base focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => {
                  setShowDateDropdown((s) => !s);
                  setShowNativeDateInput(false);
                }}
              >
                <span>{formatNiceDate(selectedDateIso)}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>

              {showDateDropdown && (
                <div className="mt-2 border rounded-md bg-white dark:bg-gray-900 shadow p-2 max-h-60 overflow-y-auto">
                  {dateOptionsIso.map((iso) => (
                    <button
                      key={iso}
                      onClick={() => {
                        setSelectedDateIso(iso);
                        setShowDateDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                      {formatNiceDate(iso)}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowNativeDateInput(true);
                      setShowDateDropdown(false);
                    }}
                    className="mt-2 w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded border-t"
                  >
                    Select a different date...
                  </button>
                </div>
              )}

              {showNativeDateInput && (
                <input
                  type="date"
                  value={selectedDateIso}
                  onChange={(e) => setSelectedDateIso(e.target.value)}
                  className="w-full mt-2 border rounded-md px-3 h-12"
                />
              )}
            </div>

            <div>
              <label className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4 block">
                Select a Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {times.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={slot.booked}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`h-10 rounded-md text-sm font-medium transition-all ${
                      slot.booked
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : selectedTime === slot.time
                        ? "bg-[#004F97] text-white shadow-md"
                        : "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-[#004F97] hover:bg-[#004F97]/5"
                    }`}
                  >
                    {slot.booked ? "Booked" : slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedTime && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6 flex items-center gap-2 text-blue-900 dark:text-blue-100">
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
              <span className="font-medium">
                Selected: {formatNiceDate(selectedDateIso)} at {selectedTime}
              </span>
            </div>
          )}

          <button
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 w-full mt-6 h-12 bg-[#004F97] hover:bg-[#004F97]/90 text-white text-base font-medium rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
