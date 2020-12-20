import React from 'react'
import {View,Text,TouchableOpacity,Image,FlatList,ScrollView,ActivityIndicator} from 'react-native'
import firebase from 'firebase'
import db from '../Config'

export default class PickUp extends React.Component{
    constructor(){
        super()
        this.state={
    
            garbages : [],
            loading : false
           
        }
    }
   
    componentDidMount(){
        const saveGarges = (garbage) => {
            var garbages = this.state.garbages;
            garbages.push(garbage);
    
            this.setState({
                garbages : garbages,
                loading : true
            });
        }
        var ref = db.ref('Users/Schedules');
        ref.once('value',function(snapshot){
          snapshot.forEach(function(childSnapshot){
             var childKey = childSnapshot.key;
             var childData = childSnapshot.val();
              var type = childData.kindOfWaste;
              var date = childData.date
               var location = childData.location;
               var numberOfGarbagesBags = childData.numberOfGarbageBags;
               var number = childData.phoneNumber
               var timeSlot = childData.timeSlot;
               var name = childData.name
               var gr = {
                   type : type,
                   date : date,
                   location : location,
                   bagsVolume : numberOfGarbagesBags,
                   contactNumber : number,
                   time : timeSlot,
                   name : name
               }
               saveGarges(gr)
          })
        })
    }


     
    render(){

      return(
    <View>
        <Text style={{fontWeight:'bold',textAlign:'center'}}>List of Garbage Pickup</Text>
        <ScrollView style={{backgroundColor:'white',borderWidth:1,borderColor:'#DBDBDB',marginTop:25}}>

              { this.state.loading ? 
                  this.state.garbages.map((k, v) => <View key={v} style={{marginTop:15,backgroundColor:'grey'}} > 
                      
                        <Text style={{fontWeight:'bold',marginTop:25}} >Person Name {k.name}</Text>

                        <Text style={{fontWeight:'bold',marginTop:15}} >Date {k.date}</Text>

                        <Text  style={{fontWeight:'bold',marginTop:15}}> Garbage Type {k.type}</Text>

                        <Text style={{fontWeight:'bold',marginTop:15}}> Location {k.location}</Text>

                        <Text style={{fontWeight:'bold',marginTop:15}}>Number of Bags{k.bagsVolume}</Text>
                        <Text style={{fontWeight:'bold',marginTop:15}} >Phone number {k.contactNumber}</Text>
                        <Text style={{fontWeight:'bold',marginTop:15}}>Time Slot  {k.time}</Text>
                    </View>
                  ) : <Text>Loading...</Text>
              }

          </ScrollView>
          </View>
      )
  }
}