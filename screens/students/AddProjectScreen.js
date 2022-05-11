import React, { useCallback, useEffect, useState } from 'react'

import { Picker } from '@react-native-picker/picker';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../firebase/config'
import uuid from 'uuid';



import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableNativeFeedback,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
// import * as  ImagePicker from 'react-native-image-picker';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../../constants/Colors';
import { add, set } from 'react-native-reanimated';
import { TouchableHighlight } from 'react-native-web';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setProjects } from '../../Redux/actions';




export default function AddProjectScreen(props) {
    const { user } = useSelector(state => state.userReducer)

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [imgLink, setImageLink] = useState('');
    const [description, setDescription] = useState('');
    const [github, setGithub] = useState('');
    const [guide, setGuide] = useState('');
    const [host, setHost] = useState('');
    const [domain, setDomain] = useState('');
    const [contributor, setContributor] = useState([]);
    const [lenContributor, setLenContributor] = useState(0);

    const [tech, setTech] = useState([]);
    const [lenTech, setLenTech] = useState(0);


    const dispatch = useDispatch();

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
                    <AntDesign
                        name="check"
                        size={24}
                        style={{ marginRight: 10 }}
                        color="white"
                        onPress={() => addPro()}
                    />
                )
            }
        });
    }, []);


    const addPro = async () => {


        console.log(image);
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        });
        const ref = firebase
            .storage()
            .ref()
            .child(uuid.v4() + title);
        const snapshot = await ref.put(blob);
        // We're done with the blob, close and release it
        blob.close();
        const url = await snapshot.ref.getDownloadURL();
        if (url) {
            const docRef = firebase.firestore().collection('Projects').doc();

            const uid = docRef.id;

            setImageLink(url);
            const data = {
                id: uid,
                Title: title,
                Description: description,
                Guide: guide,
                Github: github,
                imgURL: url,
                Host: host,
                Contributor: contributor,
                status: false,
                rejected: false,
                TechStack: tech,
                Domain: domain,
                batch: user.Batch
            };
            console.log(data);
            const usersRef = firebase.firestore().collection('Projects')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    dispatch(setProjects())
                    props.navigation.navigate('ProjectTabNavigator')
                })
                .catch((error) => {
                    alert(error)
                });
        }
        else{
            alert("Image is not uploaded");
        }




    }

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };


    const handleChoosePhoto = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }



    const init = (e) => {
        setImage(null);
        setTitle('');
        setDescription('');
        setGithub('');
        setGuide('');
        setHost('');
        setContributor([]);
        setLenContributor(0);
        setTech([]);
        setLenTech(0);
        props.navigation.navigate('AddProjectScreen')
    }
    const handleAddCont = () => {
        let tmp = contributor;
        tmp.push('')
        setContributor(tmp);
        console.log(contributor);
    }

    const handleRemCont = () => {
        let tmp = contributor;
        tmp.pop()
        setContributor(tmp);
        console.log(contributor);
    }

    const handleAddTech = () => {
        let tmp = tech;
        tmp.push('')
        setTech(tmp);
        console.log(tech);
    }

    const handleRemTech = () => {
        let tmp = tech;
        tmp.pop()
        setTech(tmp);
        console.log(tech)
    }


    return (
        <ScrollView>

            {/* Title */}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Title</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                        }}
                        color='#888'
                    />
                </View>

            </View>


            {/* Description */}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Description</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        value={description}
                        onChangeText={(text) => {
                            setDescription(text);
                        }}
                        color='#888'
                    />
                </View>

            </View>

            {/* Project Screenshot */}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Screenshot</Text>
                </View>
                <View style={styles.selectImg}>
                    {image && <Image
                        source={{ uri: image }}
                        style={{ width: 150, height: 100 }}
                    />
                    }
                    <Button
                        title='Choose Image'
                        color={Colors.accent}
                        onPress={handleChoosePhoto}
                    />
                </View>

            </View>
            {/*Domain*/}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Domain</Text>
                </View>
                <Picker
                    style={styles.input}
                    value={domain}
                    selectedValue={domain}
                    onValueChange={(itemValue) => {
                        return setDomain(itemValue)

                    }}

                >
                    <Picker.Item label='All' value='All' />
                    <Picker.Item label='Web Dev' value='Web Dev' />
                    <Picker.Item label='App Dev' value='App Dev' />
                    <Picker.Item label='Blockchain' value='Blockchain' />
                    <Picker.Item label='AI/ML' value='AI/ML' />
                    <Picker.Item label='IOT' value='IOT' />
                    <Picker.Item label='Other' value='Other' />

                </Picker>
            </View>
            {/* Tech Stack  */}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Tech Stack</Text>
                </View>
                <View style={styles.selectImg}>
                    {tech.map((ele, index) => {
                        return (
                            <View style={{ ...styles.input, marginVertical: 10, width: '100%' }} key={index}>
                                <TextInput
                                    onChangeText={(text) => {
                                        let tmp = tech;
                                        tmp[index] = text;
                                        setTech(tmp);
                                        console.log(tech);
                                    }}
                                    color='#888'
                                />
                            </View>
                        )
                    })}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ marginHorizontal: 5 }}>
                            <TouchableNativeFeedback>
                                <AntDesign
                                    name="pluscircle"
                                    size={30}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setLenTech(lenTech + 1)
                                        handleAddTech();
                                    }}
                                />
                            </TouchableNativeFeedback>
                        </View>

                        <View style={{ marginHorizontal: 5 }}>
                            <TouchableNativeFeedback>
                                <AntDesign
                                    name="minuscircle"
                                    size={30}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setLenTech(tech.length > 0 ? tech.length - 1 : 0);
                                        handleRemTech();
                                    }}
                                />
                            </TouchableNativeFeedback>
                        </View>

                    </View>

                </View>
            </View>

            {/* Contributor List */}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Contributors</Text>
                </View>

                <View style={styles.selectImg}>
                    {contributor.map((ele, index) => {
                        return (
                            <View style={{ ...styles.input, marginVertical: 10, width: '100%' }} key={index}>
                                <TextInput
                                    onChangeText={(text) => {
                                        let tmp = contributor;
                                        tmp[index] = text;
                                        setContributor(tmp);
                                        console.log(contributor);
                                    }}
                                    color='#888'
                                />
                            </View>
                        )
                    })}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ marginHorizontal: 5 }}>
                            <TouchableNativeFeedback>
                                <AntDesign
                                    name="pluscircle"
                                    size={30}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setLenContributor(lenContributor + 1)
                                        handleAddCont();
                                    }}
                                />
                            </TouchableNativeFeedback>
                        </View>

                        <View style={{ marginHorizontal: 5 }}>
                            <TouchableNativeFeedback>
                                <AntDesign
                                    name="minuscircle"
                                    size={30}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setLenContributor(contributor.length > 0 ? contributor.length - 1 : 0);
                                        handleRemCont();
                                    }}
                                />
                            </TouchableNativeFeedback>
                        </View>

                    </View>

                </View>

            </View>


            {/* guide */}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Guide</Text>
                </View>
                <Picker
                    style={styles.input}
                    selectedValue={guide}
                    onValueChange={(itemValue) => {
                        return setGuide(itemValue)

                    }}

                >
                    <Picker.Item label='Dr.M.A.Shah(HOD)' value='Dr.M.A.Shah' />
                    <Picker.Item label='Dr.B.F.Momin' value='Dr.B.F.Momin' />
                    <Picker.Item label='Mr.A.R.Surve' value='Mr.A.R.Surve' />
                    <Picker.Item label='Dr.N.L.Gavankar' value='Dr.N.L.Gavankar' />
                    <Picker.Item label='Ms.N.L.Mudegol' value='Ms.N.L.Mudegol' />
                    <Picker.Item label='Mr.K.P.Kamble' value='Mr.K.P.Kamble' />
                    <Picker.Item label='Mr.S.S.Sontakke' value='Mr.S.S.Sontakke' />
                    <Picker.Item label='Ms.P.D.Mundada' value='Ms.P.D.Mundada' />
                    <Picker.Item label='Ms.A.S.Pawar' value='Ms.A.S.Pawar' />
                    <Picker.Item label='Mr.S.D.Pujari' value='Mr.S.D.Pujari' />
                    <Picker.Item label='Miss.S.S.Rokade' value='Miss.S.S.Rokade' />
                    <Picker.Item label='Mr.A.A.Urunkar' value='Mr.A.A.Urunkar' />

                </Picker>
            </View>

            {/* Github */}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >GitHub Link</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        value={github}
                        onChangeText={(text) => {
                            setGithub(text);
                        }}
                        color='#888'
                    />
                </View>

            </View>

            {/* Hosted Link */}
            <View style={{ ...styles.container }}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Hosted Link</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        value={host}
                        onChangeText={(text) => {
                            setHost(text);
                        }}
                        color='#888'
                    />
                </View>

            </View>
            <View style={{ ...styles.container, marginBottom: 40 }}>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => init()}
                >
                    <Text style={styles.titleContent}>RESET</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => addPro()}
                >
                    <Text style={styles.titleContent}>ADD</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
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