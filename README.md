# Switch2JetBrain


**基于 https://github.com/qczone/switch2idea项目**


> 增加了根据项目和文件类型自动区分Pycharm和Idea的逻辑

用于自己个人使用，所以代码修改主要考虑功能实现了就行




[中文](README_zh.md)

> 💡 Recommended to use with [Switch2Cursor](https://github.com/qczone/switch2cursor) in IDEA

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/qczone.Switch2JetBrain?label=VS%20Marketplace&style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=qczone.Switch2JetBrain)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/qczone.Switch2JetBrain?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=qczone.Switch2JetBrain)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

## 🔍 Project Overview

A Cursor extension that enhances development efficiency by enabling smooth switching between Cursor and IDEA

![Switch2JetBrain Demo](images/switch-show.gif)

## 🌟 Features

- 🚀 Seamless Editor Switching
  - One-click switching between Cursor and IDEA
  - Automatically positions to the same cursor location (line and column)
  - Perfectly maintains editing context without interrupting workflow
- ⌨️ Convenient Shortcut Support
  - macOS:
    - `Option+Shift+P` - Open project in IDEA
    - `Option+Shift+O` - Open current file in IDEA
  - Windows:
    - `Alt+Shift+P` - Open project in IDEA
    - `Alt+Shift+O` - Open current file in IDEA
- 🔧 Multiple Access Methods
  - Keyboard shortcuts
  - Editor context menu
  - File explorer context menu

## 🛠️ Installation Guide

### Method 1: Install from Extension Marketplace

1. Click [here](https://marketplace.visualstudio.com/items?itemName=qczone.Switch2JetBrain) to install
2. Search for "Switch2JetBrain" in the Cursor extension marketplace and install

### Method 2: Local Installation

1. Download the latest extension package
2. In Cursor, select `Extensions` → `...` → `Install from VSIX`
3. Select the downloaded extension package to complete installation

## 🚀 Usage Instructions

### Basic Usage

#### Open Project

- Shortcut: `Alt+Shift+P`
- Context Menu: Right-click in file explorer → `Open Project in IDEA`

#### Open Current File

- Shortcut: `Alt+Shift+O`
- Context Menu:
  - Right-click in editor → `Open File in IDEA`
  - Right-click in file explorer → `Open File in IDEA`

### Configuration

Open Cursor settings, click `General` → `Editor` → `open editor settings` → `Extensions` → `Switch2JetBrain` → `Idea Path`

- macOS: Automatically traverses common IDEA installation paths
- Windows: Default `C:\Program Files\JetBrains\IntelliJ IDEA\bin\idea64.exe`
- Linux: Default `idea`

### Requirements

- Cursor 1.93.1+
- IntelliJ IDEA or other JetBrains IDEs

## 🧑‍💻 Developer Guide

Issues and Pull Requests are welcome to improve this extension.

## 🙋 FAQ

### 1. No jump to IDEA after using shortcut/right-click menu?

Please check the following steps:

1. Open Cursor settings, click `General` → `Editor` → `open editor settings` → `Extensions` → `Switch2JetBrain`
2. Verify that Idea Path is correctly configured to IDEA's executable path

### 2. Does it support jumping to other IDEs?

Yes, you can configure Idea Path to the executable path of other JetBrains IDEs

### 3. How to define different IDEs for different projects?

You can configure IDE paths separately for each workspace:

1. Open Cursor settings, click `General` → `Editor` → `open editor settings`
2. Select the `Workspace` tab
3. Navigate to `Extensions` → `Switch2JetBrain` → `ideaPath`
4. Enter the IDE path needed for that project

Configuration examples:

- Frontend project: Configure WebStorm path
- Spring Boot project: Configure IDEA path
- Python project: Configure PyCharm path

## 📄 License

This project is licensed under the [MIT License](LICENSE)

## 📮 Feedback

If you encounter issues or have suggestions, please provide feedback through:

- [Submit GitHub Issue](https://github.com/qczone/Switch2JetBrain/issues) 

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=qczone/Switch2JetBrain&type=Date)](https://star-history.com/#qczone/Switch2JetBrain&Date)