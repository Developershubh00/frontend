import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Send,
} from "lucide-react";
import { authAPI } from "../services/api";

/**
 * Forgot Password Page Component
 * Handles password reset request via email
 * API Integration: POST /api/auth/forgot-password/
 */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /**
   * Handle forgot password submission
   * API Integration: POST /api/auth/forgot-password/
   */
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await authAPI.forgotPassword(email);
      
      if (response.data.success) {
        setSuccess(true);
        setEmail("");
      } else {
        setError(response.data.error || "Failed to send reset email. Please try again.");
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Login</span>
          </Link>

          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-64 h-24 bg-white flex items-center justify-center mx-auto mb-4">
              <img
                src="/media/logo3.png"
                alt="BD Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Forgot Password?
            </h1>
            <p className="text-slate-600">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-700 text-sm font-medium mb-1">
                    Reset link sent successfully!
                  </p>
                  <p className="text-green-600 text-xs">
                    Please check your email inbox and spam folder for the password reset link.
                    The link will expire in 1 hour.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Forgot Password Form */}
          {!success ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50 transition-all duration-200 text-black placeholder-slate-400"
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  setError("");
                }}
                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-xl"
              >
                Send Another Link
              </button>
              <Link
                to="/login"
                className="block w-full text-center py-4 border-2 border-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-200"
              >
                Back to Login
              </Link>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Powered By */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              Powered by
            </p>
            <p className="text-sm text-slate-800 font-medium tracking-wide">
              Believers Destination
            </p>
          </div>

          {/* Decorative Element */}
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;