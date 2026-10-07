export const stereotypeCategories = [
  "Education & subjects",
  "Work & leadership",
  "Emotions & identity",
  "Care & family",
  "Sports & interests",
  "Appearance & behavior"
] as const;

export type StereotypeCategory = (typeof stereotypeCategories)[number];

export type StereotypeExample = {
  id: string;
  category: StereotypeCategory;
  statement: string;
  perspective: string;
};

export const stereotypeExamples: StereotypeExample[] = [
  {
    id: "math-girls",
    category: "Education & subjects",
    statement: "Boys are naturally better at math and science.",
    perspective: "Ability grows through teaching, practice, encouragement, and opportunity—not gender."
  },
  {
    id: "reading-boys",
    category: "Education & subjects",
    statement: "Reading and writing are mainly for girls.",
    perspective: "Every learner benefits from literacy, and interests differ from person to person."
  },
  {
    id: "stem-belonging",
    category: "Education & subjects",
    statement: "Girls do not really belong in technology classes.",
    perspective: "Belonging is built by welcoming classrooms and equal access to tools and encouragement."
  },
  {
    id: "boys-no-art",
    category: "Education & subjects",
    statement: "Art and dance are not serious interests for boys.",
    perspective: "Creative skills matter in many fields, and anyone can enjoy making or performing art."
  },
  {
    id: "girls-quiet-class",
    category: "Education & subjects",
    statement: "Girls should be quiet and let boys lead class projects.",
    perspective: "Leadership and collaboration are skills all students should get to practice."
  },
  {
    id: "school-subjects",
    category: "Education & subjects",
    statement: "Some school subjects are naturally meant for one gender.",
    perspective: "Students should be free to explore subjects based on curiosity and goals."
  },
  {
    id: "leadership-men",
    category: "Work & leadership",
    statement: "Men make more convincing leaders than women.",
    perspective: "Good leadership comes from skills, experience, and support—not gender."
  },
  {
    id: "women-emotional-leaders",
    category: "Work & leadership",
    statement: "Women are too emotional to make tough decisions at work.",
    perspective: "People of every gender experience emotions; decisions are best judged by their reasoning and results."
  },
  {
    id: "men-careers",
    category: "Work & leadership",
    statement: "Men should choose high-paying careers and provide for everyone.",
    perspective: "Career and family choices are personal; financial responsibility can be shared."
  },
  {
    id: "women-support-roles",
    category: "Work & leadership",
    statement: "Women are better suited to support roles than technical roles.",
    perspective: "Technical and support work both depend on learned skills, and people belong wherever their abilities fit."
  },
  {
    id: "caregiving-career",
    category: "Work & leadership",
    statement: "A parent who takes caregiving leave is less committed to their career.",
    perspective: "Care responsibilities do not determine a person's talent, ambition, or contribution."
  },
  {
    id: "boss-directness",
    category: "Work & leadership",
    statement: "A direct woman is difficult, while a direct man is decisive.",
    perspective: "The same communication should be assessed by its content and context, not a gendered double standard."
  },
  {
    id: "boys-no-cry",
    category: "Emotions & identity",
    statement: "Boys should never cry or show fear.",
    perspective: "Everyone needs ways to express feelings and ask for support."
  },
  {
    id: "girls-always-kind",
    category: "Emotions & identity",
    statement: "Girls should always be gentle, agreeable, and pleasant.",
    perspective: "People can be kind while also setting boundaries, speaking up, and expressing different emotions."
  },
  {
    id: "men-no-help",
    category: "Emotions & identity",
    statement: "Men should handle problems alone instead of asking for help.",
    perspective: "Seeking support is a healthy human skill, not a weakness or a gender issue."
  },
  {
    id: "anger-gender",
    category: "Emotions & identity",
    statement: "Anger is normal for men but inappropriate for women.",
    perspective: "People of every gender can feel anger; respectful behavior and accountability matter for everyone."
  },
  {
    id: "identity-expression",
    category: "Emotions & identity",
    statement: "There is only one right way to look or act for each gender.",
    perspective: "People express themselves in many ways; appearance does not define someone's identity or worth."
  },
  {
    id: "toughness",
    category: "Emotions & identity",
    statement: "Being strong means hiding every vulnerable feeling.",
    perspective: "Strength can include honesty, resilience, compassion, and reaching out when needed."
  },
  {
    id: "mothers-care",
    category: "Care & family",
    statement: "Mothers are naturally better at caring for children than fathers.",
    perspective: "Caregiving is a skill built through time, attention, and practice by any parent."
  },
  {
    id: "housework-women",
    category: "Care & family",
    statement: "Housework is mainly a woman's responsibility.",
    perspective: "Household tasks can be shared fairly among the people who live there."
  },
  {
    id: "fathers-income",
    category: "Care & family",
    statement: "Fathers should earn money while mothers stay home.",
    perspective: "Families make different arrangements; paid work and caregiving are not limited by gender."
  },
  {
    id: "single-parent",
    category: "Care & family",
    statement: "A child needs one specific kind of parent to thrive.",
    perspective: "Children benefit from stable, caring relationships and support; families take many forms."
  },
  {
    id: "care-work",
    category: "Care & family",
    statement: "Care work is not real work because it is unpaid.",
    perspective: "Care takes time and skill and supports families and communities, whether paid or unpaid."
  },
  {
    id: "family-roles",
    category: "Care & family",
    statement: "Children should learn different chores based on whether they are boys or girls.",
    perspective: "Sharing a range of household tasks helps every child build useful life skills."
  },
  {
    id: "sports-men",
    category: "Sports & interests",
    statement: "Boys are naturally more athletic than girls.",
    perspective: "Athletic development depends on access, practice, coaching, health, and individual interest."
  },
  {
    id: "girls-contact-sports",
    category: "Sports & interests",
    statement: "Contact sports are not appropriate for girls.",
    perspective: "People should be able to choose sports suited to their interests and abilities, with safe coaching."
  },
  {
    id: "boys-dance",
    category: "Sports & interests",
    statement: "Boys who enjoy dance or cooking are unusual.",
    perspective: "Creative and practical interests are for everyone; hobbies do not define a person's gender."
  },
  {
    id: "girls-gaming",
    category: "Sports & interests",
    statement: "Girls are not really interested in gaming or technology.",
    perspective: "Interests vary, and welcoming communities make it easier for everyone to participate."
  },
  {
    id: "hobby-gender",
    category: "Sports & interests",
    statement: "Toys, colors, and hobbies have to be divided into 'for boys' and 'for girls.'",
    perspective: "Children can explore play and hobbies based on what they enjoy."
  },
  {
    id: "competition",
    category: "Sports & interests",
    statement: "Only boys enjoy competition and challenges.",
    perspective: "People of every gender can enjoy teamwork, competition, or more relaxed activities."
  },
  {
    id: "appearance-women",
    category: "Appearance & behavior",
    statement: "A woman's appearance matters more than her ideas.",
    perspective: "People deserve to be heard and evaluated for their contributions, not reduced to appearance."
  },
  {
    id: "men-style",
    category: "Appearance & behavior",
    statement: "Men should not care about clothing, grooming, or style.",
    perspective: "Personal style is an individual choice and does not have to follow gender rules."
  },
  {
    id: "assertive-labels",
    category: "Appearance & behavior",
    statement: "A confident woman is bossy, but a confident man is strong.",
    perspective: "Confidence should be described consistently; the behavior and context matter more than gender."
  },
  {
    id: "short-hair",
    category: "Appearance & behavior",
    statement: "Hair length or clothing tells you someone's abilities or identity.",
    perspective: "Appearance cannot reliably tell us a person's skills, interests, or identity."
  },
  {
    id: "politeness",
    category: "Appearance & behavior",
    statement: "Women must always smile and be polite to make others comfortable.",
    perspective: "Everyone deserves respect and safety without being required to perform a particular manner."
  },
  {
    id: "masculinity",
    category: "Appearance & behavior",
    statement: "There is one correct way to be masculine or feminine.",
    perspective: "There are many valid ways to express yourself; no one has to fit a narrow template."
  }
];
