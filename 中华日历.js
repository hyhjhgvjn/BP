/*
@蛋炒饭
APP：中华日历极速版 （安卓任务多，苹果任务少）
变量名：zhrljsbck
变量值：找到https://calendar.jiemengjia.com/integral/account_info?将？后面的内容#绑定的微信名作为变量，多账号换行
功能：完成日常任务，每天1块钱左右，满25元可以自动提现
定时：1小时一次，吃饭的点要覆盖，建议7-22（定时要比黄历早！！！定时要比黄历早！！！）
*/
NAME = "中华日历极速版";
VALY = ["zhrljsbck"];
CK = "";
LOGS = 0;
usid = 0;
nowhour = Math.round(new Date().getHours()).toString();
Notify = 1;

const _0x35ad1b = require("fs"),
      {
  v4: _0x87425a
} = require("uuid");

dcfkey = process.env.dcfkey;
dcfhost = process.env.dcfhost;

function _0x33364a(_0x3c825e, _0x484742, _0x291409) {
  const _0x10a077 = new URL("http://test.com?" + _0x291409);

  for (let _0x2c58d9 = 0; _0x2c58d9 < _0x484742.length; _0x2c58d9++) {
    const _0x2251ab = _0x484742[_0x2c58d9];
    _0x3c825e[_0x2251ab] = _0x10a077.searchParams.get(_0x2251ab);
  }
}

class _0x3eb074 {
  constructor(_0x1631df) {
    this.str = _0x1631df.split("#")[0];
    this.wx = _0x1631df.split("#")[1];
    this._ = ++usid;
    this.f = "账号 [" + this._ + "] ";
    let _0x4cdc3a = ["market", "openudid", "dev_uuid", "oaid", "user_id"];

    _0x33364a(this, _0x4cdc3a, this.str);

    this.message = "";
    this.logs = true;
  }

  async ["login"]() {
    let _0x218f70 = $.time(13),
        _0x2666e6 = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&timestamp=" + _0x218f70 + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x2ca526 = await $.task("get", "https://calendar.jiemengjia.com/integral/account_info?device=android&timestamp=" + _0x218f70 + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&sign=" + _0x2666e6, {});

    if (_0x2ca526.code == "E00000000") {
      console.log(this.f + "登陆成功，当前金币" + _0x2ca526.data.now_score + ",当前余额" + _0x2ca526.data.cash_num + "元");
      this.message += this.f + "登陆成功，当前金币" + _0x2ca526.data.now_score + ",当前余额" + _0x2ca526.data.cash_num + "元";

      if (_0x2ca526.data.cash_num >= 25) {
        const _0x248eb1 = require("fs");

        let _0x1504cc = "",
            _0x2c15c4 = $.timenow();

        _0x248eb1.existsSync("huangli.txt") && (_0x1504cc = _0x248eb1.readFileSync("huangli.txt", "utf-8"));

        let _0x254b99 = this.wx + "+" + ("" + _0x2c15c4);

        !_0x1504cc.includes(_0x254b99) && (await this.tixian());
      }

      this.logs = true;
    } else {
      this.logs = false;
    }
  }

  async ["signinlist"]() {
    let _0x1097af = $.time(13),
        _0x38cb7e = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&timestamp=" + _0x1097af + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x33fc5d = await $.task("get", "https://calendar.jiemengjia.com/integral/sign_task?lang=zh_cn&jbk=0&device=android&timestamp=" + _0x1097af + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&sign=" + _0x38cb7e, {});

    for (let _0x2bf0de of _0x33fc5d.data.list) {
      for (let _0x331175 of _0x2bf0de.videos) {
        if (_0x331175.status == 0) {
          let _0xc8e19b = "刷金币";
          await this.signinvideo(_0x331175.task_id, _0x331175.score, _0xc8e19b);
        }
      }
    }

    if (_0x33fc5d.code == "E00000000" && _0x33fc5d.data.is_today_sign == 0) {
      let _0x446c96 = _0x33fc5d.data.list.find(_0x1908cc => _0x1908cc.status === "0"),
          _0x52c053 = "签到";

      await this.signin(_0x446c96.task_id, _0x446c96.score, _0x52c053);

      for (let _0x3e051e of _0x446c96.videos) {
        let _0xafcb92 = "签到";
        await this.signinvideo(_0x3e051e.task_id, _0x3e051e.score, _0xafcb92);
      }
    }
  }

  async ["signin"](_0x2b76a7, _0x283910, _0x374079) {
    let _0x59fe3b = $.time(13),
        _0x940f3b = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&is_video=0&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&score=" + _0x283910 + "&task_id=" + _0x2b76a7 + "&timestamp=" + _0x59fe3b + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x2aad0e = "lang=zh_cn&jbk=0&device=android&timestamp=" + _0x59fe3b + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&task_id=" + _0x2b76a7 + "&is_video=0&score=" + _0x283910 + "&sign=" + _0x940f3b,
        _0x56fafb = await $.task("post", "https://calendar.jiemengjia.com/integral/do_task", {}, _0x2aad0e);

    _0x56fafb.code == "E00000000" ? (console.log("" + this.f + _0x374079 + "成功，获得" + _0x283910 + "金币"), await $.wait(35000, 40000)) : console.log("" + this.f + _0x374079 + "失败，原因:" + _0x56fafb.msg);
  }

  async ["signinvideo"](_0x12f56e, _0x4f12c3, _0x1fdf1f) {
    let _0x1af47b = $.time(13),
        _0x43cc48 = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&is_video=1&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&score=" + _0x4f12c3 + "&task_id=" + _0x12f56e + "&timestamp=" + _0x1af47b + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0xdaf095 = "lang=zh_cn&jbk=0&device=android&timestamp=" + _0x1af47b + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&task_id=" + _0x12f56e + "&is_video=1&score=" + _0x4f12c3 + "&sign=" + _0x43cc48,
        _0x5f3922 = await $.task("post", "https://calendar.jiemengjia.com/integral/do_task", {}, _0xdaf095);

    _0x5f3922.code == "E00000000" ? (console.log("" + this.f + _0x1fdf1f + "视频观看成功，获得" + _0x4f12c3 + "金币"), await $.wait(35000, 40000)) : console.log("" + this.f + _0x1fdf1f + "视频观看失败，原因:" + _0x5f3922.msg);
  }

  async ["videolist"]() {
    let _0x3d3272 = $.time(13),
        _0xb4034e = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&timestamp=" + _0x3d3272 + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x13317e = await $.task("get", "https://calendar.jiemengjia.com/integral/video_task?lang=zh_cn&jbk=0&device=android&timestamp=" + _0x3d3272 + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&sign=" + _0xb4034e, {});

    if (_0x13317e.code == "E00000000") for (let _0x29ce1c of _0x13317e.data) {
      if (_0x29ce1c.status == 0) {
        let _0x4182ed = "完成看视频任务";
        await this.signin(_0x29ce1c.task_id, _0x29ce1c.score, _0x4182ed);
      }
    }
  }

  async ["boxlist"]() {
    let _0x2ec24d = $.time(13),
        _0x1b1224 = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&timestamp=" + _0x2ec24d + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x230d54 = await $.task("get", "https://calendar.jiemengjia.com/integral/chest_task?lang=zh_cn&jbk=0&device=android&timestamp=" + _0x2ec24d + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&sign=" + _0x1b1224, {});

    if (_0x230d54.code == "E00000000" && _0x230d54.data.status == 0) {
      let _0x84b7e6 = "开宝箱";
      await this.signin(_0x230d54.data.task_id, _0x230d54.data.score, _0x84b7e6);

      for (let _0x5bfbfa of _0x230d54.data.videos) {
        let _0x2fe0eb = "宝箱";
        await this.signinvideo(_0x5bfbfa.task_id, _0x5bfbfa.score, _0x2fe0eb);
      }
    }
  }

  async ["meallist"]() {
    let _0x23673d = $.time(13),
        _0x187c52 = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&timestamp=" + _0x23673d + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0xc076ad = await $.task("get", "https://calendar.jiemengjia.com/integral/meal_task?lang=zh_cn&jbk=0&device=android&timestamp=" + _0x23673d + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&sign=" + _0x187c52, {});

    if (_0xc076ad.code == "E00000000") {
      let _0x8ab9cf = $.getCurrentTask(_0xc076ad.data);

      if (_0x8ab9cf.status == 1) {
        let _0x495049 = "完成吃饭任务";
        await this.signin(_0x8ab9cf.task_id, _0x8ab9cf.score, _0x495049);

        for (let _0x18e054 of _0x8ab9cf.videos) {
          let _0xb14753 = "完成吃饭视频任务";
          await this.signinvideo(_0x18e054.task_id, _0x18e054.score, _0xb14753);
        }
      }
    }
  }

  async ["commonlist"]() {
    let _0xb9c370 = $.time(13),
        _0x30efc5 = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&timestamp=" + _0xb9c370 + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x1b4242 = await $.task("get", "https://calendar.jiemengjia.com/integral/common_task?lang=zh_cn&jbk=0&device=android&timestamp=" + _0xb9c370 + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&sign=" + _0x30efc5, {});

    if (_0x1b4242.code == "E00000000") for (let _0x1dcbfa of _0x1b4242.data) {
      if (_0x1dcbfa.title) for (let _0x3e1961 of _0x1dcbfa.list) {
        if (_0x3e1961.status == 0) {
          let _0x11bf64 = "完成" + _0x3e1961.task_name + "任务";

          await this.signin(_0x3e1961.task_id, _0x3e1961.score, _0x11bf64);
          await this.receive(_0x3e1961.task_id, _0x3e1961.score, _0x11bf64);
        }
      }
    }
  }

  async ["receive"](_0x2082dc, _0x2e09d7) {
    let _0x5eadab = $.time(13),
        _0x2e4051 = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&score=" + _0x2e09d7 + "&task_id=" + _0x2082dc + "&timestamp=" + _0x5eadab + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x32062e = "lang=zh_cn&jbk=0&device=android&timestamp=" + _0x5eadab + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&task_id=" + _0x2082dc + "&score=" + _0x2e09d7 + "&sign=" + _0x2e4051;
  }

  async ["tixian"]() {
    let _0x22af98 = $.time(13),
        _0x13a9dd = $.MD5Encrypt(0, this.user_id + "2Wh1y1hvGMOclMeug@4Y9Jbc0BUjmzXae"),
        _0x10e699 = "device=android&timestamp=" + _0x22af98 + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&type=2&app_secret=" + _0x13a9dd,
        _0x6a7a96 = await $.task("post", "https://wnl28.jiemengjia.com/api/cash_out", {}, _0x10e699);

    if (_0x6a7a96.code == "E00000000") {
      console.log(this.f + "提现25元成功");

      const _0x30ecd9 = require("fs");

      let _0x393667 = "";

      if (_0x30ecd9.existsSync("huangli.txt")) {
        _0x393667 = _0x30ecd9.readFileSync("huangli.txt", "utf-8");
      }

      let _0x5ae3e6 = false,
          _0x5c469d = new RegExp(v + "\\+[^\n]+");

      _0x393667 = _0x393667.replace(_0x5c469d, _0x412271 => {
        return _0x5ae3e6 = true, v + "+" + n + "\n";
      });
      !_0x5ae3e6 && (_0x393667 += v + "+" + n + "\n");

      _0x30ecd9.writeFileSync("huangli.txt", _0x393667);
    } else console.log(this.f + " " + _0x6a7a96.msg);
  }

  async ["plantlist"]() {
    let _0x3f0928 = $.time(13),
        _0x505ce0 = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&timestamp=" + _0x3f0928 + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x3735c2 = await $.task("get", "https://calendar.jiemengjia.com/tree/integral_list?lang=zh_cn&jbk=0&device=android&timestamp=" + _0x3f0928 + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&sign=" + _0x505ce0, {});

    if (_0x3735c2.code == "E00000000") {
      let _0x35f83b = "种树气泡金币";
      await this.receive2(_0x3735c2.data.left.task_id, _0x3735c2.data.left.multiple_score, _0x35f83b);
      await $.wait(3000, 10000);
      await this.receive2(_0x3735c2.data.right.task_id, _0x3735c2.data.right.score, _0x35f83b);
    }
  }

  async ["receive2"](_0x4cbd7c, _0xfdae1f, _0x489fe0) {
    let _0x2f0950 = $.time(13),
        _0x3899ed = $.MD5Encrypt(0, "appname=calendar_android&cert_key=sx94m3dmr0cmg8nv5ifk1dt45mvpsevutxgmkpmrwzq10m&client=android&dev_uuid=" + this.dev_uuid + "&device=android&idfa=android&imei=&jbk=0&lang=zh_cn&market=" + this.market + "&oaid=" + this.oaid + "&openudid=" + this.openudid + "&score=" + _0xfdae1f + "&task_id=" + _0x4cbd7c + "&timestamp=" + _0x2f0950 + "&user_id=" + this.user_id + "&ver=1.9.8"),
        _0x4e2e57 = "lang=zh_cn&jbk=0&device=android&timestamp=" + _0x2f0950 + "&ver=1.9.8&appname=calendar_android&client=android&idfa=android&market=" + this.market + "&openudid=" + this.openudid + "&dev_uuid=" + this.dev_uuid + "&oaid=" + this.oaid + "&imei=&user_id=" + this.user_id + "&task_id=" + _0x4cbd7c + "&score=" + _0xfdae1f + "&sign=" + _0x3899ed,
        _0x4535e3 = await $.task("post", "https://calendar.jiemengjia.com/tree/receive_integral", {}, _0x4e2e57);

    if (_0x4535e3.code == "E00000000") {
      console.log(this.f + "收取" + _0x489fe0 + "奖励成功，获得" + _0xfdae1f + "金币");
    } else console.log(this.f + "收取" + _0x489fe0 + "奖励失败，原因：" + _0x4535e3.msg);
  }

}

$ = _0x2aad41();
!(async () => {
  console.log(NAME);


    await $.ExamineCookie();

    if ($.cookie_list.length < 100000000) {
      await $.Multithreading("login");

      let _0x29d4dd = $.cookie_list.filter(_0x382b77 => _0x382b77.logs == true);


		await $.Multithreading("signinlist");
		await $.Multithreading("videolist");
		await $.Multithreading("boxlist");
		await $.Multithreading("meallist");
		await $.Multithreading("commonlist");
		await $.Multithreading("plantlist");

    }



  let _0xd6d9b2 = [];

  for (let _0x70d4f5 of $.cookie_list) {
    if (_0x70d4f5.message) _0xd6d9b2.push(_0x70d4f5.message);
  }

  if (_0xd6d9b2.length > 0) await $.SendMsg(_0xd6d9b2.join("\n"));
})().catch(_0x3f8d71 => {
  console.log(_0x3f8d71);
}).finally(() => {});

function _0x2aad41() {
  return new class {
    constructor() {
      this.cookie_list = [];
      this.message = "";
      this.CryptoJS = require("crypto-js");
      this.NodeRSA = require("node-rsa");
      this.request = require("request");
      this.Sha_Rsa = require("jsrsasign");
    }

    async ["Multithreading"](_0x257b04, _0x548c24, _0x5cd4c3) {
      let _0x49af18 = [];
      !_0x5cd4c3 && (_0x5cd4c3 = 1);

      while (_0x5cd4c3--) {
        for (let _0x2bf6bb of $.cookie_list) {
          _0x49af18.push(_0x2bf6bb[_0x257b04](_0x548c24));
        }
      }

      await Promise.allSettled(_0x49af18);
    }

    ["ExamineCookie"]() {
      let _0x4cd7c0 = process.env[VALY] || CK,
          _0x90ed3b = 0;

      if (_0x4cd7c0) {
        for (let _0x12fedc of _0x4cd7c0.split("\n").filter(_0x1b4687 => !!_0x1b4687)) {
          $.cookie_list.push(new _0x3eb074(_0x12fedc));
        }

        _0x90ed3b = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }

      return console.log("共找到" + _0x90ed3b + "个账号"), $.cookie_list;
    }

    ["task"](_0x3d3340, _0xc649e4, _0x5a7898, _0x209212, _0x524bcc) {
      if (_0x3d3340 == "delete") {
        _0x3d3340 = _0x3d3340.toUpperCase();
      } else _0x3d3340 = _0x3d3340;

      return _0x3d3340 == "post" && (delete _0x5a7898["content-type"], delete _0x5a7898["Content-type"], delete _0x5a7898["content-Type"], $.safeGet(_0x209212) ? _0x5a7898["Content-Type"] = "application/json;charset=UTF-8" : _0x5a7898["Content-Type"] = "application/x-www-form-urlencoded", _0x209212 && (_0x5a7898["Content-Length"] = $.lengthInUtf8Bytes(_0x209212))), _0x3d3340 == "get" && (delete _0x5a7898["content-type"], delete _0x5a7898["Content-type"], delete _0x5a7898["content-Type"], delete _0x5a7898["Content-Length"]), _0x5a7898.Host = _0xc649e4.replace("//", "/").split("/")[1], new Promise(async _0x49e398 => {
        if (_0x3d3340.indexOf("T") < 0) {
          var _0x160767 = {
            "url": _0xc649e4,
            "headers": _0x5a7898,
            "body": _0x209212,
            "proxy": "http://" + _0x524bcc
          };
        } else {
          var _0x160767 = {
            "url": _0xc649e4,
            "headers": _0x5a7898,
            "form": JSON.parse(_0x209212),
            "proxy": "http://" + _0x524bcc
          };
        }

        !_0x524bcc && delete _0x160767.proxy;

        this.request[_0x3d3340.toLowerCase()](_0x160767, (_0x48e299, _0x67e126, _0x4c73f5) => {
          try {
            _0x4c73f5 && LOGS == 1 && (console.log("================ 请求 ================"), console.log(_0x160767), console.log("================ 返回 ================"), $.safeGet(_0x4c73f5) ? console.log(JSON.parse(_0x4c73f5)) : console.log(_0x4c73f5));
          } catch (_0x3e6a28) {
            console.log(_0x3e6a28, _0xc649e4 + "\n" + _0x5a7898);
          } finally {
            let _0x2f0ab9 = "";

            if (!_0x48e299) {
              if ($.safeGet(_0x4c73f5)) _0x2f0ab9 = JSON.parse(_0x4c73f5);else {
                if (_0x4c73f5.indexOf("/") != -1 && _0x4c73f5.indexOf("+") != -1) {
                  _0x2f0ab9 = _0x4c73f5;
                } else _0x2f0ab9 = _0x4c73f5;
              }
            } else {
              _0x2f0ab9 = _0xc649e4 + "   API请求失败，请检查网络重试\n" + _0x48e299;
            }

            return _0x49e398(_0x2f0ab9);
          }
        });
      });
    }

    async ["readUUID"]() {
      const _0x5ecf41 = "uuid.txt";
      await $.generateUUID(_0x5ecf41);

      try {
        const _0x2ae2e3 = _0x35ad1b.readFileSync(_0x5ecf41, "utf8"),
              _0x2f4dc7 = _0x2ae2e3.trim();

        return _0x2f4dc7;
      } catch (_0x43df2b) {
        return null;
      }
    }

    ["generateUUID"](_0x1a8cc2) {
      if (_0x35ad1b.existsSync(_0x1a8cc2)) return;

      const _0x41b608 = _0x87425a();

      _0x35ad1b.writeFile(_0x1a8cc2, _0x41b608, "utf8", _0x597d9d => {
        if (_0x597d9d) {
          console.error("写入文件出错: " + _0x597d9d.message);
          return;
        }

        console.log("uuid.txt 文件已创建并写入 UUID。");
      });
    }

    async ["getkami"]() {
      let _0x471279 = await $.readUUID(),
          _0x295f67 = await $.task("get", "http://" + dcfhost + ":5705/query?dcf=" + dcfkey + "&MA=" + _0x471279, {});

      return _0x295f67;
    }

    async ["SendMsg"](_0xf52975) {
      if (!_0xf52975) return;

      if (Notify == 1) {
        var _0x37686a = require("./sendNotify");

        await _0x37686a.sendNotify(NAME, _0xf52975);
      } else {}
    }

    ["lengthInUtf8Bytes"](_0x3e721c) {
      let _0x17ff28 = encodeURIComponent(_0x3e721c).match(/%[89ABab]/g);

      return _0x3e721c.length + (_0x17ff28 ? _0x17ff28.length : 0);
    }

    ["randomArr"](_0x2a4a6f) {
      return _0x2a4a6f[parseInt(Math.random() * _0x2a4a6f.length, 10)];
    }

    ["wait"](_0x2e16b2) {
      return new Promise(_0x2b4980 => setTimeout(_0x2b4980, _0x2e16b2));
    }

    ["time"](_0x378a02) {
      return _0x378a02 == 10 ? Math.round(+new Date() / 1000) : +new Date();
    }

    ["timenow"](_0x5bf36f) {
      let _0x3b2628 = new Date();

      if (_0x5bf36f == undefined) {
        let _0x462a7d = new Date(),
            _0x645961 = _0x462a7d.getFullYear() + "-",
            _0x199080 = (_0x462a7d.getMonth() + 1 < 10 ? "0" + (_0x462a7d.getMonth() + 1) : _0x462a7d.getMonth() + 1) + "-",
            _0x195ffb = _0x462a7d.getDate() + " ",
            _0x2b2ee3 = _0x462a7d.getHours() + ":",
            _0x10ce6d = _0x462a7d.getMinutes() + ":",
            _0x104f05 = _0x462a7d.getSeconds() + 1 < 10 ? "0" + _0x462a7d.getSeconds() : _0x462a7d.getSeconds();

        return _0x645961 + _0x199080 + _0x195ffb + _0x2b2ee3 + _0x10ce6d + _0x104f05;
      } else {
        if (_0x5bf36f == 0) {
          return _0x3b2628.getFullYear();
        } else {
          if (_0x5bf36f == 1) return _0x3b2628.getMonth() + 1 < 10 ? "0" + (_0x3b2628.getMonth() + 1) : _0x3b2628.getMonth() + 1;else {
            if (_0x5bf36f == 2) return _0x3b2628.getDate();else {
              if (_0x5bf36f == 3) return _0x3b2628.getHours();else {
                if (_0x5bf36f == 4) return _0x3b2628.getMinutes();else {
                  if (_0x5bf36f == 5) return _0x3b2628.getSeconds() + 1 < 10 ? "0" + _0x3b2628.getSeconds() : _0x3b2628.getSeconds();
                }
              }
            }
          }
        }
      }
    }

    ["safeGet"](_0x7871b6) {
      try {
        if (typeof JSON.parse(_0x7871b6) == "object") return true;
      } catch (_0x3ab773) {
        return false;
      }
    }

    ["SJS"](_0x452de3, _0x417624) {
      if (_0x417624 == 0) {
        let _0x1618e3 = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm01234567890123456789",
            _0x4d288f = _0x1618e3.length,
            _0x42c3dd = "";

        for (let _0x3131ad = 0; _0x3131ad < _0x452de3; _0x3131ad++) {
          _0x42c3dd += _0x1618e3.charAt(Math.floor(Math.random() * _0x4d288f));
        }

        return _0x42c3dd;
      } else {
        if (_0x417624 == 1) {
          let _0x46dffd = "qwertyuiopasdfghjklzxcvbnm0123456789",
              _0x4f3666 = _0x46dffd.length,
              _0x32b5bd = "";

          for (let _0x567ee7 = 0; _0x567ee7 < _0x452de3; _0x567ee7++) {
            _0x32b5bd += _0x46dffd.charAt(Math.floor(Math.random() * _0x4f3666));
          }

          return _0x32b5bd;
        } else {
          let _0x4fd05a = "0123456789",
              _0x27d516 = _0x4fd05a.length,
              _0x528de5 = "";

          for (let _0x1142ed = 0; _0x1142ed < _0x452de3; _0x1142ed++) {
            _0x528de5 += _0x4fd05a.charAt(Math.floor(Math.random() * _0x27d516));
          }

          return _0x528de5;
        }
      }
    }

    ["getCurrentTask"](_0x768fcb) {
      const _0x26c96e = new Date();

      for (let _0x32161e = 0; _0x32161e < _0x768fcb.length; _0x32161e++) {
        const _0x10f01a = _0x768fcb[_0x32161e],
              [_0x2b6f3d, _0x55a91e] = _0x10f01a.time_frame.split("-").map(_0x4e6800 => {
          const [_0x3ed93c, _0x25426c] = _0x4e6800.split(":");

          return new Date(_0x26c96e.getFullYear(), _0x26c96e.getMonth(), _0x26c96e.getDate(), _0x3ed93c, _0x25426c);
        });

        if (_0x2b6f3d <= _0x55a91e) {
          if (_0x2b6f3d <= _0x26c96e && _0x26c96e <= _0x55a91e) return _0x10f01a;
        } else {
          if (_0x2b6f3d <= _0x26c96e || _0x26c96e <= _0x55a91e) return _0x10f01a;
        }
      }

      return null;
    }

    ["udid"](_0x59d8d0) {
      function _0x4bba38() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }

      let _0x2ee2a9 = _0x4bba38() + _0x4bba38() + "-" + _0x4bba38() + "-" + _0x4bba38() + "-" + _0x4bba38() + "-" + _0x4bba38() + _0x4bba38() + _0x4bba38();

      return _0x59d8d0 == 0 ? _0x2ee2a9.toUpperCase() : _0x2ee2a9.toLowerCase();
    }

    ["encodeUnicode"](_0x29b1f6) {
      var _0x2295c7 = [];

      for (var _0x37b580 = 0; _0x37b580 < _0x29b1f6.length; _0x37b580++) {
        _0x2295c7[_0x37b580] = ("00" + _0x29b1f6.charCodeAt(_0x37b580).toString(16)).slice(-4);
      }

      return "\\u" + _0x2295c7.join("\\u");
    }

    ["decodeUnicode"](_0x948257) {
      return _0x948257 = _0x948257.replace(/\\u/g, "%u"), unescape(unescape(_0x948257));
    }

    ["RT"](_0x3fccd1, _0xa2286f) {
      return Math.round(Math.random() * (_0xa2286f - _0x3fccd1) + _0x3fccd1);
    }

    ["arrNull"](_0x1f89a2) {
      var _0x2e5424 = _0x1f89a2.filter(_0xb1f9d9 => {
        return _0xb1f9d9 && _0xb1f9d9.trim();
      });

      return _0x2e5424;
    }

    ["nowtime"]() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);
    }

    ["timecs"]() {
      let _0x4987fd = $.nowtime();

      if (JSON.stringify(_0x4987fd).indexOf(" ") >= 0) {
        _0x4987fd = _0x4987fd.replace(" ", "T");
      }

      return new Date(_0x4987fd).getTime() - 8 * 60 * 60 * 1000;
    }

    ["rtjson"](_0x1ef4cc, _0x32e0b9, _0x37cd04, _0x32afab) {
      if (_0x32afab == 0) return JSON.stringify(_0x1ef4cc.split(_0x32e0b9).reduce((_0x200cb3, _0x3a01c0) => {
        let _0x250605 = _0x3a01c0.split(_0x37cd04);

        return _0x200cb3[_0x250605[0].trim()] = _0x250605[1].trim(), _0x200cb3;
      }, {}));else {
        return _0x1ef4cc.split(_0x32e0b9).reduce((_0x5c84b0, _0x1f6216) => {
          let _0x1125a6 = _0x1f6216.split(_0x37cd04);

          return _0x5c84b0[_0x1125a6[0].trim()] = _0x1125a6[1].trim(), _0x5c84b0;
        }, {});
      }
    }

    ["MD5Encrypt"](_0x3f584f, _0x5482e6) {
      if (_0x3f584f == 0) return this.CryptoJS.MD5(_0x5482e6).toString().toLowerCase();else {
        if (_0x3f584f == 1) {
          return this.CryptoJS.MD5(_0x5482e6).toString().toUpperCase();
        } else {
          if (_0x3f584f == 2) return this.CryptoJS.MD5(_0x5482e6).toString().substring(8, 24).toLowerCase();else {
            if (_0x3f584f == 3) return this.CryptoJS.MD5(_0x5482e6).toString().substring(8, 24).toUpperCase();
          }
        }
      }
    }

    ["SHA_Encrypt"](_0x3db0c7, _0x452772, _0x25ecf6) {
      return _0x3db0c7 == 0 ? this.CryptoJS[_0x452772](_0x25ecf6).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x452772](_0x25ecf6).toString();
    }

    ["HmacSHA_Encrypt"](_0x503743, _0x1f4a6b, _0x232789, _0xd13233) {
      return _0x503743 == 0 ? this.CryptoJS[_0x1f4a6b](_0x232789, _0xd13233).toString(this.CryptoJS.enc.Base64) : this.CryptoJS[_0x1f4a6b](_0x232789, _0xd13233).toString();
    }

    ["Base64"](_0x475197, _0x350144) {
      if (_0x475197 == 0) return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x350144));else {
        return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x350144));
      }
    }

    ["DecryptCrypto"](_0x3b0a51, _0x40c0b0, _0x19c5cc, _0x4e041e, _0x540100, _0x12d92f, _0x4105ac) {
      if (_0x3b0a51 == 0) {
        const _0x25bb2f = this.CryptoJS[_0x40c0b0].encrypt(this.CryptoJS.enc.Utf8.parse(_0x540100), this.CryptoJS.enc.Utf8.parse(_0x12d92f), {
          "iv": this.CryptoJS.enc.Utf8.parse(_0x4105ac),
          "mode": this.CryptoJS.mode[_0x19c5cc],
          "padding": this.CryptoJS.pad[_0x4e041e]
        });

        return _0x25bb2f.toString();
      } else {
        const _0x11f2f6 = this.CryptoJS[_0x40c0b0].decrypt(_0x540100, this.CryptoJS.enc.Utf8.parse(_0x12d92f), {
          "iv": this.CryptoJS.enc.Utf8.parse(_0x4105ac),
          "mode": this.CryptoJS.mode[_0x19c5cc],
          "padding": this.CryptoJS.pad[_0x4e041e]
        });

        return _0x11f2f6.toString(this.CryptoJS.enc.Utf8);
      }
    }

    ["RSA"](_0x4d84f6, _0x52bb3b) {
      const _0x8ef9e5 = require("node-rsa");

      let _0x1417d2 = new _0x8ef9e5("-----BEGIN PUBLIC KEY-----\n" + _0x52bb3b + "\n-----END PUBLIC KEY-----");

      return _0x1417d2.setOptions({
        "encryptionScheme": "pkcs1"
      }), _0x1417d2.encrypt(_0x4d84f6, "base64", "utf8");
    }

    ["SHA_RSA"](_0x18ea0b, _0x4dd9d3) {
      let _0xf56179 = this.Sha_Rsa.KEYUTIL.getKey("-----BEGIN PRIVATE KEY-----\n" + $.getNewline(_0x4dd9d3, 76) + "\n-----END PRIVATE KEY-----"),
          _0x3d5ffd = new this.Sha_Rsa.KJUR.crypto.Signature({
        "alg": "SHA256withRSA"
      });

      _0x3d5ffd.init(_0xf56179);

      _0x3d5ffd.updateString(_0x18ea0b);

      let _0x4f4197 = _0x3d5ffd.sign(),
          _0x480a21 = this.Sha_Rsa.hextob64u(_0x4f4197);

      return _0x480a21;
    }

  }();
}