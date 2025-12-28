import './ServicesPage.css';

function ServicesPage() {
  const services = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    name: `سرویس AI ${i + 1}`,
    description: `سرویس هوش مصنوعی برای پردازش ${i % 2 === 0 ? 'متن فارسی' : 'تصویر'}`,
    status: i % 4 === 0 ? 'در حال تعمیر' : 'فعال',
    uptime: 99.5 + (i * 0.1) % 0.5,
    endpoint: `/api/v1/service${i + 1}`
  }));

  return (
    <div className="services-page">
      <div className="page-header">
        <h1 className="page-title">⚡ سرویس‌های AI</h1>
        <p className="page-subtitle">۳۲ سرویس هوش مصنوعی آماده استفاده</p>
      </div>

      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <span className="service-id">#{service.id}</span>
              <span className={`service-status ${service.status === 'فعال' ? 'active' : 'maintenance'}`}>
                {service.status === 'فعال' ? '✅ فعال' : '🔧 تعمیرات'}
              </span>
            </div>
            
            <div className="service-body">
              <h3 className="service-title">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              
              <div className="service-meta">
                <div className="meta-item">
                  <span className="meta-label">آپ‌تایم:</span>
                  <span className="meta-value">{service.uptime.toFixed(1)}%</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Endpoint:</span>
                  <code className="meta-value">{service.endpoint}</code>
                </div>
              </div>
            </div>
            
            <div className="service-footer">
              <button 
                className="btn btn-primary"
                onClick={() => alert(`سرویس ${service.name} - وضعیت: ${service.status}`)}
              >
                {service.status === 'فعال' ? 'استفاده از API' : 'در حال تعمیر'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
