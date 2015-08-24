// API at http://dev.markitondemand.com/#stockquote

function nFormatter(num, digits) {
  var si = [
    { value: 1E18, symbol: "E" },
    { value: 1E15, symbol: "P" },
    { value: 1E12, symbol: "T" },
    { value: 1E9,  symbol: "B" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "k" }
  ], i;
  for (i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.?0+$/, "") + si[i].symbol;
    }
  }
  return num;
}
console.log(nFormatter(123, 1));       // 123
console.log(nFormatter(1234, 1));      // 1.2k
console.log(nFormatter(100000000, 1)); // 100M
console.log(nFormatter(299792458, 1)); // 299.8M

$('form').submit(function (e) {

  	e.preventDefault();
    var symbol = $("#symbol").val();
  console.log('symbol', symbol)

$.ajax({
    dataType:'jsonp',
 url:'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol,
    data: symbol,
    processData: false,
    type: 'POST',

        // This will override the content type header,
        // regardless of whether content is actually sent.
        // Defaults to 'application/x-www-form-urlencoded'
        contentType: 'multipart/form-data',

        //Before 1.5.1 you had to do this:
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.overrideMimeType("multipart/form-data");
            }
        },
        // Now you should be able to do this:
        mimeType: 'multipart/form-data',    //Property added in 1.5.1
    /*url:'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=',*/
    success:function(data) {
      var space = ' ';
        $('h1').html(data.Name);
        $('h2').html(numeral(data.LastPrice).format('(0.00)'));

 $('h3').html([numeral(data.Change).format('(0.00)'), space, numeral((data.ChangePercent) / 100).format('(0.00%)')]);
      console.log('change%', data.ChangePercent)

      // ul - li list of Range, Open, Volume, Market Cap

 $('h5').html([numeral(data.High).format('(0.00)'), space, numeral(data.Low).format('(0.00)')]);
      console.log('High', data.High)
      console.log("Low", data.Low)

        $('h7').html(numeral(data.Open).format('(0.00)'));
      console.log(data.Open)
        $('h8').html(nFormatter(data.Volume, 1));
      console.log('volume', nFormatter(data.Volume, 1))
        $('h9').html(nFormatter(data.MarketCap,1));
        $('h10').html(
moment().calendar(data.Timestamp));

    }
  });
});
