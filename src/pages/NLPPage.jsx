import { useState } from 'react';
import './NLPPage.css';

function NLPPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // داده‌های نمونه برای نمایش
  const sampleResult = {
    requestId: 'NLP-2024-001',
    algorithm: 'advanced',
    status: 'completed',
    result: {
      sentiment: 'مثبت',
      sentimentScore: 0.85,
      statistics: {
        wordCount: 24,
        charCount: 125,
        uniqueWords: 18,
        avgWordLength: 5.2
      },
      processingTime: '0.45s',
      tokens: ['این', 'یک', 'متن', 'نمونه', 'فارسی', 'برای', 'تست', 'پردازش', 'زبان', 'طبیعی', 'است', 'محصول', 'بسیار', 'عالی', 'و', 'کارآمد', 'است']
    }
  };

  const handleProcess = () => {
    if (!text.trim()) {
      alert('لطفا متنی برای پردازش وارد کنید');
      return;
    }

    setLoading(true);
    
    // شبیه‌سازی API call
    setTimeout(() => {
      const mockResult = {
        ...sampleResult,
        requestId: `NLP-${Date.now()}`,
        result: {
          ...sampleResult.result,
          sentiment: text.includes('عالی') || text.includes('خوب') ? 'مثبت' : 
                     text.includes('بد') || text.includes('ضعیف') ? 'منفی' : 'خنثی',
          sentimentScore: text.includes('عالی') ? 0.92 : text.includes('بد') ? 0.15 : 0.65,
          statistics: {
            wordCount: text.split(/\s+/).length,
            charCount: text.length,
            uniqueWords: new Set(text.split(/\s+/)).size,
            avgWordLength: (text.length / text.split(/\s+/).length).toFixed(1)
          },
          tokens: text.split(/\s+/).filter(t => t.length > 0)
        }
      };
      
      setResult(mockResult);
      setLoading(false);
    }, 1500);
  };

  const handleSampleText = () => {
    const sampleText = "این یک متن نمونه فارسی برای تست پردازش زبان طبیعی است. محصول بسیار عالی و کارآمد است. کیفیت بالا و عملکرد بی‌نظیری دارد. توصیه می‌کنم حتماً از این سرویس استفاده کنید.";
    setText(sampleText);
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  return (
    <div className="nlp-page">
      <div className="page-header">
        <h1 className="page-title">🧠 پردازش متن فارسی (NLP)</h1>
        <p className="page-subtitle">آنالیز متن فارسی با الگوریتم‌های پیشرفته پردازش زبان طبیعی</p>
      </div>

      <div className="nlp-container">
        {/* بخش ورودی */}
        <div className="input-section">
          <div className="input-header">
            <h3>📝 متن ورودی</h3>
            <div className="input-stats">
              <span className="stat-item">
                <span className="stat-label">کلمات:</span>
                <span className="stat-value">{text.split(/\s+/).filter(w => w).length}</span>
              </span>
              <span className="stat-item">
                <span className="stat-label">کاراکترها:</span>
                <span className="stat-value">{text.length}</span>
              </span>
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن فارسی خود را اینجا وارد کنید... مثال: 'این محصول بسیار عالی و کارآمد است'"
            rows="8"
            className="text-input"
            dir="rtl"
          />
          
          <div className="input-actions">
            <button 
              onClick={handleSampleText}
              className="btn btn-secondary"
            >
              💾 متن نمونه
            </button>
            <button 
              onClick={handleClear}
              className="btn btn-outline"
            >
              🗑️ پاک کردن
            </button>
            <button 
              onClick={handleProcess}
              disabled={loading || !text.trim()}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="loading-spinner-small"></span>
                  در حال پردازش...
                </>
              ) : (
                '🚀 پردازش متن'
              )}
            </button>
          </div>
        </div>

        {/* بخش نتایج */}
        {loading && (
          <div className="loading-section">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <h3>در حال پردازش متن...</h3>
              <p>الگوریتم‌های هوش مصنوعی در حال تحلیل متن شما هستند</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="result-section">
            <div className="result-header">
              <h3>📊 نتایج تحلیل متن</h3>
              <div className="result-meta">
                <span className="result-id">شناسه درخواست: {result.requestId}</span>
                <span className="result-time">زمان پردازش: {result.result.processingTime}</span>
              </div>
            </div>
            
            {/* کارت‌های نتیجه */}
            <div className="result-cards">
              <div className="result-card main-card">
                <div className="card-header">
                  <h4>📈 تحلیل احساسات</h4>
                  <span className={`sentiment-badge sentiment-${result.result.sentiment}`}>
                    {result.result.sentiment === 'مثبت' ? '😊 مثبت' : 
                     result.result.sentiment === 'منفی' ? '😔 منفی' : '😐 خنثی'}
                  </span>
                </div>
                <div className="card-content">
                  <div className="sentiment-score">
                    <div className="score-value">{result.result.sentimentScore.toFixed(2)}</div>
                    <div className="score-label">امتیاز احساس</div>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${result.result.sentimentScore * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-labels">
                      <span>منفی</span>
                      <span>خنثی</span>
                      <span>مثبت</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-value">{result.result.statistics.wordCount}</div>
                  <div className="stat-label">تعداد کلمات</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">🔤</div>
                  <div className="stat-value">{result.result.statistics.charCount}</div>
                  <div className="stat-label">تعداد کاراکتر</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">✨</div>
                  <div className="stat-value">{result.result.statistics.uniqueWords}</div>
                  <div className="stat-label">کلمات منحصر به فرد</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">📏</div>
                  <div className="stat-value">{result.result.statistics.avgWordLength}</div>
                  <div className="stat-label">میانگین طول کلمه</div>
                </div>
              </div>
            </div>

            {/* توکن‌ها */}
            <div className="tokens-section">
              <div className="section-header">
                <h4>🔡 توکن‌های استخراج شده</h4>
                <span className="token-count">{result.result.tokens.length} توکن</span>
              </div>
              <div className="tokens-container">
                {result.result.tokens.map((token, index) => (
                  <span key={index} className="token">
                    {token}
                  </span>
                ))}
              </div>
            </div>

            {/* خلاصه */}
            <div className="summary-section">
              <h4>📋 خلاصه تحلیل</h4>
              <div className="summary-content">
                <p>
                  متن شما با موفقیت پردازش شد. 
                  {result.result.sentiment === 'مثبت' ? ' احساسات مثبت قوی‌ای در متن وجود دارد.' : 
                   result.result.sentiment === 'منفی' ? ' احساسات منفی در متن شناسایی شد.' : 
                   ' متن از نظر احساسی خنثی است.'}
                  متن شامل {result.result.statistics.wordCount} کلمه و {result.result.statistics.charCount} کاراکتر است.
                </p>
              </div>
            </div>

            {/* اقدامات بعدی */}
            <div className="actions-section">
              <h4>🎯 اقدامات بعدی</h4>
              <div className="action-buttons">
                <button className="btn btn-secondary">
                  📥 ذخیره نتایج
                </button>
                <button className="btn btn-outline">
                  📧 اشتراک‌گذاری
                </button>
                <button 
                  onClick={handleClear}
                  className="btn btn-primary"
                >
                  🔄 تحلیل جدید
                </button>
              </div>
            </div>
          </div>
        )}

        {/* راهنما */}
        {!result && !loading && (
          <div className="help-section">
            <h3>💡 راهنمای استفاده</h3>
            <div className="help-content">
              <div className="help-card">
                <div className="help-icon">📝</div>
                <h5>متن فارسی وارد کنید</h5>
                <p>متن فارسی خود را در کادر بالا وارد کنید. می‌توانید از دکمه "متن نمونه" استفاده کنید.</p>
              </div>
              <div className="help-card">
                <div className="help-icon">🚀</div>
                <h5>پردازش کنید</h5>
                <p>روی دکمه "پردازش متن" کلیک کنید تا الگوریتم‌های NLP متن را تحلیل کنند.</p>
              </div>
              <div className="help-card">
                <div className="help-icon">📊</div>
                <h5>نتایج را ببینید</h5>
                <p>نتایج شامل تحلیل احساسات، آمار متن و توکن‌های استخراج شده نمایش داده می‌شود.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NLPPage;
