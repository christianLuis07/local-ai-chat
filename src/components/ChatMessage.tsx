interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = (props: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start gap-4 ${
        props.role === "assistant" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`rounded-lg p-4 max-w-[80%] ${
          props.role === "assistant"
            ? "bg-secondary"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <p className="whitespace-pre-wrap">{props.content.trim()}</p>
      </div>
    </div>
  );
};
