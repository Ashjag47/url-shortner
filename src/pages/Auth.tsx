import Login from '@/components/Login';
import Signup from '@/components/Signup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UrlState } from '@/context';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLinkUrl = searchParams.get('createNewUrl');
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(
        `/dashboard?${longLinkUrl ? `createNewUrl=${longLinkUrl}` : ''}`
      );
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-15 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longLinkUrl
          ? 'Hold on! please login or signup to continue'
          : 'Login / Signup'}
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
