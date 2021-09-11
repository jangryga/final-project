import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Copyright from '../ui/Copyright';
import { Link } from 'react-router-dom';
import FormField from '../ui/FormField';
import { Form, Formik, Field } from 'formik';
import { signInStyles } from './signInStyles';
import { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useRequest } from '../../utils/hooks/useRequest';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../../state/actions/authActions';
import DuoIcon from '@material-ui/icons/Duo';

const useStyles = signInStyles;

export default function SignIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (res) => {
      dispatch(setUserLoggedIn({ ...res }));
      history.push('/dashboard');
    },
  });

  const handleSignIn = async () => {
    doRequest();
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DuoIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in now!
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSignIn}
        >
          {({ values }) => (
            <Form className={classes.form}>
              <div>
                <Field
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                  margin='normal'
                  label='Email Address'
                  variant='outlined'
                  placeholder='Email'
                  name='email'
                  component={FormField}
                />
              </div>
              <div>
                <Field
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  margin='normal'
                  label='Password'
                  type='password'
                  variant='outlined'
                  placeholder='Password'
                  name='passwrod'
                  component={FormField}
                />
              </div>
              <Button
                color='primary'
                variant='contained'
                type='submit'
                fullWidth
                className={classes.submit}
              >
                Sign in
              </Button>
              <Grid container>
                <Grid item>
                  <Link to='/register'>{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
