'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-07-27T17:01:17.194Z',
    '2023-08-02T23:36:17.929Z',
    '2023-08-05T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z', 
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Sagar S Kumar',
  movements: [50000, 123400, -150, -790, -3210, -1000, 18500, -30],
  interestRate: 1.2,
  pin: 3333,

  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z', 
    '2022-04-10T14:43:26.374Z',
    '2018-06-25T18:49:59.371Z',
    '2017-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'hi',
};

const account4 = {
  owner: 'Han Young Souek',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 4444,

  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z', 
    '2022-04-10T14:43:26.374Z',
    '2018-06-25T18:49:59.371Z',
    '2017-07-26T12:01:20.894Z',
  ],
  currency: 'CYN',
  locale: 'en-GB',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDates = function(dates,locale){

  const calcdaysPassed = function(date1,date2){
      return Math.trunc(Math.abs(date2-date1)/(1000 * 60 * 60 * 24));
  }

  const daysPassed = calcdaysPassed(new Date(),dates);
  console.log(daysPassed);

  if(daysPassed ===  0){
    return `Today`
  }
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <=7) {
    return `${daysPassed} days ago`
  }
  // const date  = `${dates.getDate()}`.padStart(2,0);
  // const month = `${dates.getMonth()+1}`.padStart(2,0);
  // const year = dates.getFullYear();
  // const hours = `${dates.getHours()}`.padStart(2,0);
  // const min = `${dates.getMinutes()}`.padStart(2,0);
  // return `${date}/${month}/${year}`


  return new Intl.DateTimeFormat(locale).format(dates)

  
  // const string = `${date}/${month}/${year}`

//  labelDate.textContent = `${date}/${month}/${year}, ${hours}:${min}`
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';



  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;


  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    
    const formattedMovemets = new Intl.NumberFormat(acc.locale,{style:'currency',currency:acc.currency}).format(mov);
    const displayDate = formatMovementDates(date,acc.locale);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovemets}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const currencyformat = function(acc,format){
   return new Intl.NumberFormat(acc.locale,{style:'currency',currency:acc.currency}).format(format)
}
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = currencyformat(acc,acc.balance);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent =currencyformat(acc,incomes)

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent =currencyformat(acc,Math.abs(out));

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => Math.trunc((deposit * acc.interestRate) / 100))
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = currencyformat(acc,interest);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


const startLogOutTimer = function(){


  const tick = function(){
    const min = `${Math.trunc(time/60)}`.padStart(2,0);
    const sec = String((time % 60)).padStart(2,0);
    //In each call, print the remaining time to the user interface
    labelTimer.textContent = `${min}:${sec}`;
    console.log(min,sec);
  
    
    //when 0 second stop timer log out user
    if(time === 0){
    clearInterval(timer);
    labelWelcome.textContent = `Log in to get Started`;
    containerApp.style.opacity = 0;
  
    }
  
    time--;
  }
  //set time 5 minutes
  let time = 600
  //call the timer every second
  tick();
 const timer =setInterval(tick,1000)
 return  timer;

//decrease 1 sec

}
///////////////////////////////////////
//experiment


// Event handlers
let currentAccount,timer;




//day/month/year

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Login
    //create current date and time
  //   const date = new Date();
  //   const day  = `${date.getDate()}`.padStart(2,0);
  // const month = `${date.getMonth()+1}`.padStart(2,0);
  // const year = date.getFullYear();
  // const hours = `${date.getHours()}`.padStart(2,0);
  // const min = `${date.getMinutes()}`.padStart(2,0);
  // labelDate.textContent = `${day}/${month}/${year}, ${hours}:${min}`
  //Using the Intl system of date and time
  const date = new Date();

  const options = {
    hour:'numeric',
    minute:'numeric',
    day:'numeric',
    month:'numeric',
    year:'2-digit',
    //weekday:'long'
  }

  //   const locale =  navigator.language;
  // console.log(locale);
  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(date);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Timer
    if(timer) clearInterval(timer);
    timer =startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());



    // Update UI
    updateUI(currentAccount);

    
  }
  //reset Transfer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);


  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

      setTimeout(function(){
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
    
     //reset Transfer
  clearInterval(timer);
  timer = startLogOutTimer();
  },4000);
  }
 
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



// console.log(`start`)
// console.log(23 === 23.0);

// console.log(0.1+0.2);
// console.log(0.1+0.2 === 0.3);


// //converting string to numbers
// console.log(Number("23"));
// console.log(+'23')


// //Parsing
// console.log(Number.parseInt('23px',10));
// console.log(Number.parseInt('e23',10));

// console.log(Number.parseFloat('  2.3rem'));

// //check wether the arugment is a not a number or not 
// console.log(Number.isNaN(20));
// console.log(Number.isNaN("20"));
// console.log(Number.isNaN(+"20X"));
// console.log(Number.isNaN(23/0));

// //checks wether a arugment is a number or not
// console.log(Number.isFinite(20));
// console.log(Number.isFinite("20"));
// console.log(Number.isFinite(+"20X"));
// console.log(Number.isFinite(23/0));

// //checks wether a arugment is a number or not
// console.log(Number.isInteger(20));
// console.log(Number.isInteger(20.0));
// console.log(Number.isInteger(+"20X"));
// console.log(Number.isInteger(23/0));


// //Math method

// console.log(Math.sqrt(25));
// console.log(25 ** (1/2));
// console.log(8 ** (1/3));


// console.log(Math.max(1,2,53,82.3,8));
// console.log(Math.max(1,2,"53",23,8));
// console.log(Math.max(1,2,"5.3rem",23,8));

// console.log(Math.min(1,2,3,4,5,6));

// //constant

// console.log(Math.PI * (Number.parseInt('10Px')) ** 2);

// console.log(Math.trunc(Math.random()*6)+1);

// //creating a function to generate random number between a range
// const randomInt = (min,max)=> Math.floor(Math.random() * (max-min)+1) +min;
// // 0...1 => 0..... max-min => adding min => min....max-min+min =>min....max;

// console.log(randomInt(2,4));
// console.log(randomInt(3,4));

// //rounding Integers

// //Trunc Only removes the decimal part
// console.log('Trunc');
// console.log(Math.trunc(23.3));

// //we can use round it will round to the nearest integer
// console.log('round');
// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// //Ceil -> rounds up
// console.log('ceil');
// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// //Floor -> rounds downs
// console.log('floor');
// console.log(Math.floor(23.3));
// console.log(Math.floor(23.9));
// console.log(Math.floor("23.9"));

// //does type corecion

// //negative 
// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));


// //rounding as decimals

// console.log(+(2).toFixed(3));
// console.log(+(2.7).toFixed(3));
// console.log(+(2.345).toFixed(2));

// console.log(`mod`)
// console.log(8%3);
// console.log(6%3);
// console.log(2%3);

// const isEven = (a)=> a % 2 === 0;

// console.log(isEven(2));
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(1));

// labelBalance.addEventListener('click',function(){


// [...document.querySelectorAll(".movements__row")].forEach(function(row,i){
//       if(i %2 === 0){
//           row.style.backgroundColor='orangered';
//       }
//       if(i %3 === 0){
//         row.style.backgroundColor='cyan';
//     }
// })
// })
//every Nth times

//Numeric separator

//245,689,000,000
// const diameter = 245_689_000_000;
// console.log(diameter);

// const price = 345_99;
// console.log(price);

// const transferFees1 = 15_00
// const transferFees2 = 1_500

// const PI = 3._14_3;
// console.log(PI);

// console.log(Number('23_121'));

// console.log( 2 ** 53 -1);
// console.log(Number.MAX_SAFE_INTEGER);

// console.log(2 ** 53 +0);

// //bigint
// console.log(2312238123712371289732893712893n);

// console.log(BigInt(30803948034832));

// console.log(34109809452890481309482309482390n + 23812903812n)
// console.log(34109809452890481309482309482390n * 23812903812n)
// console.log(34109809452890481309482309482390n * 23812903812)


//CREATE DATE
/*
//1 WAY
const date = new Date();
console.log(date);
//Sun Aug 06 2023 12:33:46 GMT+0530 (India Standard Time)
//2WAY
console.log(new Date("Aug 05 2023 22:54:12"))
//Sat Aug 05 2023 22:54:12 GMT+0530 (India Standard Time)
//3WAY
console.log(new Date('aug 6 2023')) // Parse a string to get the date and time and day
//Sun Aug 06 2023 00:00:00 GMT+0530 (India Standard Time)
//4th way
console.log(new Date(account1.movementsDates[0]));//Tue Nov 19 2019 03:01:17 GMT+0530 (India Standard Time)

console.log(new Date(2037,10,19,15,23,5)) //Thu Nov 19 2037 15:23:05 GMT+0530 (India Standard Time)
    //      new Date(year,month(0based),date,HH:MM:SS)


//Date autocorrect
console.log(new Date(2023,11,32));    //Mon Jan 01 2024 00:00:00 GMT+0530 (India Standard Time)
                                      //dec 32 does not exist so it correct by forwarding to 1 24

console.log(new Date(2023,10,33));  //Sun Dec 03 2023 00:00:00 GMT+0530 (India Standard Time)                                    

console.log(new Date(0));  //0 ms after unix time //Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000))//Sun Jan 04 1970 05:30:00 GMT+0530 (India Standard Time)
                //days * hours * min * sec * millisec


                //259200000 TIME STAMP OF DATE NO THREE
 */             
//working with dates

// const future = new Date(2023,10,5,1,62);
// console.log(future);

// //method on object date

// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay()); // based weekly so sunday ->0 monday ->1 ...sat ->6
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString()); // to convert a date in to string to store somewhere
// console.log(future.getTime());

// console.log(new Date(1699129920000)) //timestamp as parameter would give the date

// console.log(Date.now()) // get the   timestamp of the exact moment 

// //and then these method have set method as well
// future.setFullYear('2040');
// future.setFullYear(2040);
// console.log(future)

// const future = new Date(2023,10,15,12,0);
// console.log(future)

// const calcdaysPassed = (date1,date2)=> Math.abs(date2-date1)/(1000 * 60 * 60 *24);

// const  result = calcdaysPassed(new Date(2023,3,14),new Date(2023,3,4));
// console.log(result);
  

// const day1 = new Date(`2023-11-30T09:48:16.867Z`);
// const day2 = new Date();
// console.log(day2)
// console.log(Math.trunc(Math.abs(day2-day1)/(1000 * 60 * 60 *  24)));


// const num = 2323121312.23;

// const options ={
//   style:'currency',
//   unit:'celsius',
//   currency: 'USD',
//   useGrouping:false
// }

// console.log('India',Intl.NumberFormat('en-IN',options).format(num))
// console.log('US',Intl.NumberFormat('en-US',options).format(num))
// console.log('Germany',Intl.NumberFormat('de-DE',options).format(num))
// console.log('UK',Intl.NumberFormat('en-GB',options).format(num))
// console.log('Syria',Intl.NumberFormat('ar-SY',options).format(num))
// console.log(navigator.language,Intl.NumberFormat(navigator.language,options).format(num))

//stimulation  pizza delivery

// setTimeout(function(){
//   console.log('here is your  pizza 🍕🍕')
// },10000);

// console.log('waiting......');
// setTimeout(()=>console.log('Here is your Girlfriend'),20000);
// console.log('Yay Finally OYO');


// const ingredient = ['olive','spanich'];
// const PizzaTimer = setTimeout(function(ing1,ing2){
//   console.log(`here is your  pizza 🍕🍕 with ${ing1} and ${ing2}`)
// },3000,...ingredient);

// console.log('waiting......');

// if(ingredient.includes('spanich'))clearTimeout(PizzaTimer);


//set Interval

// setInterval(function(){
//   const date = new Date();
//   const clock = new Intl.DateTimeFormat('en-GB',{hour:'numeric',minute:'numeric',second:'numeric'}).format(date);
//   console.log(clock);
// },1000)