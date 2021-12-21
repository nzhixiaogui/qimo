const express = require("express")
const app=express()
const mongoose = require('mongoose');
const ejs = require('ejs')
router = express.Router();
mongoose.connect('mongodb://172.21.2.236:27017/190110910815');

const path = require('path');
const schema={
   username:String,
   password:String,
   sex:String,
   love_animal:String,
   property:String
}
const User = mongoose.model('users', schema);
var usern;
//module.exports = User;
// const kitty = new mydata({ name: 'testZildjian3' });
// kitty.save()
// router.get('/', function(req, res, next) {
//     res.redirect('/home');
// });

// router.get('/home', function(req, res) {
//     res.render('home');
// })
// view engine setup
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
    ejs.renderFile("public/anilist.html",{returnName:name},(err,str)=>{
        res.send(str)
    })
})
    
app.listen(08150)