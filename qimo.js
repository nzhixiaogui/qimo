const express = require("express")
const app=express()
const mongoose = require('mongoose');
const ejs = require('ejs')
router = express.Router();
mongoose.connect('mongodb://172.21.2.236:27017/190110910815');

const path = require('path');
const schema0={
   username:String,
   password:String,
   sex:String,
   love_animal:String,
   property:String
}
const User = mongoose.model('users', schema0);
const schema1={
    name:String,
    sex:String,
    age:String,
    animal:String,
    variety:String,
    vaccine:String,
    phone:Number,
    other:String,
    index:Number
 }
 const Ani = mongoose.model('animals', schema1);
var usern;
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.get('/home', function(req, res) {
    var name = usern.username.toString();
    ejs.renderFile("public/home.html",{returnVal:name},(err,str)=>{
        res.send(str)
    })
})

app.get('/LoginAction', function(req, res) {
    var usn = req.query.username;
    var pwd = req.query.password;
    User.findOne({username: usn}, function (err, content) {
        if (content == null) {
                console.log('登录失败！');
                console.log(err);
                //res.send({ succeed: false, message: '注册失败！' });
                ejs.renderFile("public/index1.html",{returnVal:"不存在该用户名 登录失败！"},(err,str)=>{
                res.send(str)
            })
        } else {
            var cpwd = content.password;
            console.log(cpwd)
            if (pwd == cpwd) {
                console.log('登录成功！')
                usern = content
                var name = usern.username.toString();
                ejs.renderFile("public/home.html",{returnVal:name},(err,str)=>{
                    res.send(str)
                })
            } else  {
                console.log('登录失败！')
                ejs.renderFile("public/index1.html",{returnVal:"密码错误 登录失败！"},(err,str)=>{
                    res.send(str)
                })
            }
        }
    });
})

app.get('/myInfo', function(req, res) {
    var name = usern.username.toString();
    var password = usern.password.toString();
    var sex = usern.sex.toString();
    var love = usern.love_animal.toString();
    var ppt = usern.property.toString();

    ejs.renderFile("public/myInfo.html",{usern:name,userp:password,users:sex,userl:love,userpp:ppt},(err,str)=>{
        res.send(str)
    })
 })

router.get('/LogOut', function(req, res) {
    res.redirect('index.html');
})
app.get('/RegAction', function(req, res) {
    var usn = req.query.username;
    var pwd = req.query.password;
    var sex = req.query.sex;
    var lva = req.query.love_animal;
    var ppt = req.query.property;
    User.findOne({ username: usn }, function(err, result) {
            if (result != null) {
                console.log("用户名重复！")
                ejs.renderFile("public/reg1.html",{returnVal:"用户名重复 注册失败！"},function(err,str){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.setHeader('Content-Type','text/html');
                        res.send(str);
                    }
                })
            } else {
                User.create({
                    username:usn,
                    password: pwd,
                    sex:sex,
                    love_animal:lva,
                    property:ppt
                }, function(err1, doc) {
                    if (err1) {
                        console.log('注册失败！')
                        console.log(err1);
                        //res.send({ succeed: false, message: '注册失败！' });
                        ejs.renderFile("public/reg1.html",{returnVal:"注册失败！"},(err,str)=>{
                            res.send(str)
                        })
                    } else {
                        console.log('注册成功！')
                        ejs.renderFile("public/index1.html",{returnVal:"注册成功！"},(err,str)=>{
                            res.send(str)
                        })
                        //res.send({ succeed: true, message: '注册成功！' });
                        //res.redirect('login.html');
                    }
                })
            }
    })
})
app.get('/reg', function(req, res) {
    var name = usern.username.toString();
    ejs.renderFile("public/reg2.html",{returnName:name},(err,str)=>{
        res.send(str)
    })
})

app.get('/RegAction1', function(req, res) {
    var name = usern.username.toString();
    var usn = req.query.username;
    var pwd = req.query.password;
    var sex = req.query.sex;
    var lva = req.query.love_animal;
    var ppt = req.query.property;
    User.findOne({ username: usn }, function(err, result) {
            if (result != null) {
                console.log("用户名重复！")
                ejs.renderFile("public/reg3.html",{returnVal:"用户名重复 注册失败！",returnName:name},function(err,str){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.setHeader('Content-Type','text/html');
                        res.send(str);
                    }
                })
            } else {
                User.create({
                    username:usn,
                    password: pwd,
                    sex:sex,
                    love_animal:lva,
                    property:ppt
                }, function(err1, doc) {
                    if (err1) {
                        console.log('注册失败！')
                        console.log(err1);
                        //res.send({ succeed: false, message: '注册失败！' });
                        ejs.renderFile("public/reg3.html",{returnVal:"注册失败！",returnName:name},(err,str)=>{
                            res.send(str)
                        })
                    } else {
                        console.log('注册成功！')
                        ejs.renderFile("public/reg3.html",{returnVal:"注册成功！",returnName:name},(err,str)=>{
                            res.send(str)
                        })
                        //res.send({ succeed: true, message: '注册成功！' });
                        //res.redirect('login.html');
                    }
                })
            }
    })
})

app.get('/animallist', function(req, res) {
    var name = usern.username.toString();
    Ani.find(function(err,search){
        if(err){console.log("查找失败！")}
        else{
            console.log("查找成功！")
            ejs.renderFile("public/anilist.html",{returnName:name,searchani:search},(err,str)=>{
                res.send(str)
            })
        }
    })
})

app.get('/anipost', function(req, res) {
    var name = usern.username.toString();
    ejs.renderFile("public/anipost.html",{returnName:name},(err,str)=>{
        res.send(str)
    })
})

app.get('/apost', function(req, res) {
    var name = usern.username.toString();
    var aname = req.query.name;
    var sex = req.query.sex;
    var age = req.query.age;
    var ani = req.query.animal;
    var vari = req.query.variety;
    var vacc = req.query.vaccine;
    var ph = req.query.phone;
    var oth = req.query.other;
    var i;
    Ani.find(function(err,search){
        if(err){console.log("search失败！")}
        else{
            console.log("search成功！")
            i = search.length;
        }
    })
    console.log(i)
    // Ani.create({
    //     name:aname,
    //     sex:sex,
    //     age:age,
    //     animal:ani,
    //     variety:vari,
    //     vaccine:vacc,
    //     phone:ph,
    //     other:oth,
    //     index:i
    // }, function(err1, doc) {
    //     if (err1) {
    //         console.log('上传失败！')
    //         console.log(err1);
    //         ejs.renderFile("public/anipost1.html",{returnName:name,returnVal:"上传失败！"},(err,str)=>{
    //             res.send(str)
    //         })
    //     } else {
    //         console.log('上传成功！')
    //         ejs.renderFile("public/anipost1.html",{returnName:name,returnVal:"上传成功！"},(err,str)=>{
    //             res.send(str)
    //         })
    //     }
    // })
})

app.get('/more',function(req, res) {
    var name = usern.username.toString();
    var i = req.query.index
    console.log(i)
    Ani.findOne({index: i}, function (err, content) {
        if(err){console.log("查看详情失败！")}
        else{
            ejs.renderFile("public/aniinfo.html",{returnName:name,info:content},(err,str)=>{
                res.send(str)
            })
        }
    })
})
app.listen(08150)