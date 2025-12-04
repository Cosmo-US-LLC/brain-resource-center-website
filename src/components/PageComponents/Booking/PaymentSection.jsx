import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const cardElementStyle = {
  style: {
    base: {
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "16px",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#dc2626",
      iconColor: "#dc2626",
    },
  },
};

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "PK", name: "Pakistan" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
];

export default function PaymentSection({
  // amount,
  clientSecret,
  bookingDetails,
  onPayLater,
  onPaymentCompleted,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState(bookingDetails?.fullName || "");
  const [country, setCountry] = useState("US");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  // const formattedAmount = useMemo(() => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 0,
  //   }).format(amount);
  // }, [amount]);

  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setError("");

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: cardholderName || bookingDetails?.fullName,
            email: bookingDetails?.email,
            phone: bookingDetails?.phone,
            address: {
              country,
            },
          },
        },
        receipt_email: bookingDetails?.email,
      });

      if (stripeError) {
        setError(stripeError.message || "Unable to process payment. Please verify your card details.");
        return;
      }

      onPaymentCompleted?.({
        paymentIntentId: paymentIntent?.id,
        paymentStatus: paymentIntent?.status,
      });
    } catch (submissionError) {
      setError(submissionError.message || "Something went wrong while processing the payment.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="">

      <div className="mb-4 flex items-center gap-2 text-[#0E8A00] text-sm font-medium">
        <span role="img" aria-label="secure">
          🔒
        </span>
        Secure, fast checkout with Link
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardholder">
        Name on card
      </label>
      <input
        id="cardholder"
        className="w-full h-12 px-3 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-[#004F97]"
        placeholder="John Smith"
        value={cardholderName}
        onChange={(event) => setCardholderName(event.target.value)}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
        <div className="flex h-12 items-center px-3 rounded-md border border-gray-300 bg-white">
          <CardNumberElement options={cardElementStyle} className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration date</label>
          <div className="flex h-12 items-center px-3 rounded-md border border-gray-300 bg-white">
            <CardExpiryElement options={cardElementStyle} className="w-full" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Security code</label>
          <div className="flex h-12 items-center px-3 rounded-md border border-gray-300 bg-white">
            <CardCvcElement options={cardElementStyle} className="w-full" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">
            Country
          </label>
          <select
            id="country"
            className="w-full h-12 px-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#004F97]"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          >
            {countries.map((countryOption) => (
              <option key={countryOption.code} value={countryOption.code}>
                {countryOption.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span role="img" aria-label="ssl">
            🔐
          </span>
          256-bit SSL encrypted payment
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
          <span role="img" aria-label="pci">
            🛡️
          </span>
          PCI DSS compliant secure checkout
        </div>
      </div>

      {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={processing || !clientSecret}
          className="bg-[#004F97] hover:bg-[#003d73] text-white h-12 rounded-md font-medium disabled:opacity-50 disabled:pointer-events-none"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
        <button
          type="button"
          onClick={() => onPayLater?.()}
          className="bg-[#1F4DA1] hover:bg-[#173c7c] text-white h-12 rounded-md font-medium"
        >
          Pay Later
        </button>
      </div>
    </div>
  );
}
