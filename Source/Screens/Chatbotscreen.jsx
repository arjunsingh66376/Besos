import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { systemPrompt } from '../data/systemPrompt'; // Make sure this file exists and exports the full prompt
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';



const ChatbotScreen = ({navigation}) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi!  My Name is Gitto your AI assistant.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/arjunsingh66376/Besos',
          'X-Title': 'Besos Chatbot'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...newMessages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
          ],
        }),
      });

      const data = await res.json();
      const aiReply = data?.choices?.[0]?.message?.content || 'Sorry, I had trouble replying.';
      setMessages([...newMessages, { sender: 'bot', text: aiReply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: 'Error fetching reply.' }]);
    }

    setLoading(false);
  };

  return (
    
        <View style={styles.container}>
          {/* Gitto Name at Top Center */}
          <View style={styles.header}>
  {/* Back Button */}
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back" size={28} color="#fff" />
</TouchableOpacity>


  {/* Center Gitto animation + text */}
  <View style={styles.centerHeader}>
    <LottieView
      source={require('../assets/Lottie/gitto.json')}
      autoPlay
      loop
      style={{ width: 40, height: 40, marginRight: 8 }}
    />
    <Text style={styles.headerText}>Gitto</Text>
  </View>

  {/* Invisible spacer to balance back button on the right */}
  <View style={styles.backButton} />
</View>


      
          <ScrollView style={styles.chatBox}>
            {messages.map((msg, idx) => (
              <View
                key={idx}
                style={[
                  styles.message,
                  msg.sender === 'user' ? styles.user : styles.bot,
                ]}
              >
                <Text style={styles.text}>{msg.text}</Text>
              </View>
            ))}
            {loading && (
              <View style={[styles.message, styles.bot]}>
                <Text style={styles.text}>Typing...</Text>
              </View>
            )}
          </ScrollView>
      
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type your message"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginTop:10
  },
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  backButton: {
    width: 50, // Keeps the left and right balanced
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  backText: {
    color: '#fff',
    fontSize: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  
  chatBox: { padding: 10 },
  message: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  user: {
    backgroundColor: '#111',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#222',
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  input: {
    flex: 1,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontSize: 20,
  },
});
