import React from 'react';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const h1 = 'DashBoard';
  const test = 'Página privada';

  return (
    <>
      <h1>{h1}</h1>
      <p>{test}</p>
      <Button style={{ width: '20%' }} type="button" onClick={signOut}>
        Deslogar
      </Button>
    </>
  );
};

export default Dashboard;
