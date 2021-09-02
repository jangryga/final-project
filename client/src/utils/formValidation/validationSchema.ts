import * as Yup from 'yup';

export const schema = Yup.object({
  username: Yup.string()
    .required('Enter a valid username.')
    .min(5, 'Username must be at least 5 characters.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Enter a valid email address.'),
  password: Yup.string()
    .required('Enter a valid password.')
    .min(8, 'Password must be at least 8 characters.')
    .matches(/[a-zA-Z]/, 'Provided invalid characters.'),
});
