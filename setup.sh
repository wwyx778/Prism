#!/bin/bash
# author:Jehu

echo "执行的文件名：$0";
if [ $1 ]
then
   echo "start"
else
   echo "请输入仓库地址！"
   echo "例子：sh setup.sh http://github.com/wwyx778/Prism"
fi