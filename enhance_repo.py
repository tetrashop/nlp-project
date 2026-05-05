"""
اسکریپت توسعهٔ مخزن NLP – ارتقای ساختاری و افزودن قابلیت\u200cهای جدید
مناسب برای Termux / بدون نیاز به اینترنت
"""
import ast
import os
import re
import shutil
from pathlib import Path
SRC_DIR = '.'
DEST_DIR = '../nlp_project_enhanced'
BACKUP_DIR = './nlp_project_backup'
NEW_MODULES = {'logger.py': '\nimport logging\nimport sys\n\ndef setup_logger(name: str = "nlp_project", level: int = logging.INFO) -> logging.Logger:\n    """پیکربندی و بازگرداندن logger استاندارد پروژه"""\n    logger = logging.getLogger(name)\n    if not logger.handlers:\n        handler = logging.StreamHandler(sys.stdout)\n        handler.setFormatter(logging.Formatter(\n            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"\n        ))\n        logger.addHandler(handler)\n    logger.setLevel(level)\n    return logger\n\n# Logger پیش\u200cفرض پروژه\nlogger = setup_logger()\n'.strip(), 'config.py': '\nimport json\nimport os\nfrom pathlib import Path\n\nDEFAULT_CONFIG = {\n    "language": "fa",\n    "max_length": 512,\n    "enable_cache": True,\n    "log_level": "INFO"\n}\n\nclass Config:\n    """مدیریت پیکربندی پروژه از فایل config.json"""\n    def __init__(self, config_path: str = "config.json"):\n        self.config_path = Path(config_path)\n        self.data = DEFAULT_CONFIG.copy()\n        self.load()\n\n    def load(self):\n        if self.config_path.exists():\n            try:\n                with open(self.config_path, "r", encoding="utf-8") as f:\n                    user_config = json.load(f)\n                self.data.update(user_config)\n            except Exception:\n                pass\n\n    def save(self):\n        with open(self.config_path, "w", encoding="utf-8") as f:\n            json.dump(self.data, f, indent=2, ensure_ascii=False)\n\n    def __getitem__(self, key):\n        return self.data[key]\n\n    def __setitem__(self, key, value):\n        self.data[key] = value\n\nconfig = Config()\n'.strip(), 'nlp_enhancements.py': '\n"""ماژول پیشرفتهٔ NLP با الگوریتم\u200cهای پایه (بدون وابستگی خارجی)"""\n\nimport re\nimport string\nfrom collections import Counter\nfrom logger import logger\n\n# ------------------------------------------------------------\n# ۱. تحلیل احساسات مبتنی بر لغت\u200cنامه (فارسی و انگلیسی)\n# ------------------------------------------------------------\n_PERSIAN_POSITIVE = {"خوب", "عالی", "زیبا", "دوست\u200cداشتنی", "مثبت", "شاد", "قوی"}\n_PERSIAN_NEGATIVE = {"بد", "زشت", "ناراحت", "منفی", "ضعیف", "غمگین", "ترسناک"}\n_ENGLISH_POSITIVE = {"good", "great", "excellent", "happy", "positive", "strong"}\n_ENGLISH_NEGATIVE = {"bad", "terrible", "sad", "negative", "weak", "ugly"}\n\ndef analyze_sentiment(text: str) -> dict:\n    words = set(re.findall(r\'\\w+\', text.lower()))\n    pos = len(words & _PERSIAN_POSITIVE) + len(words & _ENGLISH_POSITIVE)\n    neg = len(words & _PERSIAN_NEGATIVE) + len(words & _ENGLISH_NEGATIVE)\n    total = pos + neg\n    score = (pos - neg) / max(total, 1)\n    if score > 0.1:\n        label = "مثبت"\n    elif score < -0.1:\n        label = "منفی"\n    else:\n        label = "خنثی"\n    logger.info(f"Sentiment analysis: {label} (score={score:.2f})")\n    return {"label": label, "score": score, "positive": pos, "negative": neg}\n\ndef extractive_summary(text: str, num_sentences: int = 3) -> str:\n    sentences = re.split(r\'(?<=[.!?؟])\\s+\', text)\n    if len(sentences) <= num_sentences:\n        return text\n    words = re.findall(r\'\\w+\', text.lower())\n    word_freq = Counter(words)\n    max_freq = max(word_freq.values(), default=1)\n    word_weights = {w: f/max_freq for w, f in word_freq.items()}\n    sent_scores = {}\n    for sent in sentences:\n        sent_words = re.findall(r\'\\w+\', sent.lower())\n        score = sum(word_weights.get(w, 0) for w in sent_words)\n        sent_scores[sent] = score\n    best = sorted(sent_scores, key=sent_scores.get, reverse=True)[:num_sentences]\n    summary = " ".join([s for s in sentences if s in best])\n    logger.info(f"Summary generated ({num_sentences} sentences).")\n    return summary\n\ndef extract_keywords(text: str, top_n: int = 5) -> list:\n    words = re.findall(r\'\\w+\', text.lower())\n    stopwords = {"the", "is", "in", "at", "of", "و", "که", "در", "به", "از", "با"}\n    filtered = [w for w in words if w not in stopwords and len(w) > 2]\n    freq = Counter(filtered)\n    scored = {w: freq[w] * len(w) for w in freq}\n    top = sorted(scored, key=scored.get, reverse=True)[:top_n]\n    logger.info(f"Keywords extracted: {top}")\n    return top\n\ndef fix_persian_spacing(text: str) -> str:\n    text = re.sub(r\' +\', \' \', text)\n    text = re.sub(r\'\\b(می|نمی)\\s+\', r\'\\1\u200c\', text)\n    text = re.sub(r\'\\b(به|از|در|با)\\s+\', r\'\\1\u200c\', text)\n    return text\n'.strip()}

class CodeEnhancer(ast.NodeTransformer):
    """ارتقای کد: docstring، try-except، logging"""

    def __init__(self, module_name: str):
        """تابع __init__ (توسعه\u200cیافتهٔ خودکار)"""
        self.module_name = module_name
        self.current_function = None

    def visit_Module(self, node):
        """تابع visit_Module (توسعه\u200cیافتهٔ خودکار)"""
        self.generic_visit(node)
        if not node.body or not isinstance(node.body[0], ast.Expr) or (not isinstance(node.body[0].value, ast.Constant)):
            doc = ast.Expr(value=ast.Constant(value=f'ماژول {self.module_name} - توسعه\u200cیافتهٔ خودکار'))
            node.body.insert(0, doc)
        return node

    def visit_FunctionDef(self, node):
        """تابع visit_FunctionDef (توسعه\u200cیافتهٔ خودکار)"""
        self.current_function = node.name
        self.generic_visit(node)
        if not node.body or not isinstance(node.body[0], ast.Expr) or (not isinstance(node.body[0].value, ast.Constant)):
            doc = ast.Expr(value=ast.Constant(value=f'تابع {node.name} (توسعه\u200cیافتهٔ خودکار)'))
            node.body.insert(0, doc)
        self.current_function = None
        return node

    def visit_Call(self, node):
        """تابع visit_Call (توسعه\u200cیافتهٔ خودکار)"""
        if isinstance(node.func, ast.Name) and node.func.id == 'print':
            new_func = ast.Attribute(value=ast.Name(id='logger', ctx=ast.Load()), attr='info', ctx=ast.Load())
            return ast.Call(func=new_func, args=node.args, keywords=node.keywords)
        return self.generic_visit(node)

def wrap_main_with_try_except(tree: ast.AST) -> ast.AST:
    """تابع wrap_main_with_try_except (توسعه\u200cیافتهٔ خودکار)"""
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef) and node.name == 'main':
            try_body = node.body
            except_handler = ast.ExceptHandler(type=ast.Name(id='Exception', ctx=ast.Load()), name='e', body=[ast.Expr(value=ast.Call(func=ast.Attribute(value=ast.Name(id='logger', ctx=ast.Load()), attr='error', ctx=ast.Load()), args=[ast.Constant(value='خطا در اجرای main:'), ast.Name(id='e', ctx=ast.Load())], keywords=[]))])
            try_stmt = ast.Try(body=try_body, handlers=[except_handler], orelse=[], finalbody=[])
            node.body = [try_stmt]
            break
    return tree

def ensure_main_block(tree: ast.AST) -> ast.AST:
    """تابع ensure_main_block (توسعه\u200cیافتهٔ خودکار)"""
    has_ifmain = any((isinstance(node, ast.If) and isinstance(node.test, ast.Compare) and isinstance(node.test.left, ast.Name) and (node.test.left.id == '__name__') and isinstance(node.test.ops[0], ast.Eq) and isinstance(node.test.comparators[0], ast.Constant) and (node.test.comparators[0].value == '__main__') for node in ast.iter_child_nodes(tree)))
    if not has_ifmain:
        ifmain = ast.If(test=ast.Compare(left=ast.Name(id='__name__', ctx=ast.Load()), ops=[ast.Eq()], comparators=[ast.Constant(value='__main__')]), body=[ast.Expr(value=ast.Call(func=ast.Name(id='main', ctx=ast.Load()), args=[], keywords=[]))], orelse=[])
        tree.body.append(ifmain)
    return tree

def ensure_main_function(tree: ast.AST) -> ast.AST:
    """تابع ensure_main_function (توسعه\u200cیافتهٔ خودکار)"""
    has_main = any((isinstance(node, ast.FunctionDef) and node.name == 'main' for node in ast.walk(tree)))
    if has_main:
        return tree
    imports = [n for n in tree.body if isinstance(n, (ast.Import, ast.ImportFrom))]
    top_level = [n for n in tree.body if not isinstance(n, (ast.Import, ast.ImportFrom, ast.FunctionDef, ast.ClassDef))]
    definitions = [n for n in tree.body if isinstance(n, (ast.FunctionDef, ast.ClassDef))]
    if not top_level:
        return tree
    main_func = ast.FunctionDef(name='main', args=ast.arguments(posonlyargs=[], args=[], vararg=None, kwonlyargs=[], kw_defaults=[], kwarg=None, defaults=[]), body=top_level, decorator_list=[], returns=None)
    new_body = imports + definitions + [main_func]
    tree.body = new_body
    return tree

def enhance_file(file_path: Path, dest_path: Path):
    """تابع enhance_file (توسعه\u200cیافتهٔ خودکار)"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            source = f.read()
    except Exception:
        logger.info(f'  [!] رد شد (خواندن): {file_path}')
        shutil.copy2(file_path, dest_path)
        return
    try:
        tree = ast.parse(source, filename=str(file_path))
    except SyntaxError:
        logger.info(f'  [!] خطای نحوی؛ کپی بدون تغییر: {file_path}')
        shutil.copy2(file_path, dest_path)
        return
    enhancer = CodeEnhancer(module_name=file_path.stem)
    tree = enhancer.visit(tree)
    tree = ensure_main_function(tree)
    tree = ensure_main_block(tree)
    tree = wrap_main_with_try_except(tree)
    ast.fix_missing_locations(tree)
    try:
        new_source = ast.unparse(tree)
    except Exception:
        logger.info(f'  [!] خطا در unparse؛ کپی بدون تغییر: {file_path}')
        shutil.copy2(file_path, dest_path)
        return
    if 'logger.' in new_source and 'import logger' not in new_source and ('from logger' not in new_source) and (file_path.name != 'logger.py'):
        lines = new_source.splitlines()
        insert_idx = 0
        for i, line in enumerate(lines):
            if line.strip().startswith(('#', 'import', 'from')):
                insert_idx = i + 1
            else:
                break
        lines.insert(insert_idx, 'from logger import logger')
        new_source = '\n'.join(lines)
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(new_source)
    logger.info(f'  ✓ ارتقا یافت: {dest_path.relative_to(DEST_DIR)}')

def main():
    try:
        'تابع main (توسعه\u200cیافتهٔ خودکار)'
        logger.info('=' * 60)
        logger.info('🚀 شروع توسعهٔ مخزن NLP ...')
        logger.info('=' * 60)
        if Path(DEST_DIR).exists():
            shutil.rmtree(DEST_DIR)
            logger.info(f"پوشهٔ مقصد قبلی '{DEST_DIR}' حذف شد.")
        shutil.copytree(SRC_DIR, DEST_DIR)
        logger.info(f"پوشهٔ مقصد '{DEST_DIR}' از روی '{SRC_DIR}' ایجاد شد.")
        for filename, content in NEW_MODULES.items():
            dest_file = Path(DEST_DIR) / filename
            with open(dest_file, 'w', encoding='utf-8') as f:
                f.write(content + '\n')
            logger.info(f'  + ماژول جدید اضافه شد: {filename}')
        config_json = Path(DEST_DIR) / 'config.json'
        if not config_json.exists():
            config_json.write_text('{\n  "language": "fa",\n  "max_length": 512,\n  "enable_cache": true,\n  "log_level": "INFO"\n}\n', encoding='utf-8')
            logger.info('  + config.json ساخته شد.')
        req_file = Path(DEST_DIR) / 'requirements.txt'
        req_file.write_text('# NLP Project Dependencies\n# (Currently no external packages required)\n', encoding='utf-8')
        logger.info('\n🔧 ارتقای فایل\u200cهای پایتون موجود ...')
        for root, dirs, files in os.walk(DEST_DIR):
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            for file in files:
                if file.endswith('.py'):
                    file_path = Path(root) / file
                    enhance_file(file_path, file_path)
        logger.info('\n✅ توسعه با موفقیت پایان یافت.')
        logger.info(f'پوشهٔ نهایی (توسعه\u200cیافته): {Path(DEST_DIR).resolve()}')
        logger.info('اکنون می\u200cتوانید وارد پوشه شده و کدهای جدید را بررسی و اجرا کنید.')
    except Exception as e:
        logger.error('خطا در اجرای main:', e)
if __name__ == '__main__':
    main()