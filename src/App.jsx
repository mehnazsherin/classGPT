import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  Trophy,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    user: "Rahul",
    initials: "R",
    text: "Does anyone have today's Java notes?",
    time: "9:42 AM",
    type: "student",
  },
  {
    id: 2,
    user: "Ananya",
    initials: "A",
    text: "Yep! I uploaded them in Notes 📚",
    time: "9:44 AM",
    type: "student",
  },
  {
    id: 3,
    user: "Prof. Kumar",
    initials: "PK",
    text: "Reminder: Arrays assignment is due tomorrow.",
    time: "9:51 AM",
    type: "teacher",
  },
];

const homework = [
  {
    title: "Java Arrays Assignment",
    subject: "Programming in Java",
    due: "Tomorrow",
    date: "Oct 9",
    priority: "High",
    progress: 35,
  },
  {
    title: "Differential Equations",
    subject: "Mathematics",
    due: "Oct 12",
    date: "Oct 12",
    priority: "Medium",
    progress: 70,
  },
  {
    title: "Communication Skills Report",
    subject: "Communication",
    due: "Oct 15",
    date: "Oct 15",
    priority: "Low",
    progress: 100,
  },
];

const notes = [
  {
    title: "Java Arrays — Complete Notes",
    type: "PDF",
    size: "2.4 MB",
    uploaded: "Today",
  },
  {
    title: "OOP Quick Revision",
    type: "PDF",
    size: "1.8 MB",
    uploaded: "Yesterday",
  },
  {
    title: "Unit 3 Important Questions",
    type: "DOC",
    size: "680 KB",
    uploaded: "Oct 5",
  },
];

const schedule = [
  {
    time: "09:00 AM",
    subject: "Programming in Java",
    room: "Lab 3",
    teacher: "Prof. Kumar",
    color: "purple",
  },
  {
    time: "11:00 AM",
    subject: "Mathematics",
    room: "Room 204",
    teacher: "Dr. Priya",
    color: "blue",
  },
  {
    time: "02:00 PM",
    subject: "Communication Skills",
    room: "Seminar Hall",
    teacher: "Ms. Nisha",
    color: "orange",
  },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "Class Chat", icon: MessageCircle },
  { id: "ai", label: "Ask ClassGPT", icon: Sparkles },
  { id: "homework", label: "Homework", icon: FileText },
  { id: "notes", label: "Notes", icon: BookOpen },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "fun", label: "Fun Zone", icon: Trophy },
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = (nextPage) => {
    setPage(nextPage);
    setSidebarOpen(false);
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <Sidebar
        page={page}
        navigate={navigate}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="main-shell">
        <Header
          dark={dark}
          setDark={setDark}
          setSidebarOpen={setSidebarOpen}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />

        <main className="page-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {page === "dashboard" && <Dashboard navigate={navigate} />}
              {page === "chat" && <ClassChat />}
              {page === "ai" && <AskClassGPT />}
              {page === "homework" && <Homework />}
              {page === "notes" && <Notes />}
              {page === "schedule" && <Schedule />}
              {page === "fun" && <FunZone />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ page, navigate, open, setOpen }) {
  return (
    <>
      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)} />
      )}

      <aside className={`sidebar ${open ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>
          <div>
            <h2>ClassGPT</h2>
            <span>Your class, smarter.</span>
          </div>

          <button
            className="icon-btn sidebar-close"
            onClick={() => setOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <div className="class-card">
          <div className="class-avatar">C</div>
          <div>
            <strong>CSE 1 — Section A</strong>
            <span>Class code: CSE26A</span>
          </div>
          <ChevronRight size={16} />
        </div>

        <div className="nav-label">Workspace</div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => navigate(item.id)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.id === "ai" && <span className="new-badge">AI</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="nav-label">Class</div>

          <button className="nav-item">
            <Users size={19} />
            <span>Members</span>
          </button>

          <button className="nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="sidebar-user">
            <div className="avatar">M</div>
            <div>
              <strong>Meha</strong>
              <span>Student</span>
            </div>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({
  dark,
  setDark,
  setSidebarOpen,
  profileOpen,
  setProfileOpen,
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-btn menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={21} />
        </button>

        <div className="breadcrumb">
          <span>ClassGPT</span>
          <ChevronRight size={15} />
          <strong>CSE 1 — Section A</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input placeholder="Search class..." />
          <kbd>⌘ K</kbd>
        </div>

        <button className="icon-btn">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <button
          className="icon-btn"
          onClick={() => setDark((value) => !value)}
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <div className="profile-wrap">
          <button
            className="profile-button"
            onClick={() => setProfileOpen((value) => !value)}
          >
            <div className="avatar">M</div>
            <span>Meha</span>
          </button>

          {profileOpen && (
            <div className="profile-menu">
              <button>
                <UserRound size={16} /> Profile
              </button>
              <button>
                <Settings size={16} /> Settings
              </button>
              <button>
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Dashboard({ navigate }) {
  return (
    <div>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">THURSDAY, OCTOBER 8</p>
          <h1>Good morning, Meha <span>👋</span></h1>
          <p className="muted">
            Here’s what’s happening in your class today.
          </p>
        </div>

        <button className="primary-btn" onClick={() => navigate("ai")}>
          <Sparkles size={17} />
          Ask ClassGPT
        </button>
      </section>

      <section className="stats-grid">
        <StatCard
          icon={FileText}
          title="Assignments"
          value="3"
          subtitle="2 due this week"
          type="purple"
        />
        <StatCard
          icon={Clock3}
          title="Next class"
          value="09:00"
          subtitle="Programming in Java"
          type="blue"
        />
        <StatCard
          icon={MessageCircle}
          title="Messages"
          value="12"
          subtitle="4 new mentions"
          type="green"
        />
        <StatCard
          icon={Trophy}
          title="Class rank"
          value="#7"
          subtitle="Top 15% this month"
          type="orange"
        />
      </section>

      <div className="dashboard-grid">
        <section className="panel chat-preview">
          <PanelHeader
            title="Class Chat"
            subtitle="What's happening right now"
            action="Open chat"
            onAction={() => navigate("chat")}
          />

          <div className="mini-messages">
            <MiniMessage
              initials="R"
              name="Rahul"
              text="Does anyone have today's Java notes?"
              time="9:42 AM"
            />
            <MiniMessage
              initials="A"
              name="Ananya"
              text="Yep! I uploaded them in Notes 📚"
              time="9:44 AM"
            />
            <MiniMessage
              initials="PK"
              name="Prof. Kumar"
              text="Reminder: Arrays assignment is due tomorrow."
              time="9:51 AM"
              teacher
            />
          </div>

          <button
            className="chat-input-preview"
            onClick={() => navigate("chat")}
          >
            <span>Message your class...</span>
            <Send size={17} />
          </button>
        </section>

        <section className="panel">
          <PanelHeader
            title="Upcoming Homework"
            subtitle="Stay ahead of deadlines"
            action="View all"
            onAction={() => navigate("homework")}
          />

          <div className="homework-list">
            {homework.slice(0, 3).map((item) => (
              <HomeworkRow key={item.title} item={item} />
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid lower">
        <section className="panel">
          <PanelHeader
            title="Today’s Schedule"
            subtitle="Your classes"
            action="Full schedule"
            onAction={() => navigate("schedule")}
          />

          <div className="timeline">
            {schedule.map((item) => (
              <ScheduleRow key={item.time} item={item} />
            ))}
          </div>
        </section>

        <section className="ai-banner">
          <div className="ai-glow" />
          <div className="ai-content">
            <div className="ai-icon">
              <Sparkles size={23} />
            </div>
            <p className="eyebrow">YOUR CLASS AI</p>
            <h2>Got a question?</h2>
            <p>
              Ask anything about your class, notes, assignments or studies.
            </p>

            <button onClick={() => navigate("ai")} className="white-btn">
              Chat with ClassGPT
              <ArrowRight />
            </button>
          </div>

          <div className="floating-question q1">When is my homework due?</div>
          <div className="floating-question q2">Explain recursion simply 🤯</div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, type }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        <Icon size={20} />
      </div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}

function PanelHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="panel-header">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      {action && (
        <button className="text-btn" onClick={onAction}>
          {action}
          <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}

function MiniMessage({ initials, name, text, time, teacher }) {
  return (
    <div className="mini-message">
      <div className={`avatar ${teacher ? "teacher-avatar" : ""}`}>
        {initials}
      </div>

      <div className="message-main">
        <div>
          <strong>{name}</strong>
          {teacher && <span className="teacher-tag">Teacher</span>}
          <time>{time}</time>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

function HomeworkRow({ item }) {
  return (
    <div className="homework-row">
      <div className="homework-icon">
        <FileText size={18} />
      </div>

      <div className="homework-info">
        <strong>{item.title}</strong>
        <span>{item.subject}</span>
        <div className="progress">
          <div style={{ width: `${item.progress}%` }} />
        </div>
      </div>

      <div className={`priority ${item.priority.toLowerCase()}`}>
        {item.priority}
      </div>

      <div className="due-date">
        <small>Due</small>
        <strong>{item.due}</strong>
      </div>
    </div>
  );
}

function ScheduleRow({ item }) {
  return (
    <div className="schedule-row">
      <div className="schedule-time">{item.time}</div>

      <div className={`schedule-dot ${item.color}`} />

      <div className="schedule-info">
        <strong>{item.subject}</strong>
        <span>
          {item.room} · {item.teacher}
        </span>
      </div>

      <ChevronRight size={17} />
    </div>
  );
}

function ClassChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        user: "Meha",
        initials: "M",
        text: input.trim(),
        time: "Just now",
        type: "student",
      },
    ]);

    setInput("");
  };

  return (
    <div>
      <PageTitle
        eyebrow="CLASSROOM"
        title="Class Chat"
        description="Talk, ask questions, share notes and stay connected."
      />

      <div className="chat-layout">
        <section className="panel full-chat">
          <div className="chat-header">
            <div>
              <h3>CSE 1 — Section A</h3>
              <span>
                <span className="online-dot" /> 28 members online
              </span>
            </div>

            <button className="icon-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="messages-area">
            <div className="date-divider">
              <span>Today</span>
            </div>

            {messages.map((message) => (
              <div
                className={`chat-message ${
                  message.user === "Meha" ? "own" : ""
                }`}
                key={message.id}
              >
                <div
                  className={`avatar ${
                    message.type === "teacher" ? "teacher-avatar" : ""
                  }`}
                >
                  {message.initials}
                </div>

                <div className="bubble-wrap">
                  <div className="message-meta">
                    <strong>{message.user}</strong>
                    {message.type === "teacher" && (
                      <span className="teacher-tag">Teacher</span>
                    )}
                    <time>{message.time}</time>
                  </div>
                  <div className="chat-bubble">{message.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="message-composer">
            <button className="attach-btn">
              <Plus size={19} />
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Message your class..."
            />

            <button className="send-btn" onClick={sendMessage}>
              <Send size={18} />
            </button>
          </div>
        </section>

        <aside className="chat-side">
          <div className="panel">
            <h3 className="side-title">Class Info</h3>

            <div className="class-profile">
              <div className="large-class-avatar">C</div>
              <h3>CSE 1 — Section A</h3>
              <span>28 students · 3 teachers</span>
            </div>

            <div className="info-list">
              <div>
                <span>Class code</span>
                <strong>CSE26A</strong>
              </div>
              <div>
                <span>Created</span>
                <strong>Aug 2026</strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3 className="side-title">Pinned</h3>

            <div className="pinned">
              <Bell size={17} />
              <div>
                <strong>Java assignment</strong>
                <span>Due tomorrow at 11:59 PM</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AskClassGPT() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hey Meha! 👋 I’m ClassGPT. Ask me anything about your class, homework, notes, subjects or even something random.",
    },
  ]);

  const suggestions = [
    "What homework is due this week?",
    "Explain Java arrays simply",
    "Summarize today's classes",
    "Make me a quick quiz",
  ];

  const askAI = (question = input) => {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      {
        role: "ai",
        text: generateDemoAnswer(question),
      },
    ]);

    setInput("");
  };

  return (
    <div>
      <PageTitle
        eyebrow="AI ASSISTANT"
        title="Ask ClassGPT"
        description="Your AI classroom companion, powered by your class context."
      />

      <div className="ai-chat-container">
        <div className="ai-chat-main">
          <div className="ai-chat-scroll">
            {messages.map((message, index) => (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`ai-message ${message.role}`}
                key={index}
              >
                {message.role === "ai" && (
                  <div className="ai-mini-icon">
                    <Sparkles size={16} />
                  </div>
                )}

                <div className="ai-message-content">{message.text}</div>
              </motion.div>
            ))}

            {messages.length === 1 && (
              <div className="suggestions">
                <p>Try asking</p>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => askAI(suggestion)}
                  >
                    <Sparkles size={15} />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ai-composer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askAI()}
              placeholder="Ask anything about your class..."
            />
            <button onClick={() => askAI()}>
              <Send size={18} />
            </button>
          </div>

          <p className="ai-disclaimer">
            ClassGPT can make mistakes. Always verify important academic
            information.
          </p>
        </div>

        <aside className="ai-context">
          <div className="context-icon">
            <Zap size={20} />
          </div>
          <h3>Class context</h3>
          <p>
            ClassGPT can use information from your classroom to give more
            relevant answers.
          </p>

          <div className="context-item">
            <CheckCircle2 size={16} />
            <span>Homework</span>
          </div>

          <div className="context-item">
            <CheckCircle2 size={16} />
            <span>Class notes</span>
          </div>

          <div className="context-item">
            <CheckCircle2 size={16} />
            <span>Schedule</span>
          </div>

          <div className="context-item">
            <CheckCircle2 size={16} />
            <span>Announcements</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function generateDemoAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("homework") || q.includes("assignment")) {
    return "You currently have 3 assignments. Your Java Arrays assignment is the most urgent and is due tomorrow. Differential Equations is due Oct 12, and Communication Skills is due Oct 15.";
  }

  if (q.includes("array")) {
    return "Think of a Java array as a row of numbered boxes 📦. Each box stores one value, and you access it using an index starting from 0. Example: int[] marks = {80, 92, 75};";
  }

  if (q.includes("quiz")) {
    return "Absolutely! 🧠 Here’s a quick one: Which index does the first element of a Java array have? A) 1  B) 0  C) -1  D) Depends on the array. Answer: B.";
  }

  return "Based on your class information, I’d break this down into a few simple steps. Once the real AI backend is connected, I’ll be able to answer this using your uploaded notes, homework and classroom data.";
}

function Homework() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return homework;
    return homework.filter((item) => item.priority === filter);
  }, [filter]);

  return (
    <div>
      <PageTitle
        eyebrow="YOUR WORK"
        title="Homework"
        description="Keep every assignment and deadline in one place."
        action={
          <button className="primary-btn">
            <Plus size={17} />
            Add homework
          </button>
        }
      />

      <div className="filter-bar">
        {["All", "High", "Medium", "Low"].map((item) => (
          <button
            key={item}
            className={filter === item ? "filter active" : "filter"}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="homework-page-grid">
        {filtered.map((item) => (
          <HomeworkCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function HomeworkCard({ item }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="panel homework-card">
      <div className="homework-card-top">
        <div className="homework-icon large">
          <FileText size={21} />
        </div>
        <div className={`priority ${item.priority.toLowerCase()}`}>
          {item.priority}
        </div>
      </div>

      <h3>{item.title}</h3>
      <p>{item.subject}</p>

      <div className="deadline">
        <Clock3 size={17} />
        <span>Due {item.due}</span>
      </div>

      <div className="progress-section">
        <div>
          <span>Progress</span>
          <strong>{item.progress}%</strong>
        </div>
        <div className="progress big">
          <div style={{ width: `${item.progress}%` }} />
        </div>
      </div>

      <button className="secondary-btn">
        {item.progress === 100 ? "Completed" : "Continue"}
      </button>
    </motion.div>
  );
}

function Notes() {
  return (
    <div>
      <PageTitle
        eyebrow="CLASS LIBRARY"
        title="Notes & Resources"
        description="Everything your class has shared, organized in one place."
        action={
          <button className="primary-btn">
            <Plus size={17} />
            Upload
          </button>
        }
      />

      <div className="notes-toolbar">
        <div className="search-box large">
          <Search size={17} />
          <input placeholder="Search notes and resources..." />
        </div>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <motion.div
            whileHover={{ y: -3 }}
            className="panel note-card"
            key={note.title}
          >
            <div className="note-top">
              <div className="file-icon">
                <FileText size={22} />
              </div>
              <button className="icon-btn">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <h3>{note.title}</h3>
            <p>
              {note.type} · {note.size}
            </p>

            <div className="note-footer">
              <span>Uploaded {note.uploaded}</span>
              <button className="text-btn">
                Open <ChevronRight size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="empty-upload">
        <div className="upload-icon">
          <BookOpen size={24} />
        </div>
        <h3>Build your class library</h3>
        <p>
          Upload PDFs, presentations, question papers and other useful
          resources.
        </p>
        <button className="secondary-btn">
          <Plus size={16} /> Add resource
        </button>
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <div>
      <PageTitle
        eyebrow="CLASS CALENDAR"
        title="Schedule"
        description="Know where you need to be and what you need to learn."
      />

      <div className="schedule-header">
        <button className="secondary-btn">
          <ChevronRight className="rotate" size={16} />
          Previous
        </button>

        <div>
          <strong>October 8, 2026</strong>
          <span>Thursday</span>
        </div>

        <button className="secondary-btn">
          Next <ChevronRight size={16} />
        </button>
      </div>

      <section className="panel schedule-page">
        {schedule.map((item, index) => (
          <div className="large-schedule-row" key={item.time}>
            <div className="large-time">{item.time}</div>

            <div className={`large-dot ${item.color}`} />

            <div className="large-schedule-content">
              <div>
                <span className="class-number">CLASS {index + 1}</span>
                <h3>{item.subject}</h3>
                <p>
                  {item.teacher} · {item.room}
                </p>
              </div>

              <button className="icon-btn">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function FunZone() {
  const [votes, setVotes] = useState({ chai: 18, coffee: 12 });

  return (
    <div>
      <PageTitle
        eyebrow="CLASS COMMUNITY"
        title="Fun Zone 🎮"
        description="Because college isn't just assignments."
      />

      <div className="fun-grid">
        <section className="panel poll-card">
          <div className="fun-heading">
            <div className="fun-icon purple">
              <CircleHelp size={21} />
            </div>
            <span>CLASS POLL</span>
          </div>

          <h2>What's the real fuel of our class?</h2>

          <button
            className="poll-option"
            onClick={() =>
              setVotes((v) => ({ ...v, chai: v.chai + 1 }))
            }
          >
            <span>☕ Chai</span>
            <strong>{votes.chai}</strong>
          </button>

          <button
            className="poll-option"
            onClick={() =>
              setVotes((v) => ({ ...v, coffee: v.coffee + 1 }))
            }
          >
            <span>☕ Coffee</span>
            <strong>{votes.coffee}</strong>
          </button>
        </section>

        <section className="panel quiz-card">
          <div className="fun-heading">
            <div className="fun-icon blue">
              <Zap size={21} />
            </div>
            <span>DAILY QUIZ</span>
          </div>

          <h2>Can you beat the class average?</h2>
          <p>
            5 questions · Java · Arrays · 3 minutes
          </p>

          <button className="primary-btn">
            Start quiz <ChevronRight size={16} />
          </button>
        </section>

        <section className="panel leaderboard">
          <div className="panel-header">
            <div>
              <h3>Class leaderboard</h3>
              <p>This week's activity</p>
            </div>
            <Trophy size={20} />
          </div>

          {[
            ["A", "Ananya", "1,240"],
            ["R", "Rahul", "1,080"],
            ["M", "Meha", "980"],
            ["S", "Sathya", "910"],
          ].map(([initial, name, points], index) => (
            <div className="leader-row" key={name}>
              <span className="rank">{index + 1}</span>
              <div className="avatar">{initial}</div>
              <strong>{name}</strong>
              <span>{points} XP</span>
            </div>
          ))}
        </section>

        <section className="fun-ai-card">
          <div>
            <Sparkles size={28} />
            <h2>Ask AI something fun.</h2>
            <p>
              Generate a class challenge, roast, quiz or random question.
            </p>
          </div>

          <button className="white-btn">
            Surprise me <Sparkles size={16} />
          </button>
        </section>
      </div>
    </div>
  );
}

function PageTitle({ eyebrow, title, description, action }) {
  return (
    <section className="page-title">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="muted">{description}</p>
      </div>

      {action && action}
    </section>
  );
}

function ArrowRight() {
  return <ChevronRight size={17} />;
}

export default App;