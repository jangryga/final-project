import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setUserLoggedIn } from '../../state/actions/authActions';
import { useRequest } from '../../utils/hooks/useRequest';
import Copyright from '../ui/Copyright';
import FormField from '../ui/FormField';
import { registerStyles } from './styles';
import DuoIcon from '@material-ui/icons/Duo';

const useStyles = registerStyles;

export default function Register(): React.ReactElement {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const { doRequest } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      username,
      password,
    },
    onSuccess: (res) => {
      dispatch(setUserLoggedIn({ ...res }));
      history.push('/dashboard');
    },
  });

  const handleRegister = async () => {
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
          Register
        </Typography>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          onSubmit={handleRegister}
        >
          {({ values }) => (
            <Form className={classes.form}>
              <div>
                <Field
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  margin='normal'
                  required
                  label='Username'
                  variant='outlined'
                  placeholder='Username'
                  name='username'
                  component={FormField}
                />
              </div>
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
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
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
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link to='/'>{'Already have an account? Sign In'}</Link>
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
