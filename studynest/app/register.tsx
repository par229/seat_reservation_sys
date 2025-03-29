import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const [form, setForm] = useState({
    user_id: '',
    password: '',
    name: '',
    major: '',
    year: '',
    phone_number: '',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = () => {
    const { user_id, password, name, major, year, phone_number } = form;

    if (!user_id || !password || !name || !major || !year || !phone_number) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }

    Alert.alert('회원가입 완료', `${name}님 환영합니다!`);
    router.replace('/'); // 로그인 화면으로 이동
  };

  return (
    <LinearGradient colors={['#38a169', '#2f855a']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>회원가입</Text>
          {[
            { key: 'user_id', placeholder: '아이디' },
            { key: 'password', placeholder: '비밀번호', secure: true },
            { key: 'name', placeholder: '이름' },
            { key: 'major', placeholder: '학과' },
            { key: 'year', placeholder: '학년' },
            { key: 'phone_number', placeholder: '연락처' },
          ].map(({ key, placeholder, secure }) => (
            <View key={key} style={styles.inputContainer}>
              <Ionicons name="person" size={18} color="#fff" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={form[key as keyof typeof form]}
                onChangeText={(value) => handleChange(key as keyof typeof form, value)}
                secureTextEntry={secure}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>가입하기</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: 'center' },
  formContainer: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: width * 0.85,
    height: 50,
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#2f855a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
