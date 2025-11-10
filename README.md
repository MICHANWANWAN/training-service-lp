# 企業向け研修サービス ランディングページ

社員50〜100名の中小企業様向け 伴走型人材育成・研修サービスのランディングページです。

## 🌐 デモサイト

**本番環境**: https://training-service-lp.vercel.app/

**GitHubリポジトリ**: https://github.com/MICHANWANWAN/training-service-lp

> **注**: 現在Vercel無料プランでホスティング中（テスト環境）。商用利用する場合はRenderやRailwayへの移行を推奨します。

## 機能

- レスポンシブデザイン対応
- 問い合わせフォーム機能
  - 30分無料相談申し込み
  - サービス資料ダウンロード
  - お問い合わせ
- メール自動送信機能
- モーダルウィンドウUI

## 技術スタック

### フロントエンド
- HTML5
- CSS3
- JavaScript (Vanilla)

### バックエンド
- Node.js
- Express.js
- Nodemailer (メール送信)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env`にコピーして、環境変数を設定してください。

```bash
cp .env.example .env
```

`.env`ファイルを編集：

```env
PORT=3000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
```

### 3. サーバーの起動

#### 開発環境

```bash
npm run dev
```

#### 本番環境

```bash
npm start
```

サーバーは `http://localhost:3000` で起動します。

## プロジェクト構造

```
training-service-lp/
├── index.html              # メインHTMLファイル
├── server.js               # Expressサーバー
├── package.json            # Node.js設定
├── .env.example            # 環境変数サンプル
├── .env                    # 環境変数（gitignore対象）
├── .gitignore             # Git除外設定
├── Dockerfile             # Docker設定
├── docker-compose.yml     # Docker Compose設定
├── vercel.json            # Vercel設定
├── render.yaml            # Render設定
├── public/                 # 静的ファイル
│   ├── css/
│   │   └── modal.css      # モーダルスタイル
│   └── js/
│       └── contact.js     # フォーム処理
└── README.md              # このファイル
```

## デプロイ

### ✅ 現在のデプロイ状況

**Vercel**: https://training-service-lp.vercel.app/ （デプロイ済み）

GitHubリポジトリにプッシュすると、Vercelが自動的にデプロイします。

---

### Vercelへのデプロイ（推奨）

#### 方法1: Vercel Dashboard（最も簡単）

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでログイン
3. 「New Project」をクリック
4. GitHubリポジトリ `MICHANWANWAN/training-service-lp` を選択
5. 「Deploy」をクリック

**環境変数の設定**:
- Settings → Environment Variables で以下を追加
  - `EMAIL_USER`: your-email@gmail.com
  - `EMAIL_PASS`: Gmailアプリパスワード
  - `ADMIN_EMAIL`: admin@example.com

#### 方法2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

---

### Renderへのデプロイ（商用利用OK）

1. [Render](https://render.com)にアクセス
2. 「New Web Service」をクリック
3. GitHubリポジトリを接続
4. `render.yaml`を自動検出
5. 環境変数を設定して「Create Web Service」

**無料プラン**: 15分非アクティブでスリープ
**有料プラン**: $7/月でスリープなし

---

### Herokuへのデプロイ

1. Heroku CLIをインストール
2. Herokuアプリを作成

```bash
heroku create your-app-name
```

3. 環境変数を設定

```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set ADMIN_EMAIL=admin@example.com
```

4. デプロイ

```bash
git push heroku main
```

---

### Railwayへのデプロイ（商用利用OK）

1. [Railway](https://railway.app)にアクセス
2. 「New Project」→「Deploy from GitHub repo」
3. リポジトリを選択して環境変数を設定
4. 自動デプロイ開始

**無料枠**: $5/月のクレジット（スリープなし）

### VPSへのデプロイ

#### Dockerを使用する場合

1. Dockerfileを作成済み
2. イメージをビルド

```bash
docker build -t training-service-lp .
```

3. コンテナを起動

```bash
docker run -d -p 3000:3000 --env-file .env training-service-lp
```

#### PM2を使用する場合

1. PM2をインストール

```bash
npm install -g pm2
```

2. アプリケーションを起動

```bash
pm2 start server.js --name training-service-lp
```

3. 自動起動設定

```bash
pm2 startup
pm2 save
```

## メール設定

### Gmailを使用する場合

#### ステップ1: 2段階認証を有効化
1. [Googleアカウント セキュリティ](https://myaccount.google.com/security)にアクセス
2. 「2段階認証プロセス」を有効化

#### ステップ2: アプリパスワードを生成
1. [アプリパスワード](https://myaccount.google.com/apppasswords)にアクセス
2. 「アプリを選択」→「その他（カスタム名）」
3. 「training-service-lp」などの名前を入力
4. 「生成」をクリック
5. 16桁のパスワードをコピー

#### ステップ3: 環境変数に設定

**ローカル環境**（`.env`ファイル）:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # 16桁のアプリパスワード
ADMIN_EMAIL=admin@example.com
```

**Vercel**（Dashboard）:
- Settings → Environment Variables で上記を設定

**Render/Railway**（Dashboard）:
- Environment で上記を設定

### その他のメールサービス

Nodemailerは様々なメールサービスに対応しています：
- Outlook
- Yahoo
- SendGrid
- Mailgun
など

詳細は [Nodemailer公式ドキュメント](https://nodemailer.com/) を参照してください。

## カスタマイズ

### デザインの変更

- `index.html`の`<style>`タグ内でCSSを編集
- 色の変更：
  - ベースカラー: `#1e3c72`, `#2a5298`
  - アクセントカラー: `#ff6b35`

### フォームの項目追加

1. `index.html`のフォームHTMLを編集
2. `public/js/contact.js`のフォームデータ取得部分を編集
3. `server.js`のAPIエンドポイントを編集

## 📋 使用上の注意

### デプロイサービスの選択

| サービス | 無料プラン | 商用利用 | スリープ | おすすめ用途 |
|---------|-----------|---------|---------|------------|
| **Vercel** | ✅ | ❌ | なし | テスト・個人プロジェクト |
| **Render** | ✅ | ✅ | あり（15分） | 商用利用（低トラフィック） |
| **Railway** | $5/月クレジット | ✅ | なし | 商用利用（中トラフィック） |
| **Heroku** | ❌（廃止） | - | - | - |

### 推奨事項

- **テスト段階**: Vercel無料プラン（現在の状態）
- **商用利用**: RenderまたはRailwayに移行
- **本格運用**: Vercel Pro ($20/月) または Render Starter ($7/月)

## 📝 TODO

- [ ] メール送信機能のテスト
- [ ] Vercelの環境変数設定（メール機能有効化）
- [ ] カスタムドメインの設定（必要に応じて）
- [ ] Google Analyticsの追加（必要に応じて）
- [ ] SEO対策（meta tags追加）

## 🤝 貢献

プルリクエストは大歓迎です！大きな変更の場合は、まずIssueで議論してください。

## 📄 ライセンス

MIT License

## 💬 サポート

質問や問題がある場合は、[Issues](https://github.com/MICHANWANWAN/training-service-lp/issues)を作成してください。

## 🔗 リンク

- **デモサイト**: https://training-service-lp.vercel.app/
- **GitHubリポジトリ**: https://github.com/MICHANWANWAN/training-service-lp
- **Vercelダッシュボード**: https://vercel.com/dashboard

---

**Created with**: Claude Code 🤖
