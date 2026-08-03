import React, { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

const CountUp = ({ end, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

export default CountUp;
