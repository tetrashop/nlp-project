'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLatestProjects } from '@/app/nlpData';
import { nlpServices } from '@/app/servicesData';

export default function HomePage() {
  const [latestProjects, setLatestProjects] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 256,
    totalServices: 28,
    activeUsers: 15420,
    uptime: 99.9
  });

  useEffect(() => {
    const projects = getLatestProjects(3);
    setLatestProjects(projects);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* هیرو */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🚀 پلتفرم <span className="text-yellow-300">TetraSaaS v3.0</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            بزرگترین مجموعه هوش مصنوعی فارسی
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            <span className="font-bold text-3xl">۲۵۶ پروژه</span> پردازش زبان طبیعی، 
            <span className="font-bold text-3xl mx-4">۲۸ سرویس</span> API آماده و 
            <span className="font-bold text-3xl mx-4">۱۵٬۰۰۰+</span> کاربر فعال
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/nlp" 
              className="px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-2xl hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl"
            >
              🧠 مشاهده ۲۵۶ پروژه NLP
            </Link>
            <Link 
              href="/services" 
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition transform hover:scale-105 shadow-2xl"
            >
              ⚡ ۲۸ سرویس AI
            </Link>
          </div>
        </div>
      </div>

      {/* آمار */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-blue-100">
            <div className="text-5xl font-bold text-blue-600 mb-2">۲۵۶</div>
            <div className="text-gray-700 font-semibold">پروژه NLP</div>
            <div className="text-sm text-gray-500 mt-2">کامل‌ترین مجموعه فارسی</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-purple-100">
            <div className="text-5xl font-bold text-purple-600 mb-2">۲۸</div>
            <div className="text-gray-700 font-semibold">سرویس AI</div>
            <div className="text-sm text-gray-500 mt-2">API آماده استفاده</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-green-100">
            <div className="text-5xl font-bold text-green-600 mb-2">۱۵K+</div>
            <div className="text-gray-700 font-semibold">کاربر فعال</div>
            <div className="text-sm text-gray-500 mt-2">در ۳۰ روز گذشته</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
            <div className="text-5xl font-bold text-red-600 mb-2">۹۹.۹٪</div>
            <div className="text-gray-700 font-semibold">آپ‌تایم</div>
            <div className="text-sm text-gray-500 mt-2">پایدار و مطمئن</div>
          </div>
        </div>
      </div>

      {/* پروژه‌های ویژه */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          🚀 پروژه‌های ویژه امروز
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestProjects.map((project, index) => (
            <div key={project.id} className={`
              bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border-2
              ${index === 0 ? 'border-yellow-400' : 
                index === 1 ? 'border-blue-400' : 'border-green-400'}
              hover:shadow-2xl transition-all duration-300
            `}>
              <div className="flex justify-between items-start mb-4">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-bold
                  ${index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                    index === 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                `}>
                  {index === 0 ? 'ویژه #۱' : 
                   index === 1 ? 'محبوب #۱۲۵' : 'جدید #۲۵۶'}
                </span>
                <span className="text-2xl">
                  {index === 0 ? '🏆' : index === 1 ? '⭐' : '🆕'}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                پروژه {project.id}: {project.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-500">پیشرفت: {project.progress}%</span>
                </div>
                <Link 
                  href={`/nlp/${project.id}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition"
                >
                  مشاهده پروژه →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* سرویس‌ها */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          ⚡ سرویس‌های هوش مصنوعی
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {nlpServices.slice(0, 4).map((service, index) => (
            <div key={service.id} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
              <div className="text-3xl mb-4">
                {['🗣️', '🔤', '😊', '📷'][index]}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                استفاده از API →
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition"
          >
            مشاهده همه ۲۸ سرویس ⚡
          </Link>
        </div>
      </div>

      {/* وضعیت API */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-6">🌐 وضعیت API اصلی</h3>
          
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-medium">آنلاین و فعال</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">۲۵۶</div>
              <div className="text-sm opacity-90">پروژه‌ها</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">۲۸</div>
              <div className="text-sm opacity-90">سرویس‌ها</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">۹۹.۹٪</div>
              <div className="text-sm opacity-90">پاسخ‌گویی</div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4 max-w-xl mx-auto mb-8 text-left font-mono text-sm">
            <div className="text-green-400">$ curl https://tetrashop-projects.vercel.app/api/health</div>
            <div className="text-gray-300 mt-2">{`{"version": "3.0.0", "status": "✅ فعال با ۲۵۶ پروژه NLP کامل"}`}</div>
          </div>
        </div>
      </div>

      {/* CTA پایانی */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          آماده شروع هستید؟
        </h3>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          همین حالا اولین پروژه NLP را اجرا کنید یا از سرویس‌های آماده API استفاده نمایید.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link 
            href="/nlp/1"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:from-green-600 hover:to-emerald-700 transition transform hover:scale-105"
          >
            🚀 شروع با پروژه اول
          </Link>
          <Link 
            href="/services"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition transform hover:scale-105"
          >
            ⚡ مشاهده سرویس‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}
