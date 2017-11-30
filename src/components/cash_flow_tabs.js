import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { blueGrey } from 'material-ui/colors'

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: blueGrey[900]
  }
});

class CashFlowTabs extends React.Component {
  state = {
    activeTab: 0,
  };

  handleChange = (event, activeTab) => {
    this.setState({ activeTab }, () => this.props.handleTabChange(activeTab) );
  };

  render() {
    const { classes } = this.props;
    const { activeTab } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={activeTab} onChange={this.handleChange}>
            <Tab label="Single" />
            <Tab label="Joint" />
          </Tabs>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

CashFlowTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CashFlowTabs);
