import { useState } from "react";
import { Pencil, Menu, Share2, ChevronDown } from "lucide-react";

type Tab = "Posts" | "Reels" | "Shares" | "Tags";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<Tab>("Posts");

  const tabs: Tab[] = ["Posts", "Reels", "Shares", "Tags"];

  return (
    <div>
      <div
        style={{
          position: "relative",
          height: "340px",
          backgroundColor: "#f1f5f9",
        }}
      >
        <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", gap: "12px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
            }}
          >
            <Pencil size={16} />
            Edit Cover
          </button>
          <button
            style={{
              height: "36px",
              width: "36px",
              borderRadius: "9999px",
              border: "1px solid #e2e8f0",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Menu size={16} />
          </button>
        </div>

        <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            <div
              style={{
                height: "112px",
                width: "112px",
                borderRadius: "9999px",
                backgroundColor: "#e2e8f0",
                border: "4px solid white",
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div>
                  <h1 style={{ fontSize: "22px", fontWeight: "bold", margin: 0, color: "black" }}>Username</h1>
                  <p style={{ color: "#94a3b8", margin: "2px 0 0 0" }}>@username</p>
                </div>
                <div style={{ marginLeft: "24px" }}>
                  <span style={{ fontWeight: "bold" }}>128</span> Followers
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>256</span> Following
                </div>
              </div>

              <p style={{ marginTop: "8px", maxWidth: "400px", color: "black" }}>
                Bio space about you, your world and what you create.
              </p>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "white" }}>
                  Edit Profile
                </button>
                <button style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "white" }}>
                  Dashboard
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "white",
                  }}
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "12px 0",
                  cursor: "pointer",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                  borderBottom: activeTab === tab ? "2px solid black" : "2px solid transparent",
                }}
              >
                {tab}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#94a3b8", cursor: "pointer" }}>
            Recent <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
