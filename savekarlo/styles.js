import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles  = StyleSheet.create({

    notComplete: {
        color: 'grey',
        textDecorationLine: 'line-through',
        margin: 5,
      },
      complete: {
        margin: 5,
      },
      picker:
      {
        margin: 210,
        top: 160
      },
      fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'green',
      },
      inputatcomdetail: {
        position: 'absolute',
        margin: 210,
        // top:200,
        right: 230,
        left:150,
        bottom: 160,
        backgroundColor: 'grey',
      },
      inputatcomdetail1: {
        position: 'absolute',
        margin: 210,
        // top:200,
        right: 230,
        left:150,
        bottom: 200,
        backgroundColor: 'grey',
      }
})

export default styles;