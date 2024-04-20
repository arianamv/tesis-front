import { useContext } from 'react';
import ProgressContext from './ProgressContext';

const useProgress = () => useContext(ProgressContext);

export default useProgress;