import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Colors from '../constants/Colors'
import { Feather } from '@expo/vector-icons';
import { firebase } from '../firebase/config'
import { useSelector } from 'react-redux';



export default function Login(props) {
    // const [email, setEmail] = useState('');
    const { user } = useSelector(state => state.userReducer)

    useEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => {
                return (
                    <Feather
                        name="menu"
                        size={24}
                        color="white"
                        style={{ marginLeft: 10 }}
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                )
            },
        })
    }, [])
    const [oldPass, setOldPass] = useState('');
    const [pass1, setNewPass1] = useState('');
    const [pass2, setNewPass2] = useState('');

    const HandlesetNewPass2 = (text) => {
        if (pass1 != pass2) {
            // console.log(text);
            // Alert.alert("Passwords do not match")
        }
        else {
            setNewPass2(text)
        }
    }
    const onPressLogin = () => {
        // let emailCred = firebase.auth.EmailAuthProvider.credential(
        //     firebase.auth().currentUser, oldPass);
        // firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
        //     .then(() => {
        //         // User successfully reauthenticated.
        //         firebase.auth().currentUser.updatePassword(pass1);
        //         console.log("Updated password successfully")
        //     })
        //     .catch(error => {
        //         // Handle error.
        //         console.log(error);
        //     });
        try{
            firebase.auth().currentUser.updatePassword(pass1);
            console.log("Updated password successfully")
        }catch(error)
        {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 30 }}>
                <Image
                    source={require('../assets/projectofolio.jpg')}
                    style={{ height: 100, width: 100 }}
                />
            </View>

            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="OLD PASSWORD"
                    placeholderTextColor="#888"
                    onChangeText={(text) => { setOldPass(text) }}
                    value={oldPass}
                />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    onChangeText={(text) => { setNewPass1(text) }}
                    value={pass1}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    onChangeText={(text) => { HandlesetNewPass2(text) }}
                    value={pass2}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => onPressLogin()}
            >
                <Text style={{ ...styles.loginText, color: 'white' }}>Change Password</Text>
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
    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        fontFamily: 'open-sans'
    },
    loginBtn: {
        width: "80%",
        backgroundColor: Colors.primary,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        fontFamily: 'open-sans',
        fontSize: 15,
    }
})
