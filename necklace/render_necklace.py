"""Double-strand turquoise/lapis heishi necklace hanging on a black velvet bust."""
import math, random, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

random.seed(11)
FLAT = "--flat" in sys.argv
PER_L_ = 4.0
V5 = "--v5" in sys.argv          # version 5: aligned colour bands, calmer
V4 = "--v4" in sys.argv or V5          # version 4: same beads, colour-sequence redesign
V3 = "--v3" in sys.argv          # version 3: v2 with the 15.6 x 10.5 white rondelle + orange at the bottom
V2 = "--v2" in sys.argv or V3 or V4          # version 2: greener accents up top, red accents lower   # laid flat on black, no mannequin, full loop visible
S = 8                               # px per mm (supersampled)
INCH = 25.4
EXTRAS = False   # False = base design: heishi blocks + white barrels only (jasper/hematite/jade/lapis/spondylus/tourmaline off)
C_OUT, GAP, BEAD_D = 42 * INCH, (11.2 if EXTRAS else (14.0 if V2 else 10.0)), 7.0   # v2: room for 18 mm naga conch
C_IN = C_OUT - 2 * math.pi * GAP    # inner strand: 8 mm smaller radius -> ~38"
NSEG, BPS = 42, 16                  # 1 inch blocks, ~16 heishi (1.6 mm) per block

# ---------- geometry of the hanging front U (mm, origin = neck base centre) ----------
START = (-54.0, 0.0)              # strand emerges from behind the neck here
HIDDEN_OUT = math.pi * 50.0          # half-loop around back of neck
FRONT_OUT = C_OUT - HIDDEN_OUT


def catmull(pts, n=60):
    pts = np.asarray(pts, float)
    pts = np.vstack([2 * pts[0] - pts[1], pts, 2 * pts[-1] - pts[-2]])
    out = []
    for i in range(1, len(pts) - 2):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[i + 1], pts[i + 2]
        for t in np.linspace(0, 1, n, endpoint=False):
            t2, t3 = t * t, t * t * t
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
                              + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    out.append(pts[-2])
    return np.array(out)


def bez(p0, p1, p2, p3, n=1500):
    t = np.linspace(0, 1, n)[:, None]
    return ((1 - t) ** 3) * p0 + 3 * ((1 - t) ** 2) * t * p1 + 3 * (1 - t) * t * t * p2 + t ** 3 * p3


def curve(D):
    ctrl = [START, (-68, 8), (-86, 24), (-98, 62), (-102, 0.32 * D), (-100, 0.55 * D),
            (-88, 0.78 * D), (-60, 0.94 * D), (-25, 0.995 * D), (0, D)]
    left = catmull(ctrl, 200)
    right = left[::-1].copy()[1:]
    right[:, 0] *= -1
    return np.vstack([left, right])


def length(p):
    return np.sum(np.hypot(*np.diff(p, axis=0).T))


lo, hi = 150, 700
for _ in range(60):
    D = (lo + hi) / 2
    if length(curve(D)) < FRONT_OUT:
        lo = D
    else:
        hi = D
outer = curve(D)
if FLAT:
    # close the loop over the top (the part that normally goes behind the neck), starting at the clasp
    # one smooth closed oval, starting at the clasp (top centre), same total length
    def flat_loop(Dd, b=70.0):
        ctrl = [(0, -b), (-48, -0.94 * b), (-82, -0.68 * b), (-100, -0.25 * b), (-104, 0.3 * Dd),
                (-100, 0.55 * Dd), (-88, 0.78 * Dd), (-60, 0.94 * Dd), (-25, 0.995 * Dd), (0, Dd)]
        left = catmull(ctrl, 200)
        right = left[::-1].copy()[1:]; right[:, 0] *= -1
        return np.vstack([left, right])
    lo_d, hi_d = 100.0, 700.0
    for _ in range(60):
        D = (lo_d + hi_d) / 2
        if length(flat_loop(D)) < C_OUT:
            lo_d = D
        else:
            hi_d = D
    b_ = 70.0
    outer = flat_loop(D)
    TOP_B = b_
    HIDDEN_OUT = 0.0
# inward normals (curve runs left-top -> bottom -> right-top, so interior is to the left of travel)
tang = np.gradient(outer, axis=0)
tang /= np.linalg.norm(tang, axis=1)[:, None]
normal_in = np.stack([tang[:, 1], -tang[:, 0]], axis=1)
if normal_in[len(normal_in) // 2, 1] > 0:     # at the bottom, inward must point up (-y)
    normal_in = -normal_in
inner = outer + normal_in * GAP

s_out = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(outer, axis=0).T))])
s_in = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(inner, axis=0).T))])
HIDDEN_IN = 0.0 if FLAT else math.pi * (50.0 - GAP)
print(f"D={D:.0f}mm  outer front={s_out[-1]:.0f}  inner front={s_in[-1]:.0f}  "
      f"inner total~{s_in[-1] + HIDDEN_IN:.0f} (target {C_IN:.0f})")

SEG_OUT = C_OUT / NSEG
# outer block index is measured from the clasp at the back of the neck
def block_at(i):                     # i = dense sample index, shared by both strands
    return int((s_out[i] + HIDDEN_OUT / 2) // SEG_OUT)

# ---------- canvas ----------
XMIN, XMAX, YMIN = -270, 270, (-130 if FLAT else -130)
YMAX = D + 70
W, H = int((XMAX - XMIN) * S), int((YMAX - YMIN) * S)
def P(x, y):
    return ((x - XMIN) * S, (y - YMIN) * S)

# black velvet background: very dark, fine pile noise, soft pool of light
yy, xx = np.mgrid[0:H, 0:W]
cxp, cyp = P(0, D * 0.45)
r = np.hypot((xx - cxp) / W, (yy - cyp) / H)
base = 4 + 22 * np.clip(1 - r * 1.6, 0, 1) ** 2
noise = np.array(Image.effect_noise((W // 2, H // 2), 40).convert("L").resize((W, H)), dtype=float)
bgarr = base + (noise - 128) * 0.05
bg = np.stack([bgarr * 0.95, bgarr * 0.95, bgarr * 1.08], axis=2)

# velvet neck/bust form
_bust = catmull([(44, -600), (44, -50), (48, -24), (62, -6), (88, 8), (132, 22), (180, 38),
                 (216, 62), (234, 100), (240, 150), (240, 200)], 80)
_bust = np.vstack([_bust, [[240, 2000]]])
_by = np.maximum.accumulate(_bust[:, 1])
def neck_half(y):
    return float(np.interp(y, _by, _bust[:, 0]))

pts_l, pts_r = [], []
for y in np.linspace(YMIN - 5, YMAX + 5, 400):
    h = neck_half(y)
    pts_l.append(P(-h, y)); pts_r.append(P(h, y))
mask = Image.new("L", (W, H), 0)
ImageDraw.Draw(mask).polygon(pts_l + pts_r[::-1], fill=255)
m = np.array(mask, dtype=float) / 255
if FLAT:
    m[:] = 0
mb = np.array(mask.filter(ImageFilter.GaussianBlur(14 * S)), dtype=float) / 255
rim = np.clip(m - mb, 0, 1) * 2.2                         # velvet sheen at silhouette edges
side = np.clip((xx - P(0, 0)[0]) / (W / 2), -1, 1)
shade_body = 14 + 10 * np.clip(-side, 0, 1) + 70 * rim ** 1.3
body = shade_body[..., None] * np.array([0.95, 0.95, 1.05]) + ((noise - 128) * 0.06)[..., None]
img = bg * (1 - m[..., None]) + body * m[..., None]
canvas = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
body_only = canvas.copy()

# ---------- beads ----------
TURQ = [(26, 150, 200), (36, 162, 210), (20, 136, 190), (48, 172, 212), (30, 156, 196), (34, 160, 178)]
TURQ_RNG = random.Random(77)   # separate stream so bead thickness doesn't disturb other randomness
TURQ_T = {}                     # per-bead thickness for the turquoise heishi
LAPIS = [(30, 52, 150), (24, 44, 130), (36, 62, 165), (28, 48, 140)]
SPINY_ORANGE = [(232, 112, 34), (240, 128, 44), (222, 98, 30), (246, 140, 56), (214, 90, 28)]
SPINY = [(186, 30, 30), (170, 26, 30), (178, 34, 34), (160, 22, 30)]
ROYAL = [(34, 44, 190), (28, 36, 172), (42, 56, 205), (30, 40, 182)]
def jitter(c, j=8):
    k = random.randint(-j, j)
    return tuple(max(0, min(255, v + k)) for v in c)
def sh(c, f):
    return tuple(max(0, min(255, int(v * f))) for v in c)

def occluder(y):                 # the neck column that hides the back of the necklace
    return 44 + 20 * min(1, max(0, (y + 30) / 40)) ** 2

def orig_hidden(x, y):
    return y < 12 and abs(x) < occluder(y)

def hidden(x, y):
    if FLAT:
        return False
    return y < 12 and abs(x) < occluder(y)


def place(path, s, pitch):
    """Bead centres every `pitch` mm along a path; returns (x, y, tx, ty, idx)."""
    out = []
    pos = pitch / 2
    while pos < s[-1]:
        i = int(np.searchsorted(s, pos))
        i = min(i, len(path) - 1)
        x, y = path[i]
        t = tang[i]
        out.append((x, y, t[0], t[1], i, pos))
        pos += pitch
    return out

# Every inch (counted from the clasp) each strand carries a 10 mm accent bead.
# White barrels every 4" per strand, staggered so they alternate outer/inner every 2";
# 10 mm round apple jasper fills every other inch position on both strands.
BAR_L, BAR_D = 10.0, 10.0
JAS_D = 10.0
ROUND_D = {"jasper": 10.0, "gold": 10.0, "jade": 10.0, "lapis12": 12.0}
barrels = {0: [], 1: []}
jaspers = {0: [], 1: []}
# ---- colour-pattern arrangement of the junction beads -------------------------------------
# Target order along each strand:  green | red/orange | pink | yellow-tan | white | dark blue | light blue | green
# Fixed: white barrels and the heishi segments.  Each non-white junction is classed by what it touches:
#   G = touches a red/orange segment (and light blue on the other side)  -> greens
#   P = between light blue and dark blue, on the red/orange side         -> pinks
#   Y = between dark blue and light blue, on the white side              -> yellow-tans
def is_white(n, st):
    ls = 1 - st if (n < 21 and n % 2 == 0) else st
    return (n % 4 == 0) if ls == 0 else (n % 4 == 2)

def kind_blk(blk, st):
    # left side: whole segment pattern moved up one notch (block blk shows what was at blk + 1)
    shift = blk < 21
    b = blk + (1 if shift else 0) + st
    if b % 2 == 0:
        return "T"
    left = shift and st == 1
    return "L" if (b % 4 == 1) != left else "S"

def junction_class(n, st):
    if is_white(n, st):
        return "W"
    a, b = kind_blk(n - 1, st), kind_blk(n, st)
    if "S" in (a, b):
        return "G"
    far = n - 1 if a == "T" else n + 1
    return "Y" if is_white(far, st) else "P"

CLS = {(n, st): junction_class(n, st) for n in range(1, 42) for st in (0, 1)}
# assign stones by rank outward from the centre front, same pattern on both sides (mirror)
PATTERN = {("G", 0): ["peridot", "jade", "peridot", "applejasper", "jade"] + ["peridot"] * 7,
           ("G", 1): ["jade", "peridot", "applejasper"] + ["peridot"] * 9,
           ("P", 0): ["rose", "tour_pink"] * 4,
           ("P", 1): ["tour_pink", "rose"] * 4}
ASSIGN = {}
for st in (0, 1):
    for side in (-1, 1):
        for cls in ("G", "P", "Y"):
            ns = sorted([n for n in range(1, 42) if CLS[(n, st)] == cls and ((n < 21) if side < 0 else (n >= 21))],
                        key=lambda n: abs(n - 21))
            for r, n in enumerate(ns):
                if cls == "Y":
                    ASSIGN[(n, st)] = "tour_yellow"
                else:
                    pat = PATTERN[(cls, st)]
                    ASSIGN[(n, st)] = pat[r % len(pat)]
# bottom centre: centre rose quartz becomes an 11 mm carved rose quartz; the one left of it a tourmaline
ASSIGN[(21, 0)] = "rose11"
ASSIGN[(20, 0)] = "tour_pink"
ASSIGN[(16, 0)] = "rose"          # outer strand, side by side with the inner white barrel at ~7 o'clock
ASSIGN[(30, 0)] = "rose"          # right side ~3 o'clock, beside the inner white barrel
ASSIGN[(21, 1)] = "bicone8"       # very bottom centre, inner strand: rose crystal bicone
for _k in ((1, 0), (41, 0)):
    ASSIGN[_k] = "tour_black"        # very top, outer strand: black tourmaline
for _k in ((1, 1), (41, 1)):
    ASSIGN[_k] = "tour_pink"         # very top, inner strand: pink tourmaline
for _k in ((2, 1), (40, 1)):
    ASSIGN[_k] = "tour_green"        # inner strand beside them: green tourmaline
ASSIGN[(18, 1)] = "bicone_lime"      # bottom: gold pearl (was blue opal glass)
ASSIGN[(24, 1)] = "bicone_lime"
ASSIGN[(12, 0)] = "bicone_lime"          # ~9 o'clock outer: rose quartz -> yellow glass
ASSIGN[(30, 0)] = "bicone_lime"          # ~3 o'clock outer: rose quartz -> yellow glass
ASSIGN[(10, 1)] = "rose"            # ~9 o'clock beside the white barrel: 9 mm carved rose quartz
ASSIGN[(32, 1)] = "rose"            # ~3 o'clock beside the white barrel: 9 mm carved rose quartz
# where two tan tourmalines sit side by side, one becomes 8 mm mookaite: bottom-up in, out, out, in (mirrored)
for _nl, _st in ((17, 1), (13, 0), (9, 0), (5, 1)):
    for _n in (_nl, 42 - _nl):
        ASSIGN[(_n, _st)] = "mook8"
for _n, _st in ((17, 0), (13, 1), (25, 0), (29, 1)):   # the 4 nearest the bottom
    ASSIGN[(_n, _st)] = "abgreen8"   # tan tourmaline beside mookaite -> 8 mm green opal AB glass
ASSIGN[(17, 0)] = "bicone8"          # rose crystal bicone (was blue opal AB glass)
ASSIGN[(25, 0)] = "bicone8"
ASSIGN[(13, 1)] = "bicone8"          # rose crystal bicone replaces the green AB glass higher up
ASSIGN[(29, 1)] = "bicone8"
# swap: rose bicones go beside the lower apple jasper rounds; the diopside pairs there move down beside the green glass
for _a, _b in (((13, 1), (11, 0)), ((17, 0), (15, 1)), ((29, 1), (31, 0)), ((25, 0), (27, 1))):
    ASSIGN[_a], ASSIGN[_b] = "peridot", "bicone8"
for _k in ((13, 0), (29, 0), (17, 1), (25, 1)):
    ASSIGN[_k] = "abgreen8"         # mookaite beside a rose bicone -> green opal AB glass
ASSIGN[(15, 0)] = "applejasper"    # ~7 o'clock jade -> apple jasper
ASSIGN[(27, 0)] = "applejasper"    # ~4 o'clock jade -> apple jasper
ASSIGN[(20, 0)] = "conch8"         # very bottom: blue opal AB glass (amethyst removed)
ASSIGN[(22, 0)] = "conch8"
ASSIGN[(4, 0)] = "tour_pink"      # top left: mirror right side
ASSIGN[(8, 0)] = "rose"           # rose quartz moved down beside the inner white barrel, mirroring right
ASSIGN[(6, 1)] = "bicone_lime"         # top-most rose quartz (left) -> 8 mm cobalt lapis round
ASSIGN[(36, 1)] = "bicone_lime"        # top-most rose quartz (right) -> 8 mm cobalt lapis round
if V2:
    # swap, as pairs: jade + diopside (lowest) <-> apple jasper + rose bicone (~3 / 9 o'clock)
    for _lo, _hi in ((19, 11), (23, 31)):
        for _st in (0, 1):
            ASSIGN[(_lo, _st)], ASSIGN[(_hi, _st)] = ASSIGN[(_hi, _st)], ASSIGN[(_lo, _st)]
    # top portion: the two apple jasper beside the diopside become Russian green jade
    ASSIGN[(7, 0)] = ASSIGN[(35, 0)] = "jade"
    ASSIGN[(9, 1)] = ASSIGN[(33, 1)] = "tour_pink"   # tan tourmaline above the middle white opals -> pink
    ASSIGN[(21, 0)] = "wjade"          # very bottom centre: 14 x 15 mm frosted white jade
from collections import Counter as _C
print("junction stones (full necklace):", dict(_C(ASSIGN.values())), "white:", sum(1 for v in CLS.values() if v == "W"))

for n in range(1, 42):
    s_o = n * INCH - HIDDEN_OUT / 2               # position on the outer strand's visible path
    if not (0 <= s_o <= s_out[-1]):
        continue
    i = min(int(np.searchsorted(s_out, s_o)), len(outer) - 1)
    for strand, path, ss in ((0, outer, s_out), (1, inner, s_in)):
        x, y = path[i]
        # half the round beads are golden hematite: chosen so each strand reads
        # W-J-H-J-W (outer) / W-H-J-H-W (inner) and jasper always sits beside hematite or white
        kind = "gold" if (n + strand) % 2 == 0 else "jasper"
        # featured stones, mirrored left/right about the centre front (n <-> 42-n)
        if (strand, n) in {(0, 11), (0, 31), (1, 17), (1, 25)}:
            kind = "lapis12"
        elif (strand, n) in {(0, 15), (0, 27), (1, 7), (1, 35)}:
            kind = "jade"
        # base design: where two tourmalines sit side by side (odd inches), swap one for a
        # 9 mm carved rose quartz on every other such pair, alternating outer / inner strand
        if not EXTRAS and ((strand == 0 and n % 8 == 1) or (strand == 1 and n % 8 == 5)):
            kind = "rose"
        entry = (x, y, tang[i][0], tang[i][1], ss[i], kind)
        if EXTRAS:
            white = (n % 4 == 0) if strand == 0 else (n % 4 == 2)
            (barrels if white else jaspers)[strand].append(entry)
            continue
        cls = CLS[(n, strand)]
        if cls == "W":
            # the two top barrels (nearest the clasp) are 10 mm Russian green jade rounds instead
            # the two slots nearest the clasp hold a chrome diopside pair instead (heishi fill the rest)
            if (n, strand) in {(2, 0), (40, 0)}:
                jaspers[strand].append(entry[:5] + ("peridot3" if V2 else "peridot2",))
            else:
                # version 2: the chrysoprase beside each yellow round becomes a 10 mm white opal
                if V2 and (n, strand) in {(20, 1), (22, 1)}:
                    jaspers[strand].append(entry[:5] + ("rose11",))   # bottom inner: 11 mm swirled rose quartz (swapped down)
                    continue
                _op = V2 and ASSIGN.get((n, 1 - strand)) == "bicone_lime"
                barrels[strand].append(entry[:5] + (("conch_pink" if V2 else "opal") if _op else ("conch_pink" if V2 else "white"),))
            continue
        stone = ASSIGN[(n, strand)]
        if (n, strand) in {(20, 0), (22, 0)}:
            # chrome diopside pair between the lapis round and the red spondylus
            sgn = 1 if n == 20 else -1
            j = min(int(np.searchsorted(ss, ss[i] + sgn * (10.2 if V2 else 8.3))), len(path) - 1)
            jaspers[strand].append((path[j][0], path[j][1], tang[j][0], tang[j][1], ss[j], "peridot3" if V2 else "peridot2"))
        if stone == "peridot":
            # chrome diopside doubled: two 8 x 4 mm rondelles side by side; the extra one takes the
            # place of turquoise heishi, so the pair is shifted 2 mm toward the turquoise side
            sgn = 1 if kind_blk(n, strand) == "T" else -1
            if V2:
                # three diopside centred on the junction, balanced against the larger bead across from it
                jaspers[strand].append(entry[:5] + ("peridot3",))
                continue
            j = min(int(np.searchsorted(ss, ss[i] + sgn * 2.0)), len(path) - 1)   # 2 mm = half a 4 mm rondelle
            jaspers[strand].append((path[j][0], path[j][1], tang[j][0], tang[j][1], ss[j], "peridot2"))
            if V2 and (n, strand) in {(11, 0), (31, 0)}:
                # a third chrome diopside on the upper side of the pair
                up = -1 if n < 21 else 1                 # left side runs downward, right side upward
                j3 = min(int(np.searchsorted(ss, ss[j] + up * 6.0)), len(path) - 1)
                jaspers[strand].append((path[j3][0], path[j3][1], tang[j3][0], tang[j3][1], ss[j3], "peridot"))
            continue
        if stone in ("jade", "applejasper"):
            barrels[strand].append(entry[:5] + (stone,))
        else:
            jaspers[strand].append(entry[:5] + (stone,))

if V2:
    # topmost conch on each side (inner strand, nearest the shoulders) -> 10 mm Russian green jade
    _tops = sorted([k for k, b in enumerate(barrels[1]) if b[5] == "conch_pink" and not orig_hidden(b[0], b[1])],
                   key=lambda k: barrels[1][k][1])
    _picked = {}
    for k in _tops:
        _picked.setdefault(barrels[1][k][0] < 0, k)
    for k in _picked.values():
        barrels[1][k] = barrels[1][k][:5] + ("jade",)
    # (top outer pair stays 18 mm naga conch)

if V2:
    # every naga conch on the inner strand -> 12 mm Russian green jade
    for k, b in enumerate(barrels[1]):
        if b[5] == "conch_pink":
            barrels[1][k] = b[:5] + ("jade",)

if V2:
    # outer-strand naga: the highest and lowest on each side (not the bottom-centre one) -> 11 mm swirled rose quartz
    for _side in (True, False):
        _ks = sorted([k for k, b in enumerate(barrels[0]) if b[5] == "conch_pink" and (b[0] < 0) == _side
                      and not orig_hidden(b[0], b[1])], key=lambda k: barrels[0][k][1])
        if len(_ks) >= 2:
            barrels[0][_ks[0]] = barrels[0][_ks[0]][:5] + ("rose9b",)     # upper: 9 mm swirled rose quartz (swapped up)
            barrels[0][_ks[-1]] = barrels[0][_ks[-1]][:5] + ("opal10",)   # lower: 10 mm milky white opal

if V2:
    # Russian jade sitting beside a yellow bead (across the strands) -> 10 mm apple jasper
    _yel = [(e[0], e[1]) for st in (0, 1) for e in jaspers[st] if len(e) > 5 and e[5] == "bicone_lime"]
    for st in (0, 1):
        for k, b in enumerate(barrels[st]):
            if b[5] == "jade" and any(math.hypot(b[0] - yx, b[1] - yy) < 16 for yx, yy in _yel):
                barrels[st][k] = b[:5] + ("applejasper",)

if V2:
    # the two highest Russian jade per side on the inner strand -> 7.3 mm light green jade
    for _side in (True, False):
        _ks = sorted([k for k, b in enumerate(barrels[1]) if b[5] == "jade" and (b[0] < 0) == _side
                      and not orig_hidden(b[0], b[1])], key=lambda k: barrels[1][k][1])
        for k in _ks[:2]:
            barrels[1][k] = barrels[1][k][:5] + ("gjade7",)
    # and now every Russian jade round on both strands -> 7.3 mm green jade
    for _st in (0, 1):
        for k, b in enumerate(barrels[_st]):
            if b[5] == "jade":
                barrels[_st][k] = b[:5] + ("gjade7",)
    # only 10 green jade available: the 4 nearest the top (behind the neck) -> dark tan-green tourmaline
    def _utop(st, sp):                        # distance along the strand from the top centre (same in both views)
        _H = HIDDEN_OUT if st == 0 else HIDDEN_IN
        _L = s_out[-1] if st == 0 else s_in[-1]
        return min(sp + _H / 2, _L - sp + _H / 2)
    _gj = sorted([(_utop(st, b[4]), st, k) for st in (0, 1) for k, b in enumerate(barrels[st]) if b[5] == "gjade7"])
    for _y, st, k in _gj:
        if _y < 130:                           # the ones up behind the neck
            # inner strand: these moved down to the bottom; tan tourmaline here. outer: dark tan-green
            barrels[st][k] = barrels[st][k][:5] + ("tour_tan" if st == 1 else "tour_olive",)
    # bottom swap: the inner-strand apple jasper nearest the bottom becomes green jade (its partner moves out)
    for _side in (True, False):
        _ks = sorted([k for k, b in enumerate(barrels[1]) if b[5] == "applejasper" and (b[0] < 0) == _side],
                     key=lambda k: -_utop(1, barrels[1][k][4]))
        if _ks:
            barrels[1][_ks[0]] = barrels[1][_ks[0]][:5] + ("gjade7",)

# 8 x 3 mm spondylus rondelles flank every white barrel: red on one side, orange on the other
RON_D, RON_T = 8.0, 3.0
rondelles = {0: [], 1: []}
for strand, path, ss in ((0, outer, s_out), (1, inner, s_in)):
    for bi, b in enumerate(barrels[strand]):
        for side, sgn in enumerate((-1, 1)):
            pos = b[4] + sgn * (BAR_L / 2 + RON_T / 2 + 0.2)
            if not (0 <= pos <= ss[-1]):
                continue
            i = min(int(np.searchsorted(ss, pos)), len(path) - 1)
            x, y = path[i]
            colour = "red" if (side + bi + strand) % 2 == 0 else "orange"
            rondelles[strand].append((x, y, tang[i][0], tang[i][1], ss[i], colour))

# 7 mm multicolour tourmaline rounds in the middle of every other 1" heishi block,
# alternating strands, so one appears every inch along the necklace as a whole.
TOUR_D = 7.0
ROSE_D = 9.0
PER_D, PER_L = 8.0, 4.0              # chrome diopside rondelle: 8 mm across, 4 mm along the strand
def tsize(t):
    k = t[5] if len(t) > 5 else "tour"
    return {"rose": ROSE_D, "rose11": 11.0, "tour_ybright": 7.0, "wjade": (10.5 if V3 else 19.7), "conch12": 12.0, "lapis8": 8.0, "conch8": 8.0, "mook8": 8.0, "abgreen8": 8.0, "yellow8": 8.0, "bicone8": 8.0, "gjade7t": 7.3, "v4_gglass": 8.0, "v4_olive": 7.0, "v4_opal10": 10.0, "v4_opal9": 9.0, "v5_opal8": 8.0, "v5_amet": 8.0, "v4_rbic": 8.0, "v4_sapph": 8.0, "v5_mookred": 8.0, "v5_tblue": 7.0, "v5_mookyel": 8.0, "v5_mookrd": 8.0, "v5_mookorg": 8.0, "ajas_t": 10.0, "bicone_lime": 8.0, "peridot": PER_L, "peridot2": 2 * PER_L, "peridot3": 3 * PER_L}.get(k, TOUR_D)
tourm = {0: [], 1: []}
for n in range(0, 42):
    s_o = (n + 0.5) * INCH - HIDDEN_OUT / 2
    if not (0 <= s_o <= s_out[-1]):
        continue
    i = min(int(np.searchsorted(s_out, s_o)), len(outer) - 1)
    strand = 0 if n % 4 in (0, 3) else 1        # spreads them evenly over turquoise and lapis blocks
    path, ss = (outer, s_out) if strand == 0 else (inner, s_in)
    x, y = path[i]
    tourm[strand].append((x, y, tang[i][0], tang[i][1], ss[i]))

if not EXTRAS:
    # 7 mm tourmaline at every turquoise/lapis junction not already taken by a white barrel
    tourm = {st: [e[:5] + (e[5],) for e in jaspers[st]] for st in (0, 1)}
    if V2:
        # outer-strand 9 mm rose quartz sitting beside a Russian jade -> three 8 mm chrome diopside
        _jd = [(b[0], b[1]) for b in barrels[1] if b[5] in ("jade", "gjade7")]
        for _k, _t in enumerate(tourm[0]):
            if _t[5] == "rose" and any(math.hypot(_t[0] - jx, _t[1] - jy) < 16 for jx, jy in _jd):
                tourm[0][_k] = _t[:5] + ("peridot3",)
    # nudge the bottom-centre inner bicone one heishi to the right so it sits centred
    for _k, _t in enumerate(tourm[1]):
        if _t[5] == "bicone8" and abs(_t[0]) < 15 and _t[1] > 0:
            _p = _t[4] + (0.0 if V2 else 2.2)
            _j = min(int(np.searchsorted(s_in, _p)), len(inner) - 1)
            tourm[1][_k] = (inner[_j][0], inner[_j][1], tang[_j][0], tang[_j][1], s_in[_j], "bicone8")
    if FLAT:
        # top centre (where the strands meet): two black tourmalines, one each side of the seam
        for _st, _path, _ss in ((0, outer, s_out), (1, inner, s_in)):
            for _pos in (TOUR_D / 2, _ss[-1] - TOUR_D / 2):
                _j = min(int(np.searchsorted(_ss, _pos)), len(_path) - 1)
                tourm[_st].append((_path[_j][0], _path[_j][1], tang[_j][0], tang[_j][1], _ss[_j], "tour_black"))
    jaspers = {0: [], 1: []}
    rondelles = {0: [], 1: []}

def clear_of_barrel(strand, pos):
    return (all(abs(pos - b[4]) > (5.0 if b[5] == "conch_pink" else 3.65 if b[5] == "gjade7" else 3.5 if b[5] in ("tour_olive", "tour_tan") else 5.5 if b[5] == "rose11b" else 4.5 if b[5] == "rose9b" else (6.0 if (V2 and b[5] == "jade") else BAR_L / 2)) + 0.4 for b in barrels[strand]) and
            all(abs(pos - b[4]) > ROUND_D[b[5]] / 2 + 0.4 for b in jaspers[strand]) and
            all(abs(pos - r[4]) > RON_T / 2 + 0.4 for r in rondelles[strand]) and
            all(abs(pos - t[4]) > tsize(t) / 2 + 0.3 for t in tourm[strand]))

# Turquoise heishi: 7 mm x ~1.6 mm discs.  Lapis: 6.6 mm royal-blue heishi rondelles, ~3 mm thick.
LAP_D, LAP_PITCH = 6.6, 3.0
SPY_D, SPY_PITCH = 6.0, 3.0          # red spiny oyster spondylus heishi, 6 x 3 mm
ORG_PITCH = 3.0                      # orange spiny oyster spondylus heishi, 6 x 3 mm

SPONDY_OVERRIDE = {(0, 20), (0, 21)}

def block_kind(i, strand):
    """0 = turquoise, 1 = royal lapis, 2 = red spondylus, 3 = orange spondylus (per bead)."""
    blk = block_at(i)
    if strand == 1 and blk in (0, NSEG - 1):
        return 1                           # inner strand beside the clasp: lapis instead of turquoise
    if (strand, blk) in SPONDY_OVERRIDE:   # bottom-centre outer: spondylus instead of lapis
        frac = ((s_out[i] + HIDDEN_OUT / 2) % SEG_OUT) / SEG_OUT
        near_centre = (frac >= 0.5) if blk == 20 else (frac < 0.5)
        return 3 if near_centre else 2     # orange touching the rose quartz, red outward
    shift = blk < 21                       # left side: segments moved up one notch
    b = blk + (1 if shift else 0) + strand
    if b % 2 == 0:
        return 0
    # left side inner strand: spondylus also trades places with the lapis, so the red/orange
    # sections line up the same way as on the right side
    left = shift and strand == 1
    if (b % 4 == 1) != left:
        return 1
    # every spondylus block is split: red half on top, orange half on the bottom (as worn)
    frac = ((s_out[i] + HIDDEN_OUT / 2) % SEG_OUT) / SEG_OUT
    going_down = tang[i][1] >= 0          # path runs downward here, so the first half is the upper one
    return 2 if (frac < 0.5) == going_down else 3

def place_mixed(path, s, strand, turq_pitch):
    out, pos = [], 0.0
    while pos < s[-1]:
        i = min(int(np.searchsorted(s, pos)), len(path) - 1)
        kind = block_kind(i, strand)
        if kind == 0:
            p = TURQ_RNG.uniform(1.7, 2.9)      # hand-cut blue turquoise heishi, uneven thickness
        else:
            p = (turq_pitch, LAP_PITCH, SPY_PITCH, ORG_PITCH)[kind]
        c = pos + p / 2
        if c >= s[-1]:
            break
        j = min(int(np.searchsorted(s, c)), len(path) - 1)
        x, y = path[j]
        out.append((x, y, tang[j][0], tang[j][1], j, c))
        if kind == 0:
            TURQ_T[(strand, round(c, 4))] = p
        pos += p
    return out

beads_out = [(b, 0) for b in place_mixed(outer, s_out, 0, SEG_OUT / BPS) if clear_of_barrel(0, b[5])]
beads_in = [(b, 1) for b in place_mixed(inner, s_in, 1, (C_IN / NSEG) / BPS) if clear_of_barrel(1, b[5])]

# split every spondylus section evenly by bead count: red half on top, orange half below (as worn)
SPLIT = {}
for lst in (beads_out, beads_in):
    groups = {}
    for (x, y, tx, ty, i, pos), strand in lst:
        if block_kind(i, strand) in (2, 3) and (strand, block_at(i)) not in SPONDY_OVERRIDE:
            groups.setdefault((strand, block_at(i)), []).append((pos, i, y))
    for (strand, _), g in groups.items():
        g.sort()
        n_red = (len(g) + 1) // 2
        top_first = g[0][2] <= g[-1][2]          # first bead is the higher one
        order = g if top_first else g[::-1]
        for k, (pos, i, y) in enumerate(order):
            SPLIT[(strand, round(pos, 4))] = 2 if k < n_red else 3
# centre the black pair in the real space left between the discs at the seam
if FLAT:
    for _lst, _st, _path, _ss in ((beads_out, 0, outer, s_out), (beads_in, 1, inner, s_in)):
        _ps = sorted(bb[5] for (bb, st) in _lst)
        _lo = _ps[0] - LAP_PITCH / 2                 # free space just after the seam
        _hi = _ss[-1] - (_ps[-1] + LAP_PITCH / 2)    # free space just before the seam
        _c = (_lo - _hi) / 2                         # centre of the gap, measured from the seam
        _new = []
        for _off in (-TOUR_D / 2, TOUR_D / 2):
            _p = _c + _off
            _p = _p if _p >= 0 else _ss[-1] + _p
            _j = min(int(np.searchsorted(_ss, _p)), len(_path) - 1)
            _new.append((_path[_j][0], _path[_j][1], tang[_j][0], tang[_j][1], _ss[_j], "tour_pink" if _st == 0 else "tour_black"))
        _old = [t for t in tourm[_st] if t[5] == "tour_black" and (t[4] < 20 or t[4] > _ss[-1] - 20)]
        tourm[_st] = [t for t in tourm[_st] if t not in _old] + _new
# top centre, both strands: two turquoise discs on each side of the black tourmaline pair
if FLAT:
    for _lst, _st in ((beads_out, 0), (beads_in, 1)):
        _top = sorted([bb for (bb, st) in _lst if block_kind(bb[4], st) == 1], key=lambda b: b[5])
        for bb in _top[:2] + _top[-2:]:
            if V2 and _st == 1:
                SPLIT[(_st, round(bb[5], 4))] = 3         # v2: inner strand top centre -> orange spiny oyster
            else:
                SPLIT[(_st, round(bb[5], 4))] = 0
                TURQ_T[(_st, round(bb[5], 4))] = LAP_PITCH
if FLAT and V2:
    # inner strand top centre, laid out evenly: lapis.. orange orange BLACK BLACK orange orange ..lapis
    _Ls = s_in[-1]
    def _sd(p):
        return p if p < _Ls / 2 else p - _Ls
    def _pt(d):
        p = d % _Ls
        j = min(int(np.searchsorted(s_in, p)), len(inner) - 1)
        return p, j
    _blk = [t for t in tourm[1] if t[5] == "tour_black" and abs(_sd(t[4])) < 15]
    if len(_blk) == 2:
        _cc = sum(_sd(t[4]) for t in _blk) / 2
        _core = TOUR_D + 2 * 3.0                       # black pair + one orange each side, then a second orange
        _half = TOUR_D + 6.0
        tourm[1] = [t for t in tourm[1] if t not in _blk]
        beads_in = [b for b in beads_in if abs(_sd(b[0][5]) - _cc) > _half - 0.01 or False] 
        beads_in = [b for b in beads_in if abs(_sd(b[0][5]) - _cc) >= _half]
        for _sg in (-1, 1):
            p, j = _pt(_cc + _sg * TOUR_D / 2)
            tourm[1].append((inner[j][0], inner[j][1], tang[j][0], tang[j][1], p, "tour_black"))
            for _o in (TOUR_D + 1.5, TOUR_D + 4.5):
                p, j = _pt(_cc + _sg * _o)
                beads_in.append(((inner[j][0], inner[j][1], tang[j][0], tang[j][1], j, p), 1))
                SPLIT[(1, round(p, 4))] = 2 if _o < TOUR_D + 3 else 3   # red touching the black, orange outside
            # refill lapis evenly up to the next bead on this side
            _nb = [(_sg * (_sd(b[0][5]) - _cc)) - 1.5 for b in beads_in if _sg * (_sd(b[0][5]) - _cc) > _half]
            _nt = [(_sg * (_sd(t[4]) - _cc)) - tsize(t) / 2 for t in tourm[1] if _sg * (_sd(t[4]) - _cc) > _half]
            _edge = min(_nb + _nt) if (_nb + _nt) else _half
            _span = _edge - _half
            if _span > 1.0:
                _rm = [b for b in beads_in if _half <= _sg * (_sd(b[0][5]) - _cc) < _edge + 1.4]
                beads_in = [b for b in beads_in if b not in _rm]
                _nb = [(_sg * (_sd(b[0][5]) - _cc)) - 1.5 for b in beads_in if _sg * (_sd(b[0][5]) - _cc) > _half]
                _edge = min(_nb + _nt) if (_nb + _nt) else _half
                _span = _edge - _half
                _nf = max(1, int(round(_span / 3.0)))
                for _q in range(_nf):
                    p, j = _pt(_cc + _sg * (_half + _span / _nf * (_q + 0.5)))
                    beads_in.append(((inner[j][0], inner[j][1], tang[j][0], tang[j][1], j, p), 1))
                    SPLIT[(1, round(p, 4))] = 1
# bottom-centre override sections: split by count, orange half next to the rose quartz, red outward
_ov = {}
for (bb, strand) in beads_out:
    x, y, tx, ty, i, pos = bb
    if (strand, block_at(i)) in SPONDY_OVERRIDE:
        _ov.setdefault(block_at(i), []).append((abs(x), pos))
for blk_, g_ in _ov.items():
    g_.sort()
    n_or = (len(g_) + 1) // 2           # orange gets the extra disc
    for k_, (_, pos) in enumerate(g_):
        SPLIT[(0, round(pos, 4))] = 0          # outer strand bottom centre: turquoise heishi (was red/orange)
        TURQ_T[(0, round(pos, 4))] = 3.0
if V2:
    # bottom centre: one turquoise disc tight against each side of the 12.5 mm conch
    _c = [t for t in tourm[0] if len(t) > 5 and t[5] in ("conch12", "rose11", "wjade") and abs(t[0]) < 15]
    if _c:
        _cp = _c[0][4]
        if _c[0][5] == "wjade":
            # large centre barrel: pack orange, diopside triple and blue glass tight outward, drop heishi under them
            _h = tsize(_c[0]) / 2
            # 7 mm yellow tourmaline nestles 1/4 of its width into each concave end of the barrel
            _t0 = _h + TOUR_D / 2 - TOUR_D / 4
            _e = _t0 + TOUR_D / 2                     # outer edge of the tourmaline
            _gap = 3.1 if V3 else 6.2                 # v3: one orange disc; v2: two turquoise
            _gk, _gw = ("conch8", 8.0) if V3 else ("rose11", 11.0)   # v2: 11 mm rose quartz in place of blue glass
            if not V3:
                _e = _h                               # v2: no tourmaline, turquoise touches the barrel
            _layout = ([(_t0, "tour_ybright")] if V3 else []) + [(_e + 1.55, "spondy_or" if V3 else "orange")] + \
                      ([] if V3 else [(_e + 4.65, "lapis")]) + \
                      [(_e + _gap + 6.05, "peridot3"), (_e + _gap + 12.1 + _gw / 2 + 0.05, _gk)]
            _reach = _e + _gap + 12.1 + _gw + 0.1 + 0.9
            beads_out = [b for b in beads_out if abs(b[0][5] - _cp) >= _reach]
            tourm[0] = [t for t in tourm[0] if not (t[5] in ("peridot3", "conch8") and abs(t[4] - _cp) < 35)]
            for _sg in (-1, 1):
                for _off, _kind in _layout:
                    _p = _cp + _sg * _off
                    _j = min(int(np.searchsorted(s_out, _p)), len(outer) - 1)
                    if _kind == "spondy_or":
                        beads_out.append(((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _j, _p), 0))
                        SPLIT[(0, round(_p, 4))] = 3          # orange spondylus beside the tourmaline
                    elif _kind == "lapis":
                        beads_out.append(((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _j, _p), 0))
                        SPLIT[(0, round(_p, 4))] = 0          # second turquoise heishi (was lapis)
                        TURQ_T[(0, round(_p, 4))] = 3.0
                    elif _kind == "orange":
                        beads_out.append(((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _j, _p), 0))
                        SPLIT[(0, round(_p, 4))] = 0          # turquoise heishi each side of the barrel
                        TURQ_T[(0, round(_p, 4))] = 3.0
                    else:
                        tourm[0].append((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _p, _kind))
                if not V3:
                    tourm[0] = [t[:5] + ("ajas_t",) if (t[5] == "bicone8" and abs(t[4] - _cp) < 70) else t for t in tourm[0]]

                # close the gap between the blue glass and the remaining heishi with evenly spaced turquoise
                _start = _e + _gap + 12.1 + _gw + 0.1
                _nxt = sorted(_sg * (t[4] - _cp) - tsize(t) / 2 for t in tourm[0] if _sg * (t[4] - _cp) > _reach)
                _rest = [_nxt[0]] if _nxt else []
                if _rest:
                    _end = _rest[0]
                    beads_out = [b for b in beads_out if not (_start - 0.1 < _sg * (b[0][5] - _cp) < _end)]
                    _nf = int((_end - _start) // 2.4)
                    if _nf > 0:
                        _pitch = (_end - _start) / _nf
                        for _q in range(_nf):
                            _p = _cp + _sg * (_start + _pitch * (_q + 0.5))
                            _j = min(int(np.searchsorted(s_out, _p)), len(outer) - 1)
                            beads_out.append(((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _j, _p), 0))
                            SPLIT[(0, round(_p, 4))] = 0
                            TURQ_T[(0, round(_p, 4))] = _pitch
        else:
          beads_out = [b for b in beads_out if not ((0, block_at(b[0][4])) in SPONDY_OVERRIDE and abs(b[0][5] - _cp) < max(9.2, tsize(_c[0]) / 2 + 3.2))]
          for _sg in (-1, 1):
            _p = _cp + _sg * 7.55
            _j = min(int(np.searchsorted(s_out, _p)), len(outer) - 1)
            beads_out.append(((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _j, _p), 0))
            SPLIT[(0, round(_p, 4))] = 3          # orange spondylus each side of the bottom-centre bead

if V2 and not V3:
    # 10 mm apple jasper needs more room than the bicone: re-space the turquoise each side evenly
    for _t in [t for t in tourm[0] if t[5] == "ajas_t"]:
        for _sg2 in (-1, 1):
            _items = [(_sg2 * (b[0][5] - _t[4]), "d", b) for b in beads_out if 0 < _sg2 * (b[0][5] - _t[4]) < 60]
            _items += [(_sg2 * (u[4] - _t[4]), "t", u) for u in tourm[0] if u is not _t and 0 < _sg2 * (u[4] - _t[4]) < 60]
            _items.sort(key=lambda z: z[0])
            _run = []
            for _d, _k, _o in _items:
                if _k == "t":
                    _stop = _d - tsize(_o) / 2
                    break
                _run.append(_o)
            else:
                continue
            if not _run:
                continue
            for _o in _run:
                beads_out.remove(_o)
            _span = _stop - 5.0
            _nf = max(1, int(round(_span / 3.0)))
            for _q in range(_nf):
                _p = _t[4] + _sg2 * (5.0 + _span / _nf * (_q + 0.5))
                _j = min(int(np.searchsorted(s_out, _p)), len(outer) - 1)
                beads_out.append(((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _j, _p), 0))
                SPLIT[(0, round(_p, 4))] = 0
                TURQ_T[(0, round(_p, 4))] = _span / _nf

# 8 mm round denim lapis at the head (upper end, as worn) of lapis segments: 7 per side = 14
if V2:
    # centre the bottom inner bicone in the real space between its neighbouring discs
    for _k, _t in enumerate(tourm[1]):
        if _t[5] == "bicone8" and abs(_t[0]) < 15 and _t[1] > 0:
            _l = max([bb[5] for (bb, st) in beads_in if bb[5] < _t[4]], default=None)
            _r = min([bb[5] for (bb, st) in beads_in if bb[5] > _t[4]], default=None)
            if _l is not None and _r is not None:
                _p = (_l + _r) / 2
                _j = min(int(np.searchsorted(s_in, _p)), len(inner) - 1)
                tourm[1][_k] = (inner[_j][0], inner[_j][1], tang[_j][0], tang[_j][1], _p, "bicone8")
# bottom-centre inner strand: red then orange spiny oyster on each side of the rose bicone
for _t in tourm[1]:
    if _t[5] == "bicone8" and abs(_t[0]) < 15 and _t[1] > 0:
        for _sgn in (-1, 1):
            _side = sorted([bb for (bb, st) in beads_in if 0 < _sgn * (bb[5] - _t[4]) < 15],
                           key=lambda b: abs(b[5] - _t[4]))
            for _k, bb in enumerate(_side[:2]):
                SPLIT[(1, round(bb[5], 4))] = 0 if V2 else (3 if _k == 1 else 5)   # v1: red glass + orange; v2: turquoise
                if V2:
                    TURQ_T[(1, round(bb[5], 4))] = 3.0

if V2:
    # bottom inner strand: one chrome diopside rondelle on the centre side of each 9 mm rose quartz
    _bic = [t for t in tourm[1] if t[5] == "bicone8" and abs(t[0]) < 15 and t[1] > 0]
    if _bic:
        _bp = _bic[0][4]
        _rqs = [t for t in tourm[1] if t[5] in ("rose", "rose11") and abs(t[4] - _bp) < 40]
        if len(_rqs) == 2:
            # rebuild symmetrically: glass | turquoise | diopside | rose quartz, mirrored about the centre
            _d = sum(abs(t[4] - _bp) for t in _rqs) / 2
            _rsz = tsize(_rqs[0])
            _bh = 4.5                                 # centre bead is now a 9 mm rose quartz
            _outer = _d + _rsz / 2
            tourm[1] = [t for t in tourm[1] if t not in _rqs]
            beads_in = [b for b in beads_in if not (abs(b[0][5] - _bp) < _outer + 0.6 and abs(b[0][5] - _bp) > _bh - 0.1)]
            _kind = "conch8"                          # v2: blue faceted glass in place of the rose quartz
            _outer_fixed = _outer
            # nudge the whole group so the leftover space either side is equal
            _gl = min(_bp - b[0][5] for b in beads_in if b[0][5] < _bp) - 1.5 - _outer
            _gr = min(b[0][5] - _bp for b in beads_in if b[0][5] > _bp) - 1.5 - _outer
            _bp += (_gr - _gl) / 2
            for _k2, _t2 in enumerate(tourm[1]):
                if _t2 is _bic[0] or (_t2[5] == "bicone8" and abs(_t2[0]) < 15 and _t2[1] > 0):
                    _j = min(int(np.searchsorted(s_in, _bp)), len(inner) - 1)
                    tourm[1][_k2] = (inner[_j][0], inner[_j][1], tang[_j][0], tang[_j][1], _bp, "bicone8")
            for _sg in (-1, 1):
                _gc = _outer_fixed - 4.0                  # 8 mm glass keeps the same outer edge
                for _p, _k in ((_bp + _sg * _gc, _kind), (_bp + _sg * (_gc - 4.0 - PER_L_), "peridot2")):   # two diopside
                    _j = min(int(np.searchsorted(s_in, _p)), len(inner) - 1)
                    tourm[1].append((inner[_j][0], inner[_j][1], tang[_j][0], tang[_j][1], _p, _k))
                _span = (_gc - 4.0 - 2 * PER_L_) - _bh
                _nf = max(1, int(round(_span / 3.0)))
                for _q in range(_nf):
                    _p = _bp + _sg * (_bh + _span / _nf * (_q + 0.5))
                    _j = min(int(np.searchsorted(s_in, _p)), len(inner) - 1)
                    beads_in.append(((inner[_j][0], inner[_j][1], tang[_j][0], tang[_j][1], _j, _p), 1))
                    SPLIT[(1, round(_p, 4))] = 0
                    TURQ_T[(1, round(_p, 4))] = _span / _nf

# red 8 mm glass rondelle wherever a red spondylus section touches a white nephrite barrel
REDR_N = 0
for _lst, _st in ((beads_out, 0), (beads_in, 1)):
    for _b in barrels[_st]:
        if _b[5] not in ("white", "opal"):
            continue
        for _sgn in (-1, 1):
            _near = [bb for (bb, st) in _lst if 0 < _sgn * (bb[5] - _b[4]) < BAR_L / 2 + 3.5]
            if not _near:
                continue
            bb = min(_near, key=lambda b: abs(b[5] - _b[4]))
            if SPLIT.get((_st, round(bb[5], 4)), block_kind(bb[4], _st)) == 2:
                SPLIT[(_st, round(bb[5], 4))] = 5
                REDR_N += 1
if V2:
    # an 8 mm red glass rondelle directly under (below, as worn) every 12.5 mm pink conch
    for _lst, _st in ((beads_out, 0), (beads_in, 1)):
        for _b in barrels[_st]:
            if _b[5] not in ("conch_pink", "opal10", "rose9b"):
                continue
            _cand = []
            for _sgn in (-1, 1):
                _near = [bb for (bb, st) in _lst if 0 < _sgn * (bb[5] - _b[4]) < 6.0 + 3.5]
                if _near:
                    _cand.append(min(_near, key=lambda b: abs(b[5] - _b[4])))
            if _cand:
                bb = max(_cand, key=lambda b: b[1])          # the lower neighbour (larger y)
                SPLIT[(_st, round(bb[5], 4))] = 5
                REDR_N += 1
print("red glass rondelles:", REDR_N)

DEN_D = 8.0
PICKED_KEYS = []
denim = []
lap_groups = {}
for lst in (beads_out, beads_in):
    for (bb, strand) in lst:
        x, y, tx, ty, i, pos = bb
        if (block_kind(i, strand) == 1 or (strand, block_at(i)) in SPONDY_OVERRIDE) and (FLAT or not orig_hidden(x, y)):
            lap_groups.setdefault((strand, block_at(i)), []).append(bb)
sides = {-1: [], 1: []}
for key, g in lap_groups.items():
    g.sort(key=lambda b: b[5])
    if len(g) < 3:
        continue
    mx = sum(b[0] for b in g) / len(g)
    sides[-1 if mx < 0 else 1].append((min(b[1] for b in g), key, g))
remove = set()
for sd_, lst in sides.items():
    lst.sort()
    pick = [lst[int(round((j + 0.5) * len(lst) / 7 - 0.5))] for j in range(min(7, len(lst)))]
    # lapis segments that now end in an added 8 mm round lose their head round (all heishi instead)
    excl = {(st_, b_) for (n_, st_) in ((6, 1), (36, 1)) for b_ in (n_ - 1, n_) if kind_blk(b_, st_) == "L"}
    excl |= SPONDY_OVERRIDE
    pick = [p_ for p_ in pick if p_[1] not in excl]
    # extra head rounds (inner strand, below the tan tourmaline at ~3 / ~9 o'clock), mirrored
    for _key in ((1, 9), (1, 32)):
        _g = lap_groups.get(_key)
        if _g and _key not in [p_[1] for p_ in pick] and ((_g[0][0] < 0) == (sd_ < 0)):
            pick.append((min(b[1] for b in _g), _key, sorted(_g, key=lambda b: b[5])))
    if FLAT:
        # use exactly the same lapis segments as the hanging view
        _fixed = [(0, 4), (0, 8), (0, 12), (0, 16), (0, 25), (0, 29), (0, 33), (0, 37),
                  (1, 9), (1, 13), (1, 17), (1, 24), (1, 28), (1, 32)]
        pick = [(0, k_, sorted(lap_groups[k_], key=lambda b: b[5])) for k_ in _fixed
                if k_ in lap_groups and ((k_[1] < 21) == (sd_ < 0))]
    PICKED_KEYS.extend(p_[1] for p_ in pick)
    for _, (strand, blk), g in pick:
        head = g[:3] if g[0][1] <= g[-1][1] else g[-3:]
        for b in head:
            remove.add((strand, round(b[5], 4)))
        cpos = sum(b[5] for b in head) / 3
        path, ss = (outer, s_out) if strand == 0 else (inner, s_in)
        j = min(int(np.searchsorted(ss, cpos)), len(path) - 1)
        denim.append((path[j][0], path[j][1], strand))
beads_out = [b for b in beads_out if (b[1], round(b[0][5], 4)) not in remove]
beads_in = [b for b in beads_in if (b[1], round(b[0][5], 4)) not in remove]
for _st in (0, 1):
    for _t in tourm[_st]:
        if len(_t) > 5 and _t[5] == "lapis8":
            denim.append((_t[0], _t[1], _st))
print("denim lapis rounds:", len(denim), "left", sum(1 for d_ in denim if d_[0] < 0), "right", sum(1 for d_ in denim if d_[0] > 0))

shadow = Image.new("L", (W, H), 0)
sd = ImageDraw.Draw(shadow)
layer = canvas.copy()
d = ImageDraw.Draw(layer)


def quad(x, y, tx, ty, a0, a1, along):
    nx, ny = ty, -tx
    return [P(x + nx * a0 - tx * along, y + ny * a0 - ty * along),
            P(x + nx * a1 - tx * along, y + ny * a1 - ty * along),
            P(x + nx * a1 + tx * along, y + ny * a1 + ty * along),
            P(x + nx * a0 + tx * along, y + ny * a0 + ty * along)]

if V2 and not V3:
    def _kind_of(st, b):
        return SPLIT.get((st, round(b[5], 4)), block_kind(b[4], st))
    # inner strand: spondylus between each bottom blue glass and the green jade -> turquoise
    _bgl = [t for t in tourm[1] if t[5] == "conch8"]
    _gjb = [b for b in barrels[1] if b[5] == "gjade7"]
    for _g in _bgl:
        _jd = min(_gjb, key=lambda b: abs(b[4] - _g[4]), default=None)
        if _jd is None or abs(_jd[4] - _g[4]) > 40:
            continue
        _lo, _hi = sorted((_g[4], _jd[4]))
        for (bb, st) in beads_in:
            if _lo < bb[5] < _hi and _kind_of(1, bb) in (2, 3):
                SPLIT[(1, round(bb[5], 4))] = 0
                TURQ_T[(1, round(bb[5], 4))] = 3.0
    # lower strand: the short turquoise run between the moved apple jasper and the 11 mm rose quartz -> red spiny oyster
    _aj = [t for t in tourm[0] if t[5] == "ajas_t"]
    _rq = [t for t in tourm[0] if t[5] == "rose11"]
    for _a in _aj:
        _r = min(_rq, key=lambda t: abs(t[4] - _a[4]), default=None)
        if _r is None or abs(_r[4] - _a[4]) > 25:
            continue
        _lo, _hi = sorted((_a[4], _r[4]))
        for (bb, st) in beads_out:
            if _lo < bb[5] < _hi:
                SPLIT[(0, round(bb[5], 4))] = 2
        # one more red disc: push the jasper 3 mm outward and drop the first turquoise beyond it
        _d = 1 if _a[4] > _r[4] else -1
        _far = sorted([bb for (bb, st) in beads_out if 0 < _d * (bb[5] - _a[4]) < 12], key=lambda b: abs(b[5] - _a[4]))
        if _far:
            beads_out = [b for b in beads_out if b[0] is not _far[0]]
        _na = _a[4] + _d * 3.0
        _j = min(int(np.searchsorted(s_out, _na)), len(outer) - 1)
        tourm[0] = [(outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _na, "ajas_t") if t is _a else t for t in tourm[0]]
        _p = _na - _d * (5.0 + 1.5)
        _j = min(int(np.searchsorted(s_out, _p)), len(outer) - 1)
        beads_out.append(((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _j, _p), 0))
        SPLIT[(0, round(_p, 4))] = 2
        # trial: the red discs here become 8 x 4 mm chrome diopside rondelles, as many as fit, centred
        _e1 = _na - _d * 5.0                                   # jasper edge facing the rose quartz
        _e2 = _r[4] + _d * tsize(_r) / 2                       # rose quartz edge facing the jasper
        beads_out = [b for b in beads_out if not (min(_e1, _e2) - 0.2 < b[0][5] < max(_e1, _e2) + 0.2)]
        _gap = abs(_e1 - _e2)
        _nd = max(1, int((_gap + 0.4) // PER_L_))
        _c0 = (_e1 + _e2) / 2
        for _q in range(_nd):
            _p = _c0 + (_q - (_nd - 1) / 2) * PER_L_
            _j = min(int(np.searchsorted(s_out, _p)), len(outer) - 1)
            tourm[0].append((outer[_j][0], outer[_j][1], tang[_j][0], tang[_j][1], _p, "peridot"))


if V4:
    # ---------------- VERSION 4: same beads, new arrangement ----------------
    # per side, top -> bottom. Outer colour order: G Y B R W ; inner: G R Y W B. Dark at top, light at bottom.
    SZ = {"diop": PER_L_, "jade": 7.3, "gglass": 8.0, "gtourm": 7.0, "olive": 7.0, "tan": 7.0, "pink": 7.0,
          "black": 7.0, "yellow": 8.0, "opal10": 10.0, "opal9": 9.0, "rq9": 9.0, "rq11": 11.0, "ajas": 10.0,
          "mook": 8.0, "rbic": 8.0, "sapph": 8.0, "lapis8": 8.0, "blueglass": 8.0, "red": 3.0, "orange": 3.0,
          "redglass": 3.0, "focal": 19.7, "lapisH": 3.0, "mookred": 8.0, "tblue": 7.0, "mookyel": 8.0, "mookrd": 8.0, "mookorg": 8.0, "opal8": 8.0, "amet": 8.0}
    def F(core, flank, n):                     # wrap a core with n flank beads split either side
        a = n // 2; b = n - a
        return [flank] * a + core + [flank] * b
    if V5:
        BANDS = [   # (outer, inner) per band, top -> bottom; same band sits at the same height on both strands
            (["black", "sapph", "black"],                       ["sapph", "lapis8", "sapph"]),          # deep blue
            (F(["olive"], "diop", 7),                            F(["gtourm"], "diop", 7)),              # green
            (F(["mook"], "red", 6),                              F(["mook"], "red", 6)),                 # red
            (["tan", "yellow", "tan"],                           ["yellow", "yellow"]),                  # yellow
            (["lapis8", "sapph", "lapis8"],                      ["blueglass"]),                         # blue
            (F(["jade", "gglass", "jade"], "diop", 8),           F(["jade", "jade", "jade", "jade"], "diop", 9)),   # green
            (["red", "red"] + F(["ajas"], "orange", 8) + ["red", "red"],
                                                                 ["red", "red"] + F(["ajas", "ajas"], "orange", 8) + ["red", "red"]),  # red-orange
            (["opal10", "rq11", "opal10"],                       ["opal9", "opal10"]),                   # white
            (["redglass", "pink", "rbic", "pink", "redglass", "rq9"], ["redglass", "pink", "rq9", "pink", "redglass"]),  # pink/rose
        ]
        BANDS_RAW = [tuple(list(x) for x in b) for b in BANDS]
        # reference layout = the previous version (frames on green, red-orange, white only); its turquoise runs are kept
        BANDS_PREV = [tuple((["lapisH"] + list(x) + ["lapisH"]) if i in (5, 6, 7) else list(x) for x in b)
                      for i, b in enumerate(BANDS_RAW)]
        # room for the new borders comes from the top green band: fewer chrome diopside there
        BANDS[1] = (F(["olive"], "diop", 3), F(["gtourm"], "diop", 3))
        # only 10 green jade: inner green band keeps 3 jade, the lost jade's space goes to 2 more chrome diopside
        BANDS[5] = (F(["jade", "gglass", "jade"], "diop", 6), F(["jade", "jade", "jade"], "diop", 8))   # outer: one fewer each end; inner: 4 above, 4 below
        # 8 mm maroon mookaite replaces the 10 mm apple jasper
        BANDS[6] = tuple([("mookred" if k == "ajas" else k) for k in b] for b in BANDS[6])
        # sapphire glass bicones -> 7 mm blue (indicolite) tourmaline
        BANDS = [tuple([("tblue" if k == "sapph" else k) for k in x] for x in b) for b in BANDS]
        # the tan tourmaline below the yellow glass (outer strand) -> 8 mm golden-yellow mookaite
        _o = list(BANDS[3][0]); _o[_o.index("yellow") + 1] = "mookyel"
        _o[_o.index("tan")] = "rbic"                        # top tan tourmaline -> rose glass bicone
        _i = list(BANDS[3][1]); _i[len(_i) - 1 - _i[::-1].index("yellow")] = "mookyel"   # lower yellow glass, inner
        def _ysw(seq):                       # brighter yellow glass moves below the mookaite
            seq = list(seq); iy, im = seq.index("yellow"), seq.index("mookyel")
            if iy < im:
                seq[iy], seq[im] = seq[im], seq[iy]
            return seq
        _o, _i = _ysw(_o), _ysw(_i)
        BANDS[3] = (_o + ["redglass", "orange", "orange"], ["rbic"] + _i + ["yellow", "redglass", "orange", "orange"])   # + rose bicone; + second yellow glass (inner)
        BANDS = [tuple([("opal8" if k in ("opal10", "opal9") else k) for k in x] for x in b) for b in BANDS]   # 8 mm white opal
        BANDS[4] = (list(BANDS[4][0]) + ["lapisH"],                                      # 1 lapis below the outer blue beads
                    ["lapisH", "lapisH", "lapisH"] + list(BANDS[4][1]))   # 3 lapis above the inner blue glass
        # red-orange band: orange spondylus groups -> mookaite, going out from the maroon centre: red then orange;
        # one red spondylus disc dropped at each end to make room
        def _mookband(seq):
            core = [k for k in seq if k == "mookred"]
            return ["redglass", "mookorg", "mookrd"] + core + ["mookrd", "mookorg", "redglass"]   # red glass at each end
        BANDS[6] = (_mookband(BANDS[6][0]), _mookband(BANDS[6][1]))
        # rebalance: thinner green and brown/red bands, thicker blue band (lapis heishi + 8 mm lapis rounds)
        BANDS[4] = (["lapisH"] * 2 + ["lapis8", "blueglass", "tblue", "lapis8"] + ["lapisH"] * 2,   # blue, outer ~43 mm;
                    # its blue glass sits just above (and beside) the inner blue glass
                    ["lapisH"] * 5 + ["blueglass"] + ["lapisH"] * 5)                         # blue, inner ~38 mm
        BANDS[5] = (["diop"] * 3 + ["jade", "gglass", "jade"] + ["diop"] * 5,     # outer green: 2 extra diopside underneath
                    F(["jade", "jade", "jade"], "diop", 6))
        BANDS[6] = (["mookorg", "mookrd", "mookred", "mookrd"],                             # brown/red, one bead fewer
                    ["redglass", "mookrd", "mookred", "mookrd", "redglass"])                 # brown/red, one bead fewer
        # rose quartz band where the whites were (per side: 3 x 9 mm + 2 x 11 mm, so 6 + 4 in all)
        BANDS[7] = (["diop", "amet", "rq9", "rq9", "diop"], ["diop", "amet", "rq9", "diop"])     # amethyst on top, 9 mm rose quartz below; no 11 mm
        # whites (10 mm) move to the bottom band next to the focal; inner strand's centre bead is a white too
        BANDS[8] = (["opal10", "redglass", "pink", "rbic", "pink", "redglass", "opal10"],
                    ["opal10", "redglass", "pink", "pink", "redglass"])
        # frame the green, red-orange and white bands with one lapis heishi at each end, both strands
        for _bi in (2, 3, 5, 6, 7, 8):   # red, yellow, green, red-orange, white, pink
            BANDS[_bi] = tuple(["lapisH"] + list(b) + ["lapisH"] for b in BANDS[_bi])
        # rose bicone moves from the top of the yellow band to the bottom of the brown mookaite band;
        # in the yellow band it is replaced by two orange spiny oyster heishi; outer brown band loses one mookaite
        def _swap_bic(seq):
            seq = list(seq); k = seq.index("rbic")
            return seq[:k] + ["orange", "orange"] + seq[k + 1:]
        BANDS[3] = (_swap_bic(BANDS[3][0]), _swap_bic(BANDS[3][1]))
        _yi = list(BANDS[3][1]); _yi[_yi.index("redglass")] = "orange"       # inner: orange under the two yellow glass
        BANDS[3] = (BANDS[3][0], _yi)
        _bo = list(BANDS[6][0]); _bo.pop(len(_bo) - 2); _bo.insert(len(_bo) - 1, "rbic")      # drop last mookaite, add bicone
        _bi = list(BANDS[6][1]); _bi.insert(len(_bi) - 1, "rbic")                               # inner: bicone at the bottom
        _k = _bi.index("rbic")
        if _bi[_k - 1] == "redglass":
            _bi.pop(_k - 1)                                                                      # no red glass above it
        BANDS[6] = (_bo, _bi)
        # yellow band moves down, between the mookaite (brown) band and the white band
        _ord = [0, 1, 2, 4, 5, 6, 3, 7, 8]
        BANDS = [BANDS[i] for i in _ord]
        BANDS_PREV = [BANDS_PREV[i] for i in _ord]
    OUTER = [
        F(["olive"], "diop", 6),                                   # G (dark)
        ["tan"],                                                   # Y
        ["black", "sapph", "black"],                               # B (dark)
        F(["mook"], "red", 8),                                     # R (dark)
        ["opal9"],                                                 # W
        F(["jade"], "diop", 6),                                    # G
        ["yellow"],                                                # Y
        ["sapph", "lapis8", "sapph"],                              # B
        ["red", "red"] + F(["ajas"], "orange", 4) + ["red", "red"],# R
        ["opal10", "rq9"],                                         # W
        F(["jade", "gglass", "jade"], "diop", 4),                  # G (light)
        ["yellow"],                                                # Y
        ["blueglass"],                                             # B (light)
        ["redglass", "redglass", "pink", "rbic", "pink", "redglass", "redglass"],   # R (light)
        ["rq9"],                                                   # W, then the focal at the centre
    ]
    INNER = [
        F(["gtourm"], "diop", 6),                                  # G (dark)
        F(["mook"], "red", 8),                                     # R (dark)
        ["tan"],                                                   # Y
        ["opal10"],                                                # W
        ["lapis8", "sapph"],                                       # B
        F(["jade"], "diop", 6),                                    # G
        F(["ajas"], "orange", 8),                                  # R
        ["yellow"],                                                # Y
        ["opal10", "rq11"],                                        # W
        ["lapis8"],                                                # B
        F(["jade", "jade"], "diop", 3),                            # G (light)
        F(["pink", "ajas", "pink"], "orange", 5),                  # R (light), then rose quartz at the centre
    ]
    CENTRE = {0: "focal", 1: ("rq11" if V5 else "rq9")}     # v5: 11 mm swirled rose quartz at the inner strand centre
    LAP_BUDGET = {0: 15, 1: 15}                # lapis heishi used as dark filler, from the top down (per side)
    KIND_T = {"diop": "peridot", "jade": "gjade7t", "gglass": "v4_gglass", "gtourm": "tour_green", "olive": "v4_olive",
              "tan": "tour_yellow", "pink": "tour_pink", "black": "tour_black", "yellow": "bicone_lime",
              "opal10": "v4_opal10", "opal9": "v4_opal9", "rq9": "rose", "rq11": "rose11", "ajas": "ajas_t", "mookred": "v5_mookred", "tblue": "v5_tblue", "mookyel": "v5_mookyel", "mookrd": "v5_mookrd", "mookorg": "v5_mookorg", "opal8": "v5_opal8", "amet": "v5_amet",
              "mook": "mook8", "rbic": "v4_rbic", "sapph": "v4_sapph", "blueglass": "conch8", "focal": "wjade"}
    HEI = {"red": 2, "orange": 3, "redglass": 5}
    V5_TARGET = None
    V5_EQ = {}
    for _pass in (range(2) if V5 else range(1)):
        beads_out, beads_in = [], []
        tourm = {0: [], 1: []}
        barrels = {0: [], 1: []}
        denim = []
        V4_USED = {}
        V5_CEN = {}
        for st, STN in (((1, INNER), (0, OUTER)) if V5 else ((0, OUTER), (1, INNER))):
            path, ss = (outer, s_out) if st == 0 else (inner, s_in)
            Hh = HIDDEN_OUT if st == 0 else HIDDEN_IN
            Lf = ss[-1] + Hh
            H2 = Lf / 2
            cz = SZ[CENTRE[st]] / 2
            if V5:
                STN = [b[st] for b in BANDS]
            T = sum(SZ[k] for stn in STN for k in stn)
            f = (H2 - cz - T) / (len(STN) + 0.5)
            if f < 2.4:
                raise SystemExit(f"v4 layout does not fit on strand {st}: gap {f:.2f} mm")
            def put(g, kind, pitch=None):
                for gg in (g, Lf - g):             # left side, then its mirror on the right
                    sp = gg - Hh / 2
                    if not (0 <= sp <= ss[-1]):
                        continue
                    j = min(int(np.searchsorted(ss, sp)), len(path) - 1)
                    x, y = path[j]
                    if kind in HEI or kind in ("turq", "lapisH"):
                        rec = ((x, y, tang[j][0], tang[j][1], j, sp), st)
                        (beads_out if st == 0 else beads_in).append(rec)
                        SPLIT[(st, round(sp, 4))] = HEI.get(kind, 0 if kind == "turq" else 1)
                        if kind == "turq":
                            TURQ_T[(st, round(sp, 4))] = pitch
                    elif kind == "lapis8":
                        denim.append((x, y, st))
                    else:
                        tourm[st].append((x, y, tang[j][0], tang[j][1], sp, KIND_T[kind]))
            # gap filler: lapis heishi while the dark budget lasts, then turquoise
            gaps = [f / 2] + [f] * len(STN)
            if V5:
                # align band centres by height: use common fractions computed from the widest of each band pair
                Hin = (s_in[-1] + HIDDEN_IN) / 2 - SZ[CENTRE[1]] / 2
                Wmax = [max(sum(SZ[k] for k in b[0]), sum(SZ[k] for k in b[1])) for b in BANDS]
                gapc = (Hin - sum(Wmax)) / (len(BANDS) + 0.5)
                cen, acc = [], gapc / 2
                for w in Wmax:
                    cen.append((acc + w / 2) / Hin); acc += w + gapc
                Hs = H2 - cz
                # turquoise gaps come from the unframed layout; the extra frame width is taken from the top section
                Wmax0 = [max(sum(SZ[k] for k in b[0]), sum(SZ[k] for k in b[1])) for b in BANDS_PREV]
                gapc0 = (Hin - sum(Wmax0)) / (len(BANDS_PREV) + 0.5)
                cen0, acc = [], gapc0 / 2
                for w in Wmax0:
                    cen0.append((acc + w / 2) / Hin); acc += w + gapc0
                raw = [b[st] for b in BANDS_PREV]
                w0 = [sum(SZ[k] for k in r) for r in raw]
                st0 = [c * Hs - w / 2 for c, w in zip(cen0, w0)]
                mids = [st0[i + 1] - (st0[i] + w0[i]) for i in range(len(raw) - 1)]
                last = Hs - (st0[-1] + w0[-1])
                widths = [sum(SZ[k] for k in stn) for stn in STN]
                first = Hs - sum(widths) - sum(mids) - last
                if st == 0:                         # outer green's extra length goes downward, not into the top section
                    first += widths[4] - 52.6
                    first += 8.0                        # rose band's diopside borders: room taken locally, not from the top
                if st == 1:                         # inner strand: green band raised 4 mm
                    mids[3] -= 4.0
                    mids[4] += 4.0
                    mids[5] -= 8.0                      # inner rose bicone takes its room from the run just above it
                    first += 8.0
                    mids[6] -= 8.0                      # second inner yellow glass takes its room from the run just below
                    first += 8.0
                    mids[6] -= 4.0                      # rose band's diopside borders: 4 mm from the run above it...
                    mids[7] -= 4.0                      # ...and 4 mm from the run below it
                    first += 8.0
                if first < 3.0:                     # take the shortfall from the lapis run behind the neck, not turquoise
                    mids[0] -= 3.0 - first
                    first = 3.0
                gaps = [first] + mids + [last]
                if st == 1:                         # remember where the inner bands sit (fraction of the strand)
                    _acc, _c = 0.0, []
                    for _gi in range(len(widths)):
                        _acc += gaps[_gi]; _c.append((_acc + widths[_gi] / 2) / Hs); _acc += widths[_gi]
                    V5_CEN[1] = _c
                else:                               # outer bands placed to line up with their inner partners
                    _cur, _a = [], 0.0
                    for _gi in range(len(widths)):
                        _a += gaps[_gi]; _cur.append(_a); _a += widths[_gi]
                    _st = list(_cur)
                    for i in (3, 4, 5):                 # only the blue, green and brown bands move down to line up
                        _st[i] = V5_CEN[1][i] * Hs - widths[i] / 2
                    _st[3] += 11.0                      # outer blue band lowered so its blue glass sits just above the inner one
                    _st[4] += 4.0                       # outer green keeps its top; the extra diopside extends it downward
                    for i in (6, 7, 8):                 # bands below keep their places
                        _st[i] -= widths[4] - 52.6
                    _st[7] -= 4.0                       # rose band grows 4 mm upward and 4 mm downward
                    _st[8] -= 8.0
                    gaps = [_st[0]] + [_st[i + 1] - (_st[i] + widths[i]) for i in range(len(widths) - 1)] + \
                           [Hs - (_st[-1] + widths[-1])]
                    first, mids = gaps[0], gaps[1:-1]
                print(f"v5 strand {st}: gaps {[round(float(x), 1) for x in gaps]}")
                gaps[-1] -= 2 * PER_L_              # room for two chrome diopside beside the centre bead
                # equal turquoise runs between all coloured segments (lapis runs behind the neck unchanged)
                _nl = 2 if st == 0 else 3
                _avg = sum(gaps[_nl:]) / len(gaps[_nl:])
                gaps = gaps[:_nl] + [_avg] * (len(gaps) - _nl)
                _a2, _c2 = 0.0, []
                for _gi in range(len(widths)):
                    _a2 += gaps[_gi]; _c2.append((_a2 + widths[_gi] / 2) / Hs); _a2 += widths[_gi]
                V5_EQ[st] = _c2
                V5_EQ[("geo", st)] = (Hs, list(widths), _c2[1] * Hs + widths[1] / 2)   # end of band 1 (fixed)
                if V5_TARGET is not None:       # second pass: every visible band at the shared (averaged) height
                    _sx = [_c2[i] * Hs - widths[i] / 2 for i in range(len(widths))]
                    for i in range(3, len(widths)):
                        _sx[i] = V5_TARGET[i] * Hs - widths[i] / 2
                    _sx[2] = V5_U[st]
                    if st == 0:
                        _sx[3] += 15.0                    # outer blue band down to sit level with the inner one
                    if _sx[2] < _sx[1] + widths[1] + 3.0:     # push band 1 up into the lapis behind the neck if needed
                        _sx[1] = max(_sx[0] + widths[0] + 3.0, _sx[2] - 3.0 - widths[1])
                        _sx[2] = max(_sx[2], _sx[1] + widths[1] + 3.0)
                    gaps = [_sx[0]] + [_sx[i + 1] - (_sx[i] + widths[i]) for i in range(len(widths) - 1)] + \
                           [Hs - 2 * PER_L_ - (_sx[-1] + widths[-1])]
                print(f"v5 strand {st} pass gaps", [round(float(x),1) for x in gaps]) if V5_TARGET is not None else None
            g = 0.0
            lap = LAP_BUDGET[st]
            for gi, gl in enumerate(gaps):
                nl = max(1, int(round(gl / 3.0)))
                if (lap >= nl and not V5) or (V5 and gi <= (1 if st == 0 else 2)):   # v5: same lapis runs as before
                    for q in range(nl):
                        put(g + gl / nl * (q + 0.5), "lapisH")
                    lap -= nl
                    V4_USED["lapisH"] = V4_USED.get("lapisH", 0) + 2 * nl
                else:
                    nt = max(1, int(round(gl / 2.4)))
                    for q in range(nt):
                        put(g + gl / nt * (q + 0.5), "turq", gl / nt)
                    V4_USED["turq"] = V4_USED.get("turq", 0) + 2 * nt
                g += gl
                if gi < len(STN):
                    for k in STN[gi]:
                        put(g + SZ[k] / 2, k)
                        V4_USED[k] = V4_USED.get(k, 0) + 2
                        g += SZ[k]
            if V5:                                   # one chrome diopside touching the centre bead, each side
                put(H2 - cz - PER_L_ / 2, "diop")
                put(H2 - cz - 1.5 * PER_L_, "diop")
                V4_USED["diop"] = V4_USED.get("diop", 0) + 4
            # centre bead at the bottom (one only)
            sp = H2 - Hh / 2
            j = min(int(np.searchsorted(ss, sp)), len(path) - 1)
            tourm[st].append((path[j][0], path[j][1], tang[j][0], tang[j][1], sp, KIND_T[CENTRE[st]]))
            V4_USED[CENTRE[st]] = V4_USED.get(CENTRE[st], 0) + 1

        if V5 and _pass == 0:
            # shared heights for bands 3..8, plus a per-strand start for band 2, chosen by least squares so the
            # turquoise runs on BOTH strands come out as equal as possible
            _nb = len(V5_EQ[0]); _k = _nb - 3                        # t3..t8
            _nv = _k + 4                                              # + u0, u1 (band-2 starts) + m0, m1
            _A, _b = [], []
            for _s in (0, 1):
                _H, _w, _e1 = V5_EQ[("geo", _s)]
                iu, im = _k + _s, _k + 2 + _s
                def R():
                    return [0.0] * _nv
                if _s == 0:                                           # outer: run above band 2 is turquoise
                    r = R(); r[iu] = 1; r[im] = -1; _A.append(r); _b.append(_e1)
                r = R(); r[0] = _H; r[iu] = -1; r[im] = -1; _A.append(r); _b.append(_w[3] / 2 + _w[2])   # run above blue
                for j in range(_k - 1):
                    i = 3 + j; r = R(); r[j + 1] = _H; r[j] = -_H; r[im] = -1
                    _A.append(r); _b.append(_w[i + 1] / 2 + _w[i] / 2)
                r = R(); r[_k - 1] = -_H; r[im] = -1; _A.append(r); _b.append(-_H + 2 * PER_L_ + _w[_nb - 1] / 2)
            _sol = np.linalg.lstsq(np.array(_A), np.array(_b), rcond=None)[0]
            V5_TARGET = list(V5_EQ[0][:3]) + list(_sol[:_k])
            V5_U = {0: _sol[_k], 1: _sol[_k + 1]}
    print("v4 bead use (full necklace):", dict(sorted(V4_USED.items())))

allbeads = beads_out + beads_in
for (x, y, tx, ty, i, _p), strand in allbeads:
    if hidden(x, y):
        continue
    sd.polygon([(px + 3 * S, py + 5 * S) for px, py in quad(x, y, tx, ty, -3.8, 3.8, 0.9)], fill=255)
for st in (0, 1):
    for x, y, tx, ty, *_ in barrels[st]:
        if not hidden(x, y):
            sd.polygon([(px + 3 * S, py + 5 * S) for px, py in quad(x, y, tx, ty, -4.7, 4.7, 5.2)], fill=255)
for st in (0, 1):
    for x, y, tx, ty, _, kind in jaspers[st]:
        if not hidden(x, y):
            px, py = P(x, y)
            r = ROUND_D[kind] / 2 * S
            sd.ellipse([px - r + 3 * S, py - r + 5 * S, px + r + 3 * S, py + r + 5 * S], fill=255)
for st in (0, 1):
    for t in tourm[st]:
        x, y = t[0], t[1]
        if not hidden(x, y):
            px, py = P(x, y); r = tsize(t) / 2 * S
            sd.ellipse([px - r + 3 * S, py - r + 5 * S, px + r + 3 * S, py + r + 5 * S], fill=255)
shadow = shadow.filter(ImageFilter.GaussianBlur(3 * S))
layer = Image.composite(Image.new("RGB", (W, H), (0, 0, 0)), layer,
                        shadow.point(lambda v: int(v * 0.85)))
d = ImageDraw.Draw(layer)

for (x, y, tx, ty, i, _p), strand in allbeads:
    if hidden(x, y):
        continue
    kind = SPLIT.get((strand, round(_p, 4)), block_kind(i, strand))               # inner strand opposite phase -> light beside dark
    nx, ny = ty, -tx
    if kind == 4:
        # 6 x 2 mm aqua glass rondelle: transparent sky-aqua, glossy, rounded rim
        R = 3.0
        nstrip = 12
        for k in range(nstrip):
            a0 = -R + 2 * R * k / nstrip
            a1 = -R + 2 * R * (k + 1) / nstrip
            ac = (a0 + a1) / 2
            u = (k + 0.5) / nstrip
            half = 0.95 * (max(0.0, 1 - (abs(ac) / R) ** 4)) ** 0.5
            f = 0.70 + 0.45 * math.sin(math.pi * u) ** 0.6
            d.polygon(quad(x, y, tx, ty, a0, a1, max(half, 0.12)), fill=sh((40, 175, 235), f))
        d.polygon(quad(x, y, tx, ty, -0.5, 0.5, 0.9), fill=(150, 225, 245))      # light through the hole
        gx, gy = P(x + nx * 1.2, y + ny * 1.2)
        d.ellipse([gx - 2.5, gy - 2.5, gx + 2.5, gy + 2.5], fill=(240, 252, 255))
        continue
    if kind == 5:
        # 8 mm opaque red glass rondelle: glossy, puffy rim
        R = 4.0
        nstrip = 14
        col = (205, 22, 24)
        for k in range(nstrip):
            a0 = -R + 2 * R * k / nstrip
            a1 = -R + 2 * R * (k + 1) / nstrip
            ac = (a0 + a1) / 2
            u = (k + 0.5) / nstrip
            half = 1.45 * (max(0.0, 1 - (abs(ac) / R) ** 3)) ** 0.5
            f = 0.50 + 0.65 * math.sin(math.pi * u) ** 0.7
            d.polygon(quad(x, y, tx, ty, a0, a1, max(half, 0.15)), fill=sh(col, f))
        gx, gy = P(x + nx * 1.4, y + ny * 1.4)
        d.ellipse([gx - 0.55 * S, gy - 0.3 * S, gx + 0.55 * S, gy + 0.3 * S], fill=(255, 140, 130))
        gx, gy = P(x + nx * 1.5, y + ny * 1.5)
        d.ellipse([gx - 2.2, gy - 2.2, gx + 2.2, gy + 2.2], fill=(255, 235, 230))
        continue
    if kind in (2, 3):
        # spiny oyster spondylus heishi (red 8x4 mm / orange 8x3 mm): rounded edge, satin polish, growth bands
        col = jitter(random.choice(SPINY if kind == 2 else SPINY_ORANGE), 10)
        R = SPY_D / 2
        half_t = (SPY_PITCH if kind == 2 else ORG_PITCH) * 0.49
        nstrip = 14
        for k in range(nstrip):
            a0 = -R + 2 * R * k / nstrip
            a1 = -R + 2 * R * (k + 1) / nstrip
            ac = (a0 + a1) / 2
            u = (k + 0.5) / nstrip
            half = half_t * (max(0.0, 1 - (abs(ac) / R) ** 4)) ** 0.5
            f = 0.48 + 0.62 * math.sin(math.pi * u) ** 0.8
            d.polygon(quad(x, y, tx, ty, a0, a1, max(half, 0.15)), fill=sh(col, f))
        for _ in range(random.randint(1, 3)):   # shell growth banding / colour variation
            a = random.uniform(-0.8 * R, 0.8 * R)
            w = random.uniform(0.25, 0.6)
            c2 = sh(col, random.choice([0.80, 0.88, 1.10]))
            d.polygon(quad(x + nx * a, y + ny * a, tx, ty, -w / 2, w / 2, half_t * 0.85), fill=c2)
        gx, gy = P(x + nx * 0.33 * R, y + ny * 0.33 * R)
        d.ellipse([gx - 0.45 * S, gy - 0.35 * S, gx + 0.45 * S, gy + 0.35 * S], fill=sh(col, 1.45))
        gx, gy = P(x + nx * 0.36 * R, y + ny * 0.36 * R)
        d.ellipse([gx - 2, gy - 2, gx + 2, gy + 2], fill=(255, 235, 225))
        continue
    if kind == 1:
        # royal-blue lapis heishi rondelle: puffy rounded edge, glossy, calcite + pyrite
        col = jitter(random.choice(ROYAL), 10)
        R = LAP_D / 2
        half_t = LAP_PITCH * 0.50
        nstrip = 12
        for k in range(nstrip):
            a0 = -R + 2 * R * k / nstrip
            a1 = -R + 2 * R * (k + 1) / nstrip
            ac = (a0 + a1) / 2
            u = (k + 0.5) / nstrip
            half = half_t * (max(0.0, 1 - (abs(ac) / R) ** 5)) ** 0.5
            f = 0.45 + 0.7 * math.sin(math.pi * u) ** 0.8
            d.polygon(quad(x, y, tx, ty, a0, a1, max(half, 0.15)), fill=sh(col, f))
        if random.random() < 0.35:              # pale calcite cloud
            a = random.uniform(-2.2, 2.2); b = random.uniform(-0.5, 0.5)
            px, py = P(x + nx * a + tx * b, y + ny * a + ty * b)
            r = random.uniform(0.5, 1.0) * S
            d.ellipse([px - r, py - r * 0.6, px + r, py + r * 0.6], fill=(150, 165, 215))
        for _ in range(random.randint(0, 2)):   # pyrite / dark matrix specks
            a = random.uniform(-2.6, 2.6); b = random.uniform(-0.8, 0.8)
            px, py = P(x + nx * a + tx * b, y + ny * a + ty * b)
            c = (205, 180, 100) if random.random() < 0.5 else (40, 44, 70)
            d.ellipse([px - 1.6, py - 1.6, px + 1.6, py + 1.6], fill=c)
        # glossy highlight, like polished lapis
        gx, gy = P(x + nx * 1.0, y + ny * 1.0)
        d.ellipse([gx - 0.45 * S, gy - 0.35 * S, gx + 0.45 * S, gy + 0.35 * S], fill=(175, 190, 255))
        gx, gy = P(x + nx * 1.1, y + ny * 1.1)
        d.ellipse([gx - 2.2, gy - 2.2, gx + 2.2, gy + 2.2], fill=(245, 248, 255))
        continue
    # 7 mm blue turquoise heishi: sky/cerulean blue, matte, uneven hand-cut thickness, dark matrix
    col = jitter(random.choice(TURQ), 12)
    pitch = TURQ_T.get((strand, round(_p, 4)), 2.2)
    half = pitch * 0.45
    Rr = BEAD_D / 2 * random.uniform(0.95, 1.02)     # slightly irregular edges
    nstrip = 10
    for k in range(nstrip):
        a0 = -Rr + 2 * Rr * k / nstrip
        a1 = -Rr + 2 * Rr * (k + 1) / nstrip
        u = (k + 0.5) / nstrip
        f = 0.55 + 0.55 * math.sin(math.pi * u) ** 0.7
        d.polygon(quad(x, y, tx, ty, a0, a1, half), fill=sh(col, f))
    # dark seam between discs, as in a tightly strung hand-cut strand
    d.line([P(x + nx * -Rr + tx * half, y + ny * -Rr + ty * half), P(x + nx * Rr + tx * half, y + ny * Rr + ty * half)],
           fill=sh(col, 0.45), width=2)
    if random.random() < 0.18:                        # occasional greener patch
        a = random.uniform(-2.0, 2.0)
        d.polygon(quad(x + nx * a, y + ny * a, tx, ty, -0.8, 0.8, half * 0.8), fill=(40, 160, 150))
    for _ in range(random.randint(0, 3)):            # brown/black matrix specks and veins
        a = random.uniform(-2.8, 2.8)
        b = random.uniform(-half * 0.6, half * 0.6)
        px, py = P(x + nx * a + tx * b, y + ny * a + ty * b)
        if random.random() < 0.5:
            L = random.uniform(0.5, 1.6) * S
            d.line([px, py, px + nx * L, py + ny * L], fill=(70, 56, 44), width=2)
        else:
            d.ellipse([px - 1.8, py - 1.8, px + 1.8, py + 1.8], fill=(60, 48, 40))
    gx, gy = P(x + nx * 0.8, y + ny * 0.8)
    d.ellipse([gx - 2, gy - 2, gx + 2, gy + 2], fill=sh(col, 1.25))   # soft, mostly matte sheen

# polished white nephrite barrels, 10 x 10 mm, rendered per pixel to match the reference photo:
# creamy ivory with a faint green tint, waxy translucency, broad soft highlights, rounded shoulders.
def draw_barrel(img, x, y, tx, ty, seed, stone="white"):
    rng = np.random.default_rng(seed + 3000)
    nx, ny = ty, -tx
    L2, R = BAR_L / 2, BAR_D / 2
    ext = int((max(L2, R) * 1.5) * S)
    cxp, cyp = P(x, y)
    x0, y0 = int(cxp) - ext, int(cyp) - ext
    gy_, gx_ = np.mgrid[0:2 * ext, 0:2 * ext]
    dx = (gx_ + x0 - cxp) / S
    dy = (gy_ + y0 - cyp) / S
    u = dx * tx + dy * ty                     # along the drill axis (mm)
    a = dx * nx + dy * ny                     # across the bead (mm)
    # drum shape: near-cylindrical across, softly domed ends with well-rounded shoulders
    bulge = 1 - 0.05 * (u / L2) ** 2
    f = (np.abs(a) / (R * bulge)) ** 2.0 + (np.abs(u) / L2) ** 9
    if stone in ("jade", "applejasper"):     # 10 mm rounds, not barrels
        _r = 6.0 if (V2 and stone == "jade") else 5.0     # v2: Russian jade is 12 mm
        f = (a ** 2 + u ** 2) / (_r ** 2)
    inside = f < 1
    h = np.sqrt(np.clip(1 - f, 0, 1))
    gu = np.gradient(h, axis=1); gv = np.gradient(h, axis=0)
    # normals in screen space (x right, y down, z toward viewer)
    Nx, Ny, Nz = -gu * S * 2.2, -gv * S * 2.2, np.ones_like(h)
    nrm = np.sqrt(Nx ** 2 + Ny ** 2 + Nz ** 2)
    Nx, Ny, Nz = Nx / nrm, Ny / nrm, Nz / nrm
    Lv = np.array([-0.45, -0.55, 0.70]); Lv /= np.linalg.norm(Lv)
    ndl = Nx * Lv[0] + Ny * Lv[1] + Nz * Lv[2]
    wrap = np.clip((ndl + 0.45) / 1.45, 0, 1)            # soft wrap lighting = waxy, translucent
    Hv = Lv + np.array([0, 0, 1.0]); Hv /= np.linalg.norm(Hv)
    ndh = np.clip(Nx * Hv[0] + Ny * Hv[1] + Nz * Hv[2], 0, 1)
    # colour: creamy ivory with faint celadon clouding
    n_ = 2 * ext
    cl = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n_, n_), Image.BICUBIC), float) / 255
    if stone == "applejasper":
        # apple jasper: brick red with mottled olive/apple-green patches
        n2 = cl.shape[0]
        m2 = np.array(Image.fromarray((rng.random((8, 8)) * 255).astype(np.uint8)).resize((n2, n2), Image.BICUBIC), float) / 255
        g = (np.clip((m2 - 0.5) * 2.2, 0, 1) ** 1.3)[..., None] * 0.85
        base = np.array([168, 50, 38]) * (1 - g) + np.array([112, 118, 70]) * g
        base = base * (0.85 + 0.25 * cl[..., None])
    elif stone == "jade":
        # Russian (Siberian) nephrite: deep spinach green, lighter green clouds, black chromite specks
        base = np.array([18, 66, 38]) * (1 - 0.45 * cl[..., None]) + np.array([46, 104, 58]) * 0.45 * cl[..., None]
        sp = rng.random(cl.shape) > 0.992
        base[sp] = [14, 20, 16]
    else:
        base = np.array([234, 235, 216]) * (1 - 0.35 * cl[..., None]) + np.array([222, 230, 210]) * 0.35 * cl[..., None]
    col = base * (0.46 + 0.56 * wrap[..., None])
    col += np.array([255, 255, 250]) * ((0.07 if stone in ("jade", "applejasper") else 0.32) * ndh ** 8 + (0.8 if stone in ("jade", "applejasper") else 1.0) * ndh ** 40)[..., None]   # broad sheen + crisp glint
    rim = np.clip(1 - h * 3.0, 0, 1) * inside
    col *= (1 - 0.18 * rim)[..., None]                    # gentle darkening right at the silhouette
    alpha = np.clip((1 - f) * 18, 0, 1) * 255
    spr = Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")
    img.paste(spr, (x0, y0), spr)

def pink_conch_sprite(seed, diam=18.0):
    """18 mm naga conch shell round: beige milky white, soft creamy banding, matte-satin, slight dimples."""
    rng = np.random.default_rng(seed + 73000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    m = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    ang = rng.uniform(0, math.pi)
    band = np.sin((nx_ * math.cos(ang) + ny_ * math.sin(ang)) * rng.uniform(4, 7) + rng.uniform(0, 6.3)) * 0.5 + 0.5
    w = np.clip(0.5 * m + 0.3 * band - 0.25, 0, 0.7)[..., None]
    base = np.array([240, 234, 220]) * (1 - w) + np.array([222, 208, 186]) * w
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.4) / 1.4, 0, 1)
    col = base * (0.50 + 0.52 * wrap[..., None]) + 255 * 0.18 * (ndl ** 12)[..., None]
    for _ in range(2):                       # small natural dimples
        dx_, dy_ = rng.uniform(-0.5, 0.5, 2)
        d_ = np.exp(-(((nx_ - dx_) ** 2 + (ny_ - dy_) ** 2) / 0.006))
        col *= (1 - 0.18 * d_)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")


def _old_pink_conch_sprite(seed, diam=12.5):
    """12.5 mm pink queen conch shell round: porcelain white with soft pink flame patches, satin polish."""
    rng = np.random.default_rng(seed + 71000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    m = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    ang = rng.uniform(0, math.pi)
    flame = np.sin((nx_ * math.cos(ang) + ny_ * math.sin(ang)) * rng.uniform(3, 6) + rng.uniform(0, 6.3)) * 0.5 + 0.5
    w = np.clip(0.55 * m + 0.5 * flame - 0.12, 0, 0.9)[..., None]
    base = np.array([246, 232, 240]) * (1 - w) + np.array([236, 158, 200]) * w
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.4) / 1.4, 0, 1)
    col = base * (0.52 + 0.52 * wrap[..., None]) + 255 * 0.55 * (ndl ** 40)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")


def milky_opal_sprite(seed, diam=12.0):
    """12 mm white opal round: milky matte white, soft translucent depth, faint cream clouding, no shine."""
    rng = np.random.default_rng(seed + 79000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    cl = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    base = np.array([242, 242, 238]) * (1 - 0.12 * cl[..., None]) + np.array([232, 228, 214]) * 0.12 * cl[..., None]
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.5) / 1.5, 0, 1)                  # milky: light wraps around, soft shadow side
    col = base * (0.55 + 0.47 * wrap[..., None]) + 255 * 0.08 * (ndl ** 6)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")


def green_jade_sprite(seed, diam=7.3):
    """7.3 mm green jade round: translucent apple-to-spring green, soft milky clouds, a few dark specks, waxy gloss."""
    rng = np.random.default_rng(seed + 83000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    cl = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    tone = rng.uniform(0.92, 1.08)
    base = np.array([110, 190, 70]) * tone * (1 - 0.3 * cl[..., None]) + np.array([170, 215, 140]) * 0.3 * cl[..., None]
    sp = rng.random((n, n)) > 0.994
    base[sp] = [30, 50, 30]
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.5) / 1.5, 0, 1)
    col = base * (0.55 + 0.50 * wrap[..., None]) + 255 * 0.45 * (ndl ** 30)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")


def chalk_sprite(seed, diam=10.0):
    """10 mm matte chalk-white round: rich bright white, no gloss, very fine powdery texture."""
    rng = np.random.default_rng(seed + 67000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    grain = rng.random((n, n))[..., None]
    base = np.array([246, 245, 240]) * (0.96 + 0.05 * grain)
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.42 + 0.62 * ndl[..., None])          # pure diffuse: no highlight
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")


def opal_sprite(seed, diam=10.0):
    """10 mm white opal round: milky white with soft pastel play-of-colour flashes."""
    rng = np.random.default_rng(seed + 61000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    base = np.array([236, 236, 238]).astype(float) * np.ones((n, n, 1))
    for _ in range(9):                       # pastel fire patches
        cx_, cy_ = rng.uniform(-0.7, 0.7, 2)
        rad = rng.uniform(0.12, 0.28)
        hue = rng.uniform(0, 6.3)
        rgb = np.array([np.cos(hue) * 0.5 + 0.5, np.cos(hue - 2.1) * 0.5 + 0.5, np.cos(hue + 2.1) * 0.5 + 0.5]) * 255
        w = np.exp(-(((nx_ - cx_) ** 2 + (ny_ - cy_) ** 2) / rad ** 2))[..., None] * 0.35
        base = base * (1 - w) + rgb * w
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.4) / 1.4, 0, 1)
    col = base * (0.52 + 0.52 * wrap[..., None]) + 255 * 0.6 * (ndl ** 40)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")


def chrysoprase_sprite(seed, diam=10.0):
    """10 mm chrysoprase round: mint to apple green, creamy pale patches, a few dark matrix specks."""
    rng = np.random.default_rng(seed + 59000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    def nz(k):
        return np.array(Image.fromarray((rng.random((k, k)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    green = np.array([120, 205, 130]) * rng.uniform(0.9, 1.08)
    cream = np.array([222, 232, 180])
    m = np.clip((nz(5) - 0.35) * 1.8 + rng.uniform(-0.3, 0.3), 0, 1)[..., None]
    base = green * (1 - m) + cream * m
    spots = (rng.random((n, n)) > 0.996)
    base[spots] = [60, 70, 55]
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.35) / 1.35, 0, 1)
    col = base * (0.48 + 0.58 * wrap[..., None]) + 255 * 0.6 * (ndl ** 40)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

ROSE_LATE = []
bseed = 0
for st in (0, 1):
    for b in barrels[st]:
        x, y, tx, ty = b[:4]
        bseed += 1
        if hidden(x, y):
            continue
        _stone = b[5] if len(b) > 5 else "white"
        if _stone == "tour_olive":
            ROSE_LATE.append((x, y, bseed, "olive"))   # dark tan-green tourmaline, drawn later
            continue
        if _stone == "tour_tan":
            ROSE_LATE.append((x, y, bseed, "tan"))     # tan tourmaline, drawn later
            continue
        if _stone == "gjade7":
            spr = green_jade_sprite(bseed)         # 7.3 mm translucent light green jade
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if _stone == "opal10":
            spr = milky_opal_sprite(bseed, 10.0)   # 10 mm milky matte white opal
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if _stone == "rose9b":
            spr = milky_opal_sprite(bseed, 9.0)    # top outer: 9 mm milky white opal beside the yellow bead
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if _stone in ("rose11b", "rose9b"):
            ROSE_LATE.append((x, y, bseed, 11.0 if _stone == "rose11b" else 9.0))        # 11 mm swirled rose quartz, drawn with the other rose quartz
            continue
        if _stone == "conch_pink":
            spr = milky_opal_sprite(bseed, 10.0)   # 10 mm milky matte white opal round
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if _stone == "opal":
            spr = chalk_sprite(bseed)              # 10 mm matte chalk-white round
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if V2 and _stone == "white":
            spr = chrysoprase_sprite(bseed)        # version 2: 10 mm chrysoprase round replaces white nephrite
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        draw_barrel(layer, x, y, tx, ty, bseed, _stone)
d = ImageDraw.Draw(layer)

# spondylus rondelles: rounded-edge discs seen side-on, with pale growth banding
SPONDY = {"red": [(176, 34, 36), (188, 44, 40), (164, 30, 34)],
          "orange": [(226, 108, 36), (234, 124, 46), (218, 96, 32)]}
for st in (0, 1):
    for x, y, tx, ty, _, colour in rondelles[st]:
        if hidden(x, y):
            continue
        col = jitter(random.choice(SPONDY[colour]), 6)
        nstrip = 16
        for k in range(nstrip):
            a0 = -RON_D / 2 + RON_D * k / nstrip
            a1 = -RON_D / 2 + RON_D * (k + 1) / nstrip
            ac = (a0 + a1) / 2
            u = (k + 0.5) / nstrip
            half = RON_T / 2 * math.sqrt(max(0.05, 1 - (abs(ac) / (RON_D / 2)) ** 4))
            f = 0.55 + 0.6 * math.sin(math.pi * u) ** 0.7
            d.polygon(quad(x, y, tx, ty, a0, a1, half), fill=sh(col, f))
        nx, ny = ty, -tx
        for _ in range(2):                      # pale shell banding across the edge
            a = random.uniform(-3.0, 3.0)
            b = random.uniform(-0.9, 0.9)
            p0 = P(x + nx * a + tx * b, y + ny * a + ty * b)
            p1 = P(x + nx * (a + random.uniform(0.6, 1.5)) + tx * b, y + ny * (a + 1) + ty * b)
            d.line([p0, p1], fill=sh(col, 1.3), width=2)
        gx, gy = P(x + nx * 0.8, y + ny * 0.8)
        d.ellipse([gx - 3, gy - 3, gx + 3, gy + 3], fill=(255, 225, 200))

# 10 mm round apple jasper: brick-red with mottled olive/apple-green patches
def jasper_sprite(seed):
    rng = np.random.default_rng(seed)
    n = int(JAS_D * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    cx_ = cy_ = (n - 1) / 2
    rr = np.hypot(xx_ - cx_, yy_ - cy_) / (n / 2)
    # low-frequency mottling
    small = rng.random((9, 9))
    mott = np.array(Image.fromarray((small * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    fine = rng.random((18, 18))
    fine = np.array(Image.fromarray((fine * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    red = np.array([168, 50, 38]); dark = np.array([110, 30, 26]); green = np.array([112, 118, 70])
    g = (np.clip((mott - 0.5) * 2.2, 0, 1) ** 1.3)[..., None] * 0.85
    base = red * (1 - g) + green * g
    base = base * (1 - 0.35 * fine[..., None]) + dark * 0.35 * fine[..., None] * 0
    base = base * (0.82 + 0.3 * fine[..., None])
    # sphere shading, light from upper-left
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    nx_ = (xx_ - cx_) / (n / 2); ny_ = (yy_ - cy_) / (n / 2)
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    diff = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.30 + 0.85 * diff[..., None])
    spec = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1) ** 40
    col = col + 255 * 0.85 * spec[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    rgba = np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")

def hematite_sprite(seed):
    """10 mm matte golden-tan hematite: brushed-brass colour, soft satin sheen, tiny pits."""
    rng = np.random.default_rng(seed + 1000)
    n = int(JAS_D * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    cx_ = cy_ = (n - 1) / 2
    rr = np.hypot(xx_ - cx_, yy_ - cy_) / (n / 2)
    tone = np.array([182, 146, 66]) * rng.uniform(0.92, 1.06)
    blot = rng.random((5, 5))
    blot = np.array(Image.fromarray((blot * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    base = tone * (0.88 + 0.22 * blot[..., None])
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    nx_ = (xx_ - cx_) / (n / 2); ny_ = (yy_ - cy_) / (n / 2)
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.28 + 0.80 * ndl[..., None])
    col += np.array([255, 225, 150]) * 0.30 * (ndl ** 6)[..., None]      # broad matte sheen
    pits = rng.random((n, n)) > 0.992
    col[pits] *= 0.6
    flecks = rng.random((n, n)) > 0.995
    col[flecks] = np.minimum(col[flecks] * 1.4, 255)
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

TOURM_GREEN = [(96, 140, 60), (78, 128, 70), (110, 150, 64)]
TOURM_BLACK = [(30, 28, 32), (24, 24, 28), (36, 32, 36)]
TOURM_PINK = [(222, 110, 150), (232, 150, 176), (210, 92, 132), (226, 128, 160)]
TOURM_YELLOW = [(214, 160, 70), (200, 140, 60), (222, 178, 92), (190, 136, 72)]
TOURM_YELLOW_BRIGHT = [(232, 196, 80), (226, 188, 72)]
TOURM_COLS = [(222, 110, 150), (196, 60, 100), (120, 36, 62), (28, 26, 30), (96, 112, 52),
              (52, 96, 72), (214, 150, 60), (196, 120, 50), (40, 84, 100), (118, 76, 52), (232, 150, 176)]

def tourmaline_sprite(seed, colour):
    """7 mm polished tourmaline: glossy, slightly translucent, with fibrous striations."""
    rng = np.random.default_rng(seed + 5000)
    n = int(TOUR_D * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    cx_ = cy_ = (n - 1) / 2
    rr = np.hypot(xx_ - cx_, yy_ - cy_) / (n / 2)
    ang = rng.uniform(0, math.pi)
    proj = (xx_ * math.cos(ang) + yy_ * math.sin(ang)) / n
    streak = 0.5 + 0.5 * np.sin(proj * rng.uniform(9, 16) + rng.random() * 6 +
                                1.5 * np.sin(proj * 7 + rng.random() * 6))
    cloud = rng.random((5, 5))
    cloud = np.array(Image.fromarray((cloud * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    base = np.array(colour, float) * (0.86 + 0.10 * streak[..., None] + 0.35 * (cloud[..., None] - 0.5))
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    nx_ = (xx_ - cx_) / (n / 2); ny_ = (yy_ - cy_) / (n / 2)
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.40 + 0.70 * ndl[..., None])
    # inner glow on the side away from the light (translucency)
    glow = np.clip(-(nx_ * L[0] + ny_ * L[1]), 0, 1) * z
    col += np.array(colour, float) * 0.35 * glow[..., None]
    col += 255 * 0.95 * (ndl ** 60)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

def rose_sprite(seed, diam=None):
    """Carved rose quartz (per reference photo): pale milky pink, frosted translucency,
    melon-style fluted ribs that twist diagonally around the bead."""
    rng = np.random.default_rng(seed + 11000)
    n = int((diam or ROSE_D) * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    ang = rng.uniform(0, math.pi)
    ca, sa = math.cos(ang), math.sin(ang)
    px = nx_ * ca + ny_ * sa; py = -nx_ * sa + ny_ * ca          # rib axis rotated per bead
    lon = np.arctan2(px, z + 1e-6)
    ribs = np.cos(9 * lon + 2.2 * py + rng.uniform(0, 6.3))
    groove = np.clip((ribs - 0.55) / 0.45, 0, 1) * np.clip(z * 1.6, 0, 1)
    ridge = np.clip((-ribs - 0.3) / 0.7, 0, 1) * np.clip(z * 1.6, 0, 1)
    cloud = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    base = np.array([236, 212, 214]) * (0.95 + 0.08 * cloud[..., None]) + np.array([10, -6, -4]) * cloud[..., None]
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.5) / 1.5, 0, 1)                     # frosted, light passes through
    col = base * (0.52 + 0.48 * wrap[..., None])
    col *= (1 - 0.20 * groove)[..., None]
    col += np.array([255, 245, 245]) * (0.16 * ridge * ndl)[..., None]
    col += 255 * 0.35 * (ndl ** 25)[..., None]                    # soft, satiny highlight
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 245
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

def draw_peridot(img, x, y, tx, ty, seed):
    """7 x 4 mm chrome diopside rondelle: glossy puffy disc, emerald with crackle."""
    rng = np.random.default_rng(seed + 13000)
    nx, ny = ty, -tx
    R, L2 = PER_D / 2, PER_L / 2
    ext = int(R * 1.4 * S)
    cxp, cyp = P(x, y)
    x0, y0 = int(cxp) - ext, int(cyp) - ext
    gy_, gx_ = np.mgrid[0:2 * ext, 0:2 * ext]
    dx = (gx_ + x0 - cxp) / S; dy = (gy_ + y0 - cyp) / S
    u = dx * tx + dy * ty                     # along the strand
    a = dx * nx + dy * ny                     # across the bead
    # puffy disc seen edge-on: rounded rim, thickness tapering toward the edge
    half_t = L2 * np.sqrt(np.clip(1 - (np.abs(a) / R) ** 3, 0, 1))
    rr = np.where(half_t > 1e-3, np.abs(u) / np.maximum(half_t, 1e-3), 2.0)
    rr = np.maximum(rr, np.abs(a) / R)
    h = np.sqrt(np.clip(1 - np.clip(np.abs(u) / np.maximum(half_t, 1e-3), 0, 1) ** 2, 0, 1))
    # chrome diopside: vivid emerald with lighter crackle, deep-green inclusions; some beads near-black green
    t_across = np.clip(np.abs(a) / R, 0, 1)
    dark_bead = rng.random() < 0.25
    tone = rng.uniform(0.55, 0.7) if dark_bead else rng.uniform(0.85, 1.1)
    n_ = 2 * ext
    def nz(cells):
        return np.array(Image.fromarray((rng.random((cells, cells)) * 255).astype(np.uint8))
                        .resize((n_, n_), Image.BICUBIC), float) / 255
    mott = nz(6)
    emer = np.array([22, 150, 30]) * tone
    deep = np.array([8, 70, 18]) * tone
    col = emer * (1 - mott[..., None] * 0.7) + deep * (mott[..., None] * 0.7)
    # crackle: thin bright fracture lines through the stone
    cr = nz(14)
    crack = np.clip(1 - np.abs(cr - 0.5) / 0.035, 0, 1)
    col += np.array([110, 200, 90]) * (0.55 * crack)[..., None]
    col = col * (1 - 0.45 * t_across[..., None] ** 2)
    col = col * (0.72 + 0.38 * h[..., None])
    # long glossy highlight across the disc (upper-left lit side) plus a crisp glint
    hl = np.exp(-((u + 0.45 * half_t) / (0.22 * L2 + 1e-3)) ** 2) * np.clip(1 - t_across * 1.1, 0, 1)
    hl *= (a < 0) * 0.6 + 0.4
    col += np.array([235, 255, 220]) * (0.65 * hl)[..., None]
    gl = np.exp(-(((a + 0.5 * R) / 0.5) ** 2 + ((u + 0.45 * half_t) / 0.35) ** 2))
    col += 255 * 0.9 * gl[..., None]
    alpha = np.clip((1 - rr) * 12, 0, 1) * 240
    spr = Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")
    img.paste(spr, (x0, y0), spr)

def conch_sprite(seed, diam=8.0):
    """8 mm queen conch shell round: creamy porcelain white, faint pink-peach blush, fine growth lines."""
    rng = np.random.default_rng(seed + 17000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    cloud = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    base = np.array([242, 238, 230]) * (1 - 0.18 * cloud[..., None]) + np.array([240, 214, 204]) * 0.18 * cloud[..., None]
    ang = rng.uniform(0, math.pi)
    band = np.sin((nx_ * math.cos(ang) + ny_ * math.sin(ang)) * rng.uniform(18, 26) + rng.uniform(0, 6.3))
    base = base * (1 - 0.035 * band[..., None])
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.4) / 1.4, 0, 1)
    col = base * (0.50 + 0.52 * wrap[..., None]) + 255 * 0.55 * (ndl ** 30)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

MOOK_SETS = [((92, 62, 44), (112, 78, 52)), ((84, 56, 42), (104, 70, 50)), ((98, 66, 46), (82, 54, 40)),
             ((88, 60, 46), (110, 74, 54))]   # dark matte brown mookaite only

def mook_sprite(seed, diam=8.0, maroon=False, yellow=False, tone=None):
    """8 mm matte mookaite jasper: mustard, burgundy, plum and cream, softly mottled, frosted finish."""
    rng = np.random.default_rng(seed + 19000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    a, b = MOOK_SETS[rng.integers(len(MOOK_SETS))]
    if tone == "red":                        # matte brick-red mookaite
        a, b = [((170, 58, 44), (186, 76, 56)), ((158, 50, 42), (176, 66, 50))][rng.integers(2)]
    if tone == "orange":                     # matte orange-ochre mookaite
        a, b = [((206, 122, 50), (222, 146, 70)), ((196, 112, 46), (214, 136, 64))][rng.integers(2)]
    if yellow:                               # matte mustard / golden-yellow mookaite
        a, b = [((206, 160, 58), (222, 184, 92)), ((196, 150, 50), (214, 176, 84))][rng.integers(2)]
    if maroon:                               # matte maroon / reddish-plum mookaite
        a, b = [((122, 42, 40), (140, 58, 50)), ((104, 36, 44), (126, 48, 52)), ((132, 50, 44), (110, 40, 46))][rng.integers(3)]
    m = np.array(Image.fromarray((rng.random((4, 4)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    m = np.clip((m - 0.35) * 1.8, 0, 1)[..., None]
    base = np.array(a) * (1 - m) + np.array(b) * m
    grain = rng.random((n, n))[..., None]
    base = base * (0.95 + 0.08 * grain)
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.35 + 0.75 * ndl[..., None]) + 255 * 0.12 * (ndl ** 6)[..., None]   # matte: broad, dull sheen
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

def abglass_sprite(seed, diam=8.0, base_rgb=(140, 215, 245), deep_rgb=(50, 170, 245), ab=True):
    """8 mm vintage faceted AB glass round: milky sky-blue opal glass, flat facets, rainbow AB flashes."""
    rng = np.random.default_rng(seed + 23000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    # facets: quantise the surface normal into flat patches
    ang = np.arctan2(ny_, nx_) + rng.uniform(0, 6.3)
    ring = np.floor(np.clip(rr, 0, 0.999) * 3)
    sect = np.floor((ang % (2 * np.pi)) / (2 * np.pi / (6 + 3 * ring)))
    fid = (ring * 20 + sect).astype(int)
    fval = rng.uniform(0.75, 1.15, 80)[fid % 80]
    base = np.array(base_rgb) * fval[..., None]
    deep = np.array(deep_rgb)
    m = (rng.random(80)[fid % 80] > 0.72)[..., None]
    base = np.where(m, base * 0.45 + deep * 0.55, base)       # brighter blue patches inside the glass
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.72 + 0.40 * ndl[..., None])
    # AB rainbow flashes on a few facets
    flash = (rng.random(80)[fid % 80] > 0.85) & (rr > 0.2)
    if not ab:
        flash[:] = False
    hue = rng.random(80)[fid % 80] * 2 * np.pi
    rainbow = np.stack([np.cos(hue) * 0.5 + 0.5, np.cos(hue - 2.1) * 0.5 + 0.5, np.cos(hue + 2.1) * 0.5 + 0.5], -1) * 255
    col[flash] = col[flash] * 0.3 + rainbow[flash] * 0.4 + 120
    col += 255 * 0.8 * (ndl ** 40)[..., None]
    edge = np.clip((rr - 0.88) / 0.12, 0, 1)
    col *= (1 - 0.12 * edge)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

def yellow_sprite(seed, diam=8.0):
    """8 mm vintage Japanese opaque glass round: bright lemon yellow, glossy, faint frosting."""
    rng = np.random.default_rng(seed + 29000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    frost = np.array(Image.fromarray((rng.random((6, 6)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    base = np.array([232, 222, 40]) * (1 - 0.08 * frost[..., None]) + np.array([240, 238, 190]) * 0.08 * frost[..., None]
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.45 + 0.65 * ndl[..., None]) + 255 * 0.9 * (ndl ** 60)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

def draw_bicone(img, x, y, tx, ty, seed, D=8.0, base_rgb=(232, 72, 140), light_rgb=(255, 170, 205)):
    """8 mm rose crystal bicone: two cones tip-to-tip along the strand, faceted, transparent rose pink."""
    rng = np.random.default_rng(seed + 31000)
    nx, ny = ty, -tx
    R = D / 2
    ext = int(R * 1.3 * S)
    cxp, cyp = P(x, y)
    x0, y0 = int(cxp) - ext, int(cyp) - ext
    gy_, gx_ = np.mgrid[0:2 * ext, 0:2 * ext]
    dx = (gx_ + x0 - cxp) / S; dy = (gy_ + y0 - cyp) / S
    u = dx * tx + dy * ty                     # along the strand (cone axis)
    a = dx * nx + dy * ny                     # across: girdle is widest at u = 0
    half_w = R * np.clip(1 - np.abs(u) / R, 0, 1)
    half_w = np.minimum(half_w, R * 0.96)    # small flat at the girdle
    inside = (np.abs(a) <= half_w) & (np.abs(u) <= R * 0.94)
    # facets: angular bands around the cone, mirrored on each half
    t = np.clip(a / np.maximum(half_w, 1e-3), -1, 1)
    band = np.floor((t + 1) * 3).astype(int) + 7 * (u > 0)
    fval = rng.uniform(0.7, 1.25, 14)[np.clip(band, 0, 13)]
    base = np.array(base_rgb) * fval[..., None]
    light = np.array(light_rgb)
    sparkle = (rng.random(14)[np.clip(band, 0, 13)] > 0.7)[..., None]
    col = np.where(sparkle, base * 0.4 + light * 0.6, base)
    lit = np.clip(0.85 - 0.25 * (dx + dy) / R, 0.55, 1.15)
    col = col * lit[..., None]
    girdle = np.abs(u) < 0.25
    col[girdle] = col[girdle] * 0.8
    alpha = (inside * 240).astype(float)
    alpha = np.array(Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6)), float)
    spr = Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")
    img.paste(spr, (x0, y0), spr)

def matte_gold_sprite(seed, diam=8.0):
    """8 mm matte gold hematite round: brushed antique gold, soft satin sheen, slight speckle/wear."""
    rng = np.random.default_rng(seed + 37000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    blot = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    base = np.array([176, 140, 62]) * (0.88 + 0.20 * blot[..., None])
    speck = rng.random((n, n)) > 0.985
    base[speck] *= 0.75
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.30 + 0.80 * ndl[..., None]) + np.array([255, 225, 150]) * (0.28 * ndl ** 6)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

def draw_teardrop(img, x, y, tx, ty, seed, L=11.0, Wd=8.0):
    """11 x 8 mm faceted opaque aqua AB glass teardrop, drilled lengthwise, narrow end pointing up."""
    rng = np.random.default_rng(seed + 41000)
    # point the narrow end toward the upper side of the necklace
    if ty > 0:
        tx, ty = -tx, -ty
    nx, ny = ty, -tx
    ext = int(L * 0.7 * S)
    cxp, cyp = P(x, y)
    x0, y0 = int(cxp) - ext, int(cyp) - ext
    gy_, gx_ = np.mgrid[0:2 * ext, 0:2 * ext]
    dx = (gx_ + x0 - cxp) / S; dy = (gy_ + y0 - cyp) / S
    u = dx * tx + dy * ty                 # + toward the narrow (upper) end
    a = dx * nx + dy * ny
    tt = np.clip((L / 2 - u) / L, 0, 1)    # 0 at the narrow tip, 1 at the round bottom
    prof = tt ** 0.75 * (1 - tt) ** 0.3
    prof = prof / prof.max() * (Wd / 2)
    inside = (np.abs(a) <= prof) & (np.abs(u) <= L / 2)
    # facets: a few bands along the length x columns across
    across = np.clip(a / np.maximum(prof, 1e-3), -1, 1)
    fid = (np.floor(tt * 4) * 4 + np.floor((across + 1) * 2)).astype(int)
    fid = np.clip(fid, 0, 19)
    fval = rng.uniform(0.0, 1.0, 20)[fid]
    # opaque sky-aqua glass with AB facets (per reference photo)
    tints = np.array([[80, 205, 240], [60, 190, 238], [120, 225, 235], [150, 175, 250], [70, 215, 215]])
    tint = tints[rng.integers(0, len(tints), 20)][fid]
    clear = np.array([85, 200, 238])
    w = (0.25 + 0.55 * fval)[..., None]
    col = clear * (1 - w) + tint * w
    lit = np.clip(0.75 + 0.35 * (-(dx + dy)) / L, 0.55, 1.15)
    col = col * lit[..., None]
    edge = (np.abs(np.diff(fid, axis=0, prepend=fid[:1])) + np.abs(np.diff(fid, axis=1, prepend=fid[:, :1]))) > 0
    col[edge] = np.minimum(col[edge] * 1.05 + 8, 255)
    gl = np.exp(-(((a + 0.25 * prof) / 0.5) ** 2 + ((u + 1.5) / 0.6) ** 2))
    col += 255 * 0.8 * gl[..., None]
    alpha = np.where(inside, 250, 0).astype(np.uint8)
    alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.6)))
    spr = Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")
    img.paste(spr, (x0, y0), spr)

def draw_jonquil(img, x, y, tx, ty, seed, D=8.0):
    """8 mm transparent jonquil (pale yellow-green) Czech glass round, AB coated, drill channel visible."""
    rng = np.random.default_rng(seed + 43000)
    nx, ny = ty, -tx
    R = D / 2
    ext = int(R * 1.2 * S)
    cxp, cyp = P(x, y)
    x0, y0 = int(cxp) - ext, int(cyp) - ext
    gy_, gx_ = np.mgrid[0:2 * ext, 0:2 * ext]
    dx = (gx_ + x0 - cxp) / S; dy = (gy_ + y0 - cyp) / S
    u = dx * tx + dy * ty; a = dx * nx + dy * ny
    rr = np.hypot(dx, dy) / R
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    base = np.array([220, 245, 125])
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(dx / R * L[0] + dy / R * L[1] + z * L[2], 0, 1)
    # transparent: brighter through the middle, darker toward the rim
    col = base * (0.72 + 0.25 * z[..., None] + 0.15 * ndl[..., None])
    # drill channel along the strand
    chan = np.clip(1 - np.abs(a) / 0.7, 0, 1) * (np.abs(u) < R * 0.95)
    col = col * (1 - 0.25 * chan[..., None]) + np.array([245, 250, 190]) * 0.25 * chan[..., None]
    # AB sheen: soft rainbow patch on the lit side
    ab = np.exp(-(((dx / R + 0.25) / 0.35) ** 2 + ((dy / R + 0.2) / 0.35) ** 2))
    hue = np.arctan2(dy, dx) * 2 + rng.uniform(0, 6.3)
    rainbow = np.stack([np.cos(hue) * 0.5 + 0.5, np.cos(hue - 2.1) * 0.5 + 0.5, np.cos(hue + 2.1) * 0.5 + 0.5], -1) * 255
    col = col * (1 - 0.45 * ab[..., None]) + rainbow * 0.45 * ab[..., None]
    col += 255 * 0.9 * (ndl ** 60)[..., None]
    alpha = np.clip((1 - rr) * R * S, 0, 1) * 235
    spr = Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")
    img.paste(spr, (x0, y0), spr)

def draw_smoothdrop(img, x, y, tx, ty, seed, L=10.0, Wd=6.0):
    """10 x 6 mm smooth clear crystal AB glass teardrop, drilled lengthwise, narrow end up."""
    rng = np.random.default_rng(seed + 47000)
    if ty > 0:
        tx, ty = -tx, -ty
    nx, ny = ty, -tx
    ext = int(L * 0.7 * S)
    cxp, cyp = P(x, y)
    x0, y0 = int(cxp) - ext, int(cyp) - ext
    gy_, gx_ = np.mgrid[0:2 * ext, 0:2 * ext]
    dx = (gx_ + x0 - cxp) / S; dy = (gy_ + y0 - cyp) / S
    u = dx * tx + dy * ty
    a = dx * nx + dy * ny
    tt = np.clip((L / 2 - u) / L, 0, 1)
    prof = tt ** 0.6 * (1 - tt) ** 0.35
    prof = prof / prof.max() * (Wd / 2)
    inside = (np.abs(a) <= prof) & (np.abs(u) <= L / 2)
    across = np.clip(a / np.maximum(prof, 1e-3), -1, 1)
    z = np.sqrt(np.clip(1 - across ** 2, 0, 1))
    base = np.array([200, 205, 225])
    col = base * (0.55 + 0.35 * z[..., None])
    # frosted drill channel down the middle
    chan = np.clip(1 - np.abs(a) / 0.6, 0, 1)
    col = col * (1 - 0.35 * chan[..., None]) + np.array([240, 242, 250]) * 0.35 * chan[..., None]
    # AB rainbow sheen sweeping along one side
    hue = tt * 5 + rng.uniform(0, 6.3)
    rainbow = np.stack([np.cos(hue) * 0.5 + 0.5, np.cos(hue - 2.1) * 0.5 + 0.5, np.cos(hue + 2.1) * 0.5 + 0.5], -1) * 255
    band = np.exp(-((across + 0.45) / 0.3) ** 2)
    col = col * (1 - 0.5 * band[..., None]) + rainbow * 0.5 * band[..., None]
    gl = np.exp(-(((across + 0.4) / 0.15) ** 2 + ((tt - 0.55) / 0.12) ** 2))
    col += 255 * 0.8 * gl[..., None]
    alpha = np.where(inside, 225, 0).astype(np.uint8)
    alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.6)))
    spr = Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")
    img.paste(spr, (x0, y0), spr)

def amethyst_sprite(seed, diam=8.0):
    """8 mm lavender amethyst round: pale milky lilac with deeper violet banding, soft polish."""
    rng = np.random.default_rng(seed + 53000)
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    pale = np.array([214, 190, 230]); deep = np.array([150, 110, 190])
    ang = rng.uniform(0, math.pi)
    band = np.sin((nx_ * math.cos(ang) + ny_ * math.sin(ang)) * rng.uniform(7, 12) + rng.uniform(0, 6.3)) * 0.5 + 0.5
    cloud = np.array(Image.fromarray((rng.random((5, 5)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    m = np.clip(0.55 * cloud + 0.25 * band - 0.15 + rng.uniform(-0.1, 0.25), 0, 1)[..., None]
    base = pale * (1 - m) + deep * m
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    wrap = np.clip((ndl + 0.4) / 1.4, 0, 1)
    col = base * (0.50 + 0.55 * wrap[..., None]) + 255 * 0.55 * (ndl ** 35)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

def pearl_sprite(seed, diam=8.0, base_rgb=(228, 220, 150), rim_rgb=(150, 140, 80)):
    """8 mm pale champagne-yellow glass pearl: smooth, lustrous, bright reflection and soft rim."""
    n = int(diam * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    base = np.array(base_rgb)
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.45 + 0.60 * ndl[..., None])
    col += np.array([255, 252, 235]) * (0.35 * ndl ** 8 + 0.9 * ndl ** 70)[..., None]   # pearly lustre
    rim = np.clip((rr - 0.75) / 0.25, 0, 1)
    col = col * (1 - 0.25 * rim[..., None]) + np.array(rim_rgb) * 0.25 * rim[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")

for _x, _y, _sd, _dia in ROSE_LATE:
    _spr = (tourmaline_sprite(_sd + 500, (124, 116, 64)) if _dia == "olive" else
            tourmaline_sprite(_sd + 600, (200, 140, 60)) if _dia == "tan" else rose_sprite(_sd, _dia))
    _px, _py = P(_x, _y)
    layer.paste(_spr, (int(_px - _spr.width / 2), int(_py - _spr.height / 2)), _spr)

def draw_wjade(img, x, y, tx, ty, seed, L=None, Wd=None):
    """19.7 x 15.5 mm white nephrite barrel: pale celadon-white, polished, gentle bulge, flat drilled ends."""
    if L is None:
        L, Wd = (10.5, 15.6) if V3 else (19.7, 15.5)
    nx, ny = ty, -tx
    ext = int(max(Wd, L) * 0.75 * S)
    cxp, cyp = P(x, y)
    x0, y0 = int(cxp) - ext, int(cyp) - ext
    gy_, gx_ = np.mgrid[0:2 * ext, 0:2 * ext]
    dx = (gx_ + x0 - cxp) / S; dy = (gy_ + y0 - cyp) / S
    u = (dx * tx + dy * ty) / (L / 2)
    a = (dx * nx + dy * ny) / (Wd / 2)
    if V3:
        f = (np.abs(a) ** 2.0 + np.abs(u) ** 3.0)     # rondelle
    else:
        a = a / (1 - 0.10 * u ** 2)                # barrel bulge
        f = (np.abs(a) ** 2.4 + np.abs(u) ** 6.0)
    h = np.sqrt(np.clip(1 - f, 0, 1))
    gu = np.gradient(h, axis=1); gv = np.gradient(h, axis=0)
    Nx, Ny, Nz = -gu * S * 3, -gv * S * 3, np.ones_like(h)
    nrm = np.sqrt(Nx ** 2 + Ny ** 2 + Nz ** 2)
    Lv = np.array([-0.45, -0.55, 0.70]); Lv /= np.linalg.norm(Lv)
    ndl = (Nx * Lv[0] + Ny * Lv[1] + Nz * Lv[2]) / nrm
    wrap = np.clip((ndl + 0.5) / 1.5, 0, 1)
    col = np.array([240, 238, 232] if V3 else [232, 238, 228]) * (0.55 + 0.47 * wrap[..., None])
    Hv = Lv + np.array([0, 0, 1.0]); Hv /= np.linalg.norm(Hv)
    ndh = np.clip((Nx * Hv[0] + Ny * Hv[1] + Nz * Hv[2]) / nrm, 0, 1)
    col += 255 * (0.10 * ndh ** 8 + 0.55 * ndh ** 60)[..., None]
    alpha = np.clip((1 - f) * 14, 0, 1) * 255
    spr = Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")
    img.paste(spr, (x0, y0), spr)

prev = None
tseed = 0
for st in (0, 1):
    for t in tourm[st]:
        x, y = t[0], t[1]
        tseed += 1
        if hidden(x, y):
            continue
        if len(t) > 5 and t[5] == "v5_amet":
            spr = amethyst_sprite(tseed)                   # 8 mm lavender amethyst
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "v5_opal8":
            spr = milky_opal_sprite(tseed, 8.0)
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] in ("v4_opal10", "v4_opal9"):
            spr = milky_opal_sprite(tseed, 10.0 if t[5] == "v4_opal10" else 9.0)
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "v5_tblue":
            spr = tourmaline_sprite(tseed + 700, (36, 78, 120))   # 7 mm deep blue-teal tourmaline
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] in ("v5_mookrd", "v5_mookorg"):
            spr = mook_sprite(tseed, tone=("red" if t[5] == "v5_mookrd" else "orange"))
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "v5_mookyel":
            spr = mook_sprite(tseed, yellow=True)   # 8 mm matte golden-yellow mookaite
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "v5_mookred":
            spr = mook_sprite(tseed, maroon=True)   # 8 mm matte maroon mookaite
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "v4_gglass":
            spr = abglass_sprite(tseed, base_rgb=(150, 212, 170), deep_rgb=(70, 160, 110))
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "v4_olive":
            spr = tourmaline_sprite(tseed + 500, (124, 116, 64))
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "v4_rbic":
            draw_bicone(layer, x, y, t[2], t[3], tseed)
            continue
        if len(t) > 5 and t[5] == "v4_sapph":
            draw_bicone(layer, x, y, t[2], t[3], tseed, base_rgb=(20, 110, 215), light_rgb=(120, 190, 255))
            continue
        if len(t) > 5 and t[5] == "peridot":
            draw_peridot(layer, x, y, t[2], t[3], tseed)
            continue
        if len(t) > 5 and t[5] == "mook8":
            spr = mook_sprite(tseed)
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "ajas_t":
            draw_barrel(layer, x, y, t[2], t[3], tseed, "applejasper")   # apple jasper moved out to the lower strand
            continue
        if len(t) > 5 and t[5] == "gjade7t":
            spr = green_jade_sprite(tseed)          # green jade moved down from the top
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "bicone_lime":
            # 8 mm faceted golden-yellow crystal round (replaces the yellow-green bicone)
            spr = yellow_sprite(tseed)             # 8 mm bright opaque yellow glass round
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if V2 and st == 1 and len(t) > 5 and t[5] == "bicone8" and abs(x) < 15 and y > 0:
            spr = rose_sprite(tseed, 9.0)          # bottom inner centre: 9 mm swirled rose quartz
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "bicone8":
            draw_bicone(layer, x, y, t[2], t[3], tseed)
            continue
        if len(t) > 5 and t[5] == "yellow8":
            spr = amethyst_sprite(tseed)                   # 8 mm lavender amethyst round
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "abgreen8":
            spr = green_jade_sprite(tseed) if (V2 and y < 280) else abglass_sprite(tseed, base_rgb=(150, 212, 170), deep_rgb=(70, 160, 110))   # v2: 7.3 mm green jade
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "conch8":
            spr = abglass_sprite(tseed)          # conch replaced by vintage faceted AB glass
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] == "lapis8":
            continue                      # drawn with the other 8 mm lapis rounds
        if len(t) > 5 and t[5] == "peridot3":
            for k2, off in enumerate((-PER_L, 0.0, PER_L)):
                draw_peridot(layer, x + t[2] * off, y + t[3] * off, t[2], t[3], tseed * 3 + k2)
            continue
        if len(t) > 5 and t[5] == "peridot2":
            for k2, off in enumerate((-PER_L / 2, PER_L / 2)):
                draw_peridot(layer, x + t[2] * off, y + t[3] * off, t[2], t[3], tseed * 2 + k2)
            continue
        if len(t) > 5 and t[5] == "wjade":
            draw_wjade(layer, x, y, t[2], t[3], tseed)
            continue
        if len(t) > 5 and t[5] == "conch12":
            spr = milky_opal_sprite(tseed)
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        if len(t) > 5 and t[5] in ("rose", "rose11"):
            spr = rose_sprite(tseed, 11.0 if t[5] == "rose11" else None)
            px, py = P(x, y)
            layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
            continue
        pal = {"tour_pink": TOURM_PINK, "tour_yellow": TOURM_YELLOW, "tour_ybright": TOURM_YELLOW_BRIGHT, "tour_black": TOURM_BLACK, "tour_green": TOURM_GREEN}.get(t[5] if len(t) > 5 else "", TOURM_COLS)
        choices = [c for c in pal if c != prev] or pal
        colour = choices[random.randrange(len(choices))]
        prev = colour
        spr = tourmaline_sprite(tseed, colour)
        px, py = P(x, y)
        layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)

def _noise(rng, cells, n):
    a = rng.random((cells, cells))
    return np.array(Image.fromarray((a * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255


def polished_sphere(base, n, gloss=1.0):
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    rr = np.hypot(xx_ - c, yy_ - c) / (n / 2)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.30 + 0.85 * ndl[..., None]) + 255 * gloss * (ndl ** 50)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    return Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")


def jade_sprite(seed):
    """10 mm Russian (Siberian) nephrite: deep spinach green, lighter clouds, black chromite specks."""
    rng = np.random.default_rng(seed + 7000)
    n = int(10.0 * S)
    dark = np.array([30, 88, 52]); light = np.array([78, 140, 84])
    m = _noise(rng, 7, n)[..., None]
    base = dark * (1 - m) + light * m
    base *= (0.9 + 0.2 * _noise(rng, 20, n))[..., None]
    specks = rng.random((n, n)) > 0.990
    base[specks] = [12, 18, 14]
    return polished_sphere(base, n, 0.9)


def lapis_sprite(seed):
    """12 mm lapis lazuli round: royal blue, pale calcite wisps, gold pyrite flecks."""
    rng = np.random.default_rng(seed + 9000)
    n = int(12.0 * S)
    blue = np.array([30, 52, 160]); deep = np.array([20, 34, 120]); calc = np.array([150, 160, 190])
    m = _noise(rng, 6, n)[..., None]
    base = blue * (1 - m) + deep * m
    w = np.clip((_noise(rng, 9, n) - 0.78) * 4, 0, 1)[..., None] * 0.6
    base = base * (1 - w) + calc * w
    pyr = rng.random((n, n)) > 0.993
    base[pyr] = [225, 190, 95]
    return polished_sphere(base, n, 0.9)


seed = 0
for st in (0, 1):
    for x, y, tx, ty, _, kind in jaspers[st]:
        seed += 1
        if hidden(x, y):
            continue
        spr = {"gold": hematite_sprite, "jasper": jasper_sprite,
               "jade": jade_sprite, "lapis12": lapis_sprite}[kind](seed)
        px, py = P(x, y)
        layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)
d = ImageDraw.Draw(layer)

# denim lapis rounds: soft mid/denim blue with white calcite mottling and a few pyrite flecks
# 4 lapis rounds per side become 8 mm sapphire crystal bicones (alternate ones, top to bottom, mirrored)
SAPPH = set()
for _sd in (-1, 1):
    _ds = sorted([k for k, d_ in enumerate(denim) if (d_[0] < 0) == (_sd < 0)],
                 key=lambda k: denim[k][1])
    for _j in (range(0, len(_ds), 2) if not V4 else []):
        if len([k for k in SAPPH if (denim[k][0] < 0) == (_sd < 0)]) < 4:
            SAPPH.add(_ds[_j])
print("sapphire bicones:", len(SAPPH))
for k_, (x, y, strand) in enumerate(denim):
    if k_ in SAPPH:
        _path = outer if strand == 0 else inner
        _j = int(np.argmin(np.hypot(_path[:, 0] - x, _path[:, 1] - y)))
        draw_bicone(layer, x, y, tang[_j][0], tang[_j][1], 900 + k_, base_rgb=(20, 110, 215), light_rgb=(120, 190, 255))
        continue
    rng = np.random.default_rng(k_ + 21000)
    n = int(DEN_D * S)
    yy_, xx_ = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2
    nx_ = (xx_ - c) / (n / 2); ny_ = (yy_ - c) / (n / 2)
    rr = np.hypot(nx_, ny_)
    z = np.sqrt(np.clip(1 - rr ** 2, 0, 1))
    m = np.array(Image.fromarray((rng.random((6, 6)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float)[..., None] / 255
    w = np.array(Image.fromarray((rng.random((9, 9)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float)[..., None] / 255
    # vivid cobalt/royal lapis (per reference photo): bright blue with lighter and deeper mottling,
    # small grey-gold pyrite patches, very little white
    base = np.array([44, 82, 212]) * (1 - 0.45 * m) + np.array([26, 46, 160]) * 0.45 * m
    lite = np.clip((w - 0.68) * 3.0, 0, 1) * 0.45
    base = base * (1 - lite) + np.array([90, 140, 235]) * lite
    py_ = np.array(Image.fromarray((rng.random((14, 14)) * 255).astype(np.uint8)).resize((n, n), Image.BICUBIC), float) / 255
    pmask = py_ > 0.86
    base[pmask] = base[pmask] * 0.35 + np.array([150, 140, 110]) * 0.65
    pyr = rng.random((n, n)) > 0.994
    base[pyr] = [200, 180, 120]
    L = np.array([-0.45, -0.55, 0.70]); L /= np.linalg.norm(L)
    ndl = np.clip(nx_ * L[0] + ny_ * L[1] + z * L[2], 0, 1)
    col = base * (0.32 + 0.82 * ndl[..., None]) + 255 * 0.8 * (ndl ** 50)[..., None]
    alpha = np.clip((1 - rr) * n / 2, 0, 1) * 255
    spr = Image.fromarray(np.dstack([np.clip(col, 0, 255), alpha]).astype(np.uint8), "RGBA")
    px, py = P(x, y)
    shadow_spr = Image.new("RGBA", spr.size, (0, 0, 0, 0))
    layer.paste(spr, (int(px - spr.width / 2), int(py - spr.height / 2)), spr)

if not FLAT:
    # front of the neck drawn over the strand ends, so they tuck behind it
    occ_pts = [P(-occluder(y), y) for y in np.linspace(YMIN - 5, 4, 60)]
    for t in np.linspace(0, 1, 40):
        x = -occluder(4) * math.cos(t * math.pi)
        occ_pts.append(P(x, 4 + 9 * math.sin(t * math.pi)))
    occ_pts += [P(occluder(y), y) for y in np.linspace(4, YMIN - 5, 60)]
    occ = Image.new("L", (W, H), 0)
    ImageDraw.Draw(occ).polygon(occ_pts, fill=255)
    occ = occ.filter(ImageFilter.GaussianBlur(0.6 * S))
    layer = Image.composite(body_only, layer, occ)
    o = np.array(occ, dtype=float) / 255
    ob = np.array(occ.filter(ImageFilter.GaussianBlur(5 * S)), dtype=float) / 255
    sheen = np.clip(o - ob, 0, 1) * 2.0
    fade = np.clip((yy - P(0, -70)[1]) / (P(0, -10)[1] - P(0, -70)[1]), 0, 1)
    sheen *= fade                                # only near the neck base, fading upward
    la = np.array(layer, dtype=float) + (sheen ** 1.2 * 60)[..., None]
    # soft contact shadow just below the neck front
    sh_ = np.clip(ob - o, 0, 1) * 1.5
    la *= (1 - 0.6 * sh_)[..., None]
    layer = Image.fromarray(np.clip(la, 0, 255).astype(np.uint8))
else:
    pass                                   # seamless: no clasp drawn

# ---------- finish ----------
SCALE = 2.6
img = layer.resize((int(W / SCALE), int(H / SCALE)), Image.LANCZOS)
cd = ImageDraw.Draw(img)
iw, ih = img.size
f1 = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 46)
f2 = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
t1 = "Turquoise, Lapis & Spondylus Heishi"
t2 = (f'Double strand  ·  42" outer / {C_IN/INCH:.0f}" inner  ·  turquoise, lapis & red/orange spondylus in 1" blocks')
for txt, fnt, yy_, col in ((t1, f1, ih - 120, (214, 205, 185)), (t2, f2, ih - 62, (150, 145, 135))):
    cd.text(((iw - cd.textlength(txt, font=fnt)) / 2, yy_), txt, font=fnt, fill=col)
out = sys.argv[1] if len(sys.argv) > 1 else "necklace_hanging.png"
img.save(out)
print(out, img.size)
