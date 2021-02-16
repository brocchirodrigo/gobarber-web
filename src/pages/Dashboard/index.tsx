import React from 'react';
import { FiPower } from 'react-icons/fi';
// import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';

import { Container, Header, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img
              src="https://avatars.githubusercontent.com/u/54460900?s=460&u=fdde0f8f91ef3e4cbd1c593153ce1e3a1b4d8f05&v=4"
              alt="Rodrigo Brocchi"
            />
            <div>
              <span>Bem vindo</span>
              <strong>Rodrigo Brocchi</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
