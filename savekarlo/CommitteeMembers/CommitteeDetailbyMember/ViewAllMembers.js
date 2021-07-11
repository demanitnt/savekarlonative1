import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, CheckBox } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { auth, db } from "../../firebase";
// import styles from "../../styles";
import { DataTable, FAB, List } from "react-native-paper";
import { Checkbox } from "react-native-paper";

const ViewAllMembers = ({ route, navigation }) => {
  const optionsPerPage = [2, 3, 4];
  const user = auth.currentUser;
  const [com_member_rel, setCom_member_rel] = useState([]);
  let getMemberName = "";
  const changeMonthVal = [];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { comName, comShare, comId } = route.params;
  const [page, setPage] = useState(0);
  const [AllMembers, setAllMembers] = React.useState([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [checked, setChecked] = React.useState(false);

  const abc = [];
  console.log("the nav", route);
  useEffect(() => {
    const ref = db.collection("com_member_rel");
    const ref2 = db.collection("com_member_rel");

    const databymemberCommitteeid = ref.where("com_id", "==", comId);
    databymemberCommitteeid.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,

          ...doc.data(),
        });
      });
      setCom_member_rel(objs);
    });
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

  const getMemberNameById = (uid) => {
    console.log("UID in detail", uid, AllMembers);
  };

  const updateCheckboxValue = (e, month, collectionId) => {
    const refCheckbox = db.collection("com_member_rel").doc(collectionId);
    refCheckbox
      .get()
      .then((doc) => {
        if (doc.exists) {
          refCheckbox.set(
            {
              Dec: !checked,
            },
            { merge: true }
          );
          
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const onSubmitCheckbox = () => {
    console.log("The save button: ", changeMonthVal);

    // const refCheckbox = db.collection("com_member_rel");

    // const refCheckboxCondition = refCheckbox.where(
    //   "com_id",
    //   "==",
    //   comId,
    //   "&&",
    //   "member_id","==",
    // );
  };

  return (
    <>
      <View>
        <DataTable.Header>
          <DataTable.Title>Member Name</DataTable.Title>
          <DataTable.Title>Jan</DataTable.Title>
          <DataTable.Title>Feb</DataTable.Title>
          <DataTable.Title>Mar</DataTable.Title>
          <DataTable.Title>Apr</DataTable.Title>
          <DataTable.Title>May</DataTable.Title>
          <DataTable.Title>Jun</DataTable.Title>
          <DataTable.Title>Jul</DataTable.Title>
          <DataTable.Title>Aug</DataTable.Title>
          <DataTable.Title>Sep</DataTable.Title>
          <DataTable.Title>Oct</DataTable.Title>
          <DataTable.Title>Nov</DataTable.Title>
          <DataTable.Title>Dec</DataTable.Title>
        </DataTable.Header>
        {com_member_rel.map((x) => (
          <DataTable key={x.id}>
            <DataTable.Row>
              <DataTable.Cell></DataTable.Cell>
              <DataTable.Cell boolean>
                {/* <CheckBox style={styles.checkbox} value={x.Jan} id="1" onValueChange={()=>{changeMonthVal[0]!=x.Jan}} /> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.Feb} id="2" onPress={()=>{changeMonthVal[1]!=x.Feb}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.Mar} id="3" onPress={()=>{changeMonthVal[2]!=x.Mar}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.Apr} id="4" onPress={()=>{changeMonthVal[3]!=x.Apr}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.May} id="5" onPress={()=>{changeMonthVal[4]!=x.May}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.Jun} id="6" onPress={()=>{changeMonthVal[5]!=x.Jun}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.Jul} id="7" onPress={()=>{changeMonthVal[6]!=x.Jul}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.Aug} id="8" onPress={()=>{changeMonthVal[7]!=x.Aug}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.Sep} id="9" onPress={()=>{changeMonthVal[8]!=x.Sep}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <CheckBox style={styles.checkbox} value={x.Oct} id="10" onPress={()=>{changeMonthVal[9]!=x.Oct}}/> */}
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox style={styles.checkbox} value={x.Nov} id="11" />
              </DataTable.Cell>
              <DataTable.Cell>
                {/* <Text> <Checkbox style={styles.checkbox}  status={checked ? 'checked' : 'unchecked'}   id="12" onPress={()=>{ setChecked(!checked)}}/></Text> */}
                <CheckBox
                  style={styles.checkbox}
                  value={checked}
                  id="12"
                  onValueChange={()=>updateCheckboxValue(setChecked(!checked),
                    { month: 12 },
                    x.id
                  )}
                />
                {/* <CheckBox style={styles.checkbox} data-userId={x.id} value={checked} checked={checked}   id="12" onValueChange={setChecked} /> */}

                {/* <Text> <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    /></Text> */}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ))}
        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={"Rows per page"}
        />
        <Button onPress={() => handleSubmit(onSubmitCheckbox())}>
          {" "}
          Save Changes
        </Button>
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("addmember", { comId: comId })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "green",
  },
  checkbox: {
    alignSelf: "center",
    height: 22,
    width: 22,
  },
  label: {
    margin: 8,
  },
});
export default ViewAllMembers;
