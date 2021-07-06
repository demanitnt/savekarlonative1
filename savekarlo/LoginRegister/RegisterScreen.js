import React, { useRef } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { auth, db } from "../firebase";

const RegisterScreen = (navigation) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (formData) => {
    const { email, password } = formData;
    auth
      .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
      .then((user) => {
        console.log(user.user.uid);
        var member = {
          email: email.trim().toLowerCase(),
          memberpassword: password,
          uid: user.user.uid,
          memberName: email.trim().toLowerCase(),
        };
        const ref = db.collection("members");
        ref.add(member).then(() => {});
      });
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
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      <View>{errors.email && <Text> You must enter email</Text>}</View>

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
      <View>{errors.password && <Text> Enter password</Text>}</View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Confirm password"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="passwordConf"
        rules={{
          required: true,
          validate: (value) =>
            value === password.current || "The passwords does not match",
        }}
        defaultValue=""
      />
      <View>
        {errors.passwordConf && <Text>{errors.passwordConf.message}</Text>}
      </View>
      <Button
        mode="contained"
        compact={false}
        onPress={handleSubmit(onSubmit)}
        icon="account-plus"
      >
        Register Account
      </Button>
      <View>
        <Text> Do you already have an account?</Text>
      </View>
      <Button
        mode="outlined"
        icon="account-arrow-right"
        compact
        onPress={() => navigation.goBack}
      >
        SignIn
      </Button>
    </View>
  );
};

export default RegisterScreen;
