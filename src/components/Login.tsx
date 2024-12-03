import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PulseLoader } from 'react-spinners';
import Error from './Error';
import * as yup from 'yup';
import useFetch from '@/hooks/use-fetch';
import { login } from '@/utils/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [searchParams] = useSearchParams();
  const longLinkUrl = searchParams.get('createNewUrl');

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const {
    data,
    loading,
    error,
    fn: fnLogin,
  } = useFetch(() => login(formData.email, formData.password), formData);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(
        `/dashboard?${longLinkUrl ? `createNewUrl=${longLinkUrl}` : ''}`
      );
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors({});
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email('Invalid email')
          .required('Email is required'),
        password: yup
          .string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      });
      await schema.validate(formData, { abortEarly: false });
      // Call login API
      await fnLogin();
    } catch (error) {
      const newErrors: { [key: string]: string } = {};
      (error as yup.ValidationError).inner.forEach((e: yup.ValidationError) => {
        if (e.path) newErrors[e.path] = e.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Login</CardTitle>
        <CardDescription className="text-gray-600">
          Access your account if you already have one
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder="sharp123@example.com"
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-2">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        <Button
          onClick={handleLogin}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {loading ? <PulseLoader size={10} color="#ffffff" /> : 'Login'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
