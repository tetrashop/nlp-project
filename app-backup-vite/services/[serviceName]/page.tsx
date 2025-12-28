'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// اطلاعات همه سرویس‌ها
const allServices = {
  'nlp': {
    title: '🧠 پلتفرم پروژه‌های NLP فارسی',
    description: '۲۵۵ پروژه کامل NLP با مستندات فارسی و API آماده',
    features: ['API REST', 'مستندات فارسی', 'پشتیبانی ۲۴/۷', 'مقیاس‌پذیری بالا'],
    status: 'فعال',
    category: 'پردازش زبان طبیعی',
    apiId: 'nlp' // شناسه API یکسان با کلید
  },
  'chess': {
    title: '♟️ شطرنج هوشمند Tetris-Chess',
    description: 'موتور شطرنج سطح استاد با قابلیت تحلیل بازی',
    features: ['سطح دشواری قابل تنظیم', 'تحلیل حرکات', 'آموزش تعاملی', 'API کامل'],
    status: 'فعال',
    category: 'بازی‌های استراتژیک',
    apiId: 'chess'
  },
  'ocr': {
    title: '🔍 سامانه ضد چندپارگی OCR',
    description: 'سیستم OCR مقاوم با دقت ۹۹٪ برای متون فارسی',
    features: ['پشتیبانی از پارسی', 'PDF/Image', 'دقت بالا', 'پردازش دسته‌ای'],
    status: 'فعال',
    category: 'پردازش تصویر',
    apiId: 'ocr'
  },
  'garden': {
    title: '🌿 باغ رازآلود (Mystic Garden)',
    description: 'بازی داستان‌محور با گیم‌پلی منحصر به فرد',
    features: ['داستان غیرخطی', 'گرافیک ۲.۵D', 'صداگذاری فارسی', 'سیستم انتخاب'],
    status: 'پیش‌نمایش',
    category: 'بازی ماجراجویی',
    apiId: 'garden'
  },
  'assistant': {
    title: '🤖 دستیار هوشمند فارسی',
    description: 'دستیار صوتی و متنی با قابلیت یادگیری و شخصی‌سازی',
    features: ['پشتیبانی صوتی', 'یادگیری مداوم', 'یکپارچه‌سازی آسان', 'امنیت بالا'],
    status: 'فعال',
    category: 'دستیار مجازی',
    apiId: 'assistant'
  }
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceName = params.serviceName as string;
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = allServices[serviceName as keyof typeof allServices];

  // اگر سرویس یافت نشد
  useEffect(() => {
    if (!service) {
      router.push('/services');
    }
  }, [service, router]);

  const requestAPIKey = async () => {
    if (!service) return;
    
    setIsRequesting(true);
    setError(null);
    
    try {
      console.log('در حال ارسال درخواست برای سرویس:', {
        serviceId: service.apiId,
        serviceName: service.title,
        serviceNameParam: serviceName
      });
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: service.apiId, // استفاده از apiId به جای serviceName
          serviceName: service.title,
          userEmail: 'user@tetrasaas.ir'
        }),
      });

      const result = await response.json();
      console.log('پاسخ API:', result);
      
      if (result.success) {
        setApiKey(result.data.apiKey);
        alert(`🎉 API Key دریافت شد!\n\n🔑 کلید شما: ${result.data.apiKey}\n📅 انقضا: ${result.data.expiresAt}`);
      } else {
        setError(result.error || result.message || 'خطای ناشناخته');
        alert(`❌ خطا: ${result.error || result.message || 'خطای ناشناخته'}`);
      }
    } catch (error) {
      console.error('خطای شبکه:', error);
      setError('خطا در ارتباط با سرور');
      alert('❌ خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsRequesting(false);
    }
  };

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="text-2xl text-red-600">سرویس یافت نشد</div>
        <Link href="/services" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          بازگشت به سرویس‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* ناوبری */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">خانه</Link>
        {' > '}
        <Link href="/services" className="hover:text-blue-600">سرویس‌ها</Link>
        {' > '}
        <span className="font-medium text-gray-900">{service.title}</span>
      </nav>

      {/* نمایش خطا اگر وجود داشته باشد */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          <div className="font-bold">خطا:</div>
          <div>{error}</div>
          <div className="mt-2 text-sm">
            <button 
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              بستن
            </button>
          </div>
        </div>
      )}

      {/* هدر سرویس */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-3 ${
              service.status === 'فعال' ? 'bg-green-100 text-green-800' :
              service.status === 'پیش‌نمایش' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {service.status}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {service.title}
            </h1>
            <p className="text-gray-600 text-lg">{service.description}</p>
            <div className="mt-3">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {service.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button
              onClick={requestAPIKey}
              disabled={isRequesting || service.status !== 'فعال'}
              className={`px-8 py-3 rounded-lg font-bold transition ${
                service.status === 'فعال'
                  ? 'bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isRequesting ? 'در حال پردازش...' : 
               service.status === 'فعال' ? 'دریافت API Key رایگان' : 'به زودی فعال می‌شود'}
            </button>
            
            {apiKey && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-green-800 text-sm">✅ API Key فعال است</p>
                <code className="text-xs text-green-600 block truncate" title={apiKey}>
                  {apiKey.substring(0, 30)}...
                </code>
                <button 
                  onClick={() => navigator.clipboard.writeText(apiKey)}
                  className="mt-2 text-xs text-green-700 hover:text-green-900"
                >
                  کپی
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ویژگی‌ها */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🌟 ویژگی‌های اصلی</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* راهنمای API */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠️ راهنمای استفاده از API</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-3">مراحل فعال‌سازی:</h3>
            <ol className="list-decimal pr-6 space-y-2 text-gray-700">
              <li>روی دکمه "دریافت API Key رایگان" کلیک کنید</li>
              <li>کلید API را در پیام مرورگر کپی کنید</li>
              <li>از نمونه کد زیر برای استفاده استفاده کنید</li>
              <li>برای افزایش محدودیت به پنل کاربری مراجعه کنید</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">نمونه کد:</h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// استفاده از ${service.title}
const response = await fetch('https://api.tetrasaas.ir/v1/${service.apiId}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY_HERE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // پارامترهای سرویس
    input: "متن نمونه برای پردازش",
    language: "fa",
    format: "json"
  })
});

const result = await response.json();
console.log(result);`}
            </pre>
          </div>
        </div>
      </div>

      {/* فوتر */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">
            نیاز به کمک دارید؟{' '}
            <a href="mailto:support@tetrasaas.ir" className="text-blue-600 hover:text-blue-800">
              با پشتیبانی تماس بگیرید
            </a>
          </p>
          <div className="flex gap-4">
            <Link href="/services" className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition">
              ← بازگشت به سرویس‌ها
            </Link>
            <button 
              onClick={requestAPIKey}
              disabled={isRequesting || service.status !== 'فعال'}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:bg-gray-400"
            >
              دریافت API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
