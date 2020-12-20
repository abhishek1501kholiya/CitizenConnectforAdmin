import React from 'react'
import {View,Text,TouchableOpacity,Image,FlatList,ScrollView,ActivityIndicator} from 'react-native'
import firebase from 'firebase'
import db from '../Config'
import {Avatar} from 'react-native-paper'
export default class ComplainViewScreen extends React.Component{
constructor(){
    super()
    this.state = {
        image :[],
        imageRef:null,
        imageload : true,
        loading : false

    

    }
}

   componentDidMount(){
    
   
    const displayImage = (uri, title, reason,location,name,email)=>{
    
      var image = this.state.image;
      var img = {
        title : title,
        reason : reason,
        img : uri,
        location : location,
        name : name,
        email : email
      }
      image.push(img)
      this.setState({
          image:image,
          loading: true
      }
  
      )
    }
    const getData = ()=>{
     
      var ref  = db.ref('Users/Complains');
      ref.once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
           var childKey = childSnapshot.key;
           var childData = childSnapshot.val();
            var title = childData.Title;
            var uri = childData.url
             var reason = childData.reason;
             var location = childData.location
             var name = childData.name;
             var email = childData.email
             displayImage(uri, title, reason,location,name,email)
        })
      })
    }
    getData()
//     var storageRef = firebase.storage().ref();
//     var imageRef = storageRef.child('Complaints/');

//       storageRef.child('Complaints/').listAll().then(function(result){
//          result.items.forEach(function(imageRef){
//       //  imageRef.getDownloadURL().then(function (url){
         
       
//      forImage(imageRef)
//       //  })
//     })

// });

// const forImage = (image)=>{
//     image.getDownloadURL().then(function (url){
//        // console.log(url)
//     if(url !== undefined){
//        getData(url)
     

       
//     }
//  })


  
}

 

    render(){  
     
      return(
    <View>
      <Text style={{fontWeight:'bold',textAlign:'center'}}>Complain List</Text>
    <ScrollView style={{backgroundColor:'white',borderWidth:1,borderColor:'#DBDBDB',marginTop:25}}>

        {this.state.loading ?  this.state.image.map((i, v) =><View key={v} style={{backgroundColor:'orange',borderWidth:1,borderColor:'#DBDBDB'}}> 
       <TouchableOpacity style={{backgroundColor:'white'}}>
        <Text style={{marginTop:100,alignSelf:'center',fontWeight:"bold",color:'black'}}>{i.name}</Text>
        <Text style={{alignSelf:'center',fontWeight:"bold",color:'black'}}>{i.email}</Text>
        <Image  style={{width:250,height:250,alignSelf:'center',marginBottom:15}} source={{uri: i.img}}/>
        <Text style ={{fontWeight:'bold',textAlign:'center'}}> Complain About {i.title}</Text>
        <Text style={{fontWeight:'bold',textAlign:'center'}}> Description {i.reason}</Text>
        <Text style={{fontWeight:'bold',textAlign:'center'}}>Location {i.location}</Text>
      </TouchableOpacity>
        
        
        </View>
         ) : <Text>Loading...</Text>}
     </ScrollView>
     </View>
      )
    }
}