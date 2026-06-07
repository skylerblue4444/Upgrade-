import os
import re

router_dir = "/home/ubuntu/skycoin444/server/routers"
files = sorted([f for f in os.listdir(router_dir) if f.endswith('.ts')])

imports = []
entries = []

for filename in files:
    filepath = os.path.join(router_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find the actual export name
    match = re.search(r'export\s+const\s+(\w+Router)\s*=\s*router\s*\(', content)
    if match:
        export_name = match.group(1)
        router_name = filename[:-3]  # Remove .ts
        imports.append(f'import {{ {export_name} }} from "./routers/{router_name}";')
        # Use camelCase for the key
        key_name = re.sub(r'-([a-z])', lambda x: x.group(1).upper(), router_name)
        entries.append(f'  {key_name}: {export_name},')
    else:
        print(f"WARNING: Could not find export in {filename}")

content = [
    'import { router } from "./_core/trpc";',
    *imports,
    '',
    'export const appRouter = router({',
    *entries,
    '});',
    '',
    'export type AppRouter = typeof appRouter;'
]

with open("/home/ubuntu/skycoin444/server/routers.ts", "w") as f:
    f.write('\n'.join(content) + '\n')

print(f"Generated routers.ts with {len(entries)} routers.")
