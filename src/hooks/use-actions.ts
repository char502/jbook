import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  // useMemo, like a useState and useEffect put together

  // createBundle is bound into the useActions hook, need useMemo in useActions Hook to prevent continual re-rendering as it is being rebound on every re-render of a component

  // assigning the overall return to useMemo means this is only run once unless dispatch changes

  // this means will only try to bind the action creators one time

  // This will stop createBundle continuallt changing and preventing the flicker issue were seeing before

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};

// only need to include in dependency array if they are declared/defined in the component itself or received as a prop, as dispatch is declred here are using it in the dependancy array

// actionCreators does not have to be added in because it is imported at the top of the file
