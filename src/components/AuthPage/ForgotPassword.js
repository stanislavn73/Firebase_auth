import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import HeaderSignedOut from '../../ui-kit/Header/HeaderSingnedOut';
import { useAuth } from "../Auth";
import Footer from '../../ui-kit/Footer/Footer';


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

export default function ForgotPassword() {
  const {resetPassword} = useAuth()
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
            FORGOT YOUR PASSWORD?
        </Typography>
          <Formik initialValues={{ email: ''}}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              resetPassword(values)
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
                    
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Send reset link
                  </Button>
                  </Form>
                )
            }
          </Formik>
        </div>
        <Footer />
      </Container>
    </>
  );
}