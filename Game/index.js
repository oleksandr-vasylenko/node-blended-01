const chalk = require("chalk");

console.log(chalk.blue("Hello in our Game!"));

const readLine = require("readline").createInterface({
  output: process.stdout,
  input: process.stdin,
});

let count = 1;

const tryLimit = 3;

const randomNumber = Math.round(Math.random() * 10);

const game = () => {
  if (count <= tryLimit) {
    readLine.question(
      chalk.bgBlue("Please, enter the number from 0 to 10\n"),
      (num) => {
        const number = Number(num);
        if (number === randomNumber) {
          console.log(chalk.bgGreen("Congrats! You WIN!"));
          readLine.close();
        } else if (number < randomNumber) {
          console.log(chalk.bgYellow("You number is less, try another number"));
          count += 1;
          game();
        } else {
          console.log(
            chalk.bgYellow("You number is bigger, try another number")
          );
          count += 1;
          game();
        }
      }
    );
  } else {
    console.log(chalk.bgRed("Sorry, you loss(( Game over."));
    readLine.close();
  }
};

game();
