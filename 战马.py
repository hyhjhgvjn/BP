"""

小程序----战马星球
抓包 zm.t7a.cn中safe的id值
环境变量 zmsafeId 多账号@分割
上传运动步数，目前没写，后面随缘完善
如果想用WxPusher则修改WxPusher变量为True
定时自己看着来

"""
import os
import requests
import logging
from notify import send

# 创建日志记录器
logger = logging.getLogger(f"账号{__name__}")
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# 从环境变量中获取zmsafeId
safeId = os.environ.get("zmsafeId", "").split("@")
if not safeId:
    logger.info("请检查环境变量zmsafeId是否正确")
    exit(3)
logger.info(f"共找到{len(safeId)}个账号")


# WxPusher推送 https://wxpusher.zjiecode.com/admin/main
WxPusher = False
appToken = ''
uids = ['']


def WxPusher_ts(appToken, uids, rw, msg):
    url = 'https://wxpusher.zjiecode.com/api/send/message'
    params = {
        'appToken': appToken,
        'content': msg,
        'summary': rw,
        'contentType': 1,
        'uids': uids
    }
    r = requests.post(url, json=params)
    msg = r.json().get('msg', None)
    print(f'WxPusher推送结果：{msg}')


##战马星球--获取个人信息
def getUserInfo(safeId):
    ##获取个人积分信息
    allscore = getusercenter(safeId)
    url = 'https://zm.t7a.cn/api/getuserinfo.php?safe='+f'{safeId}'
    payload = ""
    headers = {
        'Host': 'zm.t7a.cn',
        'Connection': 'keep-alive',
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.44(0x18002c29) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wx94dca6ef07a54c55/142/page-frame.html'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    res = '当前登录账号为:'+response.json()['nickname']+'-----手机号为：'+response.json()['tel']+'----积分为：'+allscore
    logger.info(res)
    log_list.append(res)



##战马星球获取个人积分信息
def getusercenter(safeId):
    url = 'https://zm.t7a.cn/api/getusercenter.php?safe=' + f'{safeId}'
    payload = ""
    headers = {
        'Host': 'zm.t7a.cn',
        'Connection': 'keep-alive',
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.44(0x18002c29) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wx94dca6ef07a54c55/142/page-frame.html'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    allscore = response.json()['allscore']
    return allscore



##战马星球每日任务---签到
def checkin(safeId):
    url = 'https://zm.t7a.cn/api/checkin.php?safe=' + f'{safeId}'
    payload = {}
    headers = {
        'Host': 'zm.t7a.cn',
        'Connection': 'keep-alive',
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.44(0x18002c29) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wx94dca6ef07a54c55/142/page-frame.html'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    res = response.json()['msg']
    logger.info(res)
    log_list.append(res)


##战马星球----喂马饲料(可以执行多次)
def horseeat(safeId):
    url = 'https://zm.t7a.cn/api/horseeat.php?safe='+f'{safeId}'
    payload = {}
    headers = {
        'Host': 'zm.t7a.cn',
        'Connection': 'keep-alive',
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.44(0x18002c29) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wx94dca6ef07a54c55/142/page-frame.html'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    res = response.json()['msg']
    logger.info(res)
    log_list.append(res)


##战马每日任务---分享
def share(safeId):
    url = 'https://zm.t7a.cn/api/share.php?safe=' + f'{safeId}'
    payload = {}
    headers = {
        'Host': 'zm.t7a.cn',
        'Connection': 'keep-alive',
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.44(0x18002c29) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wx94dca6ef07a54c55/142/page-frame.html'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    res = '每日任务分享'+response.json()['msg']
    logger.info(res)
    log_list.append(res)


##执行任务
def executeTask(safeId):
    ##获取个人信息
    getUserInfo(safeId);
    ##每日任务分享
    share(safeId);
    ##每日任务签到
    checkin(safeId);
    ##执行喂马任务
    horseeat(safeId);
    ##执行完任务重新获取个人信息
    getUserInfo(safeId);


# 主程序入口
if __name__ == '__main__':
    log_list = []  # 存储日志信息的全局变量

    for i in range(len(safeId)):
        res = f"\n📖第{i + 1}个账号任务详情☟"
        logger.info(res)
        log_list.append(res)
        safeIds = safeId[i]
        #执行任务
        executeTask(safeIds)

    logger.info("\n============== 推送 ==============")
    combined_logs = '\n'.join(log_list)
    if (WxPusher):
        WxPusher_ts(appToken, uids, '招商信诺', combined_logs)
    else:
        send("战马星球", combined_logs)