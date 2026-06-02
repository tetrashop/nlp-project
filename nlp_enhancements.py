"""
ماژول پیشرفته NLP فارسی و انگلیسی – بهینه‌شده و بدون وابستگی خارجی
"""

import re
from collections import Counter
from typing import List, Dict
from logger import logger

# ---------- پیش‌کامپایل عبارات منظم (با پشتیبانی از نیم‌فاصله) ----------
_WORD_RE = re.compile(r'[\w\u200c]+', re.UNICODE)   # کلمات شامل نیم‌فاصله
_SENTENCE_SPLIT = re.compile(r'(?<=[.!?؟])\s+')
_MULTISPACE_RE = re.compile(r' +')
_MI_NEMI_RE = re.compile(r'\b(می|نمی)\s+(?=[\w\u200c])')
_PREPOSITION_RE = re.compile(r'\b(به|از|در|با|بر|برای|بی|تا)\s+(?=[\w\u200c])')
_HA_RE = re.compile(r'\b([\w\u200c]+)\s+(ها|های|تر|ترین)\b')
_PUNCTUATION_RE = re.compile(r'[،؛:«»"\'\(\)\[\]\{\}]')

# ---------- لغت‌نامه‌های گسترش‌یافته ----------
_PERSIAN_POSITIVE = {
    "خوب", "عالی", "زیبا", "دوست‌داشتنی", "مثبت", "شاد", "قوی", "محشر",
    "فوق‌العاده", "بی‌نظیر", "لذت‌بخش", "آرامش", "موفق", "پرانرژی", "خوشحال"
}
_PERSIAN_NEGATIVE = {
    "بد", "زشت", "ناراحت", "منفی", "ضعیف", "غمگین", "ترسناک", "وحشتناک",
    "ناراضی", "خسته", "ناامید", "عصبی", "بی‌ارزش", "نگران", "متاسف"
}
_ENGLISH_POSITIVE = {
    "good", "great", "excellent", "happy", "positive", "strong", "fantastic",
    "wonderful", "amazing", "love", "beautiful", "nice", "best", "awesome"
}
_ENGLISH_NEGATIVE = {
    "bad", "terrible", "sad", "negative", "weak", "ugly", "horrible",
    "awful", "hate", "poor", "worst", "disappointed", "angry", "upset"
}

_STOPWORDS = {
    "the", "is", "in", "at", "of", "and", "a", "to", "it", "on", "for", "with",
    "و", "که", "در", "به", "از", "با", "بر", "برای", "تا", "است", "را", "هم",
    "این", "آن", "یک", "خود", "چه", "اما", "یا", "اگر", "همه", "نیز", "بود"
}

# ---------- توابع کمکی ----------
def _normalize(text: str) -> str:
    text = _PUNCTUATION_RE.sub(' ', text)
    text = _MULTISPACE_RE.sub(' ', text)
    return text.strip()

def _tokenize(text: str) -> List[str]:
    return _WORD_RE.findall(text.lower())

# ---------- تحلیل احساسات ----------
def analyze_sentiment(text: str) -> Dict[str, object]:
    if not text or not isinstance(text, str):
        return {"label": "نامشخص", "score": 0.0, "positive": 0, "negative": 0}
    words = set(_tokenize(text))
    pos = sum(1 for w in words if w in _PERSIAN_POSITIVE or w in _ENGLISH_POSITIVE)
    neg = sum(1 for w in words if w in _PERSIAN_NEGATIVE or w in _ENGLISH_NEGATIVE)
    total = pos + neg
    if total == 0:
        score = 0.0
        label = "خنثی"
    else:
        score = round((pos - neg) / total, 3)
        if score > 0.1:
            label = "مثبت"
        elif score < -0.1:
            label = "منفی"
        else:
            label = "خنثی"
    logger.info(f"Sentiment: {label} (score={score}, pos={pos}, neg={neg})")
    return {"label": label, "score": score, "positive": pos, "negative": neg}

# ---------- کلمات کلیدی ----------
def extract_keywords(text: str, top_n: int = 5) -> List[str]:
    if not text:
        return []
    words = _tokenize(text)
    filtered = [w for w in words if w not in _STOPWORDS and len(w) > 2]
    if not filtered:
        return []
    freq = Counter(filtered)
    max_freq = max(freq.values())
    scored = {w: (freq[w] / max_freq) * len(w) for w in freq}
    top = sorted(scored, key=scored.get, reverse=True)[:top_n]
    logger.info(f"Keywords: {top}")
    return top

# ---------- خلاصه‌سازی ----------
def extractive_summary(text: str, num_sentences: int = 3) -> str:
    if not text:
        return ""
    sentences = _SENTENCE_SPLIT.split(text)
    if len(sentences) <= num_sentences:
        return text
    all_words = _tokenize(text)
    word_freq = Counter(all_words)
    max_freq = max(word_freq.values(), default=1)
    word_weights = {w: f / max_freq for w, f in word_freq.items()}
    sent_scores = {}
    for i, sent in enumerate(sentences):
        sent_words = _tokenize(sent)
        tf_score = sum(word_weights.get(w, 0) for w in sent_words)
        position_score = 1.0 if i == 0 else 0.8
        sent_scores[sent] = tf_score * position_score
    best = sorted(sent_scores, key=sent_scores.get, reverse=True)[:num_sentences]
    summary = " ".join([s for s in sentences if s in best])
    logger.info(f"Summary: {num_sentences} sentences extracted.")
    return summary

# ---------- تصحیح فاصله فارسی ----------
def fix_persian_spacing(text: str) -> str:
    if not text:
        return text
    text = _MULTISPACE_RE.sub(' ', text)
    text = _MI_NEMI_RE.sub(r'\1‌', text)
    text = _PREPOSITION_RE.sub(r'\1‌', text)
    text = _HA_RE.sub(r'\1‌\2', text)
    return text.strip()
