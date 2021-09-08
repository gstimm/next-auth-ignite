import { useContext, useEffect } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { Can } from '../components/Can';
import { api } from '../services/apiClient';
import { setupAPIClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api
      .get('/me')
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h1>Welcome {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);

  await apiClient.get('/me');

  return {
    props: {},
  };
});
