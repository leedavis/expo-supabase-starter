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
import { colors } from "@/constants/colors"; // Make sure this import exists

import { Image } from "@/components/image";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

export default function WelcomeScreen() {
	const router = useRouter();
	const colorScheme = "dark";
	// Select appropriate app icon based on theme
	const appIcon =
		colorScheme === "dark"
			? require("@/assets/lvlanelogodark.png")
			: require("@/assets/lvlanelogodark.png");


	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.dark.background, padding: 16 }}
        > className="flex flex-1 bg-background p-4">
				<View className="flex flex-1 items-center justify-center gap-y-4 web:m-4">
					<Image source={appIcon} className="w-24 h-24 rounded-xl" />
					<H1 className="text-center text-white">Steamy Lane</H1>
					<Muted className="text-center text-white">
						Quick access to your favorite books and series.
						{"\n\n"}Sign up to save your progress and access exclusive content.
						{"\n"}No credit card required.
					</Muted>

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
