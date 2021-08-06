import { Flex, Select } from "@chakra-ui/react";
import React from "react";
import { TradingPair } from "types/TradingPair";

type HeadingProps = {
  value: TradingPair;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const Heading = ({ value, onChange }: HeadingProps) => (
  <Flex py="4" maxW="250px">
    <Select value={value} placeholder="Wybierz parę" onChange={onChange}>
      {Object.values(TradingPair).map((pair) => (
        <option key={pair} value={pair}>
          {pair.toUpperCase()}
        </option>
      ))}
    </Select>
  </Flex>
);

export default Heading;
