import { useState, useEffect } from "react";
import axios from "axios";

type RequestBody = {
  birthDate: Date;
  city: string;
};

type UseGetBasePriceResponse = {
  basePrice: number | null;
  isLoading: boolean;
  error: string | null;
  fetchBasePrice: (data: RequestBody) => void;
};

const useGetBasePrice = (): UseGetBasePriceResponse => {
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBasePrice = async (data: RequestBody) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/getBasePrice",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setBasePrice(response.data.basePrice);
    } catch (err) {
      console.log("Error posting: " + err);
      setError("No response from server");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  return {
    basePrice,
    isLoading,
    error,
    fetchBasePrice,
  };
};

export default useGetBasePrice;
