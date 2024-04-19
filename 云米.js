/*
APP：云米
变量名：yunmick
变量值：手机号#登陆密码
每天完成日常任务，获得积分。可以兑换虚拟卡密或者话费
定时：每天3次，多运行几次也无所谓
*/
NAME = "☁️云米☁️";
VALY = ["yunmick"];
CK = "";
LOGS = 0;
usid = 0;

var rs = require("jsrsasign");

nowhour = Math.round(new Date().getHours()).toString();
var privateKeyString = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCjt1ezXsFT2CbatkvArG435WYhCLeWSd6yd2zLNEs5pBP0eS89Vom+nO+GrN5p1T1MrDHUakX6nSIQgKrC00cmXNvEXlO4++WwN3Ich15EA3dUhIMr2LTolRvRfNpEIHQMObxD11POBtdOhKdqieQcieeXfshUHki0jutkKClrCuX2bslHXc4GxhsW8H2uP2ahChVP/pXcfkGZRU/bmQoYeeWEd5uQADP/N3dq0STq6+EEMJngd8MR4PjmCjWIafDBVdbL2TJSW3sVG4fPz2xs/HKUISkH7Uwfj0u/oEatiz456buJNop5cug3MyDwlE8xurwN/f2PYK+0EV4k04LrAgMBAAECggEAWsKNkBb7vmuaPq3JGSt+fuZh0/ZtMJgLKY0jdxOqkG3x0hpMogiTnGSMNXEobCuXLCZaCZRQ7zqlY9iw0gkm7JGWFCrm5ypej25tiHtTOwlg4i4EOg6NXFMtdNlud042h4CKamG5SAJq4lCQL3P6Tgf1p/rVPCz9yXth68iIDZq73vhVV9qxSVlw1pIQbx7AQZ0aFBfUrjyDqtFvGX6S1uTzIUGi22bkdJSFCubUjSIfhUGEio2EBZ4BmQRzPI/X6AZ2VFQC3Ak7bQs29i0CseGV2bRnL/nHkZ5hLyDD7eBvOp4QgcQAIx2MtPS/3LcPW3T0DLYMb3Al724FhYb1QQKBgQDrlbRBszNHZWt4frxhNMzyHEKZgUDBXr27VC4b4Qb6wzopQJQxthZY256HOZdtNkH2oSwKKNFg0Qdl4PVIc07KmqYDzhvyo5U2vxXXL/GCAy40SLHNFhYv9H7Yt2cRu26S8sZJTbi0IXs+0rw2z3bvJR6ewHkkqsaIie3wb3BCgwKBgQCx50e0Ix4lFVeh1V8n7+mRPHK8JPkDGAaT6ng6lN53PS5NmOMv7Lp6lSVeytw0iQPndcDSQrKnc9JHsIOFNyGZmIkcORuIHdlaBaZJCVyZVZEyky1J0cJtAXM+mSmn1d5YZNX5H+xrgJj9uyZbgV9aygkp8ih6fhdIVzvi0YMxeQKBgE05fqRGxNlzkn4mNUQ8Fa6Luv0s1HhOwS0mFBNJeYs78dXR+IIvKTYpj9bN9yhyr77T6GbQKIpvGti3nFAKlFpvxVnb92dbXi9bBiLK8YTn2/6Bkd8jjVRc9jO+MwgqA74h3QPseU565zaZx97DtT4BUf9CIrP1Uy0w4ZF+RjNXAoGBAJyXbR/8QU526LnELIvkuvxh7sP4705v2WpdWhKGcwMV0SnwRxkqEEJSAaDcgtOjPtJ/bYgluUd3xUHg9wNNMcAW6aj0A23eiDCbBHEJUn6NOM8BiT2O6so0GpKhEm9u6tV3fHhaRymg+glssCifSaWKbGKFime3kRrV3hqaPBZRAoGBAJd9GMMInly7M7QIzW3khBWE1srvpThrNoOoRQUCQn8f4Pkmlfs57HzuX+qvaV8aNyFJ+Nn3bzBP7SqWRySExNRC1a22iO19AtrNZT9mvmncKZKe58kBYAfQqutUhNPKYOiUinIgWjcB+rhtPzD+Be9fnBk/gieQ+HpxWQtvLeKl\n-----END PRIVATE KEY-----";

const fs = require("fs");
dcfhost = process.env.dcfhost;
Notify = 1;

class Bar {
  constructor(_0x1e65d1) {
    this.phone = $.base64ToHex($.DecryptCrypto("0", "AES", "CBC", "Pkcs7", _0x1e65d1.split("#")[0], "znT4VmKA%ksP**7x", "d#$5a@Bp^udR4XuZ"));
    this.pwd = $.MD5Encrypt(1, _0x1e65d1.split("#")[1]);
    this.message = "";
    this.logs = true;
  }

  async login() {
    let _0x2c977f = await $.task("get", "https://ms.viomi.com.cn/user-web/services/login/withPwd.json?account=" + this.phone + "&pwd=" + this.pwd, {});

    if (_0x2c977f.mobBaseRes.code == 100) {
      this.token = _0x2c977f.mobBaseRes.result.token;
      this.uid = _0x2c977f.mobBaseRes.result.userBaseInfo.id;
      this.name = _0x2c977f.mobBaseRes.result.userBaseInfo.nickname;
      console.log("【" + this.name + "】登陆成功");
      this.logs = true;
    } else {
      this.logs = false;
    }
  }

  async tasklist() {
    let _0x1f949a = await $.task("get", "https://ms.viomi.com.cn/viomi-gateway/store-market/market/taskSet/getTaskModule?sourceChannel=3&taskSetId=51&token=" + this.token, {});

    if (_0x1f949a.mobBaseRes.code == 100) {
      for (let _0x290e54 of _0x1f949a.mobBaseRes.result) {
        this.taskty = _0x290e54.taskType;
        this.taskid = _0x290e54.taskId;

        if (_0x290e54.completeStatus == false) {
          if (_0x290e54.taskName == "浏览指定页面") {
            let _0x50d509 = JSON.parse(_0x290e54.buttonJumpConfig);

            this.llid = JSON.parse(_0x50d509.link).layoutId;
            await this.dotask(this.llid, this.taskty, this.taskid);
          } else {
            if (_0x290e54.taskName == "浏览发现页") {
              let _0x40ee9b = JSON.parse(_0x290e54.buttonJumpConfig);

              this.fxid = JSON.parse(_0x40ee9b.link).articleId;
              await this.dotask(this.fxid, this.taskty, this.taskid);
            } else {
              let _0x503cbe = JSON.parse(_0x290e54.buttonJumpConfig);

              this.fxid = JSON.parse(_0x503cbe.link).actionID;
              await this.dotask(this.fxid, this.taskty, this.taskid);
            }
          }
        }
      }
    }
  }

  async dotask(_0x1a0d88, _0x3efd44, _0x2b925a) {
    let _0x18dd69 = $.time(13),
        _0x43cc62 = _0x18dd69.toString(),
        _0xf662c3 = _0x43cc62.substring(_0x43cc62.length - 12),
        _0x6153c7 = _0x18dd69 + "\n" + _0xf662c3 + "\npageId=" + _0x1a0d88 + "&sourceChannel=3&taskConfigId=" + _0x2b925a + "&token=" + this.token + "&type=" + _0x3efd44 + "\n",
        _0x4589ee = $.getSHA256withRSA(_0x6153c7).replace(/-/g, "+").replace(/_/g, "/"),
        _0x17310f = {
      "x-timestamp": _0x18dd69,
      "x-nonce": _0xf662c3,
      "x-signature": _0x4589ee + "==",
      "x-app-id": "viomi_app"
    },
        _0x37120b = await $.task("get", "https://ms.viomi.com.cn/viomi-gateway/store-market/market/taskSet/topicPageTask?pageId=" + _0x1a0d88 + "&sourceChannel=3&taskConfigId=" + _0x2b925a + "&token=" + this.token + "&type=" + _0x3efd44, _0x17310f);

    _0x37120b.mobBaseRes.code == 100 && console.log("【" + this.name + "】" + _0x37120b.mobBaseRes.result.prizeToast);
  }

  async signtask() {
    let _0x41a0f5 = await $.task("get", "https://ms.viomi.com.cn/vstore-api/user-operation/sign/querySignPageInfo?signType=2&sourceChannel=3&token=" + this.token, {});

    if (_0x41a0f5.mobBaseRes.result.signed == false) {
      await this.signin();
    }
  }

  async signin() {
    let _0x4a5a26 = await $.task("put", "https://ms.viomi.com.cn/behavior-web/services/sign/userSign/v2.json?signType=2&sourceChannel=3&timeStamp=1694768359104&token=" + this.token, {});

    console.log("【" + this.name + "】已连续签到" + _0x4a5a26.mobBaseRes.result.continueDays + "天，本次获得" + _0x4a5a26.mobBaseRes.result.points);
  }

  async userinfo() {
    let _0x938ea1 = await $.task("get", "https://ms.viomi.com.cn/membership-web/services/membershipBaseInfo/getMembershipInfoAndPoints?token=" + this.token + "&platform=3", {});

    console.log("【" + this.name + "】当前积分 " + _0x938ea1.mobBaseRes.result.points + "☁️");
    this.message += "【" + this.name + "】当前积分 " + _0x938ea1.mobBaseRes.result.points + "☁️";
  }

}

$ = DD();
!(async () => {
  console.log(NAME);
  
    await $.ExamineCookie();

    if ($.cookie_list.length < 11) {
      await $.Multithreading("login");

      let _0x541bb4 = $.cookie_list.filter(_0x53f8d5 => _0x53f8d5.logs == true);

      if (_0x541bb4.length == 0) {
        console.log("Cookie格式错误 或 账号被禁封");
        return;
      } else {
        await $.Multithreading("tasklist");
        await $.Multithreading("signtask");
        await $.Multithreading("userinfo");
      }
    } else {
      console.log("账号数量超过限制，请减少账号数量后重试！");
    }
  

  let _0x42e4b2 = [];

  for (let _0x47c953 of $.cookie_list) {
    if (_0x47c953.message) {
      _0x42e4b2.push(_0x47c953.message);
    }
  }

  if (_0x42e4b2.length > 0) {
    await $.SendMsg(_0x42e4b2.join("\n"));
  }
})().catch(_0x5996af => {
  console.log(_0x5996af);
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

    async Multithreading(_0x3fffaf, _0x4ff9b5, _0x1fddb5) {
      let _0x5e9ca2 = [];

      if (!_0x1fddb5) {
        _0x1fddb5 = 1;
      }

      while (_0x1fddb5--) {
        for (let _0x4b8fd8 of $.cookie_list) {
          _0x5e9ca2.push(_0x4b8fd8[_0x3fffaf](_0x4ff9b5));
        }
      }

      await Promise.allSettled(_0x5e9ca2);
    }

    ExamineCookie() {
      let _0x11e0bb = process.env[VALY] || CK,
          _0x5afc6b = 0;

      if (_0x11e0bb) {
        for (let _0x3ec001 of _0x11e0bb.split("\n").filter(_0x2d3cc5 => !!_0x2d3cc5)) {
          $.cookie_list.push(new Bar(_0x3ec001));
        }

        _0x5afc6b = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }

      console.log("共找到" + _0x5afc6b + "个账号");
      return $.cookie_list;
    }

    task(_0x35685b, _0x239a86, _0x19aa02, _0x52c49f, _0x2cc149) {
      if (_0x35685b == "delete") {
        _0x35685b = _0x35685b.toUpperCase();
      } else {
        _0x35685b = _0x35685b;
      }

      if (_0x35685b == "post") {
        delete _0x19aa02["content-type"];
        delete _0x19aa02["Content-type"];
        delete _0x19aa02["content-Type"];

        if ($.safeGet(_0x52c49f)) {
          _0x19aa02["Content-Type"] = "application/json;charset=UTF-8";
        } else {
          _0x19aa02["Content-Type"] = "application/x-www-form-urlencoded";
        }

        _0x52c49f && (_0x19aa02["Content-Length"] = $.lengthInUtf8Bytes(_0x52c49f));
      }

      if (_0x35685b == "get") {
        delete _0x19aa02["content-type"];
        delete _0x19aa02["Content-type"];
        delete _0x19aa02["content-Type"];
        delete _0x19aa02["Content-Length"];
      }

      _0x19aa02.Host = _0x239a86.replace("//", "/").split("/")[1];
      return new Promise(async _0x3d9c65 => {
        if (_0x35685b.indexOf("T") < 0) {
          var _0x350efb = {
            url: _0x239a86,
            headers: _0x19aa02,
            body: _0x52c49f,
            proxy: "http://" + _0x2cc149
          };
        } else {
          var _0x350efb = {
            url: _0x239a86,
            headers: _0x19aa02,
            form: JSON.parse(_0x52c49f),
            proxy: "http://" + _0x2cc149
          };
        }

        if (!_0x2cc149) {
          delete _0x350efb.proxy;
        }

        this.request[_0x35685b.toLowerCase()](_0x350efb, (_0x5e51d9, _0x5c5372, _0x215f3f) => {
          try {
            _0x215f3f && LOGS == 1 && (console.log("================ 请求 ================"), console.log(_0x350efb), console.log("================ 返回 ================"), $.safeGet(_0x215f3f) ? console.log(JSON.parse(_0x215f3f)) : console.log(_0x215f3f));
          } catch (_0x2dd8b0) {
            console.log(_0x2dd8b0, _0x239a86 + "\n" + _0x19aa02);
          } finally {
            let _0x2c2105 = "";

            if (!_0x5e51d9) {
              if ($.safeGet(_0x215f3f)) {
                _0x2c2105 = JSON.parse(_0x215f3f);
              } else {
                if (_0x215f3f.indexOf("/") != -1 && _0x215f3f.indexOf("+") != -1) {
                  _0x2c2105 = _0x215f3f;
                } else {
                  _0x2c2105 = _0x215f3f;
                }
              }
            } else {
              _0x2c2105 = _0x239a86 + "   API请求失败，请检查网络重试\n" + _0x5e51d9;
            }

            return _0x3d9c65(_0x2c2105);
          }
        });
      });
    }

    async SendMsg(_0x482930) {
      if (!_0x482930) {
        return;
      }

      if (Notify == 1) {
        var _0x578e05 = require("./sendNotify");

        await _0x578e05.sendNotify(NAME, _0x482930);
      }
    }

    async readUUID() {
      const _0x557f1e = "uuid.txt";
      await $.generateUUID(_0x557f1e);

      try {
        const _0x3b9953 = fs.readFileSync(_0x557f1e, "utf8"),
              _0x1ae0ce = _0x3b9953.trim();

        return _0x1ae0ce;
      } catch (_0x35dbe9) {
        return null;
      }
    }

    generateUUID(_0x515473) {
      if (fs.existsSync(_0x515473)) {
        return;
      }

      const _0x340af4 = uuidv4();

      fs.writeFile(_0x515473, _0x340af4, "utf8", _0x4cdfaf => {
        if (_0x4cdfaf) {
          console.error("写入文件出错: " + _0x4cdfaf.message);
          return;
        }
      });
    }

    async getkami() {
      let _0x1e2457 = await $.readUUID(),
          _0x1b942d = await $.task("get", "http://" + dcfhost + ":5705/query?dcf=" + dcfkey + "&MA=" + _0x1e2457, {});

      return _0x1b942d;
    }

    lengthInUtf8Bytes(_0x474ce2) {
      let _0x465d83 = encodeURIComponent(_0x474ce2).match(/%[89ABab]/g);

      return _0x474ce2.length + (_0x465d83 ? _0x465d83.length : 0);
    }

    randomArr(_0x15c848) {
      return _0x15c848[parseInt(Math.random() * _0x15c848.length, 10)];
    }

    wait(_0x5bff14) {
      return new Promise(_0x2e3d18 => setTimeout(_0x2e3d18, _0x5bff14));
    }

    time(_0x551bd7) {
      if (_0x551bd7 == 10) {
        return Math.round(+new Date() / 1000);
      } else {
        return +new Date();
      }
    }

    timenow(_0x512f06) {
      let _0x202847 = new Date();

      if (_0x512f06 == undefined) {
        let _0x4f93b9 = new Date(),
            _0x12dfcf = _0x4f93b9.getFullYear() + "-",
            _0x3b4550 = (_0x4f93b9.getMonth() + 1 < 10 ? "0" + (_0x4f93b9.getMonth() + 1) : _0x4f93b9.getMonth() + 1) + "-",
            _0xe192ee = _0x4f93b9.getDate() + " ",
            _0x1f71e6 = _0x4f93b9.getHours() + ":",
            _0x3f9eec = _0x4f93b9.getMinutes() + ":",
            _0x43e4b4 = _0x4f93b9.getSeconds() + 1 < 10 ? "0" + _0x4f93b9.getSeconds() : _0x4f93b9.getSeconds();

        return _0x12dfcf + _0x3b4550 + _0xe192ee + _0x1f71e6 + _0x3f9eec + _0x43e4b4;
      } else {
        if (_0x512f06 == 0) {
          return _0x202847.getFullYear();
        } else {
          if (_0x512f06 == 1) {
            return _0x202847.getMonth() + 1 < 10 ? "0" + (_0x202847.getMonth() + 1) : _0x202847.getMonth() + 1;
          } else {
            if (_0x512f06 == 2) {
              return _0x202847.getDate();
            } else {
              if (_0x512f06 == 3) {
                return _0x202847.getHours();
              } else {
                if (_0x512f06 == 4) {
                  return _0x202847.getMinutes();
                } else {
                  if (_0x512f06 == 5) {
                    return _0x202847.getSeconds() + 1 < 10 ? "0" + _0x202847.getSeconds() : _0x202847.getSeconds();
                  }
                }
              }
            }
          }
        }
      }
    }

    safeGet(_0x47137d) {
      try {
        if (typeof JSON.parse(_0x47137d) == "object") {
          return true;
        }
      } catch (_0x242d95) {
        return false;
      }
    }

    SJS(_0x5887c1, _0x275f06) {
      if (_0x275f06 == 0) {
        let _0x190713 = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789",
            _0x55b155 = _0x190713.length,
            _0x1681d1 = "";

        for (let _0x418f6d = 0; _0x418f6d < _0x5887c1; _0x418f6d++) {
          _0x1681d1 += _0x190713.charAt(Math.floor(Math.random() * _0x55b155));
        }

        return _0x1681d1;
      } else {
        if (_0x275f06 == 1) {
          let _0x380de1 = "qwertyuiopasdfghjklzxcvbnm0123456789",
              _0x177399 = _0x380de1.length,
              _0x465436 = "";

          for (let _0x41aa7d = 0; _0x41aa7d < _0x5887c1; _0x41aa7d++) {
            _0x465436 += _0x380de1.charAt(Math.floor(Math.random() * _0x177399));
          }

          return _0x465436;
        } else {
          let _0x1f8992 = "0123456789",
              _0x102a53 = _0x1f8992.length,
              _0x4852a8 = "";

          for (let _0x2fc06b = 0; _0x2fc06b < _0x5887c1; _0x2fc06b++) {
            _0x4852a8 += _0x1f8992.charAt(Math.floor(Math.random() * _0x102a53));
          }

          return _0x4852a8;
        }
      }
    }

    udid(_0x274d1a) {
      function _0x494649() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }

      let _0x201547 = _0x494649() + _0x494649() + "-" + _0x494649() + "-" + _0x494649() + "-" + _0x494649() + "-" + _0x494649() + _0x494649() + _0x494649();

      if (_0x274d1a == 0) {
        return _0x201547.toUpperCase();
      } else {
        return _0x201547.toLowerCase();
      }
    }

    encodeUnicode(_0xcdf40e) {
      var _0x373f49 = [];

      for (var _0x102637 = 0; _0x102637 < _0xcdf40e.length; _0x102637++) {
        _0x373f49[_0x102637] = ("00" + _0xcdf40e.charCodeAt(_0x102637).toString(16)).slice(-4);
      }

      return "\\u" + _0x373f49.join("\\u");
    }

    base64ToHex(_0x1b2775) {
      const _0x4a1b10 = atob(_0x1b2775),
            _0x3549bc = new Uint8Array(_0x4a1b10.length);

      for (let _0x55c95b = 0; _0x55c95b < _0x4a1b10.length; _0x55c95b++) {
        _0x3549bc[_0x55c95b] = _0x4a1b10.charCodeAt(_0x55c95b);
      }

      let _0x1d5da9 = "";

      for (let _0x23791c = 0; _0x23791c < _0x3549bc.length; _0x23791c++) {
        const _0x5db1db = _0x3549bc[_0x23791c].toString(16).padStart(2, "0");

        _0x1d5da9 += _0x5db1db;
      }

      return _0x1d5da9;
    }

    decodeUnicode(_0x1256af) {
      _0x1256af = _0x1256af.replace(/\\u/g, "%u");
      return unescape(unescape(_0x1256af));
    }

    RT(_0x3c769e, _0x4646b0) {
      return Math.round(Math.random() * (_0x4646b0 - _0x3c769e) + _0x3c769e);
    }

    arrNull(_0x58d8ee) {
      var _0x2c0268 = _0x58d8ee.filter(_0x28c21a => {
        return _0x28c21a && _0x28c21a.trim();
      });

      return _0x2c0268;
    }

    nowtime() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
    }

    timecs() {
      let _0x120d08 = $.nowtime();

      JSON.stringify(_0x120d08).indexOf(" ") >= 0 && (_0x120d08 = _0x120d08.replace(" ", "T"));
      return new Date(_0x120d08).getTime() - 28800000;
    }

    rtjson(_0x4b808c, _0x4cc7c1, _0x1e8314, _0x1bad35) {
      return _0x1bad35 == 0 ? JSON.stringify(_0x4b808c.split(_0x4cc7c1).reduce((_0xad06a1, _0xb9a3dc) => {
        let _0x56d64d = _0xb9a3dc.split(_0x1e8314);

        _0xad06a1[_0x56d64d[0].trim()] = _0x56d64d[1].trim();
        return _0xad06a1;
      }, {})) : _0x4b808c.split(_0x4cc7c1).reduce((_0x3d7264, _0x1f9e64) => {
        let _0x360938 = _0x1f9e64.split(_0x1e8314);

        _0x3d7264[_0x360938[0].trim()] = _0x360938[1].trim();
        return _0x3d7264;
      }, {});
    }

    MD5Encrypt(_0x563b4d, _0x571324) {
      if (_0x563b4d == 0) {
        return this.CryptoJS.MD5(_0x571324).toString().toLowerCase();
      } else {
        if (_0x563b4d == 1) {
          return this.CryptoJS.MD5(_0x571324).toString().toUpperCase();
        } else {
          if (_0x563b4d == 2) {
            return this.CryptoJS.MD5(_0x571324).toString().substring(8, 24).toLowerCase();
          } else {
            if (_0x563b4d == 3) {
              return this.CryptoJS.MD5(_0x571324).toString().substring(8, 24).toUpperCase();
            }
          }
        }
      }
    }

    SHA_Encrypt(_0x5ae22b, _0x2c6777, _0x3d9339) {
      return _0x5ae22b == 0 ? this.CryptoJS[_0x2c6777](_0x3d9339).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x2c6777](_0x3d9339).toString();
    }

    HmacSHA_Encrypt(_0x33600f, _0x2a393c, _0x8bbd3d, _0x324fed) {
      return _0x33600f == 0 ? this.CryptoJS[_0x2a393c](_0x8bbd3d, _0x324fed).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x2a393c](_0x8bbd3d, _0x324fed).toString();
    }

    Base64(_0x197249, _0x5c5368) {
      if (_0x197249 == 0) {
        return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x5c5368));
      } else {
        return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x5c5368));
      }
    }

    DecryptCrypto(_0x16404a, _0x53b44d, _0x3828a0, _0x1efa14, _0x1345b8, _0x33f264, _0x4a1527) {
      if (_0x16404a == 0) {
        const _0x189f25 = this.CryptoJS[_0x53b44d].encrypt(this.CryptoJS.enc.Utf8.parse(_0x1345b8), this.CryptoJS.enc.Utf8.parse(_0x33f264), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x4a1527),
          mode: this.CryptoJS.mode[_0x3828a0],
          padding: this.CryptoJS.pad[_0x1efa14]
        });

        return _0x189f25.toString();
      } else {
        const _0x3f86c6 = this.CryptoJS[_0x53b44d].decrypt(_0x1345b8, this.CryptoJS.enc.Utf8.parse(_0x33f264), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x4a1527),
          mode: this.CryptoJS.mode[_0x3828a0],
          padding: this.CryptoJS.pad[_0x1efa14]
        });

        return _0x3f86c6.toString(this.CryptoJS.enc.Utf8);
      }
    }

    RSA(_0x20c6a6, _0x1212b1) {
      const _0x1e9fc0 = require("node-rsa");

      let _0x125041 = new _0x1e9fc0("-----BEGIN PUBLIC KEY-----\n" + _0x1212b1 + "\n-----END PUBLIC KEY-----");

      _0x125041.setOptions({
        encryptionScheme: "pkcs1"
      });

      return _0x125041.encrypt(_0x20c6a6, "base64", "utf8");
    }

    getSHA256withRSA(_0x14c3c8) {
      const _0x4f31d1 = rs.KEYUTIL.getKey(privateKeyString),
            _0x3798ee = new rs.KJUR.crypto.Signature({
        alg: "SHA256withRSA"
      });

      _0x3798ee.init(_0x4f31d1);

      _0x3798ee.updateString(_0x14c3c8);

      const _0x177154 = _0x3798ee.sign(),
            _0x68c21e = rs.hextob64u(_0x177154);

      return _0x68c21e;
    }

  }();
}