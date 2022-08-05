import React, { useState } from 'react';
import { Form, Table } from "react-bootstrap";
import { PencilFill, Save, Trash, XSquare } from 'react-bootstrap-icons';
import './EditTable.css';

const ConsoleLog = ({ children }) => {
  console.log(children);
  return false;
};


const EditableTable = ({ columns, rows, actions }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
  const [rowsState, setRowsState] = useState(rows);
  const [editedRow, setEditedRow] = useState();

  const handleEdit = (rowID) => {
    setIsEditMode(true);
    setEditedRow(undefined);
    setRowIDToEdit(rowID);
  }

  const handleRemoveRow = (rowID) => {
    const newData = rowsState.filter(row => {
      return row.id !== rowID ? row : null
    });

    setRowsState(newData);
  }

  const handleOnChangeField = (e, rowID) => {
    const { name: fieldName, value } = e.target;

    setEditedRow({
      id: rowID,
      [fieldName]: value
    })
  }


  // let incomeDay = (btcDay * price).toFixed(2);
  // let incomeMonth = (incomeDay * 30).toFixed(2);
  // let energyCost = (watt * price_kwt * 720).toFixed(2);
  // let profit = (incomeMonth - energyCost).toFixed(2);
  // let amount = 1;
  // let sum = profit * amount ;


  const handleCancelEditing = () => {
    setIsEditMode(false);
    setEditedRow(undefined);
  }

  const handleSaveRowChanges = () => {
    setTimeout(() => {
      setIsEditMode(false);


  
      const newData = rowsState.map(row => {
        if (row.id === editedRow.id) {
          if (editedRow.model) row.model = editedRow.model;
          if (editedRow.terahash) row.terahash = editedRow.terahash;
          if (editedRow.kwt) row.kwt = editedRow.kwt;
        }
        // { id: 1, model: 'Asic_S9j', terahash: '10.2', kwt: '0.939', price_kwt: '4', price_asic: '15000'},

        return row;
      })
    
      setRowsState(newData);
      setEditedRow(undefined)
    }, 1000)
  }

  const btcDay = (row) => {
    const newData = (0.000005 * row.terahash).toFixed(6);

    return newData;
  }
 
  return (
 
   
    <Table striped bordered hover>
   <ConsoleLog>{ btcDay }</ConsoleLog>
      <thead>
      <tr>
        {columns.map((column) => {
          return <th key={column.field}>{ column.fieldName }</th>
        })}
      </tr>
      </thead>
      <tbody>
      {rowsState.map((row) => {
        return <tr key={row.id}>
          <td>
            {row.id}
          </td>
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control
                type='text'
                defaultValue={editedRow ? editedRow.model : row.model}
                id={row.id}
                name='model'
                onChange={ (e) => handleOnChangeField(e, row.id) }
              />
              : row.model
            }
          </td>
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control
                type='text'
                defaultValue={editedRow ? editedRow.terahash : row.terahash}
                id={row.id}
                name='terahash'
                onChange={ (e) => handleOnChangeField(e, row.id) }
              />
              : row.terahash
              
            }
      
          </td>
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control onChange={e => handleOnChangeField(e, row.id)} name="kwt" defaultValue={row.kwt}>
                
              </Form.Control>
              : row.kwt
            }
          </td>

          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control onChange={e => handleOnChangeField(e, row.id)} name="price_kwt" defaultValue={row.price_kwt}>
                
              </Form.Control>
              : row.price_kwt
            }
          </td>

          
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control onChange={e => handleOnChangeField(e, row.id)} name="profit" defaultValue={row.price_kwt}>
                
              </Form.Control>
              : row.price_kwt
            }
          </td>
          
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control onChange={e => handleOnChangeField(e, row.id)} name="price_kwt" defaultValue={row.price_kwt}>
                
              </Form.Control>
              : row.price_kwt
            }
          </td>

          <td>
       
          {rows.map((row) => {
          return <th key={row.terahash}>{ btcDay }</th>
        })}
       {/* {btcDay} */}

          </td>


          {actions &&
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <button onClick={ () => handleSaveRowChanges() } className='custom-table__action-btn' disabled={!editedRow}>
                <Save />
              </button>
              : <button  onClick={ () => handleEdit(row.id) } className='custom-table__action-btn'>
                <PencilFill />
              </button>
            }

          
          </td>
          }
        </tr>
      })}
      </tbody>
    </Table>
  );
  
};

export default EditableTable;