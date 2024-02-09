import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  TextField
} from '@mui/material';
import Radio from '@mui/material/Radio';
import React from 'react';

const Form = ({ children }) => {
  return (
    <div>
      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Card>{children}</Card>
        </Grid>
      </Container>
    </div>
  );
};

export default Form;
