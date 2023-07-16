import { useRef, useEffect, EffectCallback, DependencyList } from "react";

const useSkipEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const effectReturn = effect();
    if (effectReturn && typeof effectReturn === "function") return effectReturn;
  }, deps);
};

export default useSkipEffect;