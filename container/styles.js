import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export const styles = StyleSheet.create({

  logo: {

      width: (screenHeight/100) * 25,
      height: (screenHeight/100) * 20,


  },

  usersImage: {

      width: (screenHeight/100) * 13,
      height: (screenHeight/100) * 13,
      marginBottom: '3%'


  }

})
