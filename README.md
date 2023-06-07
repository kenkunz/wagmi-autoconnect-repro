# wagmi-autoconnect-repro

This is a minimal reproduction of a `wagmi/core` auto-connect bug. This bug seems to exist on all `1.x` versions as of `1.1.0`.

This is implemented as a vanilla [Vite](https://vitejs.dev/) project.

## Dependencies

1. Node.js version 14.18+, 16+ (as required by Vite)
2. A browser-injected crypto wallet like MetaMask

## Setup

1. clone this repo
2. run `npm i`
3. run `npm run dev`
4. open [`http://localhost:5173/`](http://localhost:5173/) in a browser

## Steps to reproduce

1. Click "Connect Wallet" button
2. Connect your browser-injected wallet
3. Note the **Status** and **Address** values are updated
4. Refesh the page
   - **expected:** wallet automatically reconnects
   - **actual:** wallet is disconnected
5. Click "Disconnect" (calls wagmi `disconnect` and clears `localStorage`)
6. Click "Connect with workaround"
7. Note the **Status** and **Address** values are updated
8. Refresh the page
9. Note the the wallet is automatically reconnected
