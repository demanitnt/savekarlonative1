import React from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import RegisterScreen from "./RegisterScreen";
import {auth} from '../firebase'

const LoginScreen = ({ navigation }) => { 
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(
      email.trim().toLowerCase(),
      password
    );
  };
  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      <View>{errors.email && <Text>You must fill in your email</Text>}</View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      <View>
        {errors.password && <Text>You must fill in your password</Text>}
      </View>
      <View>
        <Button
          mode="contained"
          compact={false}
          onPress={handleSubmit(onSubmit)}
          icon="account-arrow-right"
        >
          Sign in
        </Button>
      </View>

      <View>
        <Text>Don't have an account yet?</Text>
      </View>
      <Button
        mode="outlined"
        icon="account-plus"
        compact
        onPress={() => navigation.navigate("register")}
      >
        Register Account
      </Button>
    </View>
  );
};
export default LoginScreen;
