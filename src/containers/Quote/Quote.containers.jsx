import React from 'react';

import {Quoute} from './Quote.style.jsx'
import { motion } from "framer-motion"


export const QuoteContainer = ({children}) =>{
      return (
        
          <Quoute>
            <motion.div 
              initial={{ y: -100}} 
              whileInView={{ y: 0}}
            >
              <span>{children}</span>
            </motion.div>
          </Quoute>
        
      );
  }