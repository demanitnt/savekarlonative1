import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { FAB, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import firebase from "firebase";
import { auth, db } from "../../firebase";
import styles from "../../styles";
import { Picker } from "@react-native-picker/picker";

const AddOneCommittee = ({ route, navigation }) => {
  const [AllMembers, setAllMembers] = React.useState([]);
  const [MembersForPicker, setMembersForPicker] = React.useState([]);

  const memberCommitteeDetail = [];
  const { comId } = route.params;
  const onChangePicker = (user) => {
    console.log("the user at onChangePicker", user);
    setMembersForPicker(user);
  };

  useEffect(() => {
    const refPicker = db.collection("members");

    refPicker.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("objs at add member", objs);
      setAllMembers(objs);
    });
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("in the onsubmit and membersfor picker", MembersForPicker);

    var member = AllMembers.find((x)=> x.uid == MembersForPicker) 
    var junctionRel = {
      com_id: comId,
      member_id: member.uid,
      Jan: true,
      Feb: true,
      Mar: true,
      Apr: false,
      May: false,
      Jun: false,
      Jul: false,
      Aug: false,
      Sep: false,
      Oct: false,
      Nov: false,
      Dec: false,
    };
    const refJunction = db.collection("com_member_rel");

    await refJunction.add(junctionRel);
    navigation.goBack();
  };

  console.log("The memberforpicker value before return()", AllMembers);

  return (
    <>
      <View>
        <Picker
          selectedValue={MembersForPicker}
          onValueChange={onChangePicker}
        >
          <Picker.Item key="0101" label="Select Member" value="Select Member"></Picker.Item>
          {AllMembers != undefined && AllMembers &&
            AllMembers.map((x) => (
              <Picker.Item key={x.id} label={x.email} value={x.uid} />
            ))}
        </Picker>
        <FAB icon="plus" onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};
export default AddOneCommittee;
