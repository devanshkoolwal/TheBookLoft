var axios=require('axios');
var cherrio=require('cheerio');
const productURL = `https://www.flipkart.com/you-all-need/p/itmfa607496f9905?pid=9780143429388&lid=LSTBOK9780143429388SV2HPE&marketplace=FLIPKART&srno=s_1_1&otracker=search&otracker1=search&fm=SEARCH&iid=en_mv3KJ3uz61B7sMAow%2BNOLUoM5Lp8K1iDPsn%2FTpJogrGqB3hHVGg3lvueec00Vs5nS3SQhtwlLmvZ6KkzMcencg%3D%3D&ppt=sp&ppn=sp&ssid=svhr2kmyw00000001605423681077&qH=821f03288846297c`;

async function scrapePage() {
  const html = await getHTML(productURL);
  const amazonPrice = await getAmazonPrice(html);
  console.log(`The price is ${amazonPrice}`);
}

async function getHTML(productURL) {
  const { data: html } = await  axios.get(productURL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  return html;
}

async function getAmazonPrice(html) {
  const $ = cherrio.load(html)
  
  const span = $('._3qQ9m1')
  return span.html();
}

scrapePage();