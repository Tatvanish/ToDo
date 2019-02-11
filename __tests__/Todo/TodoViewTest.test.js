import React from 'react';
import TodoView from '../../src/modules/screens/Todo/TodoView'
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../src/redux/store';
import Alert from 'Alert';
import Platform from 'Platform'
import 'react-native';

configure({ adapter: new Adapter() });

describe('TODO VIEW ', () => {
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
      colors: { colorId: 1, colorCode: '#80D320' },
      status: true
    },
    {
      taskId: 2,
      taskTitle: "xyz",
      dueDate: "2019-02-06 17:32:00",
      colors: { colorId: 2, colorCode: '#4A90E2' },
      status: false
    },
    {
      taskId: 3,
      taskTitle: "pqr",
      dueDate: "2019-02-08 17:32:00",
      colors: { colorId: 1, colorCode: '#80D320' },
      status: false
    }]
  }]

  const todos = [
    {
      taskId: 1,
      taskTitle: "abc",
      dueDate: "2019-02-06 17:32:00",
      colors: { colorId: 5, colorCode: '#80D320' },
      status: true
    },
    {
      taskId: 2,
      taskTitle: "xyz",
      dueDate: "2019-02-06 17:32:00",
      colors: { colorId: 1, colorCode: '#4A90E2' },
      status: false
    },
    {
      taskId: 3,
      taskTitle: "pqr",
      dueDate: "2019-02-08 17:32:00",
      colors: { colorId: 2, colorCode: '#80D320' },
      status: false
    }
  ]

  const item = [
    {
      taskId: 1,
      taskTitle: "abc",
      dueDate: "2019-02-14 17:32:00",
      colors: { colorId: 1, colorCode: '#80D320' },
      status: true
    },

  ]

  it('should render "Todo View"', () => {
    const wrapper = shallow(
      <TodoView {...props} dispatch={jest.fn} store={store} />
    );
    expect(wrapper.containsMatchingElement(<legend>TodoView</legend>));
  });


  it('should render "Todo View" with Tasks', () => {
    const wrapper = shallow(
      <TodoView
        {...props}
        todo={JSON.stringify(todos)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), todo: JSON.stringify(todos) });
    render.instance().setState({ dataSource: todos });
    render.update();

    render.props().children[1].props.renderRow();
  });

  it('should render "Todo View" with 3 Tasks ', () => {
    const wrapper = shallow(
      <TodoView
        {...props}
        todo={JSON.stringify(todos)}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), todo: JSON.stringify(todos) });
    render.instance().setState({ dataSource: todos, userId: 1 });
    render.update();
    expect(render.props().children[1].props.dataSource.length).toEqual(3);
  });

  it('should render "Todo View" with  change in tasklist ', () => {
    const wrapper = shallow(
      <TodoView
        {...props}
        todo={JSON.stringify(todos)}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), todo: JSON.stringify(item) });
    render.instance().setState({ dataSource: todos, userId: 1 });
    render.update();
    expect(render.props().children[1].props.dataSource.length).toEqual(3);
  });


  it('should render "Todo View" with Tasks on swipeleft', () => {
    const wrapper = shallow(
      <TodoView
        {...props}
        todo={JSON.stringify(todos)}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), todo: JSON.stringify(todos) });
    render.instance().setState({ dataSource: todos });
    render.update();
    render.props().children[1].props.renderRow(todos).props.left;
  });

  it('should render "Todo View" with Tasks on swipeleft and click on complete button', () => {
    const wrapper = shallow(
      <TodoView
        {...props}
        todo={JSON.stringify(todos)}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), todo: JSON.stringify(todos) });
    render.instance().setState({ dataSource: todos, userId: 1 });
    render.update();
    render.props().children[1].props.renderRow(todos).props.left[0].onPress();
  });

  it('should render "Todo View" with Tasks on swiperight', () => {
    const wrapper = shallow(
      <TodoView
        {...props}
        todo={JSON.stringify(todos)}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), todo: JSON.stringify(todos) });
    render.instance().setState({ dataSource: todos });
    render.update();
    render.props().children[1].props.renderRow(todos).props.right;
  });

  it('should render "Todo View" with Tasks on swipeRight and click on delete button', () => {

    const wrapper = shallow(
      <TodoView
        {...props}
        todo={JSON.stringify(todos)}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), todo: JSON.stringify(todos) });
    render.instance().setState({ dataSource: todos, userId: 1 });
    render.update();
    render.props().children[1].props.renderRow(item).props.right[0].onPress();

  });

  it('should render "Todo View" with Tasks on swipeLeft and click on complete button', () => {
    const wrapper = shallow(
      <TodoView
        {...props}
        todo={JSON.stringify(todos)}
        user={JSON.stringify(user)}
        dispatch={jest.fn}
        store={store}
      />
    );
    const render = wrapper.dive();
    render.setProps({ user: JSON.stringify(user), todo: JSON.stringify(todos) });
    render.instance().setState({ dataSource: todos, userId: 1 });
    render.update();
    render.props().children[1].props.renderRow(todos).props.left[0].onPress()
  });

});