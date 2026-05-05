import logging
import sys

def setup_logger(name: str='nlp_project', level: int=logging.INFO) -> logging.Logger:
    """پیکربندی و بازگرداندن logger استاندارد پروژه"""
    logger = logging.getLogger(name)
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
        logger.addHandler(handler)
    logger.setLevel(level)
    return logger

def main():
    try:
        'ماژول logger - توسعه\u200cیافتهٔ خودکار'
        logger = setup_logger()
    except Exception as e:
        logger.error('خطا در اجرای main:', e)
if __name__ == '__main__':
    main()