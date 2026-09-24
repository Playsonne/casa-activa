#!/usr/bin/env python3
"""Rebuild the offline file list/version after an app change. Python 3; no dependencies.
Run from any directory: python tools/update_cache.py
Do not put exported user backups inside the published repository.
"""
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parent.parent
VERSION = '1.3.0'

def main() -> None:
    files = ['index.html', 'styles.css', 'pwa.css', 'data.js', 'illustrations.js',
             'realistic.js', 'app.js', 'pwa.js', 'manifest.webmanifest']
    files += [p.relative_to(ROOT).as_posix() for folder in ['assets', 'icons']
              for p in sorted((ROOT / folder).rglob('*'))
              if p.is_file() and p.suffix.lower() in {'.webp', '.png', '.svg', '.json'}]
    digest = hashlib.sha256()
    for file in files:
        path = ROOT / file
        if not path.is_file():
            raise SystemExit(f'Missing required app asset: {file}')
        digest.update(file.encode('utf-8'))
        digest.update(path.read_bytes())
    template = (ROOT / 'tools' / 'sw.template.js').read_text(encoding='utf-8')
    digest.update(template.encode('utf-8'))
    build = f'{VERSION}-{digest.hexdigest()[:14]}'
    output = (template.replace('__VERSION__', json.dumps(VERSION))
              .replace('__BUILD__', json.dumps(build))
              .replace('__FILES__', json.dumps(['./'] + ['./' + f for f in files], indent=1)))
    (ROOT / 'sw.js').write_text(output, encoding='utf-8')
    print(f'sw.js ready: {build}; {len(files) + 1} local assets, no personal data.')

if __name__ == '__main__':
    main()
