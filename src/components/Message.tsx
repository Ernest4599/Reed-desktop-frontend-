import { useState } from "react";
import { Search, ArrowLeft, Phone, Video, MoreVertical, Send, Plus, Smile } from "lucide-react";

type MessageTab = "Primary" | "Requests" | "Groups";

type Conversation = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
};

type ChatMessage = {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
};

const chatHistory: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, sender: "them", text: "Hey! How are you?", time: "9:41 AM" },
    { id: 2, sender: "me", text: "I'm good, thanks!", time: "9:41 AM" },
    { id: 3, sender: "them", text: "Great! Are we still on for tomorrow?", time: "9:42 AM" },
    { id: 4, sender: "me", text: "Yes, see you then.", time: "9:42 AM" },
  ],
  2: [{ id: 1, sender: "them", text: "Sure, let's do it.", time: "Yesterday" }],
  3: [{ id: 1, sender: "them", text: "Thanks!", time: "Mon" }],
  4: [{ id: 1, sender: "me", text: "Shared a reel", time: "Sun" }],
  5: [{ id: 1, sender: "them", text: "Okay, sounds good", time: "Sun" }],
};

export default function Message() {
  const [activeTab, setActiveTab] = useState<MessageTab>("Primary");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");

  const tabs: MessageTab[] = ["Primary", "Requests", "Groups"];

  const conversations: Conversation[] = [
    { id: 1, name: "Daniel K.", lastMessage: "Hey, how are you?", time: "9:41 AM", unreadCount: 2, isOnline: true },
    { id: 2, name: "Sophie L.", lastMessage: "Sure, let's do it.", time: "Yesterday", unreadCount: 1, isOnline: false },
    { id: 3, name: "James O.", lastMessage: "Thanks!", time: "Mon", unreadCount: 0, isOnline: false },
    { id: 4, name: "Marketing Squad", lastMessage: "You: Shared a reel", time: "Sun", unreadCount: 0, isOnline: false },
    { id: 5, name: "Olivia M.", lastMessage: "Okay, sounds good", time: "Sun", unreadCount: 0, isOnline: false },
  ];

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  function handleSendMessage() {
    if (draft.trim() === "") return;
    console.log("Sending to", selectedId, ":", draft);
    setDraft("");
  }

  if (selectedConversation) {
    const messages = chatHistory[selectedConversation.id] || [];

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 73px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <button onClick={() => setSelectedId(null)} style={{ display: "flex" }}>
            <ArrowLeft size={20} />
          </button>
          <div
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "9999px",
              backgroundColor: "#e2e8f0",
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", color: "black" }}>{selectedConversation.name}</div>
            <div style={{ fontSize: "13px", color: selectedConversation.isOnline ? "#22c55e" : "#94a3b8" }}>
              {selectedConversation.isOnline ? "Active now" : "Offline"}
            </div>
          </div>
          <Phone size={20} style={{ cursor: "pointer" }} />
          <Video size={20} style={{ cursor: "pointer" }} />
          <MoreVertical size={20} style={{ cursor: "pointer" }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                maxWidth: "70%",
              }}
            >
              <div
                style={{
                  backgroundColor: msg.sender === "me" ? "#4682B4" : "#f1f5f9",
                  color: msg.sender === "me" ? "white" : "black",
                  padding: "10px 14px",
                  borderRadius: "16px",
                }}
              >
                {msg.text}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                  marginTop: "4px",
                  textAlign: msg.sender === "me" ? "right" : "left",
                }}
              >
                {msg.time}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #e2e8f0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid #e2e8f0",
              borderRadius: "9999px",
              padding: "8px 8px 8px 16px",
            }}
          >
            <Plus size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Message..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              style={{ border: "none", outline: "none", flex: 1, fontSize: "14px", backgroundColor: "white", color: "black" }}
            />
            <Smile size={18} color="#94a3b8" />
            <button
              onClick={handleSendMessage}
              style={{
                height: "32px",
                width: "32px",
                borderRadius: "9999px",
                backgroundColor: "#4682B4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Send size={14} color="white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "400px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "black" }}>Messages</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid #e2e8f0",
          borderRadius: "9999px",
          padding: "8px 16px",
          marginTop: "16px",
        }}
      >
        <Search size={18} color="#94a3b8" />
        <input
          type="text"
          placeholder="Search messages"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ border: "none", outline: "none", width: "100%", fontSize: "14px", backgroundColor: "white", color: "black" }}
        />
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "16px", borderBottom: "1px solid #e2e8f0" }}>
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 0",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "bold" : "normal",
              color: activeTab === tab ? "black" : "#94a3b8",
              borderBottom: activeTab === tab ? "2px solid black" : "2px solid transparent",
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "8px" }}>
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedId(conversation.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 4px",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  height: "48px",
                  width: "48px",
                  borderRadius: "9999px",
                  backgroundColor: "#e2e8f0",
                }}
              />
              {conversation.isOnline && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    height: "12px",
                    width: "12px",
                    borderRadius: "9999px",
                    backgroundColor: "#22c55e",
                    border: "2px solid white",
                  }}
                />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold", color: "black" }}>{conversation.name}</span>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>{conversation.time}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {conversation.lastMessage}
                </span>
                {conversation.unreadCount > 0 && (
                  <span
                    style={{
                      backgroundColor: "#4682B4",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "bold",
                      borderRadius: "9999px",
                      height: "18px",
                      width: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
