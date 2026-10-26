import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Search, ChevronDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { announcements } from "../../../assets/data/announcementsData";
import "./AnnouncementsFeed.css";

const ALL_INDIA = "All India";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const buildCategoryOptions = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const raw = (item.category || "Uncategorised").trim();
    const key = raw.toUpperCase();
    if (!map.has(key)) map.set(key, raw);
  });
  return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
};

/* "All India" first, then states A-Z (only those present in data) */
const buildStateOptions = (items) => {
  const set = new Set(items.map((i) => i.state || ALL_INDIA));
  const states = Array.from(set)
    .filter((s) => s !== ALL_INDIA)
    .sort((a, b) => a.localeCompare(b));
  return set.has(ALL_INDIA) ? [ALL_INDIA, ...states] : states;
};

const groupByYearMonth = (items) => {
  const years = new Map();
  items.forEach((item) => {
    const d = new Date(item.date);
    const year = String(d.getFullYear());
    const month = d.toLocaleDateString("en-US", { month: "long" });

    if (!years.has(year)) years.set(year, new Map());
    const months = years.get(year);
    if (!months.has(month)) months.set(month, []);
    months.get(month).push(item);
  });
  return years;
};

const FilterSelect = ({ value, onChange, options, placeholder, ariaLabel }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const menuRef = useRef(null);

  const all = [{ value: "", label: placeholder }, ...options];
  const current = all.find((o) => o.value === value) || all[0];

  /* close on outside click / Escape */
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* scroll the selected option into view inside the menu only */
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const active = menuRef.current.querySelector(".is-selected");
    if (active) menuRef.current.scrollTop = active.offsetTop - 8;
  }, [open]);

  return (
    <div className="eca-select" ref={wrapRef}>
      <button
        type="button"
        className={`eca-select-btn ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <span className="eca-select-value">{current.label}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`eca-chevron-sm ${open ? "is-open" : ""}`}
        />
      </button>

      {open && (
        <ul className="eca-select-menu" role="listbox" ref={menuRef}>
          {all.map((opt) => (
            <li
              key={opt.value || "__all"}
              role="option"
              aria-selected={opt.value === value}
              className={`eca-select-option ${
                opt.value === value ? "is-selected" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AnnouncementsFeed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [expandedYears, setExpandedYears] = useState(new Set());
  const [expandedMonths, setExpandedMonths] = useState(new Set());

  const heroRef = useRef(null);
  const beaconRef = useRef(null);
  const monthRefs = useRef(new Map());

  const categoryOptions = useMemo(
    () => buildCategoryOptions(announcements),
    [],
  );
  const stateOptions = useMemo(() => buildStateOptions(announcements), []);
  const latestItem = announcements[0];

  const filtered = useMemo(() => {
    return announcements.filter((item) => {
      const haystack = `${item.title} ${item.content}`.toLowerCase();
      const matchesSearch = searchTerm
        ? haystack.includes(searchTerm.toLowerCase())
        : true;
      const matchesCategory = category
        ? (item.category || "").trim().toUpperCase() === category
        : true;
      const matchesState = stateFilter
        ? (item.state || ALL_INDIA) === stateFilter
        : true;
      return matchesSearch && matchesCategory && matchesState;
    });
  }, [searchTerm, category, stateFilter]);

  const grouped = useMemo(() => groupByYearMonth(filtered), [filtered]);
  const years = Array.from(grouped.keys());
  const isFiltering = Boolean(searchTerm || category || stateFilter);

  const yearsCovered = useMemo(
    () =>
      new Set(announcements.map((a) => new Date(a.date).getFullYear())).size,
    [],
  );

  /* default open state: first year + its first month only */
  useEffect(() => {
    if (isFiltering) {
      const allYears = new Set();
      const allMonths = new Set();
      grouped.forEach((months, year) => {
        allYears.add(year);
        months.forEach((_items, month) => allMonths.add(`${year}-${month}`));
      });
      setExpandedYears(allYears);
      setExpandedMonths(allMonths);
      return;
    }
    const firstYear = years[0];
    if (!firstYear) return;
    const firstMonth = Array.from(grouped.get(firstYear).keys())[0];
    setExpandedYears(new Set([firstYear]));
    setExpandedMonths(
      firstMonth ? new Set([`${firstYear}-${firstMonth}`]) : new Set(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, category, stateFilter]);

  const toggleYear = (year) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      next.has(year) ? next.delete(year) : next.add(year);
      return next;
    });
  };

  const toggleMonth = (key) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  /* hero entrance, once */
  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".eca-eyebrow", { opacity: 0, y: 14, duration: 0.5 })
        .from(".eca-heading", { opacity: 0, y: 22, duration: 0.6 }, "-=0.3")
        .from(".eca-hero-para", { opacity: 0, y: 16, duration: 0.5 }, "-=0.35")
        .from(
          ".eca-stat",
          { opacity: 0, y: 14, duration: 0.45, stagger: 0.08 },
          "-=0.25",
        );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* pulsing live beacon, infinite */
  useEffect(() => {
    if (!beaconRef.current) return;
    const tween = gsap.to(beaconRef.current, {
      scale: 1.6,
      opacity: 0.25,
      duration: 1.15,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => tween.kill();
  }, []);

  /* animate cards in whenever a month section opens */
  useLayoutEffect(() => {
    expandedMonths.forEach((key) => {
      const node = monthRefs.current.get(key);
      if (!node) return;
      const cards = node.querySelectorAll(".eca-card");
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.05,
          overwrite: true,
        },
      );
    });
  }, [expandedMonths]);

  const renderCardBody = (item, isLatest) => (
    <>
      <div className="eca-card-head">
        {isLatest && <span className="eca-tag-new">Latest</span>}
        <span className="eca-tag-category">{item.category}</span>
        <span className="eca-tag-state">{item.state || ALL_INDIA}</span>
        <span className="eca-card-date">{formatDate(item.date)}</span>
      </div>

      <h3 className="eca-card-title">{item.title}</h3>
      <p className="eca-card-content">{item.content}</p>

      <div className="eca-card-foot">
        {item.source && <span className="eca-source">{item.source}</span>}
        {item.link && (
          <span className="eca-read-more">
            Details
            <ArrowUpRight size={14} strokeWidth={2.25} />
          </span>
        )}
      </div>
    </>
  );

  return (
    <div className="eca-announcements">
      {/* ---------- hero ---------- */}
      <header className="eca-hero" ref={heroRef}>
        <div className="eca-hero-inner">
          <h1 className="eca-heading">Announcements</h1>
          <p className="eca-hero-para">
            Every counselling update, schedule change and result, logged the
            moment it lands.
          </p>

          <div className="eca-stats">
            <div className="eca-stat">
              <span className="eca-stat-value">{announcements.length}</span>
              <span className="eca-stat-label">Total</span>
            </div>
            <div className="eca-stat">
              <span className="eca-stat-value">{categoryOptions.length}</span>
              <span className="eca-stat-label">Categories</span>
            </div>
            <div className="eca-stat">
              <span className="eca-stat-value">{yearsCovered}</span>
              <span className="eca-stat-label">Years covered</span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- controls ---------- */}
      <div className="eca-controls">
        <div className="eca-search">
          <Search size={18} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search announcements&hellip;"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <FilterSelect
          value={stateFilter}
          onChange={setStateFilter}
          placeholder="Select Location"
          ariaLabel="Filter by state"
          options={stateOptions.map((s) => ({ value: s, label: s }))}
        />

        <FilterSelect
          value={category}
          onChange={setCategory}
          placeholder="All Categories"
          ariaLabel="Filter by category"
          options={categoryOptions.map((o) => ({
            value: o.key,
            label: o.label,
          }))}
        />
      </div>

      {/* ---------- year / month groups ---------- */}
      <div className="eca-groups">
        {years.length === 0 && (
          <div className="eca-empty">
            <p>No announcements match that search.</p>
          </div>
        )}

        {years.map((year) => {
          const months = grouped.get(year);
          const monthKeys = Array.from(months.keys());
          const yearTotal = monthKeys.reduce(
            (sum, m) => sum + months.get(m).length,
            0,
          );
          const isYearOpen = expandedYears.has(year);

          return (
            <section className="eca-year" key={year}>
              <button
                type="button"
                className="eca-year-header"
                onClick={() => toggleYear(year)}
              >
                <span className="eca-year-label">Year &mdash; {year}</span>
                <span className="eca-year-count">
                  {yearTotal} announcement{yearTotal === 1 ? "" : "s"}
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2}
                  className={`eca-chevron ${isYearOpen ? "is-open" : ""}`}
                />
              </button>

              <div
                className={`eca-accordion-body ${isYearOpen ? "is-open" : ""}`}
              >
                <div className="eca-accordion-inner">
                  {monthKeys.map((month) => {
                    const items = months.get(month);
                    const key = `${year}-${month}`;
                    const isMonthOpen = expandedMonths.has(key);

                    return (
                      <div className="eca-month" key={key}>
                        <button
                          type="button"
                          className="eca-month-header"
                          onClick={() => toggleMonth(key)}
                        >
                          <span className="eca-month-dot" />
                          <span className="eca-month-label">
                            {month} {year}
                          </span>
                          <span className="eca-month-count">
                            {items.length}
                          </span>
                          <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className={`eca-chevron-sm ${isMonthOpen ? "is-open" : ""}`}
                          />
                        </button>

                        <div
                          className={`eca-accordion-body ${isMonthOpen ? "is-open" : ""}`}
                        >
                          <div
                            className="eca-accordion-inner eca-month-cards"
                            ref={(node) => {
                              if (node) monthRefs.current.set(key, node);
                              else monthRefs.current.delete(key);
                            }}
                          >
                            {items.map((item, index) => {
                              const isLatest =
                                item === latestItem && index === 0;
                              const cardKey = `${item.date}-${item.title}-${index}`;

                              return item.link ? (
                                <a
                                  key={cardKey}
                                  className="eca-card eca-card-link"
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {renderCardBody(item, isLatest)}
                                </a>
                              ) : (
                                <article key={cardKey} className="eca-card">
                                  {renderCardBody(item, isLatest)}
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default AnnouncementsFeed;
