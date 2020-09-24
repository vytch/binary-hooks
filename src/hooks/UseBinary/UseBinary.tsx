import { useState, useEffect, useCallback , useRef} from 'react';
import {BinarySearchTree, Maybe, Node} from './binarySearchTree';

export interface Step {
  value: number;
  data: any;
}


export const useBinary = function(steps:Step[]) {
  const bt = useRef<BinarySearchTree>(new BinarySearchTree());
  const [currentView, setCurrentView] = useState<Maybe<Node>>(null);

  useEffect(() => {
    steps.forEach(step => {
      bt.current.add(step.value, step.data);
      setCurrentView(bt.current._root);
    });
  }, [bt, steps]);

  const goTo = useCallback(function(target: number){
    setCurrentView(bt.current.get(target));
  }, [bt]);

  const reset = useCallback(function(){
    setCurrentView(bt.current._root);
  }, [bt]);

  return {
    goTo,
    reset,
    root: bt.current._root,
    currentView,
    setCurrentView
  }
}
