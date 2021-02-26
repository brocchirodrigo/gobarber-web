import { render } from '@testing-library/react';
import React from 'react';
import Signin from '../../pages/SignIn';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Signin Page', () => {
  it('Shold be able to sign in', () => {
    const { debug } = render(<Signin />);

    debug();
  });
});
