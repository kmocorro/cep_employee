import React from 'react';
import propTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function ResultsLayout({children}) {
  return (
    <Container maxWidth="sm">
      { children ? children :<Typography>Missing Layout...</Typography>}
    </Container>
  );
}

// PropTypes exports a range of validators that can be used to make sure the data you receive is valid.
ResultsLayout.propTypes = {
  children: propTypes.element.isRequired
}