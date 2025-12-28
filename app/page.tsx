import HealthStatus from '@/components/HealthStatus';
import NLPProjects from '@/components/NLPProjects';
import AIServices from '@/components/AIServices';

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* هدر */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">🚀 پلتفرم TetraSaaS v3.2</h1>
          <p className="text-xl opacity-90">بزرگترین مجموعه هوش مصنوعی فارسی</p>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* وضعیت API */}
        <div className="mb-8">
          <HealthStatus />
        </div>

        {/* آمار کلی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">۲۵۶</div>
            <div className="text-gray-700">پروژه NLP</div>
            <div className="text-sm text-gray-500 mt-2">کامل‌ترین مجموعه فارسی</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">۳۲</div>
            <div className="text-gray-700">سرویس AI</div>
            <div className="text-sm text-gray-500 mt-2">API آماده استفاده</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">۱۵K+</div>
            <div className="text-gray-700">کاربر فعال</div>
            <div className="text-sm text-gray-500 mt-2">در ۳۰ روز گذشته</div>
          </div>
        </div>

        {/* پروژه‌های ویژه */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🚀 پروژه‌های ویژه امروز</h2>
          <NLPProjects />
        </div>

        {/* سرویس‌های AI */}
        <div>
          <h2 className="text-2xl font-bold mb-4">⚡ سرویس‌های هوش مصنوعی</h2>
          <AIServices />
        </div>
      </main>

      {/* فوتر */}
      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="container mx-auto text-center">
          <p>© ۲۰۲۴ TetraSaaS • نسخه ۳.۲ • ۳۲ سرویس کامل</p>
        </div>
      </footer>
    </div>
  );
}
