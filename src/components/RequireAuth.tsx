import { UrlState } from '@/context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (loading === false && !isAuthenticated) {
      navigate('/auth');
    }
  }, [loading, isAuthenticated]);

  if (isAuthenticated) {
    return children;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#36d7b7" size={50} />
      </div>
    );
  }
};

export default RequireAuth;
