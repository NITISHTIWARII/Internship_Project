import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const UserInformation = () => {
  const[data,setdata]= useState([])
  const[currentindex,setcurrentindex]=useState(1)

  useEffect(() => {
   
    fetchAPI(currentindex);
  }, [currentindex]);
  const fetchAPI= async ()=>{
    try{
      const response = await fetch(`https://random-data-api.com/api/users/random_user?size=${currentindex}`)

      if(!response.ok){
        throw new Error(" USER NOT FOUD")
      }
      const data = await response.json()
      setdata(data[0])
    } catch (error){
      console.log(error)

    }

  }
  const handleNext = () => {
    setcurrentindex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setcurrentindex((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <LinearGradient
      colors={['#8A2387', '#E94057', '#F27121']}
      style={styles.container}>
      {/* Translucent Statusbar */}
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>handlePrevious()}>
        <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Information</Text>
        <TouchableOpacity onPress={()=>handleNext()}>
        <Feather name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={data.avatar} />
        </View>
        {/* User Information */}
        <Text style={styles.userName}>{data.username}</Text>
        <View style={styles.idInfoContainer}>
          <View style={styles.idItem}>
            <Text style={styles.idLabel}> ID : </Text>
            <Text style={styles.idValue}>{currentindex}</Text>
          </View>
          <View style={styles.idItem}>
            <Text style={styles.idLabel}>UID : </Text>
            <Text style={styles.idValue}>
              {data.uid}
            </Text>
          </View>
        </View>

        {/* Additionasl Information */}

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Additional Information</Text>
        </View>

        <View style={styles.nameInfoContainer}>
          <View style={styles.namedescription}>
            <Text style={styles.namedescriptiontext}>First Name</Text>
            <Text style={styles.nametext}>{data.first_name}</Text>
          </View>
          <View style={styles.namedescription}>
            <Text style={styles.namedescriptiontext}>Last Name</Text>
            <Text style={styles.nametext}>{data.last_name}</Text>
          </View>
        </View>

        <View style={styles.personalInfoContainer}>
          <Text style={styles.sectionTitleText}>Personal Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={22}
                  color="#8A2387"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{data.email}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={22}
                  color="#8A2387"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Password</Text>
                <Text style={styles.infoValue}>{data.password}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={22}
                  color="#8A2387"
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{data.phone_number}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default UserInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageWrapper: {
    marginTop: -50,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#8A2387',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },

  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 20,
  },

  idInfoContainer: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 16,
  },
  idItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 8,
  },
  idLabel: {
    width: 40,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  idValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginLeft: 8,
  },
  nameInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  namedescription: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    marginHorizontal: 4,
  },
  namedescriptiontext: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 6,
  },
  nametext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingBottom: 30,
  },
  personalInfoContainer: {
    width: '100%',
    marginTop: 24,
    paddingBottom: 20,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0e6f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
});
