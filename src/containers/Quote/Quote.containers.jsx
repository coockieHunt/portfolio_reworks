import React from 'react';

import {Quoute} from './Quote.style.jsx'
import { motion } from "framer-motion"


export const QuoteContainer = ({text}) =>{
      return (
        
          <Quoute>
            <motion.div 
              initial={{ y: -100}} 
              whileInView={{ y: 0}}
            >
              <span>{text}</span>
            </motion.div>
          </Quoute>
        
      );
  }