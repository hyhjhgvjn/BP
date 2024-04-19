import requests
import logging
import os
import re
import datetime
import concurrent.futures
import random
import time
# 创建日志记录器
logger = logging.getLogger(f"账号{__name__}")
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)
# 从环境变量中获取authorization
cookie_str = os.environ.get("jgpy", "")
cookies = re.split(r'[@&\n]', cookie_str)
##从环境变量中获取runTimes
if not cookies:
    logger.info("请检查环境变量jgpy是否正确")
    exit(3)
logger.info(f"共找到{len(cookies)}个账号")


# WxPusher推送 https://wxpusher.zjiecode.com/admin/main
WxPusher = True
appToken = os.environ.get("WP_APP_TOKEN")
uids= os.environ.get("uid")
def wxpush(tsMsg):
    # WxPusher API地址
    api_url = 'https://wxpusher.zjiecode.com/api/send/message'
    # 按照积分对数据进行排序
    sorted_data = sorted(tsMsg, key=lambda x: int(x.get('积分', 0)), reverse=True)
    # 构造要推送的表格内容
    table_content = ''
    for row in sorted_data:
        table_content += f"<tr><td style='border: 1px solid #ccc; padding: 6px; text-align: center;'>{row['尾号']}</td><td style='border: 1px solid #ccc; padding: 6px; text-align: center;'>{row['用户']}</td><td style='border: 1px solid #ccc; padding: 6px; text-align: center;'>{row['积分']}</td></tr>"

    table_html = f"<table style='border-collapse: collapse;'><tr style='background-color: #f2f2f2;'><th style='border: 1px solid #ccc; padding: 8px; text-align: center;'>📱</th><th style='border: 1px solid #ccc; padding: 6px; text-align: center;'>🆔</th><th style='border: 1px solid #ccc; padding: 6px; text-align: center;'>💎</th></tr><tr style='background-color: #f2f2f2;'><th style='border: 1px solid #ccc; padding: 8px; text-align: center;'>尾号</th><th style='border: 1px solid #ccc; padding: 6px; text-align: center;'>用户</th><th style='border: 1px solid #ccc; padding: 6px; text-align: center;'>积分</th></tr>{table_content}</table>"
   
    # 构造请求参数
    params = {
        "appToken": appToken,
        'content': table_html,
        'contentType': 3,  # 表格类型
        'topicIds': [],  # 接收消息的用户ID列表，为空表示发送给所有用户
        "summary":f'交个朋友会员商城资产详情',
        "uids": [uids],
    }

    # 发送POST请求
    response = requests.post(api_url, json=params)

    # 检查API响应
    if response.status_code == 200:
        result = response.json()
        if result['code'] == 1000:
            print('🎉管理员汇总推送成功')
        else:
            print(f'💔管理员汇总推送失败，错误信息：{result["msg"]}')
    else:
        print('⛔️管理员汇总推送请求失败')


# 设置请求头部信息
def setHeaders(authorization):
    headers = {
    "Host": "smp-api.iyouke.com",
    "Connection": "keep-alive",
    "authorization":f'{authorization}',
    "charset": "utf-8",
    "xy-extra-data": "appid=wx3b294e7a0ba29bc3;version=1.6.78;envVersion=release;senceId=1089",
    "appid": "wx3b294e7a0ba29bc3",
    "User-Agent": "Mozilla/5.0 (Linux; Android 11; IN2010 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/1110017 MMWEBSDK/20230504 MMWEBID/8375 MicroMessenger/8.0.37.2380(0x28002535) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64 MiniProgramEnv/android",
    "envversion": "release",
    "content-type": "application/json",
    "Accept-Encoding": "gzip,compress,br,deflate",
    "version": "1.6.78",
    "Referer": "https://servicewechat.com/wx3b294e7a0ba29bc3/29/page-frame.html"
}

    return headers
#每日签到
def addSignIn(headers):
    try:
  #获取当天日期    
        date = datetime.date.today().strftime("%Y%%2F%m%%2F%d")
        url = f'https://smp-api.iyouke.com/dtapi/pointsSign/user/sign?date={date}'
        response = requests.get(url=url,headers=headers)
        result = response.json()
        if 0 == result['error']:
            res = f"签到成功✅"
            logger.info(res)
            log_list.append(res)
        elif -1 == result['error']:
            res = f"已签到✅请勿重复签到⚠"
            logger.info(res)
            log_list.append(res)           
        else:
            return response.json()
    except Exception as e:
        res = f"签到时出现异常❌{str(e)}"
        logger.error(res)
        log_list.append(res)
#查询直播预告信息，用于传参bizId
def doLiveTask(headers): 
    try:    
        url = f'https://smp-api.iyouke.com/dtapi/channel/live/page'     
        params = {
           "day": datetime.date.today(),
           "liveHostId": "47",
           "current": "1",
           "pageSize": "10"
        }
        response = requests.get(url=url,headers=headers,params=params)
        result = response.json() 
        #获取任务ID
        liveIds = [item['liveId'] for item in result['data']['selectedDayLives'] + result['data']['list']]
        if 0 == result['error']:
          for task_id in liveIds:
            title = "🎬查看直播预告"
            taskType = 2 
            #执行查看直播预告任务          
            completeTask(headers,taskType,task_id,title)
            if '已完成' in log_list[-1]:
              break
        else:
          return response.json()        
    except Exception as e:
            res = f"查看直播预告时出现异常❌{str(e)}"
            logger.error(res)
            log_list.append(res) 
#查询浏览商品信息              
def doBrowseTask(headers):
    try:
        url = f'https://smp-api.iyouke.com/dtapi/points/task/submit'  
        data = '{"taskType":19,"taskId":1151}'
        response = requests.post(url=url,headers=headers,data=data)
        result = response.json()
        title = "👀浏览商品赚积分"
        if 0 == result['error']:
          #执行浏览商品赚积分          
            res = f'{title}'"任务成功✅"
            logger.info(res)
            log_list.append(res)
        elif 999 == result['error']:            
            res = f'{title}'"任务已完成✅请勿重复操作⚠"
            logger.info(res)
            log_list.append(res)      
        else:
            return response.json()        
    except Exception as e:
            res = f"浏览商品赚积分时出现异常❌{str(e)}"
            logger.error(res)
            log_list.append(res) 
#查询直播列表            
def queryLiveTasks(headers):
        #获取当天日期
        today = datetime.date.today()
        url = f'https://smp-api.iyouke.com/dtapi/channel/live/page?day='+f'{today}'+'&liveHostId=370&current=1&pageSize=20'          
        response = requests.get(url=url,headers=headers)
        result = response.json()
        if 0 == result['error']:
          #执行浏览商品赚积分          
            res = "获取直播列表成功✅"
            logger.info(res)
            log_list.append(res)
            for item in result['data']['selectedDayLives']:
              liveId = item['liveId']
              print(liveId)
              completeTask(headers,liveId)
            for item in result['data']['list']:
              liveId = item['liveId']
              print(liveId)
              completeTask(headers,liveId)
        elif 999 == result['error']:           
            res = "获取直播列表任务已完成✅请勿重复操作⚠"
            logger.info(res)
            log_list.append(res)      
        else:
            return response.json()        
    
#做任务        
def completeTask(headers,task_id):
 try:    
    url = "https://smp-api.iyouke.com/dtapi/points/task/submit"       
    payload = {
                "taskType": '3',
                "bizId": f'{task_id}'
                }                 
    response = requests.post(url=url, headers=headers, json=payload)
    result = response.json()
    if 0 == result['error']:
      res = "订阅直播任务成功✅"
      logger.info(res)
      log_list.append(res)
      sleep_time = random.randint(1,3)
      time.sleep(sleep_time)
    elif 999 == result['error']:
      res = "订阅直播任务已完成✅请勿重复操作⚠"
      logger.info(res)
      log_list.append(res)
    else:
      return response.json()
 except Exception as e:
    res = "订阅直播任务完成时出现异常❌{str(e)}"
                #res = f"任务完成时出现异常❌{str(e)}"
    logger.error(res)
    log_list.append(res)

#查询用户信息                
def getInfo(headers):
    try:
        url = f'https://smp-api.iyouke.com/dtapi/p/user/userInfo'        
        response = requests.get(url=url,headers=headers)
        result = response.json() 
        #手机尾号
        global mobile
        mobile = result['userMobile'][-4:]
        #用户昵称
        global nickname
        nickname = result['nickName']
        #会员等级名称
        memberName = result['memberName']
        res=f"手机尾号📱"f'{mobile}'"\n用户昵称🆔"f'{nickname}'" 会员等级🏅V"f'{memberName}'
        logger.info(res)
        log_list.append(res)       
    except Exception as e:
        res = f"token已失效🔕请及时更新⚠"
        logger.error(res)
        log_list.append(res)    
#查询积分信息
def getPoints(headers):
    try:
        url = f'https://smp-api.iyouke.com/dtapi/points/user/centerInfo'     
        response = requests.get(url=url,headers=headers)
        result = response.json()               
        #总积分
        global pointsBalance
        pointsBalance = result['data']['pointsBalance']
        res=f"您的积分💳"f'{pointsBalance}'
        logger.info(res)
        log_list.append(res)       
    except Exception as e:
        res = f"查询积分出现异常❌{str(e)}"
        logger.error(res)
        log_list.append(res)    
# 执行任务
def executeTask(headers):  
    #查询用户信息        
    getInfo(headers)
    #查询积分信息
    getPoints(headers)
    #每日签到
    addSignIn(headers)
    #配置任务参数
    #taskType = 3
    #task_id = 1120
    #title = '⏰订阅直播预告'    
    #做任务 
    queryLiveTasks(headers)  
    #执行查看直播预告任务      
    doLiveTask(headers)
    #执行浏览商品任务      
    doBrowseTask(headers)
    #查询用户信息        
    getInfo(headers)
    #查询积分信息
    getPoints(headers)
    ts = {'尾号': f'{mobile}','用户':f'{nickname}','积分':f'{pointsBalance}'}
    tsMsg.append(ts)
# 主程序入口
if __name__ == '__main__':
    log_list = []  # 存储日志信息的全局变量
    tsMsg=[]
    for i in range(len(cookies)):
        res = f"\n📖第{i + 1}个账号任务详情☟"
        logger.info(res)
        log_list.append(res)
        authorization = cookies[i]    
        headers = setHeaders(authorization)
        #执行任务
        executeTask(headers)   
       
    logger.info("\n============== 推送 ==============")
    combined_logs = '\n'.join(log_list)
    if(WxPusher):
        wxpush(tsMsg)