// モーダルウィンドウの管理
class ContactModal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.form = this.modal.querySelector('form');
        this.closeBtn = this.modal.querySelector('.close-modal');

        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }

    open() {
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.form.reset();
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="#4CAF50"/>
                    <path d="M15 25 L22 32 L35 18" stroke="white" stroke-width="3" fill="none"/>
                </svg>
                <p>${message}</p>
                <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">閉じる</button>
            </div>
        `;
        document.body.appendChild(successDiv);
        this.close();
    }

    showError(message) {
        alert('エラー: ' + message);
    }
}

// フォーム送信処理
async function submitForm(endpoint, formData) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 無料相談フォーム
document.addEventListener('DOMContentLoaded', () => {
    const consultationModal = new ContactModal('consultation-modal');
    const downloadModal = new ContactModal('download-modal');
    const contactModal = new ContactModal('contact-modal');

    // 無料相談ボタン
    document.querySelectorAll('a[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            consultationModal.open();
        });
    });

    // 資料ダウンロードボタン
    document.querySelectorAll('a[href="#download"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadModal.open();
        });
    });

    // お問い合わせボタン
    document.querySelectorAll('a[href*="contact@example.com"]').forEach(btn => {
        if (!btn.closest('.cta-option.recommended') && !btn.closest('#download')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                contactModal.open();
            });
        }
    });

    // 無料相談フォーム送信
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = consultationForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            const formData = {
                name: consultationForm.querySelector('[name="name"]').value,
                company: consultationForm.querySelector('[name="company"]').value,
                email: consultationForm.querySelector('[name="email"]').value,
                phone: consultationForm.querySelector('[name="phone"]').value,
                message: consultationForm.querySelector('[name="message"]').value
            };

            try {
                const result = await submitForm('/api/consultation', formData);

                if (result.success) {
                    consultationModal.showSuccess(result.message);
                } else {
                    consultationModal.showError(result.message);
                }
            } catch (error) {
                consultationModal.showError('送信に失敗しました。もう一度お試しください。');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '送信する';
            }
        });
    }

    // 資料ダウンロードフォーム送信
    const downloadForm = document.getElementById('download-form');
    if (downloadForm) {
        downloadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = downloadForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            const formData = {
                name: downloadForm.querySelector('[name="name"]').value,
                company: downloadForm.querySelector('[name="company"]').value,
                email: downloadForm.querySelector('[name="email"]').value
            };

            try {
                const result = await submitForm('/api/download', formData);

                if (result.success) {
                    downloadModal.showSuccess(result.message);
                } else {
                    downloadModal.showError(result.message);
                }
            } catch (error) {
                downloadModal.showError('送信に失敗しました。もう一度お試しください。');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '資料をダウンロード';
            }
        });
    }

    // お問い合わせフォーム送信
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            const formData = {
                name: contactForm.querySelector('[name="name"]').value,
                company: contactForm.querySelector('[name="company"]').value,
                email: contactForm.querySelector('[name="email"]').value,
                phone: contactForm.querySelector('[name="phone"]').value,
                subject: contactForm.querySelector('[name="subject"]').value,
                message: contactForm.querySelector('[name="message"]').value
            };

            try {
                const result = await submitForm('/api/contact', formData);

                if (result.success) {
                    contactModal.showSuccess(result.message);
                } else {
                    contactModal.showError(result.message);
                }
            } catch (error) {
                contactModal.showError('送信に失敗しました。もう一度お試しください。');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '送信する';
            }
        });
    }
});
