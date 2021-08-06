import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import Heading from "components/Heading/Heading";
import useOrderBook from "hooks/useOrderBook";
import React, { useCallback } from "react";
import { TradingPair } from "types/TradingPair";
import {
  tradingOrderBookLimitedProxy,
  tradingOrderBookSubscribePublic,
  tradingOrderBookUnsubscribe,
} from "utils/subscriptionAction";
import OrderTable from "./components/OrderTable";

const Home = () => {
  const { webSocket, activeTradingPair, setActiveTradingPair, orders } =
    useOrderBook();

  const onTradingPairChange = useCallback(
    (e) => {
      const currentPair = e.target.value as TradingPair;

      webSocket.current?.send(tradingOrderBookUnsubscribe(activeTradingPair));
      webSocket.current?.send(tradingOrderBookSubscribePublic(currentPair));
      webSocket.current?.send(tradingOrderBookLimitedProxy(currentPair));

      if (activeTradingPair !== currentPair) {
        setActiveTradingPair(currentPair);
      }
    },
    [activeTradingPair, setActiveTradingPair, webSocket]
  );

  return (
    <Box>
      <Container maxW="container.xl">
        <Heading value={activeTradingPair} onChange={onTradingPairChange} />
        <SimpleGrid columns={2} spacing="24px">
          <OrderTable data={orders.buy} tradingPair={activeTradingPair} />
          <OrderTable data={orders.sell} tradingPair={activeTradingPair} />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;
