import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f2f2f2",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: "5%",
      color: "black",
    },
    Button:{
      width:130,
      height:50,
      backgroundColor:"#086dd2",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:25
    },
    ButtonText:{
      fontSize: 18,
      fontWeight: "bold",
      color:"#FFFFFF",
      textAlign:"center"
    },
    Info_Container: {
      width: "85%",
      height: 200,
      padding: 24,
      backgroundColor: "#fff",
      borderWidth: 1.5,
      borderColor: "lightgray",
      borderRadius: 8,
      marginBottom: "5%",
      justifyContent: 'center',
      elevation: 5, 
    },
    Info_Text: {
      fontSize: 15,
      fontWeight:"regular",
      color: "black",
      marginBottom: 4,
    },
  });

  export default styles;