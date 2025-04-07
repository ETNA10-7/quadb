import { PlugWallet } from "@plugnet/plug-wallet";

export const connectWallet = async (whitelist: string[], host: string): Promise<string | null> => {
  try {
    const plug = new PlugWallet();
    const isConnected = await plug.connect({ whitelist, host });

    if (isConnected) {
      const principal = plug.getPrincipal();
      console.log("Wallet connected:", principal);
      return principal;
    } else {
      console.warn("Failed to connect wallet.");
      return null;
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};
