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
import { signup } from '@/utils/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [searchParams] = useSearchParams();
  const longLinkUrl = searchParams.get('createNewUrl');

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    data,
    loading,
    error,
    fn: fnSignup,
  } = useFetch(
    () =>
      signup(
        formData.email,
        formData.password,
        formData.name,
        formData.profilePic
      ),
    formData
  );

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(
        `/dashboard?${longLinkUrl ? `createNewUrl=${longLinkUrl}` : ''}`
      );
      fetchUser();
    }
  }, [data, error]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup
          .string()
          .email('Invalid email')
          .required('Email is required'),
        password: yup
          .string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        profilePic: yup.mixed().optional(),
      });
      await schema.validate(formData, { abortEarly: false });
      // Call signup API
      await fnSignup();
    } catch (error) {
      const newErrors: { [key: string]: string } = {};
      (error as yup.ValidationError).inner.forEach((e: yup.ValidationError) => {
        if (e.path) {
          newErrors[e.path] = e.message;
        }
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Signup</CardTitle>
        <CardDescription className="text-gray-600">
          Create an account if you don't have one
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Input
            name="name"
            type="text"
            placeholder="Sharpensite"
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.name && <Error message={errors.name} />}
        </div>
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
        <div className="space-y-2">
          <Input
            name="profilePic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.profilePic && <Error message={errors.profilePic} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        <Button
          onClick={handleSignup}
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          {loading ? (
            <PulseLoader size={10} color="#ffffff" />
          ) : (
            'Create Account'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
