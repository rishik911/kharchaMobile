import React, {useEffect, useRef} from 'react';
import Lottie from 'lottie-react-native';

interface LoaderProps {
  play: boolean;
}

const Loader: React.FC<LoaderProps> = ({play = null}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref?.current) {
      if (play) {
        ref?.current?.play();
      } else {
        ref?.current?.pause();
      }
    }
  }, [play]);
  return (
    <Lottie
      style={{width: 150, height: 150, position: 'absolute'}}
      ref={ref}
      loop={true}
      source={require('../../assets/lottie/loader.json')}
    />
  );
};

export default Loader;
