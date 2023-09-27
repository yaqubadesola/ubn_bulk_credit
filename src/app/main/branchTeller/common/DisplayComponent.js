import React, { Fragment } from 'react';
import { Button, MenuItem, TextField, Typography } from "@material-ui/core";
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
export const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[800],
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
}))(Button);



export const renderText = ({ type, label, color, ...rest }) => (
  <Typography variant={type} color={color} {...rest}>
    {label}
  </Typography>
);

export const renderInputField = ({ name, label, type, state, onChange, InputProps,multiLine, disabled }) => {
  const { form, errors } = state;
  return (
    <TextField
      label={label}
      type={type ? type : "text"}
      variant='outlined'
      color='primary'
      size='large'
      autoFocus
      multiline
      rows={multiLine}
      fullWidth={true}
      name={name}
      value={form[name]}
      disabled={disabled}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      onChange={onChange}
      style={{
                    maxHeight: "100px",
                    minHeight: "50px"
                  }}
    />
  );
};
export const renderSelect = ({ name, label, options, state, onChange }) => {
  const { form, errors } = state;
  return (
    <TextField
      select
      style={{
          maxHeight: "100px",
          minHeight: "70px",
          height:"50px"
        }}
      label={label}
      variant='outlined'
      color='primary'
      size='large'
      fullWidth={true}
      name={name}
      value={form[name]}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      onChange={onChange}>
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.key}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const renderButton = ({ label, variant, color, fullWidth, custom, onClick, disabled }) => (
  custom ? <ColorButton
            style={{
                    maxHeight: "70px",
                    minHeight: "50px",
                    color:"#fff"
                  }}
              variant={variant ? variant : "outlined"}
              color={color ? color : "primary"}
              fullWidth={fullWidth ? fullWidth : false}
              onClick={onClick}
              size='large'
              sx={{ height: '75%' }}
              disabled={disabled}
            >
          
          {label}
        </ColorButton>

  :
  <Button
        style={{              
            maxHeight: "70px",
            minHeight: "50px",
          }}
  size='large'
   sx={{ height: '75%' }}
    variant={variant ? variant : "outlined"}
    color={color ? color : "primary"}
    fullWidth={fullWidth ? fullWidth : false}
    onClick={onClick}
    >
    {label}
  </Button>
);
