import "./style.css";
import {
  createConfig,
  configureChains,
  mainnet,
  connect,
  disconnect,
  watchAccount,
} from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";
import { InjectedConnector } from "@wagmi/core/connectors/injected";

// Configure wagmi
const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const injectedConnector = new InjectedConnector()
createConfig({
  autoConnect: true,
  connectors: [injectedConnector],
  publicClient,
  webSocketPublicClient,
});
// Standard connect button
document
  .querySelector<HTMLButtonElement>("#connect")!
  .addEventListener("click", () => {
    connect({ connector: injectedConnector });
  });

// Workaround - manually set wagmi.injected.shimDisconnect key
document
  .querySelector<HTMLButtonElement>("#connect-workaround")!
  .addEventListener("click", async () => {
    await connect({ connector: new InjectedConnector() });
    localStorage.setItem("wagmi.injected.shimDisconnect", "true");
  });

// Disconnect and clear localStorage
document
  .querySelector<HTMLButtonElement>("#disconnect")!
  .addEventListener("click", async () => {
    await disconnect();
    localStorage.clear();
  });

// Watch account and display status/address
const statusEl = document.querySelector<HTMLSpanElement>("#status")!;
const addressEl = document.querySelector<HTMLSpanElement>("#address")!;
watchAccount(({ address, status }) => {
  statusEl.innerHTML = status;
  addressEl.innerHTML = address ?? "n/a";
});
