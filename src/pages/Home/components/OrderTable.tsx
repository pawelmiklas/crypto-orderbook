import Big from "big.js";
import Table from "components/Table/Table";
import TableColumn from "components/TableColumn/TableColumn";
import React, { useMemo } from "react";
import { Order } from "types/Order";
import { TradingPair } from "types/TradingPair";

type OrderTableProps = {
  data: Order[];
  tradingPair: TradingPair;
};

const OrderTable = React.memo(({ data, tradingPair }: OrderTableProps) => {
  const [amount, price] = useMemo(() => tradingPair.split("-"), [tradingPair]);

  return (
    <Table data={data}>
      <TableColumn<Order> key="buyBid" label="Kupno">
        {({ ra }) => Number(ra).toFixed(2)}
      </TableColumn>
      <TableColumn<Order> key="buyAmount" label={`Ilość ${amount}`}>
        {({ ca }) => Number(ca).toFixed(8)}
      </TableColumn>
      <TableColumn<Order> key="buyPrice" label={`Cena ${price}`}>
        {({ ca, ra }) => {
          const caValue = new Big(ca);
          const raValue = new Big(ra);

          return caValue.times(raValue).toFixed(8);
        }}
      </TableColumn>
      <TableColumn<Order> key="buyOffers" label="Liczba ofert">
        {({ co }) => co}
      </TableColumn>
    </Table>
  );
});

export default OrderTable;
