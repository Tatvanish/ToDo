import React from 'react';
import ProfileView from '../../src/modules/screens/Profile/ProfileView'
import Header from '../../src/components/UserDefinedComponents/HeaderComponent'
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../src/redux/store';
import Alert from 'Alert'

configure({ adapter: new Adapter() });

describe('PROFILE VIEW ', () => {
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


  it('should render "Profile View"', () => {
    const wrapper = shallow(
      <ProfileView {...props} dispatch={jest.fn} store={store} />
    );
    expect(wrapper.containsMatchingElement(<legend>ProfileView</legend>));
  });

  it('should render "Profile View" get the user details', () => {
    const wrapper = shallow(
      <ProfileView
        {...props}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user) });
    render.instance().setState({ name: user });
    render.update();
  });

  it('should render "Profile View" on logout', () => {
    const wrapper = shallow(
      <ProfileView
        {...props}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user) });
    render.instance().setState({ name: user });
    render.update();
    render.props().children[1].props.children.props.onPress();

  });

  it('should render "Header"', () => {
    const wrapper = shallow(
      <Header {...props} />
    );
    expect(wrapper.containsMatchingElement(<legend>Header</legend>));
  });
})