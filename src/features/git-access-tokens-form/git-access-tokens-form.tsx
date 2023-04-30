import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useEventListener } from '@mantine/hooks';
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';

export const GitAccessTokensForm = () => {
  const validateToken = (token: string) => /[A-Za-z0-9]+/.test(token);
  const form = useForm({
    initialValues: {
      githubAccessToken: '',
      gitlabAccessToken: ''
    },

    validate: {
      githubAccessToken: (v) => (v === '' || validateToken(v) ? '' : 'Invalid Github Access Token'),
      gitlabAccessToken: (v) => (v === '' || validateToken(v) ? '' : 'Invalid Gitlab Access Token')
    }
  });

  const [isVaild, setIsValid] = useState(true);
  const validate = useCallback(
    () =>
      setIsValid(
        (_) =>
          (form.values.githubAccessToken !== '' || form.values.gitlabAccessToken !== '') &&
          (validateToken(form.values.githubAccessToken) || validateToken(form.values.gitlabAccessToken))
      ),
    [form.values.githubAccessToken + form.values.gitlabAccessToken]
  );
  const ref = useEventListener('click', validate);

  return (
    <Box maw={320} mx='auto' component='form' onSubmit={form.onSubmit(() => {})}>
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
          ref={ref}
          type='submit'
        >
          Start
        </Button>
      </Group>

      <div>
        {isVaild || (
          <p
            css={{
              fontSize: '0.7rem',
              color: 'red'
            }}
          >
            Either or both Github or Gitlab access tokens are required to use the app.
          </p>
        )}
      </div>
    </Box>
  );
};
