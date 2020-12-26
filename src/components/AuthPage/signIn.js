import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkUi from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import HeaderSignedOut from '../../ui-kit/Header/HeaderSingnedOut';
import { Link } from 'react-router-dom';
import { useAuth } from "../Auth";
import FooterLoggedOut from '../../ui-kit/Footer/FooterLoggedOut';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ history }) {
  const { handleLoginUser, serverResponse } = useAuth()
  const [rememberMe, setRememberMe] = useState(false)
  const classes = useStyles();


  return (
    <>
      <HeaderSignedOut />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <Formik initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              handleLoginUser(values, history, rememberMe, setRememberMe)
              setSubmitting(false)
            }}
          >
            {
              ({ values,
                handleBlur,
                handleChange,
                handleSubmit
              }) => (
                <Form className={classes.form}
                >
                  {serverResponse && <Alert severity="error">{serverResponse}</Alert>}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary"
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <LinkUi variant="body2"
                        component={Link} to='/forgot-password'
                      >
                        Forgot password?
                      </LinkUi>
                    </Grid>
                    <Grid item>
                      <LinkUi variant="body2"
                        component={Link} to='/signup'
                      >
                        Don't have an account? Sign Up
                      </LinkUi>
                    </Grid>
                  </Grid>
                </Form>
              )
            }
          </Formik>
        </div>
        <FooterLoggedOut history={history} />
      </Container>

    </>
  );
}