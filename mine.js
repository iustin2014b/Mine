let sizeX = 9;
let sizeY = 9;
let matrixValues = [];
let matrixVisibility  = [];
let numberMines = 10;
let score = 0;
let win = 0;

function onloadEvent() {
	createTable();
	placeMines();	
	calculateAllNeighborhood();
}

function getRandom(nMin, nMax) {
	return nMin + Math.floor(Math.random() * ( nMax - nMin + 1));
}

function placeMines() {
	let cntMines=0
	while (cntMines < numberMines) {
		xRandom=getRandom(1, sizeX);
		yRandom=getRandom(1, sizeY);
		if (matrixValues[xRandom][ yRandom] != -1) {
			matrixValues[xRandom][ yRandom] = -1;	
			cntMines ++;		
		}	
	}
}

function createTable() {
	matrixValues[0] = "";
	matrixVisibility[0] = "";	
	for(let i = 1; i <= sizeX; ++ i) {
		columVal = [];
		columnVis = [];
		for(let j = 1; j <= sizeY; ++ j) {
			let el=document.createElement("input");
			let nbCell=i * 100 + j;
			el.setAttribute("id", nbCell);
			el.setAttribute("class", "cell");
			el.setAttribute("readonly", "");
			el.onclick=function () {
				onclickInput(nbCell);
			}
			document.getElementById("idTable").appendChild(el);	
			columVal[j] = 0;
			columnVis[j] = 0;
		}
		matrixValues[i] = columVal;
		matrixVisibility[i] = columnVis;		
	}
}

function calculateNeighbor(x, y) {
	let cntMines=0
	if (matrixValues[x][ y] == -1)
		return;
	for(let i = x - 1; i <= x + 1 && i <= sizeX; ++ i) 
		for(let j = y - 1; j <= y + 1  && j <= sizeY; ++ j) 
			if ((i >=1 && j >=1))
				if (matrixValues[i][j] == -1)
					cntMines ++;
	matrixValues[x][y]=cntMines;
}

function calculateAllNeighborhood() {
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j)
			calculateNeighbor(i, j);
}

function onclickInput(nbCell) {
	x = Math.floor(nbCell / 100);
	y= nbCell % 100;
	showEl(x, y);
	if (matrixValues[x][y] == 0) {
		fillBlancArea();
	}
	if (checkLose()) {
		displayMessage("You lose !");
		return;
	}	
	if (checkWin()) {
		displayMessage("You Win !");
		return;
	}
}
function displayMessage(msg) {
	document.getElementById("msg").innerHTML = msg;
}
function checkLose() {
	if (matrixValues[x][y] == -1 && win == 0) {
		showFullTabe();
		return 1;
	}
	return 0;
}
function checkWin() {
	let numberHidden = 0;
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j) 
			if (matrixVisibility[i][j] == 0 )	
				numberHidden ++;
	if (numberHidden == numberMines) {
		score ++;
		document.getElementById("scoreTag").innerHTML = score;
		win = 1;
		return 1;
	}
	else 
		return 0;
}

function showEl(x, y) {
	valElement = matrixValues[x][y];
	matrixVisibility[x][y] = 1;
	if (valElement == -1) {
		document.getElementById(x * 100 + y).value = "M";
		document.getElementById(x * 100 + y).style.backgroundColor = "red";
	}
	if (valElement >= 0 ) {
		document.getElementById(x * 100 + y).value = valElement;
		document.getElementById(x * 100 + y).style.backgroundColor = "green";
	}
	if (valElement == 0 ) {
		document.getElementById(x * 100 + y).value = "";
		document.getElementById(x * 100 + y).style.backgroundColor = "green";
	}
}
function hideEl(x, y) {
	document.getElementById(x * 100 + y).value = "";
	document.getElementById(x * 100 + y).style.backgroundColor = "gray";
}
function fillBlancArea() {
	nbEmptyCell=99;
	while (nbEmptyCell>0) {
		nbEmptyCell=0
		for(let i = 1; i <= sizeX; ++ i ) 
			for(let j = 1; j <= sizeY; ++ j)
				if (matrixValues[i][j] == 0 && matrixVisibility[i][j] == 1 ) {
					showAroundEmptyCell(i, j);
					matrixVisibility[i][j] = 2;
					nbEmptyCell ++;
				}
	}
	
}

function showAroundEmptyCell(x, y) {
	for(let i = x - 1; i <= x + 1 && i <= sizeX; ++ i) 
		for(let j = y - 1; j <= y + 1  && j <= sizeY; ++ j) 
			if ((i >=1 && j >=1))
			 if ( matrixVisibility[i][j] == 0)
					showEl(i,j);
}

function onBtnReset() {
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j) {
				matrixVisibility[i][j] = 0;
				matrixValues[i][j] = 0;
			}
	hideFullTabe();
	placeMines();
	calculateAllNeighborhood();
	win = 0;
}
function showFullTabe() {
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j) 
				showEl(i,j);
}
function hideFullTabe() {
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j) 
				hideEl(i,j);
}