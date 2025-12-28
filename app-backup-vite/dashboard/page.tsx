'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, Server, Users, DollarSign, 
  TrendingUp, Shield, Zap, Clock 
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeUsers: 0,
    totalRevenue: 0,
    uptime: 0
  });

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده
    const loadStats = () => {
      setStats({
        totalRequests: 12500000,
        activeUsers: 28500,
        totalRevenue: 950000,
        uptime: 99.87
      });
    };
    
    setTimeout(loadStats, 1000);
  }, []);

  const services = [
    { id: 1, name: 'Text API', status: 'active', requests: 4500000, users: 8500 },
    { id: 2, name: 'Sentiment API', status: 'active', requests: 3200000, users: 6200 },
    { id: 3, name: 'Translation API', status: 'active', requests: 2800000, users: 5200 },
    { id: 28, name: 'Enterprise Platform', status: 'active', requests: 2000000, users: 150 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* هدر داشبورد */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">پنل مدیریت سرویس‌ها</h1>
          <p className="text-gray-300">مدیریت ۲۸ سرویس NLP و نظارت بر عملکرد</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* کارت‌های آماری */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+12.5%</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              {stats.totalRequests.toLocaleString()}
            </div>
            <div className="text-gray-500">کل درخواست‌ها</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+8.3%</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              {stats.activeUsers.toLocaleString()}
            </div>
            <div className="text-gray-500">کاربران فعال</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+22.1%</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-gray-500">درآمد کل</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Server className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+0.07%</span>
            </div>
            <div className="text-3xl font-bold mb-1">
              {stats.uptime}%
            </div>
            <div className="text-gray-500">میانگین آپتایم</div>
          </div>
        </div>

        {/* جدول سرویس‌ها */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">سرویس‌های فعال</h2>
            <p className="text-gray-600 text-sm">لیست ۲۸ سرویس NLP پلتفرم</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    سرویس
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    درخواست‌ها
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    کاربران
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    اقدامات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {service.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {service.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full ml-1"></div>
                        فعال
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.requests.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.users.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 ml-4">
                        جزئیات
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        گزارش
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                نمایش ۴ از ۲۸ سرویس
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                مشاهده همه سرویس‌ها
              </button>
            </div>
          </div>
        </div>

        {/* کارت‌های عملکرد */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* کارت عملکرد API */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">عملکرد API</h3>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>روند مثبت</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'میانگین پاسخ', value: '86ms', change: '-12ms' },
                { label: 'موفقیت درخواست', value: '99.4%', change: '+0.2%' },
                { label: 'خطای سرور', value: '0.03%', change: '-0.01%' },
                { label: 'پهنای باند', value: '4.2TB', change: '+15%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-gray-600">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{item.value}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.change.startsWith('+') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* کارت وضعیت امنیتی */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">وضعیت امنیتی</h3>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Shield className="h-4 w-4" />
                <span>امن</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'درخواست‌های مشکوک', value: '124', status: 'low' },
                { label: 'حملات شناسایی شده', value: '8', status: 'medium' },
                { label: 'فایل‌های مخرب', value: '0', status: 'low' },
                { label: 'لاگ‌های امنیتی', value: '2.4M', status: 'normal' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-gray-600">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{item.value}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      item.status === 'low' ? 'bg-green-500' :
                      item.status === 'medium' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
