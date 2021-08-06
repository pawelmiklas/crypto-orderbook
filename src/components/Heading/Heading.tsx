import {
  Box,
  Select,
  Stack,
  Stat,
  StatArrow,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import NumberFormat from "react-number-format";
import { TradingPair } from "types/TradingPair";

type HeadingProps = {
  value: TradingPair;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  min: number;
  max: number;
};

const Heading = ({ value, min, max, onChange }: HeadingProps) => {
  const spread = (max - min).toFixed(2);
  const currency = value.split("-")[1].toUpperCase();

  return (
    <Stack
      pb="4"
      spacing="16px"
      width="100%"
      justifyContent="space-between"
      alignItems={{ base: "flex-start", md: "center" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box>
        <Select value={value} placeholder="Wybierz parę" onChange={onChange}>
          {Object.values(TradingPair).map((pair) => (
            <option key={pair} value={pair}>
              {pair.toUpperCase()}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Stat>
          <StatLabel>Spread</StatLabel>
          <StatNumber>
            <NumberFormat value={spread} displayType="text" suffix={currency} />
          </StatNumber>
        </Stat>
      </Box>
      <Stack spacing="16px" direction="row">
        <Stat>
          <StatLabel>
            <StatArrow type="increase" mx="2" />
            24h
          </StatLabel>
          <StatNumber>
            <NumberFormat
              value={max.toFixed(2)}
              displayType="text"
              decimalScale={2}
              suffix={currency}
            />
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>
            <StatArrow type="decrease" mx="2" />
            24h
          </StatLabel>
          <StatNumber>
            <NumberFormat
              value={min.toFixed(2)}
              displayType="text"
              decimalScale={2}
              suffix={currency}
            />
          </StatNumber>
        </Stat>
      </Stack>
    </Stack>
  );
};

export default Heading;
