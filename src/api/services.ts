import axios from "axios";
import { Coverage, Discounts } from "../interface/types";

interface GetTotal {
  birthDate: Date | null;
  basePrice: number | null;
  priceMatch: number | null;
  bonusProtection: boolean;
  ao: boolean;
  glassProtection: boolean;
  vehiclePower: number | null;
  voucher: number | null;
  commercialDiscount: boolean;
  adviserDiscount: boolean;
  vipDiscount: boolean;
  carSurcharge: boolean;
}

interface SaveUser {
  name: string;
  birthDate: Date;
  city: string;
  vehiclePower: number;
  basePrice: number | null;
  priceMatch: number | null;
  ao: number | boolean;
  glassProtection: number | boolean;
  bonusProtection: number | boolean;
  voucher: number | null;
  commercialDiscount: number | boolean;
  adviserDiscount: number | boolean;
  vipDiscount: number | boolean;
  carSurcharge: number | boolean;
}

interface TotalResponse {
  basePrice: number;
  total: number;
  allCovarages: Coverage;
  allDiscounts: Discounts;
}

const instance = axios.create({
  baseURL: "http://localhost:4000/api/",
  timeout: 10000,
});

export const getTotal = async (data: GetTotal): Promise<TotalResponse> => {
  try {
    const response = await instance.post("/getTotal", data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching total:", error);
    throw new Error("Failed to get total from the server.");
  }
};

export const saveUser = async (data: SaveUser): Promise<void> => {
  try {
    await instance.post("/saveUser", data);
  } catch (error) {
    console.error("Error occurred while saving user data:", error);
    throw new Error("Failed to save user data.");
  }
};
