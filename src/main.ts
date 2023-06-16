import "./style.css";
import {
  createConfig,
  configureChains,
  mainnet,
  connect,
  disconnect,
  watchAccount,
  createStorage,
  noopStorage
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
  connectors:[injectedConnector],
  publicClient,
  webSocketPublicClient,
});
// Standard connect button
document
  .querySelector<HTMLButtonElement>("#connect")!
  .addEventListener("click", () => {
    connect({ connector: injectedConnector });
  });

// Workaround - create Storage if connector is not passed through createConfig
const connectorWithoutStorage = new InjectedConnector()

connectorWithoutStorage.setStorage(createStorage({
  storage: typeof window !== 'undefined' ? window.localStorage : noopStorage,
}))
document
  .querySelector<HTMLButtonElement>("#connect-workaround")!
  .addEventListener("click", async () => {
    await connect({ connector: connectorWithoutStorage });
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
