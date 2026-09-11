import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CredentialsStep from "./login/CredentialsStep";
import ForgotPasswordStep from "./login/ForgotPasswordStep";
import ForgotCodeStep from "./login/ForgotCodeStep";
import NewPasswordStep from "./login/NewPasswordStep";
import LoginSuccess from "./login/LoginSuccess";

const API_URL = "https://reed-backend-lcjv.onrender.com";

function normalizeContact(contact: string, type: "email" | "phone") {
  if (type === "email") return contact.trim();

  const value = contact.trim().replace(/[\s()-]/g, "");

  if (value.startsWith("+")) return value;
  if (value.startsWith("234")) return `+${value}`;
  if (value.startsWith("0")) return `+234${value.slice(1)}`;

  return value;
}

type LoginProps = {
  onLogin: (token: string, firstName: string) => void;
};

type Step = "credentials" | "forgot" | "forgotCode" | "newPassword" | "success";

function Login({ onLogin }: LoginProps) {
  const [step, setStep] = useState<Step>("credentials");

  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");

  const [resetContact, setResetContact] = useState("");
  const [resetContactType, setResetContactType] = useState<"email" | "phone">("phone");
  const [resetChannel, setResetChannel] = useState<"sms" | "whatsapp">("sms");
  const [resetCode, setResetCode] = useState("");
  const [resetVerifiedToken, setResetVerifiedToken] = useState("");

  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotCodeError, setForgotCodeError] = useState("");
  const [forgotCodeLoading, setForgotCodeLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Incorrect email/phone or password. Please try again.");
        return;
      }

      setFirstName(data.user.first_name);
      onLogin(data.token, data.user.first_name);
      setStep("success");
    } catch {
      setError("Could not reach server");
    } finally {
      setLoading(false);
    }
  }

  async function sendResetCode() {
    setForgotError("");
    setForgotLoading(true);
    try {
      const res = await fetch(`${API_URL}/verify/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: normalizeContact(resetContact, resetContactType),
          channel: resetContactType === "email" ? "email" : resetChannel,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setForgotError(data.error?.formErrors?.[0] || data.error || "Could not send code");
        return;
      }
      setStep("forgotCode");
    } catch {
      setForgotError("Could not reach server");
    } finally {
      setForgotLoading(false);
    }
  }

  async function confirmResetCode() {
    setForgotCodeError("");
    setForgotCodeLoading(true);
    try {
      const res = await fetch(`${API_URL}/verify/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: normalizeContact(resetContact, resetContactType),
          code: resetCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setForgotCodeError(data.error || "Invalid or expired code");
        return;
      }
      setResetVerifiedToken(data.verified_token);
      setStep("newPassword");
    } catch {
      setForgotCodeError("Could not reach server");
    } finally {
      setForgotCodeLoading(false);
    }
  }

  async function resetPassword(newPassword: string) {
    setResetError("");
    setResetLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: resetContact,
          new_password: newPassword,
          verified_token: resetVerifiedToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResetError(data.error?.formErrors?.[0] || data.error || "Could not reset password");
        return;
      }
      setContact(resetContact);
      setPassword("");
      setStep("credentials");
    } catch {
      setResetError("Could not reach server");
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <div className="bg-[#F1F5F9] min-h-screen flex items-center justify-center py-8 px-4">
      <div className="bg-white rounded-2xl border border-[#4682B4] p-8 w-full max-w-sm flex flex-col gap-4">
        {step === "credentials" && (
          <CredentialsStep
            contact={contact}
            password={password}
            error={error}
            loading={loading}
            onContactChange={setContact}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            onForgotPassword={() => setStep("forgot")}
          />
        )}

        {step === "forgot" && (
          <ForgotPasswordStep
            contact={resetContact}
            channel={resetChannel}
            contactType={resetContactType}
            error={forgotError}
            loading={forgotLoading}
            onContactChange={setResetContact}
            onContactTypeChange={setResetContactType}
            onChannelChange={setResetChannel}
            onSendCode={sendResetCode}
            onBack={() => setStep("credentials")}
          />
        )}

        {step === "forgotCode" && (
          <ForgotCodeStep
            contact={resetContact}
            code={resetCode}
            error={forgotCodeError}
            loading={forgotCodeLoading}
            onCodeChange={setResetCode}
            onVerify={confirmResetCode}
            onBack={() => setStep("forgot")}
          />
        )}

        {step === "newPassword" && (
          <NewPasswordStep
            error={resetError}
            loading={resetLoading}
            onReset={resetPassword}
            onBack={() => setStep("forgotCode")}
          />
        )}

        {step === "success" && (
          <LoginSuccess firstName={firstName} onContinue={() => navigate("/")} />
        )}
      </div>
    </div>
  );
}

export default Login;
