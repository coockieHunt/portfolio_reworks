import {Quoute} from './Quote.style.jsx'
import { motion } from "framer-motion"


export const QuoteContainer = ({children}) =>{
      return (
          <Quoute>
            <motion.div 
              $initial={{ opacity: 0}} 
              whileInView={{ opacity: 1}}
            >
              <span>{children}</span>
            </motion.div>
          </Quoute>
      );
  }