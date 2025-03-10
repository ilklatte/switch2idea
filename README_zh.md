# Switch2JetBrain

**基于 https://github.com/qczone/switch2idea项目**


> 增加了根据项目和文件类型自动区分Pycharm和Idea的逻辑

用于自己个人使用，所以代码修改主要考虑功能实现了就行



[English](README.md)

> 💡 推荐在 IDEA 中配合 [Switch2Cursor](https://github.com/qczone/switch2cursor) 使用

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/qczone.Switch2JetBrain?label=VS%20Marketplace&style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=qczone.Switch2JetBrain)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/qczone.Switch2JetBrain?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=qczone.Switch2JetBrain)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

## 🔍 项目简介

一个提升开发效率的 Cursor 扩展，让你在 Cursor 和 IDEA 之间实现丝滑切换

![Switch2JetBrain演示](images/switch-show.gif)

## 🌟 功能特性

- 🚀 无缝编辑器切换

  - 在 Cursor 和 IDEA 之间一键切换
  - 自动定位到相同的光标位置（行号和列号）
  - 完美保持编辑上下文，不中断思路
- ⌨️ 便捷的快捷键支持

  - macOS:
    - `Option+Shift+P` - 在 IDEA 中打开整个项目
    - `Option+Shift+O` - 在 IDEA 中打开当前文件
  - Windows:
    - `Alt+Shift+P` - 在 IDEA 中打开整个项目
    - `Alt+Shift+O` - 在 IDEA 中打开当前文件
- 🔧 多样化的访问方式

  - 快捷键操作
  - 编辑器右键菜单
  - 文件浏览器右键菜单

## 🛠️ 安装指南

### 方式一：通过扩展市场安装

1. 点击 [这里](https://marketplace.visualstudio.com/items?itemName=qczone.Switch2JetBrain) 安装
2. 在 Cursor 扩展市场中搜索 "Switch2JetBrain" 并安装

### 方式二：本地安装

1. 下载最新版扩展包
2. 在 Cursor 中，选择 `Extensions` → `...` → `Install from VSIX`
3. 选择下载的扩展包完成安装

## 🚀 使用说明

### 基础使用

#### 打开项目

- 快捷键：`Alt+Shift+P`
- 右键菜单：在文件浏览器中右键 → `Open Project in IDEA`

#### 打开当前文件

- 快捷键：`Alt+Shift+O`
- 右键菜单：
  - 在编辑器中右键 → `Open File in IDEA`
  - 在文件浏览器中右键 → `Open File in IDEA`

### 配置

打开 Cursor 设置，点击 `General` → `Editor` → `open editor settings` → `Extensions` → `Switch2JetBrain` → `Idea Path`

- macOS：自动遍历 IDEA 常用安装路径
- Windows：默认 `C:\Program Files\JetBrains\IntelliJ IDEA\bin\idea64.exe`
- Linux：默认 `idea`

### 环境要求

- Cursor 1.93.1+
- IntelliJ IDEA 或其他 JetBrains IDE

## 🧑‍💻 开发者指南

欢迎提交 Issue 和 Pull Request 来改进这个扩展。

## 🙋 常见问题

### 1. 快捷键/点击右键菜单后没有跳转到 IDEA?

请按以下步骤检查：

1. 打开 Cursor 设置，点击 `General` → `Editor` → `open editor settings` → `Extensions` → `Switch2JetBrain`
2. 确认 Idea Path 是否正确配置成 IDEA 的可执行文件路径

### 2. 是否支持跳转到其他 IDE？

支持，您可以配置 Idea Path 为其他 JetBrains IDE 的可执行文件路径

### 3. 如何定义不同项目跳转不同 IDE？

您可以为每个工作区（workspace）单独配置 IDE 路径：

1. 打开 Cursor 设置，点击 `General` → `Editor` → `open editor settings`
2. 选择 `Workspace` 标签页
3. 导航到 `Extensions` → `Switch2JetBrain` → `ideaPath`
4. 输入该项目需要使用的 IDE 路径

示例配置：

- 前端项目：配置 WebStorm 路径
- Spring Boot 项目：配置 IDEA 路径
- Python 项目：配置 PyCharm 路径

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议

## 📮 问题反馈

如果遇到问题或有建议，请通过以下方式反馈：

- [提交 GitHub Issue](https://github.com/qczone/Switch2JetBrain/issues)

## 🌟 Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=qczone/Switch2JetBrain&type=Date)](https://star-history.com/#qczone/Switch2JetBrain&Date)