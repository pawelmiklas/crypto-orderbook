import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Heading from "components/Heading/Heading";
import useOrderBook from "hooks/useOrderBook";
import React, { useCallback } from "react";
import { TradingPair } from "types/TradingPair";
import {
  tradingOrderBookLimitedProxy,
  tradingOrderBookSubscribePublic,
  tradingOrderBookUnsubscribe,
  tradingStatsProxy,
  tradingStatsSubscribePublic,
  tradingStatsUnSubscribePublic,
} from "utils/subscriptionAction";
import OrderTable from "./components/OrderTable";

const Home = () => {
  const { webSocket, activeTradingPair, setActiveTradingPair, orders, stats } =
    useOrderBook();

  const onTradingPairChange = useCallback(
    (e) => {
      const currentPair = e.target.value as TradingPair;

      webSocket.current?.send(tradingOrderBookUnsubscribe(activeTradingPair));
      webSocket.current?.send(tradingStatsUnSubscribePublic(activeTradingPair));

      webSocket.current?.send(tradingOrderBookSubscribePublic(currentPair));
      webSocket.current?.send(tradingOrderBookLimitedProxy(currentPair));

      webSocket.current?.send(tradingStatsSubscribePublic(currentPair));
      webSocket.current?.send(tradingStatsProxy(currentPair));

      if (activeTradingPair !== currentPair) {
        setActiveTradingPair(currentPair);
      }
    },
    [activeTradingPair, setActiveTradingPair, webSocket]
  );

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      minH="1000px"
      color="gray.600"
    >
      <Container maxW="container.xl" bgColor="#F5F5F5" p="6" minH="500px">
        <Heading
          value={activeTradingPair}
          onChange={onTradingPairChange}
          min={Number(stats?.l)}
          max={Number(stats?.h)}
        />
        <SimpleGrid minChildWidth="500px" spacing="24px">
          <Box>
            <Text
              textAlign="center"
              color="green.500"
              fontSize="lg"
              fontWeight="bold"
              py="2"
            >
              Bid
            </Text>
            <OrderTable data={orders.buy} tradingPair={activeTradingPair} />
          </Box>
          <Box>
            <Text
              textAlign="center"
              color="red.500"
              fontSize="lg"
              fontWeight="bold"
              py="2"
            >
              Ask
            </Text>
            <OrderTable data={orders.sell} tradingPair={activeTradingPair} />
          </Box>
        </SimpleGrid>
      </Container>
    </Flex>
  );
};

export default Home;
