var unirest = require("unirest");

var req = unirest("POST", "https://price-history-charts.p.rapidapi.com/ProductHistory");

req.query({
	"product_url": "https://www.amazon.in/International-Mathematics-Olympiad-Work-Class/dp/9389590558/ref=sxts_sxwds-deals_mod_primary_lightning_deal?cv_ct_cx=book&dchild=1&keywords=book&pd_rd_i=9389590558&pd_rd_r=f758a1b1-78ca-4af8-8ffe-7d23d71d4006&pd_rd_w=pE9ym&pd_rd_wg=lc0sm&pf_rd_p=e0fa732d-a255-43ac-9fcc-fe0f88286c0e&pf_rd_r=JQN73PV45MJ2KC6XFR6Q&psc=1&qid=1603277313&sbo=Tc8eqSFhUl4VwMzbE4fw%2Fw%3D%3D&smid=AT95IG9ONZD7S&sr=1-1-639fa736-8ebd-4159-8516-a629dca5da33"
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