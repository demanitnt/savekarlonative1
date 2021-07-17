import React from "react";
import { Text, View } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import firebase from "firebase";
import { auth, db } from "../firebase";
import styles from "../styles";

const AddOneCommittee = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = auth.currentUser;
    try {
      console.log("The date is", data);
      const committee = {
        comName: data.nameofcommittee,
        comShare: data.committeeshare,
        completed: false,
        belongsTo: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const ref = db.collection("committees");

      var addedCommitteeId = await ref.add(committee);
console.log("committe doc id", addedCommitteeId)
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Name of Committee"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        name="nameofcommittee"
        rules={{ required: true }}
        defaultValue=""
      />
      <View>
        {errors.nameofcommittee && <Text> You must enter committee Name</Text>}
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Committee Share"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="committeeshare"
        rules={{ required: true }}
        defaultValue=""
      />
      <View>
        {errors.committeeshare && <Text> Enter Committee Share</Text>}
      </View>

      <FAB style={styles.fab} icon="plus" onPress={handleSubmit(onSubmit)} />
    </>
  );
};
export default AddOneCommittee;
