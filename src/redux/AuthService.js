/*
  # Service Name  : Auth.js
  # Description   : It handle's request & response of login, Logout, Change password,
                    Forgot password, Privacy & policy and Terms & condition.
*/
import React, { Component } from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { Map } from 'immutable';
import _ from 'lodash';
import { StackActions, NavigationActions } from 'react-navigation';
// import Toast from 'react-native-simple-toast';


var Realm = require('realm');
const ColorSchema = {
  name: 'Colors',
  primaryKey: 'colorId',
  properties:
  {
    colorId: { type: 'int', default: 0 },
    colorCode: 'string',
  }
}
const TodoSchema = {
  name: 'Todo',
  primaryKey: 'taskId',
  properties:
  {
    taskId: { type: 'int', default: 0 },
    taskTitle: 'string',
    dueDate: 'string',
    colors: { type: 'Colors' },
    status: 'bool'
  }
}
const UserSchema = {
  name: 'User',
  primaryKey: 'userId',
  properties:
  {
    userId: { type: 'int', default: 0 },
    name: 'string',
    todos: { type: 'list', objectType: 'Todo' }
  }
}
let realm = new Realm({ path: 'test.realm', schemaVersion: 1, schema: [ColorSchema, TodoSchema, UserSchema] });
let users = realm.objects('User');
let colors = realm.objects('Colors');
let todos = realm.objects('Todo');

/* set constants for API success & failure */
const SET_LOADER = 'SET_LOADER';
const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
const SESSION_LOGIN_FAIL = 'SESSION_LOGIN_FAIL';
const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
const SET_USER_FAIL = 'SET_USER_FAIL';
const SESSION_LOGOUT_SUCCESS = 'SESSION_LOGOUT_SUCCESS';
const RESET_STATE = 'RESET_STATE';
const GET_COLORLIST_SUCCESS = 'GET_COLORLIST_SUCCESS';
const GET_COLORLIST_FAILURE = 'GET_COLORLIST_FAILURE';
const GET_TODOLIST_SUCCESS = 'GET_TODOLIST_SUCCESS';
const GET_TODOLIST_FAILURE = 'GET_TODOLIST_FAILURE';
const SET_TODOLIST_SUCCESS = 'SET_TODOLIST_SUCCESS';
const SET_TODOLIST_FAILURE = 'SET_TODOLIST_FAILURE';
const TODOCOMPLETE_SUCCESS = 'TODOCOMPLETE_SUCCESS';
const TODOCOMPLETE_FAIL = 'TODOCOMPLETE_FAIL';
const TODO_DELETE_SUCCESS = 'TODO_DELETE_SUCCESS';
const TODO_DELETE_FAILURE = 'TODO_DELETE_FAILURE';

/* set cases for loader & internet connection */
export const setLoader = (value) => ({ type: SET_LOADER, payload: value });
export const setUserSuccess = (value) => ({
  type: SET_USER_SUCCESS,
  payload: JSON.stringify(value)
});
export const setUserFail = () => ({
  type: SET_USER_FAIL
});

/* set cases for user login success, failure, invalid login and logout */
export const loginSuccess = (value) => ({
  type: SESSION_LOGIN_SUCCESS,
  payload: JSON.stringify(value)
});
export const loginFail = (value) => ({
  type: SESSION_LOGIN_FAIL,
  payload: value
});
export const logoutSuccess = (value) => ({
  type: SESSION_LOGOUT_SUCCESS,
  payload: value
});

/* set cases for colorlist success, failure */
export const colorListSuccess = (value) => ({
  type: GET_COLORLIST_SUCCESS,
  payload: JSON.stringify(value)
});
export const colorListFail = (value) => ({
  type: GET_COLORLIST_FAILURE,
  payload: value
});

/* get & set cases for todolist success, failure */
export const getTodoListSuccess = (value) => ({
  type: GET_TODOLIST_SUCCESS,
  payload: JSON.stringify(value)
});
export const getTodoListFail = (value) => ({
  type: GET_TODOLIST_FAILURE,
  payload: value
});

export const setTodoListSuccess = (value) => ({
  type: SET_TODOLIST_SUCCESS,
  payload: JSON.stringify(value)
});
export const setTodoListFail = (value) => ({
  type: SET_TODOLIST_FAILURE,
  payload: value
});

export const todoCompleteSuccess = (value) => ({
  type: TODOCOMPLETE_SUCCESS,
  payload: JSON.stringify(value)
});

export const todoCompleteFail = (value) => ({
  type: TODOCOMPLETE_FAIL,
  payload: JSON.stringify(value)
});

export const todoDeleteSuccess = (value) => ({
  type: TODO_DELETE_SUCCESS,
  payload: value
});
export const todoDeleteFail = (value) => ({
  type: TODO_DELETE_FAILURE,
  payload: value
});

/* reset auth function */
export const resetTo = (props, route) => {
  return async (dispatch) => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: route })],
    });
    props.navigation.dispatch(resetAction);
    dispatch(setLoader(false));
  };
};

export async function setUsers(userData) {
  let userArr = [];
  try {
    let userId = users.length + 1;
    realm.write(() => { realm.create('User', { userId: userId, name: userData.name, todos: [] }) });
    users.map((user, i) => { userArr.push(user) });
  } catch (error) {
    console.log('set user error', error);
  }
  return userArr;
}

export async function getUserList() {
  let userArr = [], userList = '';
  try {
    users.map((user, i) => { userArr.push(user) });
    if (userArr.length > 0) {
      userList = JSON.stringify(userArr);
    }
  } catch (error) {
    console.log('get user error', error);
  }
  return userList;
}

/* post login function */
export const postLogin = (props, loginData) => {
  return async (dispatch) => {
    let userData = '';
    dispatch(setLoader(true));
    let users = await getUserList();
    console.log('users--->', users);
    if (users && !_.isEmpty(users) && users !== null && users !== 'undefined') {
      let list = JSON.parse(users);
      let index = list.map(e => e.name).indexOf(loginData.name);
      if (parseInt(index) >= 0) {
        let user = list[index];
        dispatch(loginSuccess(user));
        dispatch(resetTo(props, 'AuthNavigator'));
      } else {
        userData = setUsers(loginData);
        dispatch(setUserSuccess(userData));
        dispatch(postLogin(props, loginData));
      }
    } else {
      userData = setUsers(loginData);
      dispatch(setUserSuccess(userData));
      dispatch(postLogin(props, loginData));
    }
    dispatch(setLoader(false));
  };
};

export const postLogout = (props) => {
  return async (dispatch) => {
    dispatch(logoutSuccess(''));
    dispatch(resetTo(props, 'NonAuthNavigator'));
  }
}

export const getColorList = () => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {
      realm.write(() => {
        realm.create('Colors', { colorId: 1, colorCode: '#4A90E2' });
        realm.create('Colors', { colorId: 2, colorCode: '#80D320' });
        realm.create('Colors', { colorId: 3, colorCode: '#CF001C' });
        realm.create('Colors', { colorId: 4, colorCode: '#BB10DF' });
        realm.create('Colors', { colorId: 5, colorCode: '#F3A324' });
      });
      let colorArr = [];
      colors.map((color, i) => { colorArr.push(color) });
      dispatch(colorListSuccess(colorArr));
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
    }
  };
}

export const getTodoList = (userId) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {
      let currentUser = JSON.parse(JSON.stringify(users.filtered('userId = "' + userId + '"')));
      let todoList = currentUser[0].todos;
      todoList = _.orderBy(todoList, 'taskId', 'desc');
      if (todoList !== null && todoList !== "") {
        dispatch(getTodoListSuccess(todoList));
      } else {
        dispatch(getTodoListFail(''));
      }
    } catch (error) {
      dispatch(getTodoListFail(''));
    }
    dispatch(setLoader(false));
  };
}

export async function setTodoList(todoData) {
  try {
    let taskId = todos.length + 1;
    realm.write(() => {
      let todoObject = realm.create('Todo', {
        taskId: taskId,
        taskTitle: todoData.taskTitle,
        dueDate: todoData.dueDate,
        colors: { colorId: todoData.colors.colorId, colorCode: todoData.colors.colorCode },
        status: false
      }, true);

      let data = realm.create('User', {
        userId: todoData.userId
      }, true);
      data.todos.push(todoObject);
    });
    return true;
  } catch (error) {
    return false;
  }
}

export const postTodoTask = (props, addTaskData) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    let status = await setTodoList(addTaskData);
    if (status) {
      dispatch(setTodoListSuccess(''));
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'AuthNavigator' }, NavigationActions.navigate({ routeName: 'TodoList' }))],
      });
      props.navigation.dispatch(resetAction);
      dispatch(setLoader(false));
    } else {
      dispatch(setTodoListFail(''));
    }
    dispatch(setLoader(false));
  }
}

export const postTodoDelete = (props, taskId, userId) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    let todo = realm.objects('Todo').filtered(`taskId = ${taskId}`);
    let data = realm.objects('User').filtered(`userId = ${userId}`)
    let arr = [];
    let todos = data[0].todos;
    todos.map(task => {
      if (task.taskId != todo[0].taskId) {
        arr.push(task);
      }
    })

    realm.write(() => {
      result = realm.create('User', { userId: userId, todos: arr }, true);
    });
    if (result) {
      dispatch(todoDeleteSuccess(''));
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'AuthNavigator' }, NavigationActions.navigate({ routeName: 'TodoList' }))],
      });
      props.navigation.dispatch(resetAction);
      dispatch(setLoader(false));
    } else {
      dispatch(todoDeleteFail(''));
    }
  }
}

export const postTodoComplete = (props, taskId, userId) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    let result;

    realm.write(() => {
      // Update Todo with new status
      result = realm.create('Todo', { taskId: taskId, status: true }, true);
    });

    if (result.status == true) {
      dispatch(todoCompleteSuccess(''));
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'AuthNavigator' }, NavigationActions.navigate({ routeName: 'TodoList' }))],
      });
      props.navigation.dispatch(resetAction);
      dispatch(setLoader(false));
    } else {
      dispatch(todoCompleteFail(''));
    }

  }
}
/* Initial state */
const initialState = Map({
  userList: '',
  user: '',
  successMsg: '',
  errorMsg: '',
  loading: false,
  isLoggedIn: false,
  colorList: [],
  todo: ''
});

/* Auth Reducer for API handling */
export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return state.set('userList', action.payload);

    case SET_USER_FAIL:
      return state;

    case SESSION_LOGIN_SUCCESS:
      return state.set('user', action.payload).set('isLoggedIn', true);

    case SESSION_LOGIN_FAIL:
      return state;

    case SESSION_LOGOUT_SUCCESS:
      return state.set('user', '').set('isLoggedIn', false);

    case GET_COLORLIST_SUCCESS:
      return state.set('colorList', action.payload);

    case GET_COLORLIST_FAILURE:
      return state;

    case GET_TODOLIST_SUCCESS:
      return state.set('todo', action.payload);

    case GET_TODOLIST_FAILURE:
      return state;

    case SET_TODOLIST_SUCCESS:
      return state;

    case SET_TODOLIST_FAILURE:
      return state;

    case TODOCOMPLETE_SUCCESS:
      return state;

    case TODOCOMPLETE_FAIL:
      return state;

    case TODO_DELETE_SUCCESS:
      return state;

    case TODO_DELETE_FAILURE:
      return state;

    case SET_LOADER:
      return state.set('loading', action.payload);

    case RESET_STATE:
      return state;

    default:
      return state;
  }
}
