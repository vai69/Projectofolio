import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, ScrollView } from 'react-native'

import TechItem from '../../components/TechItem'

import Colors from '../../constants/Colors'
import { Store } from '../../Redux/store';
import { useSelector, useDispatch } from 'react-redux';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../firebase/config'


export default function ProjectQueueScreen(props) {

    const { projects } = useSelector(state => state.userReducer)
    const { user } = useSelector(state => state.userReducer)

    const Queuse = projects.filter((item) => item.Guide == user.Name);
    console.log(Queuse)


    const list = Queuse.map((item, key) => {
        return (
            <TouchableNativeFeedback key={key}
                onPress={() => {
                    props.navigation.navigate('ProjectDetailScreenProfessor', { project: item });
                }}
            >
                <View style={styles.container}>
                    <View>
                        <Image style={styles.image} source={item.imgURL} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.Title}</Text>
                    </View>
                    <View style={styles.techContainer}>
                        {
                            // console.log(item.TechStack)
                            item.TechStack.map(tech => {
                                // console.log(tech);
                                return (<TechItem tech={tech} />);
                            })
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <AntDesign
                                name="check"
                                size={30}
                                color={Colors.primary}
                                onPress={() => {
                                    const fr = firebase.firestore().collection('projects').doc(item.id).get();
                                    console.log(fr);
                                    // firebase.firestore().collection('Projects').doc(Queuse.id).set({
                                    //     Title: item.TSSitle,
                                    //     Description:item.Description,
                                    //     Guide: item.Guide,
                                    //     Github: item.Github,
                                    //     imgURL: item.imgURL,
                                    //     Host: item.Host,
                                    //     Contributor: item.Contributor,
                                    //     status: false,
                                    //     rejected: false,
                                    //     TechStack: item.Techstack,
                                    //     Domain: item.Domain,
                                    //     batch: user.batch
                                    // }, { merge: true }).then(() => {
                                    //     console.log("success");
                                    // }).catch(err => {
                                    //     console.log(err);
                                    // })
                                    console.log(Queuse.status);
                                    // props.navigation.navigate('ApprovedProjectList');
                                }}
                            />
                        </View>
                        <View style={styles.button}>
                            <AntDesign
                                name="minus"
                                size={30}
                                color={Colors.primary}
                                // onPress={() => { }}
                                onPress={() => {
                                    firebase.firestore().collection('Projects').doc(Queuse.id).update({
                                        status: false,
                                        rejected: true
                                    });
                                    console.log(Queuse.status);
                                }}
                            />
                        </View>

                    </View>

                </View>
            </TouchableNativeFeedback>
        );
    }
    )

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
        }
    });
    return (
        // <TouchableNativeFeedback 
        //     onPress={()=>{
        //         props.navigation.navigate('ProjectDetailScreenProfessor');
        //     }}
        // >
        //         <View style={styles.container}>
        //         <View>
        //             <Image style={styles.image} source={{uri : 'https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png'}}/>
        //         </View>
        //         <View style={styles.titleContainer}>
        //             <Text style={styles.title}>Project Title</Text>
        //         </View>
        //         <View style={styles.techContainer}>
        //             <TechItem tech='react.js' />
        //             <TechItem tech='node.js' />
        //             <TechItem tech='HTML' />
        //             <TechItem tech='Mongodb' />
        //             <TechItem tech='Javascript' />

        //         </View>
        //         <View style={styles.buttonContainer}>
        //             <View style={styles.button}>
        //                 <AntDesign 
        //                     name="check" 
        //                     size={30} 
        //                     color={Colors.primary} 
        //                     onPress = {()=>{}}
        //                 />
        //             </View>
        //             <View style={styles.button}>
        //                 <AntDesign 
        //                     name="minus" 
        //                     size={30} 
        //                     color={Colors.primary} 
        //                     onPress = {()=>{}}
        //                 />
        //             </View>

        //         </View>

        //     </View>
        // </TouchableNativeFeedback>
        <ScrollView >
            {list}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        elevation: 5,
        // height:  100,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 15
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7
    }
    ,
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 25,
        color: '#888'
    },
    techContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: "wrap"
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 5
    },
    button: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})