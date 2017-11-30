import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withoutSpouse from './data/withoutSpouse.json';
import withSpouse from './data/withSpouse.json';
import CashFlowTable from './components/cash_flow_table';
import CashFlowTabs from './components/cash_flow_tabs';
import BirthdayPicker from './components/birthday_picker';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withoutSpouseData: [],
      withSpouseData: [],
      userBirthday: "1989-07-14",
      spouseBirthday: "1991-09-07",
      activeTab: 0,
    };
  }

  handleBirthdayChange(userBirthday) {
    this.setState({userBirthday: userBirthday})
  }

  handleSpouseBirthdayChange(spouseBirthday) {
    this.setState({spouseBirthday: spouseBirthday})
  }

  handleTabChange(activeTab){
    this.setState({activeTab: activeTab})
  }

  jointTable(){
    return this.state.activeTab !== 0
  }

  pickCashflow(){
    if(this.jointTable()){
      return this.state.withSpouseData
    }

    return this.state.withoutSpouseData
  }

  componentDidMount() {
      this.setState({withoutSpouseData: withoutSpouse, withSpouseData: withSpouse})
  }

  renderBirthdayPickers(){
    if(this.jointTable()) {
      return(
        <div>
          <BirthdayPicker handleBirthdayChange={this.handleBirthdayChange.bind(this)}
                          defaultBirthday="1989-07-14"
                          label="Your Birthday"/>
          <BirthdayPicker handleBirthdayChange={this.handleSpouseBirthdayChange.bind(this)}
                          defaultBirthday="1991-09-07"
                          label="Spouse's Birthday"/>
        </div>
      )
    }

    return <BirthdayPicker handleBirthdayChange={this.handleBirthdayChange.bind(this)}
                           defaultBirthday="1989-07-14"
                           label="Your Birthday"/>
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <CashFlowTabs handleTabChange={this.handleTabChange.bind(this)}>
              {this.renderBirthdayPickers()}
              <CashFlowTable cashFlows={this.pickCashflow()}
                             userBirthday={this.state.userBirthday}
                             spouseBirthday={this.state.spouseBirthday}
                             joint={this.jointTable()}/>
            </CashFlowTabs>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
