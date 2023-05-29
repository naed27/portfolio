import { useDrag } from "react-use-gesture";

interface Props {
	onUp?: ()=>void,
	onDown?: ()=>void,
	onLeft?: ()=>void,
	onRight?: ()=>void,
	threshold?: number
}

const defaultThreshold = 0.3;
const defaultCallback = () => {};

const useSwipe = ({
	onUp = defaultCallback,
	onDown = defaultCallback,
	onLeft = defaultCallback,
	onRight = defaultCallback,
	threshold = defaultThreshold,
}:Props) => {
	
  const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
    if (Math.abs(vx) > Math.abs(vy)) {
      if (vx < -threshold && last) {
        onLeft();
      } else if (vx > threshold && last) {
        onRight();
      }
    } else {
      if (vy < -threshold && last) {
        onUp();
      } else if (vy > threshold && last) {
        onDown();
      }
    }
  });

  return bind;
}

export default useSwipe