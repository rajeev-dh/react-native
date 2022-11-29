import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
// import axios from 'axios';
import * as Animatable from 'react-native-animatable';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
//===========================================================================

import emailgray from '../../assets/images/Auth/emailgray.svg';
import passgray from '../../assets/images/Auth/passgray.svg';
import emailred from '../../assets/images/Auth/emailred.svg';
import passred from '../../assets/images/Auth/passred.svg';
import emailblue from '../../assets/images/Auth/emailblue.svg';
import passblue from '../../assets/images/Auth/passblue.svg';
import LoginImage from '../../assets/images/Auth/Login.svg';
import SignupImage from '../../assets/images/Auth/Signup.svg';
import FacebookIcon from '../../assets/images/Auth/Facebook.svg';
import GoogleIcon from '../../assets/images/Auth/Google.svg';

const Auth = ({navigation, route}) => {
  // const sc = route?.params?.sc;
  const [auth, setAuth] = useState(true ? 'sign-in' : 'sign-up');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [signuperror, setsignuperror] = useState('');
  // set error we get from backend while signup
  const [loginerror, setloginerror] = useState('');
  // set error when firstname does not match login/signup condition.....this will handle error on frontend side
  const [passerr, setpasserr] = useState(false);
  const [emailerr, setemailerr] = useState(false);
  const [submit, setsubmit] = useState(false);
  // to give opacity to auth component
  const [eye, seteye] = useState(true);
  // hide or show pass
  const [log, setlog] = useState(false);

  // for email validation
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleEmail = e => {
    setemail(e.replace(/\s/g, ''));
  };
  // handling password
  const handlePassword = e => {
    setpassword(e.replace(/\s/g, ''));
  };

  return (
    <View
      style={{
        justifyContent: 'flex-start',
        marginTop: '20%',
        flex: 1,
        opacity: submit ? 0.2 : 1,
      }}>
      <Animatable.View animation="bounceIn">
        {/* title */}
        <View style={{alignItems: 'center'}}>
          {auth === 'sign-up' ? (
            <SvgXml xml={SignupImage} height={200} width={'100%'} />
          ) : (
            <SvgXml
              xml={LoginImage}
              height={250}
              width={'100%'}
              style={{marginLeft: -110}}
            />
          )}
          <Text
            style={{
              fontSize: 25,
              width: '80%',
              marginTop: 40,
              marginBottom: 10,
              fontWeight: 'bold',
              color: '#424242',
              paddingTop: 5,
            }}>
            {auth === 'sign-up' ? 'Sign Up' : 'Log In'}
          </Text>
        </View>
        {/* email,pass and name textinputs */}
        <View style={{paddingTop: 10, alignItems: 'center'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '80%',
              borderColor: !email
                ? emailerr
                  ? '#EF5B5B'
                  : 'gray'
                : emailerr
                ? '#EF5B5B'
                : '#396EB3',
              borderRadius: 10,
              borderWidth: 1,
              borderStyle: 'solid',
              marginTop: 5,
              marginBottom: 5,
              paddingLeft: 5,

              paddingTop: 5,
              paddingBottom: 5,
            }}>
            <SvgXml
              xml={
                !email
                  ? emailerr
                    ? emailred
                    : emailgray
                  : emailerr
                  ? emailred
                  : emailblue
              }
              style={{color: 'red', marginRight: 10}}
            />
            <TextInput
              style={{
                width: '100%',
                color: !email
                  ? emailerr
                    ? '#EF5B5B'
                    : 'gray'
                  : emailerr
                  ? '#EF5B5B'
                  : '#396EB3',
              }}
              placeholder="Email"
              defaultValue={email}
              autoCapitalize="none"
              onChangeText={handleEmail}
              onBlur={() => {
                if (!pattern.test(email)) {
                  setemailerr(true);
                  setTimeout(() => {
                    setemailerr(false);
                  }, 2500);
                }
              }}
            />
          </View>
          {emailerr && (auth === 'sign-up' || auth === 'sign-in') ? (
            <Animatable.View
              animation="fadeInLeft"
              style={{width: '80%', marginBottom: 10}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                }}>
                Invalid Email
              </Text>
            </Animatable.View>
          ) : null}
          <View
            style={
              (passerr && auth === 'sign-up') ||
              (loginerror && auth !== 'sign-up')
                ? styles.passworderror
                : {
                    ...styles.password,
                    borderColor: !password
                      ? passerr
                        ? '#EF5B5B'
                        : 'gray'
                      : passerr
                      ? '#EF5B5B'
                      : '#396EB3',
                  }
            }>
            <SvgXml
              xml={
                !password
                  ? passerr
                    ? passred
                    : passgray
                  : passerr
                  ? passred
                  : passblue
              }
            />

            <TextInput
              style={{
                width: '80%',
                padding: 2,
                color: !password
                  ? passerr
                    ? '#EF5B5B'
                    : 'gray'
                  : passerr
                  ? '#EF5B5B'
                  : '#396EB3',
              }}
              placeholder="Password"
              defaultValue={password}
              autoCapitalize="none"
              onChangeText={handlePassword}
              secureTextEntry={eye ? true : false}
              onBlur={() => {
                if (password.length < 6) {
                  setpasserr(true);
                  setTimeout(() => {
                    setpasserr(false);
                  }, 2500);
                }
              }}
            />
            <View>
              <TouchableOpacity
                disabled={password.length === 0 ? true : false}
                onPress={() => {
                  if (eye) seteye(false);
                  else seteye(true);
                }}>
                <Feather
                  name="eye-off"
                  color={
                    !password
                      ? passerr
                        ? '#EF5B5B'
                        : 'gray'
                      : passerr
                      ? '#EF5B5B'
                      : '#396EB3'
                  }
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          {passerr && (auth === 'sign-up' || auth === 'sign-in') ? (
            <Animatable.View animation="fadeInLeft" style={{width: '80%'}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                }}>
                Password must be 6 characters long
              </Text>
            </Animatable.View>
          ) : null}
        </View>
        {auth !== 'sign-up' && loginerror ? (
          <Animatable.View
            animation="fadeInLeft"
            style={{alignItems: 'center'}}>
            <Text
              style={{
                color: 'red',
                width: '80%',
                fontSize: 15,
              }}>
              {loginerror}
            </Text>
          </Animatable.View>
        ) : null}
        {/* forgot password */}
        {(auth === 'sign-up' && signuperror) || auth !== 'sign-up' ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Forgotpassword')}
            disabled={auth === 'sign-up' ? true : false}>
            <Animatable.View
              animation="fadeInRight"
              style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: 'red',
                  width: '80%',
                  textAlign: 'right',
                  paddingTop: 10,
                  fontSize: 15,
                }}>
                {signuperror && auth === 'sign-up'
                  ? signuperror
                  : 'Forgot Password?'}
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        ) : null}
        {/* signup signin button */}
        <TouchableOpacity
          disabled={
            (auth === 'sign-up' && signuperror) ||
            (auth !== 'sign-up' && loginerror) ||
            emailerr ||
            passerr ||
            log
              ? true
              : false
          }
          onPress={() => {
            Keyboard.dismiss();
            if (auth === 'sign-up') {
              if (password.length < 6) {
                setpasserr(true);
                setTimeout(() => {
                  setpasserr(false);
                }, 2500);
              }
              if (!pattern.test(email)) {
                setemailerr(true);
                setTimeout(() => {
                  setemailerr(false);
                }, 2500);
              }
              if (password.length >= 6 && pattern.test(email)) {
                setlog(true);
                navigation.navigate('Modal');
                setsubmit(true);
              }
            } else {
              setlog(true);
              navigation.navigate('Modal');
              setsubmit(true);
            }
          }}>
          <View style={{marginTop: 15, alignItems: 'center'}}>
            <Text
              style={{
                ...styles.loginBtn,
                backgroundColor:
                  (auth === 'sign-up' && signuperror) ||
                  (auth !== 'sign-up' && loginerror) ||
                  !email ||
                  !password ||
                  password.length < 6 ||
                  emailerr ||
                  passerr ||
                  log
                    ? 'gray'
                    : '#396EB3',
              }}>
              {auth === 'sign-up' ? 'Sign Up' : 'Log In'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Text style={{fontSize: 15, color: '#424242'}}>
            Or {auth === 'sign-up' ? 'Sign Up' : 'Log In'} with
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              disabled={submit ? true : false}
              style={{padding: 10}}
              onPress={() => {
                // handleGoogleAuth();
                // navigation.navigate('Modal');
                setsubmit(true);
              }}>
              <SvgXml xml={GoogleIcon} style={{height: 50, width: 50}} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={submit ? true : false}
              style={{padding: 10}}
              // onPress={handleFacebook}
            >
              <SvgXml xml={FacebookIcon} style={{height: 50, width: 50}} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              width: '80%',
              color: '#424242',
            }}>
            {auth === 'sign-up'
              ? 'Already have an account?'
              : 'New to Daffodil Health?'}{' '}
            <Text
              style={{color: '#396EB3'}}
              onPress={() => {
                setAuth(auth => (auth === 'sign-up' ? 'sign-in' : 'sign-up'));
              }}>
              {auth === 'sign-up' ? 'Log In' : 'Sign Up'}
            </Text>
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
};
export default Auth;

const styles = StyleSheet.create({
  textinput: {
    height: 37,
    width: '80%',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
  },
  texterror: {
    height: 37,
    width: '80%',
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
  },
  loginBtn: {
    fontSize: 17,
    textAlign: 'center',
    width: '80%',
    backgroundColor: '#396EB3',
    color: 'white',
    height: 47,
    marginTop: 15,
    marginBottom: 10,

    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    textAlignVertical: 'center',
  },
  password: {
    width: '80%',
    height: 37,
    flexDirection: 'row',
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  passworderror: {
    width: '80%',
    height: 37,
    flexDirection: 'row',
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
