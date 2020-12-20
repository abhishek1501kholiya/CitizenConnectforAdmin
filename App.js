import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Platform,TextInput,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import {ComplainViewScreen} from './screens/ComplainViewScreen'
import db from './Config'
import firebase from 'firebase'
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import MainTabScreen from './screens/MainTabScreen'
import SplashScreen from './screens/SplashScreen'
class LoginScreen extends React.Component{
  constructor(){
    super()
    this.state={
        email:'',
        Password:'',
        check_textInputChange:false,
        secureTextEntry:true
    }
    
}




render(){
  const updateSecureTextEntery = ()=>{
    this.setState({
        secureTextEntry: !this.state.secureTextEntry
    })
    alert('Working')
}  
const email = this.state.email ;
const Password = this.state.Password;

return(
   <View style={styles.container}>
      <View style={styles.header}>
            <Text style={styles.text_header}>Welcome to Go News!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>

        <View style={styles.action}>

          <FontAwesome name="user-o" size={24} color="black" />

          <TextInput placeholder="Your Email" style={styles.textInput} 
           autoCapitalize="none"
           onChangeText={(email)=>{this.setState({
               email:email
           })}}
          ></TextInput>

         {this.state.email ?
          <Feather name="check-circle" size={20} color="green" />

          :null}

        </View>

       <Text style={[styles.text_footer,{marginTop:35}]}>Password</Text>
        <View style={styles.action}>

          <FontAwesome name="lock" size={24} color="black" />
          <TextInput placeholder="Your Password" 
               style={styles.textInput} 
               secureTextEntry={this.state.secureTextEntry ? true : false}
                autoCapitalize="none"
                onChangeText={(Password)=>{
                    this.setState({
                       Password:Password
                    })
                }}
               ></TextInput>
     
                
     <TouchableOpacity onPress={()=>{
              this.setState({
               secureTextEntry: !this.state.secureTextEntry
              })
            
              
             }}>
             {this.state.secureTextEntry ?
                <Feather name={'eye-off'} size={20} color="grey" /> :
                <Feather name={'eye'} size={20} color="green" />
             
             }
          
              
             </TouchableOpacity>
        </View>

        <View style={styles.button}>
           
                 <TouchableOpacity onPress={()=>{
                           if(this.state.email!= null && this.state.email != '' && this.state.Password != null && this.state.Password != '' ){
                               alert(' Trying to Login')
                             firebase
                             .auth()
                             .signInWithEmailAndPassword(this.state.email, this.state.Password)
                             .then(() => {
                               alert('You have logged in sucessfully')
                              
                                
                               this.props.navigation.navigate('HomeScreen')
                             })
                             .catch((error) => {
                               var errorCode = error.code;
                               var errorMessage = error.message;
                               return alert(errorMessage);
                             });
                             }
                             else{
                               alert('kindly fill all the fields')
                             }
                      
                   }} style={{width:200,height:40,borderRadius:10,backgroundColor:'#08D4C4',alignItems:'center'}}>
                     <Text style={{fontWeight:'bold',marginTop:10}}>Log In </Text>
                 </TouchableOpacity>

              

                 <TouchableOpacity onPress={()=>{
                     if(this.state.email === null || this.state.email === ''){
                         alert('Kindly enter your email to reset your password')
                     }else{
                       var auth = firebase.auth();
                       var emailAddress = this.state.email;
                       
                       auth.sendPasswordResetEmail(emailAddress).then(function() {
                         // Email sent.
                         alert('An email has been send to reset your password')
                       }).catch(function(error) {
                         // An error happened.
                       });
                     }
                 }} style={{marginTop:50}}>
                     <Text style={{color:'blue',fontWeight:'bold'}}>Forget Password?</Text>
                 </TouchableOpacity>

         
        </View>
         
        
       </View>
   </View>
)
}
}
function HomeScreen({Navigation}){
  return(
    <View>
      <Text>Hare Krishna</Text>
    </View>
  )
}
const Stack = createStackNavigator()

function MyStack(){
  return (
    <Stack.Navigator headerMode={'none'
    }>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={MainTabScreen} />
     </Stack.Navigator>
  );
}

export default function App() {
  return (
     <NavigationContainer>
       <MyStack/>
     </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#009387'
  },
  header:{
      flex:1,
      justifyContent:'center',
      paddingHorizontal:20,
      paddingBottom:50
  },
  footer:{
      flex:3,
      backgroundColor:'#fff',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      paddingHorizontal:20,
      paddingVertical:30
  },
  text_header:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:30
  },
  text_footer:{
      color:'#05375a',
      fontSize:18
  },
  action:{
      flexDirection:'row',
      marginTop:10,
      borderBottomColor:'#f2f2f2',
      paddingBottom:5
  },
  textInput:{
      flex:1,
      marginTop:Platform.OS === 'ios' ? 0 : -12,
      paddingLeft:10,
      color:'#05375a'
  },
  button:{
      alignItems:'center',
      marginTop:50
  },
  signIn:{
      width:'100%',
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
  },
  textSign:{
      fontSize:18,
      fontWeight:'bold'
  }
});