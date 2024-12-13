import React from 'react';
import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { useForm } from 'react-hook-form';
import { SignUpValidation } from '../../lib/validation';
import Loader from '../../components/shared/Loader';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { createUserAccount } from '../../lib/appwrite/api';
// import { useToast } from '@/hooks/use-toast';

const SignUpForm = () => {
  const isLoading = false;

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof SignUpValidation>) => {
    console.log(values);

    const newUser = await createUserAccount(values);

    console.log(newUser);
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
          Create an account
        </h2>
        <p className='text-light-3 small-regular md:base-regular mt-2'>
          To use the app, please enter your details
        </p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9 flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} placeholder="Please enter your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} placeholder="Please enter your username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
                    <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} placeholder="Please enter your email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
                    <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} placeholder="Please enter your password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit" className="shad-btn__primary">
            {
              isLoading ? (
                <div className="flex-center gap-2">
                  <Loader />
                </div>
              ) : "Sign up"  
            }
          </Button>
          <p className='text-small-regular text-light-2 mt-3'>
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignUpForm;