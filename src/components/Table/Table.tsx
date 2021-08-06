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
import { useMemo } from "react";

type TableProps<T> = {
  data: T[];
  children?: any;
};

const Table = <T,>({ data, children }: TableProps<T>) => {
  const _children = useMemo(() => children, [children]);
  const _data = useMemo(() => data, [data]);

  return (
    <ChakraUiTable
      size="sm"
      variant="simple"
      border="1px solid"
      borderColor="gray.300"
    >
      <Thead>
        <Tr>
          {React.Children.map(_children, (column) => (
            <Th key={column.key} borderColor="gray.300">
              {column.props.label}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {_data.map((item) => (
          <Tr key={nanoid()}>
            {React.Children.map(_children, (column) => (
              <Td key={column.key} borderColor="gray.300">
                {column.props.children(item)}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraUiTable>
  );
};

export default React.memo(Table) as typeof Table;
