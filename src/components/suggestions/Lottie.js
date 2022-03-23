import { useState } from 'react';
import Lottie from 'react-lottie';

const LottieControl = ({ animationData }) => {
  const [isStopped] = useState(false);
  const [isPaused] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height='14rem'
        width='14rem'
        isStopped={isStopped}
        isPaused={isPaused}
      />
    </div>
  );
}

export default LottieControl
