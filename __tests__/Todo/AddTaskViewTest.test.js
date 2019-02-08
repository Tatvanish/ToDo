import React from 'react';
import AddTaskView from '../../src/modules/screens/AddTask/AddTaskView'
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../src/redux/store';
import Alert from 'Alert'

configure({ adapter: new Adapter() });

describe('ADDTASK VIEW ', () => {
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

  it('should render "AddTask View"', () => {
    const wrapper = shallow(
      <AddTaskView {...props} dispatch={jest.fn} store={store} />
    );
    expect(wrapper.containsMatchingElement(<legend>AddTaskView</legend>));
  });

  it('should render "AddTask View" set the colorlist', () => {
    const wrapper = shallow(
      <AddTaskView
        {...props}
        user={JSON.stringify(user)}
        colorList={JSON.stringify(colors)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), colorList: JSON.stringify(colors) });
    render.instance().setState({ userId: 1, colorList: colors });
    render.update();
  });

  it('should render "AddTask View" getting the colorlist', () => {
    const wrapper = shallow(
      <AddTaskView
        {...props}
        user={JSON.stringify(user)}
        colorList={null}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), colorList: JSON.stringify(colors) });
    render.update();

  });

  it('should render "AddTask View" on Adding new task', () => {
    const wrapper = shallow(
      <AddTaskView
        {...props}
        user={JSON.stringify(user)}
        colorList={JSON.stringify(colors)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), colorList: JSON.stringify(colors) });
    render.instance().setState({
      userId: 1, colorList: colors, taskTitle: "abc",
      dueDate: "2019 - 02 - 10",
      selectedColor: { colorId: 1, colorCode: '#4A90E2' },
    });
    render.update();
    render.props().children[1].props.children[3].props.children.props.onPress();

  });

  it('should render "AddTask View" on Adding new task without any input', () => {
    const wrapper = shallow(
      <AddTaskView
        {...props}
        user={JSON.stringify(user)}
        colorList={JSON.stringify(colors)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), colorList: JSON.stringify(colors) });
    render.instance().setState({
      userId: 1, colorList: null, taskTitle: null,
      dueDate: null,
      selectedColor: null,
    });
    render.update();
    render.props().children[1].props.children[3].props.children.props.onPress();
  });

  it('should render "AddTask View" on selecting color', () => {
    const wrapper = shallow(
      <AddTaskView
        {...props}
        user={JSON.stringify(user)}
        colorList={JSON.stringify(colors)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), colorList: JSON.stringify(colors) });
    render.instance().setState({
      userId: 1, colorList: colors, taskTitle: "abc",
      dueDate: "2019 - 02 - 10",
      selectedColor: { colorId: 1, colorCode: '#4A90E2' },
    });
    render.update();
    render.props().children[1].props.children[2].props.children[0].props.children[3].props.onPress();
  });

  it('should render "AddTask View" on input of task title', () => {
    const wrapper = shallow(
      <AddTaskView
        {...props}
        user={JSON.stringify(user)}
        colorList={JSON.stringify(colors)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), colorList: JSON.stringify(colors) });
    render.instance().setState({
      userId: 1, colorList: colors, taskTitle: "",
      dueDate: "2019 - 02 - 10",
      selectedColor: { colorId: 1, colorCode: '#4A90E2' },
    });
    render.update();
    render.props().children[1].props.children[0].props.children[0].props.children.props.onChangeText();
  });

  it('should render "AddTask View" on input of due date', () => {
    const wrapper = shallow(
      <AddTaskView
        {...props}
        user={JSON.stringify(user)}
        colorList={JSON.stringify(colors)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), colorList: JSON.stringify(colors) });
    render.instance().setState({
      userId: 1, colorList: colors, taskTitle: "",
      dueDate: "",
      selectedColor: { colorId: 1, colorCode: '#4A90E2' },
    });
    render.update();
    console.log("render: ", render.props().children[1].props.children[1].props.children[0].props);
    render.props().children[1].props.children[1].props.children[0].props.children.props.onChangeText();
  });

})