import os
import pathlib
root = pathlib.Path(r'd:/coding Realted/cyber-os-portfolio')
md_lines = []
md_lines.append('# Project Overview (auto-generated)')
md_lines.append('')
md_lines.append('## Project Structure')
md_lines.append('')
for dirpath, dirnames, filenames in os.walk(root):
    rel = os.path.relpath(dirpath, root)
    indent = 0 if rel == '.' else rel.count(os.sep)
    if rel == '.':
        md_lines.append('- .')
    else:
        md_lines.append('    ' * indent + '- ' + os.path.basename(dirpath))
    for d in sorted(dirnames):
        md_lines.append('    ' * (indent + (0 if rel == '.' else 1)) + '- ' + d)
    for f in sorted(filenames):
        md_lines.append('    ' * (indent + (0 if rel == '.' else 1)) + '- ' + f)
md_lines.append('')
md_lines.append('## File Contents')
md_lines.append('')
for path in sorted(root.rglob('*')):
    if path.is_file():
        rel = path.relative_to(root).as_posix()
        md_lines.append(f'### {rel}')
        md_lines.append('')
        md_lines.append('```')
        try:
            text = path.read_text(encoding='utf-8')
        except Exception:
            text = path.read_text(encoding='utf-8', errors='replace')
        md_lines.extend(text.rstrip('\n').splitlines())
        md_lines.append('```')
        md_lines.append('')
out = '\n'.join(md_lines)
(root / 'project_overview.md').write_text(out, encoding='utf-8')
print('project_overview.md rewritten with full structure/content.')
