import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { css } from '@emotion/react';

export const GitAccessTokensForm = () => {
  const form = useForm({
    initialValues: {
      githubAccessToken: '',
      gitlabAccessToken: ''
    }
  });

  return (
    <Box maw={320} mx='auto'>
      <TextInput
        label='Github Token'
        placeholder='Input your github access token'
        {...form.getInputProps('githubAccessToken')}
      />
      <TextInput
        mt='md'
        label='Gitlab Token'
        placeholder='Input your gitlab access token'
        {...form.getInputProps('gitlabAccessToken')}
      />

      <Group position='center' mt='xl'>
        <Button
          sx={{
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem'
          }}
          onClick={() => {}}
        >
          Start
        </Button>
      </Group>
    </Box>
  );
};
