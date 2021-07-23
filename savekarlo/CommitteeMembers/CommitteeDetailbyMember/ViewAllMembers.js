import React, { useRef, useState, useEffect, StrictMode } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  CheckBox,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { auth, db } from "../../firebase";
// import styles from "../../styles";
import { DataTable, FAB, List } from "react-native-paper";
import { Checkbox } from "react-native-paper";

const ViewAllMembers = ({ route, navigation }) => {
  // *************************** Declaration*********************************
  const optionsPerPage = [2, 3, 4];
  const user = auth.currentUser;
  const [com_member_rel, setCom_member_rel] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { comName, comShare, comId, belongsTo } = route.params;
  const [page, setPage] = useState(0);
  const [AllMembers, setAllMembers] = React.useState([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  var committeeMembers = [];

  // ************************** Methods****************************************

  // useEffect

  useEffect(() => {
    const ref = db.collection("com_member_rel");
    const ref2 = db.collection("com_member_rel");
    const databymemberCommitteeid = ref.where("com_id", "==", comId);
    const refPicker = db.collection("members");

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

    refPicker.onSnapshot((query) => {
      const objss = [];
      query.forEach((doc) => {
        objss.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAllMembers(objss);
    });
  }, []);

  // updateCheckboxValue

  const updateCheckboxValue = (e, month, collectionId) => {
    var monthSelect = getMonth(month);
    console.log("collectionId:", e, month, collectionId);
    const refCheckbox = db.collection("com_member_rel").doc(collectionId);

    refCheckbox
      .get()
      .then((doc) => {
        if (doc.exists) {
          var doc = doc.data();
          doc[monthSelect] = e;
          refCheckbox.set(doc, { merge: true });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return false;
  };

  // onSubmitCheckbox

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

  // getMonth

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
      case 7:
        return "Jul";
        break;
      case 8:
        return "Aug";
        break;
      case 9:
        return "Sep";
        break;
      case 10:
        return "Oct";
        break;
      case 11:
        return "Nov";
        break;

      case 12:
        return "Dec";
        break;
      default:
        break;
    }
  };

  // getMemberName

  const getMemberName = (memberid) => {
    let memberNameReturned = "";

    AllMembers.map((x) => {
      if (x["uid"] === memberid) memberNameReturned = x["memberName"];
    });

    return memberNameReturned;
  };

  //  return

  return (
    <>
      <View>
        {/* table */}

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
              <DataTable.Cell>{getMemberName(x["member_id"])}</DataTable.Cell>
              <DataTable.Cell boolean>
                <CheckBox
                  disabled={belongsTo == user.uid}
                  style={styles.checkbox}
                  value={x["Jan"]}
                  id="1"
                  onValueChange={(e) => updateCheckboxValue(e, 1, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Feb "]}
                  id="2"
                  onValueChange={(e) => updateCheckboxValue(e, 2, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Mar"]}
                  id="3"
                  onValueChange={(e) => updateCheckboxValue(e, 3, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Apr"]}
                  id="4"
                  onValueChange={(e) => updateCheckboxValue(e, 4, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["May"]}
                  id="5"
                  onValueChange={(e) => updateCheckboxValue(e, 5, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Jun"]}
                  id="6"
                  onValueChange={(e) => updateCheckboxValue(e, 6, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Jul"]}
                  id="7"
                  onValueChange={(e) => updateCheckboxValue(e, 7, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Aug"]}
                  id="8"
                  onValueChange={(e) => updateCheckboxValue(e, 8, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Sep"]}
                  id="9"
                  onValueChange={(e) => updateCheckboxValue(e, 9, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Oct"]}
                  id="10"
                  onValueChange={(e) => updateCheckboxValue(e, 10, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Nov"]}
                  id="11"
                  onValueChange={(e) => updateCheckboxValue(e, 11, x.id)}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <CheckBox
                  style={styles.checkbox}
                  value={x["Dec"]}
                  id="12"
                  onValueChange={(e) => updateCheckboxValue(e, 12, x.id)}
                />
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
      </View>

      {/* FAB   */}

      <FAB
        style={styles.fab}
        label="Add Member"
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
