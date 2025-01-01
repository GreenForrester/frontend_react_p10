import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons, GridSlotProps
} from '@mui/x-data-grid';

import {CustomerService} from '../../../api/customers/CustomerService.ts';
import {CustomerDto} from '../../../api/customers/CustomerDto.ts';

//Extends ToolbarPropsOverrides to help switching rows to editable form
declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}

//Custom toolbar used within Datagrid for editing
function EditToolbar(props: GridSlotProps['toolbar']) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = `temp-id-${Date.now()}`;
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function CustomerGrid() {

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  //Loading the customer ROWS from database
  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
            setIsLoading(true);
            const data = await CustomerService.getAllCustomers(); // Assuming this returns the customer data
            const rowsWithId = data.map((customer:CustomerDto) => ({
              id: customer.customerId, // Map customerId to id
              ...customer,          // Spread the rest of the customer properties
            }));
            setRows(rowsWithId);
      } finally {
            setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Conditionally render the grid or a loading indicator
  if (isLoading) {
    return <p>Loading customers...</p>; 
  }

  //Different Handlers to perform crud operations
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  //MUI site template for col def
  const columns: GridColDef[] = [
  { field: 'customerId', headerName: 'Customer ID', width: 100, editable: false }, // Customer ID is usually not editable
  { field: 'customerName', headerName: 'Name', width: 180, editable: true },
  { field: 'cemail', headerName: 'Email', width: 220, editable: true },
  { field: 'phone', headerName: 'Phone', width: 150, editable: true },
  { field: 'address', headerName: 'Address', width: 200, editable: true },
  { field: 'city', headerName: 'City', width: 150, editable: true },
  { field: 'postalCode', headerName: 'Postal Code', width: 120, editable: true },
  { field: 'country', headerName: 'Country', width: 150, editable: true },
  {
    field: 'actions',
    type: 'actions',
    width: 100,
    headerName: 'Actions',
    cellClassName: 'actions',
    getActions: ({ id }) => {
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
