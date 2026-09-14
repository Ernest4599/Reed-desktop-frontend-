import { useEffect, useRef } from "react";

const GOOGLE_CLIENT_ID = "1001212229769-7pavtf6lti6odhq3sgjpjr732grir0kf.apps.googleusercontent.com";
const API_URL = "https://reed-backend-lcjv.onrender.com";

declare global {
  interface Window {
    google?: any;
  }
}

type GoogleButtonProps = {
  onSuccess: (token: string, firstName: string) => void;
  onError: (message: string) => void;
};

function GoogleButton({ onSuccess, onError }: GoogleButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response: { credential: string }) => {
        try {
          const res = await fetch(`${API_URL}/auth/google/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: response.credential }),
          });
          const data = await res.json();

          if (!res.ok) {
            onError(data.error || "Google sign-in failed");
            return;
          }

          onSuccess(data.token, data.user.first_name);
        } catch {
          onError("Could not reach server");
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      width: buttonRef.current.offsetWidth,
      text: "continue_with",
    });
  }, [onSuccess, onError]);

  return <div ref={buttonRef} className="w-full flex justify-center" />;
}

export default GoogleButton;
