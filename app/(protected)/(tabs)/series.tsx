import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";

export default function Series() {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSeries = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://192.168.1.99:5000/series?language=English");
            const data = await response.json();
            setSeries(data); // Ensure this matches the expected structure
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
        fetchSeries();
    }, []);

	console.log("Series data:", series); // Log the series data

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
                keyExtractor={(item, index) => (item.ID ? item.ID.toString() : index.toString())}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "white",
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>{item}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
});
