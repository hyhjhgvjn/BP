/**
# 脚本名称：快乐金币 (限制安卓)
# 功能描述: [跑任务]
# 入口：群文件下载魔改版  同一邀请码切勿填太多次
# 使用说明:
#   - [抓包https://app.88888yc.com//appapi/mp.red/red_list的请求体：uid和token参数]
# 环境变量设置:
#   - 名称：[kljbCK]   格式：[uid#密码#提现支付宝名字#提现手机号]   例：(**#***#****#****)
#   - 多账号处理方式：[换行或者@分割]
# 定时：[一天跑3-4次即可，间隔10分钟]
# 注: 本脚本仅用于个人学习和交流，请勿用于非法用途。作者不承担由于滥用此脚本所引起的任何责任，请在下载后24小时内删除。
# 作者: 高三一班的呆呆
 */

    
const crypto = require('crypto');
const axios = require('axios');
const querystring = require('querystring');

let ck = process.env.kljbCK || '';

class KLGG {
    constructor(ck) {
        this.uid = ck.split("#")[0];
        this.mm = ck.split("#")[1];
        this.name = ck.split("#")[2];
        this.sjh = ck.split("#")[3];
        this.keyHex = '32393434313337313435363431383131';
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Apache-HttpClient/UNAVAILABLE (java 1.4)',
            'Connection': 'Keep-Alive',
            'Host': '212.50.232.31',
        };
    }

    async num() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async md5(str) {
        const hash = crypto.createHash('md5');
        hash.update(str);
        return hash.digest('hex');
    }

    async dom() {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const halfLength = Math.floor(16 / 2);
        for (let i = 0; i < halfLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }

    async encrypt(text) {
        const algorithm = 'aes-128-ecb';
        const keyBuffer = Buffer.from(this.keyHex, 'hex');
        const cipher = crypto.createCipheriv(algorithm, keyBuffer, null);
        cipher.setAutoPadding(true);
        let t1 = cipher.update(text, 'utf8', 'base64');
        t1 += cipher.final('base64');
        const aa = await this.md5(t1);
        const a = await this.num();
        const sjc1 = "1715848812";
        const yy = `${a}${sjc1}${aa}${t1}`;
        return querystring.escape(yy);
    }

    async jiemi(text) {
        const algorithm = 'aes-128-ecb';
        const encryptedContentBase64 = text;
        const keyBuffer = Buffer.from(this.keyHex, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, keyBuffer, null);
        decipher.setAutoPadding(true);
        let decryptedContent = decipher.update(encryptedContentBase64, 'base64', 'utf8');
        decryptedContent += decipher.final('utf8');
        return JSON.parse(decryptedContent);
    }

    async cs(rwid, ye) {
        const uid = this.uid;
        const mm = this.mm;
        const oaid = await this.dom();
        const sjc1 = "1715848812";
        let t1;
        if (ye) {
            t1 = `${rwid}${sjc1}+1=${uid}&+2=${mm}&+3=${oaid}&+4=${this.name}&+5=${this.sjh}&+6=${ye}快乐金币50570e684dcom.mobile.myapp.sjm`;
        }
        else {
            t1 = `${rwid}${sjc1}+1=${uid}&+2=${mm}&+3=${oaid}&+4=${oaid}快乐金币50570e684dcom.mobile.myapp.sjm`;
        }
        return await this.encrypt(t1);
    }

    // 看广告
    async post_gg() {
        try {
            const rwid = "J3mLqhfXWod1DiK9mg2xka8hwNMLVD6/7XcUeB3GYI8=";
            const requestData = await this.cs(rwid, null);
            const r = await axios.post('http://212.50.232.31/jm.php', requestData,  this.headers );
            const r1 = r.data.replace(/\s/g, '');
            const r2 = await this.jiemi(r1);
            if (r2.code === "200") {
                if (r2['9'] === "1") {
                    console.log(`看广告成功`);
                }
                if (r2['9'] === "0") {
                    console.log(`[${this.uid}] 广告等待中`);
                }
                if (r2['9'] === "2") {
                    console.log(`[${this.uid}] 余额高于1.5,请提现后再观看,尝试去提现`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await this.yue()
                }
            }else {
                console.log(`[${this.uid}] 看广告错误`,r2);
            }
        } catch (error) {
            console.error(`[${this.uid}] Error:`, error);
        }
    }

    // 余额查询
    async yue() {
        try {
            const rwid = "OVgMBmUZROyn+32X+GGGrA==";
            const data = await this.cs(rwid, null);
            const response = await axios.post('http://212.50.232.31/jm.php', data, this.headers );
            const a = response.data.replace(/\s/g, '');
            const b = await this.jiemi(a);
            if (b.code === "200") {
                console.log(`[${this.uid}] 余额：${b['3']}`);
                if (b['3'] >= "1.50") {
                    console.log(`[${this.uid}] 去提现`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await this.tx(b['3']);
                    return b['5'];
                } else {
                    console.log(`[${this.uid}] 余额不够，跳过提现`);
                    return 0;
                }
            }
            else {
                console.log(`[${this.uid}] 余额查询错误`,b);
                return 0;
            }
        }
        catch (error) {
            console.error(`[${this.uid}] Error:`, error);
            throw error;
        }
    }

    // 提现
    async tx(ye) {
        try {
            const rwid = "l5VLKMmNJ3bQysG0ReZU0w==";
            const data = await this.cs(rwid, ye);
            console.log(`[${this.uid}] 提现${ye}`);
            const response = await axios.post('http://212.50.232.31/jm.php', data,  this.headers );
            const a = response.data.replace(/\s/g, '');
            const b = await this.jiemi(a);
            if (b.code === "200") {
                console.log(`[${this.uid}] 提现成功`);
                return 1;
            }
            if (b.code === "600") {
                console.log(`[${this.uid}] 提现失败,当天可能已经提现过`);
                return 0;
            }
        }
        catch (error) {
            console.error(`[${this.uid}] Error:`, error);
            throw error;
        }
    }
}


(async () => {
    if (!ck) {
        console.log(`请填写变量[kljbCK]后再运行`);
        process.exit(0);
    }
    const cookie = ck.split("\n");
    console.log(`快乐金币共获取到 ${cookie.length} 个账号`);
    for (let index = 0; index < cookie.length; index++) {
        console.log(`======开始第${index + 1}个账号======`);
        const klgg = new KLGG(cookie[index]);
        await klgg.post_gg();
        await new Promise(resolve => setTimeout(resolve, 4000));
    }
})();

