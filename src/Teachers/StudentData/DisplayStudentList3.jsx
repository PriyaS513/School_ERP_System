import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';




const columns = [
  { id: 'regid', label: 'Reg Id' },
  { id: 'rollNo', label: 'Roll No' },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'sclass',
    label: 'Class',
  },
  {
    id: 'actions',
    label: 'Actions',
  },
];

function createData(regid, rollNo, name, sclass) {
  return { regid, rollNo, name, sclass };
}

function StickyHeadTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sclass, setSclass] = useState(3); // default sclass
 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://school-erp-system-ufbu.onrender.com/Teachers/studentlist/?sclass=${sclass}`);
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [sclass]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    console.log(`Edit row: ${row.name}`);
    navigate(`/EditStudent/${row.regid}`, { state: row });
  };

  const handleDelete = (row) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch(`https://school-erp-system-ufbu.onrender.com/Teachers/studentdel/${row.regid}/`, {
              method: 'DELETE',
            })
              .then((response) => response.json())
              .then((data) => {
                const updatedRows = rows.filter((student) => student.regid !== row.regid);
                setRows(updatedRows);
                toast.success('Student deleted successfully!');
              })
              .catch((error) => {
                console.error(error);
                toast.error('Error deleting student!');
              });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div id="StudentList">
      <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-reg-no">Reg No: 123456789</p>
            <p className="student-reg-no">First</p>
          </div>
        </div>
      </div>
      <div className="home-button-container">
        <button
          className="home-button"
          onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage')}
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>

      <Paper sx={{ width: '90%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="head">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
  {rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.regid}>
          {columns.map((column) => {
            if (column.id === 'actions') {
              return (
                <TableCell key={column.id} align={column.align}>
                  <Button sx={{ color: 'green' }} onClick={() => handleEdit(row)}>
                    Edit
                  </Button>
                  <Button sx={{ color: 'red' }} onClick={() => handleDelete(row)}>
                    Delete
                  </Button>
                </TableCell>
              );
            }
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === 'number'
                  ? column.format(value)
                  : value}
              </TableCell>
            );
          })}
        </TableRow>
      );
    })}
</TableBody>
<TablePagination
  rowsPerPageOptions={[10, 25, 100]}
  component="div"
  count={rows.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
</Table>
</TableContainer>
</Paper>
<ToastContainer />
</div>
);
}

export default StickyHeadTable;