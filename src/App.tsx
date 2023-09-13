import React, { useState } from "react";
import "./App.css";
import MainForm from "./components/MainForm";
import Header from "./components/Header";
import Total from "./components/Total";
import Sidebar from "./components/Sidebar";
import { Coverage, Discounts } from "./interface/types";

const App: React.FC = () => {
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [vehiclePower, setVehiclePower] = useState<number | null>(null);
  const [voucher, setVoucher] = useState<number | null>(null);
  const [priceMatch, setPriceMatch] = useState<number | null>(null);
  const [sidebarValues, setSidebarValues] = useState({
    bonusProtection: false,
    ao: false,
    glassProtection: false,
  });
  const [headerValues, setHeaderValues] = useState({
    commercialDiscount: false,
    adviserDiscount: false,
    vipDiscount: false,
    carSurcharge: true,
  });
  const [coverages, setCoverages] = useState<Coverage | null>(null);
  const [discounts, setDiscounts] = useState<Discounts | null>(null);

  const handleSidebarChanges = (name: string, value: boolean) => {
    setSidebarValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHeaderChanges = (name: string, value: boolean) => {
    setHeaderValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <div className="header">
        <Header
          values={headerValues}
          handleChange={handleHeaderChanges}
          vehiclePower={vehiclePower}
        />
        <Total
          birthDate={birthDate}
          basePrice={basePrice}
          sidebarValues={sidebarValues}
          vehiclePower={vehiclePower}
          voucher={voucher}
          headerValues={headerValues}
          setCoveragesChange={setCoverages}
          setDiscountsChange={setDiscounts}
          onBasePriceChange={setBasePrice}
          priceMatch={priceMatch}
          setPriceMatchChange={setPriceMatch}
        />
      </div>
      <div className="mainform-sidebar">
        <div>
          <MainForm
            onBirthDateChange={setBirthDate}
            onBasePriceChange={setBasePrice}
            onVehicalPowerChange={setVehiclePower}
            onVoucherChange={setVoucher}
            onPriceMatchChange={setPriceMatch}
            coverages={coverages}
            discounts={discounts}
            priceMatch={priceMatch}
            basePrice={basePrice}
          />
          <Total
            birthDate={birthDate}
            basePrice={basePrice}
            sidebarValues={sidebarValues}
            vehiclePower={vehiclePower}
            voucher={voucher}
            headerValues={headerValues}
            setCoveragesChange={setCoverages}
            setDiscountsChange={setDiscounts}
            onBasePriceChange={setBasePrice}
            priceMatch={priceMatch}
            setPriceMatchChange={setPriceMatch}
          />
        </div>
        <div>
          <Sidebar
            sidebarValues={sidebarValues}
            handleChange={handleSidebarChanges}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
