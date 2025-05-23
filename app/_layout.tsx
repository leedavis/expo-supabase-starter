/**
 * Root Layout Component
 * 
 * This is the main layout component that wraps the entire application.
 * It provides the authentication context and sets up the main navigation structure.
 * 
 * Key features:
 * - Provides AuthProvider context for the entire app
 * - Configures the main Stack navigator
 * - Handles theme-aware styling for modal screens
 * - Manages navigation between protected and public routes
 */

import "../global.css";

import { Stack } from "expo-router";

import { AuthProvider } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";
import { colors } from "@/constants/colors";

export default function AppLayout() {
	const colorScheme = 'dark'; //useColorScheme();

	return (
		<AuthProvider>
			{/* Main Stack Navigator Configuration
			 * - (protected): Routes that require authentication
			 * - welcome: Public welcome screen
			 * - sign-up/sign-in: Modal screens with themed headers
			 */}
			<Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
				<Stack.Screen name="(protected)" />
				<Stack.Screen name="welcome" />
				<Stack.Screen
					name="sign-up"
					options={{
						presentation: "modal",
						headerShown: false,
						headerTitle: "Sign Up",
						headerStyle: {
							backgroundColor:
								colorScheme === "dark"
									? colors.dark.background
									: colors.light.background,
						},
						headerTintColor:
							colorScheme === "dark"
								? colors.dark.foreground
								: colors.light.foreground,
						gestureEnabled: true,
					}}
				/>
				<Stack.Screen
					name="sign-in"
					options={{
						presentation: "modal",
						headerShown: false,
						headerTitle: "Sign In",
						headerStyle: {
							backgroundColor:
								colorScheme === "dark"
									? colors.dark.background
									: colors.light.background,
						},
						headerTintColor:
							colorScheme === "dark"
								? colors.dark.foreground
								: colors.light.foreground,
						gestureEnabled: true,
					}}
				/>

			</Stack>
		</AuthProvider>
	);
}
