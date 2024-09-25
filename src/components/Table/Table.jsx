import React, { useState, useEffect } from 'react';
import { Table, Pagination, Spinner, Button, Modal, Form } from 'react-bootstrap';
import './Table.css';

const DataTable = ({ heading, data, loading, onEdit, onDelete, mongoId }) => {
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const rowsPerPage = 10;

  useEffect(() => {
    if (data && data.length > 0) {
      const idKey = mongoId; // Use the ID key passed as a prop
      const fetchedHeaders = Object.keys(data[0]).filter(header => header !== idKey);
      setHeaders(fetchedHeaders);
    }
  }, [data, mongoId]); // Ensure mongoId is included in the dependencies

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleEdit = (row) => {
    setEditData(row);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = (row) => {
    setDeleteRowData(row);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(deleteRowData);
    setShowDeleteConfirm(false);
  };

  const handleSaveChanges = () => {
    setShowSaveConfirm(true);
  };

  const confirmSaveChanges = () => {
    onEdit(editData);
    setShowSaveConfirm(false);
    setShowEditModal(false);
  };

  return (
    <div className="main-content">
      <div className="position-relative custom-page">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between pb-0 border-0">
              <div className="header-title">
                <h4 className="card-title">{heading}</h4>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                {loading ? (
                  <Spinner animation="border" />
                ) : data.length === 0 ? (
                  <Spinner animation="border" />
                ) : (
                  <>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          {headers.map((header) => (
                            <th key={header}>{header}</th>
                          ))}
                          <th>Manage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {headers.map((header) => (
                              <td key={header}>
                                {Array.isArray(row[header])
                                  ? row[header].join(', ')
                                  : row[header]}
                              </td>
                            ))}
                            <td>
                              <Button variant="warning" onClick={() => handleEdit(row)}>
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                style={{ marginLeft: '2px' }}
                                onClick={() => handleDelete(row)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination>
                      {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                          key={index}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {headers.map((header) => (
              <Form.Group key={header} controlId={header}>
                <Form.Label>{header}</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={editData ? editData[header] : ''}
                  readOnly={header === mongoId} // Make the mongoId field read-only
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Save Changes Confirmation Modal */}
      <Modal show={showSaveConfirm} onHide={() => setShowSaveConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to save the changes?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmSaveChanges}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataTable;
