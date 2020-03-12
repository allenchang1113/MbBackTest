module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=10)}([function(e,r,t){"use strict";var n=t(1),o=t.n(n);t(12).config();const s=o.a.object().keys({NODE_ENV:o.a.string().default("development").allow(["development","production"]),PORT:o.a.number().default(8080),MYSQL_PORT:o.a.number().default(3306),MYSQL_HOST:o.a.string().default("127.0.0.1"),MYSQL_USER:o.a.string(),MYSQL_PASS:o.a.string(),MYSQL_NAME:o.a.string(),VERSION:o.a.string()}).unknown().required(),{error:a,value:i}=o.a.validate(process.env,s);if(a)throw new Error(`Config validation error: ${a.message}`);const c={version:i.VERSION,env:i.NODE_ENV,port:i.PORT,mysqlPort:i.MYSQL_PORT,mysqlHost:i.MYSQL_HOST,mysqlUserName:i.MYSQL_USER,mysqlPass:i.MYSQL_PASS,mysqlDatabase:i.MYSQL_DATABASE};r.a=c},function(e,r){e.exports=require("joi")},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("mysql")},function(e,r){e.exports=require("express-validation")},function(e,r){e.exports=require("bcrypt")},function(e,r){e.exports=require("body-parser")},function(e,r,t){"use strict";var n=t(2),o=t.n(n),s=t(6),a=t.n(s),i=t(8),c=t.n(i),u=t(9),l=t.n(u),d=t(0),m=t(3),p=t.n(m),f=t(4),y=t.n(f);const g=p.a.createPool({connectionLimit:10,host:d.a.mysqlHost,user:d.a.mysqlUserName,password:d.a.mysqlPass,database:d.a.mysqlDatabase});var _=e=>new Promise((r,t)=>{g.getConnection((n,o)=>{n?t(n):o.query("INSERT INTO Article SET ?",e,(e,n)=>{e?(console.error("SQL error: ",e),t(e)):1===n.affectedRows&&r(`新增成功！ article_id: ${n.insertId}`),o.release()})})}),b=()=>new Promise((e,r)=>{g.getConnection((t,n)=>{t?r(t):n.query("SELECT\n                *\n              FROM\n                Article",(t,o)=>{t?(console.error("SQL error: ",t),r(t)):e(o),n.release()})})}),q=(e,r)=>new Promise((t,n)=>{g.getConnection((o,s)=>{o?n(o):s.query("UPDATE Article SET ? WHERE article_id = ?",[e,r],(e,r)=>{e?(console.error("SQL error: ",e),n(e)):0===r.affectedRows?t("請確認修改Id！"):r.message.match("Changed: 1")?t("資料修改成功"):t("資料無異動"),s.release()})})}),S=e=>new Promise((r,t)=>{g.getConnection((n,o)=>{n?t(n):o.query("DELETE FROM Article WHERE article_id = ?",e,(e,n)=>{e?(console.error("SQL error: ",e),t(e)):1===n.affectedRows?r("刪除成功！"):r("刪除失敗！"),o.release()})})});var E=(e,r)=>{const t=e.body;_(t).then(e=>{r.send(e)}).catch(e=>r.send(e))},h=(e,r)=>{b().then(e=>{r.send(e)}).catch(e=>r.send(e))},P=(e,r)=>{const t=e.params.article_id,n=e.body;q(n,t).then(e=>{r.send(e)}).catch(e=>r.send(e))},v=(e,r)=>{const t=e.params.article_id;S(t).then(e=>{r.send(e)}).catch(e=>r.send(e))},w=t(1),O=t.n(w),R={createArticle:{body:{user_id:O.a.number().required(),article_title:O.a.string().required(),article_tag:O.a.string().required(),article_content:O.a.string().min(20).required()}},createUser:{body:{user_name:O.a.string().required(),user_mail:O.a.string().email().trim().required(),user_password:O.a.string().regex(/[a-zA-Z0-9]{6,30}$/).required()}}};const L=o.a.Router();L.route("/").post(y()(R.createArticle),E).get(h),L.route("/:article_id").put(P).delete(v);var T=L,x=t(5),M=t.n(x);const Q=p.a.createPool({connectionLimit:10,host:d.a.mysqlHost,user:d.a.mysqlUserName,password:d.a.mysqlPass,database:d.a.mysqlDatabase});var C=e=>new Promise((r,t)=>{Q.getConnection((n,o)=>{n?t(n):o.query("INSERT INTO User SET ?",e,(e,n)=>{e?(console.error("SQL error: ",e),t(e)):1===n.affectedRows&&r(`新增成功！ user_id: ${n.insertId}`),o.release()})})}),j=()=>new Promise((e,r)=>{Q.getConnection((t,n)=>{t?r(t):n.query("SELECT\n            *\n          FROM\n            User",(t,o)=>{t?(console.error("SQL error: ",t),r(t)):e(o),n.release()})})}),A=(e,r)=>new Promise((t,n)=>{Q.getConnection((o,s)=>{o?n(o):s.query("UPDATE User SET ? WHERE user_id = ?",[e,r],(e,r)=>{e?(console.error("SQL error: ",e),n(e)):0===r.affectedRows?t("請確認修改Id！"):r.message.match("Changed: 1")?t("資料修改成功"):t("資料無異動"),s.release()})})}),N=e=>new Promise((r,t)=>{Q.getConnection((n,o)=>{n?t(n):o.query("DELETE FROM User WHERE user_id = ?",e,(e,n)=>{e?(console.error("SQL error: ",e),t(e)):1===n.affectedRows?r("刪除成功！"):r("刪除失敗！"),o.release()})})}),U=e=>new Promise((r,t)=>{Q.getConnection((n,o)=>{n?t(n):o.query("SELECT * FROM User WHERE user_mail = ?",e.user_mail,(n,s)=>{if(n)console.error("SQL error: ",n),t(n);else if(0===Object.keys(s).length)r("信箱尚未註冊！");else{const t=s[0].user_password,n=e.user_password;M.a.compare(n,t).then(e=>{r(e?"登入成功":"您輸入的密碼有誤！")})}o.release()})})});var D=(e,r)=>{const t={user_name:e.body.user_name,user_mail:e.body.user_mail,user_password:M.a.hashSync(e.body.user_password,10)};C(t).then(e=>{r.send(e)}).catch(e=>r.send(e))},H=(e,r)=>{j().then(e=>{r.send(e)}).catch(e=>r.send(e))},I=(e,r)=>{const t=e.params.user_id,n=e.body;A(n,t).then(e=>{r.send(e)}).catch(e=>r.send(e))},Y=(e,r)=>{const t=e.params.user_id;N(t).then(e=>{r.send(e)}).catch(e=>r.send(e))},$=(e,r)=>{const t=e.body;U(t).then(e=>{r.send(e)}).catch(e=>r.send(e))};const k=o.a.Router();k.route("/").get(H).post(y()(R.createUser),D),k.route("/:user_id").put(I).delete(Y),k.route("/login").post($);var F=k;const W=o.a.Router();W.get("/",(e,r)=>{r.send(`此路徑是: localhost:${d.a.port}/api`)}),W.get("/sqlTest",(e,r)=>{p.a.createPool({connectionLimit:10,host:d.a.mysqlHost,user:d.a.mysqlUserName,password:d.a.mysqlPass,database:d.a.mysqlDatabase}).getConnection((e,t)=>{e?(r.send(e),console.log("連線失敗！")):(r.send("連線成功！"),console.log(t))})}),W.use("/article",T),W.use("/user",F);var V=W;const z=o()();z.use(a.a.json()),z.use(a.a.urlencoded({extended:!0})),z.get("/",(e,r)=>{r.send(`server started on  port http://127.0.0.1:${d.a.port} (${d.a.env})`)}),z.use(c()()),z.use(l()("dev")),z.use("/api",V);r.a=z},function(e,r){e.exports=require("cors")},function(e,r){e.exports=require("morgan")},function(e,r,t){"use strict";t.r(r),function(e){var n=t(0),o=t(7);e.parent||o.a.listen(n.a.port,()=>{console.log(`server started on  port http://127.0.0.1:${n.a.port} (${n.a.env})`)}),r.default=o.a}.call(this,t(11)(e))},function(e,r){e.exports=function(e){if(!e.webpackPolyfill){var r=Object.create(e);r.children||(r.children=[]),Object.defineProperty(r,"loaded",{enumerable:!0,get:function(){return r.l}}),Object.defineProperty(r,"id",{enumerable:!0,get:function(){return r.i}}),Object.defineProperty(r,"exports",{enumerable:!0}),r.webpackPolyfill=1}return r}},function(e,r){e.exports=require("dotenv")}]);