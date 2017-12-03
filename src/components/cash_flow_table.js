import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import { red, blueGrey } from 'material-ui/colors'
import { CalculateTax } from '../services/tax_calculator'
import { CalculateCombinedIncome, FormatMoney, CalculateNetIncome } from '../services/data_helper'

const styles = {
  taxAmount: {
    color: red['A700'],
  },
  netIncome: {
    backgroundColor: blueGrey[800],
    color: 'white',
    fontWeight: 'bold'
  },
  tableHeader: {
    backgroundColor: blueGrey[800],
    color: 'white',
  },
  subtotal: {
    backgroundColor: blueGrey[100]
  },
  ageHeader: {
    backgroundColor: blueGrey[100],
    textAlign: 'right'
  },
  age: {
    backgroundColor: blueGrey[100]
  }
};

class CashFlowTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashFlows: [],
      page: 0,
      rowsPerPage: 5,
      userBirthday: '',
      spouseBirthday: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({cashFlows: nextProps.cashFlows,
                   userBirthday: nextProps.userBirthday,
                   spouseBirthday: nextProps.spouseBirthday})
  }

  handleChangePage = (event, page) => {
    this.setState({page});
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value});
  }

  getYearFromDate(date) {
    return new Date(date).getFullYear()
  }

  pageinatedData() {
    let page = this.state.page;
    let rowsPerPage = this.state.rowsPerPage;
    return this.state.cashFlows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  buildTableHeaders() {
    return this.pageinatedData().map( (cashFlow, idx) => {
      return <TableCell className={this.props.classes.tableHeader} key={idx} numeric>{this.getYearFromDate(cashFlow.end_date)}</TableCell>
    })
  }

  buildAgeRow(birthday, label) {
    return (
      <TableRow key={label}>
        <TableCell className={this.props.classes.ageHeader}>{label}</TableCell>{
          this.pageinatedData().map( (cashFlow, idx) => {
            return <TableCell className={this.props.classes.age} key={idx} numeric>{this.getYearFromDate(cashFlow.end_date) - this.getYearFromDate(birthday)}</TableCell>
          })
        }
      </TableRow>
    )
  }

  buildAgeRows() {
    let ageRows = []
    if(this.state.userBirthday) {
      ageRows.push(this.buildAgeRow(this.state.userBirthday, 'Your Age'))
    }
    if(this.state.spouseBirthday && this.props.joint) {
      ageRows.push(this.buildAgeRow(this.state.spouseBirthday, "Spouse's Age"))
    }
    return ageRows;
  }

  renderWorkIncome() {
    if(this.props.joint){
      return ([
          <TableRow key="user-income-from-work">
            <TableCell>My Income</TableCell>
            { this.pageinatedData().map((cashFlow, idx) => {
                return <TableCell key={`work-${idx}`} numeric>
                  {FormatMoney(cashFlow.sources.user_work)}
                </TableCell>
              }) }
          </TableRow>,
          <TableRow key="spouse-income-from-work">
            <TableCell>Spouse's Income</TableCell>
            { this.pageinatedData().map((cashFlow, idx) => {
                return <TableCell key={`work-${idx}`} numeric>
                  {FormatMoney(cashFlow.sources.spouse_work)}
                </TableCell>
              }) }
          </TableRow>,
          <TableRow key="income-from-work">
            <TableCell className={this.props.classes.subtotal}>Income from Work</TableCell>
            { this.pageinatedData().map((cashFlow, idx) => {
                return <TableCell className={this.props.classes.subtotal} key={`work-${idx}`} numeric>
                  {FormatMoney(cashFlow.sources.user_work + cashFlow.sources.spouse_work)}
                </TableCell>
              }) }
          </TableRow>
      ])
    } else {
      return (
          <TableRow key="income-from-work">
            <TableCell>Income from Work</TableCell>
            { this.pageinatedData().map((cashFlow, idx) => {
                return <TableCell key={`work-${idx}`} numeric>
                  {FormatMoney(cashFlow.sources.user_work)}
                </TableCell>
              }) }
          </TableRow>
      )
    }
  }

  renderSocialSecurityIncome(){
    if(this.props.joint){
      return ([
        <TableRow key="user-ss">
          <TableCell>My Social Security</TableCell>
          { this.pageinatedData().map((cashFlow, idx) => {
              return <TableCell key={`ss-${idx}`} numeric>
                {FormatMoney(cashFlow.sources.user_social_security)}
              </TableCell>
            }) }
        </TableRow>,
        <TableRow key="spouse-ss">
          <TableCell>Spouse's Social Security</TableCell>
          { this.pageinatedData().map((cashFlow, idx) => {
              return <TableCell key={`ss-${idx}`} numeric>
                {FormatMoney(cashFlow.sources.spouse_social_security)}
              </TableCell>
            }) }
        </TableRow>,
        <TableRow key="ss">
          <TableCell className={this.props.classes.subtotal}>Social Security</TableCell>
          { this.pageinatedData().map((cashFlow, idx) => {
              return <TableCell className={this.props.classes.subtotal} key={`ss-${idx}`} numeric>
                {FormatMoney(cashFlow.sources.user_social_security + cashFlow.sources.spouse_social_security)}
              </TableCell>
            }) }
        </TableRow>
      ])
    } else {
      return (
        <TableRow key="ss">
          <TableCell>Social Security</TableCell>
          { this.pageinatedData().map((cashFlow, idx) => {
              return <TableCell key={`ss-${idx}`} numeric>
                {FormatMoney(cashFlow.sources.user_social_security)}
              </TableCell>
            }) }
        </TableRow>
      )
    }
  }

  buildTableRow() {
    return (
      <TableBody>
        {this.renderWorkIncome()}
        {this.renderSocialSecurityIncome()}
        <TableRow key="retirement">
          <TableCell>Retirement Savings Withdrawals</TableCell>
          { this.pageinatedData().map((cashFlow, idx) => {
              return <TableCell key={`retirement-${idx}`} numeric>
                {FormatMoney(cashFlow.sources.asset_income)}
              </TableCell>
            }) }
        </TableRow>
        <TableRow key="combined-income">
          <TableCell className={this.props.classes.subtotal}>Combined Income</TableCell>
          { this.pageinatedData().map((cashFlow, idx) => {
              return <TableCell className={this.props.classes.subtotal} key={`combined-income-${idx}`} numeric>
                {FormatMoney(CalculateCombinedIncome(cashFlow, this.props.joint))}
              </TableCell>
            }) }
        </TableRow>
        <TableRow key="taxes">
          <TableCell>Taxes(Est.)</TableCell>
          { this.pageinatedData().map((cashFlow, idx) => {
              return <TableCell className={this.props.classes.taxAmount} key={`taxes-${idx}`} numeric>
                - {FormatMoney(CalculateTax(CalculateCombinedIncome(cashFlow, this.props.joint), this.props.joint))}
              </TableCell>
            }) }
        </TableRow>
        <TableRow key="after-taxes">
          <TableCell className={this.props.classes.netIncome}>After-Tax Income</TableCell>
          { this.pageinatedData().map((cashFlow, idx) => {
              return <TableCell className={this.props.classes.netIncome} key={`after-taxes-${idx}`} numeric>
                {FormatMoney(CalculateNetIncome(cashFlow))}
              </TableCell>
            }) }
        </TableRow>
      </TableBody>
    )
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={this.props.classes.tableHeader} style={{textAlign: 'right'}}>Year</TableCell>
            {this.buildTableHeaders()}
          </TableRow>
          {this.buildAgeRows()}
        </TableHead>
          {this.buildTableRow()}
        <TableFooter>
          <TableRow>
            <TablePagination
              count={this.state.cashFlows.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

export default withStyles(styles)(CashFlowTable);
