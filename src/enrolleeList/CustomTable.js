import React, { useState } from 'react';
import { useTable } from 'react-table'
import Modal from 'react-modal';
import EditEnrollee from '../editEnrollee/EditEnrollee.js';

const CustomTable = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const data = React.useMemo(
    () => props.value,
    [props.value]
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        id:'active',
        Header: 'Status',
        accessor: d => String(d.active)
      },
      {
       Header: 'Name',
       accessor: 'name',
     },
     {
       Header: 'Date Of Birth',
       accessor: 'dateOfBirth',
     },
     {
      Header: 'Edit'
    },
    ],
    []
  )

  function editEnrollee(selectedCell) {
    setShowModal(true);
    setSelectedRowData(selectedCell);
    // console.log('editEnrollee', selectedCell);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data})

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (cell.column.Header === 'Edit') {
                   return <td
                   {...cell.getCellProps()}
                   style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}>
                    <button onClick={() => editEnrollee(row.values)}>
                      Edit
                    </button>

                    <Modal 
                      ariaHideApp={false}
                      isOpen={showModal}
                      contentLabel="Minimal Modal Example">
                      <EditEnrollee formData={selectedRowData} />
                      <button onClick={() => handleCloseModal()}>Close Modal</button>
                    </Modal>
                  </td> 
                } else {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CustomTable;