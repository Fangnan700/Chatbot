# Chatbot
Based on OpenAI, through this project, users in China can interact with AI without a VPN.





最近ChatGPT非常火，去体验之后确实有被惊艳到，也对OpenAI上的人工智能模型比较感兴趣，于是想着复刻一个ChatGPT，利用官方提供的包和api，可以非常简单地复刻出一个ChatGPT，下面是复盘开发过程的记录。

项目地址：https://github.com/Fangnan700/Chatbot

![image-20221217234403866](https://yvling-typora-image-1257337367.cos.ap-nanjing.myqcloud.com/typora/image-20221217234403866.png)



# 配置项目

- 我所使用的开发环境是Ubuntu22.04 + Python3.10 + Pycharm2022.3；

- 项目后端采用Flask框架，前端采用Bootstrap框架，前后端使用json进行交互。

**项目结构：**

![image-20221217222120806](https://yvling-typora-image-1257337367.cos.ap-nanjing.myqcloud.com/typora/image-20221217222120806.png)



# 部署项目

这里推荐使用境外的服务器，国内可以通过http请求访问到，将输入的内容发送到服务器，再由服务器转发到OpenAI的服务器上，由此可以在不使用科学上网的情况下，实现与AI机器人的交互。

为了便于在服务器上启动项目，我使用shell脚本来完成项目的启动：

**run.sh**

```shell
#! /bin/bash
./venv/bin/python -m flask run --host 0.0.0.0 --port 80
```

编写好的脚本放在项目根目录下。

将项目连同虚拟环境一起打包，上传到服务器：

```shell
scp Chatbot.zip username@host:/path
```

上传完成后解压：

```shell
unzip Chatbot.zip
```

进入项目文件下并给脚本赋予权限：

```shell
cd Chatbot
chmod +x run.sh
```

开放80端口：

```shell
ufw allow 80
```

在后台不中断地启动项目：

```shell
setsid ./run.sh &
```



这么启动在ssh连接断开后项目不会停止。

![1](https://yvling-typora-image-1257337367.cos.ap-nanjing.myqcloud.com/typora/1.jpg)

至此，通过服务器的公网IP就可以访问到项目了，如果访问不到，就要到服务器的管理面板查看端口是否开放。

![2](https://yvling-typora-image-1257337367.cos.ap-nanjing.myqcloud.com/typora/2.jpg)

在不使用vpn的情况下也能正常使用：

![3](https://yvling-typora-image-1257337367.cos.ap-nanjing.myqcloud.com/typora/3.jpg)

手机端也能正常使用：

![1EE60F238611E931B3ABCE4FCA1A182F](https://yvling-typora-image-1257337367.cos.ap-nanjing.myqcloud.com/typora/1EE60F238611E931B3ABCE4FCA1A182F.jpg)
