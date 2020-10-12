import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from "formik";
import * as Yup from "yup";


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
    marginTop: theme.spacing(3),
  },
  error_meassage: {
    input: {
      display: 'none'
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ serverResponse, setFormName,handleRegisterUser }) {
  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'min 2 character'),
    lastName: Yup.string().min(2, 'min 2 character'),
    email: Yup.string()
      .email('Must be valid email'),
    password: Yup.string()
      .min(8, 'must be longer then 8 character')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'too weak')
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          }} validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            handleRegisterUser(values, resetForm)
            setSubmitting(false)
          }}
        >
          {
            ({ values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
                <Form className={classes.form} >
                  {/* {console.log(serverReponse)} */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label={errors.firstName || "First Name"}
                        autoFocus
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        error={errors.firstName ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label={errors.lastName || "Last Name"}
                        name="lastName"
                        autoComplete="lname"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        error={errors.lastName ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label={errors.email || "Email Address"}
                        name="email"
                        autoComplete="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        error={errors.email ? true : false}

                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label={errors.password || "Password"}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        error={errors.password ? true : false}
                        helperText={serverResponse}
                      />

                    </Grid>
                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid> */}
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign Up
                </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="#" variant="body2"
                      onClick={()=>setFormName('sign_in')}
                      >
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
        </Formik>

      </div>

    </Container>
  );

}
