'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchProjects, getAllProjects, NLPProject } from '@/app/nlpData';
import NLPProjectCard from '@/components/nlp/NLPProjectCard';
import SearchBar from '@/components/nlp/SearchBar';
import CategoryFilter from '@/components/nlp/CategoryFilter';

export default function NLPProjectsPage() {
  const [projects, setProjects] = useState<NLPProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<NLPProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [showOnlyWithAPI, setShowOnlyWithAPI] = useState(false);

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده
    const loadProjects = () => {
      const allProjects = getAllProjects();
      setProjects(allProjects);
      setFilteredProjects(allProjects);
      setLoading(false);
    };
    
    setTimeout(loadProjects, 500);
  }, []);

  useEffect(() => {
    let results = projects;
    
    // فیلتر بر اساس جستجو
    if (searchQuery.trim()) {
      results = searchProjects(searchQuery);
    }
    
    // فیلتر بر اساس دسته‌بندی
    if (selectedCategory !== 'همه') {
      results = results.filter(project => 
        project.category === selectedCategory
      );
    }
    
    // فیلتر بر اساس دسترسی API
    if (showOnlyWithAPI) {
      results = results.filter(project => project.apiKeyRequired);
    }
    
    setFilteredProjects(results);
  }, [searchQuery, selectedCategory, showOnlyWithAPI, projects]);

  // استخراج دسته‌بندی‌های منحصربفرد - رفع خطای Set
  const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
  const categories = ['همه', ...uniqueCategories];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">در حال بارگذاری پروژه‌ها...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* هدر صفحه */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            پروژه‌های پردازش زبان طبیعی (NLP)
          </h1>
          <p className="text-xl text-center opacity-90 max-w-3xl mx-auto">
            مجموعه‌ای جامع از پروژه‌های هوش مصنوعی در حوزه پردازش زبان فارسی و انگلیسی
          </p>
          
          {/* نوار جستجو */}
          <div className="mt-8 max-w-2xl mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="جستجو در بین ۲۵۶ پروژه NLP..."
            />
          </div>
        </div>
      </header>

      {/* فیلترها */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-4 justify-between items-center bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyWithAPI}
                onChange={(e) => setShowOnlyWithAPI(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">فقط پروژه‌های با API</span>
            </label>
          </div>
          
          <div className="text-gray-600">
            <span className="font-semibold text-blue-600">{filteredProjects.length}</span> پروژه یافت شد
          </div>
        </div>

        {/* نمایش پروژه‌ها */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">پروژه‌ای یافت نشد</h3>
            <p className="text-gray-600">لطفا عبارت جستجوی خود را تغییر دهید یا فیلترها را بازنشانی کنید</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('همه');
                setShowOnlyWithAPI(false);
              }}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              بازنشانی همه فیلترها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <NLPProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* پانوشت اطلاعات */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              نمایش <span className="font-bold">{filteredProjects.length}</span> از{' '}
              <span className="font-bold">{projects.length}</span> پروژه
            </p>
            <p className="text-sm">
              آخرین پروژه: شماره ۲۵۶ - سامانه هوشمند پاسخ‌گویی به پرسش‌های پیچیده
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
