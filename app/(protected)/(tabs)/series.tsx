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
import { SafeAreaView } from "react-native-safe-area-context";

function SeriesItem({ item, onPress }: any) {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                padding: 0,
                margin: 0,
            }}
            onPress={onPress}
        >
            <View style={{ position: "relative", width: Dimensions.get("window").width, height: 200 }}>
                <Image
                    source={{
                        uri: `http://192.168.1.99:5000/series_cover?title=${encodeURIComponent(item.Title || item)}.jpg`
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        opacity: 1,
                    }}
                    resizeMode="cover"
                />
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
						marginTop: 30,
                        justifyContent: "top",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 28,
                            textAlign: "center",
                            backgroundColor: "rgba(255,255,255,0.6)",
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                            borderRadius: 8,
                        }}
                    >
                        {item.Title || item}
                    </Text>
                </View>
            </View>
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
		<SafeAreaView style={styles.container}>
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		padding: 0, // Remove container padding
        margin: 0, // Remove container margin
	},
});
