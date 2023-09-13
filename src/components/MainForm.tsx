import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.module.css";
import DatePicker from "react-datepicker";
import useGetBasePrice from "../hooks/useGetBasePrice";
import { Coverage, Discounts } from "../interface/types";
import { saveUser } from "../api/services";

interface FormData {
  name: string;
  birthDate: Date | null;
  city: string;
  vehiclePower: number | null;
  voucher: number | null;
  priceMatch: number | null;
  basePrice: number | null;
}

interface RequestBody {
  birthDate: Date; // note that there is no null
  city: string;
}

type MainFormProps = {
  onBirthDateChange: (birthDate: Date) => void;
  onBasePriceChange: (basePrice: number) => void;
  onVehicalPowerChange: (vehiclePower: number | null) => void;
  onVoucherChange: (voucher: number | null) => void;
  onPriceMatchChange: (priceMatch: number | null) => void;
  coverages: Coverage | null;
  discounts: Discounts | null;
  priceMatch: number | null;
  basePrice: number | null;
};

const MainForm: React.FC<MainFormProps> = ({
  onBirthDateChange,
  onBasePriceChange,
  onVehicalPowerChange,
  onVoucherChange,
  onPriceMatchChange,
  coverages,
  discounts,
  priceMatch,
  basePrice,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthDate: null,
    city: "",
    vehiclePower: null,
    voucher: null,
    priceMatch: null,
    basePrice: null,
  });

  const {
    basePrice: fetchedBasePrice,
    isLoading,
    error,
    fetchBasePrice,
  } = useGetBasePrice();

  const citiesList = [
    "Zagreb",
    "Rijeka",
    "Split",
    "Osijek",
    "Dubrovnik",
    "Pula",
  ];

  useEffect(() => {
    if (typeof fetchedBasePrice === "number") {
      onBasePriceChange(fetchedBasePrice);
    }
  }, [priceMatch, fetchedBasePrice, onBasePriceChange]);

  useEffect(() => {
    console.log("somthing fishy");
    if (formData.birthDate && formData.city) {
      const requestData: RequestBody = {
        ...formData,
        birthDate: formData.birthDate,
        city: formData.city,
      };
      fetchBasePrice(requestData);
    }
  }, [
    formData.birthDate,
    formData.city,
    priceMatch,
    formData.vehiclePower,
    formData.voucher,
    formData.priceMatch,
    priceMatch,
    basePrice,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date,
    inputName?: string
  ) => {
    let name: string;
    let value: string | number | Date | null;

    if (e instanceof Date || e === null) {
      name = inputName!;
      value = e;
      onBirthDateChange(value);
    } else {
      name = e.target.name;
      value = e.target.value;
    }

    if (name === "vehiclePower") {
      value = Number(value);
      if (!isNaN(value) && value !== 0) {
        onVehicalPowerChange(value);
      } else {
        onVehicalPowerChange(null);
        value = null;
      }
    }
    if (name === "voucher") {
      value = Number(value);
      if (!isNaN(value) && value !== 0) {
        onVoucherChange(value);
      } else {
        onVoucherChange(null);
        value = null;
      }
    }
    if (name === "priceMatch") {
      value = Number(value);
      if (!isNaN(value) && value !== 0) {
        onPriceMatchChange(value);
      } else {
        onPriceMatchChange(null);
        value = null;
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalBasePrice = formData.priceMatch ? basePrice : fetchedBasePrice;
    //if price match has value we ignore fields (beacuse they are coonected to vehicle power and user age parameters):
    //Adviser Discount
    //VIP Discount
    //Car Surcharge
    //AO+
    //Glass Protection
    //and we set them to false
    const dataToSave = {
      name: formData.name,
      birthDate: formData.birthDate!,
      city: formData.city,
      vehiclePower: formData.vehiclePower!,
      basePrice: finalBasePrice,
      priceMatch: formData.priceMatch,
      ao: formData.priceMatch ? false : coverages?.ao || false,
      glassProtection: coverages?.glassProtection || false,
      bonusProtection: coverages?.bonusProtection || false,
      voucher: formData.voucher,
      commercialDiscount: discounts?.commercialDiscount || false,
      adviserDiscount: formData.priceMatch
        ? false
        : discounts?.adviserDiscount || false,
      vipDiscount: formData.priceMatch
        ? false
        : discounts?.vipDiscount || false,
      carSurcharge: formData.priceMatch
        ? false
        : discounts?.carSurcharge || false,
    };

    try {
      await saveUser(dataToSave);
      alert("user saved successfully");
    } catch (error) {
      alert("Error saving user");
    }
  };

  const formatKey = (key: string): string => {
    if (key === "ao") return "AO+";

    return key
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <div className="user-data">User Data:</div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <div className="datepicker-wrapper">
            <DatePicker
              selected={formData.birthDate}
              onChange={(date: Date) => handleChange(date, "birthDate")}
              dateFormat="dd.MM.yyyy"
              placeholderText="Choose a date"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={65} // 2014-1950+1
              minDate={new Date("1950-01-01")}
              maxDate={new Date("2003-12-31")}
              required
            />
          </div>
        </div>
        <div>
          <label>City:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">--Select City--</option>
            {citiesList.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Vehicle Power:</label>
          <input
            type="number"
            name="vehiclePower"
            value={formData.vehiclePower ?? ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Voucher:</label>
          <input
            type="number"
            name="voucher"
            value={formData.voucher ?? ""}
            onChange={handleChange}
            placeholder="EUR"
          />
        </div>
        <div>
          <label>Price match:</label>
          <input
            type="number"
            name="priceMatch"
            value={formData.priceMatch ?? ""}
            onChange={handleChange}
            placeholder="EUR"
          />
          {formData.priceMatch && (
            <p className="warning-text">
              *when a value is entered for Price Match, certain fields will be
              ignored:
              <div>
                Adviser Discount, VIP Discount, Car Surcharge, AO+, Glass
                Protection
              </div>
            </p>
          )}
        </div>

        <div>
          <button type="submit" disabled={isLoading}>
            Save
          </button>
        </div>
      </form>
      <div className="response">
        <div className="base-price">
          <strong>Base price: </strong>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>
              {basePrice !== null && basePrice !== 0
                ? `${basePrice} EUR`
                : fetchedBasePrice
                ? `${fetchedBasePrice} EUR`
                : "N/A"}
            </span>
          )}
        </div>

        <div>
          <strong>List of discounts:</strong>
          <div>
            {discounts ? (
              Object.values(discounts).every((val) => !val) ? (
                <div>No coverages available</div>
              ) : (
                Object.entries(discounts)
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <div className="list" key={key}>
                      {formatKey(key)}:{" "}
                      <span>{value ? `${value} EUR` : "EUR"}</span>
                    </div>
                  ))
              )
            ) : (
              <div>No coverages available</div>
            )}
          </div>
        </div>
        <div>
          <strong>List of coverages:</strong>
          <div>
            {coverages ? (
              Object.values(coverages).every((val) => !val) ? (
                <div>No coverages available</div>
              ) : (
                Object.entries(coverages)
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <div className="list" key={key}>
                      {formatKey(key)}:{" "}
                      <span>{value ? `${value} EUR` : "EUR"}</span>
                    </div>
                  ))
              )
            ) : (
              <div>No coverages available</div>
            )}
          </div>
        </div>
      </div>
      {error && <div>Error fetching base price: {error}</div>}
    </div>
  );
};

export default MainForm;
