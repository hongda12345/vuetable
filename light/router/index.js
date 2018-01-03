var light=require("ueklight");
var router=light.Router();
var mysql=require("./mysql");
router.get("/",function(req,res){
    res.render("index.html",{name:"root"});
});
router.get("/fetch",function (req,res) {
    mysql.query("select * from app",function (err,result) {
        if(err){
            res.end()
        }else{
            res.send(JSON.stringify(result))
        }
    })
})
router.get("/addcon",function (req,res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    mysql.query(`insert into app (name,age,sex) values ('${name}','${age}','${sex}')`,function (err,result) {
        if(err){
            res.end('err')
        }else{
            res.end('ok')
        }
    })
})
router.get("/del/:id",function (req,res) {
    var id=req.params.id;
    mysql.query("delete from app where id="+id,function (err,result) {
        if(err){
            res.end('err')
        }else{
            res.end('ok')
        }
    })
})
router.get("/edit/:id",function (req,res) {
    var id=req.params.id;
    mysql.query("select * from app where id="+id,function (err,result) {
        if(err){
            res.end('err')
        }else{
            res.send(JSON.stringify(result))
        }
    })
})
router.get("/editcon",function (req,res) {
    var id=req.query.id;
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    mysql.query(`update app set name='${name}',age='${age}',sex='${sex}' where id=${id}`,function (err,result) {
        if(err){
            res.end('err')
        }else{
            res.send(JSON.stringify(result))
        }
    })
})
