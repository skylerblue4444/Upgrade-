import subprocess
import json
import time
import re
from collections import defaultdict

# Read the routers.ts file to extract all router names
with open('/home/ubuntu/skycoin444/server/routers.ts', 'r') as f:
    content = f.read()

# Extract router keys from the appRouter object
router_keys = re.findall(r'  (\w+): \w+Router,', content)

print(f"✅ Found {len(router_keys)} registered routers in code")
print(f"Router keys: {', '.join(router_keys[:10])}...")

# Test each router with a basic endpoint
results = defaultdict(lambda: {"status": "UNKNOWN", "error": None})
working_routers = []
broken_routers = []

for router_key in router_keys:
    # Try to call a common procedure on each router
    try:
        # Use a generic endpoint that most routers should have
        cmd = [
            'curl', '-s', '-X', 'POST',
            f'http://localhost:3000/api/trpc/{router_key}',
            '-H', 'Content-Type: application/json',
            '-d', '{}'
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=2)
        response = result.stdout.strip()
        
        if 'Missing session cookie' in response or 'Unauthorized' in response:
            results[router_key]["status"] = "REACHABLE"
            working_routers.append(router_key)
        elif 'error' in response.lower() or 'not found' in response.lower():
            results[router_key]["status"] = "ERROR"
            results[router_key]["error"] = response[:100]
            broken_routers.append(router_key)
        else:
            results[router_key]["status"] = "REACHABLE"
            working_routers.append(router_key)
    except subprocess.TimeoutExpired:
        results[router_key]["status"] = "TIMEOUT"
        broken_routers.append(router_key)
    except Exception as e:
        results[router_key]["status"] = "ERROR"
        results[router_key]["error"] = str(e)
        broken_routers.append(router_key)

print(f"\n📊 ROUTER RUNTIME VERIFICATION RESULTS")
print(f"=" * 60)
print(f"Total Routers: {len(router_keys)}")
print(f"Working/Reachable: {len(working_routers)}")
print(f"Broken/Unreachable: {len(broken_routers)}")
print(f"Success Rate: {len(working_routers) / len(router_keys) * 100:.1f}%")

if broken_routers:
    print(f"\n❌ Broken Routers:")
    for router in broken_routers[:10]:
        print(f"  - {router}: {results[router]['error']}")

print(f"\n✅ Sample Working Routers:")
for router in working_routers[:10]:
    print(f"  - {router}")

