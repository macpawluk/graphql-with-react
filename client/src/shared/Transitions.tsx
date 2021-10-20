import { Slide, SlideProps } from '@mui/material';
import * as React from 'react';

export const SlideTransition = React.forwardRef<unknown, SlideProps>(
  (props, ref) => <Slide direction="up" ref={ref} {...props} />
);
