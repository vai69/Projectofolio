import React , {useCallback} from 'react'
import { StyleSheet, Text, View,Image, ScrollView, TouchableNativeFeedback , Linking } from 'react-native'


import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector} from 'react-redux';

import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function ProfileScreen(props) {
    
    const {user} = useSelector(state => state.userReducer);
    console.log(user);
    const { projects } = useSelector(state => state.userReducer)
    const project =user.role === "student"? projects.filter(project => project.Contributor.includes(user.Email) && project.status === true)
                  : projects.filter(project => project.Guide === user.Name);
    const proList =project.map((item, key)=>{return(
      <TouchableNativeFeedback key={key}
      onPress={()=>{props.navigation.navigate('ProjectDetail',{project:item})}}
      >
        <View style={styles.projectContainer}>
          <Image 
              style={styles.projectImage} 
              source={{uri : item.imgURL}} 
          />
          <View >
            <Text style={styles.projectTitle} >{item.Title}</Text>
          </View>
        </View>
    </TouchableNativeFeedback>
    )})




    const handlePress = useCallback(async (url) => {
        if (url != undefined) {
          await Linking.openURL(url);
        } else {
          Alert.alert(`Invalid Request` , 'Contributor has not provided URL for this');
        }
    }, []);


    props.navigation.setOptions({
      headerLeft : ()=>{
          return (
              <Feather 
                  name="menu" 
                  size={24} 
                  color="white" 
                  style={{marginLeft : 10}}
                  onPress={()=>{
                      props.navigation.toggleDrawer();
                  }}
              />
          )
      },
      headerRight : ()=>{
        return (
          <AntDesign 
            name="edit" 
            size={24} 
            color="white" 
            style={{marginRight : 10}}
            onPress={()=>{
              props.navigation.navigate('ProfileEditScreen');
            }}
          />
        )
    }
  });
  if(user.role==='teacher')
  {
    return (
      <View style={styles.container}>
          
        <View style={styles.fst}>
          {/* Photo and profile linkedin, github */}
          <Image 
              style={styles.image} 
              source={{uri : user.imgURL}}
          />
            <View style={styles.links}>
                <View style={{...styles.iconContainer , marginLeft : 40}}>
                  <AntDesign 
                    name="github" 
                    size={40} 
                    color="white" 
                    onPress={handlePress.bind(this,'https://github.com/')}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Entypo 
                    name="linkedin" 
                    size={40} 
                    color="white" 
                    onPress={handlePress.bind(this,'https://www.linkedin.com/feed/')}
                  />
                </View>
                  
            </View>
        </View>
  
  
  
        <View style={styles.snd}>
          {/* Name Batch */}
          <View style={styles.nameContainer}>
            <Text style={styles.name} >{user.Name}</Text> 
          </View>
        </View>
  
  
        <View style={styles.thr}>
          {/* Email and mobile no */}
            <View style={{marginVertical : 10}}>
              <Text style={styles.contact}>Contact</Text>  
            </View>
            <View style={{flexDirection : 'row' , justifyContent : 'space-evenly',alignItems : 'center',marginBottom : 20}}>
              <MaterialIcons 
                name="email" 
                size={40} 
                color={Colors.accent} 
                onPress={handlePress.bind(this,`mailto:${user.Email}`)}
              />
              <Entypo 
                name="mobile" 
                size={40} color={Colors.accent} 
                onPress= {handlePress.bind(this,'tel:+917841990407')}
              />
            </View>
        </View>
  
        <View style={styles.forth}>
          {/* Projects List */}
          <Text style={styles.contact}>Projects Guided</Text>  
          <ScrollView 
            style={{flexDirection : 'row'}}
            horizontal={true}
          >
          {
            proList
          }
            
              
          </ScrollView>
        </View>
      </View>
    )
  }
  else{
    return (
      <View style={styles.container}>
          
        <View style={styles.fst}>
          {/* Photo and profile linkedin, github */}
          <Image 
              style={styles.image} 
              source={{uri : user.imgURL}}
          />
            <View style={styles.links}>
                <View style={{...styles.iconContainer , marginLeft : 40}}>
                  <AntDesign 
                    name="github" 
                    size={40} 
                    color="white" 
                    onPress={handlePress.bind(this,'https://github.com/')}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <Entypo 
                    name="linkedin" 
                    size={40} 
                    color="white" 
                    onPress={handlePress.bind(this,'https://www.linkedin.com/feed/')}
                  />
                </View>
                  
            </View>
        </View>
  
  
  
        <View style={styles.snd}>
          {/* Name Batch */}
          <View style={styles.nameContainer}>
            <Text style={styles.name} >{user.Fname}</Text> 
            <Text style={styles.surName}>{user.Lname}</Text> 
          </View>
          <Text style={styles.surName}>{user.Batch}</Text>
        </View>
  
  
        <View style={styles.thr}>
          {/* Email and mobile no */}
            <View style={{marginVertical : 10}}>
              <Text style={styles.contact}>Contact</Text>  
            </View>
            <View style={{flexDirection : 'row' , justifyContent : 'space-evenly',alignItems : 'center',marginBottom : 20}}>
              <MaterialIcons 
                name="email" 
                size={40} 
                color={Colors.accent} 
                onPress={handlePress.bind(this,`mailto:${user.Email}`)}
              />
              <Entypo 
                name="mobile" 
                size={40} color={Colors.accent} 
                onPress= {handlePress.bind(this,'tel:+917841990407')}
              />
            </View>
        </View>
  
        <View style={styles.forth}>
          {/* Projects List */}
          <Text style={styles.contact}>Projects</Text>  
          <ScrollView 
            style={{flexDirection : 'row'}}
            horizontal={true}
          >
            {/* <TouchableNativeFeedback 
              onPress={()=>{props.navigation.navigate('ProjectDetail')}}
            >
                <View style={styles.projectContainer}>
                  <Image 
                      style={styles.projectImage} 
                      source={{uri : 'https://hindi.cdn.zeenews.com/hindi/sites/default/files/2022/02/16/1049974-rohit-sharma.gif'}} 
                  />
                  <View >
                    <Text style={styles.projectTitle} >Project 1</Text>
                  </View>
                </View>
            </TouchableNativeFeedback> */}
            {
              proList
            }
            
              
          </ScrollView>
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
    container : {
      // margin : 10
    },  
    fst : {
      marginTop : 30,
      marginLeft :30, 
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between'
    },
    image : {
      width : 125,
      height : 125,
      borderRadius : 62.5,
      marginRight : 10
    },
    links : {
      height : 70,
      paddingRight : 100 ,
      backgroundColor : Colors.accent, 
      borderTopLeftRadius : 35,
      borderBottomLeftRadius : 35,

      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'flex-start'
    },
    iconContainer : {
      marginHorizontal : 20
    },

    snd : {
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between',
      marginHorizontal :40, 
    },
    nameContainer : {
      flexDirection : 'column',
    },
    name : {
      fontFamily : 'open-sans-bold',
      fontSize : 30,
      color : '#777'
    },
    surName : {
      fontFamily : 'open-sans',
      fontSize : 20,
      color : '#777'
    },
    thr : {
      marginHorizontal : 30,
      marginVertical : 20,
      // width : '100%',
      backgroundColor : 'white',
      borderRadius : 10,
      elevation : 5,
      padding : 10
    },
    contact : {
      fontFamily : 'open-sans-bold',
      fontSize : 25,
      textAlign : 'center',
      color : '#777'

    },
    forth : {
      marginHorizontal : 30,
      backgroundColor : 'white',
      borderRadius : 10,
      elevation : 5,
      padding : 10
    },
    projectContainer:{
      height : 100,
      width : 125,
      backgroundColor : Colors.accent,
      marginVertical : 20,
      borderRadius : 10,
      overflow : 'hidden',
      alignItems : 'center',
      marginHorizontal : 3
      
    },
    projectImage : {
      width : '100%',
      height : 75
    }
    ,projectTitle:{
      fontFamily : 'open-sans-bold',
      textAlign : 'center',
      color : 'white'
    }
}) 
