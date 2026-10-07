export type Lesson = {
  slug: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  excerpt: string;
  source: string;
  content: Array<{
    heading: string;
    text: string;
    bullets?: string[];
  }>;
  facts: string[];
  related: string[];
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  source: string;
  category: string;
};

export type StoryItem = {
  id: string;
  title: string;
  category: string;
  body: string;
  author: string;
  status: "Approved" | "Pending" | "Rejected";
  date: string;
};

export type LawResource = {
  id: string;
  title: string;
  explanation: string;
  category: string;
  year: string;
  source: string;
  url: string;
};

export const lessons: Lesson[] = [
  {
    slug: "what-are-gender-stereotypes",
    title: "What Are Gender Stereotypes?",
    category: "Gender Stereotypes",
    difficulty: "Beginner",
    readTime: "5 min read",
    excerpt: "Understand how stereotypes limit people and shape expectations from childhood to adulthood.",
    source: "UN Women",
    content: [
      {
        heading: "Why stereotypes matter",
        text: "Gender stereotypes are broad assumptions about what women, men, and people of other genders are supposed to be like, how they should behave, and which roles they are expected to play. These ideas are often repeated in families, media, schools, and workplaces.",
        bullets: [
          "They can shape what children believe is possible.",
          "They can limit choices in education, work, and everyday life.",
          "They can influence who gets support, respect, and opportunity."
        ]
      },
      {
        heading: "Examples of stereotypes",
        text: "Common examples include the idea that boys should be assertive and girls should be caring, or that men are better suited for leadership and women for caregiving. These ideas can affect behavior, communication, and self-esteem."
      },
      {
        heading: "Think about it",
        text: "A stereotype becomes powerful when people treat it as fact. When we pause and question it, we create space for more fairness and inclusion."
      }
    ],
    facts: [
      "Stereotypes are learned patterns, not fixed truths.",
      "They often influence how people are treated in schools and workplaces.",
      "Questioning stereotypes is a key step toward equality."
    ],
    related: ["how-are-gender-roles-formed", "inclusive-language"]
  },
  {
    slug: "how-are-gender-roles-formed",
    title: "How Are Gender Roles Formed?",
    category: "Gender Roles",
    difficulty: "Intermediate",
    readTime: "6 min read",
    excerpt: "Explore how social expectations, media, and family patterns shape what we see as typical or appropriate.",
    source: "UNESCO",
    content: [
      {
        heading: "From early life",
        text: "People begin learning gender expectations very early. The toys they are given, the chores they are assigned, and the encouragement they receive can shape how they understand themselves and others."
      },
      {
        heading: "Influences around us",
        text: "Schools, media, religion, community norms, and social media all reinforce expectations about who should lead, who should care, and how people should express emotion."
      },
      {
        heading: "What changes when we notice it",
        text: "Recognizing these patterns is the first step toward making fairer choices in relationships, education, and day-to-day life."
      }
    ],
    facts: [
      "Gender roles are social expectations, not biological rules.",
      "Children absorb messages from many sources throughout development.",
      "Changing social norms takes repeated practice and reflection."
    ],
    related: ["what-does-gender-equality-mean", "gender-stereotypes-in-career-choices"]
  },
  {
    slug: "what-does-gender-equality-mean",
    title: "What Does Gender Equality Mean?",
    category: "Gender Equality",
    difficulty: "Beginner",
    readTime: "4 min read",
    excerpt: "Equality means fairness, access, and respect for all people regardless of gender.",
    source: "UN Women",
    content: [
      {
        heading: "More than treating everyone the same",
        text: "Gender equality does not mean every person is identical. Instead, it means people should have equal rights, opportunities, and respect, with their differences recognized and valued."
      },
      {
        heading: "Why it matters",
        text: "When systems are fair, people can participate fully in school, work, civic life, and public decision-making without being limited by stereotypes."
      },
      {
        heading: "What it looks like in practice",
        text: "It includes equal pay for equal work, fair representation, access to education, and support for people to lead and care in ways that fit their lives and choices."
      }
    ],
    facts: [
      "Equality focuses on fairness and opportunity, not sameness.",
      "Inclusive systems often improve both wellbeing and productivity.",
      "Gender equality supports stronger communities."
    ],
    related: ["what-are-gender-stereotypes", "how-stereotypes-affect-education"]
  },
  {
    slug: "how-stereotypes-affect-education",
    title: "How Stereotypes Affect Education",
    category: "Education",
    difficulty: "Intermediate",
    readTime: "7 min read",
    excerpt: "See how beliefs about gender can influence classroom experiences, confidence, and career choices.",
    source: "UNESCO",
    content: [
      {
        heading: "The classroom and beyond",
        text: "When girls are told they are less suited for STEM or boys are discouraged from expressing emotion, students may be steered away from subjects and opportunities that could help them thrive."
      },
      {
        heading: "Confidence and encouragement",
        text: "Students often respond to the expectations that adults and peers hold. Encouragement and equal access can support stronger participation and achievement."
      },
      {
        heading: "Education as a civil right",
        text: "Inclusive learning environments help all students feel seen and supported. They also help break cycles of disadvantage that can continue across generations."
      }
    ],
    facts: [
      "Students are influenced by both explicit encouragement and implicit expectations.",
      "Inclusive education can broaden participation and opportunity.",
      "Belief systems can be challenged through open, respectful learning."
    ],
    related: ["what-does-gender-equality-mean", "gender-stereotypes-in-career-choices"]
  },
  {
    slug: "inclusive-language",
    title: "Inclusive Language",
    category: "Inclusive Communication",
    difficulty: "Beginner",
    readTime: "5 min read",
    excerpt: "Language shapes how we see people and how safe, respected, and included they feel.",
    source: "UN Women",
    content: [
      {
        heading: "Words carry assumptions",
        text: "The words we use can reinforce stereotypes or challenge them. Inclusive language recognizes that people are individuals with different identities, roles, and experiences."
      },
      {
        heading: "Why it matters",
        text: "People are more likely to participate and feel welcomed when they are addressed with respect and clarity. Inclusive language also reduces bias in daily interaction."
      },
      {
        heading: "Small shifts, big impact",
        text: "Choosing more respectful, neutral, and inclusive phrasing is a practical way to build healthier environments in classrooms, workplaces, and communities."
      }
    ],
    facts: [
      "Language can reinforce or challenge bias.",
      "Respectful communication improves participation and trust.",
      "Inclusive practices create safer, more welcoming spaces."
    ],
    related: ["what-are-gender-stereotypes", "how-are-gender-roles-formed"]
  },
  {
    slug: "gender-stereotypes-in-career-choices",
    title: "Gender Stereotypes in Career Choices",
    category: "Workplace",
    difficulty: "Intermediate",
    readTime: "6 min read",
    excerpt: "Career interests are shaped by expectations, opportunity, and bias—not by fixed ability.",
    source: "ILO",
    content: [
      {
        heading: "The role of expectation",
        text: "Students and workers are often nudged toward careers that align with gender norms, even when they have the ability and interest to pursue something else."
      },
      {
        heading: "The cost of bias",
        text: "When people are discouraged from certain fields, talent is lost, innovation slows, and occupational segregation persists."
      },
      {
        heading: "Inclusive pathways",
        text: "Fair access to mentorship, role models, and learning opportunities helps people choose careers based on interest, skill, and aspiration instead of stereotype."
      }
    ],
    facts: [
      "Career pathways can be shaped by social bias and unequal access.",
      "Encouragement broadens opportunity and outcomes.",
      "Career choice should reflect interest, skills, and support."
    ],
    related: ["how-stereotypes-affect-education", "what-does-gender-equality-mean"]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Girls are naturally better at taking care of children.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Stereotype",
    explanation: "Caregiving is a learned and shared responsibility, not a biological trait assigned only to one gender.",
    source: "UN Women",
    category: "Gender Roles"
  },
  {
    question: "Men are more likely to be effective leaders than women.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Stereotype",
    explanation: "Leadership ability is not determined by gender; evidence shows people are seen as effective based on skills, context, and opportunity.",
    source: "World Economic Forum",
    category: "Workplace"
  },
  {
    question: "Boys should be discouraged from showing emotion because they are supposed to be strong.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Stereotype",
    explanation: "Emotional expression is a human experience, not something restricted to a particular gender.",
    source: "WHO",
    category: "Communication"
  },
  {
    question: "Girls and boys should be offered the same learning opportunities in school.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Fact",
    explanation: "Equal access to education and equal encouragement are essential for fair learning opportunities.",
    source: "UNESCO",
    category: "Education"
  },
  {
    question: "A person should choose a career only based on gender expectations.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Stereotype",
    explanation: "Career choices should reflect interests, skills, and support rather than assumptions tied to gender.",
    source: "ILO",
    category: "Workplace"
  }
];

export const stories: StoryItem[] = [
  {
    id: "1",
    title: "I was told ICT was more appropriate for boys.",
    category: "Education",
    body: "I was told that ICT was more appropriate for boys and that I should focus on more 'feminine' subjects. I still pursued my interest, but it was discouraging at first.",
    author: "Anonymous",
    status: "Approved",
    date: "May 14, 2026"
  },
  {
    id: "2",
    title: "My teacher expected boys to lead group work.",
    category: "Education",
    body: "I noticed my teacher always selected boys to present and lead. Girls were asked to take notes or organize materials, even when their ideas were stronger.",
    author: "Anonymous",
    status: "Approved",
    date: "May 2, 2026"
  },
  {
    id: "3",
    title: "I was told to dress more 'professionally' for the workplace.",
    category: "Workplace",
    body: "I was told that my appearance and tone were part of a standard that did not apply equally to male colleagues. It made me feel judged before my work was even considered.",
    author: "Anonymous",
    status: "Pending",
    date: "April 22, 2026"
  }
];

export const lawResources: LawResource[] = [
  {
    id: "1",
    title: "Republic Act No. 9710 - Magna Carta of Women",
    explanation: "A comprehensive law promoting the welfare and empowerment of women in the Philippines, including protections against discrimination and barriers to equality.",
    category: "Women’s Rights",
    year: "2009",
    source: "Official Gazette of the Philippines",
    url: "https://www.officialgazette.gov.ph/2010/08/14/republic-act-no-9710/"
  },
  {
    id: "2",
    title: "Republic Act No. 7877 - Anti-Sexual Harassment Act",
    explanation: "Provides legal protection against sexual harassment in work, education, and training environments.",
    category: "Harassment",
    year: "1995",
    source: "Official Gazette of the Philippines",
    url: "https://www.officialgazette.gov.ph/1995/02/14/republic-act-no-7877/"
  },
  {
    id: "3",
    title: "Republic Act No. 11313 - Safe Spaces Act",
    explanation: "Strengthens protections against gender-based harassment in public and private spaces, including online and community settings.",
    category: "Protection",
    year: "2019",
    source: "Official Gazette of the Philippines",
    url: "https://www.officialgazette.gov.ph/2019/07/17/republic-act-no-11313/"
  },
  {
    id: "4",
    title: "Philippine Labor Code - Equal employment opportunity principles",
    explanation: "Sets the legal framework for fairness and non-discrimination in the workplace and supports equal opportunity protections.",
    category: "Workplace",
    year: "1974",
    source: "Department of Labor and Employment",
    url: "https://legacy.dole.gov.ph/"
  }
];

export const pollResults = [
  { label: "Yes", value: 62 },
  { label: "No", value: 28 },
  { label: "Not sure", value: 10 }
];

export const dashboardStats = [
  { label: "Quizzes completed", value: 248 },
  { label: "Lessons read", value: 176 },
  { label: "Poll responses", value: 432 },
  { label: "Stories published", value: 34 }
];

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/quiz", label: "Quiz" },
  { href: "/polls", label: "Polls" },
  { href: "/stories", label: "Stories" },
  { href: "/laws", label: "Laws" },
  { href: "/about", label: "About" }
];
