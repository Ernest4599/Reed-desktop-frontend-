import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MomentsRow from "./components/MomentsRow";
import PostCard from "./components/PostCard";
import Profile from "./components/Profile";
import RAI from "./components/RAI";
import Message from "./components/Message";
import Reel from "./components/Reel";
import CreateMoment from "./components/CreateMoment";
import CreatePost from "./components/CreatePost";
import Signup from "./components/Signup";
import Login from "./components/Login";

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
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const [token, setToken] = useState<string | null>(localStorage.getItem("reed_token"));
  const [, setFirstName] = useState<string | null>(localStorage.getItem("reed_first_name"));

  function handleLogin(newToken: string, newFirstName: string) {
    localStorage.setItem("reed_token", newToken);
    localStorage.setItem("reed_first_name", newFirstName);
    setToken(newToken);
    setFirstName(newFirstName);
  }

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

  function handleNewReel() {
    console.log("New reel posted");
  }
  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!token) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    );
  }

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateMoment={() => setCreateMomentOpen(true)}
        onOpenCreatePost={() => setCreatePostOpen(true)}
        onCreatePost={handleNewPost}
        onCreateReel={handleNewReel}
      />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Routes>
            <Route
              path="/"
              element={
                <div className="p-6 flex flex-col gap-6">
                 <div
                    onClick={() => setCreatePostOpen(true)}
                    className="flex items-center gap-3 border border-[#4682B4] rounded-full px-4 py-3 cursor-pointer bg-white"
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-200" />
                    <span className="text-slate-400">What's on your mind?</span>
                  </div>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>

      {createMomentOpen && (
        <CreateMoment
          onClose={() => setCreateMomentOpen(false)}
          onCreateMoment={handleNewMoment}
        />
      )}
      {createPostOpen && (
        <CreatePost
          onClose={() => setCreatePostOpen(false)}
          onCreatePost={handleNewPost}
        />
      )}
    </div>
  );
}

export default App;
