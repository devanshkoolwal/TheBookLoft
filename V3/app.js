var express = require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");
var Book=require("./models/book");
var unirest = require("unirest");



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
                var req = unirest("POST", "https://price-history-charts.p.rapidapi.com/ProductHistory");
                
                req.query({
                    "product_url": foundBook.amazon_link
                });

                req.headers({
                    "x-rapidapi-host": "price-history-charts.p.rapidapi.com",
                    "x-rapidapi-key": "00d13575e6msh797551bc859ba94p1f59bfjsn43fcfdc4f737",
                    "content-type": "application/x-www-form-urlencoded",
                    "useQueryString": true
                });
                
                req.form({});
                var amazon;
                req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                
                    console.log(res.body);
                });


                req.query({
                    "product_url": foundBook.flipkart_link
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

               
                res.render("book", {book:foundBook});
        
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
    })






app.listen(2609,function(){
    console.log("Book Loft at 2609");
});