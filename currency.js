// currently we support 美元，欧元，港币，日元，英镑 as major currencies
var targetCurrenciesName = ['USD', 'EUR', 'HKD', 'GBP', 'JPY'];
var CurrencySymbol = {
    'USD': '$',
    'EUR': '€',
    'HKD': 'HK$',
    'GBP': '£',
    'JPY': 'JP¥'
};

function currencyExchange(sourceCurrencyNumber, exchange) {
    var targetCurrencies = [];
    // should let the results only shown with 1 number after decimal point
    exchange.forEach(function(elements, index, array) {
        return targetCurrencies.push([targetCurrenciesName[index], (sourceCurrencyNumber * elements).toFixed(1), CurrencySymbol[targetCurrenciesName[index]]]);
    });
    return targetCurrencies;
}

var quote;

$().ready(function() {
    // http://developer.yahoo.com/yql/console/?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22CNYUSD%22%2C%20%22CNYEUR%22%2C%20%22CNYHKD%22%2C%20%22CNYGBP%22%2C%20%22CNYJPY%22)&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
    $.ajax({
        url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22CNYUSD%22%2C%20%22CNYEUR%22%2C%20%22CNYHKD%22%2C%20%22CNYGBP%22%2C%20%22CNYJPY%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=quote",
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "quote"
    });
    quote = function(data) {
        var responseData = data.query.results.rate;
        // follow the sequence that targetCurrenciesName defines same as the response return to reduce process comlexity
        var exchanges = responseData.map((x) => x.Rate);
        var vm1 = new Vue({
            el: '#inputNumber',
            data: {
                sourceCurrencyNumber: document.getElementById("inputNumber").value
            }
        });
        var vm2 = new Vue({
            el: '#currencies', // can use v-for to realize
            computed: {
                targetCurrencies: function() {
                    return currencyExchange(vm1.sourceCurrencyNumber, exchanges);
                }
            }
        });
    };
});