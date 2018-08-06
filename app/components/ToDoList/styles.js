import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    containerHorizontal: {
      margin: 4,
      flexDirection: 'row'
    },
    containerHorizontalItem: {
      margin: 4,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    containerFlatlist: {
      margin: 4
    },
    title: {
      fontSize: 20,
      margin: 10,
      color: "#fff"
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    textInput: {
      flex: 10,
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1,
    },
    textButton: {
      height: 40, 
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#1E88E5',
      fontSize: 20,
      paddingLeft: 2,
      paddingRight: 2,
    },
    textTask: {
      flex: 8,
      fontSize: 20,
      color: '#000',
    },
    checkBoxTask: {
      flex: 2,
    },
    swipe: {
      backgroundColor: 'transparent'
    },
  });
  
export default styles;
