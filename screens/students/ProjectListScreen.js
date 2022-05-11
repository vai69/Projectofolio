import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, ScrollView } from 'react-native'

import TechItem from '../../components/TechItem'
import AsyncStorage from '@react-native-async-storage/async-storage';


import Colors from '../../constants/Colors'
import { Store } from '../../Redux/store';
import { fil_pro, setProjects } from '../../Redux/actions';

import { firebase } from '../../firebase/config'

import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';



export default function ProjectListScreen(props) {


    
    const[pr , setPr] = useState([]);
    const [proj, setProj] = useState([]);

    const dispatch = useDispatch();
    const {projects} = useSelector(state => state.userReducer);

    const inintilize=()=>{
            setPr(projects);
            setProj(projects);         
            setProjectList();
    }




    const setProjectList = async() => {
        console.log(proj);
        var batch="", guide="", domain="";
        var value = await AsyncStorage.getItem('filters');
        value = JSON.parse(value);
        batch = value['batch'];
        guide = value['guide'];
        domain = value['domain'];
        // console.log(batch,guide,domain);
        if (batch === "" && guide === "" && domain === "") {
            setPr(projects)
            // console.log(projects);
        }
        else if (batch!="" && guide!="" && domain!="") {
            const fl = projects.filter(p => {
                return p.batch === batch && p.Guide === guide && p.Domain === domain;
            })
            setPr(fl)
            // console.log(fl);
        }
        else if (batch && guide) {
            const fl = projects.filter(p => {
                return p.batch === batch && p.Guide === guide;
            })
            setPr(fl)
            // console.log(fl);
        }
        else if (batch && guide === '' && domain === "") {
            const fl = projects.filter(p => {
                return p.batch === batch;
            })
            setPr(fl)
            // console.log(fl);
        }
        else if (batch === "" && guide && domain === "") {
            const fl = projects.filter(p => {
                return p.Guide === guide;
            })
            setPr(fl)
            // console.log(fl);
        }
        else if (batch === "" && guide === "" && domain) {
            const fl = projects.filter(p => {
                return p.Domain === domain;
            })
            setPr(fl)
            // console.log(fl);
        }
    }

    const list = pr.map((item, key) => {
        return (
            <TouchableNativeFeedback key={key}
                onPress={() => {
                    props.navigation.navigate('ProjectDetail', { project: item } );
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
                            item.TechStack.map(tech => {
                                return (<TechItem tech={tech} />);
                            })
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Entypo
                                name="eye"
                                size={30}
                                color={Colors.primary}
                                onPress={() => { props.navigation.navigate('ProjectDetail',{project:item}) }}
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
            },
            headerRight: () => {
                return (
                    <Ionicons 
                        name="md-reload-outline"
                        size={24} 
                        style={{ marginRight: 10 }}
                        color="white" 
                        onPress={() => {
                            setProjectList(proj);
                            alert("Refreshed");
                        }}
                    />
                )
            }
        });
        inintilize();
        console.log(pr);
    }, []);
    return (

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