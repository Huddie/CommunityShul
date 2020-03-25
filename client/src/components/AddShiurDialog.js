import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

const initialShiur = {
  date: new Date(),
  title: '',
  lecturer: '',
  institution: '',
  link: '',
  source: '',
}

const AddShiurDialog = props => {

  const [shiur, setShiur] = useState(initialShiur)
  const { addShiurHandler } = props
  const [open, setOpen] = React.useState(false)

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  })

  const handleSwitchChange = name => event => {
    setSwitchState({ ...switchState, [name]: event.target.checked })
  }

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    resetSwitch()
  }

  const handleAdd = event => {
    addShiurHandler(shiur)
    setShiur(initialShiur)
    switchState.addMultiple ? setOpen(true) : setOpen(false)
  }

  const handleChange = name => ({ target: { value } }) => {
    setShiur({ ...shiur, [name]: value })
  }

  const handleDateChange = name => ({date: value}) => {
    setShiur({ ...shiur, [name]: value })
  }

  function ValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
      return false;
    } else {
      return true;
    }
  }

  function ValidWithFix(str) {
    if (ValidURL(str)) return true;
    var new_str = "https://" + str;
    if (ValidURL(new_str)) return true;
    return false;
  }

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Shiur</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out all fields to add a new shiur</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            required
            value={shiur.title}
            onChange={handleChange('title')}
          />          
          <TextField
            margin="dense"
            label="Speaker"
            type="text"
            fullWidth
            required
            value={shiur.lecturer}
            onChange={handleChange('lecturer')}
          />
          <TextField
            margin="dense"
            label="Institution"
            type="text"
            fullWidth
            required
            value={shiur.institution}
            onChange={handleChange('institution')}
          />
          <TextField
            margin="dense"
            label="Link"
            type="text"
            placeholder="http(s)://www.example.com"
            fullWidth
            required
            value={shiur.link}
            onChange={handleChange('link')}
          />
          <TextField
            margin="dense"
            label="Sources Link"
            type="text"
            placeholder="http(s)://www.example.com"
            fullWidth
            value={shiur.source}
            onChange={handleChange('source')}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker 
              label="Date & Time"
              disablePast
              showTodayButton
              required
              value={shiur.date} 
              onChange = {(date) =>
                setShiur({ ...shiur, ['date']: date })
              }
              onAccept = {(date) =>
                setShiur({ ...shiur, ['date']: date })
              }
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
          onClick={handleAdd} 
          color="primary"
          disabled={
              (shiur.date === undefined 
              || shiur.title === undefined 
              || shiur.lecturer === undefined 
              || shiur.institution === undefined 
              || shiur.link === undefined
              || shiur.title == ''
              || shiur.lecturer == '' 
              || shiur.institution == '' 
              || shiur.link == ''
              || !ValidWithFix(shiur.link)
              || (shiur.source != '' && !ValidWithFix(shiur.source)))
            }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddShiurDialog.propTypes = {
  addShiurHandler: PropTypes.func.isRequired,
}

export default AddShiurDialog
