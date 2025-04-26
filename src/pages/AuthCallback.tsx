
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useKindeAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/');
      } else {
        navigate('/landing');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-secondary/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Logging you in...</h2>
        <p className="text-muted-foreground">Please wait while we complete the authentication.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
