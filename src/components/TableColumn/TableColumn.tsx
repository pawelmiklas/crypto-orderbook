import { ReactNode } from "react";

type TableColumnProps<T> = {
  children: (data: T) => ReactNode;
  label?: string;
};

const TableColumn = <T,>(_: TableColumnProps<T>) => null;

export default TableColumn;
