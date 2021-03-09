/*
	players is an array to hold each player's information.
	Fields:
		name - Football player's name
		img  - The relative/absolute path to the image file.
		alt  - The alternative text that describes the image.
		year - The student's year in college (Freshman, Sophomore, Junior, Senior).
		major- The student's current college major.
		games_played    - The number of football games the student has played for the Buffs.
		pass_yards      - The total number of passing yards in the student's football career for the Buffs.
		rushing_yards   - The total number of rushing yards in the student's football career for the Buffs.
		receiving_yards - The total number of receiving yards in the student's football career for the Buffs.
*/
var players = [{name:"John Doe", img: "../resources/img/player1.jpg", alt:"Image of Player 1", year:"Sophomore", major:"Art", games_played: 23, pass_yards: 435, rushing_yards: 200, receiving_yards: 88},
				{name:"James Smith", img: "../resources/img/player2.jpg", alt:"Image of Player 2", year:"Junior", major:"Science", games_played: 17, pass_yards: 192, rushing_yards: 102, receiving_yards: 344},
				{name:"Samuel Phillips", img: "../resources/img/player3.jpg", alt:"Image of Player 3", year:"Freshman", major:"Math", games_played: 8, pass_yards: 35, rushing_yards: 70, receiving_yards: 98},
				{name:"Robert Myers", img: "../resources/img/player4.jpg", alt:"Image of Player 4", year:"Senior", major:"Computer Science", games_played: 31, pass_yards: 802, rushing_yards: 375, receiving_yards: 128}];


/*
	Registration Page:
		viewStudentStats(id, toggle) method
			parameters:
				id - The css id of the html tag being updated.
				toggle - 
					0 - hide the html tag
					1 - make the html tag visible
			
			purpose: This method will accept the id of an html tag and a toggle value.
					 The method will then set the html tag's css visibility and height.  
					 To hide the html tag (toggle - 0), the visibility will be set to hidden and
					 the height will be set to 0.  
					 To reveal the html tag (toggle - 1), the visibility will be set to visible and
					 the height will be set to auto.
*/

function viewStudentStats(id, toggle){
	var ident = id;
	if(toggle == 1){
		document.getElementById(ident).style.visibility = "inherit";
		document.getElementById(ident).style.height = "auto";
	}
	else if(toggle == 0){
		document.getElementById(ident).style.visibility = "hidden";
		document.getElementById(ident).style.height = 0;
	}
}

/*
	Home Page: 
		changeColor(color) method
			parameter: 
				color- A css color
				
			purpose: This method will set the html body's background color to the 
					 provided parameter.
*/

function changeColor(color){
	document.body.style.backgroundColor = color;
}

/*
	Football Season Stats Page:
		loadStatsPage method:
			parameters: none
			
			purpose: This method will iterate through the stats table and 
					 do the following:
						1. Read through each row of the table & determine which team won
						   the game.
						
						2. Update the winner column to the name of the winning team.
						
						3. Keep track of the number of wins/losses for the Buffs.
						
						4. Update the second table to show the total number of wins/losses for the Buffs.
*/

function loadStatsPage(){
	var table = document.getElementById("stats_table");//Retrieve our table element
		var row_counter; //Keeps track of our row index
		var col_counter; //Keeps track of our column index
		var cell_value1; //gets our score for the home team
		var cell_value2; //gets our score for the away team
		var numWins = 0;
		var numLosses = 0;

		for(row_counter = 0; row_counter < table.rows.length; row_counter++)
		{//Outer for loop iterates over each row
			for(col_counter = 0; col_counter < table.rows[row_counter].cells.length; col_counter++)
			{
				oppTeam = table.rows[row_counter].cells[1].innerHTML; //this line stores the name off the Opposing Team
				if((col_counter == 2 ) && row_counter > 1){ //row counter has to be greater than 1 because the first line is just titles
					cell_value1 = table.rows[row_counter].cells[col_counter].innerHTML;
					//console.log(cell_value1);
					cell_value1 = parseInt(cell_value1);
				}
				if((col_counter == 3 ) && row_counter > 1){
					cell_value2 = table.rows[row_counter].cells[col_counter].innerHTML;
					//console.log(cell_value2);
					cell_value2 = parseInt(cell_value2);
				}
				if((cell_value1 > cell_value2) && col_counter == 4 ){ //col_counter is essential because we only want to compare values after all columns have been gone through in the row
					//console.log(cell_value1, " is greater than ", cell_value2);
					table.rows[row_counter].cells[4].innerHTML = "CU Boulder";
					numWins++;
				}
				else if((cell_value2 > cell_value1) && col_counter == 4){
					table.rows[row_counter].cells[4].innerHTML = oppTeam;
					numLosses++;
				}
			}
		}
		//entering in data for wins/losses
		var wins = document.getElementById("wins");
		wins.innerHTML = numWins;
		var losses = document.getElementById("losses");
		losses.innerHTML = numLosses;
}

/*
	Football Player Information Page
		loadPlayersPage method:
			parameters: none
			
			purpose: This method will populate the dropdown menu to allow the 
					 user to select which player's information to view.
					 
					 To handle this, you will need to iterate through the players array
					 and do the following for each player:
						1. Create an anchor tag
						2. Set the href to "#", this will make sure the 
							anchor tag doesn't change pages
						3. Set the onclick to call switchPlayers method 
							(this will need to pass in the index inside the players array)
						4. Set the anchor tag's text to the player's name.
						
					After setting all of the anchor tags, update the innerHTML of the dropdown menu.
					As a note, the id for the dropdown menu is player_selector.
		
		switchPlayers(playerNum) method:
			parameters: 
				playerNum - The index of the football player in the players array.
			
			purpose:
				This method will update the the spans on the player's information pageX
				and calculate the average passing, rushing, and receiving yards.
				
				Span ids:
					p_year     - the player's year in college
					p_major    - the player's major in college
					g_played   - the number of games played for Buffs
					player_img - the player's photo (must set src and alt)
					p_yards    - the number of passing yards
					r_yards    - the number of rushing yards
					rec_yards  - the number of receiving yards
					
					Calculated values:
					  avg_p_yards   - the average number of passing yards for the player's Buff career
					  avg_r_yards   - the average number of rushing yards for the player's Buff career
					  avg_rec_yards - the average number of receiving yards for the player's Buff career
*/
/*<div class="dropdown">
					  <button class="btn btn-secondary dropdown-toggle" type="button" id="selectPlayerButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Select a Player
					  </button>
					  <div id="player_selector" class="dropdown-menu" aria-labelledby="selectPlayerButton">
					  </div>
					</div>
*/
function loadPlayersPage(){
	var menu = document.getElementById("player_selector"); //
	for(i = 0; i < players.length; i++){
		//console.log("This is i: ", i);
		var choice = document.createElement("a");
		choice.innerHTML = players[i].name;
		choice.href = "#";
		choice.onclick = switchPlayers(i);
		choice.className = "dropdown-item";
		menu.append(choice);
	}
}

function switchPlayers(playerNum){
	var year = document.getElementById("p_year");
	year.innerHTML = players[playerNum].year;
	var major = document.getElementById("p_major");
	major.innerHTML = players[playerNum].major;
	var games_pl = document.getElementById("g_played");
	games_pl.innerHTML = players[playerNum].games_played;
	var pyards = document.getElementById("p_yards");
	pyards.innerHTML = players[playerNum].pass_yards;
	var apyards = document.getElementById("avg_p_yards");
	apyards.innerHTML = players[playerNum].pass_yards/players[playerNum].games_played;
	var ryards = document.getElementById("r_yards");
	ryards.innerHTML = players[playerNum].rushing_yards;
	var aryards = document.getElementById("avg_r_yards");
	aryards.innerHTML = players[playerNum].rushing_yards/players[playerNum].games_played;
	var recyards = document.getElementById("rec_yards");
	recyards.innerHTML = players[playerNum].receiving_yards;
	var arecyards = document.getElementById("avg_rec_yards");
	arecyards.innerHTML = players[playerNum].receiving_yards/players[playerNum].games_played;
}


