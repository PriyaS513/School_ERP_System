import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import img from '../Images/student1.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const columns = [
  
  { id: 'id', label: 'Id' },
  { id: 'title', label: 'Title' },
  {
    id: 'content',
    label: 'Content',
  },
  {
    id: 'image',
    label: 'Image',
  },
  {
    id: 'actions',
    label: 'Actions',
  },
];

function createData(id, title, content, image) {
  return { id, title, content, image };
}

const rows = [
  createData('S0121212', 'A', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'B', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'C', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'D', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'E', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'F', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'G', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'H', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'I', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'J', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'K', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'L', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'M', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'N', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'O', 'AAAA', 'https://via.placeholder.com/50'),
  createData('S0121212', 'P', 'AAAA', 'https://via.placeholder.com/50'),
];

function StickyHeadTable() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleEdit = (row) => {
    console.log(`Edit row: ${row.title}`);
  };

  const handleDelete = (row) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log(`Delete row: ${row.name}`);
            // Add delete logic here
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Add logout logic here
    toast.success('Logout Successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };
  return (
    <div id="AchievementList" onClick={handleOutsideClick}>
      <div className="student-info-container">
       <div className="student-navbar">
        <div className="student-details">
          <h2 className="student-name">John Doe</h2>
          <p className="student-reg-no">Reg No: 123456789</p>
          <p className="student-reg-no">Teacher</p>
        </div>
        <div className="student-photo-container">
        <img
              src={img}
              alt="Student"
              className="student-photo"
              onClick={handlePhotoClick}
            />
            {showDropdown && (
              <div
                className="dropdown-menu">
                <ul>
                  <li>
                    <a >John Doe</a>
                  </li>
                  <li>
                    <a >Reg No: 123456789</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
      </div>
      </div>
      {/* < div className="format"> */}
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/Teacherprofile/Achivementpage')}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
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
                  const isSelected = selected.indexOf(row.id)!== -1;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected}
                    >
                     
                      {columns.map((column) => {
                        if (column.id === 'image') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img src={row[column.id]} alt={row.title} width="50" height="50" />
                            </TableCell>
                          );
                        } else if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button sx={{ color: 'red' }} onClick={() => handleDelete(row)}>Delete</Button>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row[column.id]}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer />
    </div>
  );
}

export default StickyHeadTable;