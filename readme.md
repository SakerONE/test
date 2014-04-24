# Graphs

Динамически рисует графики. Есть 3 вида:

+ [Bars Graph][barsHash]
+ [Linear Graph][linearHash]
+ [Pie Graph][pieHash]

___

## Bars Graph

Рисует графики с барами

+ вертикальными

![vertical graph image supposed to be here][verticalGraph]

+ горизонтальными

![horizontal graph image supposed to be here][horizontalGraph]

+ вертикальные умеют расти вниз

![revert graph image supposed to be here][revertGraph]

+ возможен также и смешанный вариант

![mixed graph image supposed to be here][mixedGraph]

### Установка

    bower install --save cobalt/graphs

### Подключение

Компонент

    <link rv-component="components/graphs">

graph.css

    <link rel="stylesheet" href="components/graphs/graph.css">

### Использование

    <div rv-bars-graph="barsGraphModel"></div>

`barsGraphModel` _(object)_ - данные графика

#### Обязательные свойства

`values` _(array)_ - значения баров. Если это массив чисел - генерируются просто бары. Если массив массивов - *g-bar-nest'ы*.

`verticalScale` / `horizontalScale` _(object)_ - данные шкалы. Обязательной является шкала соответствующая ориентации графика. Если ориентация вертикальная - `verticalScale`, если горизонтальная - `horizontalScale`. Вторая шкала необязательна.

+ `from` _(number)_ - начальное значение шкалы.
+ `to` _(number)_ - конечное значение шкалы.
+ `step` _(number)_ - шаг с которым генерируются значения шкалы.
+ `label` _(string)_ - если указан - создается элемент *g-scale-label* c названием шкалы.
+ `point` _(boolean)_ - указывает будет ли навешен класс *g-point*. (необязательное свойство).

#### Необязательные свойства

`name` _(string)_ - если указан - создается элемент *g-caption* с названием графика.

`legendNames` _(array)_ - если указан - создается элемент *g-legend* с элементами соответствующими элементам массива.

`nestNames` _(array)_ - если указан - создаются элементы *g-nest-name*.

`additionalClasses` _(array)_ - набор дополнительных классов.

`animationType` _(string)_ - указывает тип анимации графика. Может принимать одно из следующих значений:

+ `scale-animation` - графики анимируются через *scale transfrom*
+ `size-animation` - графики анимируются через *width/height* (в зависимости от ориентации графика).
+ `opacity-animation` - графики анимируются через *opacity*.

`orientation` - ориентация графика. Может принимать одно из следующих значений:

+ `vertical` - вертикальная ориентация.
+ `horizontal` - горизонтальная ориентация.

#### Значения по умолчанию

    orientation: 'vertical'
    animationType: 'scale-animation'
    additionalClasses: []

#### Пример

    scope.barsGraphModel = {
        name: 'Total revenue',

        additionalClasses: ['g-point', 'g-rounded'],

        orientation: 'horizontal'

        verticalScale: {
            from: 0,
            to: 5,
            step: 1,
            label: 'Revenue, $',
            point: true
        },

        animationType: "size-animation",

        legendNames: ['Current margin', 'Margin potential'],

        nestNames: ['a', 'b'],
        values: [[1, 2], [2, 4]]
    };

Анимация происходит автоматически при заходе на слайд. Чтобы перерисовать график с новыми данными нужно в `scope.barsGraphModel` присвоить новый объект.

___

## Linear Graph

Рисует линейные графики.

![linear image supposed to be here][linear]

### Установка

    bower install --save cobalt/graphs

### Подключение

    <link rv-component="components/graphs">

### Использование

    <div rv-linear-graph="linearGraphModel"></div>

`linearGraphModel` _(object)_ - данные графика с полями `data` и `options`.

`data` _(array)_ - данные о линиях. Каждая линия представлена объектом со свойствами:

+ `color` _(string)_ - цвет линии.
+ `points` _(array)_ - точки образующие линию. Каждая точка представлена массивом координат [x, y].

`options` _(object)_ - дополнительные настройки:

+ `x` _(object)_ - объект с начальной `start` и конечной `end` *x* координатой графика.
+ `y` _(object)_ - объект с начальной `start` и конечной `end` *y* координатой графика.
+ `duration` _(number)_ - время анимации в миллисекундах.
+ `lineWidth` _(number)_ - толщина линий.

#### Значения по умолчанию

    x: {start: 0, end: graphWidth}
    y: {start: 0, end: graphHeight}
    duration: 2000
    lineWidth: 1

#### Пример

    var linearGraphModel = {};

    linearGraphModel.data = [
        {
            color: 'red',
            points: [[0, 0], [10, 50], [20, 20], [30, 40], [40, 40], [50, 60], [60, 30]]
        },
        {
            color: 'green',
            points: [[0, 0], [10, 40], [20, 30], [30, 50], [40, 45], [50, 50], [60, 40]]
        }
    ];

    linearGraphModel.options = {
        x: {start: 0, end: 70},
        y: {start: 0, end: 100}
    };

    scope.linearGraphModel = linearGraphModel;

Анимация происходит автоматически при заходе на слайд. Чтобы перерисовать график с новыми `data` и `options` нужно в `scope.linearGraphModel` присвоить новый объект.

___

## Pie Graph

Рисует круговые графики. Есть 2 вида:

+ Pie

![pie image supposed to be here][pie]

+ Doughnut

![doughnut image supposed to be here][doughnut]

### Установка

    bower install --save cobalt/graphs

### Подключение

    <link rv-component="components/graphs">

### Использование

    <div rv-pie-graph="pieGraphModel"></div>

`pieGraphModel` _(object)_ - данные графика с полями `data` и `options`.

`data` _(array)_ - информация о секторах. каждый сектор представлен объектом со свойствами:

+ `color` _(string)_ - цвет сектора.
+ `value` _(number)_ - значение сектора.

`options` _(object)_ - дополнительные настройки:

+ `doughnut` _(boolean)_ - указывает будет ли график [doughnut'ом][doughnut].
+ `doughnutWidth` _(number)_ - ширина doughnut'a.
+ `duration` _(number)_ - время анимации в миллисекундах.
+ `start` _(number [0..360])_ - начальный угол в градусах.

#### Значения по умолчанию

    doughnut: false
    doughnutWidth: radius / 2
    duration: 1000
    start: 0

#### Пример

    var pieGraphModel = {};

    pieGraphModel.data = [
        {
            color: 'red',
            value: 30
        },
        {
            color: 'orange',
            value: 30
        },
        {
            color: 'teal',
            value: 30
        }
    ];

    pieGraphModel.options = {
        doughnut: true,
        doughnutWidth: 70,
        duration: 2000,
        start: 90
    };

    scope.pieGraphModel = pieGraphModel;

Анимация происходит автоматически при заходе на слайд. Чтобы перерисовать чарт с новыми `data` и `options` нужно в `scope.pieGraphModel` присвоить новый объект.

[barsHash]: #toc_1
[linearHash]: #toc_10
[pieHash]: #toc_16

[verticalGraph]: https://dl.dropboxusercontent.com/u/66921881/vertical.jpg
[horizontalGraph]: https://dl.dropboxusercontent.com/u/66921881/horizontal.jpg
[revertGraph]: https://dl.dropboxusercontent.com/u/66921881/revert.jpg
[mixedGraph]: https://dl.dropboxusercontent.com/u/66921881/mixed.jpg

[linear]: https://dl.dropboxusercontent.com/u/66921881/linear.jpg

[pie]: https://dl.dropboxusercontent.com/u/66921881/pie.png
[doughnut]: https://dl.dropboxusercontent.com/u/66921881/doughnut.png