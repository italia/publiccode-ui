import React from 'react';

import './Page.scss';
import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';

import { Header } from '../Header';

export function Page({ children }) {
  return (
    <>
      <Header/>
      <div>{children}</div>
    </>
  );
}
