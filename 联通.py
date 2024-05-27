# Author: lindaye
# Update:2023-11-26
# 慈云数据VPS
# 活动入口：TG内部群
# 添加账号说明(青龙/本地)二选一
#   青龙: 青龙变量cytoken 值{"user":"xxxxxxxx","pass":"xxxxx"} 一行一个(回车分割)
#   本地: 脚本内置ck方法ck_token = [{"user":"xxxxxxxx","pass":"xxxxx"},{"user":"xxxxxxxx","pass":"xxxxx"}]
# 软件版本
version = "0.0.1"
name = "慈云数据VPS"
linxi_token = "cytoken"
linxi_tips = '{"user":"xxxxxxxx","pass":"xxxxx"}'
import requests
import json
import os
import re
from multiprocessing import Pool

# 变量类型(本地/青龙)
Btype = "青龙"
# 域名(无法使用时请更换)
domain = 'https://www.zovps.com'
# 保持连接,重复利用
ss = requests.session()
headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.39 (0x18002733) NetType/WIFI Language/zh_CN',
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
}

def user_info(i,ck):
    token = re.findall('<input type="hidden" name="token" value="(.*?)">',ss.get(domain+"/login",headers=headers).text)[0]
    data = {'token': token,'email': ck['user'],'password': ck['pass'],}
    result = ss.post(domain+"/login?action=email",headers=headers,data=data,allow_redirects=False)
    result = ss.get(domain+"/clientarea",headers=headers)
    userid = re.findall('email">(.*?)</span>',result.text)
    balance = re.findall(r'<h1>(.*?)</h1>', result.text)
    if userid:
        result = ss.post(domain+"/addons?_plugin=70&_controller=index&_action=index",headers=headers, data={'uid': f'{userid[0]}','type': 'point'}).json()
        jifen = re.findall(r'\d+', result['msg'])[0]
        print(f"账号【{i+1}】[{ck['name']}] ✅ 账户:{userid[0]} 余额:{balance[0]} 积分:{jifen}")
    else:
        print(f"账号【{i+1}】请检查账号密码是否错误!")


def do_read(i,ck):
    token = re.findall('<input type="hidden" name="token" value="(.*?)">',ss.get(domain+"/login",headers=headers).text)[0]
    data = {'token': token,'email': ck['user'],'password': ck['pass'],}
    result = ss.post(domain+"/login?action=email",headers=headers,data=data,allow_redirects=False)
    result = ss.get(domain+"/clientarea",headers=headers)
    userid = re.findall('email">(.*?)</span>',result.text)
    balance = re.findall(r'<h1>(.*?)</h1>', result.text)
    if userid:
        result = ss.post(domain+"/addons?_plugin=70&_controller=index&_action=index",headers=headers, data={'uid': f'{userid[0]}'}).json()
        print(f"账号【{i+1}】[{ck['name']}] ✅ 今日签到:{result['msg']}")
    else:
        print(f"账号【{i+1}】请检查账号密码是否错误!")

def handle_exception(e,i):
    print(f"账号【{i+1}】🆘 程序出现异常:", e)

def process_wrapper(func, args):
    try:
        func(*args)
    except Exception as e:
        handle_exception(e,args[0])

if __name__ == "__main__":
    print(f"""██╗     ██╗███╗   ██╗██╗  ██╗      ██████╗██╗   ██╗███████╗ ██████╗ 
██║     ██║████╗  ██║╚██╗██╔╝     ██╔════╝╚██╗ ██╔╝╚══███╔╝██╔═══██╗
██║     ██║██╔██╗ ██║ ╚███╔╝█████╗██║      ╚████╔╝   ███╔╝ ██║   ██║
██║     ██║██║╚██╗██║ ██╔██╗╚════╝██║       ╚██╔╝   ███╔╝  ██║   ██║
███████╗██║██║ ╚████║██╔╝ ██╗     ╚██████╗   ██║   ███████╗╚██████╔╝
╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝      ╚═════╝   ╚═╝   ╚══════╝ ╚═════╝ 
    项目:{name}           BY-林夕          Verion: {version}(并发)
    Github仓库地址: https://github.com/linxi-520/LinxiPush
""")
    if Btype == "青龙":
        if os.getenv(linxi_token) == None:
            print(f'⛔ 青龙变量异常: 请添加{linxi_token}变量示例:{linxi_tips} 确保一行一个')
            exit()
        # 变量CK列表
        #ck_token = [json.loads(line) for line in os.getenv(linxi_token).splitlines()]
        ck_token = [json.loads(li) if "&" in line else json.loads(line) for line in os.getenv(linxi_token).splitlines() for li in re.findall(r'{.*?}', line)]
    else:
        # 本地CK列表
        ck_token = [
            # 这里填写本地变量
            {"ck":"xxx"}
        ]
        if ck_token == []:
            print(f'⛔ 本地变量异常: 请添加本地ck_token示例:{linxi_tips}')
            exit()
    # 创建进程池
    with Pool() as pool:
        print("==================👻获取账号信息👻=================")
        pool.starmap(process_wrapper, [(user_info, (i, ck)) for i, ck in enumerate(ck_token)])
        print("==================💫开始执行任务💫=================")
        pool.starmap(process_wrapper, [(do_read, (i, ck)) for i, ck in enumerate(ck_token)])
        # print("==================🐣获取账号信息🐣=================")
        # pool.starmap(process_wrapper, [(user_info, (i, ck)) for i, ck in enumerate(ck_token)])
        # print("==================🐋开始账号提现🐋=================")
        # pool.starmap(process_wrapper, [(get_money, (i, ck)) for i, ck in enumerate(ck_token)])


        # 关闭进程池
        pool.close()
        # 等待所有子进程执行完毕
        pool.join()

        # 关闭连接
        ss.close
        # 输出结果
        print(f"================[{name}V{version}]===============")