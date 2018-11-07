import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding:'10px 20px',
  },
  textField: {
    minWidth:'570px',
    marginBottom:'25px',

    [theme.breakpoints.down('sm')]: {
      minWidth:'100%',
      marginLeft:0,
      marginRight: 0,
    },
  },
  formgrid:{
    textAlign:'center'
  },
  button:{
    marginTop:'30px'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-20px'
  },
  overlay:{
    position:'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:'rgba(0,0,0,0.3)',
  },
  hide:{
    display: 'none',
  },
  show:{
    display: 'block',
  },
});

const nameRegEx = "^[A-Za-z\\s]+$";
const numberAllCreditCardRegEx = "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35{3}){11})$";

const visaRegEx = "^(?:4[0-9]{12}(?:[0-9]{3})?)$";
const MastercardRegex = "^(?:5[1-5][0-9]{14})$";
const amexpRegEx = "^(?:3[47][0-9]{13})$";
const discovRegEx = "^(?:6(?:011|5[0-9][0-9])[0-9]{12})$";

const cvvRegEx = "^[0-9]{3,4}$";

class App extends Component {

  state = {
    fname: '',
    errorText:'',
    lname: '',
    cnumber:'',
    edate:'',
    snumber:'',
    loading: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleFnameChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    if(event.target.value.match(nameRegEx)) {
      this.setState({
        fnameError: false,
        fnameMsg: ''
      });
    } else {
      this.setState({
        fnameError: true,
        fnameMsg: 'Please type valid First Name'
      });
    }
  }

  handleLnameChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    if(event.target.value.match(nameRegEx)) {
      this.setState({
        lnametError: false,
        lnameMsg: ''
      });
    } else {
      this.setState({
        lnametError: true,
        lnameMsg: 'Please type valid Last Name'
      });
    }
  }

  handleCardNumberChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    if(event.target.value.match(numberAllCreditCardRegEx)) {

      if(event.target.value.match(visaRegEx)) {
        this.setState({
          cardNumberError: true,
          cardNumberMsg: 'This Is VISA Card'
        });
      }

      if(event.target.value.match(MastercardRegex)) {
        this.setState({
          cardNumberError: true,
          cardNumberMsg: 'This Is MASTER Card'
        });
      } 

      if(event.target.value.match(amexpRegEx)) {
        this.setState({
          cardNumberError: true,
          cardNumberMsg: 'This Is AMEX Card'
        });
      } 

      if(event.target.value.match(discovRegEx)) {
        this.setState({
          cardNumberError: true,
          cardNumberMsg: 'This Is DISCOVER Card'
        });
      }

    }else{
      this.setState({
        cardNumberError: true,
        cardNumberMsg: 'Please type valid Card Number'
      });
    }
  }

  handleCvvChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

    if(event.target.value.match(cvvRegEx)) {
      this.setState({
        cvvError: false,
        cvvMsg: ''
      });
    } else {
      this.setState({
        cvvError: true,
        cvvMsg: 'Please type Correct CVV Number!'
      });
    }
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 2000);
        },
      );
    }
  };

  
  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <div className="App">
        <form className={classes.container} noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
                <h1>Payment Form</h1>
              </Grid>

              <Grid item xs={12} classes={{item:classes.formgrid}}>
                <TextField
                  required
                  id="outlined-name"
                  label="First Name"
                  className={classes.textField}
                  value={this.state.fname}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleFnameChange('fname')}
                  error={this.state.fnameError}
                  helperText={this.state.fnameMsg}
                />
              </Grid>

              <Grid item xs={12} classes={{item:classes.formgrid}}>
                <TextField
                  required
                  id="outlined-name"
                  label="Last Name"
                  className={classes.textField}
                  value={this.state.lname}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleLnameChange('lname')}
                  error={this.state.lnametError}
                  helperText={this.state.lnameMsg}
                />
              </Grid>

              <Grid item xs={12} classes={{item:classes.formgrid}}>
                <TextField
                  required
                  id="outlined-name"
                  label="Card Number"
                  className={classes.textField}
                  type="number"
                  value={this.state.cnumber}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleCardNumberChange('cnumber')}
                  error={this.state.cardNumberError}
                  helperText={this.state.cardNumberMsg}
                />
              </Grid>

              <Grid item xs={12} classes={{item:classes.formgrid}}>
                <TextField
                  required
                  id="outlined-name"
                  label="Expiry Date"
                  className={classes.textField}
                  type="date"
                  value={this.state.edate}
                  onChange={this.handleChange('edate')}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} classes={{item:classes.formgrid}}>
                <TextField
                  required
                  id="outlined-name"
                  label="Security Number"
                  className={classes.textField}
                  type="number"
                  value={this.state.snumber}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleCvvChange('snumber')}
                  error={this.state.cvvError}
                  helperText={this.state.cvvMsg}
                />
              </Grid>

              <Grid item xs={12} classes={{item:classes.formgrid}}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  className={classes.button} 
                  disabled={loading}
                  onClick={this.handleButtonClick}
                >
                  Submit
                </Button>

                {loading && <CircularProgress size={48} className={classes.progress} />}
                <div className={classNames(classes.overlay,this.state.loading ? classes.show : classes.hide)}> </div>
              </Grid>

            </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles) (App);
