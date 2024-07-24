<h1 align="center">Timer Chrome Extension ⏰</h1>

<div align="center">
  <img width="280" src="https://github.com/user-attachments/assets/11f6da4d-e2ff-4a73-be29-d575fc6f7bad" />
</div>
<br>
<p align="center">ブラウザ上で動くシンプルなタイマーの Google Chrome 拡張機能</p>

## Features

- Timer
- Stopwatch

## How to Use

前提条件: 任意のバージョンの Node.js がインストールされている

1. このリポジトリを clone する
2. pnpm をインストール `corepack enabled`
3. node_modules をインストール `pnpm i`
4. アプリをビルド `pnpm build`
5. Google Chrome の[拡張機能画面](chrome://extensions/)でデベロッパーモードを ON にする
6. 「パッケージ化されていない拡張機能を読み込む」を押下して`/dist`配下をアップロードすると拡張機能が利用できるようになる

## Developers Guide

ローカルでの開発時は下記コマンドで動作確認可能

```bash
pnpm dev
```
