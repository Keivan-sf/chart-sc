# chart-sc
A simple module to get screen shots of charts/statistics from websites like tradingview.com

## Usage

### Setting up
```js
const { Chart , Technical } = require('chart-sc');
```

### Getting a token's chart image
```js

let chartImage = await new Chart('BTCUSDT')
.setStyle("dark")
.setTimeFrame("daily")
.save("./chart.png")

console.log(chartImage)

```
output: (The image path after being created)
```
./chart.png
```

### Getting technical summery of a token from TradingView

```js
let technicalImage = await new Technical('BTC')   // Technical class DOSE NOT accept pairs like 'BTSUSD'
.setStyle("dark")
.setTimeFrame("2h")     // Technical class DOSE NOT accept '3h' timeframe
.save("./technical.png")

console.log(chartImage)
```
output: (The image path after being created)
```
./technical.png
```
