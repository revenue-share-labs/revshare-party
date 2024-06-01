import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RevenuePartyModule = buildModule("RevenueHouseModule", (m) => {
  const revenueParty = m.contract("RevenueHouse");

  return { revenueParty };
});

export default RevenuePartyModule;
