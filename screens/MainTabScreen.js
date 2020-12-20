import React from 'react'
import {View,Text} from 'react-native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import ComplainViewScreen from './ComplainViewScreen'
import Pickup from './PickUp'
import {FontAwesome5} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import { Entypo } from '@expo/vector-icons'; 
const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = ()=>{
 return(
    <Tab.Navigator initialRouteName="Home" activeColor="#e91e63">
        <Tab.Screen name="Home" component={ComplainViewScreen}
          options={{
              tabBarLabel:'Home',
              tabBarIcon:({color})=>(
                <Entypo name="home" size={24} color="black" />
              ),
               
          }}
       />
        <Tab.Screen name="Pickup" component={Pickup}
         options={{
            tabBarLabel:'PickUp',
            tabBarIcon:({color})=>(
              <FontAwesome5 name="truck-pickup" size={22} color="black" />
      
            ),
        }}
        />
    </Tab.Navigator>
 )
  const HomeStack = createStackNavigator()
  const Pickups = createStackNavigator()
  const HomeStackScreen = ({navigation})=>(
    <HomeStack.Navigator screenOptions={{
          headerStyle:{
           backgroundColor:'#009397',
           height:65
        },
         headerTitleStyle:{
          fontWeight:'bold'
        }
       }}>
           <HomeStack.Screen name="Home" component={ComplainViewScreen} options={{
            title:'Complain List ',
           
           }}/>
            
            <HomeStack.Screen name="Pickup" component={Pickup} options={{
            title:'Pickups List  ',
           
           }}/>
         
       
      </HomeStack.Navigator>
 )
 
  

}
export default MainTabScreen