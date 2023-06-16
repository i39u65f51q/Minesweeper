/* Board:

00 01 02 03 04
05 06 07 08 09
10 11 12 13 14
15 16 17 18 19


00 is bomb, row=0, col=0 -> row:0~1 && col:0-1 == 1
07 is bomb, row=1, col=2 -> row:0~2 && col:1~3 == 1

row:0-2, col:1~3 
06 is safe, but get 2 count(s) -> row:1, col:1
05 is safe, but get 1 count(s) -> row:1, col:0

*/

const row = 5;
const col = 5;
const maxColIndex = col - 1;
const maxRowIndex = row - 1;

const bomb = [
  [0, 0],
  [1, 2],
  [2, 1],
  [3, 2],
];

setBoard(row, col);

function setBoard(rowCount, colCount) {
  const board = document.getElementById('board');
  for (let i = 0; i < rowCount; i++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    for (let j = 0; j < colCount; j++) {
      const box = document.createElement('div');

      box.classList.add('box');
      box.setAttribute('row', i);
      box.setAttribute('col', j);
      box.addEventListener('click', e => clickBox(e));
      rowDiv.appendChild(box);
    }
    board.appendChild(rowDiv);
  }
}

function clickBox(e) {
  const rowIndex = Number(e.target.getAttribute('row'));
  const colIndex = Number(e.target.getAttribute('col'));

  const isBoom = getIsBoom(rowIndex, colIndex);

  if (isBoom) {
    revealAll();
    return;
  }
  const count = getBoomCount(rowIndex, colIndex);
  e.target.innerHTML = count;
}

function revealAll() {
  const boxes = Array.from(document.querySelectorAll('.box')); //NodeList -> Array
  boxes.forEach(box => {
    const colIndex = Number(box.getAttribute('col'));
    const rowIndex = Number(box.getAttribute('row'));
    const isBoom = getIsBoom(rowIndex, colIndex);
    if (isBoom) {
      box.innerHTML = '💣';
      return;
    }
    const count = getBoomCount(rowIndex, colIndex);
    box.innerHTML = count;
  });
}

function getBoomCount(rowIndex, columnIndex) {
  let count = 0;
  for (let index = 0; index < bomb.length; index++) {
    /* bomb[index][0] is "Row", bomb[index][1] is "Column" */
    const rightRowIndex = bomb[index][0] + 1 > maxRowIndex ? maxRowIndex : bomb[index][0] + 1; /* if Row bigger than maxColIndex => maxColIndex */
    const leftRowIndex = bomb[index][0] - 1 < 0 ? 0 : bomb[index][0] - 1; /* if left less than 0 => 0 */

    const rightColIndex = bomb[index][1] + 1 > maxColIndex ? maxColIndex : bomb[index][1] + 1; /* if Column bigger than maxColIndex => maxColIndex */
    const leftColIndex = bomb[index][1] - 1 < 0 ? 0 : bomb[index][1] - 1; /* if Column less than 0 => 0 */

    const isBetweenRow = rowIndex >= leftRowIndex && rowIndex <= rightRowIndex;
    const isBetweenColumn = columnIndex >= leftColIndex && columnIndex <= rightColIndex;

    if (isBetweenColumn & isBetweenRow) {
      count++;
    }
  }
  return count;
}

function getIsBoom(rowIndex, columnIndex) {
  for (let i = 0; i < bomb.length; i++) {
    if (bomb[i][0] === rowIndex && bomb[i][1] === columnIndex) {
      return true;
    }
  }
  return false;
}
