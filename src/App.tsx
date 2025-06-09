import { Menu } from "lucide-react";
import { useState } from "react";
import { ChatMessage } from "~/components/ChatMessage";
import { ChatSidebar } from "~/components/ChatSidebar";
import { Button } from "~/components/ui/button";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Textarea } from "./components/ui/textarea";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSubmit = async () => {
    alert("chat");
  };

  // This would typically come from a state management solution or props
  const chatHistory: Message[] = [
    { role: "assistant", content: "Hello! How can I assist you today?" },
    { role: "user", content: "Can you explain what React is?" },
    {
      role: "assistant",
      content:
        "React is a popular JavaScript library for building user interfaces. It was developed by Facebook and is widely used for creating interactive, efficient, and reusable UI components. React uses a virtual DOM (Document Object Model) to improve performance by minimizing direct manipulation of the actual DOM. It also introduces JSX, a syntax extension that allows you to write HTML-like code within JavaScript.",
    },
  ];

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-screen bg-background w-full">
        <ChatSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center px-4 h-16 border-b">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </Button>
            <h1 className="text-xl font-bold ml-4">AI Chat Dashboard</h1>
          </header>
          <main className="flex-1 overflow-auto p-4 w-full">
            <div className="mx-auto space-y-4 pb-20 max-w-screen-md">
              {chatHistory.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
            </div>
          </main>
          <footer className="border-t p-4">
            <div className="max-w-3xl mx-auto flex gap-2">
              <Textarea
                className="flex-1"
                placeholder="Type your message here..."
                rows={5}
              />
              <Button onClick={handleSubmit} type="button">
                Send
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
