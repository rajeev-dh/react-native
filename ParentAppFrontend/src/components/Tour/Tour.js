import {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {REACT_APP_URL} from '@env';
import axios from 'axios';

import fgSvg_1 from '../../assets/images/Tour/SS1.png';
import fgSvg_2 from '../../assets/images/Tour/ss2.png';
import fgSvg_3 from '../../assets/images/Tour/ss3.png';
import fgSvg_4 from '../../assets/images/Tour/ss4.png';

const Tour = ({navigation, route}) => {
  const [token, settoken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(data => {
      const tokenData = jwtDecode(data);
      const expDate = new Date(tokenData.exp * 1000);
      const curr = new Date();
      if (expDate - curr <= 0) {
        axios
          .post(`${REACT_APP_URL}api/getTokens`, {
            withCredentials: true,
          })
          .then(res => {
            if (!res.data.error) {
              AsyncStorage.setItem('token', res.data.accessToken);
              settoken(res.data.accessToken);
              return;
            }
          })
          .catch(err => {
            console.log(err);
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('user');
            return;
          });
      } else {
        settoken(data);
      }
    });
  });
  // the list of items in different slides
  const slideItemList = [
    {
      key: 1,
      image: fgSvg_1,
      title: 'On demand chat with experts',
      text: 'Get your daily questions answered right from the comfort of your phone.',
      margin: 40,
    },
    {
      key: 2,
      image: fgSvg_2,
      title: 'Personalized self paced learning',
      text: 'Special parent training courses structured to your needs to help you through your journey.',
      margin: 20,
    },
    {
      key: 3,
      image: fgSvg_3,
      title: 'Track progress on milestones',
      text: 'Get assessments on milestones and learn strategies to help your child achieve those milestones.',
      margin: 20,
      titleMargin: 10,
      textRightMargin: 0,
      textLeftMargin: -5,
    },
    {
      key: 4,
      image: fgSvg_4,
      title: 'Therapies and Marketplace',
      text: 'Our care programs include various therapy sessions based on initial assessments of the child. We recommend the most useful interventions and tools.',
      margin: 0,
      marginTop: -40,
      titleMargin: 25,
      textRightMargin: 0,
      textLeftMargin: -5,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image
          source={item.image}
          style={{
            marginTop: item?.marginTop ? item.marginTop : -30,
            width: '100%',
            height: '70%',
            resizeMode: 'contain',
            overflow: 'hidden',
          }}
        />
        <View style={{...styles.tourTextContainer, marginBottom: item.margin}}>
          <Text style={{...styles.tourTitle, marginRight: item?.titleMargin}}>
            {item.title}
          </Text>
          <Text
            style={{
              ...styles.tourDesc,
              marginRight: item?.textRightMargin,
              marginLeft: item?.textLeftMargin,
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-forward-outline"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View
        style={{
          ...styles.buttonCircle,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 1,
          elevation: 5,
        }}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <View style={styles.skipBtn}>
        <Text style={{color: '#424242'}}>Skip</Text>
      </View>
    );
  };
  // after completing all slides
  const onDone = () => {
    if (route?.params === 'newuser') navigation.replace('Child', 'newuser');
    else {
      AsyncStorage.getItem('user').then(user => {
        user = JSON.parse(user);
        if (user) {
          if (user?.id && token !== '') {
          }
          navigation.replace('Home');
        } else {
          navigation.replace('Auth');
        }
      });
    }
  };

  return (
    <View style={styles.containerMain}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slideItemList}
        showSkipButton={true}
        onSkip={onDone}
        renderSkipButton={renderSkipButton}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        activeDotStyle={{backgroundColor: '#396EB3'}}
        onDone={onDone}
      />
    </View>
  );
};

export default Tour;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    maxWidth: Dimensions.get('window').width,
    height: '100%',
  },
  tourTitleImgContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#396EB3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tourTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
    marginLeft: 8,
  },
  tourTitle: {
    color: '#424242',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
    margin: 10,
    marginTop: 0,
  },
  tourDesc: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
    letterSpacing: 0.8,
    padding: 10,
    alignItems: 'flex-start',
    textAlign: 'center',
  },
  nextBtn: {
    position: 'absolute',
    backgroundColor: '#396EB3',
    top: '85%',
    left: '80%',
  },
  skipBtn: {
    fontSize: 15,
    top: 10,
    left: 10,
    color: '#396EB3',
    padding: 5,
  },
});
