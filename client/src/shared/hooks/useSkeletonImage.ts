import { useState } from "react";

export const useSkeletonImage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIsLoaded = () => setIsLoaded(true);

  return {
    isLoaded,
    handleIsLoaded,
  };
};
