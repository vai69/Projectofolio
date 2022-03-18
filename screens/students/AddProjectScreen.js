import React , {useCallback, useEffect, useState} from 'react'

import { Picker } from '@react-native-picker/picker';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../firebase/config'

import { Text ,
    View  ,
    StyleSheet , 
    Button, 
    TouchableNativeFeedback, 
    TextInput, 
    ScrollView,
    Image
} from 'react-native'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../../constants/Colors';




export default function AddProjectScreen(props) {
    useEffect(() => {
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
                      name="check" 
                      size={24} 
                      style={{marginRight : 10}}
                      color="white" 
                      onPress={async()=>{  
                          
                            
                                const docRef = firebase.firestore().collection('Projects').doc();
                                
                                    const uid = docRef.id;
                                    console.log(uid);
                                    // // const response = await fetch(image);;
                                    // // var ref = firebase.storage().ref().child(uid);
                                    // // await ref.put(image);
                                    // // const url = await ref.getDownloadURL().catch((error) => { console.log( error )});
                                    const response = await fetch(image);
                                    //console.log(JSON.stringify(response));
                                    var ref = firebase.storage().ref().child(title);
                                    await ref.put(image);
                                    const url = await ref.getDownloadURL().catch((error) => { console.log( error )});
                                    setImageLink(url);


                                    // await firebase.storage().ref().child(uid).getDownloadURL().then((url)=>{
                                    //     console.log("url: "+url);
                                    //     setImageLink(url);
                                    // });
                                    
                                    const data = {
                                        id:uid,
                                        Title: title,
                                        Description:description,
                                        Guide:guide,
                                        Github:github,
                                        imgURL:imgLink,
                                        Host:host,
                                        Contributor:contributor,
                                        TechStack:tech
                                    };
                                    const usersRef = firebase.firestore().collection('Projects')
                                    usersRef
                                        .doc(uid)
                                        .set(data)
                                        .then(() => {
                                            props.navigation.navigate('ProjectTabNavigator')
                                        })
                                        .catch((error) => {
                                            alert(error)
                                        });
                                
                      }}
                  />
              )
          }
        });
     }, []);

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
      
      if(!result.cancelled){
          setImage(result.uri)
      }
    }



    const [image , setImage] = useState(null);
    const [title,setTitle] = useState('');
    const [imgLink,setImageLink] = useState('');
    const [description,setDescription] = useState('');
    const [github,setGithub] = useState('');
    const [guide,setGuide] = useState('');
    const [host,setHost] = useState('');

    const [contributor , setContributor] = useState([]);
    const [lenContributor,setLenContributor] = useState(0);

    const [tech,setTech] = useState([]);
    const [lenTech , setLenTech] = useState(0);

    const handleAddCont = ()=>{
        let tmp = contributor;
        tmp.push('')
        setContributor(tmp);
        console.log(contributor);
    }
    
    const handleRemCont = ()=>{
        let tmp = contributor;
        tmp.pop()
        setContributor(tmp);
        console.log(contributor);
    }

    const handleAddTech = ()=>{
        let tmp = tech;
        tmp.push('')
        setTech(tmp);
        console.log(tech);
    }

    const handleRemTech = ()=>{
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
                        onChangeText={(text)=>{
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
                      onChangeText={(text)=>{
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
                {image  && <Image
                    source={{uri : image}}
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

            {/* Tech Stack  */}
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Tech Stack</Text>
                </View>
                <View style={styles.selectImg}>
                    {tech.map((ele,index)=>{
                        return (
                        <View style={{...styles.input , marginVertical : 10 , width : '100%'}} key={index}>
                            <TextInput
                                onChangeText={(text)=>{
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
                    <View style={{flexDirection : 'row',alignItems :'center',justifyContent:'space-evenly' }}>
                        <View style={{marginHorizontal : 5}}>
                            <TouchableNativeFeedback>
                                <AntDesign 
                                    name="pluscircle" 
                                    size={30} 
                                    color={Colors.accent} 
                                    onPress={()=>{
                                        setLenTech(lenTech+1)
                                        handleAddTech();
                                    }}
                                />
                            </TouchableNativeFeedback>
                        </View>
                        
                        <View style={{marginHorizontal : 5}}>
                            <TouchableNativeFeedback>
                                <AntDesign 
                                    name="minuscircle" 
                                    size={30} 
                                    color={Colors.accent} 
                                    onPress={()=>{
                                        setLenTech(tech.length > 0 ? tech.length -1 : 0);
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
                    {contributor.map((ele,index)=>{
                        return (
                        <View style={{...styles.input , marginVertical : 10 , width : '100%'}} key={index}>
                            <TextInput
                                onChangeText={(text)=>{
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
                    <View style={{flexDirection : 'row',alignItems :'center',justifyContent:'space-evenly' }}>
                        <View style={{marginHorizontal : 5}}>
                            <TouchableNativeFeedback>
                                <AntDesign 
                                    name="pluscircle" 
                                    size={30} 
                                    color={Colors.accent} 
                                    onPress={()=>{
                                        setLenContributor(lenContributor+1)
                                        handleAddCont();
                                    }}
                                />
                            </TouchableNativeFeedback>
                        </View>
                        
                        <View style={{marginHorizontal : 5}}>
                            <TouchableNativeFeedback>
                                <AntDesign 
                                    name="minuscircle" 
                                    size={30} 
                                    color={Colors.accent} 
                                    onPress={()=>{
                                        setLenContributor(contributor.length > 0 ? contributor.length -1 : 0);
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
                    onValueChange={(itemValue)=>{
                        return setGuide(itemValue)
                        
                    }}
                    
                >
                    <Picker.Item label='Dr. M. A. Shah (HOD)' value='Dr. M. A. Shah (HOD)'/>
                    <Picker.Item label='Dr. B. F. Momin' value='Dr. B. F. Momin'/>
                    <Picker.Item label='Mr. A.  R. Surve' value='Mr. A.  R. Surve'/>
                    <Picker.Item label='Dr. N. L. Gavankar' value='Dr. N. L. Gavankar'/>
                    <Picker.Item label='Ms. N. L. Mudegol' value='Ms. N. L. Mudegol'/>
                    <Picker.Item label='Mr. K. P. Kamble' value='Mr. K. P. Kamble'/>
                    <Picker.Item label='Mr. S. S. Sontakke' value='Mr. S. S. Sontakke'/>
                    <Picker.Item label='Ms. P. D. Mundada' value='Ms. P. D. Mundada'/>
                    <Picker.Item label='Ms. A. S. Pawar' value='Ms. A. S. Pawar'/>
                    <Picker.Item label='Mr. S. D. Pujari' value='Mr. S. D. Pujari'/>
                    <Picker.Item label='Miss.S. S. Rokade' value='Miss.S. S. Rokade'/>
                    <Picker.Item label='Mr. A. A. Urunkar' value='Mr. A. A. Urunkar'/>

                </Picker>
            </View>

            {/* Github */}
            <View style={styles.container}> 
                <View style={styles.title}>
                    <Text style={styles.titleContent} >GitHub Link</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        onChangeText={(text)=>{
                            setGithub(text);
                        }}
                        color='#888'
                    />
                </View>
                 
            </View>

            {/* Hosted Link */}
            <View style={{...styles.container , marginBottom :40 }}> 
                <View style={styles.title}>
                    <Text style={styles.titleContent} >Hosted Link</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        onChangeText={(text)=>{
                            setHost(text);
                        }}
                        color='#888'
                    />
                </View>
                 
            </View>
        </ScrollView>
        
    );
}


const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginHorizontal : 30,
        marginTop : 30
    },
    title : {
        width : '30%',
    },
    titleContent : {
        fontFamily : 'open-sans-bold',
        fontSize : 15,
        color : '#888'
    },
    input : {
        width : '70%',
        padding : 10,
        backgroundColor : 'white',
        color : '#888'
    },
    buttonContainer : {
        flexDirection : 'row',
        alignContent : 'center',
        justifyContent : 'space-evenly',
        backgroundColor : Colors.accent,
        marginHorizontal : '35%',
        paddingVertical : 10,
        marginTop : 40,
        borderRadius : 10,
        elevation : 5,
        overflow : 'hidden'
    },
    bottonText : {
        fontFamily : 'open-sans-bold',
        color : 'white',
        fontSize : 20,
        
    } ,
    selectImg : {
        width : '70%',
        padding : 10,
        justifyContent : 'center',
        alignItems : 'center',
    }
})