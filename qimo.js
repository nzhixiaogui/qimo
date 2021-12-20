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
module.exports = User;
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

router.get('/', function(req, res) {
    console.log("主页跳转")
    res.redirect('login.html');
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
                var name = usn.toString();
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

// router.get('/turnreg', function(req, res) {
//     console.log("跳转至注册")
//     res.redirect('reg.html');
// })

// router.get('/RegAction', function(req, res) {
//     const kitty = new mydata({ name: req.query.num1,health:req.query.num2 });
//     console.log("reg跳转")
//     console.log(req.query.username)
//     console.log(req.query.password)
//     //res.redirect('home')
//     res.redirect('login.html');
// })
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
// app.get("/RegAction",(req,res)=>{
//     res.type('.html')
//     console.log(req.query.username)
//     console.log(req.query.password)
//     console.log(req.query.sex)
//     console.log(req.query.love_animal)
//     console.log(req.query.property)
//     //const kitty = new mydata({ name: req.query.num1,health:req.query.num2 });
//     //kitty.save()
//     // ejs.renderFile(filename, data, options, function(err, str){
//     //     // str => 输出渲染后的 HTML 字符串
//     // });
//     //ejs.renderFile("index.html",{returnName:"success"},(err,str)=>{
//     //    res.send(str)
//     //})
    
// })
/*登录功能*/
// app.get('/LoginAction', function(req, res){
//    console.log("登陆")
// })
app.listen(08150)