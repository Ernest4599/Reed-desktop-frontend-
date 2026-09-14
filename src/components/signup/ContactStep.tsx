import StepDots from "./StepDots";

type ContactStepProps = {
  contactType: "email" | "phone";
  contact: string;
  channel: "sms" | "whatsapp";
  error: string;
  loading: boolean;
  onContactTypeChange: (v: "email" | "phone") => void;
  onContactChange: (v: string) => void;
  onChannelChange: (v: "sms" | "whatsapp") => void;
  onNext: () => void;
};

function ContactStep({
  contactType, contact, channel, error, loading,
  onContactTypeChange: _onContactTypeChange, onContactChange, onChannelChange, onNext,
}: ContactStepProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">Verify your contact</h1>
      <p className="text-slate-400 text-center text-sm">Enter your email address. (Phone/SMS verification coming soon)</p>

      {error && <div className="text-sm text-red-500 text-center">{error}</div>}

      {/* Phone/SMS temporarily disabled pending SMS provider approval */}

      <input
        type={contactType === "email" ? "email" : "tel"}
        placeholder={contactType === "email" ? "Enter email address" : "Enter phone number"}
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
        onClick={onNext}
        disabled={!contact || loading}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send code"}
      </button>
      <StepDots total={5} current={1} />
    </>
  );
}

export default ContactStep;
