/*
@蛋炒饭
App：盛读
变量名：sdck
变量：找到https://dj.palmestore.com/zycl/gold/dailyWelfareV5开头的连接，从usr到smboxid的值，多账号换行
ck要包含'usr','p1','p2','p3','p4','p5','p7','p9','p16','p21','p22','p25','p26','p28','p29','p30','p31','p33','p34','zyeid','pca','ku','kt','smboxid'等
定时：一天10次（每小时一次）,每天5毛左右
SJ为签到时间，自行设置
*/

NAME = "盛读";
VALY = ["sdck"];
CK = "";
LOGS = 0;
usid = 0;
SJ=9
var rs = require("jsrsasign");

const fs = require("fs");

nowhour = Math.round(new Date().getHours()).toString();
Notify = 0;
Key = "-----BEGIN PRIVATE KEY-----\nMIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAMXGjyS3p+3AVnlBJe5VQ6tC9inh8tVBve4r+yBjC5HQD6th2n3tSyuNVYaNRAFSEq+OENwnwwhjbYUnjLWb+qZscB43K1+4/WlKdvfgwQVXm0ZQ2+jMBf+165UBEEuuWT2WqXeKkkUqPQta5lrt4eFfbo53JcOO4D5fDSGQS5bZAgMBAAECgYAor4I/AXEQXeLsKtTMxMmY77uIPi0gZdfWqUGOFhIJOw4eKZEzGp++I+MWPPVieCnT55vcTmm2zg13uP0fVykmukWqZszG/ZNpPKYleOqnZOqQj7O3au8Ywz18F/pqD++PsUzxRVeXxSOOwmjQ0D2Pe/9yutz62pyiFGAzDsaI6QJBAMn8DeBT3AtcWuONdiHL3yC4NkGJDdyBbMOaWyvrcvUUZr13uS9mZO6pLTN6v9tkmPUdvYxcPTJ9wdGR7NcNPDsCQQD6qluGI2VAlz4s5UoDnelFKrwDPeiruE3I6wsrasK6h37DsAE6OrQgx2dm4yH7ntJHUlJCZ5ay1EBNfEexgQv7AkA1r2vUwxVKY7q4nqHWa8SbgrrRAmePw0qwVreC3erJHyoLk+XBpnqPQKIF+8tAueU5yTTXOLD/WZOJazrDEf5/AkBpwG+Ggu5Xtrcbd8ynA/sDHElf0MGVmNbwOgFnWs42pa1cX6fU6ilOXvIH3TFcF6A9SMS9kThpz9QlHJaek4P7AkAavQillA/wnrha9GsK5UFmzmwNfkjLLW4psAUsXOsqFXWMoxTd0xWuSbuVOzERpbFMBl1VoZQmD9BLSVOTNe+v\n-----END PRIVATE KEY-----";

function gogogo(_0x4e6582, _0x348387, _0x36e668) {
    const _0x3796fb = new URL("http://test.com?" + _0x36e668);

    for (let _0x3d10b9 = 0; _0x3d10b9 < _0x348387.length; _0x3d10b9++) {
        const _0x4502b8 = _0x348387[_0x3d10b9];
        _0x4e6582[_0x4502b8] = _0x3796fb.searchParams.get(_0x4502b8);
    }
}

class Bar {
    constructor(_0x3a3a47) {
        this.url = _0x3a3a47;
        this._ = ++usid;
        this.f = "小主 [" + this._ + "] ";
        let _0x572ddf = ["usr", "p1", "p2", "p3", "p4", "p5", "p7", "p9", "p16", "p21", "p22", "p25", "p26", "p28", "p29", "p30", "p31", "p33", "p34", "zyeid", "pca", "ku", "kt", "smboxid"];
        gogogo(this, _0x572ddf, _0x3a3a47);
        this.message = "";
        this.logs = true;
    }

    async video() {
        let _0x5d4a7f = $.time(13),
            _0x18436f = $.Sha1withRsa("p2=" + this.p2 + "&param=10348-0&timestamp=" + _0x5d4a7f + "&usr=" + this.usr),
            _0x37389a = await $.task("get", "https://dj.palmestore.com/zycl/gold/receiveV5?usr=" + this.usr + "&rgt=7&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p31=" + this.p31 + "&p34=" + this.p34 + "&p33=" + this.p33 + "&zyeid=" + this.zyeid + "&pca=" + this.pca + "&ku=" + this.ku + "&kt=" + this.kt + "&firm=Xiaomi&param=10348-0&sign=" + _0x18436f + "&timestamp=" + _0x5d4a7f + "&type=1002&param=10348-0&smboxid=" + this.smboxid, {}, "=");

        _0x37389a.code == 0 ? console.log(this.f + "看视频成功，获得" + _0x37389a.body.num + "金币,今天还可以看" + _0x37389a.body.remainingCount + "个视频") : console.log(this.f + "死鬼，等会再来嘛，看个视频急什么");
    }

    async openbox() {
        let _0x5246b1 = $.time(13),
            _0x1ffac1 = $.Sha1withRsa("p2=" + this.p2 + "&param=50&timestamp=" + _0x5246b1 + "&usr=" + this.usr),
            _0x3bb5e3 = await $.task("get", "https://dj.palmestore.com/zycl/gold/receiveV5?usr=" + this.usr + "&rgt=7&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p31=" + this.p31 + "&p34=" + this.p34 + "&p33=" + this.p33 + "&zyeid=" + this.zyeid + "&pca=" + this.pca + "&ku=" + this.ku + "&kt=" + this.kt + "&firm=Xiaomi&param=50&sign=" + _0x1ffac1 + "&timestamp=" + _0x5246b1 + "&type=9&param=50&smboxid=" + this.smboxid, {}, "=");

        if (_0x3bb5e3.code == 0) {
            console.log(this.f + "开宝箱成功，获得" + _0x3bb5e3.body.coin + "金币");
        } else {
            console.log(this.f + "死鬼，等会再来嘛，开个宝箱急什么");
        }
    }

    async shuavideo() {
        const _0x55c155 = {
            VIDEO_POP_WINDOW: "10182",
            VIDEOSIGNNEW: "10047"
        };

        for (let _0xa1fa1 in _0x55c155) {
            let _0x22ae6d = _0x55c155[_0xa1fa1],
                _0x4a6f04 = $.time(13),
                _0x312b24 = $.Sha1withRsa("p2=" + this.p2 + "&param=" + _0x22ae6d + "&timestamp=" + _0x4a6f04 + "&usr=" + this.usr),
                _0x183a63 = await $.task("get", "https://dj.palmestore.com/zycl/gold/noticeVideoV5?usr=" + this.usr + "&rgt=7&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p31=" + this.p31 + "&p34=" + this.p34 + "&p33=" + this.p33 + "&zyeid=" + this.zyeid + "&pca=" + this.pca + "&ku=" + this.ku + "&kt=" + this.kt + "&firm=Xiaomi&param=" + _0x22ae6d + "&sign=" + _0x312b24 + "&timestamp=" + _0x4a6f04 + "&pos=" + _0xa1fa1 + "&param=" + _0x22ae6d + "&smboxid=" + this.smboxid, {}, "=");

            _0x183a63.code == 0 && (console.log(this.f + "刷视频成功，获得" + _0x183a63.body.goldNum + "金币,今天还可以看" + _0x183a63.body.remainingCount + "个视频"), await $.wait(15000, 22000));
        }
    }

    async signin() {
        let _0x541ab6 = await $.task("get", "https://dj.palmestore.com/zycl/gold/dailyWelfareV5?usr=" + this.usr + "&rgt=7&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=3&p16=" + this.p16 + "&p22=10&p25=" + this.p25 + "&p26=29&p28=" + this.p28 + "&p31=" + this.p31 + "&p34=" + this.p34 + "&p33=" + this.p33 + "&zyeid=" + this.zyeid + "&pca=channel-visit&ku=" + this.ku + "&kt=" + this.kt + "&firm=Xiaomi&source=welfare&signType=2&ecpmMix=0.0&ecpmVideo=0.0&mcTacid=13065&smboxid=" + this.smboxid, {});

        if (_0x541ab6.code == 0) {
            console.log(this.f + "签到成功");
        }
    }

    async userinfo() {
        let _0x26d1c5 = $.time(13),
            _0x16f458 = $.Sha1withRsa("timestamp=" + _0x26d1c5 + "&usr=" + this.usr),
            _0x2090a5 = await $.task("get", "https://dj.palmestore.com/zyuc/api/user/accountInfo?pluginVersion=770.5&sign=" + _0x16f458 + "&timestamp=" + _0x26d1c5 + "&usr=" + this.usr + "&rgt=7&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p31=" + this.p31 + "&p34=" + this.p34 + "&p33=" + this.p33 + "&zyeid=" + this.zyeid + "&pca=" + this.pca + "&ku=" + this.ku + "&kt=" + this.kt + "&firm=Xiaomi&d1=1.0.6", {}, "=");

        _0x2090a5.code == 0 && (console.log(this.f + "用户名:" + _0x2090a5.body.userInfo.userNick + ",当前金币" + _0x2090a5.body.gold.goldAmount + ",余额" + _0x2090a5.body.gold.goldText), this.message += this.f + "用户名:" + _0x2090a5.body.userInfo.userNick + ",当前金币" + _0x2090a5.body.gold.goldAmount + ",余额" + _0x2090a5.body.gold.goldText);
    }

}

$ = DD();
!(async () => {
    console.log(NAME);
    
        await $.ExamineCookie();
        await $.Multithreading("video");
        await $.Multithreading("openbox");
        await $.Multithreading("shuavideo");
        await $.Multithreading("signin");
        await $.Multithreading("userinfo");

    let _0x326cd0 = [];

    for (let _0x7d1c7f of $.cookie_list) {
        if (_0x7d1c7f.message) {
            _0x326cd0.push(_0x7d1c7f.message);
        }
    }

    if (_0x326cd0.length > 0) {
        await $.SendMsg(_0x326cd0.join("\n"));
    }
})().catch(_0x342558 => {
    console.log(_0x342558);
}).finally(() => {});

function DD() {
    return new class {
        constructor() {
            this.cookie_list = [];
            this.message = "";
            this.CryptoJS = require("crypto-js");
            this.NodeRSA = require("node-rsa");
            this.request = require("request");
            this.Sha_Rsa = require("jsrsasign");
        }

        async Multithreading(_0xee59de, _0x15eee2, _0x19a458) {
            let _0x4a2856 = [];
            !_0x19a458 && (_0x19a458 = 1);

            while (_0x19a458--) {
                for (let _0x3cb9bc of $.cookie_list) {
                    _0x4a2856.push(_0x3cb9bc[_0xee59de](_0x15eee2));
                }
            }

            await Promise.allSettled(_0x4a2856);
        }

        ExamineCookie() {
            let _0xf7619f = process.env[VALY] || CK,
                _0x43710d = 0;

            if (_0xf7619f) {
                for (let _0x13380c of _0xf7619f.split("\n").filter(_0x8396c2 => !!_0x8396c2)) {
                    $.cookie_list.push(new Bar(_0x13380c));
                }

                _0x43710d = $.cookie_list.length;
            } else {
                console.log("\n【" + NAME + "】：未填写变量: " + VALY);
            }

            console.log("共找到" + _0x43710d + "个账号");
            return $.cookie_list;
        }

        task(_0x2f1c26, _0x19ede4, _0x24d557, _0x4fcb2e, _0x395428) {
            _0x2f1c26 == "delete" ? _0x2f1c26 = _0x2f1c26.toUpperCase() : _0x2f1c26 = _0x2f1c26;

            if (_0x2f1c26 == "post") {
                delete _0x24d557["content-type"];
                delete _0x24d557["Content-type"];
                delete _0x24d557["content-Type"];
                $.safeGet(_0x4fcb2e) ? _0x24d557["Content-Type"] = "application/json;charset=UTF-8" : _0x24d557["Content-Type"] = "application/x-www-form-urlencoded";
                _0x4fcb2e && (_0x24d557["Content-Length"] = $.lengthInUtf8Bytes(_0x4fcb2e));
            }

            _0x2f1c26 == "get" && (delete _0x24d557["content-type"], delete _0x24d557["Content-type"], delete _0x24d557["content-Type"], delete _0x24d557["Content-Length"]);
            _0x24d557.Host = _0x19ede4.replace("//", "/").split("/")[1];
            return new Promise(async _0x2cff71 => {
                if (_0x2f1c26.indexOf("T") < 0) {
                    var _0x257ce1 = {
                        url: _0x19ede4,
                        headers: _0x24d557,
                        body: _0x4fcb2e,
                        proxy: "http://" + _0x395428
                    };
                } else {
                    var _0x257ce1 = {
                        url: _0x19ede4,
                        headers: _0x24d557,
                        form: JSON.parse(_0x4fcb2e),
                        proxy: "http://" + _0x395428
                    };
                }

                !_0x395428 && delete _0x257ce1.proxy;

                this.request[_0x2f1c26.toLowerCase()](_0x257ce1, (_0x586891, _0x2656a2, _0x303239) => {
                    try {
                        if (_0x303239) {
                            if (LOGS == 1) {
                                console.log("================ 请求 ================");
                                console.log(_0x257ce1);
                                console.log("================ 返回 ================");
                                $.safeGet(_0x303239) ? console.log(JSON.parse(_0x303239)) : console.log(_0x303239);
                            }
                        }
                    } catch (_0x301ea1) {
                        console.log(_0x301ea1, _0x19ede4 + "\n" + _0x24d557);
                    } finally {
                        let _0xf57d81 = "";

                        if (!_0x586891) {
                            if ($.safeGet(_0x303239)) {
                                _0xf57d81 = JSON.parse(_0x303239);
                            } else {
                                if (_0x303239.indexOf("/") != -1 && _0x303239.indexOf("+") != -1) {
                                    _0xf57d81 = _0x303239;
                                } else {
                                    _0xf57d81 = _0x303239;
                                }
                            }
                        } else {
                            _0xf57d81 = _0x19ede4 + "   API请求失败，请检查网络重试\n" + _0x586891;
                        }

                        return _0x2cff71(_0xf57d81);
                    }
                });
            });
        }

        parseHTML(_0x3665a5) {
            const _0x8c99d3 = require("cheerio"),
                _0x1ecbfa = _0x8c99d3.load(_0x3665a5),
                _0x30f59c = [],
                _0x2ad719 = _0x1ecbfa(".task_module");

            _0x2ad719.each((_0x595f4a, _0x5ed389) => {
                const _0x4893fe = _0x1ecbfa(_0x5ed389),
                    _0x778b5b = _0x4893fe.find(".welfare_title h1").text(),
                    _0x569fba = _0x4893fe.find(".task_list .list_item"),
                    _0x4f4853 = [];

                _0x569fba.each((_0x203f61, _0x28cba2) => {
                    const _0x456a05 = _0x1ecbfa(_0x28cba2),
                        _0x2c2446 = _0x456a05.find(".task_name").text().trim(),
                        _0x95e911 = _0x456a05.find(".havegold").text().trim(),
                        _0x5bcad0 = _0x456a05.find(".task_other").text().trim(),
                        _0x1887ba = {
                            name: _0x2c2446,
                            reward: _0x95e911,
                            other: _0x5bcad0
                        };

                    _0x4f4853.push(_0x1887ba);
                });

                const _0x145153 = {
                    title: _0x778b5b,
                    tasks: _0x4f4853
                };

                _0x30f59c.push(_0x145153);
            });

            return _0x30f59c;
        }

        async readUUID() {
            const _0x38c83c = "uuid.txt";
            await $.generateUUID(_0x38c83c);

            try {
                const _0x34f491 = fs.readFileSync(_0x38c83c, "utf8"),
                    _0x55ecae = _0x34f491.trim();

                return _0x55ecae;
            } catch (_0x2fcd95) {
                return null;
            }
        }

        generateUUID(_0x3554d5) {
            if (fs.existsSync(_0x3554d5)) {
                return;
            }

            const _0x47bfa5 = uuidv4();

            fs.writeFile(_0x3554d5, _0x47bfa5, "utf8", _0x5529ce => {
                if (_0x5529ce) {
                    console.error("写入文件出错: " + _0x5529ce.message);
                    return;
                }

                console.log("uuid.txt 文件已创建并写入 UUID。");
            });
        }

        async getkami() {
            let _0x2e4da9 = await $.readUUID(),
                _0x1d1ce3 = await $.task("get", "http://" + dcfhost + ":5705/query?dcf=" + dcfkey + "&MA=" + _0x2e4da9, {});

            return _0x1d1ce3;
        }

        async SendMsg(_0x5351d2) {
            if (!_0x5351d2) {
                return;
            }

            if (Notify == 1) {
                var _0xfc5f93 = require("./sendNotify");

                await _0xfc5f93.sendNotify(NAME, _0x5351d2);
            }
        }

        lengthInUtf8Bytes(_0x58a738) {
            let _0x1d70e6 = encodeURIComponent(_0x58a738).match(/%[89ABab]/g);

            return _0x58a738.length + (_0x1d70e6 ? _0x1d70e6.length : 0);
        }

        randomArr(_0x583d2c) {
            return _0x583d2c[parseInt(Math.random() * _0x583d2c.length, 10)];
        }

        wait(_0x2cfc14) {
            return new Promise(_0x2815eb => setTimeout(_0x2815eb, _0x2cfc14));
        }

        time(_0x274231) {
            return _0x274231 == 10 ? Math.round(+new Date() / 1000) : +new Date();
        }

        timenow(_0x119888) {
            let _0x11d835 = new Date();

            if (_0x119888 == undefined) {
                let _0x50a9fc = new Date(),
                    _0x4e9701 = _0x50a9fc.getFullYear() + "-",
                    _0x200d91 = (_0x50a9fc.getMonth() + 1 < 10 ? "0" + (_0x50a9fc.getMonth() + 1) : _0x50a9fc.getMonth() + 1) + "-",
                    _0x36cf59 = _0x50a9fc.getDate() + " ",
                    _0x2ca132 = _0x50a9fc.getHours() + ":",
                    _0x4fad90 = _0x50a9fc.getMinutes() + ":",
                    _0x2c9fb1 = _0x50a9fc.getSeconds() + 1 < 10 ? "0" + _0x50a9fc.getSeconds() : _0x50a9fc.getSeconds();

                return _0x4e9701 + _0x200d91 + _0x36cf59 + _0x2ca132 + _0x4fad90 + _0x2c9fb1;
            } else {
                if (_0x119888 == 0) {
                    return _0x11d835.getFullYear();
                } else {
                    if (_0x119888 == 1) {
                        return _0x11d835.getMonth() + 1 < 10 ? "0" + (_0x11d835.getMonth() + 1) : _0x11d835.getMonth() + 1;
                    } else {
                        if (_0x119888 == 2) {
                            return _0x11d835.getDate();
                        } else {
                            if (_0x119888 == 3) {
                                return _0x11d835.getHours();
                            } else {
                                if (_0x119888 == 4) {
                                    return _0x11d835.getMinutes();
                                } else {
                                    if (_0x119888 == 5) {
                                        return _0x11d835.getSeconds() + 1 < 10 ? "0" + _0x11d835.getSeconds() : _0x11d835.getSeconds();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        safeGet(_0x336b37) {
            try {
                if (typeof JSON.parse(_0x336b37) == "object") {
                    return true;
                }
            } catch (_0x207925) {
                return false;
            }
        }

        SJS(_0x47654b, _0x21e660) {
            if (_0x21e660 == 0) {
                let _0x5145bb = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789",
                    _0x37142e = _0x5145bb.length,
                    _0x376efe = "";

                for (let _0x3765fb = 0; _0x3765fb < _0x47654b; _0x3765fb++) {
                    _0x376efe += _0x5145bb.charAt(Math.floor(Math.random() * _0x37142e));
                }

                return _0x376efe;
            } else {
                if (_0x21e660 == 1) {
                    let _0x10a3ea = "qwertyuiopasdfghjklzxcvbnm0123456789",
                        _0x5e514a = _0x10a3ea.length,
                        _0x55080a = "";

                    for (let _0x12e472 = 0; _0x12e472 < _0x47654b; _0x12e472++) {
                        _0x55080a += _0x10a3ea.charAt(Math.floor(Math.random() * _0x5e514a));
                    }

                    return _0x55080a;
                } else {
                    let _0x5a803f = "0123456789",
                        _0x35dd48 = _0x5a803f.length,
                        _0x3e029b = "";

                    for (let _0x1c942f = 0; _0x1c942f < _0x47654b; _0x1c942f++) {
                        _0x3e029b += _0x5a803f.charAt(Math.floor(Math.random() * _0x35dd48));
                    }

                    return _0x3e029b;
                }
            }
        }

        udid(_0x3537f7) {
            function _0x122c2b() {
                return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
            }

            let _0x17248e = _0x122c2b() + _0x122c2b() + "-" + _0x122c2b() + "-" + _0x122c2b() + "-" + _0x122c2b() + "-" + _0x122c2b() + _0x122c2b() + _0x122c2b();

            if (_0x3537f7 == 0) {
                return _0x17248e.toUpperCase();
            } else {
                return _0x17248e.toLowerCase();
            }
        }

        encodeUnicode(_0x41dcdc) {
            var _0x27e127 = [];

            for (var _0x192212 = 0; _0x192212 < _0x41dcdc.length; _0x192212++) {
                _0x27e127[_0x192212] = ("00" + _0x41dcdc.charCodeAt(_0x192212).toString(16)).slice(-4);
            }

            return "\\u" + _0x27e127.join("\\u");
        }

        base64ToHex(_0x5ad5f1) {
            const _0x24f272 = atob(_0x5ad5f1),
                _0x11afbc = new Uint8Array(_0x24f272.length);

            for (let _0x3fa652 = 0; _0x3fa652 < _0x24f272.length; _0x3fa652++) {
                _0x11afbc[_0x3fa652] = _0x24f272.charCodeAt(_0x3fa652);
            }

            let _0x256bb7 = "";

            for (let _0x59f698 = 0; _0x59f698 < _0x11afbc.length; _0x59f698++) {
                const _0x3221b7 = _0x11afbc[_0x59f698].toString(16).padStart(2, "0");

                _0x256bb7 += _0x3221b7;
            }

            return _0x256bb7;
        }

        decodeUnicode(_0x5307e7) {
            _0x5307e7 = _0x5307e7.replace(/\\u/g, "%u");
            return unescape(unescape(_0x5307e7));
        }

        RT(_0x15178e, _0x34fcd1) {
            return Math.round(Math.random() * (_0x34fcd1 - _0x15178e) + _0x15178e);
        }

        arrNull(_0x440793) {
            var _0x1d8c07 = _0x440793.filter(_0x229820 => {
                return _0x229820 && _0x229820.trim();
            });

            return _0x1d8c07;
        }

        nowtime() {
            return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
        }

        timecs() {
            let _0x4c4f26 = $.nowtime();

            if (JSON.stringify(_0x4c4f26).indexOf(" ") >= 0) {
                _0x4c4f26 = _0x4c4f26.replace(" ", "T");
            }

            return new Date(_0x4c4f26).getTime() - 28800000;
        }

        rtjson(_0x447fb2, _0x28f767, _0x507cc1, _0x13e55f) {
            if (_0x13e55f == 0) {
                return JSON.stringify(_0x447fb2.split(_0x28f767).reduce((_0x306ca8, _0x2693a5) => {
                    let _0x361c2c = _0x2693a5.split(_0x507cc1);

                    _0x306ca8[_0x361c2c[0].trim()] = _0x361c2c[1].trim();
                    return _0x306ca8;
                }, {}));
            } else {
                return _0x447fb2.split(_0x28f767).reduce((_0x42ff51, _0x3d916a) => {
                    let _0x2f8bfc = _0x3d916a.split(_0x507cc1);

                    _0x42ff51[_0x2f8bfc[0].trim()] = _0x2f8bfc[1].trim();
                    return _0x42ff51;
                }, {});
            }
        }

        MD5Encrypt(_0x52ed15, _0x329e2a) {
            if (_0x52ed15 == 0) {
                return this.CryptoJS.MD5(_0x329e2a).toString().toLowerCase();
            } else {
                if (_0x52ed15 == 1) {
                    return this.CryptoJS.MD5(_0x329e2a).toString().toUpperCase();
                } else {
                    if (_0x52ed15 == 2) {
                        return this.CryptoJS.MD5(_0x329e2a).toString().substring(8, 24).toLowerCase();
                    } else {
                        if (_0x52ed15 == 3) {
                            return this.CryptoJS.MD5(_0x329e2a).toString().substring(8, 24).toUpperCase();
                        }
                    }
                }
            }
        }

        SHA_Encrypt(_0x3904f9, _0x73a227, _0x303be7) {
            if (_0x3904f9 == 0) {
                return this.CryptoJS[_0x73a227](_0x303be7).toString(this.CryptoJS.enc.Base64);
            } else {
                return this.CryptoJS[_0x73a227](_0x303be7).toString();
            }
        }

        HmacSHA_Encrypt(_0x4ce42a, _0x2cad35, _0x395a5c, _0x498f6d) {
            if (_0x4ce42a == 0) {
                return this.CryptoJS[_0x2cad35](_0x395a5c, _0x498f6d).toString(this.CryptoJS.enc.Base64);
            } else {
                return this.CryptoJS[_0x2cad35](_0x395a5c, _0x498f6d).toString();
            }
        }

        Base64(_0x277add, _0xbee37f) {
            return _0x277add == 0 ? this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0xbee37f)) : this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0xbee37f));
        }

        DecryptCrypto(_0x4bd209, _0x467752, _0x182308, _0x63abee, _0x4463c2, _0x4c0d58, _0xa12724) {
            if (_0x4bd209 == 0) {
                const _0x383c26 = this.CryptoJS[_0x467752].encrypt(this.CryptoJS.enc.Utf8.parse(_0x4463c2), this.CryptoJS.enc.Utf8.parse(_0x4c0d58), {
                    iv: this.CryptoJS.enc.Utf8.parse(_0xa12724),
                    mode: this.CryptoJS.mode[_0x182308],
                    padding: this.CryptoJS.pad[_0x63abee]
                });

                return _0x383c26.toString();
            } else {
                const _0x480089 = this.CryptoJS[_0x467752].decrypt(_0x4463c2, this.CryptoJS.enc.Utf8.parse(_0x4c0d58), {
                    iv: this.CryptoJS.enc.Utf8.parse(_0xa12724),
                    mode: this.CryptoJS.mode[_0x182308],
                    padding: this.CryptoJS.pad[_0x63abee]
                });

                return _0x480089.toString(this.CryptoJS.enc.Utf8);
            }
        }

        RSA(_0xebc2d1, _0x236292) {
            const _0x1400a9 = require("node-rsa");

            let _0x4c7a67 = new _0x1400a9("-----BEGIN PUBLIC KEY-----\n" + _0x236292 + "\n-----END PUBLIC KEY-----");

            _0x4c7a67.setOptions({
                encryptionScheme: "pkcs1"
            });

            return _0x4c7a67.encrypt(_0xebc2d1, "base64", "utf8");
        }

        getSHA256withRSA(_0x1d5ecb) {
            const _0x4283e1 = rs.KEYUTIL.getKey(privateKeyString),
                _0x1d2b79 = new rs.KJUR.crypto.Signature({
                    alg: "SHA1withRSA"
                });

            _0x1d2b79.init(_0x4283e1);

            _0x1d2b79.updateString(_0x1d5ecb);

            const _0x4dfe2d = _0x1d2b79.sign(),
                _0x224be6 = rs.hextob64u(_0x4dfe2d);

            return _0x224be6;
        }

        hexToBase64(_0xeaacf) {
            const _0x1c0201 = [];

            for (let _0x2ef551 = 0; _0x2ef551 < _0xeaacf.length; _0x2ef551 += 2) {
                _0x1c0201.push(parseInt(_0xeaacf.substr(_0x2ef551, 2), 16));
            }

            const _0x570fe7 = btoa(String.fromCharCode(..._0x1c0201));

            return _0x570fe7;
        }

        Sha1withRsa(_0x1c069b) {
            const {
                    KEYUTIL: _0x33f87e,
                    KJUR: _0x4f1bb5,
                    b64utoutf8: _0x30d998,
                    utf8tob64: _0x306c4b
                } = require("jsrsasign"),
                _0x369496 = _0x33f87e.getKey(Key),
                _0x491c02 = new _0x4f1bb5.crypto.Signature({
                    alg: "SHA1withRSA"
                });

            _0x491c02.init(_0x369496);

            _0x491c02.updateString(_0x1c069b);

            const _0x479bce = _0x491c02.sign();

            let _0x275a7f = $.hexToBase64(_0x479bce);

            return _0x275a7f;
        }

    }();
}