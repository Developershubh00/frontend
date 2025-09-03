import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Edit3,
  X,
  Shield,
} from "lucide-react";

interface VerificationPageProps {
  userEmail?: string;
  userPhone?: string;
  signupData?: any;
  onVerificationSuccess?: () => void;
  onBack?: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({
  userEmail = "user@example.com",
  userPhone = "+91 98765 43210",
  signupData,
  onVerificationSuccess,
  onBack,
}) => {
  const [verificationMethod, setVerificationMethod] = useState<"email" | "sms" | "whatsapp">("email");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [contactInfo, setContactInfo] = useState({
    email: signupData?.email || userEmail,
    phone: signupData?.phone || userPhone,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);

  // Countdown timer for resend
  useEffect(() => {
    if (timeLeft > 0 && codeSent && !isBlocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && codeSent) {
      setCanResend(true);
    }
  }, [timeLeft, codeSent, isBlocked]);

  // Block timer for too many attempts
  useEffect(() => {
    if (blockTimeLeft > 0) {
      const timer = setTimeout(() => setBlockTimeLeft(blockTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (blockTimeLeft === 0 && isBlocked) {
      setIsBlocked(false);
      setAttemptCount(0);
    }
  }, [blockTimeLeft, isBlocked]);

  // Auto-send code on mount
  useEffect(() => {
    if (signupData) {
      sendVerificationCode();
    }
  }, []);

  // Handle code input
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when all 6 digits are entered
    if (value && index === 5) {
      const completeCode = [...newCode];
      if (completeCode.every(digit => digit !== "")) {
        setTimeout(() => verifyCode(completeCode.join("")), 500);
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Send verification code
  const sendVerificationCode = async () => {
    if (isBlocked) {
      setError(`Too many attempts. Please wait ${Math.floor(blockTimeLeft / 60)}:${(blockTimeLeft % 60).toString().padStart(2, '0')} before trying again.`);
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const contact = verificationMethod === "email" ? contactInfo.email : contactInfo.phone;
      
      // Validate contact info
      if (verificationMethod === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact)) {
          throw new Error("Please enter a valid email address");
        }
      } else {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(contact.replace(/\s|-/g, ""))) {
          throw new Error("Please enter a valid phone number");
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset timer
      setTimeLeft(60);
      setCanResend(false);
      setCodeSent(true);
      
      console.log(`Verification code sent via ${verificationMethod} to ${contact}`);
    } catch (error: any) {
      setError(error.message || "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify code
  const verifyCode = async (codeToVerify?: string) => {
    const code = codeToVerify || verificationCode.join("");
    
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    if (isBlocked) {
      setError(`Account temporarily blocked. Please wait ${Math.floor(blockTimeLeft / 60)}:${(blockTimeLeft % 60).toString().padStart(2, '0')}`);
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo - accept specific codes or any code except "000000"
      const validCodes = ["123456", "111111", "999999"];
      if (code === "000000" || (!validCodes.includes(code) && Math.random() < 0.3)) {
        throw new Error("Invalid verification code. Please try again.");
      }

      // Success
      setSuccess(true);
      setShowSuccessPopup(true);
      setAttemptCount(0);
      
      // Auto-redirect after success popup
      setTimeout(() => {
        if (onVerificationSuccess) {
          onVerificationSuccess();
        }
      }, 2500);
      
    } catch (error: any) {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      
      // Block after 5 failed attempts
      if (newAttemptCount >= 5) {
        setIsBlocked(true);
        setBlockTimeLeft(300); // 5 minutes
        setError("Too many failed attempts. Account blocked for 5 minutes.");
      } else {
        setError(`${error.message} (${newAttemptCount}/5 attempts)`);
      }
      
      setVerificationCode(["", "", "", "", "", ""]);
      // Focus first input
      setTimeout(() => {
        document.getElementById("code-0")?.focus();
      }, 100);
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend code
  const resendCode = async () => {
    setVerificationCode(["", "", "", "", "", ""]);
    setTimeLeft(60);
    setCanResend(false);
    setError("");
    await sendVerificationCode();
  };

  // Update contact info
  const updateContactInfo = () => {
    setIsEditing(false);
    setCodeSent(false);
    setTimeLeft(60);
    setCanResend(false);
    setError("");
    setVerificationCode(["", "", "", "", "", ""]);
  };

  // Cancel editing
  const cancelEditing = () => {
    setContactInfo({
      email: signupData?.email || userEmail,
      phone: signupData?.phone || userPhone,
    });
    setIsEditing(false);
  };

  const getMethodIcon = () => {
    switch (verificationMethod) {
      case "email": return <Mail className="w-5 h-5" />;
      case "sms": return <Phone className="w-5 h-5" />;
      case "whatsapp": return <MessageCircle className="w-5 h-5" />;
    }
  };

  const getContactDisplay = () => {
    if (verificationMethod === "email") {
      return contactInfo.email;
    }
    return contactInfo.phone;
  };

  const maskContact = (contact: string, isEmail: boolean) => {
    if (!contact) return "";
    if (isEmail) {
      const [username, domain] = contact.split("@");
      if (username && domain) {
        return `${username.slice(0, 2)}***@${domain}`;
      }
      return contact;
    } else {
      return `***-***-${contact.slice(-4)}`;
    }
  };

  const handleMethodChange = (method: "email" | "sms" | "whatsapp") => {
    setVerificationMethod(method);
    setVerificationCode(["", "", "", "", "", ""]);
    setCodeSent(false);
    setTimeLeft(60);
    setCanResend(false);
    setError("");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 relative">
            {/* Back Button */}
            {onBack && (
              <button
                onClick={onBack}
                className="absolute top-4 left-4 p-2 hover:bg-slate-100 rounded-xl transition-colors"
                disabled={isVerifying || isLoading}
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
            )}

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 mt-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <img
                    src="/media/logo.png"
                    alt="BD Logo"
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg items-center justify-center text-white font-bold text-sm hidden">
                    BD
                  </div>
                </div>
              </div>
              
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                Verify Your Account
              </h1>
              <p className="text-slate-600 text-sm">
                {!codeSent ? "Choose your preferred verification method" : "Enter the verification code we sent you"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Block Warning */}
            {isBlocked && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start space-x-2">
                <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-blue-700 text-sm">
                  <p className="font-medium mb-1">Account Temporarily Blocked</p>
                  <p>Time remaining: {formatTime(blockTimeLeft)}</p>
                </div>
              </div>
            )}

            {/* Verification Method Selection */}
            {!codeSent && (
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Verification Method
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { key: "email", icon: Mail, label: "Email" },
                    { key: "sms", icon: Phone, label: "SMS" },
                    { key: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ key, icon: Icon, label }) => (
                    <button
                      key={key}
                      onClick={() => handleMethodChange(key as any)}
                      disabled={isLoading || isBlocked}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        verificationMethod === key
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info Display/Edit */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">
                  {verificationMethod === "email" ? "Email Address" : "Phone Number"}
                </label>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={isLoading || isVerifying || isBlocked}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Edit3 className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                      {getMethodIcon()}
                    </div>
                    <input
                      type={verificationMethod === "email" ? "email" : "tel"}
                      value={verificationMethod === "email" ? contactInfo.email : contactInfo.phone}
                      onChange={(e) => setContactInfo({
                        ...contactInfo,
                        [verificationMethod === "email" ? "email" : "phone"]: e.target.value
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                      placeholder={verificationMethod === "email" ? "Enter email" : "Enter phone number"}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={updateContactInfo}
                      className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Update & Send Code
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl flex items-center space-x-3">
                  <div className="text-slate-500">
                    {getMethodIcon()}
                  </div>
                  <span className="text-slate-700 flex-1 text-sm sm:text-base">
                    {codeSent ? maskContact(getContactDisplay(), verificationMethod === "email") : getContactDisplay()}
                  </span>
                </div>
              )}
            </div>

            {/* Send Code Button */}
            {!codeSent && !isEditing && (
              <button
                onClick={sendVerificationCode}
                disabled={isLoading || isBlocked}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4 sm:mb-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base">Sending Code...</span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-base">
                    Send Code via {verificationMethod.charAt(0).toUpperCase() + verificationMethod.slice(1)}
                  </span>
                )}
              </button>
            )}

            {/* Verification Code Input */}
            {codeSent && (
              <>
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Enter 6-Digit Code
                  </label>
                  <div className="flex justify-between space-x-1 sm:space-x-2">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value.replace(/[^0-9]/g, ""))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        disabled={isVerifying || isBlocked}
                        className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-bold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="0"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Code will auto-verify when complete
                  </p>
                </div>

                {/* Timer and Resend */}
                <div className="flex items-center justify-between mb-4 sm:mb-6 text-sm">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {canResend ? "Code expired" : `Resend in ${formatTime(timeLeft)}`}
                    </span>
                  </div>
                  <button
                    onClick={resendCode}
                    disabled={!canResend || isLoading || isBlocked}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Resend</span>
                  </button>
                </div>

                {/* Manual Verify Button */}
                <button
                  onClick={() => verifyCode()}
                  disabled={isVerifying || verificationCode.join("").length !== 6 || isBlocked}
                  className="w-full bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isVerifying ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Verifying...</span>
                    </div>
                  ) : (
                    <span className="text-sm sm:text-base">Verify Account</span>
                  )}
                </button>

                {/* Try Different Method */}
                <div className="text-center mb-4">
                  <button
                    onClick={() => handleMethodChange(verificationMethod === "email" ? "sms" : "email")}
                    disabled={isLoading || isVerifying || isBlocked}
                    className="text-sm text-slate-600 hover:text-slate-800 underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Try a different verification method
                  </button>
                </div>
              </>
            )}

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Need Help?</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Check your spam/junk folder for email codes</li>
                <li>• Ensure you have network connectivity</li>
                <li>• Try switching between SMS/Email/WhatsApp</li>
                <li>• Demo codes: 123456, 111111, 999999 (avoid 000000)</li>
                <li>• Contact support if issues persist</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl transform transition-all duration-500 scale-100">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-bounce" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
              🎉 Verification Successful!
            </h2>
            <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Your account has been verified successfully. Redirecting to dashboard...
            </p>
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationPage;