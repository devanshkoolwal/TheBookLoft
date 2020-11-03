var express = require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var Book=require("./models/book");
var userBook=require("./models/bookuser");
var unirest = require("unirest");
const { render } = require("ejs");
var amazon={
    curr_price:200,
    data:[[1567191969000,26380],[1567276858000,26289],[1567366813000,26380],[1567449006000,26289],[1567535663000,26289],[1567638728000,26380],[1567709295000,26380],[1567796170000,25850],[1567883414000,25850],[1567976645000,26380],[1568060893000,25850],[1568142136000,26380],[1568237644000,26380],[1568316257000,25850],[1568400733000,25850],[1568507647000,23500],[1568577848000,25850],[1568659845000,23500],[1568770087000,25850],[1568866224000,23500],[1568950810000,23490],[1569007806000,23100],[1569124690000,23100],[1569181926000,23100],[1569300490000,23100],[1569356766000,22000],[1569445326000,22000],[1569523693000,22000],[1569610244000,22000],[1569701659000,22000],[1569783024000,22000],[1569870655000,21999],[1569960264000,21999],[1570041766000,21999],[1570131155000,19915.2],[1570217655000,21499],[1570302029000,22000],[1570387593000,23499],[1570473382000,23500],[1570560511000,21999],[1570646198000,21900],[1570732700000,21900],[1570823654000,21900],[1570915819000,21900],[1570992208000,21900],[1571078692000,21900],[1571165100000,20761.9],[1571251101000,24499],[1571399663000,24499],[1571424150000,23499],[1571532167000,20519],[1571599444000,20894],[1571683530000,20500],[1571769620000,20500],[1571856433000,17711],[1571942565000,20500],[1572029206000,20500],[1572118829000,21795],[1572204904000,18470.3],[1572288081000,21653],[1572375201000,21790],[1572462215000,21653],[1572546961000,21653],[1572636403000,21653],[1572723526000,21790],[1572806853000,21653],[1572894892000,21653],[1572979501000,21700],[1573066626000,20500],[1573154083000,21000],[1573244190000,21000],[1573327773000,21000],[1573410960000,21000],[1573499574000,21000],[1573589097000,21000],[1573670345000,20500],[1573756641000,20500],[1573842988000,21399],[1573929521000,21399],[1574016342000,21390],[1574102395000,21375],[1574188980000,21375],[1574275581000,21373],[1574364999000,21373],[1574447966000,21300],[1574534117000,21300],[1574621050000,21199],[1574708606000,21185],[1574794501000,21173],[1574880867000,21169]]

};
var flipkart={

    curr_price:200,
    data:[[1567191969000,26380],[1567276858000,26289],[1567366813000,26380],[1567449006000,26289],[1567535663000,26289],[1567638728000,26380],[1567709295000,26380],[1567796170000,25850],[1567883414000,25850],[1567976645000,26380],[1568060893000,25850],[1568142136000,26380],[1568237644000,26380],[1568316257000,25850],[1568400733000,25850],[1568507647000,23500],[1568577848000,25850],[1568659845000,23500],[1568770087000,25850],[1568866224000,23500],[1568950810000,23490],[1569007806000,23100],[1569124690000,23100],[1569181926000,23100],[1569300490000,23100],[1569356766000,22000],[1569445326000,22000],[1569523693000,22000],[1569610244000,22000],[1569701659000,22000],[1569783024000,22000],[1569870655000,21999],[1569960264000,21999],[1570041766000,21999],[1570131155000,19915.2],[1570217655000,21499],[1570302029000,22000],[1570387593000,23499],[1570473382000,23500],[1570560511000,21999],[1570646198000,21900],[1570732700000,21900],[1570823654000,21900],[1570915819000,21900],[1570992208000,21900],[1571078692000,21900],[1571165100000,20761.9],[1571251101000,24499],[1571399663000,24499],[1571424150000,23499],[1571532167000,20519],[1571599444000,20894],[1571683530000,20500],[1571769620000,20500],[1571856433000,17711],[1571942565000,20500],[1572029206000,20500],[1572118829000,21795],[1572204904000,18470.3],[1572288081000,21653],[1572375201000,21790],[1572462215000,21653],[1572546961000,21653],[1572636403000,21653],[1572723526000,21790],[1572806853000,21653],[1572894892000,21653],[1572979501000,21700],[1573066626000,20500],[1573154083000,21000],[1573244190000,21000],[1573327773000,21000],[1573410960000,21000],[1573499574000,21000],[1573589097000,21000],[1573670345000,20500],[1573756641000,20500],[1573842988000,21399],[1573929521000,21399],[1574016342000,21390],[1574102395000,21375],[1574188980000,21375],[1574275581000,21373],[1574364999000,21373],[1574447966000,21300],[1574534117000,21300],[1574621050000,21199],[1574708606000,21185],[1574794501000,21173],[1574880867000,21169]]

};


mongoose.connect("mongodb://localhost:27017/tbl_v3",{ useNewUrlParser: true,useUnifiedTopology: true });



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");  
app.use(express.static(__dirname+"/public"));



// var newBook={
//     name : "One Arranged Murder", 
//     author:"Chetan Bhagat", 
//     publisher:"Westland",
//     isbn: "1542094135",
//     description:"Ever since you found Prerna, I lost my best friend’ is what I told Saurabh. Hi, this is Keshav, and Saurabh, my best friend, flatmate, colleague and business partner, won’t talk to me. Because I made fun of him and his fiancée. Saurabh and Prerna will be getting married soon. It is an arranged marriage. However, there is more cheesy romance between them than any love-marriage couple. On Karva Chauth, she fasted for him. She didn’t eat all day. In the evening, she called him and waited on the terrace for the moon and for Saurabh to break her fast. Excited, Saurabh ran up the steps of her three-storey house. But when he reached … Welcome to One Arranged Murder, an unputdownable thriller from India’s highest-selling author. A story about love, friendship, family and crime, it will keep you entertained and hooked right till the end.",
//     genre:"crime",
//     language:"English",
//     image_link:"https://images-na.ssl-images-amazon.com/images/I/51D5WCAoebL._SX310_BO1,204,203,200_.jpg",
//     ecommerce_available: "Yes",
//     amazon_link: "https://www.amazon.in/One-Arranged-Murder-Chetan-Bhagat/dp/1542094135/ref=sr_1_2_sspa?dchild=1&keywords=crime+books&qid=1603427637&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyNUowNzI4NlpNNU9VJmVuY3J5cHRlZElkPUEwMDE4MzA2NFcwSUdLV0lPVk9LJmVuY3J5cHRlZEFkSWQ9QTA3ODcyMjczT1RBWTA2NTNDNDc4JndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
//     flipkart_link: "https://www.flipkart.com/one-arranged-murder/p/itmb4cd0197e98ce?pid=9781542094139&lid=LSTBOK9781542094139A5FY6R&marketplace=FLIPKART&srno=s_1_1&otracker=search&otracker1=search&fm=SEARCH&iid=28b114c2-e559-46b2-b96b-0882898b348c.9781542094139.SEARCH&ppt=sp&ppn=sp&ssid=ngcav2i3dc0000001603427842670&qH=d4c8614d1e6f2c74",
//     amazon_aff: "https://www.amazon.in/One-Arranged-Murder-Chetan-Bhagat/dp/1542094135/ref=sr_1_2_sspa?dchild=1&keywords=crime+books&qid=1603427637&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyNUowNzI4NlpNNU9VJmVuY3J5cHRlZElkPUEwMDE4MzA2NFcwSUdLV0lPVk9LJmVuY3J5cHRlZEFkSWQ9QTA3ODcyMjczT1RBWTA2NTNDNDc4JndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
//     flipkart_aff: "https://www.flipkart.com/one-arranged-murder/p/itmb4cd0197e98ce?pid=9781542094139&lid=LSTBOK9781542094139A5FY6R&marketplace=FLIPKART&srno=s_1_1&otracker=search&otracker1=search&fm=SEARCH&iid=28b114c2-e559-46b2-b96b-0882898b348c.9781542094139.SEARCH&ppt=sp&ppn=sp&ssid=ngcav2i3dc0000001603427842670&qH=d4c8614d1e6f2c74"
    
//     };

//     Book.create(newBook,function(err, added){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(added);
//         }
//     });


    app.get("/", function(req,res){
        Book.find({}, function(err,allBooks){
            if(err){
                console.log(err);
            }
            else{
                
                res.render("index" , {books:allBooks}); 
            }
        })
       
    });

    

    app.get("/book/:id" , function(req,res){
        Book.findById(req.params.id ,function(err, foundBook){
            if(err){
                console.log(err);
            } else{
                // var req = unirest("POST", "https://price-history-charts.p.rapidapi.com/ProductHistory");
                
                // req.query({
                //     "product_url": foundBook.amazon_link
                // });

                // req.headers({
                //     "x-rapidapi-host": "price-history-charts.p.rapidapi.com",
                //     "x-rapidapi-key": "60a9b91ee2msh527c782534f5b2ep1568ffjsn96cd42d1d0fa",
                //     "content-type": "application/x-www-form-urlencoded",
                //     "useQueryString": true
                // });
                
                // req.form({});
                
                // req.end(function (res) {
                //     // if (res.error) throw new Error(res.error);
                
                //     amazon=JSON.parse(JSON.stringify(res.body));
                // });


                // req.query({
                //     "product_url": foundBook.flipkart_link
                // });
                // // devansh 00d13575e6msh797551bc859ba94p1f59bfjsn43fcfdc4f737
                // // poojitha 60a9b91ee2msh527c782534f5b2ep1568ffjsn96cd42d1d0fa

                // req.headers({
                //     "x-rapidapi-host": "price-history-charts.p.rapidapi.com",
                //     "x-rapidapi-key": "60a9b91ee2msh527c782534f5b2ep1568ffjsn96cd42d1d0fa",
                //     "content-type": "application/x-www-form-urlencoded",
                //     "useQueryString": true
                // });
                
                // req.form({});
                
                // req.end(function (res) {
                //     // if (res.error) throw new Error(res.error);
                
                //     flipkart=JSON.parse(JSON.stringify(res.body));
                //     console.log(flipkart);
                // });

                
                res.render("book", {book:foundBook ,amazondata: amazon,flipkartdata :flipkart});
        
            }
        });
        
    });


    app.get("/category/:category", function(req,res){
        Book.find({genre: req.params.category}, function(err,foundBook){
            if(err)
                console.log(err);
            else    
                res.render("index", {books: foundBook});
        })
    });

    app.get("/launch", function(req,res){
        res.render("launch");
    });

    app.post("/launch",function(req,res){
        userBook.create(req.body.bookuser, function(err, createdBook){
            if(err)
                console.log(err);
            else{
                // console.log(createdBook);
                
                res.redirect("/");


            }
        })

    });

    app.get("/validatebook", function(req,res){
            userBook.find({},function(err,foundbook){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("validatebook",{books:foundbook});
                }
            });
    });


    app.post("/validatebook",function(req,res){
        
        
        Book.create(req.body.newbook,function(err,addedbook){
            if(err){
                console.log(err);
            }
            else{
                console.log(req.body.newbook);
                userBook.findByIdAndRemove(req.body.bookid,function(err){
                    
                    res.redirect("validatebook");   
                });
                
            }
        });
    });






app.listen(2609,function(){
    console.log("Book Loft at 2609");
});