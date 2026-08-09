#!/usr/bin/env python3
"""
Local review server for the Ocean Forest site. Use this instead of
`python3 -m http.server`.

Why this file exists
--------------------
`python3 -m http.server` sends Last-Modified and no cache policy, so Chrome
holds on to shell.css and shell.js and keeps serving you an old build. On
2026-08-09 that cost a full review round: the pages looked broken, work that
was present in the code appeared to be missing, and two different pages were
being served from two different points in the day. A hard reload fixes it,
but only if you remember every single time, on every page, and you will not.

This server sends `Cache-Control: no-store` on everything, so the browser is
not allowed to keep any of it. A plain refresh is now always the truth.

Run it
------
    cd "ocean-forest-website"
    python3 serve.py

Then open http://localhost:8080/v2/  (or http://localhost:8080/ for V1).
Port is 8080 by default; pass another as the first argument if it is busy.
"""

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    handler = partial(NoCacheHandler, directory=".")
    server = ThreadingHTTPServer(("127.0.0.1", port), handler)
    print("Ocean Forest review server, caching disabled.")
    print("  V2:  http://localhost:%d/v2/" % port)
    print("  V1:  http://localhost:%d/" % port)
    print("Ctrl-C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
