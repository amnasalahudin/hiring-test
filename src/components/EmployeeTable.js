import React from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { Table, Form, Button, Image } from 'react-bootstrap';

const EmployeeTable = ({ data = [] }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'Hiring_TestID' },
      { 
        Header: 'Profile Picture', 
        accessor: 'profilePicture',
        Cell: ({ cell: { value } }) => (
          value ? <Image src={value} roundedCircle height={50} /> : 'N/A'
        )
      },
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone Number', accessor: 'phoneNumber' },
      { Header: 'City', accessor: 'city' },
      { Header: 'Country', accessor: 'country' },
      { Header: 'Created At', accessor: 'createdAt' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <Form.Control
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="mb-3"
      />
      <Table {...getTableProps()} striped bordered hover>
        <thead className="table-dark">
          {headerGroups.map((headerGroup, headerGroupIndex) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column, columnIndex) => {
                  const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                  return (
                    <th key={columnKey} {...restColumnProps}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell, cellIndex) => {
                  const { key: cellKey, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={cellKey} {...restCellProps}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
    </>
  );
};

export default EmployeeTable;
