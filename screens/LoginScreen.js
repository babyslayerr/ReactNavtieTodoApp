import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ListIcon from "../assets/list.svg";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  // user상태 바꿔주기
  useEffect(() => {
    // user를 관찰하고 있기 때문에 해당 함수가 실행됨
    // 이 user는 이미 파이어베이스 안에 있는 유저정보를 관찰함
    // 따라서 user로 작성안하고 user1이든 뭐든 아무변수 이름을 담아도 됨
    // useEffect가 화면로딩시점에 실행 후에 비동기 형식으로 아래함수가 실행되고 authState가 변해서 response내려오면
    // 아래 함수가 실행됨
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //메인화면으로 라우팅
        navigation.replace("Main");
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      // 비동기를 동기처리
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      Alert.alert(
        "로그인 중에 문제가 발생했습니다.",
        error.message,
        [{ text: "닫기", onPress: () => console.log("닫기") }],
        { cancelable: true }
      );
    }
  };

  const handleSignUp = async () => {
    try {
      // firebase/auth에서 제공하는 함수
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      Toast.show({
        type: "success",
        text1: "회원가입성공",
        text2: `${email}으로 가입되었습니다.`,
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "회원가입 도중에 발생했습니다.",
        error.message,
        [{ text: "닫기", onPress: () => console.log("닫기") }],
        {
          // 닫기버튼 바깥에서도 닫기버튼이 실행됨
          cancelable: true,
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <ListIcon />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="이메일"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonOutlineText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  inputContainer: {
    width: "80%",
    marginTop: 15,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
});
