import { Slide } from '@mui/material';
import { forwardRef } from 'react';

export const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ ref } { ...props } />;
});