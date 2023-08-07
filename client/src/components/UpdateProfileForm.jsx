import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Divider,
  Stack,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
export function UpdateProfileForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const form = useForm({
    initialValues: {
      email: userInfo ? userInfo.email : '',
      name: userInfo ? userInfo.name : '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      name: (val) => (val.trim() === '' ? 'Full name is required' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6 && val !== ''
          ? 'Password should include at least 6 characters'
          : null,
      confirmPassword: (val, values) =>
        val !== values.password ? 'Passwords do not match' : null,
    },
  });

  const { email, password, name } = form.values;
  const handleFormSubmit = async (e) => {
    if (!form.validate().hasErrors) {
      e.preventDefault();
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      e.preventDefault();
      return;
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" ta="center" weight={500}>
        Update profile
      </Text>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={handleFormSubmit}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue('name', event.currentTarget.value)
            }
            error={form.errors.name && "Can't be empty"}
            radius="md"
          />

          <TextInput
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
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

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={form.values.confirmPassword}
            onChange={(event) =>
              form.setFieldValue('confirmPassword', event.currentTarget.value)
            }
            error={form.errors.confirmPassword && 'Passwords must match'}
            radius="md"
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit" radius="xl">
            Update
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
