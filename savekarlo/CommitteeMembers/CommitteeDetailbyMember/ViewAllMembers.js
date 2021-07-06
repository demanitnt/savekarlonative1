import React, { useRef, useState, useEffect } from "react";
import { View, Text, CheckBox } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { auth, db } from "../../firebase";
import styles from "../../styles";
import { DataTable, FAB, List } from "react-native-paper";

const ViewAllMembers = ({ route, navigation }) => {
  const optionsPerPage = [2, 3, 4];
  const user = auth.currentUser;
  const [com_member_rel, setCom_member_rel] = useState([]);
  let getMemberName = "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { comName, comShare, comId } = route.params;
  const [page, setPage] = useState(0);
  const [AllMembers, setAllMembers] = React.useState([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  const abc = [];
  console.log("the nav", route);
  useEffect(() => {
    const ref = db.collection("com_member_rel");
    const ref2 = db.collection("com_member_rel");

    const databymemberCommitteeid = ref.where(
      "com_id",
      "==",
      comId
    );
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
  
    var member = AllMembers.find((x) => x.uid == uid);
   console.log("member", member)
  //  member = JSON.parse ( member )


    // return member.memberName;
  }
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
          <View key={x.id}>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>
                  {getMemberNameById(x.member_id)}
                </DataTable.Cell>
                <DataTable.Cell boolean>
                  <CheckBox value={x.Jan} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Feb} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Mar} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Apr} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.May} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Jun} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Jul} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Aug} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Sep} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Oct} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Nov} onValueChange="" />
                </DataTable.Cell>
                <DataTable.Cell>
                  <CheckBox value={x.Dec} onValueChange="" />
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
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
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("addmember", { comId: comId })}
      />
    </>
  );
};

export default ViewAllMembers;
