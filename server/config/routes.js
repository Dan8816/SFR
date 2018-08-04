module.exports = app => {
// root route
app.get('/', function (req, res){
  if (!req.session.visitNum){
    req.session.visitNum = 1;
  }
  else{
    req.session.visitNum += 1;
  }
  page = {title:"Survey Form", message: "Please submit your information", counter: req.session.visitNum, locations: ["San Jose", "Seattle", "Tulsa", "Chicago", "Dallas", "New York", "Distric of Columbia", "Los Angeles"], langs: ["javascript", "HTML/CSS", "Python", "C#"], fwks: ["Flask", "Django", "ASP.Net Core", "Node"], dbs:["MySQL", "MySQL with Django ORM", "MySql with ASP.Net Core Dapper", "MySql with ASP.Net Core Linq"], instructor: ["Phill", "Mason", "Donovan", "DanO", "Speros"]}
  res.render('index', page);
  });
app.post('/submitInfo', function (req, res){
  //console.log("POST DATA \n\n" req.body);
  req.session.name = req.body.name;
  req.session.loc = req.body.location;
  req.session.lang = req.body.language;
  req.session.db = req.body.database;
  req.session.frame = req.body.framework;
  req.session.instructor = req.body.instructor;
  req.session.comment = req.body.comment;
  res.redirect('/results');
  });
app.get('/results', function (req, res){
  page = {title:"Your Info", message:"Thanks for you information", name:req.session.name, loc:req.session.loc, lang:req.session.lang, db:req.session.db, frame:req.session.fram, instructor:req.session.instructor, comment:req.session.comment};
  res.render('YourInfo', page);
});
}
