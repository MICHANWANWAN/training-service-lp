# 企業向け研修サービス ランディングページ

社員50〜100名の中小企業様向け 伴走型人材育成・研修サービスのランディングページです。

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
├── public/                 # 静的ファイル
│   ├── css/
│   │   └── modal.css      # モーダルスタイル
│   └── js/
│       └── contact.js     # フォーム処理
└── README.md              # このファイル
```

## デプロイ

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

### Vercelへのデプロイ

1. Vercel CLIをインストール

```bash
npm i -g vercel
```

2. デプロイ

```bash
vercel
```

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

1. Googleアカウントで2段階認証を有効化
2. アプリパスワードを生成
3. `.env`ファイルに設定

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

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

## ライセンス

MIT License

## サポート

質問や問題がある場合は、Issuesを作成してください。
