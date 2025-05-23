import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";

export default function Books() {
    const params = useLocalSearchParams();
    const { item } = params;
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://192.168.1.99:5000/books?language=English");
            const data = await response.json();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Get the series title from the item param (it may be a stringified object or just a string)
    let seriesTitle: string | null = null;
    if (item) {
        try {
            const parsed = typeof item === "string" ? JSON.parse(item) : item;
            seriesTitle = parsed?.Title || parsed || null;
        } catch {
            seriesTitle = item as string;
        }
    }

    // Filter books by series if seriesTitle is present
    const filteredBooks = seriesTitle
        ? books.filter((book) => book.Series === seriesTitle)
        : books;

    if (!filteredBooks || filteredBooks.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No books available</Text>
                {seriesTitle && (
                    <TouchableOpacity
                        className="mt-5 p-4 rounded-lg items-center"
                        style={{ backgroundColor: "#6638f0" }}
                        onPress={() => {
                            // Remove the item param and refresh the page
                            router.replace({ pathname: "/(protected)/(tabs)/books" });
                        }}
                    >
                        <Text className="text-white font-bold text-lg">Clear Series filter</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredBooks}
                keyExtractor={(item, index) => (item.ID ? item.ID.toString() : index.toString())}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "white",
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>{item.Title}</Text>
                    </View>
                )}
            />
            {seriesTitle && (
                <TouchableOpacity
                    className="mt-5 p-4 rounded-lg items-center"
                    style={{ backgroundColor: "#6638f0" }}
                    onPress={() => {
                        // Remove the item param and refresh the page
                        router.replace({ pathname: "/(protected)/(tabs)/books" });
                    }}
                >
                    <Text className="text-white font-bold text-lg">Clear Series filter</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    clearButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#007AFF",
        borderRadius: 8,
        alignItems: "center",
    },
    clearButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
