import React from "react";

interface SidebarProps {
  sidebarValues: {
    bonusProtection: boolean;
    ao: boolean;
    glassProtection: boolean;
  };
  handleChange: (name: string, value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarValues, handleChange }) => {
  return (
    <div className="sidebar">
      <div className="coverages">Coverages</div>
      <div>
        <input
          type="checkbox"
          checked={sidebarValues.bonusProtection}
          onChange={() =>
            handleChange("bonusProtection", !sidebarValues.bonusProtection)
          }
        />
        <label>Bonus Protection</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={sidebarValues.ao}
          onChange={() => handleChange("ao", !sidebarValues.ao)}
        />
        <label>AO+</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={sidebarValues.glassProtection}
          onChange={() =>
            handleChange("glassProtection", !sidebarValues.glassProtection)
          }
        />
        <label>Glass Protection</label>
      </div>
    </div>
  );
};

export default Sidebar;
