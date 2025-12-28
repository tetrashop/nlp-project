'use client';

import { useState } from 'react';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceFilter from '@/components/services/ServiceFilter';
import { nlpServices, serviceCategories } from '@/app/servicesData';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');

  const filteredServices = nlpServices.filter(service => {
    if (selectedCategory !== 'all' && service.category !== selectedCategory) {
      return false;
    }
    if (selectedPricing !== 'all' && service.pricing !== selectedPricing) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* هدر */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            سرویس‌های پردازش زبان طبیعی
          </h1>
          <p className="text-xl text-center opacity-90 max-w-3xl mx-auto">
            ۲۸ سرویس تخصصی برای تمام نیازهای NLP - از پردازش پایه تا پلتفرم سازمانی
          </p>
          
          {/* آمار */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">{nlpServices.length}</div>
              <div className="text-sm opacity-90">سرویس فعال</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">99.8%</div>
              <div className="text-sm opacity-90">میانگین آپتایم</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm opacity-90">کاربر فعال</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-90">پشتیبانی</div>
            </div>
          </div>
        </div>
      </div>

      {/* فیلترها */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServiceFilter
          selectedCategory={selectedCategory}
          selectedPricing={selectedPricing}
          onCategoryChange={setSelectedCategory}
          onPricingChange={setSelectedPricing}
        />
        
        {/* دسته‌بندی‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(serviceCategories).map(([category, services]) => (
            <div key={category} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 capitalize">{category} سرویس‌ها</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">{services.length}</div>
              <p className="text-gray-600 text-sm">سرویس فعال</p>
            </div>
          ))}
        </div>

        {/* لیست سرویس‌ها */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* اطلاعات پایانی */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            نیاز به سرویس اختصاصی دارید؟
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            تیم ما آماده توسعه سرویس‌های NLP سفارشی برای نیازهای خاص سازمان شماست
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
            درخواست مشاوره رایگان
          </button>
        </div>
      </div>
    </div>
  );
}
