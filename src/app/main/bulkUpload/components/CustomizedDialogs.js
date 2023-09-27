import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';

class CustomizedDialogs extends Component {
    render() {
        const { state, closeDialog } = this.props;
        console.log('All state', this.props);
        const customDialog = {
            backgroundColor: '#f0f0f0',
            padding: '20px',
        };
        return (
            <div>
                <Dialog
                    open={state.form.openDialog}
                    onClose={closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`${state.form.selectedFile && state.form.selectedFile.name} Preview`}
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: '#fff', padding: '20px' }}>
                        <DialogContentText id="alert-dialog-description">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {state.form.csvContent
                                            ? state.form.csvContent[0].map((cell, index) => (
                                                  <TableCell key={index}>
                                                      <h3>{cell}</h3>
                                                  </TableCell>
                                              ))
                                            : ''}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.form.csvContent
                                        ? state.form.csvContent.slice(1).map((row, rowIndex) => (
                                              <TableRow
                                                  key={rowIndex}
                                                  style={{ backgroundColor: 'white' }}
                                              >
                                                  {row.map((cell, cellIndex) => (
                                                      <TableCell
                                                          key={cellIndex}
                                                          style={{ backgroundColor: 'white' }}
                                                      >
                                                          {cell}
                                                      </TableCell>
                                                  ))}
                                              </TableRow>
                                          ))
                                        : ''}
                                </TableBody>
                            </Table>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomizedDialogs;
