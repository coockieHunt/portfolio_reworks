import React from 'react';
import {Stack} from './Stack.style'

import Node_mailer_logo from '../../assets/images/Node_mailer.webp'
import Express_logo from '../../assets/images/Express.webp'

export const StackContainer = () =>{
      return (
        <Stack>
          <a href="https://fr.react.dev/">
            <img 
              src="https://www.cdnlogo.com/logos/r/63/react.svg" 
              alt="react technologie logo"
            />
          </a>
          <a href="https://www.framer.com/motion/">
            <img 
              src="https://avatars.githubusercontent.com/u/42876?s=280&v=4"
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
              src="https://www.cdnlogo.com/logos/n/79/node-js.svg"
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