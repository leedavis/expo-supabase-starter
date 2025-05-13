/**
 * Welcome Screen Component
 *
 * The initial landing screen for unauthenticated users.
 * Provides navigation options to sign up or sign in.
 *
 * Features:
 * - Theme-aware app icon display
 * - Welcome message and description
 * - Navigation buttons for authentication
 * - Responsive layout with safe area handling
 */

import React, { useState } from "react";
import { Alert, Modal, View } from "react-native";
import { useRouter } from "expo-router";

import { Image } from "@/components/image";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

export default function WelcomeScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	// Select appropriate app icon based on theme
	const appIcon =
		colorScheme === "dark"
			? require("@/assets/icon.png")
			: require("@/assets/icon-dark.png");

	const handleAlert = () => {
		Alert.alert("Hello", "This is a test alert", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "OK",
				onPress: () => {
					console.log("OK");
				},
			},
		]);
	};


	return (
		<>
			<SafeAreaView className="flex flex-1 bg-background p-4">
				{/* Main Content Section
				 * - App icon with theme-aware image
				 * - Welcome heading
				 * - Description text
				 */}
				<View className="flex flex-1 items-center justify-center gap-y-4 web:m-4">
					<Image source={appIcon} className="w-16 h-16 rounded-xl" />
					<H1 className="text-center">Welcome to Expo Supabase Starter</H1>
					<Muted className="text-center">
						A comprehensive starter project for developing React Native and Expo
						applications with Supabase as the backend.
					</Muted>
					<Button onPress={handleAlert} size="default" variant="default">
						<Text>Alert test button</Text>
					</Button>

				</View>
				{/* Authentication Navigation Section
				 * - Sign Up button (primary action)
				 * - Sign In button (secondary action)
				 */}
				<View className="flex flex-col gap-y-4 web:m-4">

					<Button
						onPress={() => {
							router.push("/sign-up");
						}}
					>
						<Text>Sign Up</Text>
					</Button>
					<Button
						size="default"
						variant="secondary"
						onPress={() => {
							router.push("/sign-in");
						}}
					>
						<Text>Sign In</Text>
					</Button>
				</View>
			</SafeAreaView>
		</>
	);
}
