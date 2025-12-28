import './DashboardPage.css';

function DashboardPage() {
  const stats = {
    projects: {
      total: 256,
      active: 198,
      completed: 58,
      averageProgress: 72
    },
    services: {
      total: 32,
      active: 28,
      maintenance: 4,
      uptime: 99.7
    },
    users: {
      total: 15432,
      activeToday: 9876,
      newToday: 234
    },
    performance: {
      avgResponse: '45ms',
      requests: 128943,
      errors: 23
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">📊 داشبورد مدیریت</h1>
        <p className="page-subtitle">آمار و گزارش‌های زنده سیستم TetraSaaS</p>
      </div>

      <div className="dashboard-grid">
        {/* پروژه‌ها */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📁 پروژه‌ها</h3>
            <span className="card-badge">{stats.projects.total} کل</span>
          </div>
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-label">فعال</span>
              <span className="stat-value">{stats.projects.active}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">تکمیل شده</span>
              <span className="stat-value">{stats.projects.completed}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">میانگین پیشرفت</span>
              <span className="stat-value">{stats.projects.averageProgress}%</span>
            </div>
          </div>
          <div className="card-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${stats.projects.averageProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* سرویس‌ها */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>⚡ سرویس‌ها</h3>
            <span className="card-badge">{stats.services.total} کل</span>
          </div>
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-label">فعال</span>
              <span className="stat-value">{stats.services.active}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">در تعمیرات</span>
              <span className="stat-value">{stats.services.maintenance}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">آپ‌تایم</span>
              <span className="stat-value">{stats.services.uptime}%</span>
            </div>
          </div>
          <div className="card-status">
            <div className="status-indicator online">
              <div className="status-dot"></div>
              <span>سیستم فعال</span>
            </div>
          </div>
        </div>

        {/* کاربران */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>👥 کاربران</h3>
            <span className="card-badge">{stats.users.total.toLocaleString('fa-IR')} کل</span>
          </div>
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-label">آنلاین امروز</span>
              <span className="stat-value">{stats.users.activeToday.toLocaleString('fa-IR')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">جدید امروز</span>
              <span className="stat-value">{stats.users.newToday}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">نرخ رشد</span>
              <span className="stat-value">+12%</span>
            </div>
          </div>
          <div className="card-trend">
            <span className="trend-up">📈 روند صعودی</span>
          </div>
        </div>

        {/* عملکرد */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>⚙️ عملکرد</h3>
            <span className="card-badge">عالی</span>
          </div>
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-label">میانگین پاسخ</span>
              <span className="stat-value">{stats.performance.avgResponse}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">درخواست‌ها</span>
              <span className="stat-value">
                {(stats.performance.requests / 1000).toFixed(1)}K
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">خطاها</span>
              <span className="stat-value">{stats.performance.errors}</span>
            </div>
          </div>
          <div className="card-metrics">
            <div className="metric">
              <span className="metric-label">موفقیت:</span>
              <span className="metric-value">99.98%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>🚀 اقدامات سریع</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">➕</span>
            <span className="action-text">پروژه جدید</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📊</span>
            <span className="action-text">گزارش روزانه</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">🔧</span>
            <span className="action-text">تنظیمات سیستم</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">👥</span>
            <span className="action-text">مدیریت کاربران</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
