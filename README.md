# ![Open Sékigae ロゴ](/public/images/logo.svg)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

オープンソースの席替えアプリケーション。
シンプルでカスタマイズ可能な席替えツールです。

## 特徴

- 直感的なインターフェースで簡単に席替えが可能
- カスタマイズ可能な座席レイアウト
- 座席の無効化機能
- 保存と読み込み機能
- PDF/CSV エクスポート機能

## デモ

<!-- オンラインデモは[こちら](https://sekigae.renorari.net)でご利用いただけます。 -->
(オンラインデモは準備中です。)

## 使い方

1. メンバーリストを編集する（名前とフリガナを入力）
2. 座席のレイアウトを設定する（行数、列数、スペースなど）
3. 「席替え」ボタンをクリックして自動的に席を割り当てる
4. 必要に応じて手動で調整する
5. 結果を保存またはエクスポートする

## 開発環境のセットアップ

### 必要条件

- Node.js 22以上
- npm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/renorari/open-sekigae.git
cd open-sekigae

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### ビルドとデプロイ

```bash
# ビルド作成
npm run build

# プロダクションサーバーの起動
npm run start
```

## 貢献

貢献を歓迎します！
バグ報告、機能リクエスト、プルリクエストなど、どんな形でも構いません。

1. このリポジトリをフォークする
2. 機能ブランチを作成する (`git checkout -b jane/amazing-feature`)
3. 変更をコミットする (`git commit -m '✨ add: add some amazing feature'`)
4. ブランチにプッシュする (`git push origin jane/amazing-feature`)
5. プルリクエストを開く

### コミット・プルリクエストのガイドライン

- コードは ESLint のルールに従ってください。
- コミットメッセージは簡潔に、何を変更したかを明確に記述してください。また、以下の例に従ってください。
  - `✨ add: (説明を簡単な英語で)`
  - `🐛 fix: (説明を簡単な英語で)`
  - `📝 docs: (説明を簡単な英語で)`
  - `♻️ refactor: (説明を簡単な英語で)`
- ブランチ名は、変更内容を簡潔に表現し、以下のような形式にしてください。
  - `(ユーザー名)/(機能名)`
- プルリクエストのタイトルは、変更内容を簡潔に表現してください。
- プルリクエストの説明には、変更の目的や背景、関連する課題番号などを記載してください。

## ライセンス

このプロジェクトは GNU General Public License v3.0 の下でライセンスされています。
詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 連絡先

- 開発者ホームページ: [renorari](https://renorari.net)
- プロジェクトリンク: [https://github.com/renorari/open-sekigae](https://github.com/renorari/open-sekigae)
