import { router } from "expo-router";
import { View } from "react-native";
import { colors } from "@/constants/colors"; // Make sure this import exists

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";

export default function Home() {
	return (
		<View style={{ flex: 1, backgroundColor: colors.dark.background, padding: 16 }} className="flex-1 items-center justify-center bg-background p-4 gap-y-4">
			<H1 className="text-center text-white">Home</H1>
			<Muted className="text-center text-white">
				You are now authenticated and this session will persist even after
				closing the app.
			</Muted>
			<Button
				className="w-full"
				variant="default"
				size="default"
				onPress={() => router.push("/(protected)/modal")}
			>
				<Text>Open Modal</Text>
			</Button>
		</View>
	);
}
