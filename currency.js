var localOffset;

//console.log( new Date());

var day = new Date().getDate();
var month = new Date().getMonth();
console.log(month);
var year = new Date().getFullYear();
var months = ["January","February","March","April","May","June","July","August","September","Oktober","Nowember","December"];

document.getElementById("dateInfo").innerHTML = `${day} ${months[month]} ${year}`;

setInterval( () => {
    var loctime = new Date().toLocaleTimeString();
    // console.log('loctime :', loctime)
    document.getElementById("localTime").innerHTML = loctime
}, 1000);




document.getElementById('submit').addEventListener('click', calculateCurrency);

function calculateCurrency () {

    var mevcut1 = $( "#doviz" ).val();
    var cevrilecek1 = $( "#cevrilecekDoviz" ).val();

    var tutarDoviz = document.getElementById('tutar').value;

    console.log(mevcut1);
    console.log(cevrilecek1);

    // yvz10346@gmail.com API key: AMQ512N4W3KU20TB. Please record this API key for future access to Alpha Vantage.
    // & ile istediğimiz kadar parametre verebiliyoruz

    var url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${mevcut1}&to_currency=${cevrilecek1}&apikey=MMVOSLDS608KR66B`;
                                                         
    fetch(url)
        .then( response => response.json())
        .then( data => {
            console.log(data);
            //document.getElementById('sorguekrani').style.display = 'none';

            var fromCurrencyCode = data["Realtime Currency Exchange Rate"]["1. From_Currency Code"];
            var fromCurrencyName = data["Realtime Currency Exchange Rate"]["2. From_Currency Name"];

            var toCurrencyCode = data["Realtime Currency Exchange Rate"]["3. To_Currency Code"];
            var toCurrencyName = data["Realtime Currency Exchange Rate"]["4. To_Currency Name"];

            var exchangeRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

            var lastRefreshed = data["Realtime Currency Exchange Rate"]["6. Last Refreshed"]

            var sonuc = (tutarDoviz*exchangeRate).toFixed(2);


            // to be able to show div block (display: block)
            document.getElementById('show').style.display = 'block';

            document.getElementById('alt').innerHTML = `1 ${fromCurrencyCode}  =  ${exchangeRate} ${toCurrencyCode}`;

            document.getElementById('tutarAlt').innerHTML = `Tutar : ${tutarDoviz} ${fromCurrencyCode}`;
            document.getElementById('cevrilenAlt').innerHTML = `Çevrilen Tutar : ${sonuc} ${toCurrencyCode}`;
        })
        .catch( error => console.log(error))       
}