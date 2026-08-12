---
title: "llama.cpp纯CPU部署指南"
author: "木子欢儿"
pubDate: 2026-08-08T18:45:22+08:00
draft: false
categories:
  - "AI"
  - "llama.cpp"
  - "本地部署"
description: "一份面向国内与通用环境的 llama.cpp 纯 CPU 部署指南，涵盖源码编译、模型下载、Docker、服务模式、量化与常见问题。"
---

> 转载自 [点滴记忆](https://blog.quickso.cn/2026/08/07/llama-cpp%E7%BA%AFCPU%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97/)，原作者为 [木子欢儿](https://blog.quickso.cn/about/)，原文发布于 2026 年 8 月 7 日，采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可。

> llama.cpp 是一个高性能的 C/C++ 本地推理引擎，支持在各种硬件上高效运行 LLM 模型。本文将详细介绍如何在国内和通用环境下正确部署 llama.cpp。

## 为什么选择 llama.cpp

- ⚡ **高性能**：极致优化的推理引擎，支持多种硬件加速
- 🔧 **纯 C/C++ 实现**：无 Python 依赖，编译后即可运行
- 📱 **多平台支持**：支持 x86、ARM、Apple Silicon 等
- 🧠 **量化支持**：支持 4-bit、5-bit、8-bit 等量化格式
- 🔌 **多种前端**：支持命令行、服务器模式、嵌入式设备

## 官方链接

| 平台        | 链接                                                                                                               | 说明          |
| :---------- | :----------------------------------------------------------------------------------------------------------------- | :------------ |
| GitHub 仓库 | [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)                                             | 源代码        |
| 官方文档    | [github.com/ggml-org/llama.cpp/blob/master/README.md](https://github.com/ggml-org/llama.cpp/blob/master/README.md) | 使用文档      |
| 模型下载    | [huggingface.co](https://huggingface.co/ggml-org)                                                                  | GGUF 格式模型 |
| 量化工具    | [github.com/ggml-org/llama.cpp/tree/master/convert](https://github.com/ggml-org/llama.cpp/tree/master/convert)     | 模型转换脚本  |

---

## 一、国内部署方式

### 前置条件

在开始之前，需要安装编译环境：

```bash
# Windows 用户推荐使用 MSYS2 或 WSL2
# 安装 MSYS2 后执行：
pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-make cmake

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install build-essential cmake git

# Linux (CentOS/RHEL)
sudo yum groupinstall "Development Tools"
sudo yum install cmake git

# macOS
# 只需安装 Xcode Command Line Tools
xcode-select --install
```

### 方式一：获取源码

**方法 1：使用 Gitee 镜像克隆（推荐）**

```bash
# 使用 Gitee 国内镜像克隆
git clone https://gitee.com/mirrors/llama-cpp.git
cd llama-cpp
```

**方法 2：GitHub 加速访问**

```bash
# 使用 GitHub 代理加速克隆
git clone https://gh-proxy.com/https://github.com/ggml-org/llama.cpp.git
cd llama.cpp

# 或者直接下载 ZIP 压缩包
# https://gh-proxy.com/https://github.com/ggml-org/llama.cpp/archive/master.zip
```

**方法 3：从国内平台下载**

```bash
# Gitee 镜像下载
# https://gitee.com/mirrors/llama-cpp

# 华为云代码托管
# https://repo.huaweicloud.com/
```

### 方式二：国内编译方法

#### 1. 编译 llama.cpp

**使用 CMake 编译（推荐）：**

```bash
# 创建构建目录
mkdir build && cd build

# 配置编译选项
cmake .. -DCMAKE_BUILD_TYPE=Release

# 编译（-j 后面跟 CPU 核心数）
make -j$(nproc)

# 可执行文件在 build/bin/ 目录下
```

**Makefile 方式：**

```bash
# 简单编译
make

# 指定优化级别编译
make LLAMA_NATIVE=1
```

#### 2. 国内下载模型

由于 HuggingFace 在国内访问较慢，可以使用以下方式下载模型：

**方法一：使用 ModelScope（魔搭社区）**

```bash
# 访问 ModelScope
# https://www.modelscope.cn/

# 搜索 GGUF 格式模型下载
```

**方法二：使用国内 HuggingFace 镜像**

```bash
# 设置 HuggingFace 镜像源
export HF_ENDPOINT=https://hf-mirror.com

# 使用 huggingface-cli 下载
hf download ggml-org/models llama2-7b.Q4_0.gguf
```

**方法三：手动下载**

1.  访问 ModelScope 或其他国内模型站点
2.  搜索 llama.cpp 支持的 GGUF 格式模型
3.  下载后放入指定目录

### 方式三：Docker 部署（国内镜像）

```bash
# 使用国内 Docker 镜像源
# 修改 /etc/docker/daemon.json，添加：
{
  "registry-mirrors": [
    "https://docker.1ms.run",
  ]
}

# 拉取 llama.cpp Docker 镜像
docker pull registry.cn-hangzhou.aliyuncs.com/library/llama-cpp:latest

# 或者使用 NVIDIA 官方镜像（如有 GPU）
docker pull registry.cn-hangzhou.aliyuncs.com/nvidia/llama-cpp:latest
```

### 国内常见问题

#### 下载源码慢怎么办？

使用国内 Gitee 镜像或 GitHub 加速代理：

- Gitee 镜像: [https://gitee.com/mirrors/llama-cpp](https://gitee.com/mirrors/llama-cpp)
- GitHub 加速: [https://gh-proxy.com/](https://gh-proxy.com/)

#### 模型下载慢怎么办？

使用 ModelScope 国内平台：

- [https://www.modelscope.cn/](https://www.modelscope.cn/)

#### 编译依赖下载失败？

可以提前下载依赖源码，或使用国内 npm/maven 镜像源。

---

## 二、通用部署方式

### 前置条件

```bash
# Windows
# 安装 Visual Studio Build Tools 或 MSYS2
# 下载地址：https://visualstudio.microsoft.com/downloads/

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install build-essential cmake git

# Linux (Fedora)
sudo dnf groupinstall "Development Tools"
sudo dnf install cmake git

# macOS
xcode-select --install
```

### 方式一：从源码编译（推荐）

#### 1. 克隆仓库

```bash
# 克隆 llama.cpp 仓库
git clone https://github.com/ggml-org/llama.cpp.git
cd llama.cpp
```

#### 2. 编译

**基础编译：**

```bash
# 使用 CMake（推荐）
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)
```

**带 GPU 加速编译（NVIDIA CUDA）：**

```bash
mkdir build && cd build
cmake .. \
  -DCMAKE_BUILD_TYPE=Release \
  -DGGML_CUDA=ON
make -j$(nproc)
```

**带 Metal 加速编译（Apple Silicon）：**

```bash
# macOS 默认支持 Metal，直接编译即可
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(sysctl -n hw.ncpu)
```

**带 OpenCL 加速编译：**

```bash
mkdir build && cd build
cmake .. \
  -DCMAKE_BUILD_TYPE=Release \
  -DGGML_OPENCL=ON
make -j$(nproc)
```

**编译选项说明：**

| 选项                         | 说明                              |
| :--------------------------- | :-------------------------------- |
| `-DGGML_CUDA=ON`             | 启用 NVIDIA GPU 加速              |
| `-DGGML_OPENCL=ON`           | 启用 OpenCL 加速                  |
| `-DGGML_METAL=ON`            | 启用 Apple Metal 加速（默认开启） |
| `-DGGML_VULKAN=ON`           | 启用 Vulkan 加速                  |
| `-DCMAKE_BUILD_TYPE=Release` | Release 优化模式                  |

#### 3. 下载模型

#### 从 HuggingFace 下载：

```bash
# 安装 huggingface-hub
pip install huggingface-hub

# 下载 GGUF 格式模型
hf download ggml-org/models llama2-7b.Q4_0.gguf

# 或者指定下载目录
hf download ggml-org/models llama2-7b.Q4_0.gguf \
  --local-dir ./models
```

#### 从modelscope下载：

```apache
pip install modelscope
modelscope download --model unsloth/Qwen3.5-4B-GGUF Qwen3.5-4B-Q4_K_M.gguf --local_dir ./models
```

**常用 GGUF 模型地址：**

- [https://huggingface.co/ggml-org/models](https://huggingface.co/ggml-org/models)
- [https://huggingface.co/TheBloke（量化模型集合）](https://huggingface.co/TheBloke%EF%BC%88%E9%87%8F%E5%8C%96%E6%A8%A1%E5%9E%8B%E9%9B%86%E5%90%88%EF%BC%89)

### 方式二：Docker 部署

#### 使用官方 Docker 镜像

```bash
# 拉取官方镜像
docker pull ghcr.io/ggml-org/llama.cpp:latest

# 运行容器
docker run -d \
  --name llama-cpp \
  -v $(pwd)/models:/models \
  -p 8080:8080 \
  ghcr.io/ggml-org/llama.cpp:latest \
  --model /models/llama2-7b.Q4_0.gguf \
  --host 0.0.0.0 \
  --port 8080

# 查看日志
docker logs -f llama-cpp
```

#### 使用 NVIDIA GPU 加速

```bash
# 确保已安装 NVIDIA Container Toolkit
# https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html

# 运行带 GPU 的容器
docker run -d \
  --name llama-cpp-gpu \
  --gpus all \
  -v $(pwd)/models:/models \
  -p 8080:8080 \
  ghcr.io/ggml-org/llama.cpp:latest \
  --model /models/llama2-7b.Q4_0.gguf \
  --host 0.0.0.0 \
  --port 8080 \
  --cuda
```

---

## 三、使用方法

### 命令行运行

```bash
# 运行模型（交互式）
./build/bin/llama-cli -m ./models/llama2-7b.Q4_0.gguf

# 指定参数运行
./build/bin/llama-cli \
  -m ./models/llama2-7b.Q4_0.gguf \
  -t 8 \                    # 使用 8 个线程
  -n 256 \                  # 最大生成 token 数
  -c 4096 \                 # 上下文窗口大小
  -p "你好，请介绍一下自己"  # 提示词

# 批量处理
echo "你好" | ./build/bin/llama-cli -m ./models/llama2-7b.Q4_0.gguf
```

### 服务器模式

```bash
# 启动 HTTP 服务器
./build/bin/llama-server \
  -m ./models/llama2-7b.Q4_0.gguf \
  --host 0.0.0.0 \
  --port 8080

# 使用 API 调用
curl http://localhost:8080/completion -d '{
  "prompt": "你好",
  "n_predict": 128,
  "temperature": 0.7
}'
```

### 模型量化

```bash
# 安装量化工具依赖
pip install -r requirements.txt

# 下载原始模型（HuggingFace 格式）
# 从 huggingface.co 下载原始 HuggingFace 模型

# 转换为 F16 格式
python convert-hf-to-gguf.py /path/to/model \
  --output-dir ./models \
  --outtype f16

# 量化为 Q4_K_M 格式（推荐）
./build/bin/llama-quantize \
  ./models/model-f16.gguf \
  ./models/model-q4_k_m.gguf \
  Q4_K_M

# 量化格式说明：
# Q2_K, Q3_K_S, Q3_K_M, Q3_K_L, Q4_0, Q4_K_S, Q4_K_M, Q5_0, Q5_K_S, Q5_K_M, Q8_0
```

### Python API 调用

```python
import requests

# llama.cpp 服务器 API
BASE_URL = "http://localhost:8080"

# 发送请求
response = requests.post(f"{BASE_URL}/completion", json={
    "prompt": "Hello, introduce yourself",
    "n_predict": 128,
    "temperature": 0.7,
    "top_p": 0.9,
    "stop": ["\n"]
})

# 处理响应
result = response.json()
print(result["content"])
```

### 使用 llama-cpp-python

```bash
# 安装 Python 绑定
pip install llama-cpp-python

# 如果需要从源码编译
CMAKE_ARGS="-DGGML_CUDA=ON" pip install llama-cpp-python
```

```python
from llama_cpp import Llama

# 加载模型
llm = Llama(
    model_path="./models/llama2-7b.Q4_0.gguf",
    n_ctx=4096,
    n_gpu_layers=-1  # -1 表示使用所有 GPU 层
)

# 生成文本
output = llm(
    "Q: 你好，请介绍一下自己\nA: ",
    max_tokens=128,
    stop=["\n"]
)

print(output["choices"][0]["text"])

# 聊天模式
output = llm.create_chat_completion(
    messages=[
        {"role": "user", "content": "你好"}
    ],
    max_tokens=128
)

print(output["choices"][0]["message"]["content"])
```

---

## 四、常见问题

### 编译错误怎么办？

```bash
# 确保编译环境完整
# Ubuntu/Debian
sudo apt install build-essential cmake git python3

# 清理后重新编译
rm -rf build
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)
```

### 显存/内存不足？

```bash
# 使用更小的模型
# Q2_K < Q3_K < Q4_K < Q5_K < Q8_0 < F16

# 减小上下文窗口
./build/bin/llama-cli -m model.gguf -c 2048

# 使用更少的线程
./build/bin/llama-cli -m model.gguf -t 4
```

### 如何选择量化级别？

| 量化类型 | 大小   | 质量 | 推荐场景         |
| :------- | :----- | :--- | :--------------- |
| Q2_K     | ~1.5GB | 较低 | 测试、极小设备   |
| Q3_K_M   | ~2GB   | 一般 | 嵌入式使用       |
| Q4_K_M   | ~2.5GB | 良好 | 日常使用（推荐） |
| Q5_K_M   | ~3GB   | 很好 | 质量优先         |
| Q8_0     | ~5GB   | 优秀 | 高质量需求       |
| F16      | ~7GB   | 原始 | 研究、精度要求高 |

### 模型不支持怎么办？

1.  检查模型格式是否为 GGUF
2.  参考 llama.cpp 的 README.md 查看支持的模型列表
3.  某些新模型可能需要最新版本的 llama.cpp

### 性能优化建议

```bash
# 使用 GPU 加速（如有）
# NVIDIA CUDA: 编译时加 -DGGML_CUDA=ON
# Apple Silicon: 默认启用 Metal
# AMD: 编译时加 -DGGML_VULKAN=ON

# 使用适当的线程数
./build/bin/llama-cli -m model.gguf -t $(nproc)

# 启用 KV Cache（默认开启）
# 可以提升长文本处理速度
```

---

## 五、进阶配置

### 环境变量

| 变量名                    | 说明           | 默认值     |
| :------------------------ | :------------- | :--------- |
| `GGML_THREADS`            | 线程数         | CPU 核心数 |
| `LLAMA_MAX_LOADED_MODELS` | 最大加载模型数 | 1          |

### 配置开机自启（Linux 服务器）

```bash
# 创建 systemd 服务
sudo nano /etc/systemd/system/llama-cpp.service

# 添加以下内容
[Unit]
Description=llama.cpp Server
After=network.target

[Service]
ExecStart=/path/to/llama-server \
  -m /path/to/model.gguf \
  --host 0.0.0.0 \
  --port 8080
User=your_username
Restart=always
RestartSec=5

[Install]
WantedBy=default.target

# 启用服务
sudo systemctl daemon-reload
sudo systemctl enable llama-cpp
sudo systemctl start llama-cpp
```

### 多模型服务

```bash
# 创建 systemd 服务
sudo nano /etc/systemd/system/llama-cpp.service

# 添加以下内容
[Unit]
Description=llama.cpp Server
After=network.target

[Service]
ExecStart=/root/llama.cpp/build/bin/llama-server \
  --models-dir /root/llama.cpp/models \
  --host 0.0.0.0 \
  --port 8080
User=root
Restart=always
RestartSec=5

[Install]
WantedBy=default.target

# 启用服务
sudo systemctl daemon-reload
sudo systemctl enable llama-cpp
sudo systemctl start llama-cpp
```

---

适用场景

- 💻 高性能本地推理
- 📱 嵌入式设备 AI
- 🔧 模型转换与量化
- 🏢 私有化部署
- 🎓 AI 研究与教学
- ⚙️ 定制化 AI 应用
