import React, { useEffect, useState } from "react";
import { getTotal } from "../api/services";
import { Coverage, Discounts } from "../interface/types";

interface TotalProps {
  birthDate: Date | null;
  basePrice: number | null;
  priceMatch: number | null;
  sidebarValues: {
    bonusProtection: boolean;
    ao: boolean;
    glassProtection: boolean;
  };
  vehiclePower: number | null;
  voucher: number | null;
  headerValues: {
    commercialDiscount: boolean;
    adviserDiscount: boolean;
    vipDiscount: boolean;
    carSurcharge: boolean;
  };
  setCoveragesChange: (value: Coverage) => void;
  setDiscountsChange: (value: Discounts) => void;
  onBasePriceChange: (value: number) => void;
  setPriceMatchChange: (value: number | null) => void;
}

const Total: React.FC<TotalProps> = ({
  birthDate,
  priceMatch,
  basePrice,
  sidebarValues,
  vehiclePower,
  voucher,
  headerValues,
  setCoveragesChange,
  setDiscountsChange,
  onBasePriceChange,
  setPriceMatchChange,
}) => {
  const [total, setTotal] = useState<number | null>(null);

  const fetchTotal = async () => {
    if (basePrice)
      try {
        const responseTotal = await getTotal({
          birthDate: birthDate,
          priceMatch: priceMatch,
          basePrice: basePrice,
          bonusProtection: sidebarValues.bonusProtection,
          ao: sidebarValues.ao,
          glassProtection: sidebarValues.glassProtection,
          vehiclePower: vehiclePower,
          voucher: voucher,
          commercialDiscount: headerValues.commercialDiscount,
          adviserDiscount: headerValues.adviserDiscount,
          vipDiscount: headerValues.vipDiscount,
          carSurcharge: headerValues.carSurcharge,
        });
        if (priceMatch !== null && priceMatch > 0) {
          console.log("what is happening boy");
          onBasePriceChange(responseTotal.basePrice);
          setPriceMatchChange(priceMatch);
        } else {
          console.log("what is happening boy");
          priceMatch = null;
        }

        setTotal(responseTotal.total);
        setCoveragesChange(responseTotal.allCovarages);
        setDiscountsChange(responseTotal.allDiscounts);
      } catch (error) {
        console.error("Error sending data:", error);
      }
  };
  console.log("Total");
  useEffect(() => {
    fetchTotal();
  }, [
    birthDate,
    sidebarValues,
    vehiclePower,
    voucher,
    headerValues,
    priceMatch,
    basePrice,
  ]);

  return (
    <div className="total-main">
      <h2>Total:</h2>
      <p className="total">
        {" "}
        <span>{total}</span> EUR
      </p>
    </div>
  );
};

export default Total;
