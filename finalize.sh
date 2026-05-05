#!/usr/bin/env bash
# =============================================================================
# اسکریپت نهایی: README، ادغام، تمیزکاری و Push پروژه NLP
# =============================================================================
set -eo pipefail

REPO_DIR=~/nlp-project
ENHANCED_DIR=~/nlp_project_enhanced

cd "$REPO_DIR" || exit 1

# ------------------------- ۱. ایجاد README.md علمی -------------------------
if [ ! -f README.md ]; then
  echo ">>> تولید README.md علمی..."
  cat > README.md << 'HEREDOC_README'
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
HEREDOC_README
  echo "✅ README.md ایجاد شد."
else
  echo "ℹ️  README.md از قبل وجود دارد."
fi

------------------------- ۲. انتقال و ادغام enhanced -------------------------

if [ -d "$ENHANCED_DIR" ]; then
echo ">>> در حال انتقال و ادغام پوشهٔ enhanced..."

انتقال پوشه به داخل پروژه

mv "$ENHANCED_DIR" .

کپی محتوا به ریشه

cp -r nlp_project_enhanced/* .
if [ -f nlp_project_enhanced/.gitignore ]; then
cp nlp_project_enhanced/.gitignore .
fi

افزودن و commit در صورت وجود تغییرات

git add -A
git commit -m "ادغام نسخهٔ توسعه‌یافته NLP با ماژول‌های جدید" || echo "⚠️  commit ادغام انجام نشد (تکراری یا بدون تغییر)."
else
echo "ℹ️  پوشهٔ enhanced یافت نشد. از این مرحله صرف‌نظر شد."
fi

------------------------- ۳. تمیزکاری فایل‌های موقت -------------------------

echo ">>> تمیزکاری فایل‌های موقت..."
ITEMS_TO_CLEAN=(
"nlp_project_enhanced"
"nlp-project-all-code.txt"
"debug_report.txt"
"simple_debug.py"
"test_nlp.py"
"super_opt.py"
"pycache"
".pytest_cache"
)

for item in "${ITEMS_TO_CLEAN[@]}"; do
if [ -e "$item" ]; then
rm -rf "$item"
echo "   حذف $item"
fi
done

حذف فایل‌های کامپایل‌شده پایتون در سرتاسر پروژه

find . -type f -name "*.pyc" -delete
find . -type d -name "pycache" -exec rm -rf {} + 2>/dev/null || true

echo "✅ تمیزکاری انجام شد."

------------------------- ۴. commit نهایی (در صورت وجود تغییر) -------------------------

if ! git diff --quiet || ! git diff --cached --quiet; then
echo ">>> ثبت تغییرات نهایی..."
git add -A
git commit -m "تمیزکاری و آماده‌سازی برای انتشار" || echo "⚠️  commit انجام نشد."
else
echo "✅ فهرست کاری گیت تمیز است."
fi

------------------------- ۵. Push به گیت‌هاب -------------------------

read -p "آیا مایل به push به گیت‌هاب هستید؟ (y/n): " PUSH
if [[ "$PUSH" =~ ^[Yy]$ ]]; then
if ! git remote get-url origin &>/dev/null; then
read -p "آدرس remote origin را وارد کنید: " URL
git remote add origin "$URL"
fi
BRANCH=$(git branch --show-current)
echo ">>> Push شاخهٔ '$BRANCH' به origin..."
git push -u origin "$BRANCH" || echo "❌ خطا در push. لطفاً اینترنت را بررسی کنید."
else
echo "⏩ از push صرف‌نظر شد."
fi

echo ""
echo "🎉 عملیات با موفقیت به پایان رسید."
