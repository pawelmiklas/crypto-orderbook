import { TradingPair } from "types/TradingPair";

const tradingOrderBookLimitedProxy = (tradingPair: TradingPair) =>
  JSON.stringify({
    requestId: "78539fe0-e9b0-4e4e-8c86-70b36aa93d4f",
    action: "proxy",
    module: "trading",
    path: `orderbook-limited/${tradingPair}/10`,
  });

const tradingOrderBookSubscribePublic = (tradingPair: TradingPair) =>
  JSON.stringify({
    action: "subscribe-public",
    module: "trading",
    path: `orderbook/${tradingPair}`,
  });

const tradingOrderBookUnsubscribe = (tradingPair: TradingPair) =>
  JSON.stringify({
    action: "unsubscribe",
    module: "trading",
    path: `orderbook/${tradingPair}`,
  });

export {
  tradingOrderBookLimitedProxy,
  tradingOrderBookSubscribePublic,
  tradingOrderBookUnsubscribe,
};
