var unirest = require("unirest");

var req = unirest("POST", "https://price-history-charts.p.rapidapi.com/ProductHistory");

req.query({
	"product_url": "https://www.amazon.in/Test-Exclusive-547/dp/B078BNQ318/ref=lp_21439725031_1_1?s=electronics&ie=UTF8&qid=1598948607&sr=1-1"
});

req.headers({
	"x-rapidapi-host": "price-history-charts.p.rapidapi.com",
	"x-rapidapi-key": "00d13575e6msh797551bc859ba94p1f59bfjsn43fcfdc4f737",
	"content-type": "application/x-www-form-urlencoded",
	"useQueryString": true
});

req.form({});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});