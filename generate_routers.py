import os
import re

def to_camel_case(text):
    return re.sub(r'-([a-z])', lambda x: x.group(1).upper(), text)

router_dir = "/home/ubuntu/skycoin444/server/routers"
files = [f for f in os.listdir(router_dir) if f.endswith('.ts')]
names = sorted([f[:-3] for f in files])

imports = []
entries = []

for name in names:
    camel_name = to_camel_case(name)
    imports.append(f'import {{ {camel_name}Router }} from "./routers/{name}";')
    entries.append(f'  {camel_name}: {camel_name}Router,')

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

print(f"Generated routers.ts with {len(names)} routers.")
