var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j];
			}
			else{
				arr[i][j].innerText = '';
			}
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	let difficulty = document.getElementsByName('diff')
	difficulty.forEach((difficulty) => {
		if(difficulty.checked) {
			if(difficulty.value=="easy")
			xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
			else if(difficulty.value=="medium")
			xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=medium')
			else
			xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=hard')
		}
	});
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board,0,0,9);
}

function SudokuSolver(board,i,j,n)
{
	if(i==n)
	{
		FillBoard(board);
		return true;
	}
	if(j==n)
	{
		return SudokuSolver(board,i+1,0,n);
	}
    if(board[i][j]!=0)
	{
		return SudokuSolver(board,i,j+1,n);
	}

	for(let num=1;num<=9;num++)
	{
		if(isvalid(board,i,j,num,n))
		{
			board[i][j]=num;
			if(SudokuSolver(board,i,j+1,n))
			{
				return true;
			}
			board[i][j]=0;
		}
	}
	return false;
}
function isvalid(board,i,j,num,n)
{
	for(let x=0;x<n;x++)
	{
		if(board[i][x]==num)
		{
			return false;
		}
	}
	for(let x=0;x<n;x++)
	{
		if(board[x][j]==num)
		{
			return false;
		}
	}
	let si=i-i%(Math.sqrt(n));
	let sj=j-j%(Math.sqrt(n));
	for(let x=si;x<si+Math.sqrt(n);x++)
	{
		for(let y=sj;y<sj+Math.sqrt(n);y++)
		{
			if(board[x][y]==num)
			return false;
		}
	}
	return true;
}

