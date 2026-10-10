import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { hackathons } from "../data/hackathons";
import "./HackathonsPage.css";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const N = hackathons.length;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const pad = (n) => String(n).padStart(2, "0");
const initials = (name) =>
  name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
const EASE_OUT = [0.22, 1, 0.36, 1];
const EASE_EXPO = [0.16, 1, 0.3, 1];
const EASE_IN_OUT = [0.87, 0, 0.13, 1];
const INTRO = 1.3; // site <Preloader/> runs ~1.4s; start the landing animation as it fades

function useMedia(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

/** Fan layout for the landing photo deck — works for any number of hackathons. */
const slotOf = (i) => {
  const t = N > 1 ? i / (N - 1) : 0.5;
  return { x: -0.36 + t * 0.67, y: i % 2 === 0 ? 0.07 : -0.05, r: -12 + t * 24 };
};

const StarGlyph = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <linearGradient id="hk-sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset=".3" stopColor="#fff" />
        <stop offset="1" stopColor="#ffc2ca" />
      </linearGradient>
    </defs>
    <path
      d="M50 8l11.8 27.6 29.9 2.6-22.7 19.7 6.9 29.2L50 72.8 24.1 87.1l6.9-29.2L8.3 38.2l29.9-2.6z"
      fill="none"
      stroke="url(#hk-sg)"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
  </svg>
);

const placementWord = (h) =>
  h.placement.num ? `${h.placement.line1[0]}${h.placement.line1.slice(1).toLowerCase()} place` : h.status;

/* ------------------------------------------------------------------ */
/* landing                                                             */
/* ------------------------------------------------------------------ */
function CountUp({ to, suffix = "", start }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    const c = animate(0, to, { duration: 1.4, ease: EASE_EXPO, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [start, to]);
  return (
    <>
      {v}
      {suffix}
    </>
  );
}

function Deck({ onPick, reduce }) {
  const ref = useRef(null);
  const [dims, setDims] = useState({ w: 640, h: 560, cw: 280 });
  const [hov, setHov] = useState(-1);
  const [intro, setIntro] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(useTransform(px, [-1, 1], [6, -6]), { stiffness: 80, damping: 18 });
  const rotX = useSpring(useTransform(py, [-1, 1], [-4, 4]), { stiffness: 80, damping: 18 });

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      setDims({ w: el.clientWidth, h: el.clientHeight, cw: clamp(window.innerWidth * 0.19, 220, 330) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(() => setIntro(true), 3600);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    px.set((mx / r.width - 0.5) * 2);
    py.set((my / r.height - 0.5) * 2);
    // hit-test the ORIGINAL slots so the focused card moving never causes flicker
    const { w, h, cw } = dims;
    const ch = (cw * 4) / 3;
    let found = -1;
    for (let i = N - 1; i >= 0; i -= 1) {
      const k = slotOf(i);
      const cx = w / 2 + k.x * w;
      const cy = h / 2 + k.y * w * 0.9;
      if (Math.abs(mx - cx) < cw * 0.5 && Math.abs(my - cy) < ch * 0.5) {
        found = i;
        break;
      }
    }
    if (found >= 0) setHov(found);
  };

  const leave = () => {
    setHov(-1);
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="hk-deck"
      style={reduce ? undefined : { rotateY: rotY, rotateX: rotX }}
      onPointerMove={handleMove}
      onPointerLeave={leave}
      onClick={() => hov >= 0 && onPick(hov)}
    >
      {hackathons.map((h, i) => {
        const k = slotOf(i);
        const bx = k.x * dims.w;
        const by = k.y * dims.w * 0.9;
        const isFocus = hov === i;
        const anyFocus = hov >= 0;
        const dir = anyFocus && !isFocus ? Math.sign(k.x - slotOf(hov).x) || 1 : 0;
        const target = isFocus
          ? { x: 0, y: -6, rotate: 0, scale: 1.2, opacity: 1, filter: "blur(0px) saturate(1)" }
          : anyFocus
            ? {
                x: bx + dir * (dims.w * 0.16 + i * 14),
                y: by + (by > 0 ? 60 : -40),
                rotate: k.r + dir * 6,
                scale: 0.88,
                opacity: 0.07,
                filter: "blur(7px) saturate(0.4)",
              }
            : { x: bx, y: by, rotate: k.r, scale: 1, opacity: 1, filter: "blur(0px) saturate(1)" };
        return (
          <motion.div
            key={h.id}
            className={`hk-dc${isFocus ? " is-focus" : ""}`}
            style={{ width: dims.cw, marginLeft: -dims.cw / 2, marginTop: -dims.cw * 0.67, zIndex: isFocus ? 30 : i + 1 }}
            initial={reduce ? false : { opacity: 0, x: bx + 700, y: by, rotate: k.r + 30 }}
            animate={target}
            transition={
              intro || reduce
                ? { type: "spring", stiffness: 150, damping: 20 }
                : { type: "spring", stiffness: 70, damping: 16, delay: INTRO + 0.5 + i * 0.14 }
            }
          >
            {h.image ? (
              <img src={h.image} alt={h.imageAlt || ""} draggable={false} />
            ) : (
              <div className="hk-dc-fallback">
                <div className="hk-dc-fallback-pattern" />
                <span className="hk-dc-fallback-pill">{h.shortTitle || h.title}</span>
              </div>
            )}
            <span className={`hk-pl${h.placement.num ? "" : " is-t"}`}>{h.placement.num || "FINALIST"}</span>
            <div className="hk-nm2">
              {h.title}
              <small>{h.dateShort}</small>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Landing({ onPick, onExplore, reduce }) {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const statsIn = useInView(statsRef, { once: true, amount: 0.4 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.12]);

  const people = useMemo(() => new Set(hackathons.flatMap((h) => h.members)).size, []);
  const campuses = useMemo(() => new Set(hackathons.map((h) => h.venue)).size, []);
  const stats = [
    { n: N, suffix: "+", label: "Hackathons" },
    { n: people, suffix: "", label: "Builders" },
    { n: campuses, suffix: "", label: "Campuses" },
    { text: "2nd", label: "Best placing" },
  ];

  const word = (text, i, red) => (
    <span className="hk-ln" key={text}>
      {text.split(" ").map((w, k) => (
        <span key={w}>
          <motion.span
            className={`hk-lw${red ? " hk-red" : ""}`}
            initial={reduce ? false : { y: "112%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease: EASE_EXPO, delay: INTRO + 0.15 + (i * 2 + k) * 0.1 }}
          >
            {w}
          </motion.span>{" "}
        </span>
      ))}
    </span>
  );

  const fadeUp = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE_OUT, delay: INTRO + delay },
  });

  return (
    <section className="hk-land" ref={ref} id="hk-land">
      <motion.div className="hk-lin" style={reduce ? undefined : { y, opacity }}>
        <div>
          <motion.div className="hk-eyebrow2" {...fadeUp(0.05)}>
            <i /> OSCODE&nbsp;&nbsp;/&nbsp;&nbsp;HACKATHON ARCHIVE&nbsp;·&nbsp;2026
          </motion.div>
          <h1 className="hk-lh">
            {word("Four hackathons.", 0, false)}
            {word("One season.", 1, true)}
          </h1>
          <motion.p className="hk-ls" {...fadeUp(0.7)}>
            From national finals to university podiums: the stages we showed up on, the teams who built, and where we landed.
          </motion.p>
          <div className="hk-lstats" ref={statsRef}>
            {stats.map((s, i) => (
              <motion.div className="hk-lst" key={s.label} {...fadeUp(0.85 + i * 0.07)}>
                <b>{s.text ? s.text : <CountUp to={s.n} suffix={s.suffix} start={statsIn} />}</b>
                <small>{s.label}</small>
              </motion.div>
            ))}
          </div>
          <motion.button type="button" className="hk-lgo" onClick={onExplore} {...fadeUp(1.2)}>
            Explore the journey <ArrowDown size={18} />
          </motion.button>
        </div>
        <Deck onPick={onPick} reduce={reduce} />
      </motion.div>
      <div className="hk-scue">
        <span>SCROLL</span>
        <i />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* one slide (shared by the sideways reel and the stacked mobile list) */
/* ------------------------------------------------------------------ */
const up = (delay) => ({
  hide: { opacity: 0, y: 26, transition: { duration: 0 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay } },
});

function Slide({ h, i, pos, desktop, stageInView, reduce, onOpen, go }) {
  const ref = useRef(null);
  const off = useTransform(pos, (p) => i - p);
  const colX = useTransform(off, (o) => -o * 80);
  const colO = useTransform(off, (o) => clamp((0.95 - Math.abs(o)) * 3));
  const figX = useTransform(off, (o) => o * 70);
  const figR = useTransform(off, (o) => -o * 18);
  const figS = useTransform(off, (o) => 1 - Math.min(1, Math.abs(o)) * 0.08);
  const figO = useTransform(off, (o) => clamp((1 - Math.abs(o)) * 2.4));

  const [near, setNear] = useState(() => Math.abs(i - pos.get()) < 0.65);
  useMotionValueEvent(off, "change", (o) => {
    const a = Math.abs(o);
    setNear((n) => (a < 0.65 ? true : a > 1.2 ? false : n));
  });
  const seen = useInView(ref, { once: true, amount: 0.2 });
  const show = reduce || (desktop ? near : seen);
  const state = show ? "show" : "hide";

  const glare = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  const num = h.placement.num;
  let ci = 0;

  return (
    <article className="hk-slide" id={`hk-slide-${i}`} ref={ref}>
      <motion.div className="hk-sin" initial="hide" animate={state}>
        <motion.div className="hk-col" style={desktop ? { x: colX, opacity: colO } : undefined}>
          <motion.div className="hk-row1" variants={up(0.1)}>
            <span className="hk-pill">{h.category}</span>
            <span className="hk-dt">
              <CalendarDays aria-hidden="true" />
              {h.date}
            </span>
          </motion.div>

          <motion.div className="hk-ach" variants={up(0.2)}>
            <span>ACHIEVEMENT</span>
            {h.note ? <span className="hk-note">{h.note}</span> : null}
          </motion.div>

          <div className="hk-big">
            {num ? (
              <div className="hk-digits" aria-label={`Placement ${num}`}>
                {[...num].map((d, k) => (
                  <span className="hk-dg" key={k}>
                    <motion.b
                      variants={{
                        hide: { y: "0%", transition: { duration: 0 } },
                        show: { y: `-${Number(d) * 10}%`, transition: { duration: 1.5, ease: EASE_EXPO, delay: 0.3 + k * 0.12 } },
                      }}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <i key={n}>{n}</i>
                      ))}
                    </motion.b>
                  </span>
                ))}
              </div>
            ) : (
              <motion.span variants={up(0.3)} style={{ display: "block" }}>
                <StarGlyph className="hk-star" />
              </motion.span>
            )}
            <motion.span
              className="hk-vr"
              variants={{
                hide: { scaleY: 0, transition: { duration: 0 } },
                show: { scaleY: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.4 } },
              }}
            />
            <div className="hk-words">
              {[h.placement.line1, h.placement.line2].map((line, k) => (
                <span key={line}>
                  <motion.em
                    variants={{
                      hide: { y: "110%", transition: { duration: 0 } },
                      show: { y: "0%", transition: { duration: 1, ease: EASE_EXPO, delay: 0.35 + k * 0.1 } },
                    }}
                  >
                    {line}
                  </motion.em>
                </span>
              ))}
            </div>
          </div>

          <h2 className="hk-h1" aria-label={h.title}>
            {h.title.split(" ").map((w, wi) => (
              <span key={wi}>
                <span className="hk-w">
                  {[...w].map((c) => {
                    const idx = ci;
                    ci += 1;
                    return (
                      <motion.span
                        className="hk-c"
                        key={idx}
                        variants={{
                          hide: { y: "120%", opacity: 0, transition: { duration: 0 } },
                          show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE_EXPO, delay: 0.5 + idx * 0.018 } },
                        }}
                      >
                        {c}
                      </motion.span>
                    );
                  })}
                </span>{" "}
              </span>
            ))}
          </h2>

          <motion.div className="hk-vn" variants={up(0.7)}>
            <MapPin aria-hidden="true" />
            {h.venue}
          </motion.div>
          <motion.p className="hk-desc" variants={up(0.78)}>
            {h.description}
          </motion.p>

          <motion.div className="hk-tl" variants={up(0.9)}>
            <Users aria-hidden="true" />
            TEAM OF {h.members.length}
          </motion.div>
          <div className="hk-tm">
            <div className="hk-av">
              {h.members.map((m, k) => (
                <motion.span
                  key={m}
                  title={m}
                  variants={{
                    hide: { scale: 0, opacity: 0, transition: { duration: 0 } },
                    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 14, delay: 1 + k * 0.07 } },
                  }}
                >
                  {initials(m)}
                </motion.span>
              ))}
            </div>
            <motion.div className="hk-nm" variants={up(1.1)}>
              {h.members
                .reduce((acc, m, k) => {
                  if (k % 2) acc[acc.length - 1].push(m);
                  else acc.push([m]);
                  return acc;
                }, [])
                .map((pair) => (
                  <span key={pair.join()}>{pair.join("  ·  ")}</span>
                ))}
            </motion.div>
          </div>

          <motion.button type="button" className="hk-btn" variants={up(1.2)} onClick={() => onOpen(i)}>
            Full details <ArrowUpRight size={16} />
          </motion.button>
        </motion.div>

        <motion.div
          className="hk-figw"
          style={desktop ? { x: figX, rotateY: figR, scale: figS, opacity: figO, transformPerspective: 1500 } : undefined}
        >
          <motion.figure
            className="hk-fig"
            onPointerMove={glare}
            variants={{
              hide: { opacity: 0.5, scale: 0.98, transition: { duration: 0.2 } },
              show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
            }}
          >
            {h.image ? (
              <motion.img
                src={h.image}
                alt={h.imageAlt}
                variants={{
                  hide: { scale: 1.05, transition: { duration: 0 } },
                  show: { scale: 1, transition: { duration: 1.2, ease: EASE_EXPO } },
                }}
              />
            ) : (
              <div className="hk-fig-fallback">
                <div className="hk-fig-fallback-pattern" />
                <div className="hk-fig-fallback-badge">
                  <span>{h.status}</span>
                  <strong>{h.title}</strong>
                  <p className="hk-ph-venue-text">{h.venue}</p>
                </div>
              </div>
            )}
            <div className="hk-sh" />
            <div className="hk-gl" />
            <motion.span className="hk-fd" variants={up(0.9)}>
              <CalendarDays aria-hidden="true" />
              {h.dateShort}
            </motion.span>
            <motion.figcaption className="hk-cap" variants={up(1)}>
              <span className="hk-ic">
                <Users aria-hidden="true" />
              </span>
              <span className="hk-t">
                <b>Team OSCODE</b>
                <span className="hk-sub">{h.shortTitle === "SIH" ? h.title : h.title.replace(/ \(.*\)/, "")}</span>
              </span>
            </motion.figcaption>
            <div className="hk-arr">
              <button type="button" aria-label="Previous hackathon" onClick={() => go(i - 1)}>
                <ArrowLeft />
              </button>
              <button type="button" className="is-next" aria-label="Next hackathon" onClick={() => go(i + 1)}>
                <ArrowRight />
              </button>
            </div>
          </motion.figure>
        </motion.div>
      </motion.div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* full details — photo on the left, details panel on the right        */
/* ------------------------------------------------------------------ */
function DetailsModal({ idx, onClose, onSwap, reduce }) {
  const h = hackathons[idx];
  const stagger = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE_OUT, delay: d },
  });

  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onSwap(1);
      if (e.key === "ArrowLeft") onSwap(-1);
    };
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [onClose, onSwap]);

  return (
    <>
      <motion.div
        className="hk-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="hk-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${h.title} details`}
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        animate={{ clipPath: "inset(0 0 0 0%)" }}
        exit={{ clipPath: "inset(0 0 0 100%)" }}
        transition={{ duration: 0.9, ease: EASE_IN_OUT }}
      >
        <div className="hk-mimg">
          {h.image ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={h.id}
                src={h.image}
                alt={h.imageAlt}
                initial={reduce ? false : { scale: 1.25, opacity: 0.2 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0.2 }}
                transition={{ duration: 1.4, ease: EASE_EXPO }}
              />
            </AnimatePresence>
          ) : (
            <div className="hk-modal-fallback">
              <div className="hk-modal-fallback-pattern" />
              <div className="hk-modal-fallback-badge">
                <span>{h.status}</span>
                <strong>{h.title}</strong>
              </div>
            </div>
          )}
          <div className="hk-sd" />
          <span className="hk-mdate">
            <CalendarDays aria-hidden="true" />
            {h.dateShort}
          </span>
          <motion.div className="hk-mcap" key={`cap-${h.id}`} {...stagger(0.35)}>
            <div className="hk-mnum">{h.placement.num || <StarGlyph />}</div>
            <div className="hk-mw">
              <span>{h.placement.line1}</span>
              <span>{h.placement.line2}</span>
            </div>
          </motion.div>
          <div className="hk-mnv">
            <button type="button" aria-label="Previous hackathon" onClick={() => onSwap(-1)}>
              <ArrowLeft />
            </button>
            <button type="button" className="is-next" aria-label="Next hackathon" onClick={() => onSwap(1)}>
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="hk-mbody" key={`body-${h.id}`}>
          <motion.div {...stagger(0.35)}>
            <span className="hk-pill">{h.category}</span>
          </motion.div>
          <motion.h3 {...stagger(0.42)}>{h.title}</motion.h3>
          <motion.div className="hk-blk" {...stagger(0.5)}>
            <small>Result</small>
            <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>
              {placementWord(h)}
              {h.note ? ` · ${h.note}` : ""}
            </p>
          </motion.div>
          <motion.div className="hk-blk" {...stagger(0.56)}>
            <small>Date</small>
            <p>{h.date}</p>
          </motion.div>
          <motion.div className="hk-blk" {...stagger(0.62)}>
            <small>Venue</small>
            <p>{h.venue}</p>
          </motion.div>
          <motion.div className="hk-blk" {...stagger(0.68)}>
            <small>About</small>
            <p>{h.description}</p>
          </motion.div>
          <motion.div className="hk-blk" {...stagger(0.74)}>
            <small>Team members ({h.members.length})</small>
            <div className="hk-tags">
              {h.members.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </motion.div>
          {h.github ? (
            <motion.div className="hk-blk" {...stagger(0.8)}>
              <a className="hk-btn" href={h.github} target="_blank" rel="noopener noreferrer">
                View Repository <FaGithub size={15} />
              </a>
            </motion.div>
          ) : null}
        </div>

        <button type="button" className="hk-mx" aria-label="Close details" onClick={onClose}>
          <X size={18} />
        </button>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */
export default function HackathonsPage() {
  const reduce = useReducedMotion();
  const desktop = useMedia("(min-width: 901px)");
  const stageRef = useRef(null);
  const stickyRef = useRef(null);
  const nodesRef = useRef([]);
  const spanRef = useRef(0);
  const [active, setActive] = useState(0);
  const [openIdx, setOpenIdx] = useState(-1);
  const stageInView = useInView(stickyRef, { margin: "0px 0px -20% 0px" });

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] });
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const posReel = useTransform(prog, [0, 1], [0, N - 1]);
  const posStatic = useMotionValue(0);
  const pos = desktop ? posReel : posStatic;
  const trackX = useTransform(posReel, (p) => `${-p * 100}vw`);
  useMotionValueEvent(posReel, "change", (v) => setActive(Math.round(clamp(v, 0, N - 1))));

  /* journey bar: fill + travelling comet follow the scroll progress */
  const fillW = useTransform(prog, (p) => p * spanRef.current);
  const cometX = useTransform(prog, (p) => p * spanRef.current);
  const tailW = useTransform(useVelocity(prog), (v) => 40 + Math.min(160, Math.abs(v) * 90));

  /* scale content so the tallest left column always fits above the floating bar */
  const fit = useCallback(() => {
    const el = stickyRef.current;
    if (!el) return;
    if (!desktop) {
      el.style.setProperty("--u", "0.8");
      return;
    }
    const track = el.querySelector(".hk-track");
    let u = 1.2;
    el.style.setProperty("--u", String(u));
    const avail = () => track.clientHeight - 124;
    const tall = () => Math.max(...[...el.querySelectorAll(".hk-col")].map((c) => c.offsetHeight));
    while (u > 0.45 && tall() > avail()) {
      u = +(u - 0.02).toFixed(2);
      el.style.setProperty("--u", String(u));
    }
  }, [desktop]);

  useLayoutEffect(() => {
    fit();
    const measure = () => {
      const a = nodesRef.current[0];
      const b = nodesRef.current[N - 1];
      if (a && b) spanRef.current = b.offsetLeft - a.offsetLeft;
    };
    const on = () => {
      fit();
      measure();
    };
    measure();
    window.addEventListener("resize", on);
    document.fonts?.ready.then(on);
    return () => window.removeEventListener("resize", on);
  }, [fit]);

  const go = useCallback(
    (raw) => {
      const i = clamp(raw, 0, N - 1);
      const el = stageRef.current;
      if (!el) return;
      if (!desktop) {
        document.getElementById(`hk-slide-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * (i / (N - 1)), behavior: "smooth" });
    },
    [desktop],
  );

  const swap = useCallback((d) => setOpenIdx((i) => (i < 0 ? i : (i + d + N) % N)), []);
  const close = useCallback(() => setOpenIdx(-1), []);

  return (
    <div className="hk-page">
      <div className="hk-amb" aria-hidden="true">
        <div className="hk-orb hk-o1" />
        <div className="hk-orb hk-o2" />
        <i className="hk-dot" style={{ right: 30, top: 128 }} />
        <i className="hk-dot" style={{ left: 652, top: 440, animationDelay: "-1s" }} />
        <i className="hk-dot" style={{ right: 340, top: 780, animationDelay: "-2s" }} />
      </div>

      <Landing onPick={go} onExplore={() => go(0)} reduce={reduce} />

      <section ref={stageRef} style={desktop ? { height: `${(N - 1) * 95 + 100}vh`, position: "relative", zIndex: 2 } : { position: "relative", zIndex: 2 }}>
        <div className="hk-sticky" ref={stickyRef}>
          <div className="hk-eyebrow">
            <i /> OSCODE&nbsp;&nbsp;/&nbsp;&nbsp;HACKATHON ARCHIVE
          </div>

          <motion.div className="hk-track" style={desktop ? { x: trackX } : undefined}>
            {hackathons.map((h, i) => (
              <Slide
                key={h.id}
                h={h}
                i={i}
                pos={pos}
                desktop={desktop}
                stageInView={stageInView}
                reduce={reduce}
                onOpen={setOpenIdx}
                go={go}
              />
            ))}
          </motion.div>

          <div className="hk-pager" aria-label="Hackathons">
            {hackathons.map((h, i) => (
              <button
                key={h.id}
                type="button"
                className={`hk-pg${active === i ? " is-on" : Math.abs(active - i) === 1 ? " is-near" : ""}`}
                data-n={`${pad(i + 1)} / ${pad(N)}`}
                aria-label={h.title}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <div className="hk-jr">
            <div className="hk-jt">
              HACKATHON<small>JOURNEY</small>
            </div>
            <ol className="hk-jl">
              <motion.li className="hk-jf" aria-hidden="true" style={{ width: fillW }} />
              <motion.li className="hk-comet" aria-hidden="true" style={{ x: cometX }}>
                <motion.i className="hk-tail" style={{ width: tailW }} />
              </motion.li>
              {hackathons.map((h, i) => (
                <li key={h.id} style={{ listStyle: "none" }}>
                  <button
                    type="button"
                    ref={(el) => {
                      nodesRef.current[i] = el;
                    }}
                    className={`hk-jn${active === i ? " is-on" : i < active ? " is-done" : ""}`}
                    onClick={() => go(i)}
                  >
                    <span className="hk-nd" />
                    <span className="hk-tx">
                      <span className="hk-no">{pad(i + 1)}</span>
                      <span className="hk-nn">
                        {h.barLabel}
                        <small>{h.dateShort}</small>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" className="hk-jnext" onClick={() => go(active + 1)}>
              Next <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openIdx >= 0 ? <DetailsModal key="hk-modal" idx={openIdx} onClose={close} onSwap={swap} reduce={reduce} /> : null}
      </AnimatePresence>
    </div>
  );
}
