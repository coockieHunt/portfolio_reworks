import React from 'react';
import {Stack} from './Stack.style'

import Node_mailer_logo from '../../assets/images/Node_mailer.webp'

export const StackContainer = () =>{
      return (
        <Stack>
          <a href="https://fr.react.dev/"><img src="https://www.cdnlogo.com/logos/r/63/react.svg"/></a>
          <a href="https://www.framer.com/motion/"><img src="https://avatars.githubusercontent.com/u/42876?s=280&v=4"/></a>
          <a href="https://nodemailer.com/"><img src={Node_mailer_logo}/></a>
          <a href="https://nodejs.org/"><img src="https://www.cdnlogo.com/logos/n/79/node-js.svg"/></a>
        </Stack>
      );
  }