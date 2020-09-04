var unirest = require("unirest");

var req = unirest("POST", "https://price-history-charts.p.rapidapi.com/ProductHistory");

req.query({
	"product_url": "https://www.flipkart.com/fault-our-stars/p/itmfc3vjrhncy9ub?pid=9780737642018&lid=LSTBOK9780737642018UFQOJJ&marketplace=FLIPKART&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_na&fm=SEARCH&iid=55209e06-692b-47f8-abc6-e8c85a5a5684.9780737642018.SEARCH&ppt=sp&ppn=sp&ssid=t7vzyserr40000001599130811443&qH=9687dcaeb62433cb"
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