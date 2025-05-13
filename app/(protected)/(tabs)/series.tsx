import { router } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";

export default function Series() {




    
	return (
		<View className="flex-1 bg-background">
			<H1 className="text-center">Series</H1>
			<Muted className="text-center">
				You are now authenticated and this session will persist even after
				closing the app.
			</Muted>

		</View>
	);
}