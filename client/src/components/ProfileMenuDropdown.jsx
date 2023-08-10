import { Menu, Group, UnstyledButton, Text } from '@mantine/core';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice';
export default function ProfileMenuDropdown() {
  const UserButton = forwardRef(({ name, email, ...props }, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        // padding: theme.spacing.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...props}
    >
      <Group>
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const handleClick = async (event) => {
    if (event.target.innerText === 'Settings') {
      navigate('/settings/profile');
    }
    if (event.target.innerText === 'Logout') {
      try {
        navigate('/');
        await logoutApiCall().unwrap();
        dispatch(clearCredentials());
      } catch (err) {
        console.log(err);
      }
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UserButton name={userInfo.name} email={userInfo.email} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item onClick={handleClick}>Settings</Menu.Item>
        <Menu.Item onClick={handleClick}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
