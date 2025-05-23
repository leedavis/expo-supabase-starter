import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useColorScheme } from "@/lib/useColorScheme";
import { colors } from "@/constants/colors";

export default function TabsLayout() {
	const colorScheme = 'dark'; //useColorScheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				headerTitle: "",
				headerStyle: {
					backgroundColor:
						colorScheme === "dark"
							? colors.dark.background
							: colors.light.background,
				},
				tabBarStyle: {
					backgroundColor:
						colorScheme === "dark"
							? colors.dark.background
							: colors.light.background,
				},
				tabBarActiveTintColor:
					colorScheme === "dark"
						? colors.dark.foreground
						: colors.light.foreground,
				tabBarShowLabel: true,
			}}
		>
			<Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="home" color={color} size={size} />
				),
			}}
			/>
			<Tabs.Screen name="series" options={{ title: "Series", tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="library" color={color} size={size} />
				),
			}}
			/>
			<Tabs.Screen name="books" options={{ title: "Books", tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="book" color={color} size={size} />
				),
			}}
			/>
			<Tabs.Screen name="fun" options={{ title: "Fun", tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="gamepad" color={color} size={size} />
				),
			}}
			/>
			<Tabs.Screen name="author" options={{ title: "Author", tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons name="face-woman-profile" color={color} size={size} />
				),
			}}
			/>
			
		</Tabs>
	);
}
