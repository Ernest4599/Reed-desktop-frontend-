import { useState } from "react";
import { Plus, Paperclip, FolderOpen, Mic, RotateCcw, Send, Menu } from "lucide-react";

export default function RAI() {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (message.trim() === "") return;
    console.log("Sending:", message);
    setMessage("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 73px)" }}>
      <div style={{ padding: "16px 24px" }}>
        <button
          style={{
            height: "36px",
            width: "36px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Menu size={18} />
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: 0, color: "#4682B4" }}>RAI</h1>
        <p style={{ color: "#94a3b8", marginTop: "8px" }}>How can I help you today?</p>
      </div>

      <div style={{ padding: "16px 24px 24px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid #e2e8f0",
            borderRadius: "9999px",
            padding: "8px 8px 8px 16px",
          }}
        >
          <button
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "9999px",
              border: "1px solid #4682B4",
              color: "#4682B4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Plus size={16} />
          </button>
          <input
            type="text"
            placeholder="Message RAI..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ border: "none", outline: "none", flex: 1, fontSize: "14px", backgroundColor: "white", color: "black" }}
          />
          <button
            onClick={handleSend}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "#4682B4",
              color: "white",
            }}
          >
            <Send size={14} />
            Send
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "9999px",
                border: "1px solid #e2e8f0",
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              <Paperclip size={14} />
              Attach
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "9999px",
                border: "1px solid #e2e8f0",
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              <FolderOpen size={14} />
              Browse Context
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "9999px",
                border: "1px solid #e2e8f0",
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              <Mic size={14} />
              Voice
            </button>
          </div>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "9999px",
              border: "1px solid #e2e8f0",
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            <RotateCcw size={14} />
            New Thread
          </button>
        </div>
      </div>
    </div>
  );
}
