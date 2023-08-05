import { Menu, Group, UnstyledButton, Button, Text } from '@mantine/core';
import { forwardRef } from 'react';
import {
  IconSettings,
  IconChevronRight,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import { useSelector } from 'react-redux';

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

        <IconChevronRight size="1rem" />
      </Group>
    </UnstyledButton>
  ));

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UserButton name={userInfo.name} email={userInfo.email} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
