import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { db, auth } from "../firebase";
const optionsPerPage = [2, 3, 4];
import { DataTable, FAB, List } from "react-native-paper";
import styles from "../styles";

const ViewAllCommittees = ({ navigation }) => {
  var committeeId = "";
  const user = auth.currentUser;
  const [page, setPage] = useState(0);
  const [itemsPperPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [committees, setCommittees] = useState([]);
  const [allCommittees, setAllCommittees] = useState([]);

  var getAllCommitteesOfCurrentUser = "";

  useEffect(() => {
    var ref = db.collection("committees");
    const refJunctionTable = db.collection("com_member_rel");
    const JunctionTablebyUser = refJunctionTable.where(
      "member_id",
      "==",
      user.uid
    );
    JunctionTablebyUser.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCommittees(objs);
    } )
    committees.map(comittees=>{
        var ref1=db.collection("committees").doc(comittees["com_id"]);
  
     
    ref1.get().then(doc=>{
      if (doc.exists) {
        var doc = doc.data();
        var committee=committees
        committee.push(doc);
        setAllCommittees(committee)
        console.log("this is committee",committees)
      } else {
        console.log("No such document!");
      }
    }) 
  });
    
    
    
  }, []);

  const handleSubmit = (x) => {
    console.log("The clicked", x);
  };

  return (
    <>
      <View>
        <DataTable.Header>
          <DataTable.Title>Committee Name</DataTable.Title>
          <DataTable.Title numeric>Committee Share</DataTable.Title>
        </DataTable.Header>
        {allCommittees.map((x) => (
          <View key={x.id}>
            <DataTable>
              {/* <List.Items onPress={()=> handleSubmit(x)}> */}

              <DataTable.Row
                onPress={() =>
                  navigation.navigate("membermain", {
                    screen: "viewallmembers",
                    params: {
                      comName: x.comName,
                      comShare: x.comShare,
                      comId: x.id,
                    },
                  })
                }
              >
                <DataTable.Cell>{x.comName}</DataTable.Cell>
                <DataTable.Cell numeric>{x.comShare}</DataTable.Cell>
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
        label="Add Committee"
        onPress={() => navigation.navigate("addOnecommittee")}
      />
    </>
  );
};

export default ViewAllCommittees;
