/*
@蛋炒饭
App：追读小说
变量名：zdxsck
变量：找到https://ah2.zhangyue.com/zycl/sign/yushufang/sign开头的连接，从usr到zysid的值#0或者1（0为已提现过新人1元，1为未提现过新人1元），多账号换行
ck要包含p1,2,3,4,5,7,9,16,21,22,25,26,28,29,30,31,33
定时：一天一次（下面SJ的值是几，就在几点跑一次）
默认满20提现到微信，前提是绑定了微信&&新人1元已经提过，提现页面第一个是30元选项的就行
*/

SJ = 9;
NAME = "追读小说";
VALY = ["zdxsck"];
CK = "";
LOGS = 0;
usid = 0;

var rs = require("jsrsasign");

const fs = require("fs");

nowhour = Math.round(new Date().getHours()).toString();
Notify = 0;
Key = "-----BEGIN PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMZTFP4Vy+hdNhXTPB5TnaIv8AFY9vcpJS7tDUNCjr9luRAWyNFP8+VAdVQ++Kg7Q72w8BrfknFnOATQ7NZgkkgy76AI0DD95fLEXv0muYNMr3v2WDivNPPg0heij91+wYe4bhevQAZ5Vjdo0LcphX4eeE6VeNjJXzTkKZCbEMWpAgMBAAECgYEAuBGAWFquiBmLCzKkh5kfotpPLVD+1mLvyd/mAVkS1/13h8E93VcRjOMIgop3ityGgNZp4udCKdKdIYsvZcD3wjsiwBkzMS8WQCWK8ZlDf+5lylMdUpU3p7x1cntYEwAhH4Mh2ff/Zqx/2PN5WdDDAFwH0Uae9iPcLp07enUs9IkCQQD0wjQ05gvaJAC9ZN+UAFmvyENFMvHBofjQmyi8cGlRwyOKTkvAut9lCTVdbuRgdKCSx37xLOwWB6l5q3RXsTRXAkEAz27rrkIHs+I0TqFU82BUAO3RVIv0VW18QQFti2n/UL37hDh40YQoFNZbnhA6QryaG+5wLXdlxhPvAV3dTEGV/wJAGWc2p+7geAmYkg+wLNpEdLwiT0JUWTaIbo5MEhLQu423WJl7v0sl+ISWJ1ZlGaXBLLrL8BgrgLXW3yvubVOVDQJAHOG/1PqCogw75jrWXjCqYZq7S79U3NQquc5eF0xB7VcWfxlx0RJKlmQmS4LM6d/iwULYwavfMs4xuAn+txBmtwJAVOhDYDmJpdmtMXoDR2bcG55BBeGvjKKSZKxo+R7SVRAXektv8I97j+4rnzB1SYL0R+1NoMat+Cl4VKCsC7+OAA==\n-----END PRIVATE KEY-----";

class Bar {
    constructor(_0x461339) {
        this._ = ++usid;
        this.f = "小主 [" + this._ + "] ";
        this.usr = _0x461339.match(/usr=([\w\-]+)/)[1];
        this.p1 = _0x461339.match(/p1=([^&]+)/)[1];
        this.p2 = _0x461339.match(/p2=([\w\-]+)/)[1];
        this.p3 = _0x461339.match(/p3=([\w\-]+)/)[1];
        this.p4 = _0x461339.match(/p4=([\w\-]+)/)[1];
        this.p5 = _0x461339.match(/p5=([\w\-]+)/)[1];
        this.p7 = _0x461339.match(/p7=([\w\-]+)/)[1];
        this.p9 = _0x461339.match(/p9=([\w\-]+)/)[1];
        this.p16 = _0x461339.match(/p16=([\w\-]+)/)[1];
        this.p21 = _0x461339.match(/p21=([\w\-]+)/)[1];
        this.p22 = _0x461339.match(/p22=([\w\-]+)/)[1];
        this.p25 = _0x461339.match(/p25=([\w\-]+)/)[1];
        this.p26 = _0x461339.match(/p26=([\w\-]+)/)[1];
        this.p28 = _0x461339.match(/p28=([\w\-]+)/)[1];
        this.p29 = _0x461339.match(/p29=([\w\-]+)/)[1];
        this.p31 = _0x461339.match(/p31=([\w\-]+)/)[1];
        this.zysid = _0x461339.match(/zysid=([\w\-]+)/)[1];
        this.message = "";
        this.logs = true;
    }

    async signin() {
        let _0x37c110 = await $.task("get", "https://ah2.zhangyue.com/zycl/sign/zhuidu/sign?usr=" + this.usr + "&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.yykuaile.sh&zysid=" + this.zysid + "&actId=qJN71nzjxE&date=1&signType=month", {});

        _0x37c110.code == 0 ? (console.log(this.f + "签到成功"), await this.signinvideo()) : console.log("" + this.f + _0x37c110.msg);
    }

    async signinvideo() {
        let _0x325073 = $.time(13),
            _0x281792 = encodeURIComponent($.Sha1withRsa("position=SIGN_WINDOW_VIDEO&timestamp=" + _0x325073 + "&usr=" + this.usr, Key)),
            _0x98e3c6 = "usr=" + this.usr + "&sign=" + _0x281792 + "&position=SIGN_WINDOW_VIDEO&timestamp=" + _0x325073,
            _0x124970 = await $.task("post", "https://saad.ms.zhangyue.net/rewarded-video/report?app_id=10087&zysid=5ddae713667e1f4ae95b91e1196b6b55&usr=" + this.usr + "&rgt=&p1=ZNnnF5qn3L4DALouH5VYOnA8&p2=319004&p3=17811671&p4=501671&p5=19&p7=__38f4e46249755079&p9=3&p16=2211135C&p21=3131&p22=9&p25=78116&p26=28&p28=94f2e28627155017&p29=zyd70f8a&p30=__&p31=__5bd7c2c7f82e7099&p33=com.chaozh.cata.bkyd&bookId=null&chapterId=null&appId=&id=101052&ext=&extraSourceId=0&extraSignDay=0", {}, _0x98e3c6);

        _0x124970.code == 0 && console.log(this.f + "签到视频观看成功");
    }

    async video() {
        for (let _0x4fcc9a = 0; _0x4fcc9a < 5; _0x4fcc9a++) {
            let _0xdb25a2 = $.time(13),
                _0x40ba88 = encodeURIComponent($.Sha1withRsa("position=WELFARE_VIDEOCOIN_VIDEO&timestamp=" + _0xdb25a2 + "&usr=" + this.usr, Key)),
                _0x56e760 = "usr=" + this.usr + "&sign=" + _0x40ba88 + "&position=WELFARE_VIDEOCOIN_VIDEO&timestamp=" + _0xdb25a2,
                _0x25904e = await $.task("post", "https://saad.ms.zhangyue.net/rewarded-video/report?app_id=10087&zysid=5ddae713667e1f4ae95b91e1196b6b55&usr=" + this.usr + "&rgt=&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.chaozh.cata.bkyd&bookId=null&chapterId=null&appId=10087&id=101044&ext=", {}, _0x56e760);

            if (_0x25904e.code == 0) {
                console.log(this.f + "视频观看成功," + _0x25904e.msg);
            } else {
                console.log("" + this.f + _0x25904e.msg);
            }
        }
    }

    async videobox() {
        for (let _0x13aa11 = 0; _0x13aa11 < 30; _0x13aa11++) {
            let _0x4168cc = $.time(13),
                _0x1a9761 = encodeURIComponent($.Sha1withRsa("position=VIDEO_BANK&timestamp=" + _0x4168cc + "&usr=" + this.usr, Key)),
                _0x321d46 = "usr=" + this.usr + "&sign=" + _0x1a9761 + "&position=VIDEO_BANK&timestamp=" + _0x4168cc,
                _0x227354 = await $.task("post", "https://saad.ms.zhangyue.net/rewarded-video/report?app_id=10087&zysid=3180d1ea9cc36a23b06e38e0ec1174d0&usr=" + this.usr + "&rgt=7&p1=ZN8%2FkyLb91EDADTejx1tOaJp&pc=10&p2=290004&p3=17416671&p4=501671&p5=19&p6=&p7=__38f4e46249755079&p9=3&p12=&p16=2211133C&p21=2010&p22=13&p25=74166&p26=33&p28=94f2e28627155017&p29=zybc0e74&p30=&p31=__5e3379cfc663c001&p33=com.yykuaile.sh&bookId=null&chapterId=null&appId=10087&id=101157&ext=", {}, _0x321d46);

            _0x227354.code == 0 && (console.log(this.f + "视频观看成功," + _0x227354.msg), await $.wait($.RT(8000, 15000)));
        }
    }

    async videobox2() {
        for (let _0x21f14c = 0; _0x21f14c < 30; _0x21f14c++) {
            for (let _0x4f0afb of ["101071", "101097", "101120", "100159", "100167", "100178", "100189", "100206", "100221", "100260", "100270", "100273", "100324", "100343", "100356", "100366", "100391", "100439", "100462", "100547", "100548", "100675", "100761", "100780", "100829", "100864", "100929", "100962", "101034", "101165", "101235"]) {
                let _0x3b7306 = $.time(13),
                    _0x481777 = encodeURIComponent($.Sha1withRsa("position=WELFARE_VIDEOCOIN_VIDEO&timestamp=" + _0x3b7306 + "&usr=" + this.usr, Key)),
                    _0x22ac71 = "usr=" + this.usr + "&sign=" + _0x481777 + "&position=WELFARE_VIDEOCOIN_VIDEO&timestamp=" + _0x3b7306,
                    _0x141ae2 = await $.task("post", "https://saad.ms.zhangyue.net/rewarded-video/report?app_id=10087&zysid=3180d1ea9cc36a23b06e38e0ec1174d0&usr=" + this.usr + "&rgt=7&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.yykuaile.sh&bookId=null&chapterId=null&appId=10087&id=" + _0x4f0afb + "&ext=", {}, _0x22ac71);

                _0x141ae2.code == 0 && console.log(this.f + "视频观看成功," + _0x141ae2.msg);
            }
        }
    }

    async openbox() {
        let _0x3c3996 = encodeURIComponent($.Sha1withRsa("https://ah2.zhangyue.com/zycl/sign/v2/treasure/donate?usr=" + this.usr + "&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.chaozh.cata.bkyd&activityId=100295", Key)),
            _0x1fc114 = await $.task("get", "https://ah2.zhangyue.com/zycl/sign/v2/treasure/donate?usr=" + this.usr + "&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.chaozh.cata.bkyd&zysid=5ddae713667e1f4ae95b91e1196b6b55&zysign=" + _0x3c3996, {});

        _0x1fc114.code == 0 ? (console.log(this.f + "开宝箱," + _0x1fc114.msg), await this.boxvideo()) : console.log(this.f + "开宝箱" + _0x1fc114.msg);
    }

    async boxvideo() {
        let _0x493070 = $.time(13),
            _0x5d54c6 = encodeURIComponent($.Sha1withRsa("position=VIDEO_CHEST&timestamp=" + _0x493070 + "&usr=" + this.usr, Key)),
            _0x3bb333 = "usr=" + this.usr + "&sign=" + _0x5d54c6 + "&position=VIDEO_CHEST&timestamp=" + _0x493070,
            _0x42b9c3 = await $.task("post", "https://saad.ms.zhangyue.net/rewarded-video/report?app_id=10087&zysid=3180d1ea9cc36a23b06e38e0ec1174d0&usr=" + this.usr + "&rgt=7&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.yykuaile.sh&bookId=null&chapterId=null&appId=10087&id=101050&ext=", {}, _0x3bb333);

        _0x42b9c3.code == 0 ? console.log(this.f + "宝箱视频," + _0x42b9c3.msg) : console.log(this.f + "宝箱视频" + _0x42b9c3.msg);
    }

    async userinfo() {
        let _0x5cf8f5 = await $.task("get", "https://ah2.zhangyue.com/zycl/sign/zhuidu/reload?usr=" + this.usr + "&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.yykuaile.sh&zysid=" + this.zysid + "&source=task&signType=month", {});

        _0x5cf8f5.code == 0 && (console.log(this.f + "余额" + _0x5cf8f5.body.goldCoinMomey + "元"), this.message += this.f + "余额" + _0x5cf8f5.body.goldCoinMomey + "元", _0x5cf8f5.body.goldCoinMomey >= 30 && (await this.txinfo()));
    }

    async txinfo() {
        let _0x247ba3 = await $.task("get", "https://ah2.zhangyue.com/zytc/public/index.php?ca=GoldCoin.DrawIndex&usr=" + this.usr + "&p1=" + this.p1 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.yykuaile.sh&zysid=" + this.zysid + "&pca=GoldCoin.Index", {});

        var _0x3b24ed = /data-encstr="(.*?)"/g,
            _0x450261 = [],
            _0x2acf1e;

        while ((_0x2acf1e = _0x3b24ed.exec(_0x247ba3)) !== null) {
            _0x450261.push(_0x2acf1e[1]);
        }

        if (_0x450261.length > 0) {
            let _0x8666fc = _0x450261[this.tx];
            await this.tixian(_0x8666fc);
            await this.tx();
        }
    }

    async tixian(_0x5ec35a) {
        let _0x18a189 = encodeURIComponent(_0x5ec35a),
            _0x5bcce8 = encodeURIComponent(this.p1),
            _0x541e21 = await $.task("get", "https://ah2.zhangyue.com/zytc/public/index.php?usr=" + this.usr + "&p1=" + _0x5bcce8 + "&p2=" + this.p2 + "&p3=" + this.p3 + "&p4=" + this.p4 + "&p5=" + this.p5 + "&p7=" + this.p7 + "&p9=" + this.p9 + "&p16=" + this.p16 + "&p21=" + this.p21 + "&p22=" + this.p22 + "&p25=" + this.p25 + "&p26=" + this.p26 + "&p28=" + this.p28 + "&p29=" + this.p29 + "&p30=__&p31=" + this.p31 + "&p33=com.yykuaile.sh&zysid=" + this.zysid + "&pca=GoldCoin.DrawIndex&ca=GoldCoin.CoinWithdraw&way=wechat&encstr=" + _0x18a189, {}, "=");

        if (_0x541e21.code == 0) {
            console.log(this.f + "提现30元成功");
            this.message += this.f + "提现30元成功";
        } else {
            console.log(this.f + "提现失败");
        }
    }

    async tx() {}

}

$ = DD();
!(async () => {
    console.log(NAME);

    await $.ExamineCookie();
    nowhour == SJ && (await $.Multithreading("signin"), await $.Multithreading("videobox"), await $.Multithreading("videobox2"), await $.Multithreading("video"));
    await $.Multithreading("openbox");
    await $.Multithreading("userinfo");

    let _0x21548c = [];

    for (let _0x1ff95f of $.cookie_list) {
        if (_0x1ff95f.message) {
            _0x21548c.push(_0x1ff95f.message);
        }
    }

    if (_0x21548c.length > 0) {
        await $.SendMsg(_0x21548c.join("\n"));
    }
})().catch(_0x14118e => {
    console.log(_0x14118e);
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

        async Multithreading(_0x1fe1aa, _0x658575, _0x423c2a) {
            let _0x100944 = [];
            !_0x423c2a && (_0x423c2a = 1);

            while (_0x423c2a--) {
                for (let _0x17f1a3 of $.cookie_list) {
                    _0x100944.push(_0x17f1a3[_0x1fe1aa](_0x658575));
                }
            }

            await Promise.allSettled(_0x100944);
        }

        ExamineCookie() {
            let _0x2c7756 = process.env[VALY] || CK,
                _0xd7e80f = 0;

            if (_0x2c7756) {
                for (let _0x459796 of _0x2c7756.split("\n").filter(_0x462abb => !!_0x462abb)) {
                    $.cookie_list.push(new Bar(_0x459796));
                }

                _0xd7e80f = $.cookie_list.length;
            } else {
                console.log("\n【" + NAME + "】：未填写变量: " + VALY);
            }

            console.log("共找到" + _0xd7e80f + "个账号");
            return $.cookie_list;
        }

        task(_0x54bbb5, _0x1708f8, _0x244f1c, _0x105d09, _0x2140e0) {
            if (_0x54bbb5 == "delete") {
                _0x54bbb5 = _0x54bbb5.toUpperCase();
            } else {
                _0x54bbb5 = _0x54bbb5;
            }

            if (_0x54bbb5 == "post") {
                delete _0x244f1c["content-type"];
                delete _0x244f1c["Content-type"];
                delete _0x244f1c["content-Type"];
                $.safeGet(_0x105d09) ? _0x244f1c["Content-Type"] = "application/json;charset=UTF-8" : _0x244f1c["Content-Type"] = "application/x-www-form-urlencoded";

                if (_0x105d09) {
                    _0x244f1c["Content-Length"] = $.lengthInUtf8Bytes(_0x105d09);
                }
            }

            _0x54bbb5 == "get" && (delete _0x244f1c["content-type"], delete _0x244f1c["Content-type"], delete _0x244f1c["content-Type"], delete _0x244f1c["Content-Length"]);
            _0x244f1c.Host = _0x1708f8.replace("//", "/").split("/")[1];
            return new Promise(async _0x39d963 => {
                if (_0x54bbb5.indexOf("T") < 0) {
                    var _0x5875fc = {
                        url: _0x1708f8,
                        headers: _0x244f1c,
                        body: _0x105d09,
                        proxy: "http://" + _0x2140e0
                    };
                } else {
                    var _0x5875fc = {
                        url: _0x1708f8,
                        headers: _0x244f1c,
                        form: JSON.parse(_0x105d09),
                        proxy: "http://" + _0x2140e0
                    };
                }

                !_0x2140e0 && delete _0x5875fc.proxy;

                this.request[_0x54bbb5.toLowerCase()](_0x5875fc, (_0x45bbe4, _0x5a7e74, _0xfd2bcc) => {
                    try {
                        _0xfd2bcc && LOGS == 1 && (console.log("================ 请求 ================"), console.log(_0x5875fc), console.log("================ 返回 ================"), $.safeGet(_0xfd2bcc) ? console.log(JSON.parse(_0xfd2bcc)) : console.log(_0xfd2bcc));
                    } catch (_0x5977f7) {
                        console.log(_0x5977f7, _0x1708f8 + "\n" + _0x244f1c);
                    } finally {
                        let _0x9865a5 = "";

                        if (!_0x45bbe4) {
                            if ($.safeGet(_0xfd2bcc)) {
                                _0x9865a5 = JSON.parse(_0xfd2bcc);
                            } else {
                                if (_0xfd2bcc.indexOf("/") != -1 && _0xfd2bcc.indexOf("+") != -1) {
                                    _0x9865a5 = _0xfd2bcc;
                                } else {
                                    _0x9865a5 = _0xfd2bcc;
                                }
                            }
                        } else {
                            _0x9865a5 = _0x1708f8 + "   API请求失败，请检查网络重试\n" + _0x45bbe4;
                        }

                        return _0x39d963(_0x9865a5);
                    }
                });
            });
        }

        parseHTML(_0x1ef2bb) {
            const _0x3d611b = require("cheerio"),
                _0x2274aa = _0x3d611b.load(_0x1ef2bb),
                _0x55aa78 = [],
                _0x13bcf1 = _0x2274aa(".task_module");

            _0x13bcf1.each((_0x35b3cd, _0x5eb2d9) => {
                const _0xceea99 = _0x2274aa(_0x5eb2d9),
                    _0x46ba1 = _0xceea99.find(".welfare_title h1").text(),
                    _0x38d45e = _0xceea99.find(".task_list .list_item"),
                    _0x6c73f4 = [];

                _0x38d45e.each((_0x37bc96, _0x3f0013) => {
                    const _0x5232ef = _0x2274aa(_0x3f0013),
                        _0x39419b = _0x5232ef.find(".task_name").text().trim(),
                        _0x25f848 = _0x5232ef.find(".havegold").text().trim(),
                        _0x5236e7 = _0x5232ef.find(".task_other").text().trim(),
                        _0x18c46e = {
                            name: _0x39419b,
                            reward: _0x25f848,
                            other: _0x5236e7
                        };

                    _0x6c73f4.push(_0x18c46e);
                });

                const _0x32ee0d = {
                    title: _0x46ba1,
                    tasks: _0x6c73f4
                };

                _0x55aa78.push(_0x32ee0d);
            });

            return _0x55aa78;
        }

        async readUUID() {
            const _0x4e8768 = "uuid.txt";
            await $.generateUUID(_0x4e8768);

            try {
                const _0x437e17 = fs.readFileSync(_0x4e8768, "utf8"),
                    _0x154eed = _0x437e17.trim();

                return _0x154eed;
            } catch (_0x40aa4d) {
                return null;
            }
        }

        generateUUID(_0x3bfad5) {
            if (fs.existsSync(_0x3bfad5)) {
                return;
            }

            const _0x5b421f = uuidv4();

            fs.writeFile(_0x3bfad5, _0x5b421f, "utf8", _0x2d3be1 => {
                if (_0x2d3be1) {
                    console.error("写入文件出错: " + _0x2d3be1.message);
                    return;
                }
            });
        }

        async getkami() {
            let _0x476d4e = await $.readUUID(),
                _0x31005a = await $.task("get", "http://" + dcfhost + ":5705/query?dcf=" + dcfkey + "&MA=" + _0x476d4e, {});

            return _0x31005a;
        }

        async SendMsg(_0x6dd6ac) {
            if (!_0x6dd6ac) {
                return;
            }

            if (Notify == 1) {
                var _0x31d97e = require("./sendNotify");

                await _0x31d97e.sendNotify(NAME, _0x6dd6ac);
            }
        }

        lengthInUtf8Bytes(_0x665424) {
            let _0x5290dd = encodeURIComponent(_0x665424).match(/%[89ABab]/g);

            return _0x665424.length + (_0x5290dd ? _0x5290dd.length : 0);
        }

        randomArr(_0x586521) {
            return _0x586521[parseInt(Math.random() * _0x586521.length, 10)];
        }

        wait(_0x3132ab) {
            return new Promise(_0x44ed76 => setTimeout(_0x44ed76, _0x3132ab));
        }

        time(_0x227d19) {
            return _0x227d19 == 10 ? Math.round(+new Date() / 1000) : +new Date();
        }

        timenow(_0xe1018) {
            let _0x480619 = new Date();

            if (_0xe1018 == undefined) {
                let _0xf40502 = new Date(),
                    _0x333ea0 = _0xf40502.getFullYear() + "-",
                    _0x2ec6e1 = (_0xf40502.getMonth() + 1 < 10 ? "0" + (_0xf40502.getMonth() + 1) : _0xf40502.getMonth() + 1) + "-",
                    _0x5653c1 = _0xf40502.getDate() + " ",
                    _0x2ef37b = _0xf40502.getHours() + ":",
                    _0x6f53d9 = _0xf40502.getMinutes() + ":",
                    _0x5c151b = _0xf40502.getSeconds() + 1 < 10 ? "0" + _0xf40502.getSeconds() : _0xf40502.getSeconds();

                return _0x333ea0 + _0x2ec6e1 + _0x5653c1 + _0x2ef37b + _0x6f53d9 + _0x5c151b;
            } else {
                if (_0xe1018 == 0) {
                    return _0x480619.getFullYear();
                } else {
                    if (_0xe1018 == 1) {
                        return _0x480619.getMonth() + 1 < 10 ? "0" + (_0x480619.getMonth() + 1) : _0x480619.getMonth() + 1;
                    } else {
                        if (_0xe1018 == 2) {
                            return _0x480619.getDate();
                        } else {
                            if (_0xe1018 == 3) {
                                return _0x480619.getHours();
                            } else {
                                if (_0xe1018 == 4) {
                                    return _0x480619.getMinutes();
                                } else {
                                    if (_0xe1018 == 5) {
                                        return _0x480619.getSeconds() + 1 < 10 ? "0" + _0x480619.getSeconds() : _0x480619.getSeconds();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        safeGet(_0x47d87c) {
            try {
                if (typeof JSON.parse(_0x47d87c) == "object") {
                    return true;
                }
            } catch (_0xc00588) {
                return false;
            }
        }

        SJS(_0x306473, _0x525d6b) {
            if (_0x525d6b == 0) {
                let _0x23eedb = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789",
                    _0x529583 = _0x23eedb.length,
                    _0x6f709a = "";

                for (let _0x6b36b1 = 0; _0x6b36b1 < _0x306473; _0x6b36b1++) {
                    _0x6f709a += _0x23eedb.charAt(Math.floor(Math.random() * _0x529583));
                }

                return _0x6f709a;
            } else {
                if (_0x525d6b == 1) {
                    let _0x3b9381 = "qwertyuiopasdfghjklzxcvbnm0123456789",
                        _0x3dd551 = _0x3b9381.length,
                        _0x534c04 = "";

                    for (let _0x54958c = 0; _0x54958c < _0x306473; _0x54958c++) {
                        _0x534c04 += _0x3b9381.charAt(Math.floor(Math.random() * _0x3dd551));
                    }

                    return _0x534c04;
                } else {
                    let _0x151f29 = "0123456789",
                        _0x403c1c = _0x151f29.length,
                        _0x4d8fa8 = "";

                    for (let _0x3fe681 = 0; _0x3fe681 < _0x306473; _0x3fe681++) {
                        _0x4d8fa8 += _0x151f29.charAt(Math.floor(Math.random() * _0x403c1c));
                    }

                    return _0x4d8fa8;
                }
            }
        }

        udid(_0x1af1c8) {
            function _0x4ddb25() {
                return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
            }

            let _0x367fd5 = _0x4ddb25() + _0x4ddb25() + "-" + _0x4ddb25() + "-" + _0x4ddb25() + "-" + _0x4ddb25() + "-" + _0x4ddb25() + _0x4ddb25() + _0x4ddb25();

            if (_0x1af1c8 == 0) {
                return _0x367fd5.toUpperCase();
            } else {
                return _0x367fd5.toLowerCase();
            }
        }

        encodeUnicode(_0xb48368) {
            var _0x79034d = [];

            for (var _0x2a75eb = 0; _0x2a75eb < _0xb48368.length; _0x2a75eb++) {
                _0x79034d[_0x2a75eb] = ("00" + _0xb48368.charCodeAt(_0x2a75eb).toString(16)).slice(-4);
            }

            return "\\u" + _0x79034d.join("\\u");
        }

        base64ToHex(_0x327c46) {
            const _0x266291 = atob(_0x327c46),
                _0x410f17 = new Uint8Array(_0x266291.length);

            for (let _0xc84f0f = 0; _0xc84f0f < _0x266291.length; _0xc84f0f++) {
                _0x410f17[_0xc84f0f] = _0x266291.charCodeAt(_0xc84f0f);
            }

            let _0x3c2df5 = "";

            for (let _0x51f04b = 0; _0x51f04b < _0x410f17.length; _0x51f04b++) {
                const _0x1868e1 = _0x410f17[_0x51f04b].toString(16).padStart(2, "0");

                _0x3c2df5 += _0x1868e1;
            }

            return _0x3c2df5;
        }

        decodeUnicode(_0x38b88) {
            _0x38b88 = _0x38b88.replace(/\\u/g, "%u");
            return unescape(unescape(_0x38b88));
        }

        RT(_0x5bfff4, _0x4da392) {
            return Math.round(Math.random() * (_0x4da392 - _0x5bfff4) + _0x5bfff4);
        }

        arrNull(_0x588053) {
            var _0x5de676 = _0x588053.filter(_0x193a0c => {
                return _0x193a0c && _0x193a0c.trim();
            });

            return _0x5de676;
        }

        nowtime() {
            return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
        }

        timecs() {
            let _0xb10eec = $.nowtime();

            if (JSON.stringify(_0xb10eec).indexOf(" ") >= 0) {
                _0xb10eec = _0xb10eec.replace(" ", "T");
            }

            return new Date(_0xb10eec).getTime() - 28800000;
        }

        rtjson(_0x3d62f7, _0x3ec730, _0x4bc545, _0x5216bb) {
            if (_0x5216bb == 0) {
                return JSON.stringify(_0x3d62f7.split(_0x3ec730).reduce((_0x3cdba5, _0x4c6b53) => {
                    let _0x3ee123 = _0x4c6b53.split(_0x4bc545);

                    _0x3cdba5[_0x3ee123[0].trim()] = _0x3ee123[1].trim();
                    return _0x3cdba5;
                }, {}));
            } else {
                return _0x3d62f7.split(_0x3ec730).reduce((_0x567887, _0x14206e) => {
                    let _0x12abdd = _0x14206e.split(_0x4bc545);

                    _0x567887[_0x12abdd[0].trim()] = _0x12abdd[1].trim();
                    return _0x567887;
                }, {});
            }
        }

        MD5Encrypt(_0x4ed79f, _0x1ec3dd) {
            if (_0x4ed79f == 0) {
                return this.CryptoJS.MD5(_0x1ec3dd).toString().toLowerCase();
            } else {
                if (_0x4ed79f == 1) {
                    return this.CryptoJS.MD5(_0x1ec3dd).toString().toUpperCase();
                } else {
                    if (_0x4ed79f == 2) {
                        return this.CryptoJS.MD5(_0x1ec3dd).toString().substring(8, 24).toLowerCase();
                    } else {
                        if (_0x4ed79f == 3) {
                            return this.CryptoJS.MD5(_0x1ec3dd).toString().substring(8, 24).toUpperCase();
                        }
                    }
                }
            }
        }

        SHA_Encrypt(_0x50f7c2, _0x44bef3, _0x41409c) {
            return _0x50f7c2 == 0 ? this.CryptoJS[_0x44bef3](_0x41409c).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x44bef3](_0x41409c).toString();
        }

        HmacSHA_Encrypt(_0x2db698, _0x5e058d, _0x360fa6, _0x1bc41e) {
            if (_0x2db698 == 0) {
                return this.CryptoJS[_0x5e058d](_0x360fa6, _0x1bc41e).toString(this.CryptoJS.enc.Base64);
            } else {
                return this.CryptoJS[_0x5e058d](_0x360fa6, _0x1bc41e).toString();
            }
        }

        Base64(_0x59b1c3, _0x1ca686) {
            if (_0x59b1c3 == 0) {
                return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x1ca686));
            } else {
                return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x1ca686));
            }
        }

        DecryptCrypto(_0x243f76, _0x1c98f4, _0x3c073c, _0x224649, _0x7e0349, _0x2ce66a, _0x39e822) {
            if (_0x243f76 == 0) {
                const _0x40276c = this.CryptoJS[_0x1c98f4].encrypt(this.CryptoJS.enc.Utf8.parse(_0x7e0349), this.CryptoJS.enc.Utf8.parse(_0x2ce66a), {
                    iv: this.CryptoJS.enc.Utf8.parse(_0x39e822),
                    mode: this.CryptoJS.mode[_0x3c073c],
                    padding: this.CryptoJS.pad[_0x224649]
                });

                return _0x40276c.toString();
            } else {
                const _0x268fdb = this.CryptoJS[_0x1c98f4].decrypt(_0x7e0349, this.CryptoJS.enc.Utf8.parse(_0x2ce66a), {
                    iv: this.CryptoJS.enc.Utf8.parse(_0x39e822),
                    mode: this.CryptoJS.mode[_0x3c073c],
                    padding: this.CryptoJS.pad[_0x224649]
                });

                return _0x268fdb.toString(this.CryptoJS.enc.Utf8);
            }
        }

        RSA(_0x461699, _0x3a536b) {
            const _0x54e374 = require("node-rsa");

            let _0x1f74a7 = new _0x54e374("-----BEGIN PUBLIC KEY-----\n" + _0x3a536b + "\n-----END PUBLIC KEY-----");

            _0x1f74a7.setOptions({
                encryptionScheme: "pkcs1"
            });

            return _0x1f74a7.encrypt(_0x461699, "base64", "utf8");
        }

        getSHA256withRSA(_0x1ac001) {
            const _0xe13756 = rs.KEYUTIL.getKey(privateKeyString),
                _0x23df80 = new rs.KJUR.crypto.Signature({
                    alg: "SHA1withRSA"
                });

            _0x23df80.init(_0xe13756);

            _0x23df80.updateString(_0x1ac001);

            const _0x39933d = _0x23df80.sign(),
                _0x1beb89 = rs.hextob64u(_0x39933d);

            return _0x1beb89;
        }

        hexToBase64(_0x7d7a7f) {
            const _0x53f709 = [];

            for (let _0x345c0e = 0; _0x345c0e < _0x7d7a7f.length; _0x345c0e += 2) {
                _0x53f709.push(parseInt(_0x7d7a7f.substr(_0x345c0e, 2), 16));
            }

            const _0x568c6a = btoa(String.fromCharCode(..._0x53f709));

            return _0x568c6a;
        }

        Sha1withRsa(_0x1603d5) {
            const {
                    KEYUTIL: _0x174e96,
                    KJUR: _0x4d3528,
                    b64utoutf8: _0x25852f,
                    utf8tob64: _0x614551
                } = require("jsrsasign"),
                _0x35b219 = _0x174e96.getKey(Key),
                _0x2f8aff = new _0x4d3528.crypto.Signature({
                    alg: "SHA1withRSA"
                });

            _0x2f8aff.init(_0x35b219);

            _0x2f8aff.updateString(_0x1603d5);

            const _0x12faf5 = _0x2f8aff.sign();

            let _0x258991 = $.hexToBase64(_0x12faf5);

            return _0x258991;
        }

    }();
}