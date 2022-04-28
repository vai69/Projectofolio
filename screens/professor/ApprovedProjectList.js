import React from 'react'
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, ScrollView } from 'react-native'

import TechItem from '../../components/TechItem'

import Colors from '../../constants/Colors'
import {useSelector} from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ProjectQueueScreen(props) {
    const { user, projects } = useSelector(state => state.userReducer)
    const Queuse = projects.filter((item) => item.Guide == user.Name && item.status == true && item.rejected == false);

    const list = Queuse.map((item, key) => {
        return (
            <TouchableNativeFeedback
                key={key}
                onPress={() => {
                    props.navigation.navigate('ProjectDetail');
                }}
            >
                <View style={styles.container}>
                    <View>
                        <Image style={styles.image} source={{ uri: 'https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png' }} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Project Title</Text>
                    </View>
                    <View style={styles.techContainer}>
                        {/* <TechItem tech='react.js' />
                        <TechItem tech='node.js' />
                        <TechItem tech='HTML' />
                        <TechItem tech='Mongodb' />
                        <TechItem tech='Javascript' /> */}
                        {
                            item.TechStack.map(tech => {
                                // console.log(tech);
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
                                onPress={() => { props.navigation.navigate('ProjectDetail') }}
                            />
                        </View>
                    </View>

                </View>
            </TouchableNativeFeedback>
        )
    })
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
        //         props.navigation.navigate('ProjectDetail');
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
        //                 <Entypo 
        //                     name="eye" 
        //                     size={30} 
        //                     color={Colors.primary} 
        //                     onPress={()=>{props.navigation.navigate('ProjectDetail')}}
        //                 />    
        //             </View>
        //         </View>

        //     </View>
        // </TouchableNativeFeedback>
        <ScrollView>
            {list.length === 0 ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No Project</Text>
            </View> : list}
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
        marginVertical: 5
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})