import { useEffect, useState } from "react";
import { type Capsule } from "~/types/capsule";

const useLocalStorage = (key: string = "capsuleData") => {
  const [data, setData] = useState<Capsule | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setData(JSON.parse(storedData) as Capsule);
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data]);

  return [data, setData] as const;
};
export default useLocalStorage;
