let sizeX = 9;
let sizeY = 9;
let matrixValues = [];
let matrixVisibility  = [];
let numberMines = 10;
let score = 0;
let isWinner = 0;

function onloadEvent() {
	createTable();
	placeMines();	
	computeMatrixCellsNeighbours();
}

function getRandomNumber(nMin, nMax) {
	return nMin + Math.floor(Math.random() * ( nMax - nMin + 1));
}

function placeMines() {
	let cntMines=0
	while (cntMines < numberMines) {
		xRandom=getRandomNumber(1, sizeX);
		yRandom=getRandomNumber(1, sizeY);
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
			nbCell=setIdTag(i,j);
			el.setAttribute("id", nbCell);
			el.setAttribute("class", "cell");
			el.setAttribute("readonly", "");
			el.onclick=function () {
				onclickInput(setIdTag(i,j));
			}
			document.getElementById("idTable").appendChild(el);	
			columVal[j] = 0;
			columnVis[j] = 0;
		}
		matrixValues[i] = columVal;
		matrixVisibility[i] = columnVis;		
	}
}

function computeCellNeighbours(x, y) {
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

function computeMatrixCellsNeighbours() {
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j)
			computeCellNeighbours(i, j);
}

function onclickInput(nbCell) {
	pos=getIdTag(nbCell);
	x=pos.x;
	y=pos.y;
	showCellContent(x, y);
	if (matrixValues[x][y] == 0) {
		showEmptyCellsArea();
	}
	if (checkGameLost()) {
		displayMessage("You lose !");
		return;
	}	
	if (checkGameWon()) {
		displayMessage("You win !");
		return;
	}
}
function displayMessage(msg) {
	document.getElementById("msg").innerHTML = msg;
}
function checkGameLost() {
	if (matrixValues[x][y] == -1 && isWinner == 0) {
		showFullTabe();
		return 1;
	}
	return 0;
}
function checkGameWon() {
	let numberHidden = 0;
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j) 
			if (matrixVisibility[i][j] == 0 )	
				numberHidden ++;
	if (numberHidden == numberMines) {
		score ++;
		document.getElementById("scoreTag").innerHTML = score;
		isWinner = 1;
		return 1;
	}
	else 
		return 0;
}

function showCellContent(x, y) {
	valElement = matrixValues[x][y];
	matrixVisibility[x][y] = 1;
	idCell=setIdTag(x, y);
	if (valElement == -1) {
		document.getElementById(idCell).value = "M";
		document.getElementById(idCell).style.backgroundColor = "red";
	}
	if (valElement >= 0 ) {
		document.getElementById(idCell).value = valElement;
		document.getElementById(idCell).style.backgroundColor = "green";
	}
	if (valElement == 0 ) {
		document.getElementById(idCell).value = "";
		document.getElementById(idCell).style.backgroundColor = "green";
	}
}

function hideCellContent(x, y) {
	idCell=setIdTag(x, y);
	document.getElementById(idCell).value = "";
	document.getElementById(idCell).style.backgroundColor = "gray";
}

function showEmptyCellsArea() {
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
					showCellContent(i,j);
}

function onBtnReset() {
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j) {
				matrixVisibility[i][j] = 0;
				matrixValues[i][j] = 0;
			}
	hideFullTabe();
	placeMines();
	computeMatrixCellsNeighbours();
	isWinner = 0;
}
function showFullTabe() {
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j) 
				showCellContent(i,j);
}
function hideFullTabe() {
	for(let i = 1; i <= sizeX; ++ i) 
		for(let j = 1; j <= sizeY; ++ j) 
				hideCellContent(i,j);
}
function setIdTag(x, y) {
	return x + "_" + y;
}
function getIdTag (idString){
	let sId="" + idString;
	arrXY=sId.split("_");
	return{ x : arrXY[0] , y : arrXY[1]}

}