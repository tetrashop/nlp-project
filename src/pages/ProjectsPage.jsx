import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsPage.css';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [statusFilter, setStatusFilter] = useState('همه');
  const [categoryFilter, setCategoryFilter] = useState('همه');
  
  const projectsPerPage = 12;

  // داده‌های نمونه پروژه‌ها
  const sampleProjects = [
    {
      id: 1,
      title: 'پردازش متن فارسی پیشرفته',
      description: 'سیستم NLP برای تحلیل احساسات متن فارسی با دقت ۹۸٪',
      progress: 95,
      status: 'ویژه',
      category: 'پردازش متن',
      updated: '۲ روز پیش',
      technologies: ['Python', 'TensorFlow', 'React'],
      featured: true
    },
    {
      id: 2,
      title: 'تشخیص تصویر با هوش مصنوعی',
      description: 'الگوریتم تشخیص اشیاء در تصاویر با استفاده از CNN',
      progress: 87,
      status: 'جدید',
      category: 'بینایی ماشین',
      updated: '۱ هفته پیش',
      technologies: ['Python', 'PyTorch', 'OpenCV'],
      featured: true
    },
    {
      id: 3,
      title: 'چت بات هوشمند فارسی',
      description: 'ربات گفتگوی فارسی با قابلیت یادگیری مداوم',
      progress: 72,
      status: 'محبوب',
      category: 'چت بات',
      updated: '۳ روز پیش',
      technologies: ['Python', 'Transformers', 'FastAPI'],
      featured: false
    },
    {
      id: 4,
      title: 'تبدیل گفتار به متن',
      description: 'سیستم تبدیل صوت فارسی به متن با دقت بالا',
      progress: 64,
      status: 'عادی',
      category: 'پردازش صوت',
      updated: '۲ هفته پیش',
      technologies: ['Python', 'TensorFlow', 'Librosa'],
      featured: false
    },
    {
      id: 5,
      title: 'توصیه‌گر محتوا',
      description: 'سیستم پیشنهاد محتوای شخصی‌سازی شده',
      progress: 89,
      status: 'جدید',
      category: 'سیستم توصیه‌گر',
      updated: '۴ روز پیش',
      technologies: ['Python', 'Scikit-learn', 'Pandas'],
      featured: true
    },
    {
      id: 6,
      title: 'خلاصه‌ساز مقالات',
      description: 'خلاصه‌سازی خودکار مقالات فارسی با حفظ معنا',
      progress: 56,
      status: 'عادی',
      category: 'پردازش متن',
      updated: '۱ ماه پیش',
      technologies: ['Python', 'Transformers', 'NLTK'],
      featured: false
    },
    {
      id: 7,
      title: 'ترجمه ماشینی عصبی',
      description: 'سیستم ترجمه فارسی به انگلیسی با شبکه‌های عصبی',
      progress: 91,
      status: 'ویژه',
      category: 'ترجمه ماشینی',
      updated: '۵ روز پیش',
      technologies: ['Python', 'TensorFlow', 'HuggingFace'],
      featured: true
    },
    {
      id: 8,
      title: 'تشخیص تقلب در متن',
      description: 'تشخیص متون تولید شده توسط هوش مصنوعی',
      progress: 78,
      status: 'جدید',
      category: 'امنیت',
      updated: '۶ روز پیش',
      technologies: ['Python', 'ML', 'NLP'],
      featured: false
    },
    {
      id: 9,
      title: 'تحلیل احساسات زنده',
      description: 'آنالیز لحظه‌ای احساسات در شبکه‌های اجتماعی',
      progress: 83,
      status: 'محبوب',
      category: 'تحلیل احساسات',
      updated: '۳ روز پیش',
      technologies: ['Python', 'Streamlit', 'Twitter API'],
      featured: true
    },
    {
      id: 10,
      title: 'دسته‌بندی اخبار',
      description: 'سیستم طبقه‌بندی خودکار اخبار فارسی',
      progress: 67,
      status: 'عادی',
      category: 'دسته‌بندی',
      updated: '۲ هفته پیش',
      technologies: ['Python', 'Scikit-learn', 'BeautifulSoup'],
      featured: false
    },
    {
      id: 11,
      title: 'تولید متن خلاقانه',
      description: 'تولید متن فارسی خلاقانه با GPT',
      progress: 94,
      status: 'ویژه',
      category: 'تولید متن',
      updated: '۱ روز پیش',
      technologies: ['Python', 'GPT-3', 'FastAPI'],
      featured: true
    },
    {
      id: 12,
      title: 'استخراج اطلاعات',
      description: 'استخراج خودکار اطلاعات از اسناد فارسی',
      progress: 71,
      status: 'عادی',
      category: 'پردازش متن',
      updated: '۱ هفته پیش',
      technologies: ['Python', 'SpaCy', 'Regex'],
      featured: false
    },
    {
      id: 13,
      title: 'تشخیص لحن گفتار',
      description: 'تشخیص لحن و احساس در گفتار فارسی',
      progress: 59,
      status: 'جدید',
      category: 'پردازش صوت',
      updated: '۴ روز پیش',
      technologies: ['Python', 'Librosa', 'TensorFlow'],
      featured: false
    },
    {
      id: 14,
      title: 'پاسخ‌دهی خودکار',
      description: 'سیستم پاسخ‌دهی خودکار به سوالات متداول',
      progress: 88,
      status: 'محبوب',
      category: 'چت بات',
      updated: '۲ روز پیش',
      technologies: ['Python', 'FAISS', 'BERT'],
      featured: true
    },
    {
      id: 15,
      title: 'برچسب‌گذاری خودکار',
      description: 'برچسب‌گذاری خودکار محتوای فارسی',
      progress: 76,
      status: 'عادی',
      category: 'برچسب‌گذاری',
      updated: '۳ هفته پیش',
      technologies: ['Python', 'NLTK', 'Scikit-learn'],
      featured: false
    },
    {
      id: 16,
      title: 'تشخیص موجودیت‌های نامدار',
      description: 'تشخیص اسامی و مکان‌ها در متن فارسی',
      progress: 82,
      status: 'جدید',
      category: 'پردازش متن',
      updated: '۱ هفته پیش',
      technologies: ['Python', 'SpaCy', 'Transformers'],
      featured: true
    },
    {
      id: 17,
      title: 'خلاصه گفتگوها',
      description: 'خلاصه‌سازی خودکار گفتگوهای فارسی',
      progress: 65,
      status: 'عادی',
      category: 'خلاصه‌سازی',
      updated: '۲ هفته پیش',
      technologies: ['Python', 'Transformers', 'NLP'],
      featured: false
    },
    {
      id: 18,
      title: 'تولید پرسش و پاسخ',
      description: 'تولید خودکار سوالات از متن فارسی',
      progress: 90,
      status: 'ویژه',
      category: 'تولید متن',
      updated: '۳ روز پیش',
      technologies: ['Python', 'T5', 'HuggingFace'],
      featured: true
    },
    {
      id: 19,
      title: 'تحلیل روند موضوعات',
      description: 'تحلیل روند موضوعات داغ در محتوای فارسی',
      progress: 73,
      status: 'محبوب',
      category: 'تحلیل روند',
      updated: '۵ روز پیش',
      technologies: ['Python', 'LDA', 'Gensim'],
      featured: true
    },
    {
      id: 20,
      title: 'بهینه‌سازی جستجو',
      description: 'بهینه‌سازی موتور جستجوی فارسی',
      progress: 69,
      status: 'عادی',
      category: 'جستجو',
      updated: '۳ هفته پیش',
      technologies: ['Python', 'Elasticsearch', 'BM25'],
      featured: false
    },
    {
      id: 21,
      title: 'تشخیص زبان بدن متن',
      description: 'تشخیص عواطف و احساسات از طریق تحلیل متن',
      progress: 81,
      status: 'جدید',
      category: 'تحلیل احساسات',
      updated: '۶ روز پیش',
      technologies: ['Python', 'Deep Learning', 'NLP'],
      featured: false
    },
    {
      id: 22,
      title: 'تولید گزارش خودکار',
      description: 'تولید خودکار گزارش از داده‌های متنی',
      progress: 77,
      status: 'محبوب',
      category: 'تولید متن',
      updated: '۴ روز پیش',
      technologies: ['Python', 'Template', 'NLP'],
      featured: true
    },
    {
      id: 23,
      title: 'تحلیل شبکه‌های اجتماعی',
      description: 'تحلیل محتوای فارسی در شبکه‌های اجتماعی',
      progress: 84,
      status: 'ویژه',
      category: 'تحلیل شبکه',
      updated: '۲ روز پیش',
      technologies: ['Python', 'Tweepy', 'NetworkX'],
      featured: true
    },
    {
      id: 24,
      title: 'تشخیص اسپم',
      description: 'تشخیص پیام‌های اسپم در فارسی',
      progress: 92,
      status: 'جدید',
      category: 'امنیت',
      updated: '۱ روز پیش',
      technologies: ['Python', 'ML', 'NLP'],
      featured: true
    }
  ];

  useEffect(() => {
    // شبیه‌سازی دریافت داده از API
    setTimeout(() => {
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // فیلتر کردن پروژه‌ها بر اساس جستجو و فیلترها
    let filtered = projects;
    
    // فیلتر بر اساس جستجو
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.includes(searchTerm) ||
        project.description.includes(searchTerm) ||
        project.category.includes(searchTerm)
      );
    }
    
    // فیلتر بر اساس وضعیت
    if (statusFilter !== 'همه') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }
    
    // فیلتر بر اساس دسته‌بندی
    if (categoryFilter !== 'همه') {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }
    
    setFilteredProjects(filtered);
    setCurrentPage(1); // بازگشت به صفحه اول هنگام فیلتر
  }, [searchTerm, statusFilter, categoryFilter, projects]);

  // محاسبه پروژه‌های صفحه فعلی
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  
  // محاسبه تعداد صفحات
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  // تغییر صفحه
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // فیلترهای موجود
  const statuses = ['همه', 'ویژه', 'جدید', 'محبوب', 'عادی'];
  const categories = ['همه', 'پردازش متن', 'بینایی ماشین', 'چت بات', 'پردازش صوت', 'سیستم توصیه‌گر', 'ترجمه ماشینی', 'امنیت', 'تحلیل احساسات', 'دسته‌بندی', 'تولید متن', 'خلاصه‌سازی', 'برچسب‌گذاری', 'تحلیل روند', 'جستجو', 'تحلیل شبکه'];

  // آمار پروژه‌ها
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.progress > 70).length,
    completed: projects.filter(p => p.progress === 100).length,
    featured: projects.filter(p => p.featured).length
  };

  if (loading) {
    return (
      <div className="projects-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>در حال دریافت پروژه‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      {/* هدر صفحه */}
      <div className="page-header">
        <h1 className="page-title">📂 پروژه‌های هوش مصنوعی</h1>
        <p className="page-subtitle">
          مشاهده {projects.length} پروژه پیشرفته در زمینه‌های مختلف AI
        </p>
      </div>

      {/* آمار کلی */}
      <div className="projects-stats">
        <div className="stats-summary">
          <div className="stat-item">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">کل پروژه‌ها</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.active}</div>
            <div className="stat-label">پروژه‌های فعال</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">تکمیل شده</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.featured}</div>
            <div className="stat-label">ویژه</div>
          </div>
        </div>
      </div>

      {/* نوار ابزار */}
      <div className="projects-toolbar">
        {/* جستجو */}
        <div className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              className="search-input"
              placeholder="جستجوی پروژه‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
              🔍
            </button>
          </div>
        </div>

        {/* فیلترها */}
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="status-filter">وضعیت:</label>
            <select
              id="status-filter"
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="category-filter">دسته‌بندی:</label>
            <select
              id="category-filter"
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* حالت نمایش */}
        <div className="view-options">
          <button
            className={`view-option ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            📊 شبکه‌ای
          </button>
          <button
            className={`view-option ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            📃 لیستی
          </button>
        </div>
      </div>

      {/* نتایج جستجو */}
      <div className="results-info">
        <p>
          نمایش {currentProjects.length} پروژه از {filteredProjects.length} پروژه یافت شده
          {searchTerm && <span> برای "{searchTerm}"</span>}
        </p>
      </div>

      {/* حالت لیستی */}
      {viewMode === 'list' && filteredProjects.length > 0 && (
        <div className="projects-list">
          {currentProjects.map(project => (
            <div key={project.id} className="project-list-item">
              <div className="list-item-content">
                <div className="list-item-header">
                  <span className={`project-status ${project.status}`}>
                    {project.status}
                  </span>
                  <span className="project-id">#{project.id}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="list-item-footer">
                  <div className="project-meta">
                    <div className="project-category">
                      📁 {project.category}
                    </div>
                    <div className="project-updated">
                      🔄 {project.updated}
                    </div>
                  </div>
                  <div className="project-progress">
                    <div className="progress-info">
                      <span className="progress-value">{project.progress}%</span>
                      <span>پیشرفت</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-item-actions">
                <Link to={`/projects/${project.id}`} className="btn btn-primary">
                  مشاهده جزئیات
                </Link>
                {project.featured && (
                  <span className="featured-badge">⭐ ویژه</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* حالت شبکه‌ای */}
      {viewMode === 'grid' && filteredProjects.length > 0 && (
        <div className="projects-grid">
          {currentProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <span className={`project-status ${project.status}`}>
                  {project.status}
                </span>
                <span className="project-id">#{project.id}</span>
              </div>
              
              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-meta">
                  <div className="project-category">
                    📁 {project.category}
                  </div>
                  <div className="project-updated">
                    🔄 {project.updated}
                  </div>
                </div>
                
                <div className="project-progress">
                  <div className="progress-info">
                    <span className="progress-value">{project.progress}%</span>
                    <span>پیشرفت پروژه</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="project-technologies">
                  <div className="tech-label">تکنولوژی‌ها:</div>
                  <div className="tech-tags">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="project-card-footer">
                <Link to={`/projects/${project.id}`} className="btn btn-primary">
                  مشاهده جزئیات
                </Link>
                <button className="btn btn-outline">
                  اشتراک‌گذاری
                </button>
                {project.featured && (
                  <span className="featured-indicator">⭐</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* حالت خالی */}
      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>پروژه‌ای یافت نشد</h3>
          <p>
            {searchTerm 
              ? `نتیجه‌ای برای "${searchTerm}" پیدا نشد. لطفاً عبارت جستجو را تغییر دهید.`
              : 'هیچ پروژه‌ای با فیلترهای انتخاب شده مطابقت ندارد.'}
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('همه');
              setCategoryFilter('همه');
            }}
          >
            حذف فیلترها
          </button>
        </div>
      )}

      {/* صفحه‌بندی */}
      {filteredProjects.length > 0 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← قبلی
          </button>
          
          <div className="pagination-pages">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // نمایش صفحات محدود
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`pagination-page ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
          </div>
          
          <button
            className="pagination-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            بعدی →
          </button>
        </div>
      )}

      {/* دکمه‌های اقدام سریع */}
      <div className="quick-actions-bar">
        <Link to="/nlp" className="action-link">
          🧠 پردازش متن جدید
        </Link>
        <Link to="/services" className="action-link">
          ⚡ مشاهده سرویس‌ها
        </Link>
        <button className="action-link">
          📤 صادرات لیست
        </button>
      </div>
    </div>
  );
}

export default ProjectsPage;
