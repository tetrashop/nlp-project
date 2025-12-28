'use client'; // این صفحه یک کامپوننت کلاینت است

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjectById } from '@/app/nlpData'; // فرض می‌کنیم این تابع وجود دارد

// این تابع، کامپوننت اصلی و پیش‌فرض صفحه است
export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id ? Number(params.id) : null;

  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها
    const loadProject = () => {
      if (!projectId) {
        setIsLoading(false);
        return;
      }
      // استفاده از داده موقت
      const foundProject = getProjectById(projectId);
      setProject(foundProject);
      setIsLoading(false);
    };
    loadProject();
  }, [projectId]);

  // تابع نمونه برای درخواست کلید API
  const handleRequestAPI = async () => {
    if (!project) return;
    alert(`درخواست API برای پروژه "${project.title}" ثبت شد. (این یک شبیه‌سازی است)`);
    // در اینجا می‌توانید منطق فراخوانی API واقعی را قرار دهید
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="text-2xl">در حال بارگذاری جزئیات پروژه...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="text-2xl text-red-600">پروژه یافت نشد</div>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← بازگشت به لیست پروژه‌ها
        </button>
      </div>
    );
  }

  // صفحه اصلی رندر شده
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">خانه</Link>
        {' > '}
        <Link href="/nlp" className="hover:text-blue-600">پروژه‌های NLP</Link>
        {' > '}
        <span className="font-medium text-gray-900">{project.title}</span>
      </nav>

      {/* هدر پروژه */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{project.description}</p>

        {/* دکمه درخواست API */}
        <div className="mb-8">
          <button
            onClick={handleRequestAPI}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            درخواست API Key رایگان
          </button>
          <p className="text-sm text-gray-500 mt-2">با کلیک روی دکمه، یک کلید API آزمایشی برای این پروژه دریافت خواهید کرد.</p>
        </div>

        {/* اطلاعات کلی پروژه */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-gray-500 mb-1">👤 نویسنده</div>
            <div className="font-medium">{project.author}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-gray-500 mb-1">🏷️ دسته‌بندی</div>
            <div className="font-medium">{project.category}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-gray-500 mb-1">⭐ امتیاز</div>
            <div className="font-medium">{project.rating?.toFixed(1) || 'N/A'}/5</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-gray-500 mb-1">📊 پیشرفت</div>
            <div className="font-medium">{project.progress || 0}%</div>
          </div>
        </div>
      </header>

      {/* بخش اصلی محتوا */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 توضیحات کامل</h2>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </section>
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 ویژگی‌ها</h2>
            <ul className="space-y-3">
              {project.features?.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{feature}</span>
                </li>
              )) || <li className="text-gray-500">هیچ ویژگی‌ای ثبت نشده است.</li>}
            </ul>
          </section>
        </div>

        {/* نوار کناری */}
        <div className="space-y-8">
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 اقدامات</h2>
            <div className="space-y-4">
              <Link href="/nlp" className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">بازگشت به لیست پروژه‌ها</Link>
              <button onClick={() => router.back()} className="block w-full text-center px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition">بازگشت به صفحه قبل</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
