import ChatbotPrueba  from "../../components/ChatBot/chatbot";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
              <ChatbotPrueba />
    </div>
  );
}
