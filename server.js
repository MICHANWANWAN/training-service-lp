require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// メール送信設定
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ルート: トップページ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API: 無料相談申し込み
app.post('/api/consultation', async (req, res) => {
  try {
    const { name, company, email, phone, message } = req.body;

    // バリデーション
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: '必須項目を入力してください'
      });
    }

    // メール本文
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: '【新規】30分無料相談の申し込み',
      html: `
        <h2>新しい無料相談の申し込みがありました</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>会社名:</strong> ${company || '未記入'}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>電話番号:</strong> ${phone || '未記入'}</p>
        <p><strong>メッセージ:</strong></p>
        <p>${message || '未記入'}</p>
      `
    };

    // 自動返信メール
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '【受付完了】無料相談のお申し込みありがとうございます',
      html: `
        <p>${name} 様</p>
        <p>この度は、30分無料相談にお申し込みいただき、誠にありがとうございます。</p>
        <p>担当者より24時間以内にご連絡させていただきます。</p>
        <br>
        <p>今しばらくお待ちくださいませ。</p>
        <br>
        <p>─────────────────</p>
        <p>企業向け研修サービス</p>
        <p>Email: ${process.env.EMAIL_USER}</p>
        <p>─────────────────</p>
      `
    };

    // メール送信
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    res.json({
      success: true,
      message: 'お申し込みありがとうございます。確認メールを送信しました。'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'エラーが発生しました。もう一度お試しください。'
    });
  }
});

// API: 資料ダウンロード申し込み
app.post('/api/download', async (req, res) => {
  try {
    const { name, company, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: '必須項目を入力してください'
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: '【新規】資料ダウンロード申し込み',
      html: `
        <h2>新しい資料ダウンロード申し込みがありました</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>会社名:</strong> ${company || '未記入'}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
      `
    };

    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '【資料送付】サービス資料をお送りします',
      html: `
        <p>${name} 様</p>
        <p>この度は、サービス資料をご請求いただき、誠にありがとうございます。</p>
        <p>添付ファイルにて資料をお送りいたします。</p>
        <br>
        <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
        <br>
        <p>─────────────────</p>
        <p>企業向け研修サービス</p>
        <p>Email: ${process.env.EMAIL_USER}</p>
        <p>─────────────────</p>
      `
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    res.json({
      success: true,
      message: '資料をメールで送信しました。'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'エラーが発生しました。もう一度お試しください。'
    });
  }
});

// API: お問い合わせ
app.post('/api/contact', async (req, res) => {
  try {
    const { name, company, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: '必須項目を入力してください'
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `【お問い合わせ】${subject || '件名なし'}`,
      html: `
        <h2>新しいお問い合わせがありました</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>会社名:</strong> ${company || '未記入'}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>電話番号:</strong> ${phone || '未記入'}</p>
        <p><strong>件名:</strong> ${subject || '未記入'}</p>
        <p><strong>お問い合わせ内容:</strong></p>
        <p>${message}</p>
      `
    };

    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '【受付完了】お問い合わせありがとうございます',
      html: `
        <p>${name} 様</p>
        <p>お問い合わせいただき、誠にありがとうございます。</p>
        <p>担当者より24時間以内にご連絡させていただきます。</p>
        <br>
        <p>今しばらくお待ちくださいませ。</p>
        <br>
        <p>─────────────────</p>
        <p>企業向け研修サービス</p>
        <p>Email: ${process.env.EMAIL_USER}</p>
        <p>─────────────────</p>
      `
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    res.json({
      success: true,
      message: 'お問い合わせを受け付けました。確認メールを送信しました。'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'エラーが発生しました。もう一度お試しください。'
    });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
