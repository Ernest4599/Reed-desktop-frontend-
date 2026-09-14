type ForgotPasswordStepProps = {
  contact: string;
  channel: "sms" | "whatsapp";
  contactType: "email" | "phone";
  error: string;
  loading: boolean;
  onContactChange: (v: string) => void;
  onContactTypeChange: (v: "email" | "phone") => void;
  onChannelChange: (v: "sms" | "whatsapp") => void;
  onSendCode: () => void;
  onBack: () => void;
};

function ForgotPasswordStep({
  contact, channel, contactType, error, loading,
  onContactChange, onContactTypeChange: _onContactTypeChange, onChannelChange, onSendCode, onBack,
}: ForgotPasswordStepProps) {
  return (
    <>
      <button onClick={onBack} className="text-slate-400 text-sm text-left" type="button">← Back</button>
      <h1 className="text-2xl font-semibold text-center">Reset Your Password</h1>
      <p className="text-slate-400 text-center text-sm">Enter your email and we'll send you a code to reset your password.</p>

      {error && <div className="text-sm text-red-500 text-center">{error}</div>}

      {/* Phone/SMS temporarily disabled pending SMS provider approval */}

      <input
        type="text"
        placeholder="Email address"
        value={contact}
        onChange={(e) => onContactChange(e.target.value)}
        className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4]"
        required
      />

      {contactType === "phone" && (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => onChannelChange("sms")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${channel === "sms" ? "bg-[#4682B4] text-white" : "bg-slate-100 text-slate-500"}`}
          >
            Send via SMS
          </button>
          <button
            onClick={() => onChannelChange("whatsapp")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${channel === "whatsapp" ? "bg-[#4682B4] text-white" : "bg-slate-100 text-slate-500"}`}
          >
            Send via WhatsApp
          </button>
        </div>
      )}

      <button
        onClick={onSendCode}
        disabled={!contact || loading}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Code"}
      </button>
    </>
  );
}

export default ForgotPasswordStep;
