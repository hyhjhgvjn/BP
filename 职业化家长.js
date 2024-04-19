/*
APP：职业化家长
功能：签到、日常任务
可以兑换实物，可快递到家
变量名：zyhjzck，登陆后抓包apii.zyhjz188.com/v1/开头的包，找到token和uid，用#连接，多账号换行隔开
定时：一天一次
*/
NAME = "职业化家长";
VALY = ["zyhjzck"];
CK = "";
LOGS = 0;
usid = 0;

const fs = require("fs");
dcfhost = process.env.dcfhost;

class Bar {
  constructor(_0x171a32) {
    this.token = _0x171a32.split("#")[0];
    this.uid = _0x171a32.split("#")[1];
    this._ = ++usid;
    this.f = "账号 [" + this._ + "] ";
    this.logs = true;
  }

  async userinfo() {
    let _0x3ee00c = {
      token: this.token
    },
        _0x2abb3e = await $.task("get", "http://apii.zyhjz188.com/v1/members/score?uid=" + this.uid + "&page=1&limit=10", _0x3ee00c);

    _0x2abb3e.code == 200 ? (console.log(this.f + " 总积分 " + _0x2abb3e.data.score), this.logs = true) : (console.log(this.f + " 获取用户信息失败"), his.logs = false);
  }

  async tasklist() {
    let _0x1f8485 = {
      token: this.token
    },
        _0x18c2ca = await $.task("post", "http://apii.zyhjz188.com/v1/task/list", _0x1f8485);

    if (_0x18c2ca.code == 200) {
      let _0x546990 = _0x18c2ca.data.list;

      for (const _0x503e69 of _0x546990) {
        let {
          title: _0x22e740,
          is_ok: _0x11218d,
          id: _0x25c8eb
        } = _0x503e69;

        if (_0x11218d != 1) {
          _0x22e740 == "每天签到领积分啦" ? await this.signin() : await this.dotask(_0x22e740, _0x25c8eb);
        } else {
          console.log(this.f + ": " + _0x22e740 + " 已完成");
        }
      }
    }
  }

  async signin() {
    let _0x2d4c6a = {
      token: this.token
    },
        _0x44d080 = await $.task("post", "http://apii.zyhjz188.com/v1/task/sign-in", _0x2d4c6a);

    _0x44d080.data.num_con != null ? console.log(this.f + " 签到成功") : console.log(this.f + " 签到失败");
  }

  async dotask(_0xb2ead6, _0x369037) {
    let _0x50ba23 = {
      token: this.token
    },
        _0x54e348 = "id=" + _0x369037,
        _0x431607 = await $.task("post", "http://apii.zyhjz188.com/v1/task/fulfil", _0x50ba23, _0x54e348);

    if (_0x431607.data.score) {
      console.log(this.f + " " + _0xb2ead6 + " 完成");
      await $.wait($.RT(15000, 25000));
    } else {
      console.log(this.f + " " + _0xb2ead6 + " 未完成");
    }
  }

}

$ = DD();
!(async () => {
  console.log(NAME);
  
    await $.ExamineCookie();
    await $.Multithreading("userinfo");
    let _0x15d905 = $.cookie_list.filter(_0x17c572 => _0x17c572.logs == true);
    if (_0x15d905.length == 0) {
      console.log("Cookie格式错误 或 账号被禁封");
      return;
    } else {
      await $.Multithreading("tasklist");
    }
})().catch(_0x6adb60 => {
  console.log(_0x6adb60);
}).finally(() => {});

function DD() {
  return new class {
    constructor() {
      this.cookie_list = [];
      this.CryptoJS = require("crypto-js");
      this.NodeRSA = require("node-rsa");
      this.request = require("request");
      this.Sha_Rsa = require("jsrsasign");
    }

    async Multithreading(_0x338204, _0x556085, _0x42800e) {
      let _0x207eb8 = [];
      !_0x42800e && (_0x42800e = 1);

      while (_0x42800e--) {
        for (let _0xd5a37e of $.cookie_list) {
          _0x207eb8.push(_0xd5a37e[_0x338204](_0x556085));
        }
      }

      await Promise.allSettled(_0x207eb8);
    }

    ExamineCookie() {
      let _0x4f726f = process.env[VALY] || CK,
          _0x111704 = 0;

      if (_0x4f726f) {
        for (let _0x4abd16 of _0x4f726f.split("\n").filter(_0x2cbcf5 => !!_0x2cbcf5)) {
          $.cookie_list.push(new Bar(_0x4abd16));
        }

        _0x111704 = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }

      console.log("共找到" + _0x111704 + "个账号");
      return $.cookie_list;
    }

    task(_0x25aafa, _0x3473f4, _0x5ba183, _0x437ab7, _0x1d748f) {
      _0x25aafa == "delete" ? _0x25aafa = _0x25aafa.toUpperCase() : _0x25aafa = _0x25aafa;

      if (_0x25aafa == "post") {
        delete _0x5ba183["content-type"];
        delete _0x5ba183["Content-type"];
        delete _0x5ba183["content-Type"];

        if ($.safeGet(_0x437ab7)) {
          _0x5ba183["Content-Type"] = "application/json;charset=UTF-8";
        } else {
          _0x5ba183["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (_0x437ab7) {
          _0x5ba183["Content-Length"] = $.lengthInUtf8Bytes(_0x437ab7);
        }
      }

      _0x25aafa == "get" && (delete _0x5ba183["content-type"], delete _0x5ba183["Content-type"], delete _0x5ba183["content-Type"], delete _0x5ba183["Content-Length"]);
      _0x5ba183.Host = _0x3473f4.replace("//", "/").split("/")[1];
      return new Promise(async _0x2d1300 => {
        if (_0x25aafa.indexOf("T") < 0) {
          var _0x5c2b36 = {
            url: _0x3473f4,
            headers: _0x5ba183,
            body: _0x437ab7,
            proxy: "http://" + _0x1d748f
          };
        } else {
          var _0x5c2b36 = {
            url: _0x3473f4,
            headers: _0x5ba183,
            form: JSON.parse(_0x437ab7),
            proxy: "http://" + _0x1d748f
          };
        }

        !_0x1d748f && delete _0x5c2b36.proxy;

        this.request[_0x25aafa.toLowerCase()](_0x5c2b36, (_0x1db07, _0x49a431, _0x51f250) => {
          try {
            if (_0x51f250) {
              if (LOGS == 1) {
                console.log("================ 请求 ================");
                console.log(_0x5c2b36);
                console.log("================ 返回 ================");

                if ($.safeGet(_0x51f250)) {
                  console.log(JSON.parse(_0x51f250));
                } else {
                  console.log(_0x51f250);
                }
              }
            }
          } catch (_0x3b3b97) {
            console.log(_0x3b3b97, _0x3473f4 + "\n" + _0x5ba183);
          } finally {
            let _0x19d26b = "";

            if (!_0x1db07) {
              if ($.safeGet(_0x51f250)) {
                _0x19d26b = JSON.parse(_0x51f250);
              } else {
                _0x51f250.indexOf("/") != -1 && _0x51f250.indexOf("+") != -1 ? _0x19d26b = $.decrypts(_0x51f250) : _0x19d26b = _0x51f250;
              }
            } else {
              _0x19d26b = _0x3473f4 + "   API请求失败，请检查网络重试\n" + _0x1db07;
            }

            return _0x2d1300(_0x19d26b);
          }
        });
      });
    }

    async readUUID() {
      const _0x152b0b = "uuid.txt";
      await $.generateUUID(_0x152b0b);

      try {
        const _0x2d9ee2 = fs.readFileSync(_0x152b0b, "utf8"),
              _0x3468b1 = _0x2d9ee2.trim();

        return _0x3468b1;
      } catch (_0x1cc17a) {
        return null;
      }
    }

    generateUUID(_0x296d77) {
      if (fs.existsSync(_0x296d77)) {
        return;
      }

      const _0x3546fc = uuidv4();

      fs.writeFile(_0x296d77, _0x3546fc, "utf8", _0x1bddfd => {
        if (_0x1bddfd) {
          console.error("写入文件出错: " + _0x1bddfd.message);
          return;
        }

        console.log("uuid.txt 文件已创建并写入 UUID。");
      });
    }

    async getkami() {
      let _0x6eb4bc = await $.readUUID(),
          _0x4a3b54 = await $.task("get", "http://" + dcfhost + ":5705/query?dcf=" + dcfkey + "&MA=" + _0x6eb4bc, {});

      return _0x4a3b54;
    }

    lengthInUtf8Bytes(_0x52ec6c) {
      let _0xae1b5f = encodeURIComponent(_0x52ec6c).match(/%[89ABab]/g);

      return _0x52ec6c.length + (_0xae1b5f ? _0xae1b5f.length : 0);
    }

    randomArr(_0x501591) {
      return _0x501591[parseInt(Math.random() * _0x501591.length, 10)];
    }

    wait(_0x55d131) {
      return new Promise(_0x4cc2dd => setTimeout(_0x4cc2dd, _0x55d131));
    }

    time(_0x492293) {
      if (_0x492293 == 10) {
        return Math.round(+new Date() / 1000);
      } else {
        return +new Date();
      }
    }

    timenow(_0x4cb293) {
      let _0x54f003 = new Date();

      if (_0x4cb293 == undefined) {
        let _0x54b7e6 = new Date(),
            _0x250d47 = _0x54b7e6.getFullYear() + "-",
            _0x3e3a95 = (_0x54b7e6.getMonth() + 1 < 10 ? "0" + (_0x54b7e6.getMonth() + 1) : _0x54b7e6.getMonth() + 1) + "-",
            _0x204300 = _0x54b7e6.getDate() + " ",
            _0x57d103 = _0x54b7e6.getHours() + ":",
            _0x3632b6 = _0x54b7e6.getMinutes() + ":",
            _0x1c9658 = _0x54b7e6.getSeconds() + 1 < 10 ? "0" + _0x54b7e6.getSeconds() : _0x54b7e6.getSeconds();

        return _0x250d47 + _0x3e3a95 + _0x204300 + _0x57d103 + _0x3632b6 + _0x1c9658;
      } else {
        if (_0x4cb293 == 0) {
          return _0x54f003.getFullYear();
        } else {
          if (_0x4cb293 == 1) {
            return _0x54f003.getMonth() + 1 < 10 ? "0" + (_0x54f003.getMonth() + 1) : _0x54f003.getMonth() + 1;
          } else {
            if (_0x4cb293 == 2) {
              return _0x54f003.getDate();
            } else {
              if (_0x4cb293 == 3) {
                return _0x54f003.getHours();
              } else {
                if (_0x4cb293 == 4) {
                  return _0x54f003.getMinutes();
                } else {
                  if (_0x4cb293 == 5) {
                    return _0x54f003.getSeconds() + 1 < 10 ? "0" + _0x54f003.getSeconds() : _0x54f003.getSeconds();
                  }
                }
              }
            }
          }
        }
      }
    }

    safeGet(_0x1c54d2) {
      try {
        if (typeof JSON.parse(_0x1c54d2) == "object") {
          return true;
        }
      } catch (_0x31ca47) {
        return false;
      }
    }

    SJS(_0x24b55a, _0x45cb40) {
      if (_0x45cb40 == 0) {
        let _0x18de54 = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789",
            _0x2835db = _0x18de54.length,
            _0x3dbe93 = "";

        for (let _0x4d5fe8 = 0; _0x4d5fe8 < _0x24b55a; _0x4d5fe8++) {
          _0x3dbe93 += _0x18de54.charAt(Math.floor(Math.random() * _0x2835db));
        }

        return _0x3dbe93;
      } else {
        if (_0x45cb40 == 1) {
          let _0x3652d8 = "qwertyuiopasdfghjklzxcvbnm0123456789",
              _0x92a29c = _0x3652d8.length,
              _0x3ffd34 = "";

          for (let _0x26f309 = 0; _0x26f309 < _0x24b55a; _0x26f309++) {
            _0x3ffd34 += _0x3652d8.charAt(Math.floor(Math.random() * _0x92a29c));
          }

          return _0x3ffd34;
        } else {
          let _0x2a9dd9 = "0123456789",
              _0x3c04cd = _0x2a9dd9.length,
              _0x20d8d9 = "";

          for (let _0x44e79d = 0; _0x44e79d < _0x24b55a; _0x44e79d++) {
            _0x20d8d9 += _0x2a9dd9.charAt(Math.floor(Math.random() * _0x3c04cd));
          }

          return _0x20d8d9;
        }
      }
    }

    udid(_0xa0b6b2) {
      function _0xdec44c() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }

      let _0x4d5eb9 = _0xdec44c() + _0xdec44c() + "-" + _0xdec44c() + "-" + _0xdec44c() + "-" + _0xdec44c() + "-" + _0xdec44c() + _0xdec44c() + _0xdec44c();

      return _0xa0b6b2 == 0 ? _0x4d5eb9.toUpperCase() : _0x4d5eb9.toLowerCase();
    }

    encodeUnicode(_0x5eb049) {
      var _0x18e2a5 = [];

      for (var _0x422be3 = 0; _0x422be3 < _0x5eb049.length; _0x422be3++) {
        _0x18e2a5[_0x422be3] = ("00" + _0x5eb049.charCodeAt(_0x422be3).toString(16)).slice(-4);
      }

      return "\\u" + _0x18e2a5.join("\\u");
    }

    decodeUnicode(_0x4e519b) {
      _0x4e519b = _0x4e519b.replace(/\\u/g, "%u");
      return unescape(unescape(_0x4e519b));
    }

    RT(_0x49cf6d, _0x41682f) {
      return Math.round(Math.random() * (_0x41682f - _0x49cf6d) + _0x49cf6d);
    }

    arrNull(_0x1bd329) {
      var _0x52d8b8 = _0x1bd329.filter(_0x4d20cf => {
        return _0x4d20cf && _0x4d20cf.trim();
      });

      return _0x52d8b8;
    }

    nowtime() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
    }

    timecs() {
      let _0x2d0c05 = $.nowtime();

      JSON.stringify(_0x2d0c05).indexOf(" ") >= 0 && (_0x2d0c05 = _0x2d0c05.replace(" ", "T"));
      return new Date(_0x2d0c05).getTime() - 28800000;
    }

    rtjson(_0xbfeaac, _0x480d99, _0x27b87b, _0x467b55) {
      if (_0x467b55 == 0) {
        return JSON.stringify(_0xbfeaac.split(_0x480d99).reduce((_0x10176b, _0x1278ca) => {
          let _0x54f139 = _0x1278ca.split(_0x27b87b);

          _0x10176b[_0x54f139[0].trim()] = _0x54f139[1].trim();
          return _0x10176b;
        }, {}));
      } else {
        return _0xbfeaac.split(_0x480d99).reduce((_0x3cbc09, _0x1e8209) => {
          let _0x4ca5b9 = _0x1e8209.split(_0x27b87b);

          _0x3cbc09[_0x4ca5b9[0].trim()] = _0x4ca5b9[1].trim();
          return _0x3cbc09;
        }, {});
      }
    }

    MD5Encrypt(_0x336c35, _0x5cd226) {
      if (_0x336c35 == 0) {
        return this.CryptoJS.MD5(_0x5cd226).toString().toLowerCase();
      } else {
        if (_0x336c35 == 1) {
          return this.CryptoJS.MD5(_0x5cd226).toString().toUpperCase();
        } else {
          if (_0x336c35 == 2) {
            return this.CryptoJS.MD5(_0x5cd226).toString().substring(8, 24).toLowerCase();
          } else {
            if (_0x336c35 == 3) {
              return this.CryptoJS.MD5(_0x5cd226).toString().substring(8, 24).toUpperCase();
            }
          }
        }
      }
    }

    SHA_Encrypt(_0x31ad6e, _0x513941, _0x180ee0) {
      if (_0x31ad6e == 0) {
        return this.CryptoJS[_0x513941](_0x180ee0).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x513941](_0x180ee0).toString();
      }
    }

    HmacSHA_Encrypt(_0x5b8186, _0x423a85, _0x5199a9, _0x1ea5d9) {
      if (_0x5b8186 == 0) {
        return this.CryptoJS[_0x423a85](_0x5199a9, _0x1ea5d9).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x423a85](_0x5199a9, _0x1ea5d9).toString();
      }
    }

    Base64(_0xd14d6d, _0x38a9bc) {
      if (_0xd14d6d == 0) {
        return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x38a9bc));
      } else {
        return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x38a9bc));
      }
    }

    DecryptCrypto(_0x21f3e9, _0xf5eccb, _0x126b80, _0x49dd7f, _0x4d0b73, _0x11bdc4, _0x5901ac) {
      if (_0x21f3e9 == 0) {
        const _0x571b49 = this.CryptoJS[_0xf5eccb].encrypt(this.CryptoJS.enc.Utf8.parse(_0x4d0b73), this.CryptoJS.enc.Utf8.parse(_0x11bdc4), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x5901ac),
          mode: this.CryptoJS.mode[_0x126b80],
          padding: this.CryptoJS.pad[_0x49dd7f]
        });

        return _0x571b49.toString();
      } else {
        const _0x111067 = this.CryptoJS[_0xf5eccb].decrypt(_0x4d0b73, this.CryptoJS.enc.Utf8.parse(_0x11bdc4), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x5901ac),
          mode: this.CryptoJS.mode[_0x126b80],
          padding: this.CryptoJS.pad[_0x49dd7f]
        });

        return _0x111067.toString(this.CryptoJS.enc.Utf8);
      }
    }

    RSA(_0x1772c2, _0x330929) {
      const _0x2e4e32 = require("node-rsa");

      let _0xb3f9a5 = new _0x2e4e32("-----BEGIN PUBLIC KEY-----\n" + _0x330929 + "\n-----END PUBLIC KEY-----");

      _0xb3f9a5.setOptions({
        encryptionScheme: "pkcs1"
      });

      return _0xb3f9a5.encrypt(_0x1772c2, "base64", "utf8");
    }

    SHA_RSA(_0x598edf, _0x547823) {
      let _0x2a776f = this.Sha_Rsa.KEYUTIL.getKey("-----BEGIN PRIVATE KEY-----\n" + $.getNewline(_0x547823, 76) + "\n-----END PRIVATE KEY-----"),
          _0x3088dc = new this.Sha_Rsa.KJUR.crypto.Signature({
        alg: "SHA256withRSA"
      });

      _0x3088dc.init(_0x2a776f);

      _0x3088dc.updateString(_0x598edf);

      let _0x221f01 = _0x3088dc.sign(),
          _0x28cf5d = this.Sha_Rsa.hextob64u(_0x221f01);

      return _0x28cf5d;
    }

  }();
}