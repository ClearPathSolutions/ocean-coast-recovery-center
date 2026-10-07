// The team roster, shared by the About page's team grid and the article byline
// (getByline in lib/blog.ts), which resolves a post's written_by / reviewed_by
// slug to a real person with a bio page here — never an invented one.
//
// Roster and titles follow the QHG staff-bios document, which is authoritative
// on names, titles and bio copy. The three tabs that cover this facility are all
// published here (supersedes the earlier HS-04/BIO-05 "option (b)" ruling, which
// listed 6): California leadership, the Cali SOUTH regional team, and the
// facility's own Ocean Coast Recovery staff, plus the network alumni coordinator.
// Order below is the order the owner listed them in — leadership first, facility
// staff last. Tami DiStefano remains off the roster: she appears in neither the
// bios document nor the approved headshots (BIO-01).
//
// Every member now has sourced bio copy, so every card carries a blurb that
// condenses that person's own bio and a link to their page. Nothing here is
// invented — an unsourced blurb on a healthcare team page is a trust claim we
// cannot stand behind.
//
// ⚠️ V0086 exposure is wider than before: the 8 shared staff below are scoped to
// other California sites too, so their bio copy will repeat across those builds.
// Accepted knowingly, as in BIO-05. Dr. Tambini and BJ Thome are network-wide and
// canonical to their parent-site pages; the rest have no parent page to point at.
export const team = [
  {
    name: "Dr. Pamela Tambini",
    creds: "",
    role: "Medical Oversight",
    href: "/about/pamela-tambini",
    initials: "PT",
    photo: "/images/team/pamela-tambini.jpg",
    blurb:
      "Board-certified in Internal Medicine and Addiction Medicine, Dr. Tambini provides medical oversight across the Quadrant Health Group network.",
  },
  {
    name: "Shawn Young",
    creds: "",
    role: "Executive Director",
    href: "/about/shawn-young",
    initials: "SY",
    photo: "/images/team/shawn-young.jpg",
    blurb:
      "Shawn worked his way up from the kitchen to clinician to executive leadership — and leads Southern California with the grit and heart that journey taught him.",
  },
  {
    name: "Michael McArthur",
    creds: "",
    role: "Nursing Director",
    href: "/about/michael-mcarthur",
    initials: "MM",
    photo: "/images/team/michael-mcarthur.jpg",
    blurb:
      "Michael oversees medical staff and client care across our California facilities, drawing on his own recovery journey to lead with hope and compassion.",
  },
  {
    name: "Riky Hanaumi",
    creds: "",
    role: "Clinical Director",
    href: "/about/riky-hanaumi",
    initials: "RH",
    photo: "/images/team/riky-hanaumi.jpg",
    blurb:
      "A Licensed Clinical Social Worker with 20+ years in behavioral health, Riky oversees clinical programming and mentors the therapists who deliver it.",
  },
  {
    name: "Justin White",
    creds: "",
    role: "Program Director",
    href: "/about/justin-white",
    initials: "JW",
    photo: "/images/team/justin-white.jpg",
    blurb:
      "A Registered Addiction Counselor experienced in both detox and residential care, Justin believes recovery is never one-size-fits-all.",
  },
  {
    name: "Jacob Cameron",
    creds: "",
    role: "Program Director",
    href: "/about/jacob-cameron",
    initials: "JC",
    photo: "/images/team/jacob-cameron.jpg",
    blurb:
      "A Registered Substance Use Disorder Counselor, Jacob works to make sure every client feels a genuine sense of belonging throughout treatment.",
  },
  {
    name: "Jeremiah Ross",
    creds: "",
    role: "Nursing Supervisor",
    href: "/about/jeremiah-ross",
    initials: "JR",
    photo: "/images/team/jeremiah-ross.jpg",
    blurb:
      "With more than 10 years of patient care behind him, Jeremiah keeps daily clinical operations safe, structured and steady for clients and staff alike.",
  },
  {
    name: "Monica Olivares",
    creds: "",
    role: "Clinical Operations Director",
    href: "/about/monica-olivares",
    initials: "MO",
    photo: "/images/team/monica-olivares.jpg",
    blurb:
      "CADC II certified, with 11 years across every level of care and 13 years of personal recovery — Monica believes healing can happen alongside joy and humor.",
  },
  {
    name: "Vahan Oknayan",
    creds: "AMFT",
    role: "Therapist",
    href: "/about/vahan-oknayan",
    initials: "VO",
    photo: "/images/team/vahan-oknayan.jpg",
    blurb:
      "Integrative and client-centered, Vahan looks past the challenges that bring someone in — and believes healing starts with a genuine therapeutic relationship.",
  },
  {
    name: "Halie Nall",
    creds: "",
    role: "Case Manager",
    href: "/about/halie-nall",
    initials: "HN",
    photo: "/images/team/halie-nall.jpg",
    blurb:
      "Halie helps clients reach the resources, tools and support they need to build healthy, fulfilling lives — informed by her own lived experience.",
  },
  {
    name: "BJ Thome",
    creds: "",
    role: "Alumni Coordinator",
    href: "/about/bj-thome",
    initials: "BT",
    photo: "/images/team/bj-thome.jpg",
    blurb:
      "BJ makes sure no one walks the road of recovery alone — building connection during treatment that carries on long after discharge.",
  },
];

export type TeamMember = (typeof team)[number];

/** The URL slug of a member's bio page: "/about/riky-hanaumi" -> "riky-hanaumi". */
export const teamSlug = (m: TeamMember) => m.href.replace(/^\/about\//, "");
