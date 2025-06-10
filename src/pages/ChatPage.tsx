
import { useState } from "react";
import { ChatMessage } from "~/components/ChatMessage"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import ollama from "ollama";

type Message = {
  role: "user" | "assistant";
  content: string;
};

 

const ChatPage = () => {
    const [messageInput,setMessageInput] = useState("");
    const [streamedMessages, setStreamedMessages] = useState("");

     const handleSubmit = async () => {
    alert("chat");

    const stream = await ollama.chat({
      model: "deepseek-r1:1.5b",
      messages: [
      {
        role: "user",
        content: messageInput.trim(),
      },
      ],
      stream: true,
    });

    let fullContent = "";

    for await (const part of stream) {
      const messageContent = part.message.content;
      fullContent += messageContent;
      setStreamedMessages(fullContent);
    }
};

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
         <div className="flex flex-col flex-1">
          <header className="flex items-center px-4 h-16 border-b">
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

              {
                !!streamedMessages && (
                <ChatMessage role="assistant" content={streamedMessages} />
                )
              }
            </div>
          </main>
          <footer className="border-t p-4">
            <div className="max-w-3xl mx-auto flex gap-2">
              <Textarea
                className="flex-1"
                placeholder="Type your message here..."
                rows={5}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button onClick={handleSubmit} type="button">
                Send
              </Button>
            </div>
          </footer>
        </div>
    )
}

export  default ChatPage