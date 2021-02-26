import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Signin from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Signin Page', () => {
  it('Should be able to sign in', () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);

    const emailField = getByPlaceholderText('E-Mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@test.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
  });
});
