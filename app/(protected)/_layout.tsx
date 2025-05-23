/**
 * Protected Layout Component
 * 
 * This component serves as a layout wrapper for protected routes in the application.
 * It handles authentication checks and routing logic for authenticated users.
 * 
 * Key features:
 * - Checks if the auth system is initialized
 * - Verifies if user has an active session
 * - Redirects unauthenticated users to welcome page
 * - Provides a Stack navigator for protected routes
 */

import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/context/supabase-provider";

// Configuration for the initial route when the protected layout is loaded
export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
	const { initialized, session } = useAuth();

	// Wait for auth system to initialize
	if (!initialized) {
		return null;
	}

	// Redirect to welcome page if no active session exists
	if (!session) {
		return <Redirect href="/welcome" />;
	}

	// Render protected routes using Stack navigator
	// - (tabs) represents the main tabbed interface
	// - modal represents a modal screen that can be presented
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="modal" options={{ presentation: "modal" }} />
			<Stack.Screen name="booksinseries" options={{ presentation: "modal" }} />
		</Stack>
	);
}
