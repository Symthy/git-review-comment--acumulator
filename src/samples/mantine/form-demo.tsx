import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEventListener } from '@mantine/hooks';
import { useCallback, useState } from 'react';

export function Demo() {
  const validateEmail = (value: string) => /^\S+@\S+$/.test(value);
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false
    },

    validate: {
      email: (v) => (validateEmail(v) ? null : 'Invalid email')
    }
  });

  const [isVaild, setIsValid] = useState(true);
  const validate = useCallback(() => setIsValid((v) => validateEmail(form.values.email)), [form.values.email]);
  const ref = useEventListener('click', validate);

  return (
    <Box maw={300} mx='auto'>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput withAsterisk label='Email' placeholder='your@email.com' {...form.getInputProps('email')} />

        <Checkbox
          mt='md'
          label='I agree to sell my privacy'
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position='right' mt='md'>
          <Button type='submit' ref={ref}>
            Submit
          </Button>
          {isVaild || <p>invalid</p>}
        </Group>
      </form>
    </Box>
  );
}
