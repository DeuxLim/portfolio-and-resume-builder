import Content from "@/components/Home/Content";
import Header from "@/components/Home/Header";
import ChatProvider from "@/context/Chat/ChatProvider";
import FloatingChat from "@/components/Chatbot/FloatingChat";
import { samplePortfolio } from "../../../shared/defaults/portfolio";

export default function Home() {
	return (
		<ChatProvider>
			<main className="flex flex-col gap-3 sm:gap-4">
				<Header portfolio={samplePortfolio} />
				<Content portfolio={samplePortfolio} />
			</main>
			<FloatingChat
				username={samplePortfolio.username}
				displayName={samplePortfolio.fullName}
				avatarUrl={samplePortfolio.avatarUrl}
			/>
		</ChatProvider>
	);
}
