import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

describe('Todo Component', () => {
  const todo = {
    id: '007JAMES007BOND007',
    text: 'This is just a test Todo',
    done: false
  };

  const deleteTodo = jest.fn();
  const completeTodo = jest.fn();

  it('renders todo text', () => {
    const { getByText } = render( <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} /> );
    expect(getByText('This is just a test Todo')).toBeInTheDocument();
  });

  it('calls deleteTodo when delete button is clicked', () => {
    const { getByText } = render( <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} /> );
    fireEvent.click(getByText('Delete'));
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(todo);
  });

  it('calls completeTodo when set as done button is clicked', () => {
    const { getByText } = render( <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} /> );
    fireEvent.click(getByText('Set as done'));
    expect(completeTodo).toHaveBeenCalledTimes(1);
    expect(completeTodo).toHaveBeenCalledWith(todo);
  });
});