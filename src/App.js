import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { manager: "" };
  // }
  state = {
    manager : "",
    players : [],
    balance : "",
    value : "",
    message: ""
  };// same as above

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players  = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address) //big number

    this.setState({ manager , players , balance });
  }
//syntax used as we have new react pack instead of bind(this)
  onSubmit = async (event) =>{

    event.preventDefault();

    //we need to get account details to send trancsaction

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction to compelete.....'})
//sendig a transaction assuming 1 acc send it
    await lottery.methods.enter().send({
      from : accounts[0],
      value : web3.utils.toWei(this.state.value)
    });

    this.setState({message: 'You have been succesfully enterd into lottery!'})


  };

  onClick = async () =>{
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction Success.....'})
//sendig a transaction assuming 1 acc send it
    await lottery.methods.pickWinner().send({
      from : accounts[0],
    });

    this.setState({message: 'Winner has been picked'})

  };

  render() {
    return (
      
      <div>
        
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}<br></br>
        There are currently {this.state.players.length} people entered,
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <div>
          <form onSubmit={this.onSubmit}>
            <div>
            <h4><label>Want to try your luck?</label></h4>
            <input 
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            />
            </div><br />
            <button>Enter!</button>
          </form>
        </div>
        <hr />
        <h4>
          Ready to Pick a Winner?
          <br></br><button onClick={this.onClick}>Pick a Winner</button>
        </h4>

        <hr/>
        <h1>{this.state.message}</h1>
        
      </div>
    );
  }
}
export default App;
