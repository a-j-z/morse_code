var c = document.getElementById("MorseCode");
var ctx = c.getContext("2d");
var keyPresses, frame, gap, char, code, isDrawCodes;
c.style.backgroundColor = "#103040";

var index =
[
	"01",
	"1000",
	"1010",
	"100",
	"0",
	"0010",
	"110",
	"0000",
	"00",
	"0111",
	"101",
	"0100",
	"11",
	"10",
	"111",
	"0110",
	"1101",
	"010",
	"000",
	"1",
	"001",
	"0001",
	"011",
	"1001",
	"1011",
	"1100"
]

var letters =
[
	"A", "B", "C", "D", "E",
	"F", "G", "H", "I", "J",
	"K", "L", "M", "N", "O",
	"P", "Q", "R", "S", "T",
	"U", "V", "W", "X", "Y",
	"Z"
]

var canPress = true;

function setup()
{
	keyPresses = []
	for (var i = 0; i < 128; i++)
	{
		keyPresses.push(false);
	}
	initialize();
	interval = setInterval(move, 1000.0/60.0);
	document.body.addEventListener("keydown", function(e) {
        keyPresses[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keyPresses[e.keyCode] = false;
    });
}

function initialize()
{
	code = [];
	gap = 0;
	char = 0;
	frame = 0;
	isDrawCodes = true;
}

function translate(l)
{
	var i = index.indexOf(l);
	if (i == -1) return "";
	else return letters[i];
	console.log(code);
}

function parseCode()
{
	var output = ""
	var letter = ""
	for (var i = 0; i < code.length; i++)
	{
		if (i % 2 == 1)
		{
			if (code[i] < 10) letter += "0";
			else letter += "1";
		}
		if (i % 2 == 0 && code[i] > 20 || i == code.length - 1)
		{
			output += translate(letter);
			letter = "";
		}
	}
	return output
}

function drawCodes()
{
	for (i = 0; i < letters.length; i++)
	{
		var c = letters[i] + ": "
		for (var j = 0; j < index[i].length; j++)
		{
			if (index[i].charAt(j) == '0') c += "\u2022 ";
			else c += "\u2014 ";
		}

		ctx.font = "16px Arial";
		ctx.textAlign = "left";
		ctx.fillStyle = "rgb(180,225,255)";
		ctx.fillText(c, Math.floor(i / 5) * 100 + 15, (i % 5) * 30 + 460);
	}

	ctx.font = "12px Arial";
	ctx.fillStyle = "rgb(50,110,140)";
	ctx.fillText("Use spacebar", 515, 490);
	ctx.fillText("as Morse input.", 515, 510);
	ctx.fillText("Press H to", 515, 560);
	ctx.fillText("hide the guide.", 515, 580);
	
}

function drawParsed()
{
	ctx.font = "100px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(parseCode(), 300, 200);
}

function move()
{
	ctx.clearRect(0, 0, c.width, c.height);
	if (!keyPresses[32])
	{
		if (char != 0) code.push(char);
		char = 0;
		gap++
	}
	else
	{
		if (gap != 0) code.push(gap);
		gap = 0
		char++;
	}

	if (isDrawCodes) drawCodes();
	drawParsed();

	if (gap > 120) code = [];

	if (keyPresses[72] && isDrawCodes && canPress) 
	{
		isDrawCodes = false;
		canPress = false;
	}
	else if (keyPresses[72] && !isDrawCodes && canPress)
	{
		isDrawCodes = true;
		canPress = false;
	}
	if (!keyPresses[72]) canPress = true;

	frame++;
}

setup();