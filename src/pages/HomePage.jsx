import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    // بارگیری آمار
    const fetchStats = async () => {
      try {
        const [healthRes, statsRes] = await Promise.all([
          axios.get('/api/health'),
          axios.get('/api/stats')
        ]);
        
        setHealth(healthRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">🚀</span>
            پلتفرم TetraSaaS v3.2
          </h1>
          <p className="hero-subtitle">
            بزرگترین مجموعه هوش مصنوعی فارسی با ۲۵۶ پروژه NLP و ۳۲ سرویس AI
          </p>
          
          <div className="hero-actions">
            <Link to="/nlp" className="btn btn-primary btn-large">
              <span className="btn-icon">🧠</span>
              شروع پردازش متن
            </Link>
            <Link to="/projects" className="btn btn-secondary btn-large">
              <span className="btn-icon">📁</span>
              مشاهده پروژه‌ها
            </Link>
          </div>
        </div>
      </section>

      {/* آمار زنده */}
      <section className="live-stats-section">
        <h2 className="section-title">📊 آمار زنده سیستم</h2>
        
        {loading ? (
          <div className="loading-stats">در حال بارگذاری آمار...</div>
        ) : stats ? (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📁</div>
              <div className="stat-value">{stats.projects.total}</div>
              <div className="stat-label">پروژه NLP</div>
              <div className="stat-sub">
                <span className="stat-badge progress">
                  میانگین پیشرفت: {stats.projects.averageProgress}%
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-value">{stats.services.total}</div>
              <div className="stat-label">سرویس AI</div>
              <div className="stat-sub">
                <span className="stat-badge active">
                  {stats.services.active} فعال
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{stats.users.activeToday.toLocaleString('fa-IR')}</div>
              <div className="stat-label">کاربران آنلاین</div>
              <div className="stat-sub">
                <span className="stat-badge total">
                  کل: {stats.users.total.toLocaleString('fa-IR')}
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📨</div>
              <div className="stat-value">
                {(stats.services.totalRequests / 1000).toFixed(1)}K
              </div>
              <div className="stat-label">درخواست امروز</div>
              <div className="stat-sub">
                <span className="stat-badge uptime">
                  آپ‌تایم: {stats.services.totalUptime}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="error-stats">عدم اتصال به سرور</div>
        )}
      </section>

      {/* وضعیت API */}
      <section className="api-status-section">
        <div className="api-status-card">
          <div className="api-status-header">
            <h3 className="api-status-title">🌐 وضعیت API اصلی</h3>
            <div className={`api-status-indicator ${health ? 'online' : 'offline'}`}>
              <div className="status-dot"></div>
              <span>{health ? 'آنلاین' : 'آفلاین'}</span>
            </div>
          </div>
          
          {health && (
            <div className="api-status-details">
              <div className="api-status-row">
                <span className="api-status-label">نسخه:</span>
                <span className="api-status-value">{health.version}</span>
              </div>
              <div className="api-status-row">
                <span className="api-status-label">وضعیت:</span>
                <span className="api-status-value success">{health.status}</span>
              </div>
              <div className="api-status-row">
                <span className="api-status-label">کاربران فعال:</span>
                <span className="api-status-value">
                  {health.activeUsers?.toLocaleString('fa-IR')}
                </span>
              </div>
              <div className="api-status-row">
                <span className="api-status-label">آپ‌تایم:</span>
                <span className="api-status-value">{health.uptime}%</span>
              </div>
            </div>
          )}
          
          <div className="api-test-buttons">
            <Link to="/api/health" className="btn btn-small" target="_blank">
              تست API سلامت
            </Link>
            <Link to="/api/projects?page=1&limit=5" className="btn btn-small btn-outline" target="_blank">
              تست پروژه‌ها
            </Link>
          </div>
        </div>
      </section>

      {/* دسترسی سریع */}
      <section className="quick-access">
        <h2 className="section-title">🚀 دسترسی سریع</h2>
        
        <div className="quick-links">
          <Link to="/projects" className="quick-link">
            <div className="quick-link-icon">📁</div>
            <div className="quick-link-content">
              <h4>پروژه‌های NLP</h4>
              <p>۲۵۶ پروژه فعال با پیشرفت مختلف</p>
            </div>
            <div className="quick-link-arrow">→</div>
          </Link>
          
          <Link to="/services" className="quick-link">
            <div className="quick-link-icon">⚡</div>
            <div className="quick-link-content">
              <h4>سرویس‌های AI</h4>
              <p>۳۲ سرویس آماده استفاده</p>
            </div>
            <div className="quick-link-arrow">→</div>
          </Link>
          
          <Link to="/nlp" className="quick-link">
            <div className="quick-link-icon">🧠</div>
            <div className="quick-link-content">
              <h4>پردازش متن</h4>
              <p>آنالیز متن فارسی زنده</p>
            </div>
            <div className="quick-link-arrow">→</div>
          </Link>
          
          <Link to="/dashboard" className="quick-link">
            <div className="quick-link-icon">📊</div>
            <div className="quick-link-content">
              <h4>داشبورد مدیریت</h4>
              <p>آمار و گزارش‌های پیشرفته</p>
            </div>
            <div className="quick-link-arrow">→</div>
          </Link>
        </div>
      </section>

      {/* پروژه‌های ویژه */}
      <section className="featured-projects">
        <div className="section-header">
          <h2 className="section-title">🏆 پروژه‌های ویژه</h2>
          <Link to="/projects" className="btn btn-link">
            مشاهده همه →
          </Link>
        </div>
        
        <div className="projects-preview">
          <div className="project-preview-card featured">
            <div className="project-badge">ویژه #۲۵۴</div>
            <h3 className="project-title">پروژه پردازش متن پیشرفته</h3>
            <p className="project-description">
              پردازش متن فارسی با الگوریتم‌های پیشرفته و پشتیبانی از انواع مختلف
            </p>
            <div className="project-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '85%' }}></div>
              </div>
              <div className="progress-text">۸۵% پیشرفت</div>
            </div>
            <Link to="/projects/254" className="btn btn-small">
              مشاهده جزئیات
            </Link>
          </div>
          
          <div className="project-preview-card">
            <div className="project-badge new">جدید #۲۵۶</div>
            <h3 className="project-title">تحلیل احساسات هوشمند</h3>
            <p className="project-description">
              تشخیص احساسات در متن فارسی با دقت ۹۵٪
            </p>
            <div className="project-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '95%' }}></div>
              </div>
              <div className="progress-text">۹۵% پیشرفت</div>
            </div>
            <Link to="/projects/256" className="btn btn-small">
              مشاهده جزئیات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
