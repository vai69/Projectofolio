import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, ScrollView } from 'react-native'

import TechItem from '../../components/TechItem'

import Colors from '../../constants/Colors'
import { Store } from '../../Redux/store';
import {setProjects} from '../../Redux/actions';

import { firebase } from '../../firebase/config'


import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';



export default function ProjectListScreen(props) {
    // const { user } = useSelector(state => state.userReducer);
    // console.log(user);
    const {filters} = useSelector(state => state.userReducer);
    console.log(filters);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     firebase.firestore()
    //         .collection('filters')
    //         .get()
    //         .then(querySnapshot => {
    //             console.log('Total users: ', querySnapshot.size);

    //             querySnapshot.forEach(documentSnapshot => {
    //                 // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //                 let dt = documentSnapshot.data();
    //                 setProject(prevState => [...prevState, dt]);
    //             });
    //         })
    //         dispatch(setfilters(pro));
    //         console.log("filters: ", dispatch(returnfilters()));
    //         // console.log(pro);
    // }, []);
  
    // let filters = useSelector(state=> state.filters);
    // setProject(filters);

    const list = filters.map((item,key)=> {
        console.log(item.imgURL);
        return (
            <TouchableNativeFeedback key={key}
            onPress={() => {
                props.navigation.navigate('ProjectDetail',{key : key});
            }}
        >
            <View style={styles.container}>
                <View>
                    <Image style={styles.image} source={{ uri: item.imgURL }} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.Title}</Text>
                </View>
                <View style={styles.techContainer}>
                {
                    // console.log(item.TechStack)
                    item.TechStack.map(tech => {
                                console.log(tech);
                            return(<TechItem tech={tech} />);
                    })
                }
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Entypo
                            name="eye"
                            size={30}
                            color={Colors.primary}
                            onPress={() => { props.navigation.navigate('ProjectDetail') }}
                        />
                    </View>
                    <View style={styles.button}>
                        <MaterialIcons
                            name="favorite-border"
                            size={30}
                            color={Colors.primary}
                            onPress={() => { }}
                        />
                    </View>

                </View>

            </View>
        </TouchableNativeFeedback>
        )
    });

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
            }
        });
    }, []);
    return (
        // <TouchableNativeFeedback
        //     onPress={() => {
        //         props.navigation.navigate('ProjectDetail');
        //     }}
        // >
        //     <View style={styles.container}>
        //         <View>
        //             <Image style={styles.image} source={{ uri: 'https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png' }} />
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
        //                 <Entypo
        //                     name="eye"
        //                     size={30}
        //                     color={Colors.primary}
        //                     onPress={() => { props.navigation.navigate('ProjectDetail') }}
        //                 />
        //             </View>
        //             <View style={styles.button}>
        //                 <MaterialIcons
        //                     name="favorite-border"
        //                     size={30}
        //                     color={Colors.primary}
        //                     onPress={() => { }}
        //                 />
        //             </View>

        //         </View>

        //     </View>
        // </TouchableNativeFeedback>
        <ScrollView>
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