import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CreditCard, Lock, Shield } from "lucide-react";

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

export default function PaymentSection({
  // amount,
  clientSecret,
  bookingDetails,
  onPayLater,
  onPaymentCompleted,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState(
    bookingDetails?.fullName || ""
  );
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
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: cardholderName || bookingDetails?.fullName,
              email: bookingDetails?.email,
              phone: bookingDetails?.phone,
            },
          },
          receipt_email: bookingDetails?.email,
        });

      if (stripeError) {
        setError(
          stripeError.message ||
            "Unable to process payment. Please verify your card details."
        );
        return;
      }

      onPaymentCompleted?.({
        paymentIntentId: paymentIntent?.id,
        paymentStatus: paymentIntent?.status,
      });
    } catch (submissionError) {
      setError(
        submissionError.message ||
          "Something went wrong while processing the payment."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="cardholder"
      >
        Name on card
      </label>
      <input
        id="cardholder"
        className="w-full h-9 px-3 rounded-[5px] border border-gray-300 mb-4 focus:outline-none"
        placeholder="John Smith"
        value={cardholderName}
        onChange={(event) => setCardholderName(event.target.value)}
      />

      <div className="mb-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card number
        </label>
        <div className="flex h-11 items-center px-3 rounded-[5px] border border-[#E6E6E6] bg-white shadow shadow-neutral-500/5">
          <CardNumberElement options={cardElementStyle} className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiration date
          </label>
          <div className="flex h-11 items-center px-3 rounded-[5px] border border-[#E6E6E6] bg-white shadow shadow-neutral-500/5">
            <CardExpiryElement options={cardElementStyle} className="w-full" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Security code
          </label>
          <div className="flex h-11 items-center px-3 rounded-[5px] border border-[#E6E6E6] bg-white shadow shadow-neutral-500/5 relative">
            <CardCvcElement options={cardElementStyle} className="w-full" />
            <div className="absolute right-5 text-[#96969D]">
              <CreditCard className="w-7 h-7 stroke-1" />
              <div className="absolute right-0 bottom-0 pl-0.5 bg-white text-[9px] font-mono">123</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F9FAFB] rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3 text-sm text-[#4B5564]">
          <span role="img" aria-label="ssl">
            <Lock className="w-4 h-4 text-[#1A4F97]" />
          </span>
          256-bit SSL encrypted payment
        </div>
        <div className="flex items-center gap-3 text-sm text-[#4B5564] mt-2">
          <span role="img" aria-label="pci">
            <Shield className="w-4 h-4 text-[#1A4F97]" />
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
          className="bg-[#1A4F97] hover:bg-[#1A4F97] text-white h-12 rounded-[5px] font-medium disabled:opacity-50 disabled:pointer-events-none"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
        {/* <button
          type="button"
          onClick={() => onPayLater?.()}
          className="bg-[#1A4F97] hover:bg-[#1A4F97] text-white h-12 rounded-[5px] font-medium"
        >
          Pay Later
        </button> */}
      </div>
    </div>
  );
}
