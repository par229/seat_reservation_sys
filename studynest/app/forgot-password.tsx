import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput,
  TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!studentId.trim()) {
      Alert.alert('입력 오류', '학번 또는 이메일을 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      // 실제 서버로 요청 보내는 부분 (예: Axios 사용 시)
      // await axios.post('/forgot-password', { studentId });

      await new Promise(resolve => setTimeout(resolve, 1500)); // 모의 API

      Alert.alert(
        '메일 전송 완료',
        '비밀번호 재설정 링크가 이메일로 전송되었습니다.',
        [{ text: '확인', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('오류', '비밀번호 찾기 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>비밀번호 찾기</Text>
      <Text style={styles.description}>
        등록된 학번 또는 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
      </Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#888" />
        <TextInput
          placeholder="학번 또는 이메일"
          style={styles.input}
          value={studentId}
          onChangeText={setStudentId}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>비밀번호 재설정</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  description: { fontSize: 14, color: '#666', marginBottom: 24 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 16 },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
