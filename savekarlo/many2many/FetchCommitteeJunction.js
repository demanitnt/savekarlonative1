import { auth, db } from "../firebase";

async function FetchCommitteeJunction(member_id) {
  const junctions = await db
    .collection(`com_member_rel`)
    .where("member_id", "==", member_id)
    .get();

  const committees = await Promise.all(
    junctions.docs
      .filter((doc) => doc.exists)
      .map((doc) => db.doc(`committees/${doc.data().com_id}`).get())
  );
  return committees
    .filter((doc) => doc.exists)
    .map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default FetchCommitteeJunction;
