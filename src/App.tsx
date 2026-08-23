import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MomentsRow from "./components/MomentsRow";
import PostCard from "./components/PostCard";
import Profile from "./components/Profile";
import RAI from "./components/RAI";
import Message from "./components/Message";
import Reel from "./components/Reel";
import CreateMoment from "./components/CreateMoment";

type Post = {
  id: number;
  username: string;
  timeAgo: string;
  caption: string;
};

type Moment = {
  id: number;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createMomentOpen, setCreateMomentOpen] = useState(false);

  const [posts, setPosts] = useState<Post[]>([
    { id: 1, username: "ernest", timeAgo: "2h", caption: "Building Reed from scratch." },
    { id: 2, username: "jane_doe", timeAgo: "4h", caption: "First moment on Reed!" },
    { id: 3, username: "startup_guy", timeAgo: "6h", caption: "Business, money, power." },
  ]);

  const [moments, setMoments] = useState<Moment[]>([]);

  function handleNewPost(caption: string) {
    const newPost: Post = {
      id: posts.length + 1,
      username: "ernest",
      timeAgo: "Just now",
      caption,
    };
    setPosts([newPost, ...posts]);
  }

  function handleNewMoment() {
    const newMoment: Moment = { id: moments.length + 1 };
    setMoments([...moments, newMoment]);
  }

  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateMoment={() => setCreateMomentOpen(true)}
        onCreatePost={handleNewPost}
      />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Routes>
            <Route
              path="/"
              element={
                <div className="p-6 flex flex-col gap-6">
                  <MomentsRow moments={moments} onAddMoment={() => setCreateMomentOpen(true)} />
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      username={post.username}
                      timeAgo={post.timeAgo}
                      caption={post.caption}
                    />
                  ))}
                </div>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rai" element={<RAI />} />
            <Route path="/message" element={<Message />} />
            <Route path="/reel" element={<Reel />} />
          </Routes>
        </div>
      </div>

      {createMomentOpen && (
        <CreateMoment
          onClose={() => setCreateMomentOpen(false)}
          onCreateMoment={handleNewMoment}
        />
      )}
    </div>
  );
}

export default App;
