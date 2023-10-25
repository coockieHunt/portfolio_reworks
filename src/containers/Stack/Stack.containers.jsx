import React from 'react';
import {Stack} from './Stack.style'

export const StackContainer = ({children}) =>{
      return (
        <Stack>
          <a href="https://fr.react.dev/"><img src="https://www.cdnlogo.com/logos/r/63/react.svg"/></a>
          <a href="https://www.framer.com/motion/"><img src="https://avatars.githubusercontent.com/u/42876?s=280&v=4"/></a>
          <a href="https://spline.design/"><img src="https://super-static-assets.s3.amazonaws.com/726844e5-a1cb-4f61-85b9-4d8c282724f6/uploads/logo/c0390660-a469-4e1b-82ff-f5990a9d1675.png"/></a>
          <a href="https://nodemailer.com/"><img src="https://nodemailer.com/nm_logo_200x136.png"/></a>
          <a href="https://nodejs.org/"><img src="https://www.cdnlogo.com/logos/n/79/node-js.svg"/></a>
        </Stack>
      );
  }