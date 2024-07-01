import { Table } from "flowbite-react";

interface IMapper {
  header: string,
  accessor?: string,
  asIs?: boolean,
  body?: (obj: any) => void,
}

export interface ITableProps {
    columnConfig: IMapper[],
    data: any[],
}

const TableComponent = (props: ITableProps) => {
  const {
    columnConfig,
    data,
  } = props;

  const Row: React.FC<{ item: any; columns: IMapper[] }> = ({ item, columns }) => {
    return (
      <Table.Row key={item.id}>
        {columns.map((column, index) => (
          <Table.Cell key={column.accessor} className={index == 0 ? 'whitespace-nowrap font-medium text-gray-900 dark:text-white' : '' }>
            
            { column.asIs ? (column.body ? column.body(item) : '') : ( column.accessor ? item[column.accessor] : '' ) }
          </Table.Cell>
        ))}
      </Table.Row>
    );
  };

  if (data === undefined || !data || data.length === 0) {
    console.log('masuk sini');
    return <p>No data available.</p>;
  }

  console.log(data); 
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          {columnConfig.map(column => (
            <Table.HeadCell key={column.accessor}>{column.header}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map(item  => (
            <Row key={item.id} item={item} columns={columnConfig} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default TableComponent;
