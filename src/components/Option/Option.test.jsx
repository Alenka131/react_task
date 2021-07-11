import React from 'react';
import { shallow } from 'enzyme';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { OPTION_DEFAULT_TEST_ID as testId } from 'shared/testId';
import Option from '.';

afterEach(cleanup);

describe('<Option />', () => {
  it('should defined', () => {
    expect(Option).not.toBeUndefined;
  });

  it('should render button in item of list', () => {
    const mockCallBack = jest.fn();
    const text = 'Lorem ipsum';

    const { getByTestId } = render(
      <Option
        handleClick={mockCallBack}
        text={text}
        testId={testId}
      />,
    );
    const option = getByTestId(testId);
    expect(option.tagName.toLowerCase()).toEqual('li');
    const button = option.querySelectorAll('button');
    expect(button).toHaveLength(1);
  });

  it('should render text property', () => {
    const mockCallBack = jest.fn();
    const text = 'Lorem ipsum';

    const { getByTestId } = render(
      <Option
        handleClick={mockCallBack}
        text={text}
        testId={testId}
      />,
    );
    const option = getByTestId(testId);
    const button = option.querySelector('button');
    fireEvent.click(button);
    expect(button.innerHTML).toEqual(text);
  });

  it('should render with additional className if has selected property', () => {
    const mockCallBack = jest.fn();
    const text = 'Lorem ipsum';

    const { getByTestId } = render(
      <Option
        handleClick={mockCallBack}
        text={text}
        testId={testId}
        selected
      />,
    );

    const option = getByTestId(testId);
    const button = option.querySelector('button');
    expect(button).toHaveStyle('cursor: default');
  });

  it('simulates click events', () => {
    const mockCallBack = jest.fn();
    const text = 'Lorem ipsum';

    const { getByTestId } = render(
      <Option
        handleClick={mockCallBack}
        text={text}
        testId={testId}
      />,
    );
    const option = getByTestId(testId);
    const button = option.querySelector('button');
    fireEvent.click(button);
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it('should renders correctly', () => {
    const mockCallBack = jest.fn();
    const text = 'Lorem ipsum';

    const wrapper = shallow(
      <Option
        handleClick={mockCallBack}
        text={text}
        testId={testId}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders correctly, with selected property', () => {
    const mockCallBack = jest.fn();
    const text = 'Lorem ipsum';

    const wrapper = shallow(
      <Option
        handleClick={mockCallBack}
        text={text}
        testId={testId}
        selected
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
