import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 200,
  },
});

class BirthdayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: ""
    }
  }

  updateBirthday = (event) => {
    let birthday = event.target.value
    this.setState({birthday: birthday}, () => this.props.handleBirthdayChange(birthday))
  }

  render() {
    return (
      <form className={this.props.classes.container} noValidate>
        <TextField
          id="date"
          label={this.props.label}
          type="date"
          defaultValue={this.props.defaultBirthday}
          onChange={this.updateBirthday}
          className={this.props.classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    )
  }
}

export default withStyles(styles)(BirthdayPicker);
