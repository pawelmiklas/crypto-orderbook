import {
  Table as ChakraUiTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { nanoid } from "nanoid";

type TableProps<T> = {
  data: T[];
  children?: any;
};

const Table = <T,>({ data, children }: TableProps<T>) => (
  <ChakraUiTable size="sm">
    <Thead>
      <Tr>
        {React.Children.map(children, (column) => (
          <Th key={column.key}>{column.props.label}</Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {data.map((item) => (
        <Tr key={nanoid()}>
          {React.Children.map(children, (column) => (
            <Td key={column.key}>{column.props.children(item)}</Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  </ChakraUiTable>
);

export default Table;
