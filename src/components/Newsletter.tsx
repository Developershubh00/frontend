// src/components/Newsletter.tsx
import React, { useState } from "react";


type ApiResponse = {
  status: "success" | "error";
  message?: string;
};

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter(): JSX.Element {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const webAppUrl = import.meta.env.VITE_SHEET_WEBAPP_URL as string | undefined;

  const handleSubscribe = async () => {
    setMessage(null);

    if (!email || !EMAIL_REGEX.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!webAppUrl) {
      setMessage("Subscription service not configured. Contact admin.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(webAppUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      // Apps Script returns JSON with status/message
      const json: ApiResponse = await res.json();

      if (json.status === "success") {
        setMessage("✅ Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage(json.message ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Subscribe error:", err);
      setMessage("⚠️ Network or server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated with Latest NEET Guidelines
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Get the latest updates on NEET counselling, admission guidelines,
          and expert insights delivered to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={onEnter}
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Email address"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Subscribe Now"}
          </button>
        </div>

        {message && (
          <p className="text-blue-100 text-sm mt-4" role="status">
            {message}
          </p>
        )}

        <p className="text-blue-100 text-sm mt-2">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
