## HA-web介绍

HA-web：Linux 高可用集群Web提供一套基于BS架构对集群资源统一配置和管理的界面。 该管理界面直观易用，可以实时监控所有集群节点的运行状态，能对集群资源进行规则设置、添加、启动、停止、修改、删除等常规操作。 跨平台支持Chrome、IE、Firefox常用浏览器。

## 一、安装HA-web开发环境

### 1、安装node.js环境:

#### Windows环境:

#### 方法一：使用Windows安装包（.msi)

下载地址：[https://nodejs.org/en/download/](http://nodejs.org/en/download/)

安装步骤：

步骤 1 : 双击下载后的安装包

步骤 2 : 点击Run(运行)

步骤 3 : 勾选接受协议选项，点击 next

步骤 4 : Node.js默认安装目录为 "C:\Program Files\nodejs\" , 你可以修改目录，并点击 next

步骤 5 : 点击树形图标来选择你需要的安装模式 , 然后点击下一步 next

步骤 6 :点击 Install（安装） 开始安装Node.js。

检测PATH环境变量是否配置了Node.js，点击开始=》运行=》输入"cmd" => 输入命令"path"，输出如下结果：

```bash
PATH=C:\oraclexe\app\oracle\product\10.2.0\server\bin;C:\Windows\system32;
C:\Program Files\nodejs\;C:\Users\rg\AppData\Roaming\npm
```
检查Node.js版本

```bash
C:\> node --version
v14.16.0
$ npm -v
6.14.11
```
#### 方法二：使用Windows二进制文件安装（.exe)

下载地址：[https://nodejs.org/en/download/](http://nodejs.org/en/download/)

32 位安装包下载地址 : [http://nodejs.org/dist/v0.10.26/node.exe](http://nodejs.org/dist/v0.10.26/node.exe)

64 位安装包下载地址 : [http://nodejs.org/dist/v0.10.26/x64/node.exe](http://nodejs.org/dist/v0.10.26/x64/node.exe)

安装步骤：

步骤 1 : 双击下载后的安装包Node.exe

步骤 2 : 点击Run(运行)

检查Node.js版本

```bash
C:\> cd download
C:\download> node --version
v14.16.0
$ npm -v
6.14.11


```
#### Linux环境:

#### 方法一：直接使用已编译好的包（.msi)** 

下载地址：[https://nodejs.org/en/download/](http://nodejs.org/en/download/)

```

$ wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz    // 下载
$ tar xf  node-v10.9.0-linux-x64.tar.xz       // 解压
$ cd node-v10.9.0-linux-x64/                  // 进入解压目录
$ ./bin/node -v                               // 执行node命令 查看版本
v14.16.0
$ npm -v
6.14.11
```


解压文件的 bin 目录下包含了 node、npm 等命令，可以使用 ln 命令来设置软连接：


```

$ ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/ 
$ ln -s /usr/software/nodejs/bin/node  /usr/local/bin/

```

#### 方法二： 源码安装 Node.js（以CentOS为例）**

下载地址：[https://nodejs.org/en/download/](http://nodejs.org/en/download/)

下载Binaries包（以x86为例）

安装步骤：

步骤 1 : 解压安装包


```
$ tar -xvf node-v10.16.0-linux-x64.tar.xz
$ cd /usr/local/
$ mv /var/ftp/pub/node-v10.16.0-linux-64 ./
$ mv node-v10.16.0.0-linux-64/ nodejs

```


步骤 2 : 添加node.js至全局命令

```
$ ln -s /usr/local/nodejs/bin/npm /usr/local/bin/
$ ln -s /usr/local/nodejs/bin/node /usr/local/bin/
```


查看nodejs是否安装成功

```
$ node -v
v14.16.0
$ npm -v
6.14.11
```


### 2、下载源码:


```bash

$ git clone https://gitee.com/openeuler/ha-web.git

```
### 3、安装node_modules依赖:


```bash
$ cd ha-web/
$ npm install
```
如果依赖下载安装缓慢可以尝试更换国内源：

```bash
$ npm install --registry https://registry.npm.taobao.org
```
## 二、部署HA-web开发环境

### 1.热更新方式在本地部署开发环境

```bash
$ npm run dev
```
### 2.打包依赖生成生产环境
```bash
$ npm run build
```


### 3.将打包后的资源放入ha-api的静态资源文件夹
```bash

$ cd ha-web
$ mv dist/index.html dist/static/
$ scp -r dist/* root@<target ha-api server>:/root/ha-api/views/static/
```

注：打包后的资源文件在dist目录下，请将index.html文件放入static文件夹并将资源复制到目标ha-api服务器的静态资源文件夹后重启ha-api服务
ha-api部署方法等详细信息请参考ha-api项目的[README](https://gitee.com/openeuler/ha-api/blob/master/README.md)文件


三、如何贡献
----------
如果您有意愿参与到项目开发贡献中，需要先签署[CLA](https://openeuler.org/en/cla.html)，我们期待着您的加入与贡献。

如果您有任何疑问、意见或建议，请通过[HA-web issues](https://gitee.com/openeuler/ha-web/issues) 提交issues,我们会尽快回复。