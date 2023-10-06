import React from 'react';

import {Quoute} from './Quote.style.jsx'

export const QuoteContainer = ({text}) =>{
      return (
        <Quoute>{text}</Quoute>
      );
  }