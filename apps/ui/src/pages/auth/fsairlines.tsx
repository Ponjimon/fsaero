import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Box,
  Link,
} from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import useFetch from 'use-http';

const FSAirlinesAuthPage: NextPage<{ vaId: string }> = props => {
  const [vaId] = useState(props.vaId ?? '');
  const { post, loading, error, response } = useFetch({
    method: 'POST',
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = useCallback(
    async values => {
      console.warn(values);
      console.warn(await post(`/api/token/${values.vaId}`, values));
    },
    [post]
  );

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to FSAirlines Account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            We do not store your account credentials. In order to link your
            Discord account to your FSAirline account, we need to fetch an
            access token from the FSAirlines API using your credentials.
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.vaId}>
                <FormLabel htmlFor="name">VA ID</FormLabel>
                <Input
                  id="vaId"
                  defaultValue={vaId}
                  placeholder={'50000'}
                  {...register('vaId', {
                    required: 'This is required',
                    minLength: {
                      value: 1,
                      message: 'Minimum length should be 1',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="name">Username</FormLabel>
                <Input
                  id="username"
                  {...register('username', {
                    required: 'This is required',
                    minLength: {
                      value: 1,
                      message: 'Minimum length should be 1',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="name">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'This is required',
                    minLength: {
                      value: 1,
                      message: 'Minimum length should be 1',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: { vaId: query.vaId ?? null },
});

export default FSAirlinesAuthPage;
