import { Moon, Plus, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarPrimitive,
} from "~/components/ui/sidebar";
import { useTheme } from "./ThemeProvider";

const chatGroups = [
  { id: "1", name: "React Basics" },
  { id: "2", name: "AI Ethics" },
  { id: "3", name: "Climate Change" },
  { id: "4", name: "JavaScript Tips" },
  { id: "5", name: "Machine Learning Intro" },
];

export const ChatSidebar = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const { setTheme, theme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <SidebarPrimitive>
      <SidebarHeader>
        <Button className="w-full justify-start" variant="ghost">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
            <SidebarMenu>
              {chatGroups.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveChat(chat.id)}
                    isActive={activeChat === chat.id}
                  >
                    {chat.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={handleToggleTheme}
          variant="ghost"
          className="w-full justify-start"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />{" "}
          Toggle Theme
        </Button>
      </SidebarFooter>
    </SidebarPrimitive>
  );
};
