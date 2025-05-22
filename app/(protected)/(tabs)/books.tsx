import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://192.168.1.99:5000/books?language=English");
            const data = await response.json();
            setBooks(data); // Ensure this matches the expected structure
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

    if (!books || books.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No books available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
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
                            <Text style={{ fontSize: 18 }}>{item.Title}</Text>
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
