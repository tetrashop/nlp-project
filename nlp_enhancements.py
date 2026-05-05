import re
import string
from collections import Counter
from logger import logger

def analyze_sentiment(text: str) -> dict:
    """تابع analyze_sentiment (توسعه\u200cیافتهٔ خودکار)"""
    words = set(re.findall('\\w+', text.lower()))
    pos = len(words & _PERSIAN_POSITIVE) + len(words & _ENGLISH_POSITIVE)
    neg = len(words & _PERSIAN_NEGATIVE) + len(words & _ENGLISH_NEGATIVE)
    total = pos + neg
    score = (pos - neg) / max(total, 1)
    if score > 0.1:
        label = 'مثبت'
    elif score < -0.1:
        label = 'منفی'
    else:
        label = 'خنثی'
    logger.info(f'Sentiment analysis: {label} (score={score:.2f})')
    return {'label': label, 'score': score, 'positive': pos, 'negative': neg}

def extractive_summary(text: str, num_sentences: int=3) -> str:
    """تابع extractive_summary (توسعه\u200cیافتهٔ خودکار)"""
    sentences = re.split('(?<=[.!?؟])\\s+', text)
    if len(sentences) <= num_sentences:
        return text
    words = re.findall('\\w+', text.lower())
    word_freq = Counter(words)
    max_freq = max(word_freq.values(), default=1)
    word_weights = {w: f / max_freq for w, f in word_freq.items()}
    sent_scores = {}
    for sent in sentences:
        sent_words = re.findall('\\w+', sent.lower())
        score = sum((word_weights.get(w, 0) for w in sent_words))
        sent_scores[sent] = score
    best = sorted(sent_scores, key=sent_scores.get, reverse=True)[:num_sentences]
    summary = ' '.join([s for s in sentences if s in best])
    logger.info(f'Summary generated ({num_sentences} sentences).')
    return summary

def extract_keywords(text: str, top_n: int=5) -> list:
    """تابع extract_keywords (توسعه\u200cیافتهٔ خودکار)"""
    words = re.findall('\\w+', text.lower())
    stopwords = {'the', 'is', 'in', 'at', 'of', 'و', 'که', 'در', 'به', 'از', 'با'}
    filtered = [w for w in words if w not in stopwords and len(w) > 2]
    freq = Counter(filtered)
    scored = {w: freq[w] * len(w) for w in freq}
    top = sorted(scored, key=scored.get, reverse=True)[:top_n]
    logger.info(f'Keywords extracted: {top}')
    return top

def fix_persian_spacing(text: str) -> str:
    """تابع fix_persian_spacing (توسعه\u200cیافتهٔ خودکار)"""
    text = re.sub(' +', ' ', text)
    text = re.sub('\\b(می|نمی)\\s+', '\\1\u200c', text)
    text = re.sub('\\b(به|از|در|با)\\s+', '\\1\u200c', text)
    return text

def main():
    try:
        'ماژول پیشرفتهٔ NLP با الگوریتم\u200cهای پایه (بدون وابستگی خارجی)'
        _PERSIAN_POSITIVE = {'خوب', 'عالی', 'زیبا', 'دوست\u200cداشتنی', 'مثبت', 'شاد', 'قوی'}
        _PERSIAN_NEGATIVE = {'بد', 'زشت', 'ناراحت', 'منفی', 'ضعیف', 'غمگین', 'ترسناک'}
        _ENGLISH_POSITIVE = {'good', 'great', 'excellent', 'happy', 'positive', 'strong'}
        _ENGLISH_NEGATIVE = {'bad', 'terrible', 'sad', 'negative', 'weak', 'ugly'}
    except Exception as e:
        logger.error('خطا در اجرای main:', e)
if __name__ == '__main__':
    main()