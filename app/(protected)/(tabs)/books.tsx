import { router } from "expo-router";
import { View, StyleSheet, FlatList, Text } from "react-native";

export type Book = {
    id: number;
    title: string;
    series: string | null;
    author: string;
};

export const sampleBooks: Book[] = [
    {
        id: 1,
        title: "The Hobbit",
        series: "The Lord of the Rings",
        author: "J.R.R. Tolkien"
    },
    {
        id: 2,
        title: "The Great Gatsby",
        series: null,
        author: "F. Scott Fitzgerald"
    },
    {
        id: 3,
        title: "The Philosopher's Stone",
        series: "Harry Potter",
        author: "J.K. Rowling"
    },
    {
        id: 4,
        title: "The Name of the Wind",
        series: "The Kingkiller Chronicle",
        author: "Patrick Rothfuss"
    },
    {
        id: 5,
        title: "Project Hail Mary",
        series: null,
        author: "Andy Weir"
    }
]; 

export default function Books() {

	return (
		<View style={styles.container}>

        <FlatList
            data={sampleBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "white" }}>
                    <Text style={{ fontSize: 18 }}>{item.title}</Text>
                </View>
            )}
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