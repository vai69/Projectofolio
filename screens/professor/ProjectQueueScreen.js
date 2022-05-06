import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, ScrollView } from 'react-native'

import TechItem from '../../components/TechItem'

import Colors from '../../constants/Colors'
import { Store } from '../../Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setProjects, setQued} from '../../Redux/actions';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../firebase/config'


export default function ProjectQueueScreen(props) {
    
    const [proj, setProj] = useState([]);
    
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer)
    const {projectsQued} = useSelector(state=>state.userReducer)
    var loaded= [];


    const setProjectList = () =>{
        firebase.firestore()
			.collection('Projects')
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(documentSnapshot => {
                    
                    // if(documentSnapshot.Guide === user.Name)
                    // {
                        let dt = documentSnapshot.data();
                        console.log(user.Name);
                        loaded.push(dt);
                    // }
				});
                setProj(loaded);
			})
        
    }

    useEffect(()=>{
        setProjectList();
    },[])



    const addApprove=(item)=>{
        const docRef = firebase.firestore().collection('Projects').doc();
        const uid = docRef.id;
        firebase.firestore().collection('ApprovedProjects').doc(uid).set({
            id: uid,
            Title: item.Title,
            Description: item.Description,
            Guide: item.Guide,
            Github: item.Github,
            imgURL: item.imgURL,
            Host: item.Host,
            Contributor: item.Contributor,
            status: true,
            rejected: false,
            TechStack: item.TechStack,
            Domain: item.Domain,
            batch : item.batch
        }).then(() => {
            dispatch(setProjects());
            alert('Project Approved');
        }).catch((error) => {
            alert(error.message);
        });
        firebase.firestore().collection('Projects').doc(item.id).delete().then(() => {
            dispatch(setProjects());
        }).catch((error) => {
            alert(error.message);
        })
        setProjectList();
    }

    const Queuse = proj.filter((item) => item.Guide === user.Name);



    const list = Queuse.map((item, key) => {
        return (
            <TouchableNativeFeedback key={key}
                onPress={() => {
                    props.navigation.navigate('ProjectDetailScreenProfessor', { project: item });
                }}
            >
                <View style={styles.container}>
                    <View>
                        <Image style={styles.image} source={{uri : item.imgURL}} />
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
                                    addApprove(item);
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
                                    firebase.firestore().collection('Projects').doc(item.id).delete().then(() => {
                                        // props.navigation.navigate('ProjectList');
                                    }).catch((error) => {
                                        alert(error.message);
                                    });
                                    setProjectList();
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