import React, { Component } from 'react';
import { Platform, Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { StaticText, colors } from '../../themes/static/common';
//import screens
import LoginViewContainer from '../../modules/screens/Login/LoginViewContainer';
import TodoViewContainer from '../../modules/screens/Todo/TodoViewContainer';
import AddTaskViewContainer from '../../modules/screens/AddTask/AddTaskViewContainer';
import ProfileViewContainer from '../../modules/screens/Profile/ProfileViewContainer';
const activeColor = colors.colorGreen;
// TabNavigator is nested inside createStackNavigator
export const TodoTabNavigator = createBottomTabNavigator({
  TodoList: {
    screen: TodoViewContainer,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'TodoList' && tintColor === colors.colorGray) {
          let imageSrc = require('../../../images/GrayedImages/feed.png');
          return <Image source={imageSrc} style={{ width: 24, height: 24 }} />
        } else {
          let imageSrc = require('../../../images/feed.png');
          return <Image source={imageSrc} style={{ width: 24, height: 24 }} />
        }
      }

    })
  },
  AddTask: {
    screen: AddTaskViewContainer,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'AddTask' && tintColor === colors.colorGray) {
          let imageSrc = require('../../../images/GrayedImages/add.png');
          return <Image source={imageSrc} style={{ width: 24, height: 24 }} />
        } else {
          let imageSrc = require('../../../images/add.png');
          return <Image source={imageSrc} style={{ width: 24, height: 24 }} />
        }
      }

    })
  },
  Profile: {
    screen: ProfileViewContainer,
    navigationOptions: ({ navigation }) => ({
      title: '',
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Profile' && tintColor === colors.colorGray) {
          let imageSrc = require('../../../images/GrayedImages/profile.png');
          return <Image source={imageSrc} style={{ width: 24, height: 24 }} />
        } else {
          let imageSrc = require('../../../images/profile.png');
          return <Image source={imageSrc} style={{ width: 24, height: 24 }} />
        }
      }

    })
  },
}, {
    tabBarOptions: {
      activeTintColor: colors.colorGreen,
      inactiveTintColor: colors.colorGray,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: colors.colorWhite,
        alignSelf: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        height: 80
      },
      animationEnabled: false,
      swipeEnabled: false,
    }
  });

const AuthNavigator = createStackNavigator({
  Todo: { screen: TodoTabNavigator, navigationOptions: { header: null } },
});

const NonAuthNavigator = createStackNavigator({
  Login: { screen: LoginViewContainer, navigationOptions: { header: null } },
});

// Root navigator is a createStackNavigator
const AppNavigator = createStackNavigator({
  NonAuthNavigator: { screen: NonAuthNavigator, navigationOptions: { header: null } },
  AuthNavigator: { screen: AuthNavigator, navigationOptions: { header: null } },
}, { initialRouteName: 'NonAuthNavigator' });

export default AppNavigator;
