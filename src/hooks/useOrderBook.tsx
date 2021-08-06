import { useEffect, useRef, useState } from "react";
import { Action } from "types/Actions";
import { Order } from "types/Order";
import { TradingPair } from "types/TradingPair";
import {
  tradingOrderBookLimitedProxy,
  tradingOrderBookSubscribePublic,
} from "utils/subscriptionAction";
import { w3cwebsocket as W3CWebSocket } from "websocket";

type Orders = { buy: Order[]; sell: Order[] };

const useOrderBook = () => {
  const [activeTradingPair, setActiveTradingPair] = useState<TradingPair>(
    TradingPair.btcPln
  );
  const [orders, setOrders] = useState<Orders>({ buy: [], sell: [] });
  const webSocket = useRef<W3CWebSocket | null>(null);

  useEffect(() => {
    webSocket.current = new W3CWebSocket(process.env.REACT_APP_WS_URL!);

    webSocket.current.onopen = () => {
      webSocket.current?.send(
        tradingOrderBookSubscribePublic(activeTradingPair)
      );
      webSocket.current?.send(tradingOrderBookLimitedProxy(activeTradingPair));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!webSocket.current) {
      return;
    }

    webSocket.current.onmessage = (message) => {
      const data = JSON.parse(message.data as string);

      if (data?.action === Action.proxyResponse) {
        setOrders({ buy: data.body.buy || [], sell: data.body.sell || [] });
      }

      if (data?.action === Action.push) {
        webSocket.current?.send(
          tradingOrderBookLimitedProxy(activeTradingPair)
        );
      }
    };
  }, [activeTradingPair]);

  return {
    webSocket,
    activeTradingPair,
    setActiveTradingPair,
    orders,
    setOrders,
  };
};

export default useOrderBook;
