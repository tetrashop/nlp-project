import { useParams, Link } from 'react-router-dom';
import './ProjectDetailPage.css';

function ProjectDetailPage() {
  const { id } = useParams();
  
  // داده‌های نمونه
  const project = {
    id: parseInt(id) || 1,
    title: `پروژه NLP ${id || 1}`,
    description: 'پروژه پیشرفته پردازش زبان طبیعی فارسی با قابلیت‌های متنوع',
    progress: 85,
    status: 'ویژه',
    category: 'پردازش متن',
    created: '۱۴۰۳/۰۹/۱۵',
    updated: '۱۴۰۳/۱۰/۲۷',
    team: ['علی محمدی', 'فاطمه کریمی', 'محمد حسینی'],
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    milestones: [
      { title: 'تحلیل اولیه', completed: true, date: '۱۴۰۳/۰۹/۲۰' },
      { title: 'پیاده سازی هسته', completed: true, date: '۱۴۰۳/۱۰/۰۵' },
      { title: 'تست و بازخورد', completed: false, date: '۱۴۰۳/۱۱/۱۰' },
      { title: 'استقرار نهایی', completed: false, date: '۱۴۰۳/۱۱/۳۰' }
    ]
  };

  return (
    <div className="project-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">صفحه اصلی</Link>
        <span> / </span>
        <Link to="/projects">پروژه‌ها</Link>
        <span> / </span>
        <span>پروژه #{id}</span>
      </div>

      {/* Project Header */}
      <div className="project-header">
        <div className="header-left">
          <h1 className="project-title">{project.title}</h1>
          <div className="project-meta">
            <span className={`project-status ${project.status}`}>
              {project.status === 'ویژه' && '🏆 '}
              {project.status}
            </span>
            <span className="project-category">📁 {project.category}</span>
            <span className="project-id">شناسه: #{project.id}</span>
          </div>
        </div>
        <div className="header-right">
          <Link to="/projects" className="btn btn-outline">
            ← بازگشت
          </Link>
          <button className="btn btn-primary">
            اجرای تست
          </button>
        </div>
      </div>

      {/* Project Content */}
      <div className="project-content">
        {/* Left Column */}
        <div className="left-column">
          <div className="info-card">
            <h3>📋 اطلاعات پروژه</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">تاریخ ایجاد:</span>
                <span className="info-value">{project.created}</span>
              </div>
              <div className="info-item">
                <span className="info-label">آخرین بروزرسانی:</span>
                <span className="info-value">{project.updated}</span>
              </div>
              <div className="info-item">
                <span className="info-label">وضعیت:</span>
                <span className="info-value">{project.status}</span>
              </div>
              <div className="info-item">
                <span className="info-label">دسته‌بندی:</span>
                <span className="info-value">{project.category}</span>
              </div>
            </div>
          </div>

          <div className="team-card">
            <h3>👥 تیم پروژه</h3>
            <div className="team-list">
              {project.team.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-avatar">
                    {member.charAt(0)}
                  </div>
                  <div className="member-name">{member}</div>
                  <div className="member-role">توسعه‌دهنده</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="progress-card">
            <h3>📊 پیشرفت پروژه</h3>
            <div className="progress-display">
              <div className="progress-value">{project.progress}%</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="progress-details">
              <div className="detail-item">
                <span>تکمیل شده:</span>
                <strong>{project.progress}%</strong>
              </div>
              <div className="detail-item">
                <span>مانده:</span>
                <strong>{100 - project.progress}%</strong>
              </div>
            </div>
          </div>

          <div className="milestones-card">
            <h3>🎯 نقاط عطف</h3>
            <div className="milestones-list">
              {project.milestones.map((milestone, index) => (
                <div key={index} className="milestone-item">
                  <div className="milestone-check">
                    {milestone.completed ? '✅' : '⏳'}
                  </div>
                  <div className="milestone-content">
                    <div className="milestone-title">{milestone.title}</div>
                    <div className="milestone-date">{milestone.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-card">
            <h3>🛠️ تکنولوژی‌ها</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="project-actions">
        <button className="btn btn-primary">
          دانلود گزارش
        </button>
        <button className="btn btn-secondary">
          اشتراک‌گذاری
        </button>
        <button className="btn btn-outline">
          ویرایش پروژه
        </button>
        <Link to={`/projects/${project.id + 1}`} className="btn btn-link">
          پروژه بعدی →
        </Link>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
