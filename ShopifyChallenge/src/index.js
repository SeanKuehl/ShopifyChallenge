import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class CommandHandler extends React.Component {
	
  
	
  constructor(props) {
	  super(props);
	  
	  this.handleSubmit = this.handleSubmit.bind(this);	
	  this.handleChange = this.handleChange.bind(this);
	  
	  this.state = {
		  value: this.props.sampleText,
		  listOfItems: [],
		  
	  };
  }
  
  handleSubmit(event) {
	var tempValue = this.state.value;
	var tempList = this.state.listOfItems;
	
	const commandTypeIndex = 0;
	const itemNameIndex = 1;
	const initialQuantityOfItem = 0;
	const itemAmountIndex = 2;
	const itemInListItemNameIndex = 0;
	
	const createCommand = "C";
	const updateCommand = "U";
	const deleteCommand = "D";
	
	var duplicateFound = false;
	
	//expected input for commands:
	//create: "C itemName"
	//update: "U itemName newItemAmount"
	//delete: "D itemName"
	//read is the always displayed, self updating list
	var seperatedList = tempValue.split(" ");
	
	
	if (seperatedList[commandTypeIndex] == createCommand) {
		//create
		var newItemAndQuantity = [seperatedList[itemNameIndex], initialQuantityOfItem];
		
		//search through list, make sure item isn't already in list
		for (let i = 0; i < tempList.length; i++) {
			var possibleItem = tempList[i];
			if (possibleItem[itemInListItemNameIndex] == seperatedList[itemNameIndex]){
				//duplicate found, don't insert into list
				duplicateFound = true;
			}
		} 
		
		if (duplicateFound == false){
			tempList.push(newItemAndQuantity);	//add item and quantity to item list
		}
		
		
	}
	else if (seperatedList[commandTypeIndex] == updateCommand){
		//update
		//search through list, find itemName and update the quantity
		for (let i = 0; i < tempList.length; i++) {
			var possibleItem = tempList[i];
			if (possibleItem[itemInListItemNameIndex] == seperatedList[itemNameIndex]){
				var editedItem = [possibleItem[itemInListItemNameIndex], seperatedList[itemAmountIndex]];
				tempList.splice(i, 1);	//the i is the index at which to remove, the 1 is how many to remove
				tempList.push(editedItem);	//put the updated version of the item in the list
			}
		} 
	}
	else if (seperatedList[commandTypeIndex] == deleteCommand){
		//delete
		for (let i = 0; i < tempList.length; i++) {
			var possibleItem = tempList[i];
			if (possibleItem[itemInListItemNameIndex] == seperatedList[itemNameIndex]){
				
				tempList.splice(i, 1);	//the i is the index at which to remove, the 1 is how many to remove
				
			}
		} 
	}
	
	
	
	
		
	this.setState({listOfItems: tempList});
	
	
	
	
	

	
	
	
	
    
    event.preventDefault();
  }
  
  handleChange(event) {
		 
		this.setState({value: event.target.value});
		
  }
  
  
  
  
  

  render() {
    

    return (
      <div>
        <div className="CommandHandler"></div>
        

		<form onSubmit={this.handleSubmit}>
		<label for="CommandEnter">Enter a command below:</label><br></br>
		<input type="text" id="CommandEnter" name="enter_command"   onChange={this.handleChange} /><br></br>
		
		<input type="submit" value = "Run Command" /><br></br>
		</form> 
		
		<ItemList items={this.state.listOfItems} />
		
      </div>
	  
	  
    );
  }
}



class ItemList extends React.Component {
	
  
  
  
	
  constructor(props) {
	  super(props);
	  
	  this.handleSubmit = this.handleSubmit.bind(this);	
	  
	  this.itemNameIndex = 0;
	  this.itemQuantityIndex = 1;
	  
	  
	  
	  
  }
  
  
  
  handleSubmit(event) {
	
	
	
	let csvContent = "data:text/csv;charset=utf-8,";

	this.props.items.forEach(function(rowArray) {
		let row = rowArray.join(",");
		csvContent += row + "\r\n";
	});
	
	var encodedUri = encodeURI(csvContent);
	
	
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "my_data.csv");
	document.body.appendChild(link); // Required for FF

	link.click(); // This will download the data file named "my_data.csv".

	
	
	
	
    
    event.preventDefault();
  }
  
  
  

  render() {
    

    return (
	<div>
      <ul>
        {this.props.items.map(item => (
          <li key={item[this.itemNameIndex]}>{item[this.itemNameIndex].concat(", ", item[this.itemQuantityIndex])}</li>
		  //the name should be unique so use it as key, but also show it to user in the list
        ))}
      </ul>
	  
	  <form onSubmit={this.handleSubmit}>
		
		<input type="submit" value = "Download Data as CSV" /><br></br>
	  </form> 
	  
	</div>
    );
  }
}














// ========================================

ReactDOM.render(
  <CommandHandler />,
  document.getElementById('root')
);