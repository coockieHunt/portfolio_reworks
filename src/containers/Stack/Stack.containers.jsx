import React from 'react';
import {Stack} from './Stack.style'

import Node_mailer_logo from '../../assets/images/techno/Node_mailer.webp'
import Express_logo from '../../assets/images/techno/Expressjs.svg'
import Framer_logo from '../../assets/images/techno/Framer-motion-logo.svg'
import NodeJs_logo from '../../assets/images/techno/node-js.svg'
import React_logo from '../../assets/images/techno/react.svg'

export const StackContainer = () =>{
      return (
        <Stack>
          <a href="https://fr.react.dev/">
            <img 
              src={React_logo} 
              alt="react technologie logo"
            />
          </a>
          <a href="https://www.framer.com/motion/">
            <img 
              src={Framer_logo}
              alt="framer technologie logo"
            />
          </a>
          <a href="https://nodemailer.com/">
              <img 
                src={Node_mailer_logo}
                alt="Node mailer technologie logo"

              />
            </a>
          <a href="https://nodejs.org/">
            <img 
              src={NodeJs_logo}
              alt="Node js technologie logo"
            />
          </a>
          <a href="https://expressjs.com/fr/">
            <img 
              src={Express_logo}
              alt="Express js technologie logo"
            />
          </a>
        </Stack>
      );
  }