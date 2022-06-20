import React , {useState} from 'react'
import { Text, View ,TextInput ,StyleSheet,TouchableOpacity ,Image} from 'react-native'
import Colors from '../constants/Colors'
import {useEffect} from 'react'
import { firebase } from '../firebase/config'
import {useSelector,useDispatch} from 'react-redux';
import { setUser, setProjects} from '../Redux/actions';

export default function Login(props) {

  const {user} =useSelector(state => state.userReducer);
  const [email , setEmail] = useState('');
  const [pass,setPass] = useState('');
  const dispatch =useDispatch();

  useEffect(() => {
    dispatch(setProjects());
    
   /* if user is already logged in then -> if(us.role=="student"){
                    props.navigation.navigate('DrawerNavigator')
                 }
                else{
                    props.navigation.navigate('ProDrawerNavigator')
                }*/
  }, []);

  const onPressLogin = () => {
    console.log(email)
    firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), pass)
        .then((response) => {
          const uid=response.user.uid;
            const usersRef = firebase.firestore().collection('students')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const us = firestoreDocument.data();
                    console.log(us);
                    dispatch(setUser(us));
                    

                    if(us.role=="student"){
                    props.navigation.navigate('DrawerNavigator')
                    }
                    else{
                      props.navigation.navigate('ProDrawerNavigator')
                    }
                })
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            alert(error)
        })
  }


  return (
    <View style={styles.container}>
      <View style={{marginBottom :30 }}>
        <Image 
            source={require('../assets/projectofolio.jpg')}
            style={{height : 100 , width : 100}}
        />
      </View>
      
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Email" 
          placeholderTextColor="#888"
          onChangeText={(text)=>{setEmail(text)}}
          value={email}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Password" 
          placeholderTextColor="#888"
          onChangeText={(text) => {setPass(text)}}
          value={pass}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={()=>onPressLogin()}
      >
          <Text style={{...styles.loginText ,color : 'white'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>{props.navigation.navigate('Register')}}
      >
          <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>{props.navigation.navigate('ForgotPassword')}}
      >
          <Text style={styles.loginText}>Forgot Password?</Text>
      </TouchableOpacity>
      
    </View>
   
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"white",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    fontFamily : 'open-sans' 
  },
  loginBtn:{
    width:"80%",
    backgroundColor: Colors.primary ,
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText : {
    fontFamily : 'open-sans' , 
    fontSize : 15,
  }
})
