import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
                        style={styles.clearButton}
                        onPress={() => {
                            // Remove the item param and refresh the page
                            router.replace({ pathname: "/(protected)/(tabs)/books" });
                        }}
                    >
                        <Text style={styles.clearButtonText}>Clear Series filter</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    const CARD_MARGIN = 5;
    const CARD_HEIGHT = 240;
    const CARD_WIDTH = (Dimensions.get("window").width - CARD_MARGIN * 3) / 2;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredBooks}
                numColumns={2}
                keyExtractor={(item, index) => (item.ID ? item.ID.toString() : index.toString())}
                renderItem={({ item }) => (
                    <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
                        <Image
                            source={{
                                uri: `http://192.168.1.99:5000/book_cover?title=${encodeURIComponent(item.cover_image)}`
                            }}
                            style={styles.coverImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.bookTitle} numberOfLines={2}>{item.Title}</Text>
                    </View>
                )}
                contentContainerStyle={{ padding: CARD_MARGIN }}
                columnWrapperStyle={{ justifyContent: "space-between", marginBottom: CARD_MARGIN }}
            />
            {seriesTitle && (
                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => {
                        // Remove the item param and refresh the page
                        router.replace({ pathname: "/(protected)/(tabs)/books" });
                    }}
                >
                    <Text style={styles.clearButtonText}>Clear Series filter</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 0,
    },
    card: {
        backgroundColor: "#000", // White background
        borderRadius: 10,
        marginBottom: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#000", // Dark gray border
    },
    coverImage: {
        width: "100%",
        height: 180,
        marginTop: 10,
        backgroundColor: "#000",
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 10,
        textAlign: "center",
        color: "#fff", // White text
    },
    clearButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#7139ea",
        borderRadius: 8,
        alignItems: "center",
    },
    clearButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
