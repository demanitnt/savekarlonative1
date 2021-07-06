import React from 'react'
import {Text} from 'react-native'
import { auth, db } from '../firebase';
import FetchCommitteeJunction from "../many2many/FetchCommitteeJunction";

const LogOutTab =({navigation})=>{
    const user= auth.currentUser;
    auth.signOut();

    FetchCommitteeJunction(user.uid).then((committees)=>{
        console.log("The data from table", committees)

    });
    
return (

<Text> LogOUt Tab</Text>

)



}

export default LogOutTab;