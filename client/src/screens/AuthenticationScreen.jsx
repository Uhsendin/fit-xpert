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
  Select,
  Anchor,
  Stack,
  Box,
  Radio,
  NumberInput,
} from '@mantine/core';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { heightToCentimeters } from '../utils/heightToCentimeters';

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
      gender: '',
      age: '',
      feet: '',
      inch: '',
      height: '',
      weight: '',
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

  let { email, password, name, gender, age, feet, inch, height, weight } =
    form.values;

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
          height = heightToCentimeters(feet, inch);
          const res = await register({
            name,
            email,
            password,
            gender,
            age,
            height,
            weight,
          }).unwrap();
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
              <Radio.Group
                label="Gender"
                required
                value={form.values.gender}
                onChange={(event) => form.setFieldValue('gender', event)}
              >
                <Group>
                  <Radio value="male" label="Male" />
                  <Radio value="female" label="Female" />
                </Group>
              </Radio.Group>
            )}
            {type === 'register' && (
              <NumberInput
                type="number"
                value={form.values.age}
                placeholder="Your age"
                label="Age"
                required
                hideControls
                onChange={(event) => form.setFieldValue('age', event)}
              />
            )}

            {type === 'register' && (
              <Group noWrap>
                <Select
                  label="Feet"
                  placeholder="Ft"
                  value={form.values.feet}
                  onChange={(event) => form.setFieldValue('feet', event)}
                  data={[
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                    { value: 8, label: '8' },
                  ]}
                />
                <Select
                  label="Inch"
                  placeholder="In"
                  value={form.values.inch}
                  onChange={(event) => form.setFieldValue('inch', event)}
                  data={[
                    { value: 0, label: '0' },
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                    { value: 8, label: '8' },
                    { value: 9, label: '9' },
                    { value: 10, label: '10' },
                    { value: 11, label: '11' },
                  ]}
                />
              </Group>
            )}
            {type === 'register' && (
              <NumberInput
                type="number"
                label="Weight (lbs)"
                value={form.values.weight}
                placeholder="155"
                required
                hideControls
                onChange={(event) => form.setFieldValue('weight', event)}
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
