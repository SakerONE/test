# Graphs

Динамически рисует графики. Есть 3 вида:

+ [Bars Graph][bars]
+ [Linear Graph][linear]
+ [Pie Graph][pie]

<h2 id="bars">Bars Graph</h2>

<!-- ### Description
Рисует круговые диаграммы. Есть 2 вида:

+ Pie <br><img width="100" src="http://i.stack.imgur.com/vcTcZ.png" alt="pie" title="pie">

+ Doughnut <br><img width="100" src="http://i.stack.imgur.com/yUzo5.png" alt="pie" title="pie">

### Установка

    bower install --save cobalt/graphs

### Подключение

    <link rv-component="components/graphs">

### Использование

    <element rv-graphs="model"></element> -->

<h2 id="linear">Linear Graph</h2>

<!-- ### Description
Рисует круговые диаграммы. Есть 2 вида:

+ Pie <br><img width="100" src="http://i.stack.imgur.com/vcTcZ.png" alt="pie" title="pie">

+ Doughnut <br><img width="100" src="http://i.stack.imgur.com/yUzo5.png" alt="pie" title="pie">

### Установка

    bower install --save cobalt/graphs

### Подключение

    <link rv-component="components/graphs">

### Использование

    <element rv-graphs="model"></element> -->

<h2 id="pie">Pie Graph</h2>

### Description
Рисует круговые диаграммы. Есть 2 вида:

+ Pie <br><img width="100" src="http://i.stack.imgur.com/vcTcZ.png" alt="pie" title="pie">

+ Doughnut <br><img width="100" src="http://i.stack.imgur.com/yUzo5.png" alt="pie" title="pie">

### Установка

    bower install --save cobalt/graphs

### Подключение

	<link rv-component="components/graphs">

### Использование

	<element rv-pie-graph="pieGraphModel"></element>


`pieGraphModel` - объект с полями `data` и `options`.

+ `data` - массив объектов с информацией о секторах чарта.
    * `color` _(string)_ - цвет сектора.
    * `value` _(number)_ - значение сектора.
+ `options` - необязательный объект с дополнительными настройками чарта:
    * `doughnut` _(boolean)_ - указывает будет чарт [doughnut'ом][doughnutImg] или нет.
    * `doughnutWidth` _(number)_ - ширина доната.
    * `duration` _(number)_ - время анимации в миллисекундах.
    * `start` _(number [0..360])_ - начальный угол в градусах.

#### Значения по умолчанию
    doughnut: false
    doughnutWidth: radius / 2
    duration: 1000
    start: 0

#### Пример
    var pie = {};

    pie.data = [
        {
    		color: 'blue',
    		value: 10
    	},
    	{
    		color: 'red',
    		value: 100
    	},
    	{
    		color: 'green',
    		value: 10
    	}
    ];

    pie.options = {
    	doughnut: true,
    	doughnutWidth: 70,
    	duration: 2000,
    	start: 90
    };

    scope.pie = pie;

Анимация происходит автоматически при заходе на слайд. Чтобы перерисовать чарт с новыми `data` и `options` нужно в `scope.pie` присвоить новый объект.

[bars]: #bars-graph
[linear]: #linear-graph
[pie]: #pie-graph

[pieImg]: http://i.stack.imgur.com/vcTcZ.png
[doughnutImg]: http://i.stack.imgur.com/yUzo5.png