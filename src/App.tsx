import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MomentsRow from "./components/MomentsRow";
import PostCard from "./components/PostCard";
import Profile from "./components/Profile";
import RAI from "./components/RAI";
import Message from "./components/Message";
import Reel from "./components/Reel";

type Post = {
  id: number;
  username: string;
  timeAgo: string;
  caption: string;
};

type NavItem = "Home" | "Reel" | "RAI" | "Message" | "Profile" | "Saved" | "Settings";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<NavItem>("Home");

  const posts: Post[] = [
    { id: 1, username: "ernest", timeAgo: "2h", caption: "Building Reed from scratch." },
    { id: 2, username: "jane_doe", timeAgo: "4h", caption: "First moment on Reed!" },
    { id: 3, username: "startup_guy", timeAgo: "6h", caption: "Business, money, power." },
  ];

  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div style={{ display: "flex" }}>
        <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {activeItem === "Home" && (
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <MomentsRow />
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  username={post.username}
                  timeAgo={post.timeAgo}
                  caption={post.caption}
                />
              ))}
            </div>
          )}

          {activeItem === "Profile" && <Profile />}
          {activeItem === "RAI" && <RAI />}
          {activeItem === "Message" && <Message />}
          {activeItem === "Reel" && <Reel />}
        </div>
      </div>
    </div>
  );
}

export default App;
