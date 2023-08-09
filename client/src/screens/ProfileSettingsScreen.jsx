import React from 'react';
import { MainHeader } from '../components/MainHeader';
import { Container, Box, Text } from '@mantine/core';
import { UpdateProfileForm } from '../components/UpdateProfileForm';
import { links } from '../constants/headerLinks';
const ProfileSettingsScreen = () => {
  return (
    <div>
      <MainHeader links={links} />
      <Container>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            // textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
          })}
        >
          <UpdateProfileForm />
        </Box>
      </Container>
    </div>
  );
};

export default ProfileSettingsScreen;
