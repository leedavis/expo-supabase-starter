import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Image, Dimensions } from "react-native";
import {
	View,
	StyleSheet,
	FlatList,
	Text,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";

function SeriesItem({ item, onPress }: any) {
    return (
        <TouchableOpacity
            style={{
                padding: 0,
                margin: 0,
            }}
            onPress={onPress}
        >
            <Image
                source={{
                    uri: `http://192.168.1.99:5000/series_cover?title=${encodeURIComponent(item)}.jpg`
                }}
                style={{
                    width: Dimensions.get("window").width,
                    height: 200, // Set a fixed height, adjust as needed
                    margin: 0,
                    padding: 0,
                }}
                resizeMode="cover" // Fill the container, cropping if needed
            />
        </TouchableOpacity>
    );
}

export default function Series() {
	const [series, setSeries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchSeries = async () => {
		try {
			setLoading(true);
            console.log("Fetching series...");
			const response = await fetch(
				"http://192.168.1.99:5000/series?language=English",
			);
			const data = await response.json();
			setSeries(data); // Ensure this matches the expected structure
            console.log("Fetched series:", data);
			setError(null);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError(String(err));
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
    	if (!series || series.length === 0) {
    		fetchSeries();
        }
	}, []);

	if (!series || series.length === 0) {
		return (
			<View style={styles.container}>
				<Text>No Series available</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={series}
				keyExtractor={(item, index) =>
					item.ID ? item.ID.toString() : index.toString()
				}
				renderItem={({ item }) => (
					<SeriesItem
						item={item}
						onPress={() =>
							router.push({
								pathname: "/(protected)/(tabs)/books",
								params: { item: JSON.stringify(item) },
							})
						}
					/>
					)}
				contentContainerStyle={{ padding: 0 }} // Remove FlatList padding
				ItemSeparatorComponent={null} // No separator
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		padding: 0, // Remove container padding
        margin: 0, // Remove container margin
	},
});
