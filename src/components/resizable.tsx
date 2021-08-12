import React from 'react';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  // piece of state to synchronise width with internal ResizableBox state
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  // whenever the browser window is about to be resized (resize event), need to come back and recalculate these dimensions
  // whenever the resize event occurs will call the listener function
  useEffect(() => {
    let timer: any;

    // added to improve performance (a delay on update)
    // getting ignored because providing a prop width directly
    // (see width prop in resizableProps when horizontal)
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        // bit of a bug - the maxConstrints props not always respected
        // when width piece of state larger than maximum width (window.innerWidth * 0.75)
        // set the width to the maximum width (window.innerWidth * 0.75)
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    // whenever you set up a global event listener inside a component (namely inside a useEffect funtion)
    // always need to make sure clean up after (whenever decide to stop showing this component)
    // this return will run and remove the event listener (cleanup)
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'horizontal') {
    resizableProps = {
      // allows addition of custom CSS only on horizontal case
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      // function/callback is called/used after user finishes resizing the horizontal bar
      // this records the width of the container when resizing has finished
      // this then sets that width to state to help synchronise this internal ResizableBox state
      // with the width of the box in the component
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s']
    };
  }

  return (
    // window.innerHeight * 0.9 means allow vertical expansion to 90% of browser window
    <ResizableBox {...resizableProps}>{children}</ResizableBox>
  );
};

export default Resizable;
