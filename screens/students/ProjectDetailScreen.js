import React, { useCallback } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Linking, Alert, TouchableNativeFeedback } from 'react-native'

import TechItem from '../../components/TechItem'
import { useSelector } from 'react-redux';


import Colors from '../../constants/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ProjectDetailScreen(props) {

  const {project} = props.route.params;
  const details = project
  console.log(details);
  const handlePress = useCallback(async (url) => {
    if (url != undefined) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Invalid Request`, 'Contributor has not provided URL for this');
    }
  }, []);

  const navig =(item)=>{
    
    console.log(item);
    props.navigation.navigate('ContributorProfile',{contributor : item});
  }

  return (
    <ScrollView>
      <View>
        <Image style={styles.image} source={{ uri: details.imgURL }} />
      </View>

      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.techContainer}>
            {
              details.TechStack.length > 0 ?
              details.TechStack.map(tech => (
                <TechItem tech={tech} />
              )) : null
            }
          </View>
          <View style={styles.buttonContainer}>

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

        <View style={styles.description}>
          <Text style={styles.descriptionContent}>
            {details.Description}
          </Text>
        </View>


        <View style={styles.contributorContainer}>
          <View style={styles.entity}>
            <Text style={styles.entityTitle}>
              Contributors :
            </Text>
            <View style={{ marginLeft: 5 }}>
              {
                details.Contributor.map((item, key) => {
                  return (
                    <TouchableNativeFeedback onPress={() =>navig(item)}>
                      <Text style={styles.entityContent}>
                       {item}
                      </Text>
                    </TouchableNativeFeedback>
                  )
                })
              }
              <View style={styles.link}>
                <AntDesign
                  name="github"
                  size={30}
                  color="black"
                  onPress={handlePress.bind(this, 'https://github.com/'+details.Github)}
                />
              </View>
            </View>

          </View>
          <View style={styles.entity}>
            <Text style={styles.entityTitle}>
              Guide :
            </Text>
            <View style={{ marginLeft: 5 }}>
              <Text style={styles.entityContent}>
                {details.Guide}
              </Text>
            </View>
            <View style={styles.link}>
              <AntDesign
                name="link"
                size={30}
                color="black"
                onPress={handlePress.bind(this, undefined)}
              />
            </View>
          </View>
        </View>


      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 10,
    borderRadius: 15
  },
  image: {
    height: 250,
    width: '100%'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7
  }
  ,
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 25
  },
  techContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap",
    width: '90%'
  },
  description: {
    marginHorizontal: 10,
    marginTop: 10
  },
  descriptionContent: {
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'justify',
    color: '#777'
  },
  buttonContainer: {
    marginVertical: 5,
    width: '10%'
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contributorContainer: {
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 40,
    padding: 10,
    borderRadius: 10
  },
  entity: {
    width: '50%',
    marginBottom: 10
  },
  entityTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 10,
    color: '#888'
  },
  entityContent: {
    color: Colors.primary,
    fontFamily: 'open-sans',
    fontSize: 16,
    marginVertical: 3
  },
  link: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 15
  }
})