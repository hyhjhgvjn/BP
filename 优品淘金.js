/*
变量名：yptjck
填入mobile#password#（提现变量0:关闭，1微信，2支付宝）填到变量，多账号换行隔开
完成日常任务，可以得金币，金币可以兑换提现到支付宝或者微信（一个账号对应一个微信/支付宝）
定时：一天跑8-12次都可以
苹果也有这个软件，但是没办法用密码登陆，用安卓玩！！
首次注册，去提现，可以免费提0.3元(需要绑定支付宝或者微信)
*/
NAME = "优品淘金";
VALY = ["yptjck"];
CK = "";
LOGS = 0;
usid = 0;
nowhour = Math.round(new Date().getHours()).toString();
Notify = 1;

const fs = require("fs");
dcfhost = process.env.dcfhost;

class Bar {
  constructor(_0x54d5d7) {
    this._ = ++usid;
    this.f = "账号 [" + this._ + "] ";
    this.phone = $.Base64(0, $.Base64(0, _0x54d5d7.split("#")[0]));
    this.pwd = $.Base64(0, $.Base64(0, _0x54d5d7.split("#")[1]));
    this.tixian = _0x54d5d7.split("#")[2];
    this.message = "";
    this.logs = true;
  }

  async login() {
    let _0x199f7d = $.time(13),
        _0x5d36c5 = $.Base64(0, $.Base64(0, _0x199f7d + "xiaoyingujtao")),
        _0x35d080 = {
      tm: _0x199f7d,
      sign: _0x5d36c5
    },
        _0x57914b = "{\"mobile\":\"" + this.phone + "\",\"password\":\"" + this.pwd + "\"}",
        _0x245656 = await $.task("post", "https://mall.ujtao.com/app_mallapi/user/userLogin", _0x35d080, _0x57914b);

    if (_0x245656.code == 0) {
      this.authorization = _0x245656.data.token;
      this.logs = true;
      await this.userinfo();
    } else {
      this.logs = false;
    }
  }

  async userinfo() {
    let _0x2115b8 = {
      authorization: this.authorization
    },
        _0x54a00c = await $.task("get", "https://mall.ujtao.com/app_mallapi/user/userInfo", _0x2115b8);

    if (_0x54a00c.code == 0) {
      this.names = _0x54a00c.data.nickName;
      console.log("【" + this.names + "】登陆成功==>当前金币" + _0x54a00c.data.jbBalance);
      this.message += "【" + this.names + "】登陆成功==>当前金币" + _0x54a00c.data.jbBalance;

      if (_0x54a00c.data.jbBalance >= 139) {
        if (nowhour == 10 || nowhour == 14 || nowhour == 18) {
          if (this.tixian == 1) {
            await this.txlb();
          } else {
            this.tixian == 2 && (await this.txlb2());
          }
        }
      }
    }
  }

  async tasklist() {
    let _0x56c4ab = {
      authorization: this.authorization
    },
        _0x50b074 = await $.task("get", "https://mall.ujtao.com/app_mallapi/mallapp/goldrush/getgoldRushList", _0x56c4ab);

    for (let _0x392b32 = 0; _0x392b32 < _0x50b074.data.length; _0x392b32++) {
      for (let _0x27433e of _0x50b074.data[_0x392b32].goldRushList) {
        _0x27433e.isComplete == 0 && (this.name = _0x27433e.name, this.id = _0x27433e.id, await this.task(this.name, this.id), await this.taskfb(this.name, this.id));
      }
    }
  }

  async task(_0x4cea31, _0x10519d) {
    console.log("【" + this.names + "】完成" + _0x4cea31 + "任务");
    await $.wait(10000);
  }

  async taskfb(_0x3c8a56, _0x20643a) {
    console.log("【" + this.names + "】完成" + _0x3c8a56 + "视频任务");
    await $.wait(10000);
  }

  async signtask() {
    for (let _0x20b3d2 = 0; _0x20b3d2 < 4; _0x20b3d2++) {
      let _0x4171ca = {
        authorization: this.authorization
      },
          _0x511f45 = await $.task("get", "https://mall.ujtao.com/app_mallapi/usersign/sign?signSource=1", _0x4171ca);

      if (_0x511f45.code == 0) {
        console.log("【" + this.names + "】完成签到任务");
        await $.wait(5000);
        await this.signtaskfb();
      }
    }
  }

  async signtaskfb() {
    console.log("【" + this.names + "】完成签到视频任务");
    await $.wait(10000);
  }

  async txlb() {
    await this.tx();
  }

  async tx() {
    let _0x3aac9d = {
      authorization: this.authorization,
      "content-type": "application/json; charset=UTF-8"
    },
        _0x2c5c06 = "{\"goldAmount\":\"138.00\",\"type\":\"0\",\"withdrawType\":\"0\"}",
        _0x525d4a = await $.task("post", "https://mall.ujtao.com/app_mallapi/wxAuth/sys2accsNew", _0x3aac9d, _0x2c5c06);

    _0x525d4a.code == 0 ? (console.log("【" + this.names + "】提现成功"), await $.wait(30000), await this.txwc()) : console.log("【" + this.names + "】提现失败," + _0x525d4a.msg);
  }

  async txwc() {}

  async txlb2() {
    await this.tx2();
  }

  async tx2() {
    let _0x4181c9 = {
      authorization: this.authorization,
      "content-type": "application/json; charset=UTF-8"
    },
        _0x14f638 = "{\"goldAmount\":\"138.00\",\"type\":\"0\",\"withdrawType\":\"0\"}",
        _0x5a2c32 = await $.task("post", "https://mall.ujtao.com/app_mallapi/alipay/sys2accsNew", _0x4181c9, _0x14f638);

    _0x5a2c32.code == 0 ? (console.log("【" + this.names + "】提现成功"), await $.wait(30000), await this.txwc()) : console.log("【" + this.names + "】提现失败," + _0x5a2c32.msg);
  }

}

$ = DD();
!(async () => {
  console.log(NAME);
    await $.ExamineCookie();
    if ($.cookie_list.length < 21) {
      await $.Multithreading("login");

      let _0x2bca88 = $.cookie_list.filter(_0x1e903b => _0x1e903b.logs == true);

      if (_0x2bca88.length == 0) {
        console.log("Cookie格式错误 或 账号被禁封");
        return;
      } else {
        await $.Multithreading("tasklist");
        await $.Multithreading("signtask");
      }
    } else {
      console.log("账号数量超过限制，请减少账号数量后重试！");
    }
    
  let _0x58d9b0 = [];

  for (let _0xf27559 of $.cookie_list) {
    if (_0xf27559.message) {
      _0x58d9b0.push(_0xf27559.message);
    }
  }

  if (_0x58d9b0.length > 0) {
    await $.SendMsg(_0x58d9b0.join("\n"));
  }
})().catch(_0x1d532a => {
  console.log(_0x1d532a);
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

    async Multithreading(_0x5dc01d, _0xa0e351, _0x9451cb) {
      let _0xcbd102 = [];

      if (!_0x9451cb) {
        _0x9451cb = 1;
      }

      while (_0x9451cb--) {
        for (let _0x5bd024 of $.cookie_list) {
          _0xcbd102.push(_0x5bd024[_0x5dc01d](_0xa0e351));
        }
      }

      await Promise.allSettled(_0xcbd102);
    }

    ExamineCookie() {
      let _0x569c95 = process.env[VALY] || CK,
          _0x4d35ec = 0;

      if (_0x569c95) {
        for (let _0x1ae114 of _0x569c95.split("\n").filter(_0x463035 => !!_0x463035)) {
          $.cookie_list.push(new Bar(_0x1ae114));
        }

        _0x4d35ec = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }

      console.log("共找到" + _0x4d35ec + "个账号");
      return $.cookie_list;
    }

    task(_0x380fe0, _0x315154, _0x41aaba, _0x30e2ad, _0x3c8f0b) {
      if (_0x380fe0 == "delete") {
        _0x380fe0 = _0x380fe0.toUpperCase();
      } else {
        _0x380fe0 = _0x380fe0;
      }

      if (_0x380fe0 == "post") {
        delete _0x41aaba["content-type"];
        delete _0x41aaba["Content-type"];
        delete _0x41aaba["content-Type"];

        if ($.safeGet(_0x30e2ad)) {
          _0x41aaba["Content-Type"] = "application/json;charset=UTF-8";
        } else {
          _0x41aaba["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (_0x30e2ad) {
          _0x41aaba["Content-Length"] = $.lengthInUtf8Bytes(_0x30e2ad);
        }
      }

      if (_0x380fe0 == "get") {
        delete _0x41aaba["content-type"];
        delete _0x41aaba["Content-type"];
        delete _0x41aaba["content-Type"];
        delete _0x41aaba["Content-Length"];
      }

      _0x41aaba.Host = _0x315154.replace("//", "/").split("/")[1];
      return new Promise(async _0x4b3b27 => {
        if (_0x380fe0.indexOf("T") < 0) {
          var _0x2b52ec = {
            url: _0x315154,
            headers: _0x41aaba,
            body: _0x30e2ad,
            proxy: "http://" + _0x3c8f0b
          };
        } else {
          var _0x2b52ec = {
            url: _0x315154,
            headers: _0x41aaba,
            form: JSON.parse(_0x30e2ad),
            proxy: "http://" + _0x3c8f0b
          };
        }

        !_0x3c8f0b && delete _0x2b52ec.proxy;

        this.request[_0x380fe0.toLowerCase()](_0x2b52ec, (_0x38c365, _0x3d3d78, _0x36959c) => {
          try {
            _0x36959c && LOGS == 1 && (console.log("================ 请求 ================"), console.log(_0x2b52ec), console.log("================ 返回 ================"), $.safeGet(_0x36959c) ? console.log(JSON.parse(_0x36959c)) : console.log(_0x36959c));
          } catch (_0x21b2f5) {
            console.log(_0x21b2f5, _0x315154 + "\n" + _0x41aaba);
          } finally {
            let _0x47a5af = "";

            if (!_0x38c365) {
              if ($.safeGet(_0x36959c)) {
                _0x47a5af = JSON.parse(_0x36959c);
              } else {
                if (_0x36959c.indexOf("/") != -1 && _0x36959c.indexOf("+") != -1) {
                  _0x47a5af = _0x36959c;
                } else {
                  _0x47a5af = _0x36959c;
                }
              }
            } else {
              _0x47a5af = _0x315154 + "   API请求失败，请检查网络重试\n" + _0x38c365;
            }

            return _0x4b3b27(_0x47a5af);
          }
        });
      });
    }

    async readUUID() {
      const _0x344ecb = "uuid.txt";
      await $.generateUUID(_0x344ecb);

      try {
        const _0x3d2bec = fs.readFileSync(_0x344ecb, "utf8"),
              _0x48c258 = _0x3d2bec.trim();

        return _0x48c258;
      } catch (_0x59258f) {
        return null;
      }
    }

    generateUUID(_0x1bb408) {
      if (fs.existsSync(_0x1bb408)) {
        return;
      }

      const _0x1a137 = uuidv4();

      fs.writeFile(_0x1bb408, _0x1a137, "utf8", _0x252466 => {
        if (_0x252466) {
          console.error("写入文件出错: " + _0x252466.message);
          return;
        }

        console.log("uuid.txt 文件已创建并写入 UUID。");
      });
    }

    async getkami() {
      let _0x42df8b = await $.readUUID(),
          _0x4d9bdf = await $.task("get", "http://" + dcfhost + ":5705/query?dcf=" + dcfkey + "&MA=" + _0x42df8b, {});

      return _0x4d9bdf;
    }

    async SendMsg(_0x78ec9c) {
      if (!_0x78ec9c) {
        return;
      }

      if (Notify == 1) {
        var _0x34ca05 = require("./sendNotify");

        await _0x34ca05.sendNotify(NAME, _0x78ec9c);
      }
    }

    lengthInUtf8Bytes(_0x22f25c) {
      let _0x4eeba4 = encodeURIComponent(_0x22f25c).match(/%[89ABab]/g);

      return _0x22f25c.length + (_0x4eeba4 ? _0x4eeba4.length : 0);
    }

    randomArr(_0x104347) {
      return _0x104347[parseInt(Math.random() * _0x104347.length, 10)];
    }

    wait(_0x5e19a6) {
      return new Promise(_0x5436fe => setTimeout(_0x5436fe, _0x5e19a6));
    }

    time(_0x44a8bc) {
      if (_0x44a8bc == 10) {
        return Math.round(+new Date() / 1000);
      } else {
        return +new Date();
      }
    }

    timenow(_0x3d378c) {
      let _0x1f0f21 = new Date();

      if (_0x3d378c == undefined) {
        let _0x48ac0e = new Date(),
            _0xcebe3d = _0x48ac0e.getFullYear() + "-",
            _0x23af32 = (_0x48ac0e.getMonth() + 1 < 10 ? "0" + (_0x48ac0e.getMonth() + 1) : _0x48ac0e.getMonth() + 1) + "-",
            _0x4190b6 = _0x48ac0e.getDate() + " ",
            _0x3eee55 = _0x48ac0e.getHours() + ":",
            _0x4139d5 = _0x48ac0e.getMinutes() + ":",
            _0x450c46 = _0x48ac0e.getSeconds() + 1 < 10 ? "0" + _0x48ac0e.getSeconds() : _0x48ac0e.getSeconds();

        return _0xcebe3d + _0x23af32 + _0x4190b6 + _0x3eee55 + _0x4139d5 + _0x450c46;
      } else {
        if (_0x3d378c == 0) {
          return _0x1f0f21.getFullYear();
        } else {
          if (_0x3d378c == 1) {
            return _0x1f0f21.getMonth() + 1 < 10 ? "0" + (_0x1f0f21.getMonth() + 1) : _0x1f0f21.getMonth() + 1;
          } else {
            if (_0x3d378c == 2) {
              return _0x1f0f21.getDate();
            } else {
              if (_0x3d378c == 3) {
                return _0x1f0f21.getHours();
              } else {
                if (_0x3d378c == 4) {
                  return _0x1f0f21.getMinutes();
                } else {
                  if (_0x3d378c == 5) {
                    return _0x1f0f21.getSeconds() + 1 < 10 ? "0" + _0x1f0f21.getSeconds() : _0x1f0f21.getSeconds();
                  }
                }
              }
            }
          }
        }
      }
    }

    safeGet(_0x59635d) {
      try {
        if (typeof JSON.parse(_0x59635d) == "object") {
          return true;
        }
      } catch (_0x5a99be) {
        return false;
      }
    }

    SJS(_0x48c8d1, _0x10cfe7) {
      if (_0x10cfe7 == 0) {
        let _0x26f9d1 = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789",
            _0x35fc21 = _0x26f9d1.length,
            _0x218902 = "";

        for (let _0x105e25 = 0; _0x105e25 < _0x48c8d1; _0x105e25++) {
          _0x218902 += _0x26f9d1.charAt(Math.floor(Math.random() * _0x35fc21));
        }

        return _0x218902;
      } else {
        if (_0x10cfe7 == 1) {
          let _0x2ebd03 = "qwertyuiopasdfghjklzxcvbnm0123456789",
              _0x37fddf = _0x2ebd03.length,
              _0x37c7bc = "";

          for (let _0x365598 = 0; _0x365598 < _0x48c8d1; _0x365598++) {
            _0x37c7bc += _0x2ebd03.charAt(Math.floor(Math.random() * _0x37fddf));
          }

          return _0x37c7bc;
        } else {
          let _0x6b7443 = "0123456789",
              _0x5b6ed7 = _0x6b7443.length,
              _0x3712be = "";

          for (let _0x4de291 = 0; _0x4de291 < _0x48c8d1; _0x4de291++) {
            _0x3712be += _0x6b7443.charAt(Math.floor(Math.random() * _0x5b6ed7));
          }

          return _0x3712be;
        }
      }
    }

    udid(_0x2796f1) {
      function _0x4b8749() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }

      let _0x3b667e = _0x4b8749() + _0x4b8749() + "-" + _0x4b8749() + "-" + _0x4b8749() + "-" + _0x4b8749() + "-" + _0x4b8749() + _0x4b8749() + _0x4b8749();

      return _0x2796f1 == 0 ? _0x3b667e.toUpperCase() : _0x3b667e.toLowerCase();
    }

    encodeUnicode(_0xc4ede2) {
      var _0x3a5f11 = [];

      for (var _0x454b32 = 0; _0x454b32 < _0xc4ede2.length; _0x454b32++) {
        _0x3a5f11[_0x454b32] = ("00" + _0xc4ede2.charCodeAt(_0x454b32).toString(16)).slice(-4);
      }

      return "\\u" + _0x3a5f11.join("\\u");
    }

    decodeUnicode(_0x1391c0) {
      _0x1391c0 = _0x1391c0.replace(/\\u/g, "%u");
      return unescape(unescape(_0x1391c0));
    }

    RT(_0x5ba771, _0x45384c) {
      return Math.round(Math.random() * (_0x45384c - _0x5ba771) + _0x5ba771);
    }

    arrNull(_0xe79e1d) {
      var _0x8b94ea = _0xe79e1d.filter(_0x242482 => {
        return _0x242482 && _0x242482.trim();
      });

      return _0x8b94ea;
    }

    nowtime() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
    }

    timecs() {
      let _0x285267 = $.nowtime();

      if (JSON.stringify(_0x285267).indexOf(" ") >= 0) {
        _0x285267 = _0x285267.replace(" ", "T");
      }

      return new Date(_0x285267).getTime() - 28800000;
    }

    rtjson(_0x2bd935, _0x489946, _0x1f25d4, _0x871e08) {
      return _0x871e08 == 0 ? JSON.stringify(_0x2bd935.split(_0x489946).reduce((_0x429908, _0x7727aa) => {
        let _0x3411a8 = _0x7727aa.split(_0x1f25d4);

        _0x429908[_0x3411a8[0].trim()] = _0x3411a8[1].trim();
        return _0x429908;
      }, {})) : _0x2bd935.split(_0x489946).reduce((_0x57d05a, _0x2abd75) => {
        let _0x3f33e3 = _0x2abd75.split(_0x1f25d4);

        _0x57d05a[_0x3f33e3[0].trim()] = _0x3f33e3[1].trim();
        return _0x57d05a;
      }, {});
    }

    MD5Encrypt(_0x58924d, _0x87bede) {
      if (_0x58924d == 0) {
        return this.CryptoJS.MD5(_0x87bede).toString().toLowerCase();
      } else {
        if (_0x58924d == 1) {
          return this.CryptoJS.MD5(_0x87bede).toString().toUpperCase();
        } else {
          if (_0x58924d == 2) {
            return this.CryptoJS.MD5(_0x87bede).toString().substring(8, 24).toLowerCase();
          } else {
            if (_0x58924d == 3) {
              return this.CryptoJS.MD5(_0x87bede).toString().substring(8, 24).toUpperCase();
            }
          }
        }
      }
    }

    SHA_Encrypt(_0x2f3835, _0x33a24a, _0x42c982) {
      if (_0x2f3835 == 0) {
        return this.CryptoJS[_0x33a24a](_0x42c982).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x33a24a](_0x42c982).toString();
      }
    }

    HmacSHA_Encrypt(_0x1ea04a, _0x966c04, _0x597f41, _0x1bc6e7) {
      if (_0x1ea04a == 0) {
        return this.CryptoJS[_0x966c04](_0x597f41, _0x1bc6e7).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x966c04](_0x597f41, _0x1bc6e7).toString();
      }
    }

    Base64(_0x20a6a7, _0x11b0ea) {
      return _0x20a6a7 == 0 ? this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x11b0ea)) : this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x11b0ea));
    }

    DecryptCrypto(_0x4513fb, _0x15e997, _0x4bc4f7, _0x39aa6f, _0x1561cf, _0x5db587, _0x61d9c2) {
      if (_0x4513fb == 0) {
        const _0x563d16 = this.CryptoJS[_0x15e997].encrypt(this.CryptoJS.enc.Utf8.parse(_0x1561cf), this.CryptoJS.enc.Utf8.parse(_0x5db587), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x61d9c2),
          mode: this.CryptoJS.mode[_0x4bc4f7],
          padding: this.CryptoJS.pad[_0x39aa6f]
        });

        return _0x563d16.toString();
      } else {
        const _0x33581f = this.CryptoJS[_0x15e997].decrypt(_0x1561cf, this.CryptoJS.enc.Utf8.parse(_0x5db587), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x61d9c2),
          mode: this.CryptoJS.mode[_0x4bc4f7],
          padding: this.CryptoJS.pad[_0x39aa6f]
        });

        return _0x33581f.toString(this.CryptoJS.enc.Utf8);
      }
    }

    RSA(_0x1fc70e, _0x58ff60) {
      const _0x50153b = require("node-rsa");

      let _0x320a47 = new _0x50153b("-----BEGIN PUBLIC KEY-----\n" + _0x58ff60 + "\n-----END PUBLIC KEY-----");

      _0x320a47.setOptions({
        encryptionScheme: "pkcs1"
      });

      return _0x320a47.encrypt(_0x1fc70e, "base64", "utf8");
    }

    SHA_RSA(_0x447bc6, _0x317bbc) {
      let _0x18b49d = this.Sha_Rsa.KEYUTIL.getKey("-----BEGIN PRIVATE KEY-----\n" + $.getNewline(_0x317bbc, 76) + "\n-----END PRIVATE KEY-----"),
          _0x31d247 = new this.Sha_Rsa.KJUR.crypto.Signature({
        alg: "SHA256withRSA"
      });

      _0x31d247.init(_0x18b49d);

      _0x31d247.updateString(_0x447bc6);

      let _0x371f89 = _0x31d247.sign(),
          _0x1d71de = this.Sha_Rsa.hextob64u(_0x371f89);

      return _0x1d71de;
    }

  }();
}