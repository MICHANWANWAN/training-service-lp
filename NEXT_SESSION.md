# 📋 Next Session Plan

次回のセッションで実施する内容をまとめています。

---

## ✅ 前回（今回）完了した内容

### 1. プロジェクト作成
- ✅ 企業向け研修サービスのランディングページ作成
- ✅ レスポンシブデザイン対応
- ✅ 3種類の問い合わせフォーム実装
  - 30分無料相談申し込み
  - サービス資料ダウンロード
  - お問い合わせ

### 2. バックエンド実装
- ✅ Node.js + Express
- ✅ メール自動送信機能（Nodemailer）
- ✅ モーダルウィンドウUI
- ✅ API実装（/api/consultation, /api/download, /api/contact）

### 3. デプロイ
- ✅ GitHubリポジトリ作成・プッシュ
  - リポジトリ: https://github.com/MICHANWANWAN/training-service-lp
- ✅ Vercelに自動デプロイ
  - URL: https://training-service-lp.vercel.app/
- ✅ ローカルサーバー起動中（http://localhost:3000）

### 4. ドキュメント整備
- ✅ README.md更新
- ✅ デプロイ手順書作成
- ✅ メール設定手順書作成

---

## 🎯 次回のセッションでやること

### **オプション1: GCP VMへのデプロイ（推奨）**

#### 現在のGCP環境
- **プロジェクト**: twitter-automation-475909
- **アカウント**: aiyashafukuro@gmail.com
- **VMインスタンス**: ai-creator-automation-v2
  - ゾーン: us-central1-c
  - タイプ: e2-micro（GCP無料枠対象）
  - 外部IP: 34.173.39.69
  - 状態: RUNNING ✅

#### メリット
- ✅ **追加コストなし** - 既存のVMを活用
- ✅ **完全な制御** - root権限あり
- ✅ **商用利用OK** - 制限なし
- ✅ **カスタムドメイン設定可能**

---

### 🚀 デプロイ方法（3つから選択）

#### **方法A: Docker Compose（最も簡単）**

```bash
# 1. VMに接続
gcloud compute ssh ai-creator-automation-v2 --zone=us-central1-c

# 2. リポジトリをクローン
git clone https://github.com/MICHANWANWAN/training-service-lp.git
cd training-service-lp

# 3. 環境変数を設定
cp .env.example .env
nano .env  # メール設定を編集

# 4. Dockerで起動
docker-compose up -d

# 5. 確認
docker-compose ps
docker-compose logs
```

**アクセスURL**: http://34.173.39.69:3000

---

#### **方法B: PM2で直接起動（軽量）**

```bash
# 1. VMに接続
gcloud compute ssh ai-creator-automation-v2 --zone=us-central1-c

# 2. リポジトリをクローン
git clone https://github.com/MICHANWANWAN/training-service-lp.git
cd training-service-lp

# 3. Node.jsとnpmをインストール（未インストールの場合）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. 依存関係をインストール
npm install

# 5. 環境変数を設定
cp .env.example .env
nano .env

# 6. PM2をインストール
sudo npm install -g pm2

# 7. PM2で起動
pm2 start server.js --name training-service-lp

# 8. 自動起動設定
pm2 startup
pm2 save

# 9. 確認
pm2 status
pm2 logs training-service-lp
```

**アクセスURL**: http://34.173.39.69:3000

---

#### **方法C: Nginx + PM2（本格運用・ポート80/443）**

```bash
# 1. VMに接続してPM2で起動（方法Bと同じ）
# 2. Nginxをインストール
sudo apt-get update
sudo apt-get install -y nginx

# 3. Nginx設定ファイルを作成
sudo nano /etc/nginx/sites-available/training-service-lp

# 以下の内容を貼り付け：
server {
    listen 80;
    server_name 34.173.39.69;  # または独自ドメイン

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 4. 設定を有効化
sudo ln -s /etc/nginx/sites-available/training-service-lp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 5. HTTPSを設定（Let's Encrypt）
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

**アクセスURL**:
- HTTP: http://34.173.39.69
- HTTPS: https://your-domain.com（ドメイン設定後）

---

### 🔥 ファイアウォール設定（必須）

VMのポートを開放する必要があります：

```bash
# ポート3000を開放（方法AまたはB）
gcloud compute firewall-rules create allow-training-service-3000 \
  --allow tcp:3000 \
  --source-ranges 0.0.0.0/0 \
  --description "Allow access to training service LP on port 3000"

# ポート80/443を開放（方法C）
gcloud compute firewall-rules create allow-http-https \
  --allow tcp:80,tcp:443 \
  --source-ranges 0.0.0.0/0 \
  --description "Allow HTTP and HTTPS traffic"

# 確認
gcloud compute firewall-rules list
```

---

### 📧 メール機能の設定（重要）

#### Gmailアプリパスワード取得

1. **2段階認証を有効化**
   - https://myaccount.google.com/security
   - 「2段階認証プロセス」をオン

2. **アプリパスワードを生成**
   - https://myaccount.google.com/apppasswords
   - 「アプリを選択」→「その他（カスタム名）」
   - 「training-service-lp」と入力
   - 「生成」をクリック
   - 16桁のパスワードをコピー

3. **.envファイルに設定**

```env
EMAIL_SERVICE=gmail
EMAIL_USER=aiyashafukuro@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # 16桁のアプリパスワード
ADMIN_EMAIL=aiyashafukuro@gmail.com
```

4. **Vercelの環境変数にも設定**（Vercelを使い続ける場合）
   - https://vercel.com/dashboard
   - プロジェクト `training-service-lp` → Settings → Environment Variables
   - 上記3つを追加して再デプロイ

---

### 🔍 動作確認手順

1. **ページアクセス**
   - ブラウザで該当URLを開く
   - デザインが正しく表示されるか確認

2. **フォームテスト**
   - 「30分無料相談に申し込む」ボタンをクリック
   - フォームに入力して送信
   - 管理者メールと自動返信メールが届くか確認

3. **ログ確認**
   ```bash
   # Docker Composeの場合
   docker-compose logs -f

   # PM2の場合
   pm2 logs training-service-lp

   # Nginxの場合
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

---

### 🌐 カスタムドメイン設定（オプション）

独自ドメインを使用する場合：

1. **DNSレコードを設定**
   - Aレコード: `@` → `34.173.39.69`
   - Aレコード: `www` → `34.173.39.69`

2. **Nginx設定を更新**
   ```bash
   sudo nano /etc/nginx/sites-available/training-service-lp
   # server_name を独自ドメインに変更
   ```

3. **SSL証明書を取得**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

---

## 📊 デプロイ方法の比較

| 方法 | 簡単さ | 起動速度 | ポート | SSL | おすすめ用途 |
|------|--------|---------|--------|-----|------------|
| **Docker Compose** | ⭐⭐⭐ | 普通 | 3000 | ❌ | テスト・開発 |
| **PM2** | ⭐⭐ | 速い | 3000 | ❌ | 軽量運用 |
| **Nginx + PM2** | ⭐ | 速い | 80/443 | ✅ | 本番運用 |

---

## 💡 推奨フロー

### Step 1: まずは簡単にテスト（Docker Compose）
```bash
gcloud compute ssh ai-creator-automation-v2 --zone=us-central1-c
git clone https://github.com/MICHANWANWAN/training-service-lp.git
cd training-service-lp
cp .env.example .env
nano .env  # メール設定
docker-compose up -d
```

### Step 2: 動作確認
- http://34.173.39.69:3000 にアクセス
- フォーム送信テスト

### Step 3: 本番運用ならNginx追加
- ポート80/443で公開
- Let's EncryptでSSL証明書取得

---

## 🔗 便利なコマンド集

```bash
# VMに接続
gcloud compute ssh ai-creator-automation-v2 --zone=us-central1-c

# Dockerの状態確認
docker-compose ps
docker-compose logs -f

# PM2の状態確認
pm2 status
pm2 logs training-service-lp

# サーバー再起動
pm2 restart training-service-lp

# Gitで最新版を取得
cd training-service-lp
git pull origin main
pm2 restart training-service-lp

# ファイアウォール確認
gcloud compute firewall-rules list
```

---

## ⚠️ 注意事項

1. **メール設定は必須**
   - Gmailアプリパスワードを取得して.envに設定

2. **ファイアウォール設定を忘れずに**
   - ポート開放しないとアクセスできません

3. **Vercelは並行運用可能**
   - テスト環境としてVercelを残しておくのもOK
   - GCP VMを本番環境として使用

4. **セキュリティ**
   - 本番運用時はHTTPS必須
   - .envファイルは絶対にGitにプッシュしない

---

## 📝 チェックリスト

次回のセッションで確認する項目：

- [ ] どのデプロイ方法を選ぶか決定
- [ ] GCP VMにSSH接続
- [ ] リポジトリをクローン
- [ ] .envファイルにメール設定
- [ ] ファイアウォール設定
- [ ] サーバー起動
- [ ] ブラウザでアクセス確認
- [ ] フォーム送信テスト
- [ ] メール受信確認
- [ ] （オプション）Nginx + SSL設定
- [ ] （オプション）カスタムドメイン設定

---

## 🔗 リンク集

- **本番サイト（Vercel）**: https://training-service-lp.vercel.app/
- **GitHubリポジトリ**: https://github.com/MICHANWANWAN/training-service-lp
- **GCP Console**: https://console.cloud.google.com/
- **Vercelダッシュボード**: https://vercel.com/dashboard

---

**作成日**: 2025-11-10
**次回セッション**: このファイルを参照してGCP VMへのデプロイを実施
