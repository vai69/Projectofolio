import React from 'react'
import {firebase} from '../firebase/config';
import { 
    Text,
    View,
    StyleSheet,
    TouchableOpacity
 } from 'react-native'
import Colors from '../constants/Colors';
export default function Logout(props) {

    const signOut = ()=>{
        firebase.auth().signOut().then(()=>{
            props.navigation.navigate('Login');
        }).catch(error=>{
            console.log(error);}
        )           
    }

    const pre = () =>{
        props.navigation.navigate('ProjectList');
    }

    return (
        <View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Do you want to log out???</Text>
            </View>
            <View style={{ ...styles.container, marginBottom: 40 }}>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => pre()}
                >
                    <Text style={styles.titleContent}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => signOut()}
                >
                    <Text style={styles.titleContent}>YES</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 30
    },
    title: {
        width: '30%',
    },
    titleContent: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        color: '#888'
    },
    input: {
        width: '70%',
        padding: 10,
        backgroundColor: 'white',
        color: '#888'
    },
    loginBtn: {
        width: "40%",
        backgroundColor: Colors.primary,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.accent,
        marginHorizontal: '35%',
        paddingVertical: 10,
        marginTop: 40,
        borderRadius: 10,
        elevation: 5,
        overflow: 'hidden'
    },
    bottonText: {
        fontFamily: 'open-sans-bold',
        color: 'white',
        fontSize: 20,

    },
    selectImg: {
        width: '70%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})