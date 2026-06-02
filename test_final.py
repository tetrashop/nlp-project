from logger import logger
from nlp_enhancements import analyze_sentiment, extractive_summary, extract_keywords, fix_persian_spacing

text = 'این محصول خیلی خوب و عالی است. اما قیمت آن بد و ناراحت‌کننده می باشد. در کل تجربه مثبت بود.'
print('تحلیل احساسات:', analyze_sentiment(text))
print('کلمات کلیدی:', extract_keywords(text))
print('خلاصه:', extractive_summary(text, num_sentences=2))
print('تصحیح فاصله:', fix_persian_spacing('می خواهم   به  خانه  بروم'))
