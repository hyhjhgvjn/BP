# -*- coding: utf-8 -*-
"""
cron: 1 9,18 * * *
new Env('中山Plus');
捉包 https://zsrbapp.zsnews.cn 域名请求头里的 sessiontoken 和cookie里的 token= 只有值（点开广场-随便再点几个地方就能抓到）
cookie里token格式: xxxx-xxxx-xxxx-xxx
用#拼接，顺序不可反 token=的值#sessiontoken

青龙变量 export zsPlus="xxx-xxx-xxx-xxx-xxxx#xxxxx" 多账号@隔开
"""
import requests
import logging
import time
import os
import json
import random
from notify import send

# 忽略TLS证书验证警告
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
# 创建日志记录器
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

cookies = []
try:
    if "zsPlus" in os.environ:
        cookies = os.environ["zsPlus"].split("@")
        if len(cookies) > 0:
            logger.info(f"共找到{len(cookies)}个账号 已获取并使用Env环境Cookie")
            logger.info("声明：本脚本为学习python 请勿用于非法用途")
    else:
        logger.info("【提示】变量格式: sessiontoken#token=的值\n环境变量添加: zsPlus")
        exit(3)
except Exception as e:
    logger.error(f"发生错误：{e}")
    exit(3)


# -------------------------分割线------------------------
class miniso:
    @staticmethod
    def setHeaders(i):
        headers = {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "User-Agent": "okhttp/4.10.0",
            "sessiontoken": i,
        }
        return headers

    @staticmethod
    def signin(headers):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/welfare/clockIn'
            response = requests.post(url=url, headers=headers)
            result = response.json()
            if result['code'] == 0:
                res = f"签到: 获得{result['data']['addPoint']}积分"
                logger.info(res)
                log_list.append(res)
            else:
                res = f"签到: {result['error']}"
                logger.info(res)
                log_list.append(res)
        except Exception as e:
            print(e)

    @staticmethod
    def newslist(headers, i):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/plus-news-info-list/list?categoryId=94&page=1&order=0'
            response = requests.get(url=url, headers=headers)
            num = 0
            for content in response.json()['data']['list'][:5]:
                id = content['id']
                miniso.readNewsAddPoint(headers, id, i)
                if num < 2:
                    miniso.create(headers, id)
                num += 1
        except Exception as e:
            print(e)

    @staticmethod
    def readNewsAddPoint(headers, id, i):
        try:
            url = f'https://zsrbapp.zsnews.cn/mobile/news/readNewsAddPoint'
            data = {
                'sessionToken': i,
                'infoId': f'{id}',
            }
            response = requests.post(url, headers=headers, data=data)
            sleeptime = random.randint(3, 5)
            res = f"阅读文章: -- 随机等待{sleeptime}秒后继续...."
            logger.info(res)
            time.sleep(sleeptime)
            miniso.share(headers, id)
        except Exception as e:
            print(e)

    @staticmethod
    def share(headers, id):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/user/point'
            data = {
                'event': 'share',
                'uniqueId': f'{id}',
            }
            response = requests.post(url, headers=headers, data=data)
            sleeptime = random.randint(3, 5)
            res = f"分享文章: -- 随机等待{sleeptime}秒后继续...."
            logger.info(res)
            time.sleep(sleeptime)
            miniso.like(headers, id)
        except Exception as e:
            print(e)

    @staticmethod
    def like(headers, id):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/info/like?id={id}'
            response = requests.get(url, headers=headers)
            sleeptime = random.randint(3, 5)
            res = f"点赞文章: -- 随机等待{sleeptime}秒后继续...."
            logger.info(res)
            time.sleep(sleeptime)
        except Exception as e:
            print(e)

    @staticmethod
    def create(headers, id):
        content = miniso.yiyan(headers,'http://yanxi520.cn/api/xljtwr.php')
        try:
            url = f'https://zsrbapp.zsnews.cn/api/comment/create'
            data = {
                'content': f'{content}',
                'id': f'{id}',
                'parentId': '0'
            }
            response = requests.post(url, headers=headers, data=data)
            res = f"评论文章: {content}"
            logger.info(res)
        except Exception as e:
            print(e)

    @staticmethod
    def videolist(headers):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/short-video/list?pageSize=15&page=1&keyword='
            response = requests.get(url=url, headers=headers)
            counter = 0
            for content in response.json()['data']['items'][:5]:
                id = content['id']
                miniso.finished(headers, id, 'WatchVideo', '观看视频')
                time.sleep(3)
                miniso.finished(headers, id, 'ShareVideo', '分享视频')
                time.sleep(3)
                miniso.likevideo(headers, id)
                if counter < 2:
                    miniso.comment(headers, id)
                counter += 1
        except Exception as e:
            print(e)

    @staticmethod
    def finished(headers, id, type, name):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/welfare/finished'
            data = {
                'taskType': f'{type}',
                'id': f'{id}',
            }
            response = requests.post(url, headers=headers, data=data)
            sleeptime = random.randint(3, 5)
            res = f"{name}: -- 随机等待{sleeptime}秒后继续...."
            logger.info(res)
            time.sleep(sleeptime)
        except Exception as e:
            print(e)

    @staticmethod
    def likevideo(headers, id):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/short-video/like'
            data = {
                'page': '1',
                'shortVideoId': f'{id}',
            }
            response = requests.post(url, headers=headers, data=data)
            sleeptime = random.randint(3, 5)
            res = f"点赞视频: -- 随机等待{sleeptime}秒后继续...."
            logger.info(res)
            time.sleep(sleeptime)
        except Exception as e:
            print(e)

    @staticmethod
    def comment(headers, id):
        content = miniso.yiyan(headers,'http://yanxi520.cn/api/xljtwr.php')
        try:
            url = f'https://zsrbapp.zsnews.cn/api/short-video/comment'
            data = {
                'content': f'{content}',
                'shortVideoId': f'{id}',
            }
            response = requests.post(url, headers=headers, data=data)
            res = f"评论视频: {content}"
            logger.info(res)
        except Exception as e:
            print(e)

    @staticmethod
    def submit(headers, i, token):
        content = miniso.yiyan(headers,'https://v.api.aa1.cn/api/api-wenan-aiqing/index.php?type=json')
        text = json.loads(content)
        try:
            url = f'https://zsrbactivity.zsnews.cn/api/talk/submit'
            data = {
                "mention": "#N种方式打卡书展#",
                "phone": "",
                "picker": "",
                "content": f"#N种方式打卡书展# {text['text']}",
                "type": "image",
                "fileList": None,
                "video": "",
                "cover": "",
                "infoId": "40",
                "sessionToken": f"{i}"
            }
            headers = {
                "Host": "zsrbactivity.zsnews.cn",
                "content-type": "application/json",
                "cookie": f"token={token}"
            }
            response = requests.post(url=url, headers=headers, json=data)
            res = f"发帖: {text['text']}"
            logger.info(response.json()['msg'])
            logger.info(res)
        except Exception as e:
            print(e)

    @staticmethod
    def my(headers):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/welfare/index'
            response = requests.get(url=url, headers=headers)
            miniso.invitation(headers)
            return response.json()
        except Exception as e:
            print(e)

    @staticmethod
    def invitation(headers):
        try:
            url = f'https://zsrbapp.zsnews.cn/api/invitation/bind?code=520067'
            response = requests.get(url=url, headers=headers)
            return response.json()
        except Exception as e:
            print(e)

    @staticmethod
    def yiyan(headers,u):
        try:
            url = f'{u}'
            response = requests.get(url=url, headers=headers, verify=False)
            return response.text
        except Exception as e:
            print(e)


if __name__ == '__main__':
    log_list = []  # 存储日志信息的全局变量
    for i in range(len(cookies)):
        head = f"\n------------开始第[{i + 1}]个账号------------"
        logger.info(head)
        log_list.append(head)
        token, i = cookies[i].split('#')

        headers = miniso.setHeaders(i)

        result = miniso.my(headers)
        if result['code'] == 0:
            res = f"积分:{result['data']['userInfo']['newPoint']}"
            logger.info(res)
            log_list.append(res)

            for content in result['data']['taskList']:
                start = '未完成' if int(content['finishedNum']) < int(content['needFinishNum']) else '已完成'
                res = f"任务:  {content['taskName']} {content['finishedNum']}/{content['needFinishNum']} -- {start}"
                logger.info(res)
                log_list.append(res)

                id = int(content['id'])
                finished_num = int(content['finishedNum'])
                need_finish_num = int(content['needFinishNum'])

                if id == 1 and finished_num == 0:
                    miniso.signin(headers)
                elif id == 2 and finished_num < need_finish_num:
                    miniso.newslist(headers, i)
                elif id == 9 and finished_num < need_finish_num:
                    miniso.videolist(headers)
                elif id == 10 and finished_num < need_finish_num:
                    miniso.submit(headers, i, token)

        else:
            res = f"账号: {result['error']},可能变量错误或已失效"
            logger.info(res)
            log_list.append(res)

    logger.info("\n============== 推送 ==============")
    send("中山Plus", '\n'.join(log_list))