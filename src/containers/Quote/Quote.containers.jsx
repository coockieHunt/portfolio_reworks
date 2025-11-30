import {Quoute} from './Quote.style.jsx'
import { m } from "framer-motion"


export const QuoteContainer = ({children}) =>{
      return (
          <Quoute>
            <m.div 
              $initial={{ opacity: 0}} 
              whileInView={{ opacity: 1}}
            >
              <span>{children}</span>
            </m.div>
          </Quoute>
      );
  }