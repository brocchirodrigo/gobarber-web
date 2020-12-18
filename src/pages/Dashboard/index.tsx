import React from 'react';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const h1 = 'DashBoard';
  const test = 'Página privada';
  const ip = localStorage.getItem('@GoBarber:ip');
  const longitude = localStorage.getItem('@GoBarber:longitude');
  const latitude = localStorage.getItem('@GoBarber:latitude');

  return (
    <>
      <h1>{h1}</h1>
      <p>{test}</p>
      <p>
        {`
          IP: "${ip}" \n
          Longitude: "${longitude}" \n"'
          Latitude: "${latitude}" \n
        `}
      </p>
      <Button style={{ width: '20%' }} type="button" onClick={signOut}>
        Deslogar
      </Button>
    </>
  );
};

export default Dashboard;
