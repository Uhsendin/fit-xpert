import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Box,
} from '@mantine/core';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

export function AuthenticationForm(props) {
  const [type, toggle] = useToggle(['login', 'register']);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
      name: (val) => (val.trim() === '' ? 'Full name is required' : null),
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const { email, password, name } = form.values;

  async function handleFormSubmit(e) {
    if (upperFirst(type) === 'Login') {
      e.preventDefault();
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/dashboard');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      if (form.validate().hasErrors) {
        e.preventDefault();
        return;
      } else {
        try {
          e.preventDefault();
          const res = await register({ name, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate('/dashboard');
        } catch (err) {
          toast.error(err?.data.message || err.error);
        }
      }
    }
  }

  return (
    <Box
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '26.25rem',
        paddingTop: '10rem',
      }}
    >
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to FitXpert, {type} below
        </Text>

        <Divider labelPosition="center" my="lg" />

        <form onSubmit={handleFormSubmit}>
          <Stack>
            {type === 'register' && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                error={form.errors.name && 'Name required'}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="email@domain.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
}
