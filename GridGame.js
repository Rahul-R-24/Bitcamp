// JavaScript source code

let gridSize = 4
let grid = [[],[],[],[]]
let player = null
let dict = {"mud":2,"ice":0,"reg":1}
let color_dict = {"mud":"brown","ice":"lightblue","reg":"grey"}

let xPosition = 0;
let yPosition = 0;

let hasTimerStarted = false;
let countdown = 30;

let extraTime1 = [0,0]
let extraTime2 = [0,0]

document.addEventListener("keydown", function (event) {
	if ((event.key === "A" || event.key === "a") && !hasTimerStarted) {
    	hasTimerStarted = true;
		const interval = setInterval(function () {
			countdown--;

			if(countdown<10){
				document.getElementById("countdown").innerHTML = "00:0" + countdown;
			} else {
				document.getElementById("countdown").innerHTML = "00:" + countdown;
			}

			if (countdown <= 0) {
				clearInterval(interval);
				document.getElementById("timer").innerHTML = "Time's Up!";
			}
		}, 1000);
	}
});

class Node {
	data = 0

	xPos = 0
	yPos = 0

	//0-up 1-right 2-down 3-left
	directions = [null, null, null, null]
	constructor(d, x, y) {

		this.data = d
		this.xPos = x
		this.yPos = y

	}

}



class Path {
	type = 0;
	elementName = ""

	constructor(num, name) {
		if (num === 0) {
			this.type="ice";
		} else if (num === 1) {
			this.type="reg";
		} else {
			this.type = "mud";
		}

		this.elementName = name
	}
}

class Player {
	position = null


	constructor(defaultPos) {
		this.position = defaultPos
	}

	canMove(direction) {
		console.log(this.position)
		console.log(direction)
		return ((this.position.directions[direction] !== null) && hasTimerStarted)
	}
}

window.addEventListener("keydown", checkKey);

function checkKey(event) {
	const speed = 315
	switch (event.key) {
		case "ArrowUp":
			
			if (player.canMove(0)) {
				countdown -= dict[player.position.directions[0].type]
				player.position = grid[player.position.yPos - 1][player.position.xPos]
				yPosition -= speed;
				dummy_pos = "up"
			}
			break;
		case "ArrowDown":
			if (player.canMove(2)) {
				countdown -= dict[player.position.directions[2].type]
				player.position = grid[player.position.yPos + 1][player.position.xPos]
				yPosition += speed;
				dummy_pos = "down"
			}

			break;
		case "ArrowLeft":
			if (player.canMove(3)) {
				countdown -= dict[player.position.directions[3].type]
				player.position = grid[player.position.yPos][player.position.xPos - 1]
				xPosition -= speed;
				dummy_pos = "left"
			}

			break;
		case "ArrowRight":
			if (player.canMove(1)) {
				countdown -= dict[player.position.directions[1].type]
				player.position = grid[player.position.yPos][player.position.xPos + 1]
				xPosition += speed;
				dummy_pos = "right"
			 }

			break;
		default:
			break;
	}
	sprite.style.top = yPosition + "px";
	sprite.style.left = xPosition + "px";

}

function loadGrid() {


	//Initializing nodes
	for (let i = 0; i < gridSize ; i++) {
		for (let j = 0; j < gridSize ; j++) {
			grid[i].push(new Node(0, j, i))
		}
	}

	randomizeGrid()

	player = new Player(grid[0][0])

	console.log(grid)
}

function randomizeGrid() {
	counter = 0
	layerCounter = 1
	//Initializing vertical paths
	for (let i = 0; i < gridSize - 1; i++) {
		for (let j = 0; j < gridSize ; j++) {
			grid[i][j].directions[2] = new Path(Math.floor(Math.random() * 3),
				(".sideborder.sidelayer" + layerCounter + ".rec1" + counter))
			counter += 1
			console.log(grid[i][j].directions[2].elementName)

			grid[i + 1][j].directions[0] = grid[i][j].directions[2]

			document.querySelector(grid[i][j].directions[2].elementName).style.backgroundColor =
				color_dict[grid[i][j].directions[2].type]
		}

		layerCounter += 1
	}

	counter = 0
	layerCounter = 1

	//Initializing horizontal paths
	for (let i = 0; i < gridSize ; i++) {
		for (let j = 0; j < gridSize - 1; j++) {
			grid[i][j].directions[1] = new Path(Math.floor(Math.random() * 3),
				(".border.layer"+ layerCounter + ".rec0" + counter))
			counter += 1
			console.log(grid[i][j].directions[1].elementName)

			grid[i][j + 1].directions[3] = grid[i][j].directions[1]

			document.querySelector(grid[i][j].directions[1].elementName).style.backgroundColor =
				color_dict[grid[i][j].directions[1].type]
		}

		layerCounter += 1
	}


	//Choose extraTimes
	extraTime1 = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]
	grid[extraTime1[0]][extraTime1[1]].data = Math.floor(Math.random() * 6) + 5
	extraTime2 = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]
	grid[extraTime2[0]][extraTime2[1]].data = Math.floor(Math.random() * 6) + 5

	//setPositions of extraTimes
	document.getElementById("textbox1").style.top = (extraTime1[0] * 315) + "px"
	document.getElementById("textbox1").style.left = (extraTime1[1] * 315) + "px"
	document.getElementById("textbox1").innerHTML = "<p>" + grid[extraTime1[0]][extraTime1[1]].data + "</p>"

	document.getElementById("textbox2").style.top = (extraTime2[0] * 315) + "px"
	document.getElementById("textbox2").style.left = (extraTime2[1] * 315) + "px"
	document.getElementById("textbox2").innerHTML = "<p>" + grid[extraTime2[0]][extraTime2[1]].data + "</p>"
}

console.log(document.querySelector(".border.layer4.rec09").style)
loadGrid()

