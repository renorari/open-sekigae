# ![Open Sékigae ロゴ](/public/images/logo.svg)

![Open SékigaeのOGP](/public/images/ogp.png)

Open Sékigaeは、教室やイベント会場での座席配置を簡単に決めることができるオープンソースの席替えツールです。

## 特徴

- 🎲 **自動抽選機能**: ワンクリックで公平な座席抽選
- 🎯 **前寄り指定**: 前方の席を優先的に割り当て
- ⚙️ **柔軟な座席設定**: 行数・列数・座席間隔を自由に設定
- 🎨 **直感的なUI**: 分かりやすいインターフェースで簡単操作
- 💾 **データの永続化**: ブラウザのローカルストレージに自動保存
- 📊 **エクスポート機能**: CSV形式での出力と印刷対応
- 🔊 **音声フィードバック**: 抽選時の効果音（ON/OFF可能）

## 使い方

1. **メンバー登録**: 参加者の名前と読み方を入力
2. **座席設定**: 教室に合わせて座席の配置を調整
3. **抽選実行**: 自動または手動で座席を決定
4. **結果確認**: 座席表を確認・調整
5. **結果保存**: CSV出力または印刷で結果を保存

## 開発環境のセットアップ

### 必要条件

- Node.js 22以上
- npm
- モダンブラウザ（Chrome、Firefox、Safari、Edge）

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

開発サーバーが起動したら、ブラウザで `http://localhost:3000` にアクセスしてください。

### ビルドとデプロイ

```bash
# プロダクション用ビルド
npm run build

# プロダクションサーバーの起動
npm run start
```

## 技術スタック

- **フロントエンド**: React 19
- **UIライブラリ**: MUI Joy
- **フレームワーク**: Waku
- **スタイリング**: CSS-in-JS (Emotion), Vanilla CSS
- **コード品質**: ESLint, TypeScript
- **ビルドツール**: Waku(Vite)

## 貢献

貢献を歓迎します！
バグ報告、機能リクエスト、プルリクエストなど、どんな形でも構いません。

### 開発の流れ

1. このリポジトリをフォークする
2. 機能ブランチを作成する (`git checkout -b jane/amazing-feature`)
3. 変更をコミットする (`git commit -m '✨ add: add some amazing feature'`)
4. ブランチにプッシュする (`git push origin jane/amazing-feature`)
5. プルリクエストを開く

### コミット・プルリクエストのガイドライン

#### コミットメッセージ

コミットメッセージは以下の形式に従ってください：

```text
<絵文字> <type>: <説明>
```

**Type一覧:**

- `✨ add`: 新機能の追加
- `🐛 fix`: バグ修正
- `📝 docs`: ドキュメントの更新
- `♻️ refactor`: リファクタリング
- `💄 style`: コードの見た目の変更（スペース、フォーマット等）
- `⚡ perf`: パフォーマンスの改善
- `✅ test`: テストの追加・修正
- `🔧 chore`: ビルドプロセスやツールの変更

**例:**

```text
✨ add: implement automatic seat lottery animation
🐛 fix: resolve seat assignment conflict in manual mode
📝 docs: update installation instructions
```

#### ブランチ命名規則

ブランチ名は以下の形式にしてください：

```text
<ユーザー名>/<機能名>
```

**例:**

- `jane/lottery-animation`
- `john/responsive-design`
- `alex/export-feature`

#### プルリクエスト

```text
<ユーザー名>/<機能名>
```

- **タイトル**: 変更内容を簡潔に表現
- **説明**: 以下の項目を含める
  - 変更の目的・背景
  - 実装した機能の詳細
  - テスト方法
  - 関連するIssue番号（あれば）
  - スクリーンショット（UI変更の場合）

#### コード品質

- ESLintのルールに従ってください
- TypeScriptの型チェックを通してください
- 可読性の高いコードを心がけてください
- 適切なコメントを記述してください

### カスタムESLintルール

このプロジェクトでは、以下のカスタムESLintルールを使用しています：

- `@renorari/no-unquoted-keys`: オブジェクトのキーに引用符の使用を強制

## ライセンス

このプロジェクトは [GNU General Public License v3.0](LICENSE) の下で公開されています。

## 連絡先

- 開発者ホームページ: [renorari](https://renorari.net)
- プロジェクトリンク: [https://github.com/renorari/open-sekigae](https://github.com/renorari/open-sekigae)
