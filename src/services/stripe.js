const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export async function createPaymentIntent({ amount, currency = "usd", metadata }) {
  const response = await fetch(`${API_BASE_URL}/api/payments/create-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency,
      metadata,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to create payment intent.");
  }

  return response.json();
}
