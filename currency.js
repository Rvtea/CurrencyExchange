function currencyExchange(sourceCurrencyNumber, exchange) {
    var targetCurrencyNumber = [];
    targetCurrencyNumber = exchange.map((x) => x * sourceCurrencyNumber);
    return targetCurrencyNumber;
}

$(function() {
    var vm1 = new Vue({
        el: '#inputNumber',
        data: {
            sourceCurrencyNumber: document.getElementById("inputNumber").value
        }
    });
    var vm2 = new Vue({
        el: '#currencies', // can use v-for to realize
        computed: {
            targetCurrencyNumber: function() {
                let exchange = [1, 2, 6.7]; // need to obtain from api
                return currencyExchange(vm1.sourceCurrencyNumber, exchange);
            }
        }
    });
});