import React from "react";

interface HeaderProps {
  values: {
    commercialDiscount: boolean;
    adviserDiscount: boolean;
    vipDiscount: boolean;
    carSurcharge: boolean;
  };
  handleChange: (name: string, value: boolean) => void;
  vehiclePower: number | null;
}

const Header: React.FC<HeaderProps> = ({
  values,
  handleChange,
  vehiclePower,
}) => {
  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={values.commercialDiscount}
          onChange={() =>
            handleChange("commercialDiscount", !values.commercialDiscount)
          }
        />
        <label>Commercial Discount</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={values.adviserDiscount}
          onChange={() =>
            handleChange("adviserDiscount", !values.adviserDiscount)
          }
        />
        <label>Adviser Discount</label>
      </div>
      {vehiclePower && vehiclePower > 80 && (
        <div>
          <input
            type="checkbox"
            checked={values.vipDiscount}
            onChange={() => handleChange("vipDiscount", !values.vipDiscount)}
          />
          <label>VIP Discount</label>
        </div>
      )}
      <div>
        <input
          type="checkbox"
          checked={values.carSurcharge}
          onChange={() => handleChange("carSurcharge", !values.carSurcharge)}
          disabled
        />
        <label>Car Surcharge</label>
      </div>
    </div>
  );
};

export default Header;
