<p dir="rtl" align="right">پروژهٔ جامع NLP فارسی و انگلیسی</p>

## چکیده
این پروژه حاصل توسعهٔ خودکار یک مخزن پایهٔ NLP با رویکرد تحلیل متن فارسی و انگلیسی است. بدون نیاز به کتابخانه‌های خارجی، الگوریتم‌های تحلیل احساسات، خلاصه‌سازی، کلمات کلیدی و تصحیح فاصله‌گذاری فارسی به‌همراه سیستم logging و مدیریت پیکربندی افزوده شد. تمام مراحل توسعه در Termux و بدون اینترنت پایدار انجام پذیرفت.

## ۱. مقدمه
مخزن اصلی از `https://github.com/tetrashop/nlp-project.git` دریافت شد. پس از بررسی، نیاز به ارتقای ساختاری و افزودن قابلیت‌های حرفه‌ای NLP وجود داشت.

## ۲. روش‌شناسی
- جمع‌آوری تمام فایل‌های کد در یک فایل متنی.
- اشکال‌یابی نحوی با `ast` و `bash -n`.
- بهینه‌سازی خودکار کد (حذف else زائد، تبدیل به list comprehension، f-string).
- تزریق ماژول‌های جدید: `logger.py`, `config.py`, `nlp_enhancements.py`.
- ارتقای تمام فایل‌های `.py` (docstring، logging، main/try-except).
- ادغام با شاخهٔ `enhanced` و سپس `main`.

## ۳. خطاهای رخ‌داده و راه‌حل‌ها
| خطا | علت | راه‌حل |
|------|------|--------|
| `ImportError: cannot import name 'logger'` | تزریق اشتباه import در خود logger | افزودن شرط عدم تزریق در `logger.py` |
| `FileNotFoundError: './nlp-project'` | مسیر نادرست SRC_DIR | تغییر به `SRC_DIR="."` |
| `cp: cannot stat '../nlp_project_enhanced/*'` | استفاده از مسیر نسبی اشتباه | استفاده از `~` |
| نبود linterها به دلیل تحریم | اینترنت ناپایدار | پیاده‌سازی بررسی‌کننده با `ast` |
| عدم شناسایی bash در Termux | مسیر غیراستاندارد bash | استفاده از `which bash` |

## ۴. دستاوردها
- مخزن NLP عملیاتی با ۲۲۵۷ فایل و ۳ ماژول اصلی.
- الگوریتم‌های بومی: تحلیل احساسات، خلاصه‌سازی، کلمات کلیدی، تصحیح نگارش.
- زیرساخت استاندارد: logging، config، ساختار `main` + `try/except`.
- کاملاً قابل اجرا روی Termux بدون کتابخانهٔ اضافی.

## ۵. ساختار پروژه
```

├── logger.py
├── config.py
├── nlp_enhancements.py
├── config.json
├── README.md
└── (سایر فایل‌های اصلی)

```

## ۶. نحوهٔ استفاده
```python
from nlp_enhancements import analyze_sentiment, fix_persian_spacing
text = "این فیلم عالی بود."
print(analyze_sentiment(text))
```

۷. قدردانی

با تشکر از توسعه‌دهندگان مخزن اصلی و جامعهٔ Termux.

---

<p dir="rtl" align="center">ساخته‌شده با 💻 + ☕ در Termux | بهار ۱۴۰۵</p>

## 🌐 نسخهٔ زنده
[مشاهده پروژه NLP](https://tetrashop.github.io/nlp-project)
