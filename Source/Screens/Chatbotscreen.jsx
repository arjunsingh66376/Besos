import React, { useState, useEffect, useRef } from 'react'; // <--- ADD useRef HERE
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { systemPrompt } from '../data/systemPrompt';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

const ChatbotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! My Name is Gitto your AI assistant.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState(''); // Still useful for UI display
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  // NEW: Create a ref to store the latest recognized text
  const latestRecognizedText = useRef(''); // <--- THIS IS NEW

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);
    setStarted('✓');
    setIsRecording(true);
    setError('');
    setRecognizedText('');
    setInput('');
    latestRecognizedText.current = ''; // <--- Reset the ref here too
  };

  const onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized: ', e);
  };

  // MODIFIED: Use ref to access the latest recognized text
  const onSpeechEnd = async (e) => {
    console.log('onSpeechEnd event: ', e);
    setEnd('✓');
    setIsRecording(false);
  
    // --- ADD THIS DELAY ---
    // Wait for a short period to allow onSpeechResults to complete its update
    await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 200 milliseconds
    // --- END ADDITION ---
  
    console.log('onSpeechEnd (after delay) - Current recognizedText state:', recognizedText);
    console.log('onSpeechEnd (after delay) - Current input state:', input);
    console.log('onSpeechEnd (after delay) - latestRecognizedText.current ref value:', latestRecognizedText.current);
  
    // Use the ref for auto-send condition
    if (latestRecognizedText.current.trim()) {
      console.log("onSpeechEnd: Detected valid recognized text from ref (after delay), attempting auto-send.");
      await handleSendMessage(latestRecognizedText.current.trim()); // Use the ref value
    } else {
      console.log("onSpeechEnd: recognizedText from ref is empty or whitespace (after delay), not auto-sending.");
      // Optional: Consider adding an alert here if you want to notify the user that no speech was detected after they stopped speaking.
      // Alert.alert('No speech detected', 'Please speak clearly after pressing the microphone.');
    }
  };

  // MODIFIED: Update both state and ref
  const onSpeechResults = (e) => {
    console.log('onSpeechResults event: ', e);
    if (e.value && e.value.length > 0) {
      const finalRecognizedText = e.value[0];
      setRecognizedText(finalRecognizedText); // For UI display
      setInput(finalRecognizedText); // For UI display
      latestRecognizedText.current = finalRecognizedText; // <--- UPDATE THE REF HERE
      console.log('onSpeechResults - recognizedText updated to:', finalRecognizedText);
      console.log('onSpeechResults - input updated to:', finalRecognizedText);
    } else {
      console.log('onSpeechResults - No value in e.value.');
    }
  };


const onSpeechError = (e) => {
  console.log('onSpeechError: ', e);
  setError(JSON.stringify(e.error));
  setIsRecording(false); // Stop recording UI on error

  let alertTitle = 'Speech Recognition Issue';
  let alertMessage = 'An unexpected error occurred during speech recognition. Please try again.';

  if (e.error && e.error.code === '7') {
    alertMessage = 'It sounds like no speech was detected. Please make sure your microphone is working and speak clearly after pressing the mic button.';
    alertTitle = 'No Speech Detected'; // More friendly title
  } else if (e.error && e.error.code === '6') { // This is for "no speech input"
    alertMessage = 'No audio input was received. Please ensure your microphone is enabled and try again.';
    alertTitle = 'No Audio Input';
  } else if (e.error && e.error.message) {
    // Fallback to the specific error message if provided by the library
    alertMessage = e.error.message;
  }

  Alert.alert(alertTitle, alertMessage);
};



  const startRecognizing = async () => {
    // --- AGGRESSIVE RESET OF VOICE INSTANCE ---
    try {
        // Destroy the previous Voice instance to ensure a clean slate
        await Voice.destroy();
        // It's good practice to re-add listeners after destroying,
        // although useEffect sets them up initially, destroy might remove them.
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError;
    } catch (e) {
        // This can happen if no instance was running, or if destroy fails for some reason.
        // It's a warning, not necessarily an error that stops the process.
        console.warn("Could not destroy previous Voice instance (might not have been running):", e);
    }
    // --- END AGGRESSIVE RESET ---

    // Clear all relevant states for a new session
    setRecognizedText('');
    setPitch('');
    setError('');
    setStarted('');
    setEnd('');
    setResults([]);
    latestRecognizedText.current = ''; // Ensure the ref is also cleared

    try {
        // Request microphone permission (Android only, iOS handles it automatically on first use)
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'Gitto needs access to your microphone for voice input.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permission Denied', 'Microphone permission is required for voice input.');
                setIsRecording(false);
                return; // Stop here if permission is denied
            }
        }
        await Voice.start('en-US'); // Start listening for US English
        setIsRecording(true); // Update UI
    } catch (e) {
        console.error('Error starting recognition:', e);
        Alert.alert('Microphone Error', 'Could not start microphone. Please check permissions and try again.');
        setIsRecording(false);
    }
};

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error('Error stopping recognition:', e);
      Alert.alert('Stop Error', 'Could not stop microphone.');
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      setIsRecording(false);
      setRecognizedText('');
      setPitch('');
      setError('');
      setStarted('');
      setEnd('');
      setResults([]);
      latestRecognizedText.current = ''; // <--- Reset the ref here too
    } catch (e) {
      console.error('Error destroying recognizer:', e);
    }
  };

  const speakResponse = async (textToSpeak) => {
    try {
      await Tts.speak(textToSpeak);
    } catch (error) {
      console.error('TTS error:', error);
      Alert.alert('TTS Error', 'Could not speak response. Please check TTS engine settings.');
    }
  };

  const handleSendMessage = async (messageContent) => {
    console.log('handleSendMessage called with messageContent:', messageContent);

    const textToSend = messageContent.trim();
    if (!textToSend) {
      console.log('handleSendMessage: Message content is empty, aborting send.');
      return;
    }

    setInput('');
    setRecognizedText('');
    latestRecognizedText.current = ''; // <--- Clear the ref after sending
    setLoading(true);

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);

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
      speakResponse(aiReply);
    } catch (err) {
      console.error('Error fetching AI reply:', err);
      setMessages([...newMessages, { sender: 'bot', text: 'Error fetching reply.' }]);
      speakResponse('Error fetching reply.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.centerHeader}>
          <LottieView
            source={require('../assets/Lottie/gitto.json')}
            autoPlay
            loop
            style={{ width: 40, height: 40, marginRight: 8 }}
          />
          <Text style={styles.headerText}>Gitto</Text>
        </View>

        <View style={styles.backButton} />
      </View>



{/* --- ADD THIS SECTION --- */}
{isRecording && ( // Only show this text when recording is active
  <Text style={styles.listeningStatus}>Listening...</Text>
)}

      <ScrollView style={styles.chatBox} contentContainerStyle={styles.chatContentContainer}>
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
        <TouchableOpacity
          style={styles.micButton}
          onPress={isRecording ? stopRecognizing : startRecognizing}
        >
          <Ionicons
            name={isRecording ? 'mic-off' : 'mic'}
            size={28}
            color={isRecording ? '#FF6347' : '#fff'}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message or tap mic"
          placeholderTextColor="#aaa"
          editable={!isRecording}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleSendMessage(input)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.sendText}>➤</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingTop: Platform.OS === 'android' ? 0 : 40,
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
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatBox: {
    flex: 1,
    padding: 10,
  },
  chatContentContainer: {
    paddingBottom: 20,
  },
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
    alignItems: 'center',
  },
  micButton: {
    padding: 8,
    marginRight: 10,
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
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  sendText: {
    color: '#fff',
    fontSize: 20,
  },
 
listeningStatus: {
  color: '#fff', // White text
  textAlign: 'center', // Center the text
  marginTop: 10, // Add some space from the header
  fontSize: 14,
  fontStyle: 'italic', // Make it slightly different
},

// ... (rest of your styles)
});