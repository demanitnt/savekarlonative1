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
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [checked5, setChecked5] = React.useState(false);
  const [checked6, setChecked6] = React.useState(false);
  const [checked7, setChecked7] = React.useState(false);
  const [checked8, setChecked8] = React.useState(false);
  const [checked9, setChecked9] = React.useState(false);
  const [checked10, setChecked10] = React.useState(false);
  const [checked11, setChecked11] = React.useState(false);
  const [checked12, setChecked12] = React.useState(false);

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

  const updateCheckboxValue = (e, month, collectionId, member_id) => {
    var valueToUpdate = getCheckBoxValue(month);
    var monthSelect = getMonth(month);
    console.log("collectionId:", e, month, collectionId, member_id);
    const refCheckbox = db.collection("com_member_rel").doc(collectionId);

    refCheckbox
      .get()
      .then((doc) => {
        if (doc.exists) {
          var doc = doc.data();
          doc[monthSelect] = e;
          refCheckbox.set(
            doc,
            { merge: true }
          );
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return false;
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

  const getMonth = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return "Jan";
        break;
      case 1:
        return "Jan";
        break;
      case 2:
        return "Feb";
        break;
      case 3:
        return "Mar";
        break;
      case 4:
        return "Apr";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "Jun";
        break;
        case 12:
        return "Dec";
        break;
      default:
        break;
    }
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
                <CheckBox
                  style={styles.checkbox}
                  value={checked1}
                  id="1"
                  onValueChange={(e) =>
                    updateCheckboxValue(
                      e,
                      1,
                      x.id,
                      x.member_id,
                      setChecked1(!checked1)
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked2}
                  id="2"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked2(!checked2),
                      { month: 2 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked3}
                  id="3"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked3(!checked3),
                      { month: 3 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked4}
                  id="4"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked4(!checked4),
                      { month: 4 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked5}
                  id="5"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked5(!checked5),
                      { month: 5 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked6}
                  id="6"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked6(!checked6),
                      { month: 6 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked7}
                  id="7"
                  onValueChange={() => {
                    updateCheckboxValue(
                      setChecked7(!checked7),
                      { month: 7 },
                      x.id
                    );
                  }}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked8}
                  id="8"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked8(!checked8),
                      { month: 8 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked9}
                  id="9"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked9(!checked9),
                      { month: 9 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked10}
                  id="10"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked10(!checked10),
                      { month: 10 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked11}
                  id="11"
                  onValueChange={() =>
                    updateCheckboxValue(
                      setChecked11(!checked11),
                      { month: 11 },
                      x.id
                    )
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={checked1}
                  id="12"
                  onValueChange={(e) =>
                    updateCheckboxValue(
                      e,
                      12,
                      x.id,
                      x.member_id,
                      setChecked1(!checked1)
                    )
                  }
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
