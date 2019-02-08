import React from 'react';
import LoginView from '../../src/modules/screens/Login/LoginView';
import Button from '../../src/components/UserDefinedComponents/Button';
import Spinner from '../../src/components/UserDefinedComponents/Spinner'
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../src/redux/store';
import Alert from 'Alert'

configure({ adapter: new Adapter() });

describe('LOGIN VIEW ', () => {
  jest.mock('WebView');
  const props = {
    navigation: {
      setParams: jest.fn(),
      getParam: jest.fn(),
      navigate: jest.fn()
    },
  };

  const user = [{
    userId: 1,
    name: 'Kinjal',
    todos: [{
      taskId: 1,
      taskTitle: "abc",
      dueDate: "2019-02-14 17:32:00",
      colors: { colorId: 5, colorCode: '#80D320' },
      status: true
    },
    {
      taskId: 2,
      taskTitle: "xyz",
      dueDate: "2019-02-06 17:32:00",
      colors: { colorId: 5, colorCode: '#80D320' },
      status: false
    },
    {
      taskId: 3,
      taskTitle: "pqr",
      dueDate: "2019-02-08 17:32:00",
      colors: { colorId: 5, colorCode: '#80D320' },
      status: false
    }]
  }]

  const colors = [
    { colorId: 1, colorCode: '#4A90E2' },
    { colorId: 2, colorCode: '#80D320' },
    { colorId: 3, colorCode: '#CF001C' },
    { colorId: 4, colorCode: '#BB10DF' },
    { colorId: 5, colorCode: '#F3A324' }
  ]

  it('should render "Login View"', () => {
    const wrapper = shallow(
      <LoginView {...props} dispatch={jest.fn} store={store} />
    );
    expect(wrapper.containsMatchingElement(<legend>AddTaskView</legend>));
  });

  it('should render "Login View" with the userlist', () => {
    const wrapper = shallow(
      <LoginView
        {...props}
        user={JSON.stringify(user)}
        isLoggedIn={true}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), isLoggedIn: false });
    render.update();
  });


  it('should render "Login View" when loading', () => {
    const wrapper = shallow(
      <LoginView
        {...props}
        user={JSON.stringify(user)}
        isLoggedIn={true}
        loading={true}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), loading: true });
    render.update();
  });

  it('should render "Login View" on Login', () => {
    const wrapper = shallow(
      <LoginView
        {...props}
        user={JSON.stringify(user)}
        isLoggedIn={true}
        loading={false}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), loading: false, isLoggedIn: true });
    render.instance().setState({ name: "Kinjal", nameError: "" });
    render.update();
    render.props().children.props.children[1].props.children[1].props.children.props.onPress();
  });

  it('should render "Login View" on Login with new user', () => {
    const wrapper = shallow(
      <LoginView
        {...props}
        user={JSON.stringify(user)}
        isLoggedIn={true}
        loading={false}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), loading: false, isLoggedIn: true });
    render.instance().setState({ name: "John", nameError: "" });
    render.update();

    render.props().children.props.children[1].props.children[1].props.children.props.onPress();
  });

  it('should render "Login View" on Login with no input', () => {
    const wrapper = shallow(
      <LoginView
        {...props}
        user={JSON.stringify(user)}
        isLoggedIn={true}
        loading={false}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), loading: false, isLoggedIn: true });
    render.instance().setState({ name: "", nameError: "Please Enter Your name" });
    render.update();
    render.props().children.props.children[1].props.children[1].props.children.props.onPress();
  });

  it('should render "Login View" on entering username ', () => {
    const wrapper = shallow(
      <LoginView
        {...props}
        user={JSON.stringify(user)}
        isLoggedIn={true}
        loading={false}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), loading: false, isLoggedIn: true });
    render.instance().setState({ name: "", nameError: "" });
    render.update();
    render.props().children.props.children[1].props.children[0].props.children[0].props.children.props.onChangeText();
  });

  it('should render "Button View"', () => {
    const wrapper = shallow(
      <Button {...props} />
    );
    expect(wrapper.containsMatchingElement(<legend>Button</legend>));
  });

  it('should render "Spinner" with no spinner ', () => {
    const wrapper = shallow(
      <Spinner {...props} children={true} />
    );
    expect(wrapper.containsMatchingElement(<legend>Spinner</legend>));
  });

})