import { useEffect, useState } from "react";
import { type Capsule } from "~/types/capsule";

const useLocalStorage = (key = "capsuleData") => {
  const [data, setData] = useState<Capsule | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setData(JSON.parse(storedData) as Capsule);
    }
  }, [key]);

  const clear = () => {
    localStorage.removeItem(key);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, key]);

  return [data, setData, clear] as const;
};
export default useLocalStorage;
