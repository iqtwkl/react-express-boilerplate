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
    return <p>No data available.</p>;
  }

  console.log(data); 
  return (
    <div className="rounded-[15px] bg-[#D0DEDF] p-2" style={{boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, 0.1)'}}>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              {columnConfig.map(column => (
                <Table.HeadCell 
                  key={column.accessor}
                  className="text-white text-center"
                  style={{
                    backgroundColor: '#629093',
                  }} 
                >{column.header}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y text-white text-center bg-[#99B7B9]">
              {data.map(item  => (
                <Row key={item.id} item={item} columns={columnConfig} />
              ))}
            </Table.Body>
          </Table>
        </div>
    </div>
    
  );
}

export default TableComponent;
