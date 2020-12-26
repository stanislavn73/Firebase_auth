import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
  return (
    <Box mt={5}>
      <Copyright />
    </Box>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}<br/>
      {'© Stas Bazylevych'}
    </Typography>
  );
}
