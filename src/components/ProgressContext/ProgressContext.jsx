// AuthContext.js
import { createContext, useState } from 'react';

const initialState = {
  aperturas: 0,
  open: ''
};

const ProgressContext = createContext({
  ...initialState,
  setProgress: () => {},
});

export const ProgressProvider = ({ children }) => {
  const [open, setOpen] = useState('')
  const [aperturas, setAperturas] = useState(0)

  const setProgress = (open) => {
    if (open){
      setAperturas(aperturas + 1)
    } else {
      if (aperturas > 0){
        setAperturas(aperturas - 1)
      } else {
        setAperturas(0)
      }
    }
    setOpen(open)
  };

  return (
    <ProgressContext.Provider
      value={{
        aperturas,
        open,
        setProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;