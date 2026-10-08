export interface Person {
  name: string;
  role: string;
  image: string;
  backgroundImage?: string;
  description: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  image: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export interface Department {
  name: string;
  shortName: string;
  description: string;
  lead: Person;
  members: TeamMember[];
  accent: "blue" | "cyan" | "purple" | "green";
}

/* =========================================================
   ORGANIZER
========================================================= */

export const organizer: Person = {
  name: "Bharat Kumar S",
  role: "Club Coordinator",
  image: "/images/team/organizer.jpeg",
  backgroundImage: "/images/team/backgrounds/organizer-bg.jpg",

  description:
    "The driving force behind OSCODE CIT, helping build a community where students learn, create, collaborate, and contribute to technology and open source.",

  skills: [
    "Leadership",
    "Open Source",
    "Community",
    "Technology",
  ],

  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
};

/* =========================================================
   CLUB LEAD + CLUB CO-LEAD
========================================================= */

export const leadership: Person[] = [
  {
    name: "Riddhima Utreja",
    role: "Club Lead",
    image: "/images/team/club-lead.jpeg",
    backgroundImage:
      "/images/team/backgrounds/club-lead-bg.jpg",

    description:
      "Leading the OSCODE CIT community, coordinating initiatives, supporting members, and creating opportunities for students to explore technology and open source.",

    skills: [
      "Leadership",
      "Development",
      "Open Source",
      "Community",
    ],

    github: "https://github.com/riddzzz849",
    linkedin: "https://www.linkedin.com/in/riddhima-utreja-898260334",
    instagram:"https://www.instagram.com/riddhima._.29",
  },

  {
    name: "C Bindu Rekha",
    role: "Club Co-Lead",
    image: "/images/team/club-co-lead.jpg",
    backgroundImage:
      "/images/team/backgrounds/club-co-lead-bg.jpg",

    description:
      "Supporting the club's vision through collaboration, event coordination, technical activities, and helping members grow their skills.",

    skills: [
      "Leadership",
      "Management",
      "Technology",
      "Community",
    ],

    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/in/bindhu-rekha-597b16376",
    instagram:"https://www.instagram.com/bindhu.uuu",
  },
];

/* =========================================================
   DEPARTMENTS
========================================================= */

export const departments: Department[] = [
  /* =======================================================
     TECHNICAL TEAM
  ======================================================= */

  {
    name: "TECHNICAL TEAM",
    shortName: "Tech",

    accent: "blue",

    description:
      "Builds, develops, experiments, and turns ideas into real technical projects.",

    /* -----------------------------
       TECHNICAL LEAD
    ----------------------------- */

    lead: {
      name: "Durga Prajapati",
      role: "Technical Lead",
      image: "/images/team/technical-lead.jpg",
      backgroundImage:
        "/images/team/backgrounds/technical-bg.jpg",

      description:
        "Leads the technical team in building projects, exploring new technologies, and helping members improve their development skills.",

      skills: [
        "Web Development",
        "Programming",
        "Open Source",
        "Projects",
      ],

      github: "https://github.com/durgaprajapati083",
      linkedin: "https://www.linkedin.com/in/durga-prajapati-0692b1247",
      instagram:"https://www.instagram.com/durgaprajapati067",
    },

    /* -----------------------------
       TECHNICAL TEAM MEMBERS
    ----------------------------- */

    members: [
       {
        name: "Abhesh Mandal",
        role: "Developer",
        image:
          "/images/team/members/technical-4.jpg",
           github: "https://github.com/tdeflash12",
  linkedin: "https://www.linkedin.com/in/abhesh-mandal-7a576a2b1",
  instagram:"https://www.instagram.com/abheshmandal12/",
      },
      {
        name: "Rakesh Kumar Shah",
        role: "Developer",
        image:
          "/images/team/members/technical-1.jpeg",
        github: "https://github.com/Rakesh20050",
  linkedin: "https://www.linkedin.com/in/rakesh-kumar-shah",
  instagram:"https://www.instagram.com/rakeshshah3358"
      },

      {
        name: "Deepraj Kumar Gupta",
        role: "Developer",
        image:
          "/images/team/members/technical-2.jpg",
        github: "https://github.com/deeprajkumargupta",     
       linkedin: "https://www.linkedin.com/in/deeprajkumargupta/",
       instagram:"https://www.instagram.com/deepraj_.05/",
      },

      {
        name: "Tejas S",
        role: "Developer",
        image:
          "/images/team/members/technical-3.jpeg",
              github: "https://github.com/Tejas-Coder-07",
  linkedin: "https://www.linkedin.com/in/tejas-s-5237ba32b",
  instagram:"https://www.instagram.com/tejas_verse_27",
      },
     
      {
        name: "Deeksha SK",
        role: "Developer",
        image:
          "/images/team/members/technical-5.jpeg",
              github: "https://github.com/deekshask30-dot",
  linkedin: "https://www.linkedin.com/in/deeksha-sk-029a7138a",
  instagram:"https://www.instagram.com/deeksha.sk_",
      },
      {
        name: "Sharath",
        role: "Developer",
        image:
          "/images/team/members/technical-6.jpeg",
             github: "https://github.com/sharathswaroop-dev",
          linkedin: "http://www.linkedin.com/in/sharath-swaroop-m-179a9a379",
          instagram:"https://www.instagram.com/sharathswaroop_m?stkn=dmpmcWIxNm95ejZn"
      },
    ],
  },

   /* =======================================================
     R&D TEAM
  ======================================================= */

  {
    name: "R&D TEAM",
    shortName: "R&D",

    accent: "green",

    description:
      "Explores emerging technologies, researches ideas, and experiments with innovative solutions.",

    /* -----------------------------
       R&D LEAD
    ----------------------------- */

    lead: {
      name: "S Nishaanth",
      role: "R&D Lead",
      image: "/images/team/rnd-lead.jpeg",
      backgroundImage:
        "/images/team/backgrounds/rnd-bg.jpg",

      description:
        "Leads research and experimentation within OSCODE CIT, exploring emerging technologies and turning interesting ideas into practical solutions.",

      skills: [
        "Research",
        "AI & ML",
        "Innovation",
        "Experimentation",
      ],

      github: "https://github.com/ZENON-28",
      linkedin: "https://www.linkedin.com/in/s-nishaanth",
      instagram:"https://www.instagram.com/zen0n_28"
    },

    /* -----------------------------
       R&D TEAM MEMBERS
       
       Punith S is included here as
       another R&D team member.
    ----------------------------- */

    members: [
      
      {
        name: "Gnanesh M V",
        role: "R&D Member",
        image:
          "/images/team/members/rd-1.jpg",
         github: "https://github.com/Gnani66",
      linkedin: "https://in.linkedin.com/in/gnanesh-mv",
      instagram:"https://www.instagram.com/gnanesh_.66"
      },

      {
        name: "Roshan Zameer Y A",
        role: "R&D  Member",
        image:
          "/images/team/members/rd-2.jpg",
         github: "https://github.com/rzoshan46-del",
      linkedin: "https://www.linkedin.com/in/roshan-zameer-652757381",
      instagram:"https://www.instagram.com/_.roshannnnn"
      },
      {
        name: "Snigdha GL",
        role: "R&D  Member",
        image:
          "/images/team/members/rd-3.jpg",
         github: "https://github.com/aoiyuki0",
      linkedin: "https://www.linkedin.com/in/snigdha-lohith-5b2547384/",
      instagram:"https://www.instagram.com/__snigdha_0/"
      },
      {
        name: "Soibam Erica Chanu",
        role: "R&D  Member",
        image:
          "/images/team/members/rd-4.jpg",
         github: "https://github.com/ericasoibam",
      linkedin: "https://www.linkedin.com/in/erica-soibam-6b0595382",
      instagram:"https://www.instagram.com/lun_essence__"
      },
    ],
  },
   
  /* =======================================================
     EVENT TEAM
  ======================================================= */

  {
    name: "EVENT TEAM",
    shortName: "Events",

    accent: "purple",

    description:
      "Plans and executes workshops, hackathons, meetups, technical sessions, and community activities.",

    /* -----------------------------
       EVENT LEAD
    ----------------------------- */

    lead: {
      name: "Aishwarya Gadela",
      role: "Event Lead",
      image:
        "/images/team/event-lead.jpg",
      backgroundImage:
        "/images/team/backgrounds/event-bg.jpg",

      description:
        "Coordinates events and activities that bring students together to learn, collaborate, compete, and build.",

      skills: [
        "Event Management",
        "Coordination",
        "Communication",
        "Planning",
      ],

      github: "https://github.com/AishwaryaGadela",
      linkedin: "https://www.linkedin.com/in/aishwarya-gadela-4772b2261",
      instagram:"https://www.instagram.com/aishwarya_gadela",
    },

    /* -----------------------------
       EVENT TEAM MEMBERS
    ----------------------------- */

    members: [
      {
        name: "Likisha Varshini",
        role: "Event team member",
        image:
          "/images/team/members/event-1.jpeg",
          github:"https://github.com/likishavarshini",
      linkedin:"https://www.linkedin.com/in/likisha-varshini-25664738b/",
      instagram:"https://www.instagram.com/likisha._.varshini_",
      },

      {
        name: "Jeevanya D",
        role: "Event team member",
        image:
          "/images/team/members/event-2.JPG",
          github:"https://github.com/Jeevanya19",
      linkedin:"https://www.linkedin.com/in/jeevanya-devaraj-648348381",
      instagram:"https://www.instagram.com/jeevanyaaa?stkn=YmxtOWhjMnZ0NDBs",
      },

      {
        name: "Smruthi Shreehari",
        role: "Event team member",
        image:
          "/images/team/members/event-3.jpeg",
          github:"https://github.com/smruthishreehari07",
      linkedin:"www.linkedin.com/in/smruthishreehari",
      instagram:"https://www.instagram.com/s.m.ruthi?stkn=emkyZW4wc2R2YXN2",
      },
    ],
  },
  /* =======================================================
     SOCIAL MEDIA TEAM
  ======================================================= */

  {
    name: "SOCIAL MEDIA  AND DESIGN TEAM",
    shortName: "Social",

    accent: "cyan",

    description:
      "Connects OSCODE CIT with the community through creative digital communication and media.",

    /* -----------------------------
       SOCIAL MEDIA LEAD
    ----------------------------- */

    lead: {
      name: "K Lipika Shree",
      role: "Social Media Lead",
      image:
        "/images/team/social-media-lead.jpeg",
      backgroundImage:
        "/images/team/backgrounds/social-media-bg.jpg",

      description:
        "Leads the social media team in creating engaging content, managing digital communication, and showcasing OSCODE CIT activities.",

      skills: [
        "Content Creation",
        "Social Media",
        "Design",
        "Communication",
      ],

      github: "https://github.com/lipikashree28-hue",
      linkedin: "https://www.linkedin.com/in/lipika-shree-98009b386",
      instagram:"https://www.instagram.com/lipika_shree28",
    },

    /* -----------------------------
       SOCIAL MEDIA MEMBERS
    ----------------------------- */

    members: [
      {
        name: "Saurab Yadav",
        role: "Media Member",
        image:
          "/images/team/members/social-1.jpg",
            github: "https://github.com/",
      linkedin: "https://www.linkedin.com/",
      instagram:"https://www.instagram.com/saurab14311/"
      },

      {
        name: "Siddarth MD",
        role: "Media Member",
        image:
          "/images/team/members/social-2.jpg",
            github: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/siddarth-m-d-067560382",
      instagram:"https://www.instagram.com/insomaniacx_md_007"
      },

      {
        name: "Anubhab Ray",
        role: "Media Member",
        image:
          "/images/team/members/social-3.jpg",
            github: "https://github.com/",
      linkedin: "https://www.linkedin.com/in/anubhab-ray-058126318/",
      instagram:"https://www.instagram.com/_anubhabray"
      },
      {
        name: "Anshika Singh",
        role: "Design team Member",
        image:
          "/images/team/members/design-1.jpeg",
            github: "https://github.com/anshika27official",
      linkedin: "https://www.linkedin.com/in/anshika-singh-14b74638b",
      instagram:"https://www.instagram.com/bookmaniax",
      },
      {
        name: "Shilpa T",
        role: "Design team Member",
        image:
          "/images/team/members/design-2.jpg",
            github: "https://github.com/ShilpaT06",
      linkedin: "https://www.linkedin.com/in/shilpa-t-97b4a2333",
      instagram:"https://www.instagram.com/shilpa_thimmaraju?igsh=MTZiM3czdWl2Z3d0cQ==",
      },
      {
        name: "Aadya ravikumar",
        role: "Design team Member",
        image:
          "/images/team/members/design-3.png",
            github: "https://github.com/aadyaravi1309-wq",
      linkedin: "https://www.linkedin.com/in/aadya-ravikumar-44aa56388",
      instagram:"https://www.instagram.com/aady_2080",
      },
    ],
  },
];
const teamData = {
  organizer,
  leadership,
  departments,
};

export default teamData;

