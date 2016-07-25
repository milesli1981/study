var _ = require('ramda');

// ʾ������
var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: true}
  ];
  
  
// ��ϰ 1:
// ============
// ʹ�� _.compose() ��д���������������ʾ��_.prop() �� curry ����
var isLastInStock = function(cars) {
  var last_car = _.last(cars);
  return _.prop('in_stock', last_car);
};

var isLastInStockF = _.compose(_.prop('in_stock'), _.last);

//console.log(isLastInStockF(CARS));
//console.log(isLastInStock(CARS));

// ��ϰ 2:
// ============
// ʹ�� _.compose()��_.prop() �� _.head() ��ȡ��һ�� car �� name
var nameOfFirstCar = _.compose(_.prop('name'), _.head);

//console.log(nameOfFirstCar(CARS));



// ��ϰ 3:
// ============
// ʹ�ð������� _average �ع� averageDollarValue ʹ֮��Ϊһ�����
var _average = function(xs) { return _.reduce(_.add, 0, xs) / xs.length; }; // <- ����Ķ�

var averageDollarValue = function(cars) {
  var dollar_values = _.map(function(c) { return c.dollar_value; }, cars);
  return _average(dollar_values);
};

var averageDollarValueF = _.compose(_average, _.map(function(c) { return c.dollar_value;}));

//console.log(averageDollarValue(CARS))
//console.log(averageDollarValueF(CARS))



// ��ϰ 4:
// ============
// ʹ�� compose дһ�� sanitizeNames() ����������һ���»������ӵ�Сд�ַ��������磺sanitizeNames(["Hello World"]) //=> ["hello_world"]��

var _underscore = _.replace(/\W+/g, '_'); //<-- ����Ķ������� sanitizeNames ��ʹ����

var sanitizeNames = _.compose(_underscore, _.toLower);
//console.log(sanitizeNames("HELLO World"));


// �ʵ� 1:
// ============
// ʹ�� compose �ع� availablePrices

var availablePrices = function(cars) {
  var available_cars = _.filter(_.prop('in_stock'), cars);
  return available_cars.map(function(x){
    return x.dollar_value;
  }).join(', ');
};
 
 var availablePricesF = _.compose(_.join(', '), _.map(_.prop('dollar_value')), _.filter(_.prop('in_stock')));
 console.log(availablePricesF(CARS));


 // �ʵ� 2:
// ============
// �ع�ʹ֮��Ϊ pointfree ��������ʾ������ʹ�� _.flip()

var fastestCar = function(cars) {
  var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
  var fastest = _.last(sorted);
  return fastest.name + ' is the fastest';
};

var append = _.flip(_.concat);

var fastestCarF = _.compose(append(' is the fastest'), _.prop('name'), _.last, _.sortBy(_.prop('horsepower')));
console.log(fastestCarF(CARS));


