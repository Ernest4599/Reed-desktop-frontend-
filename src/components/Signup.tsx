import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "./signup/Welcome";
import AccountStep from "./signup/AccountStep";
import ContactStep from "./signup/ContactStep";
import VerifyStep from "./signup/VerifyStep";
import DobStep from "./signup/DobStep";
import PasswordStep from "./signup/PasswordStep";
import Processing from "./signup/Processing";
import Success from "./signup/Success";

const API_URL = "https://reed-backend-lcjv.onrender.com";

function normalizeContact(contact: string, type: "email" | "phone") {
  if (type === "email") return contact.trim();

  const value = contact.trim().replace(/[\s()-]/g, "");

  if (value.startsWith("+")) return value;
  if (value.startsWith("234")) return `+${value}`;
  if (value.startsWith("0")) return `+234${value.slice(1)}`;

  return value;
}

type SignupProps = {
  onLogin: (token: string, firstName: string) => void;
};

type Step = "welcome" | "account" | "contact" | "verify" | "dob" | "password" | "processing" | "success";

function Signup({ onLogin }: SignupProps) {
  const [step, setStep] = useState<Step>("welcome");

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [channel, setChannel] = useState<"sms" | "whatsapp">("sms");
  const [code, setCode] = useState("");
  const [verifiedToken, setVerifiedToken] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [password, setPassword] = useState("");

  const [contactError, setContactError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleError, setGoogleError] = useState("");

  const navigate = useNavigate();

  async function sendCode() {
    setContactError("");
    setContactLoading(true);
    try {
      const res = await fetch(`${API_URL}/verify/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: normalizeContact(contact, contactType),
          channel: contactType === "email" ? "email" : channel,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setContactError(data.error?.formErrors?.[0] || data.error || "Could not send code");
        return;
      }
      setStep("verify");
    } catch {
      setContactError("Could not reach server");
    } finally {
      setContactLoading(false);
    }
  }

  async function confirmCode() {
    setVerifyError("");
    setVerifyLoading(true);
    try {
      const res = await fetch(`${API_URL}/verify/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: normalizeContact(contact, contactType),
          code,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setVerifyError(data.error || "Invalid or expired code");
        return;
      }
      setVerifiedToken(data.verified_token);
      setStep("dob");
    } catch {
      setVerifyError("Could not reach server");
    } finally {
      setVerifyLoading(false);
    }
  }

  async function finishSignup() {
    setStep("processing");
    setError("");
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          surname,
          contact: normalizeContact(contact, contactType),
          contact_type: contactType,
          date_of_birth: dob,
          gender,
          password,
          verified_token: verifiedToken,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.formErrors?.[0] || JSON.stringify(data.error) || "Signup failed");
        setStep("password");
        return;
      }

      onLogin(data.token, data.user.first_name);
      setStep("success");
    } catch {
      setError("Could not reach server");
      setStep("password");
    }
  }

  return (
    <div className="bg-[#F1F5F9] min-h-screen flex items-center justify-center py-8 px-4">
      <div className="bg-white rounded-2xl border border-[#4682B4] p-8 w-full max-w-sm flex flex-col gap-4">
        {step === "welcome" && (
          <Welcome
            onNext={() => setStep("account")}
            onGoogleSuccess={onLogin}
            onGoogleError={setGoogleError}
            googleError={googleError}
          />
        )}

        {step === "account" && (
          <AccountStep
            firstName={firstName}
            surname={surname}
            onFirstNameChange={setFirstName}
            onSurnameChange={setSurname}
            onNext={() => setStep("contact")}
          />
        )}

        {step === "contact" && (
          <ContactStep
            contactType={contactType}
            contact={contact}
            channel={channel}
            error={contactError}
            loading={contactLoading}
            onContactTypeChange={setContactType}
            onContactChange={setContact}
            onChannelChange={setChannel}
            onNext={sendCode}
          />
        )}

        {step === "verify" && (
          <VerifyStep
            contact={contact}
            code={code}
            error={verifyError}
            loading={verifyLoading}
            onCodeChange={setCode}
            onNext={confirmCode}
          />
        )}

        {step === "dob" && (
          <DobStep
            dob={dob}
            gender={gender}
            onDobChange={setDob}
            onGenderChange={setGender}
            onNext={() => setStep("password")}
          />
        )}

        {step === "password" && (
          <PasswordStep
            password={password}
            error={error}
            onPasswordChange={setPassword}
            onSubmit={finishSignup}
          />
        )}

        {step === "processing" && <Processing />}

        {step === "success" && (
          <Success firstName={firstName} onStartExploring={() => navigate("/")} />
        )}
      </div>
    </div>
  );
}

export default Signup;
