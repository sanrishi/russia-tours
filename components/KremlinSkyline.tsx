"use client"

const C = "#cc2222"
const F = "#0d0202"
const W = 2.4

export default function KremlinSkyline({ noBackground }: { noBackground?: boolean }) {
  return (
    <svg viewBox="0 0 800 500" fill="none" className="h-full w-auto pointer-events-none select-none" style={{ maxWidth: "90vw" }}>
      <defs>
        <radialGradient id="kbg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#3d0808" />
          <stop offset="100%" stopColor="#1a0505" />
        </radialGradient>
        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {!noBackground && <rect width="800" height="500" fill="url(#kbg)" />}

      {/* ===== WALL — thick filled baseline + distinct merged crenellations ===== */}
      {/* Wall base: 16px tall filled rect, buildings anchor to top edge (y=480) */}
      <rect x="0" y="480" width="800" height="16" fill={F} stroke={C} strokeWidth={W * 0.7} />
      {/* Crenellations: 50 distinct 8x8 blocks merged into wall top, every 16px */}
      {Array.from({ length: 50 }, (_, i) => {
        const x = i * 16
        return <rect key={i} x={x} y="472" width="8" height="8" fill={F} stroke={C} strokeWidth={W * 0.6} />
      })}

      {/* ===== TOWER 1 — far left ===== */}
      <path d="M30,480 L30,434 L38,410 L46,434 L46,480 Z" fill={F} stroke={C} strokeWidth={W} />
      <line x1={38} y1={410} x2={38} y2={404} stroke={C} strokeWidth={W} />
      <line x1={34} y1={407} x2={42} y2={407} stroke={C} strokeWidth={W * 0.5} />

      {/* ===== TOWER 2 — dome tower ===== */}
      <path d="M78,480 L78,422 A14,14 0 0,1 106,422 L106,480 Z" fill={F} stroke={C} strokeWidth={W} />
      <line x1={92} y1={408} x2={92} y2={396} stroke={C} strokeWidth={W} />
      <line x1={86} y1={402} x2={98} y2={402} stroke={C} strokeWidth={W * 0.6} />
      <path d="M89,450 L89,442 A4,4 0 0,1 97,442 L97,450 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* ===== TOWER 3 — medium left ===== */}
      <path d="M142,480 L142,436 L154,398 L166,436 L166,480 Z" fill={F} stroke={C} strokeWidth={W} />
      <line x1={154} y1={398} x2={154} y2={390} stroke={C} strokeWidth={W} />
      <path d="M150,454 L150,448 A3,3 0 0,1 156,448 L156,454 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M160,454 L160,448 A3,3 0 0,1 166,448 L166,454 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* ===== TOWER 4 — gothic ===== */}
      <path d="M230,480 L230,444 L234,444 L234,410 L238,410 L238,382 L245,340 L252,382 L252,410 L256,410 L256,444 L260,444 L260,480 Z" fill={F} stroke={C} strokeWidth={W} />
      <line x1={245} y1={340} x2={245} y2={332} stroke={C} strokeWidth={W} />
      <line x1={230} y1={444} x2={260} y2={444} stroke={C} strokeWidth={W * 0.5} />
      <line x1={234} y1={410} x2={256} y2={410} stroke={C} strokeWidth={W * 0.5} />
      <line x1={238} y1={382} x2={252} y2={382} stroke={C} strokeWidth={W * 0.5} />
      <path d="M234,444 A3,4 0 0,1 240,444 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M250,444 A3,4 0 0,1 256,444 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M238,410 A2.5,3 0 0,1 243,410 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M247,410 A2.5,3 0 0,1 252,410 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* ===== SPASSKAYA TOWER (center) — widened shaft (60px), taller spire ===== */}
      <path d="M350,480 L350,420 L358,420 L358,364 L366,364 L366,324 L373,324 L373,282 L380,232 L387,282 L387,324 L394,324 L394,364 L402,364 L402,420 L410,420 L410,480 Z" fill={F} stroke={C} strokeWidth={W} />
      <line x1={350} y1={420} x2={410} y2={420} stroke={C} strokeWidth={W * 0.5} />
      <line x1={358} y1={364} x2={402} y2={364} stroke={C} strokeWidth={W * 0.5} />
      <line x1={366} y1={324} x2={394} y2={324} stroke={C} strokeWidth={W * 0.5} />
      <line x1={373} y1={282} x2={387} y2={282} stroke={C} strokeWidth={W * 0.5} />
      <path d="M364,480 L364,448 A16,16 0 0,1 396,448 L396,480 Z" fill={F} stroke={C} strokeWidth={W * 0.6} />
      <path d="M350,460 A4,5 0 0,1 358,460 L358,466 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M402,460 A4,5 0 0,1 410,460 L410,466 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M372,348 L372,340 A3,3 0 0,1 378,340 L378,348 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M390,348 L390,340 A3,3 0 0,1 396,340 L396,348 Z" fill={F} stroke={C} strokeWidth={W * 0.45} />
      <path d="M377,310 L377,304 A2,2 0 0,1 381,304 L381,310 Z" fill={F} stroke={C} strokeWidth={W * 0.4} />

      {/* Clock face */}
      <circle cx="380" cy="393" r="18" fill={F} stroke={C} strokeWidth={W} />
      <circle cx="380" cy="393" r="16" fill="none" stroke={C} strokeWidth={W * 0.25} />
      <line x1={380} y1={376} x2={380} y2={380} stroke={C} strokeWidth={W * 0.5} />
      <line x1={380} y1={406} x2={380} y2={410} stroke={C} strokeWidth={W * 0.5} />
      <line x1={363} y1={393} x2={367} y2={393} stroke={C} strokeWidth={W * 0.5} />
      <line x1={393} y1={393} x2={397} y2={393} stroke={C} strokeWidth={W * 0.5} />
      <line x1={368} y1={381} x2={371} y2={384} stroke={C} strokeWidth={W * 0.4} />
      <line x1={392} y1={381} x2={389} y2={384} stroke={C} strokeWidth={W * 0.4} />
      <line x1={368} y1={405} x2={371} y2={402} stroke={C} strokeWidth={W * 0.4} />
      <line x1={392} y1={405} x2={389} y2={402} stroke={C} strokeWidth={W * 0.4} />
      <line x1={365} y1={387} x2={369} y2={389} stroke={C} strokeWidth={W * 0.4} />
      <line x1={395} y1={387} x2={391} y2={389} stroke={C} strokeWidth={W * 0.4} />
      <line x1={365} y1={399} x2={369} y2={397} stroke={C} strokeWidth={W * 0.4} />
      <line x1={395} y1={399} x2={391} y2={397} stroke={C} strokeWidth={W * 0.4} />
      <line x1={380} y1={393} x2={380} y2={380} stroke={C} strokeWidth={W} />
      <line x1={380} y1={393} x2={394} y2={390} stroke={C} strokeWidth={W * 0.7} />
      <circle cx="380" cy="393" r="2" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* Spire details */}
      <line x1={378} y1={256} x2={382} y2={256} stroke={C} strokeWidth={W * 0.4} />
      <line x1={379} y1={244} x2={381} y2={244} stroke={C} strokeWidth={W * 0.4} />

      {/* Star — filled 5-point star anchored to spire tip (380,232) */}
      <polygon points="380,224 382.5,230 388,230 383,234 384.5,240 380,236 375.5,240 377,234 372,230 377.5,230" fill="#ff4040" stroke="#ff4040" strokeWidth={W * 0.6} filter="url(#starGlow)" />

      {/* ===== TREES — clean overlapping layered triangles ===== */}
      {/* Tree 1 — anchored to wall at y=480 */}
      <path d="M195,400 L170,480 L220,480 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M195,390 L178,440 L212,440 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M195,382 L188,416 L202,416 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* Tree 2 — anchored to wall at y=480 */}
      <path d="M295,420 L270,480 L320,480 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M295,410 L280,450 L310,450 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M295,402 L288,430 L302,430 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* Tree 3 — anchored to wall at y=480 */}
      <path d="M450,410 L425,480 L475,480 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M450,400 L435,445 L465,445 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M450,392 L442,422 L458,422 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* Tree 4 — anchored to wall at y=480 */}
      <path d="M550,420 L525,480 L575,480 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M550,410 L535,450 L565,450 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M550,402 L542,430 L558,430 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* ===== TOWER 6 — right medium ===== */}
      <path d="M498,480 L498,436 L510,398 L522,436 L522,480 Z" fill={F} stroke={C} strokeWidth={W} />
      <line x1={510} y1={398} x2={510} y2={390} stroke={C} strokeWidth={W} />
      <path d="M506,454 L506,448 A3,3 0 0,1 512,448 L512,454 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M514,454 L514,448 A3,3 0 0,1 520,448 L520,454 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />

      {/* ===== TOWER 7 — small right ===== */}
      <path d="M567,480 L567,442 L575,418 L583,442 L583,480 Z" fill={F} stroke={C} strokeWidth={W} />
      <line x1={575} y1={418} x2={575} y2={412} stroke={C} strokeWidth={W} />
      <line x1={583} y1={464} x2={600} y2={464} stroke={C} strokeWidth={W * 0.5} />

      {/* ===== ST. BASIL'S CATHEDRAL ===== */}
      <rect x="600" y="446" width="140" height="34" fill={F} stroke={C} strokeWidth={W} />

      {/* Kokoshnik pointed arches */}
      {Array.from({ length: 13 }, (_, i) => {
        const x = 600 + i * 10
        return <path key={i} d={`M${x},446 Q${x+5},436 ${x+5},428 Q${x+5},436 ${x+10},446 Z`} fill={F} stroke={C} strokeWidth={W * 0.5} />
      })}

      {/* Windows */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = 604 + i * 11
        return <path key={i} d={`M${x},474 L${x},462 A4,4 0 0,1 ${x+8},462 L${x+8},474 Z`} fill={F} stroke={C} strokeWidth={W * 0.4} />
      })}

      {/* ===== ONION DOMES — swelled cubic-bezier teardrops on solid cylinders ===== */}
      {/* Dome 1 — left small: base 605-625, belly swells to ~596-634, peak 615,394 */}
      <path d="M605,452 L605,446 C605,430 596,422 615,394 C634,422 625,430 625,446 L625,452 Z" fill={F} stroke={C} strokeWidth={W * 0.7} />
      <line x1={615} y1={394} x2={615} y2={387} stroke={C} strokeWidth={W * 0.6} />
      <line x1={611} y1={390} x2={619} y2={390} stroke={C} strokeWidth={W * 0.4} />

      {/* Dome 2 — left medium: base 625-651, belly swells to ~614-662, peak 638,390 */}
      <path d="M625,452 L625,446 C625,428 614,420 638,390 C662,420 651,428 651,446 L651,452 Z" fill={F} stroke={C} strokeWidth={W * 0.75} />
      <line x1={638} y1={390} x2={638} y2={383} stroke={C} strokeWidth={W * 0.6} />
      <line x1={634} y1={386} x2={642} y2={386} stroke={C} strokeWidth={W * 0.4} />

      {/* Dome 3 — central large: base 653-687, belly swells to ~640-700, peak 670,384 */}
      <path d="M653,452 L653,446 C653,425 640,416 670,384 C700,416 687,425 687,446 L687,452 Z" fill={F} stroke={C} strokeWidth={W * 0.85} />
      <line x1={670} y1={384} x2={670} y2={376} stroke={C} strokeWidth={W * 0.7} />
      <line x1={665} y1={380} x2={675} y2={380} stroke={C} strokeWidth={W * 0.5} />

      {/* Dome 4 — right medium: base 689-715, belly swells to ~678-726, peak 702,390 */}
      <path d="M689,452 L689,446 C689,428 678,420 702,390 C726,420 715,428 715,446 L715,452 Z" fill={F} stroke={C} strokeWidth={W * 0.75} />
      <line x1={702} y1={390} x2={702} y2={383} stroke={C} strokeWidth={W * 0.6} />
      <line x1={698} y1={386} x2={706} y2={386} stroke={C} strokeWidth={W * 0.4} />

      {/* Dome 5 — right small: base 715-735, belly swells to ~706-744, peak 725,394 */}
      <path d="M715,452 L715,446 C715,430 706,422 725,394 C744,422 735,430 735,446 L735,452 Z" fill={F} stroke={C} strokeWidth={W * 0.7} />
      <line x1={725} y1={394} x2={725} y2={387} stroke={C} strokeWidth={W * 0.6} />
      <line x1={721} y1={390} x2={729} y2={390} stroke={C} strokeWidth={W * 0.4} />

      {/* Central tent tower */}
      <path d="M658,480 L658,420 L678,328 L698,420 L698,480 Z" fill={F} stroke={C} strokeWidth={W} />
      <line x1={678} y1={328} x2={678} y2={306} stroke={C} strokeWidth={W} />
      <line x1={678} y1={306} x2={678} y2={298} stroke={C} strokeWidth={W * 0.7} />
      <line x1={672} y1={302} x2={684} y2={302} stroke={C} strokeWidth={W * 0.5} />
      <path d="M664,458 L664,450 A3,4 0 0,1 670,450 L670,458 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      <path d="M686,458 L686,450 A3,4 0 0,1 692,450 L692,458 Z" fill={F} stroke={C} strokeWidth={W * 0.5} />
      {[408, 390, 372, 354].map(y => <line key={y} x1={660} y1={y} x2={696} y2={y} stroke={C} strokeWidth={W * 0.25} />)}
    </svg>
  )
}
