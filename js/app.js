const logo = document.getElementById('logo')
const key = document.getElementById('key')
const secretKey = document.getElementById('sekret-key')
const symbol = document.getElementById('symbolInput')
const btnGetSymbol = document.getElementById('getSymbol')
const btcTrades = document.getElementById('btcTrades')
const cointTrades = document.getElementById('cointTrades')
const btnSave = document.getElementById('btnSave')
const deposit = document.getElementById('deposit')
const risk = document.getElementById('risk')
const stopLoss = document.getElementById('stopLoss')
const btnStopLoss = document.getElementById('btnStopLoss')
const positionSize = document.getElementById('positionSize')

const params = new URLSearchParams(window.location.search);
const param1 = params.get("param1"); // Получаем значение параметра "param1"
const param2 = params.get("param2"); // Получаем значение параметра "param2"


const modal = document.getElementById("myModal");
const btn = document.getElementById("btnPattern");
const span = document.getElementsByClassName("close")[0];
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const patternSelect = document.getElementById("pattern");

// Функция для загрузки JSON данных
function loadPatternDescriptions(callback) {
    fetch('patterns.json')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Ошибка загрузки JSON:', error));
}

// Когда пользователь нажимает на кнопку, открывается модальное окно
btn.onclick = function() {
    const selectedPattern = patternSelect.value;

    if (selectedPattern) {
        console.log(111)
        loadPatternDescriptions(function(data) {
            const selectedDescription = data[selectedPattern];
            modalTitle.textContent = selectedPattern; // Устанавливаем заголовок
            modalDescription.innerHTML = selectedDescription; // Устанавливаем описание как HTML
            console.log(selectedDescription)
            modal.style.display = "block"; // Показываем модальное окно
        });
    } else {
        alert("Пожалуйста, выберите паттерн."); // Сообщение, если паттерн не выбран
    }
}

// Когда пользователь нажимает на крестик (x), закрывается модальное окно
span.onclick = function() {
    modal.style.display = "none";
}

// Когда пользователь нажимает где-то вне модального окна, оно также закрывается
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const GetSymbol = (symbol) => {
    //logo.textContent = symbol
    getTradeCount(symbol)
    calculateCorrelation(symbol)
    updateSymbol(`BINANCE:${symbol}.P`)
    updateSymbol2(`BINANCE:${symbol}.P`)
    document.getElementById('symbolInput').value = symbol
}

btnStopLoss.onclick = () => {
    if (deposit.value && risk.value && stopLoss.value) {
        positionSize.textContent = `Размер ставки: ${+deposit.value * (+risk.value / +deposit.value * 100) / +stopLoss.value}`
    }
    else {
        positionSize.textContent = `Заполни поля`
    }
}

btnSave.onclick = () => {
    const positionData = {
        symbol: document.getElementById('symbolInput').value,
        btc: btcTrades.textContent,
        coint: cointTrades.textContent,
        url: document.getElementById('url').value,
        incomePro: document.getElementById('income%').value,
        incomeDol: document.getElementById('income$').value,
        myError: document.getElementById('myError').value,
        conclusion: document.getElementById('conclusion').value,
        comment: document.getElementById('comment').value,
        basis_1: document.getElementById('basis_1').value,
        basis_2: document.getElementById('basis_2').value,
        basis_3: document.getElementById('basis_3').value,
        basis_4: document.getElementById('basis_4').value,
        pattern: document.getElementById('pattern').value,
        corel: document.getElementById('correl').textContent
    }
    //console.log(positionData)
    saveText(positionData)
}

async function getTradeCount(tradeSynbol) {

    const url = `https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=${tradeSynbol}`;
    console.log(tradeSynbol)
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const tradeCount = data.count;
        console.log(`Number of trades for ${tradeSynbol} in the last 24 hours: ${tradeCount}`);
        cointTrades.textContent = `${tradeSynbol}: ${(tradeCount / 1000000).toFixed(1)} M`
    } catch (error) {
        console.error('Error fetching trade count:', error);
    }
    const urlBtc = `https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=BTCUSDT`;

    try {
        const response = await fetch(urlBtc);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const tradeCount = data.count;
        btcTrades.textContent = `BTCUSDT: ${(tradeCount / 1000000).toFixed(1)} M`
    } catch (error) {
        console.error('Error fetching trade count:', error);
    }
}

function openNewPage(url) {
    if (url === 'TV') {
        const tvSymbol = document.getElementById('logo').textContent
        url = `https://ru.tradingview.com/chart/e8I7WHtC/?symbol=BINANCE%3A${tvSymbol}.P`
        window.open(url, '_blank')
    }
    else {
        window.open(url, '_blank')
    }
    
}



console.log('qqqqqqqqqqqqqqq', param1)
if (param1) {
    GetSymbol(param1)
}