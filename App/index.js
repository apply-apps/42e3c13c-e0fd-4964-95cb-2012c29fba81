// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = 'http://dev.192.168.1.107.nip.io:3300/chatgpt';

export default function App() {
    const [recipient, setRecipient] = useState('');
    const [occasion, setOccasion] = useState('');
    const [style, setStyle] = useState('');
    const [greeting, setGreeting] = useState('');

    const generateGreeting = async () => {
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: `Create a greeting for ${recipient} on the occasion of ${occasion} in a ${style} style.` }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            const generatedGreeting = data.response.content;
            setGreeting(generatedGreeting);
        } catch (error) {
            console.error('Error generating greeting:', error);
            setGreeting('Failed to generate greeting.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Greeting Generator</Text>
                <View style={styles.inputContainer}>
                    <Text>Recipient:</Text>
                    <TextInput
                        style={styles.input}
                        value={recipient}
                        onChangeText={setRecipient}
                        placeholder="Enter recipient"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Occasion:</Text>
                    <TextInput
                        style={styles.input}
                        value={occasion}
                        onChangeText={setOccasion}
                        placeholder="Enter occasion"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Style:</Text>
                    <TextInput
                        style={styles.input}
                        value={style}
                        onChangeText={setStyle}
                        placeholder="Enter style"
                    />
                </View>
                <Button title="Generate Greeting" onPress={generateGreeting} />
                {greeting !== '' && (
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingTitle}>Your Greeting:</Text>
                        <Text style={styles.greeting}>{greeting}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    inputContainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    greetingContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    greetingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    greeting: {
        fontSize: 16,
    },
});