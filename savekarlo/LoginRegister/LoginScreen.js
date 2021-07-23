import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import RegisterScreen from "./RegisterScreen";
import {auth} from '../firebase'

const LoginScreen = ({ navigation }) => { 
  const image= { uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fbusinessmen-put-the-coin-in-a-glass-jar-to-save-money-save-money-on-investments-gm1178099337-329137307&psig=AOvVaw2y6IEzyRI6OjzyHFdmXSW7&ust=1626787438548000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLiI_82d7_ECFQAAAAAdAAAAABAL"}
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
    <View >
      {/* <ImageBackground source={require("../assets/loginbackgrd.jpg")}  resizeMode="cover" style={styles.image}></ImageBackground> */}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width:600,
    height:600
    
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});
export default LoginScreen;
