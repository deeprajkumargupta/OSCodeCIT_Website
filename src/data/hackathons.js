/**
 * OSCode CIT — Hackathons 2026 season (chronological, oldest first).
 *
 * To add a result: append an object below. `placement.num` is the big rolling
 * number on the page (null shows a star, e.g. for "Finalist"). `github` is
 * optional — when set, a "View Repository" button appears in the details view.
 */
export const hackathons = [
  {
    id: "smart-india-hackathon-2026",
    title: "Smart India Hackathon (SIH)",
    shortTitle: "SIH",
    barLabel: "SIH",
    category: "National Hackathon",
    date: "5 September 2026",
    dateShort: "5 Sep 2026",
    organizer: "Cambridge Institute of Technology",
    venue: "Cambridge Institute of Technology, Bengaluru",
    status: "Finalist",
    placement: { num: null, line1: "SIH", line2: "FINALIST" },
    note: "",
    description:
      "A national-level hackathon hosted at our own campus, where our team of four made it to the finals.",
    members: ["Tejas", "Rakesh", "Deepraj", "Durga"],
    image: "/images/hackathons/sih.jpg",
    imageAlt: "Team OSCODE at Smart India Hackathon holding DECODE SIH 2026 finalist badges in auditorium",
    github: "",
  },
  {
    id: "electrohack-4-0-2026",
    title: "ELECTROHACK 4.0",
    shortTitle: "ELECTROHACK 4.0",
    barLabel: "ELECTROHACK 4.0",
    category: "College Hackathon",
    date: "25 – 26 September 2026",
    dateShort: "25 – 26 Sep 2026",
    organizer: "K S Institute of Technology (KSIT)",
    venue: "K S Institute of Technology (KSIT), Bengaluru",
    status: "2nd Place",
    placement: { num: "02", line1: "SECOND", line2: "PLACE" },
    note: "",
    description:
      "A competitive college-level hackathon where our team built and pitched an innovative solution, securing 2nd place among multiple participating teams.",
    members: ["Gnanesh M V", "Dilip C", "Aishwarya H", "Vinodha G.B"],
    image: "/images/hackathons/electrohack.jpg",
    imageAlt: "Team OSCODE securing 2nd place with trophy at KSIT ELECTROHACK 4.0",
    github: "",
  },
  {
    id: "gardenia-hackathon-2026-4th",
    title: "Gardenia Hackathon",
    shortTitle: "Gardenia",
    barLabel: "Gardenia · 4th",
    category: "University Hackathon",
    date: "5 – 6 October 2026",
    dateShort: "5 – 6 Oct 2026",
    organizer: "Garden City University (GCU)",
    venue: "Garden City University (GCU), Bengaluru",
    status: "4th Place",
    placement: { num: "04", line1: "FOURTH", line2: "PLACE" },
    note: "",
    description:
      "A two-day university hackathon at Garden City University, where our team of three finished in 4th place.",
    members: ["Tejas", "Rakesh", "Sharath"],
    image: null,
    imageAlt: "Gardenia Hackathon team",
    github: "",
  },
  {
    id: "gardenia-hackathon-2026-5th",
    title: "Gardenia Hackathon",
    shortTitle: "Gardenia",
    barLabel: "Gardenia · 5th",
    category: "University Hackathon",
    date: "5 – 6 October 2026",
    dateShort: "5 – 6 Oct 2026",
    organizer: "Garden City University (GCU)",
    venue: "Garden City University (GCU), Bengaluru",
    status: "5th Place · Finalist",
    placement: { num: "05", line1: "FIFTH", line2: "PLACE" },
    note: "Finalist · Top Team",
    description:
      "A second OSCode team at Garden City University finished 5th and was recognised as a finalist and top team.",
    members: ["Roshan Zameer", "Mohammed Yunus", "Mohammed Ali", "Sindhu Shree", "Hema Varshini"],
    image: null,
    imageAlt: "Gardenia Hackathon finalists",
    github: "",
  },
];
