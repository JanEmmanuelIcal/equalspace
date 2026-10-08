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
    readTime: "8 min read",
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
        heading: "How a generalization becomes a barrier",
        text: "A stereotype is a belief about a group. Prejudice is a judgement based on that belief, while discrimination is an action or system that treats people unfairly. These ideas can reinforce one another: an assumption may shape who is encouraged, and unequal outcomes may then be wrongly used to justify the original assumption.",
        bullets: [
          "Notice whether a claim describes an individual or assumes everyone in a group is alike.",
          "Ask who benefits when a narrow expectation is treated as normal.",
          "Look for missing context, such as unequal access or different treatment."
        ]
      },
      {
        heading: "Question the message, not the person",
        text: "People may repeat familiar expectations without intending harm. A useful response can focus on the idea and its effect: ask what evidence supports it, offer a counterexample, and make room for people to choose differently. Change is more likely when curiosity and accountability are paired with respect."
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
    readTime: "9 min read",
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
        heading: "A pattern learned through repetition",
        text: "Roles are reinforced by repeated signals: which people appear in leadership, how chores are divided, which behavior earns praise, and what stories are shown in media. No single message determines a person's identity, but many small messages can make one path seem expected and another seem unavailable."
      },
      {
        heading: "Change the everyday environment",
        text: "Families, schools, teams, and workplaces can make expectations more flexible. Rotate responsibilities, offer everyone the same chance to try unfamiliar tasks, and praise effort and care without assigning them to a gender. Ask people what they prefer instead of guessing.",
        bullets: [
          "Share visible examples of people taking varied roles.",
          "Review routines that may distribute opportunity unevenly.",
          "Invite feedback and adjust when a practice excludes someone."
        ]
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
    readTime: "8 min read",
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
      },
      {
        heading: "Equality and equity",
        text: "Equal rights and fair access are the goal; getting there may require noticing different barriers. Equity describes taking those barriers into account so that opportunity is meaningful rather than only formal. The right response depends on context and should be guided by evidence, participation, and respect for rights."
      },
      {
        heading: "Measure whether opportunity is real",
        text: "Good intentions matter, but outcomes and experiences matter too. Organizations can review who applies, participates, advances, feels safe, and receives resources. Disaggregated information can reveal patterns, but it must be collected responsibly, protected, and interpreted with care rather than used to label individuals.",
        bullets: [
          "Check both written policies and everyday practice.",
          "Listen to people affected by a decision.",
          "Use results to improve access and remove avoidable barriers."
        ]
      },
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
    readTime: "10 min read",
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
      },
      {
        heading: "Small classroom choices have impact",
        text: "Participation is influenced by who gets called on, whose work is displayed, how examples are framed, and whether mistakes are treated as part of learning. A single moment may seem minor, yet repeated differences in feedback can affect belonging and confidence over time."
      },
      {
        heading: "Build a fairer learning environment",
        text: "Teachers and learners can make classroom routines more inclusive by sharing leadership, using varied examples, setting clear participation norms, and challenging disrespectful remarks without shaming students. Review who has access to equipment, advanced courses, mentoring, and extracurricular activities.",
        bullets: [
          "Use criteria that are clear and consistent for everyone.",
          "Offer multiple ways to participate and demonstrate learning.",
          "Respond to biased comments with calm correction and context."
        ]
      },
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
    readTime: "8 min read",
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
      },
      {
        heading: "Be specific and avoid assumptions",
        text: "When a person's gender is not relevant, role-based or neutral wording can keep attention on the subject. When it is relevant, use the terms people use for themselves. Avoid guessing pronouns, family roles, abilities, or interests from appearance or identity."
      },
      {
        heading: "Repair a mistake with care",
        text: "Everyone can make a language mistake. A brief apology, a correction, and a sincere effort to use the right words next time are usually more helpful than a long defense. If you are unsure, ask privately and respectfully when appropriate, and accept that someone may not wish to explain.",
        bullets: [
          "Prefer clear, person-respecting language over labels that reduce someone to one trait.",
          "Use the names and pronouns people ask you to use.",
          "Adapt language to context, community preference, and accessibility needs."
        ]
      },
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
    readTime: "9 min read",
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
      },
      {
        heading: "Where career bias can enter",
        text: "Bias can appear before hiring—in advice about subjects and training—as well as in recruitment, task assignments, evaluation, pay, promotion, and retention. Informal networks and assumptions about who is available for demanding work can also shape whose contributions are noticed."
      },
      {
        heading: "Make career pathways more open",
        text: "Schools and employers can publish transparent criteria, structure interviews around job-relevant skills, make mentoring broadly available, and review pay and advancement patterns. Individuals can seek varied role models and ask for fair access, while remembering that responsibility for systemic change does not belong only to those facing bias.",
        bullets: [
          "Offer the same training, stretch assignments, and sponsorship opportunities.",
          "Evaluate evidence of performance rather than assumptions about fit.",
          "Make flexible work and caregiving support available without stigma."
        ]
      },
    ],
    facts: [
      "Career pathways can be shaped by social bias and unequal access.",
      "Encouragement broadens opportunity and outcomes.",
      "Career choice should reflect interest, skills, and support."
    ],
    related: ["how-stereotypes-affect-education", "what-does-gender-equality-mean"]
  }
];

export type LessonQuizQuestion = QuizQuestion & {
  lessonSlug: string;
  stage: number;
  stageTitle: string;
  number: number;
};

const lessonQuizStages = ["Build the foundations", "Spot the pattern", "Understand the impact", "Choose a response", "Put learning into practice"];

const lessonQuizSeed: Record<string, Array<[question: string, answer: string, distractorOne: string, distractorTwo: string, explanation: string]>> = {
  "what-are-gender-stereotypes": [
    ["What is a gender stereotype?", "A broad assumption about how people of a gender should be", "A reliable description of every individual", "A rule that applies in every culture", "A stereotype generalizes about a group and cannot tell us what any individual is like."],
    ["Where can people learn gender expectations?", "From many sources, including family, school, media, and peers", "Only from formal lessons at school", "Only from biological traits", "Expectations are reinforced across everyday settings and social messages."],
    ["Which statement is an example of a stereotype?", "Caregiving is naturally women's work", "People can learn caregiving skills", "Families can share care in different ways", "The first statement assigns a role based on gender rather than individual choice or ability."],
    ["What is the difference between a stereotype and discrimination?", "A stereotype is a belief; discrimination is unfair treatment or action", "They mean exactly the same thing", "Discrimination is always intentional", "A belief can inform unfair actions, but the concepts are distinct and harm can occur without conscious intent."],
    ["Why can repeated small messages matter?", "They can make unequal expectations seem normal over time", "They prove the messages are accurate", "They affect only adults", "Repeated messages can shape belonging, confidence, and perceived choices."],
    ["A teacher assumes a student will dislike science based on gender. What is the key issue?", "The teacher is predicting an individual's interest from a group assumption", "The teacher is offering a neutral choice", "The student has already made a decision", "Interest should be learned from the person, not guessed from gender."],
    ["Which question helps examine a stereotype?", "What evidence supports this, and whose experiences are missing?", "Which group should follow this rule?", "How can we make everyone conform?", "Evidence and missing context help reveal overgeneralization and unequal treatment."],
    ["How can someone challenge a harmful assumption respectfully?", "Question the idea, explain its impact, and invite another perspective", "Insult the person who said it", "Ignore the impact because harm was not intended", "Respectful accountability focuses on the belief and its effects without dismissing intent or impact."],
    ["What is a useful way to assess a person's ability?", "Consider their individual skills, interests, and evidence", "Use expectations about their gender", "Assume everyone in a group has equal preferences", "Individual evidence is fairer and more informative than group generalizations."],
    ["Which action best helps reduce stereotyping in a team?", "Share opportunities fairly and review who gets encouraged", "Assign roles by gender to save time", "Avoid discussing unequal experiences", "Fair access and reflection on routine decisions help prevent assumptions from shaping opportunity."]
  ],
  "how-are-gender-roles-formed": [
    ["What are gender roles?", "Social expectations about behaviors or responsibilities linked to gender", "Fixed rules determined identically by biology", "Personal interests that never change", "Roles are expectations shaped by social context, not universal rules for individuals."],
    ["How early can people encounter gender expectations?", "From early childhood through everyday interactions", "Only after starting a job", "Only after choosing a school subject", "Messages can start early through toys, praise, chores, and examples."],
    ["Which is a social influence on gender roles?", "Media stories and community norms", "A person's eye color", "A single universal law of personality", "Media and community norms can repeat ideas about who should lead, care, or express emotion."],
    ["Why do repeated messages affect what feels 'normal'?", "Familiar patterns can appear natural even when they are socially learned", "Repetition makes every belief scientifically true", "People cannot question familiar messages", "Repetition builds familiarity, but familiar expectations can still be examined and changed."],
    ["A family gives chores based on each child's ability and rotates tasks. What does this encourage?", "Flexible roles and shared responsibility", "A fixed gender division of labor", "Avoidance of all family expectations", "Rotating tasks lets everyone practice a range of responsibilities."],
    ["What is a helpful way to respond to unequal classroom participation?", "Review routines and ensure everyone has a fair chance to contribute", "Assume the current pattern reflects ability", "Stop inviting quieter students to participate", "Looking at routine opportunities can reveal barriers without presuming ability."],
    ["Why are role models useful?", "They make a wider range of choices visible and imaginable", "They prove one person should represent a whole group", "They remove the need for fair policies", "Examples can broaden what people see as possible, alongside equitable structures."],
    ["Which approach can change a restrictive norm?", "Repeated fair practices, reflection, and openness to feedback", "One rule requiring everyone to be identical", "Keeping routines unquestioned", "Norms shift when people consistently practice fairer alternatives and learn from results."],
    ["A student is praised only for being quiet and helpful while peers lead projects. What should an educator examine?", "Whether praise and leadership chances are distributed equitably", "Whether the student should never lead", "Whether leadership is unrelated to classroom routines", "Feedback and assignment patterns may reinforce narrow role expectations."],
    ["What is the best starting point for questioning a gender role?", "Ask who set the expectation, whom it helps, and whether people can choose differently", "Assume every tradition is harmful", "Assume every tradition is fair", "Curiosity about context and choice helps distinguish meaningful practice from limiting assumptions."]
  ],
  "what-does-gender-equality-mean": [
    ["What does gender equality aim to ensure?", "Equal rights, opportunities, and respect regardless of gender", "That everyone has identical interests", "That differences should be ignored", "Equality concerns fair rights and opportunity, not sameness."],
    ["Does equality require every person to be identical?", "No; differences can be recognized while rights and access remain fair", "Yes, everyone must make the same choices", "Yes, personal needs should never be considered", "People differ; fairness means those differences do not justify unequal rights or respect."],
    ["What does equity add to a discussion of fairness?", "Attention to barriers that may require different support to make access meaningful", "A rule that outcomes must always be identical", "A reason to ignore written rights", "Equity considers the context and barriers that can make formally equal access unequal in practice."],
    ["Which example supports equal opportunity?", "Using transparent, job-related promotion criteria", "Offering training only to people who match a stereotype", "Keeping advancement rules secret", "Transparent criteria help people understand and access opportunities fairly."],
    ["Why measure experiences as well as written policies?", "A policy may exist while everyday practice still creates barriers", "Written policies always guarantee fair outcomes", "Experiences are unrelated to access", "Reviewing both helps determine whether an equality commitment is working in practice."],
    ["What is a responsible use of participation data?", "Protect privacy and use patterns to improve access", "Use group averages to judge each person's ability", "Publish identifiable personal details", "Data can reveal systemic patterns, but must be handled ethically and not used to label individuals."],
    ["Which statement is most accurate about equal treatment?", "The same rule may not remove every barrier; context matters", "The same action always creates fair access", "Fairness means ignoring different circumstances", "Equal rules are important, but their effects and surrounding barriers also need review."],
    ["What should organizations do when they find an access gap?", "Investigate causes with affected people and improve the process", "Blame the group with lower participation", "Hide the results", "Evidence and participation can guide targeted, respectful improvements."],
    ["Which is an example of gender equality in daily life?", "People can share leadership and care responsibilities by choice", "Only one gender is expected to provide care", "Leadership opportunities are assigned by gender", "Flexible shared roles respect individual choice and broaden opportunity."],
    ["How can progress toward equality be evaluated?", "Review rights, access, participation, safety, and outcomes over time", "Count only how many policies were written", "Rely on assumptions about what people need", "Multiple measures help reveal whether formal commitments translate into fair experiences."]
  ],
  "how-stereotypes-affect-education": [
    ["How can a gender stereotype affect a student?", "It may shape encouragement, belonging, and access to subjects", "It always determines a student's ability", "It affects only students who notice it", "Expectations can influence opportunity and confidence without determining anyone's potential."],
    ["Which classroom practice could reinforce a stereotype?", "Regularly choosing boys to lead and girls to take notes", "Rotating leadership and note-taking roles", "Offering every student the same equipment", "Repeatedly assigning roles along gender lines can make opportunities unequal."],
    ["What is one source of unequal classroom experience?", "Differences in feedback, participation, and access to resources", "Only differences in students' birthdays", "A universal difference in learning ability", "Classroom routines and feedback may shape whose contributions are supported."],
    ["Why are clear assessment criteria helpful?", "They make expectations more consistent and transparent", "They guarantee every student receives the same grade", "They remove the need to teach", "Clear criteria make evaluation easier to understand and review for fairness."],
    ["A student is discouraged from STEM without evidence about their work. What should happen?", "Offer encouragement and assess their individual interests and learning", "Steer them away to match expectations", "Assume another student should decide for them", "Students should receive support based on their own interests and evidence, not stereotypes."],
    ["How can teachers broaden participation?", "Use varied ways to contribute and share turns fairly", "Call only on the quickest speakers", "Keep leadership roles fixed", "Multiple participation methods allow more students to show what they know."],
    ["What is a constructive response to a biased classroom comment?", "Address its impact calmly and explain a more inclusive perspective", "Humiliate the student who spoke", "Pretend the comment cannot affect anyone", "Calm correction supports accountability and learning while maintaining dignity."],
    ["Why review access to extracurriculars and advanced courses?", "Unequal access can affect later learning and career pathways", "These opportunities never affect learning", "Only grades matter", "Opportunities beyond the core curriculum can shape skills, confidence, and future options."],
    ["Which approach best supports a learner who is uncertain about a subject?", "Ask about their interests and offer support without assumptions", "Predict their interests from gender", "Remove the subject from their choices", "Listening to the learner helps provide relevant guidance and preserve choice."],
    ["What is a strong school-wide improvement?", "Review participation and outcomes, then remove identified barriers", "Assume fairness because rules are written", "Ask students to solve systemic problems alone", "Ongoing review and institutional action can address barriers more effectively than assumptions."]
  ],
  "inclusive-language": [
    ["What is a goal of inclusive language?", "Communicate clearly while recognizing and respecting people's identities", "Avoid talking to anyone whose identity is unknown", "Use one label for every person", "Inclusive communication respects individuals and avoids unnecessary assumptions."],
    ["When is gender-neutral wording often useful?", "When a person's gender is not relevant to the message", "Whenever a person has shared a preferred term", "When it makes instructions less clear", "Neutral wording can keep attention on the relevant role or action without guessing gender."],
    ["What should guide the words used for a person's identity?", "The terms the person uses for themself", "Assumptions based on appearance", "A guess made by someone else", "Respecting self-identification avoids imposing labels on another person."],
    ["What is a considerate response after using the wrong pronoun?", "Briefly apologize, correct yourself, and use the right pronoun next time", "Argue that intent matters more than impact", "Ask the person to reassure you", "A short repair and a genuine change in future behavior keep attention on respect."],
    ["Why avoid guessing family roles from gender?", "People and families have varied roles that cannot be inferred from gender", "Everyone has the same family structure", "Family roles are always obvious", "Asking or using neutral terms avoids assumptions about relationships and responsibilities."],
    ["How should you ask about someone's preferred language?", "Ask respectfully when relevant, and accept if they do not want to explain", "Demand an explanation in public", "Assume based on their appearance", "A respectful question gives control to the person and honors their boundaries."],
    ["Which wording is more inclusive when the audience's gender is unknown?", "Hello, everyone", "Hello, ladies and gentlemen", "Hello, men and women only", "A neutral greeting includes people without forcing a gender category."],
    ["What should you do if an inclusive term differs across communities?", "Follow the relevant person's or community's preference and context", "Insist one term fits everyone", "Avoid listening to feedback", "Language varies; context and the preferences of affected people matter."],
    ["Why is accessibility part of respectful communication?", "People need different formats and language to participate fully", "One format works equally for everyone", "Accessibility is separate from inclusion", "Clear, accessible communication helps more people understand and take part."],
    ["Which habit builds trust in communication?", "Listen, use people's chosen terms, and adjust when corrected", "Defend every wording choice", "Expect others to educate you at all times", "Listening and adapting show respect without shifting all responsibility onto others."]
  ],
  "gender-stereotypes-in-career-choices": [
    ["What should guide a person's career choice?", "Their interests, skills, goals, and available support", "Gender expectations alone", "Assumptions about which jobs suit a group", "Career choices should reflect the individual rather than narrow social expectations."],
    ["How can stereotypes shape a career pathway early?", "Advice may steer learners toward or away from subjects and training", "They always improve access to every field", "They affect only people after retirement", "Messages about who belongs can influence subject choices and skill-building opportunities."],
    ["What is occupational segregation?", "The concentration of groups in different types or levels of work", "A fair interview process", "A training program open to everyone", "Segregation describes patterned separation across occupations or positions, which may reflect barriers."],
    ["Which hiring practice is more equitable?", "Use structured, job-relevant criteria consistently", "Choose candidates based on assumptions about family plans", "Change requirements between candidates", "Consistent criteria focused on job skills reduce room for irrelevant assumptions."],
    ["Why are mentors and role models useful?", "They can make pathways and support networks more visible", "They prove a person must follow one career", "They replace fair hiring", "Mentors broaden access to information and encouragement, but do not replace structural fairness."],
    ["A manager gives stretch assignments only to people they informally relate to. What risk does this create?", "Unequal access to experience needed for advancement", "More transparent promotion decisions", "A guarantee of equal development", "Informal allocation can prevent others from building evidence and skills for promotion."],
    ["Which compensation review can help identify pay inequity?", "Compare pay for comparable work using relevant factors and protect privacy", "Compare unrelated jobs without context", "Publish individual salaries without consent", "Careful comparison can identify patterns while respecting context and confidentiality."],
    ["How can workplaces support caregivers without reinforcing stereotypes?", "Make flexible work and care support available to everyone", "Offer support only to women", "Assume men do not have care responsibilities", "Universal access supports workers without assigning caregiving to one gender."],
    ["What is a useful response when someone questions a candidate's 'fit' based on stereotype?", "Return to role-related evidence and consistent evaluation criteria", "Accept the concern without asking for evidence", "Exclude the candidate automatically", "Job-relevant evidence keeps selection fairer than vague assumptions about fit."],
    ["Which organizational action can help broaden career opportunity?", "Audit training, assignments, hiring, pay, and promotion for barriers", "Rely only on good intentions", "Ask underrepresented workers to fix the process alone", "Reviewing the full pathway can reveal where systemic changes are needed."]
  ]
};

export const lessonQuizQuestions: Record<string, LessonQuizQuestion[]> = Object.fromEntries(
  Object.entries(lessonQuizSeed).map(([lessonSlug, questions]) => [
    lessonSlug,
    questions.map(([question, answer, distractorOne, distractorTwo, explanation], index) => {
      const options = [answer, distractorOne, distractorTwo];
      const correctIndex = index % options.length;
      const orderedOptions = [...options.slice(correctIndex), ...options.slice(0, correctIndex)];
      const lesson = lessons.find((item) => item.slug === lessonSlug);
      return {
        lessonSlug,
        stage: Math.floor(index / 2) + 1,
        stageTitle: lessonQuizStages[Math.floor(index / 2)],
        number: index + 1,
        question,
        options: orderedOptions,
        answer,
        explanation,
        source: lesson?.source || "EqualSpace lesson",
        category: lesson?.category || "Learning"
      };
    })
  ])
);

export const lessonQuizStagesCount = lessonQuizStages.length;

if (process.env.NODE_ENV !== "production") {
  for (const lesson of lessons) {
    if (lessonQuizQuestions[lesson.slug]?.length !== 10) {
      throw new Error(`Lesson ${lesson.slug} must have exactly 10 quiz questions.`);
    }
  }
}

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
  },
  {
    question: "Household chores and caregiving can be shared by people of every gender.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Fact",
    explanation: "Care work is valuable work, and sharing it fairly supports equal participation at home and beyond.",
    source: "International Labour Organization",
    category: "Gender Roles"
  },
  {
    question: "A hiring decision should be based on role-related skills and evidence, not gender assumptions.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Fact",
    explanation: "Consistent, job-related criteria help make recruitment fairer and reduce the influence of bias.",
    source: "International Labour Organization",
    category: "Workplace"
  },
  {
    question: "A boy who wants to work in early childhood education should be discouraged because caregiving is women's work.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Stereotype",
    explanation: "Caregiving ability is not limited to one gender, and people should be able to pursue work suited to their interests and skills.",
    source: "UN Women",
    category: "Education"
  },
  {
    question: "People doing work of equal value should receive fair pay regardless of gender.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Fact",
    explanation: "Equal remuneration for work of equal value is a core principle of workplace equality.",
    source: "International Labour Organization",
    category: "Workplace"
  },
  {
    question: "Girls and boys should both be encouraged to explore science, technology, arts, and care-related subjects.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Fact",
    explanation: "Offering the same encouragement broadens choices and helps learners follow their abilities and interests.",
    source: "UNESCO",
    category: "Education"
  },
  {
    question: "A person who speaks confidently is naturally a better leader because of their gender.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Stereotype",
    explanation: "Leadership cannot be inferred from gender; it depends on a range of skills, experience, and circumstances.",
    source: "World Economic Forum",
    category: "Workplace"
  },
  {
    question: "Using respectful language and a person's stated name helps make communication more inclusive.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Fact",
    explanation: "Respectful language recognizes people's dignity and helps create safer, more inclusive environments.",
    source: "United Nations Free & Equal",
    category: "Communication"
  },
  {
    question: "A single person's experience proves that gender bias no longer exists.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Stereotype",
    explanation: "Individual experiences vary, so understanding barriers requires looking at broader patterns and evidence rather than assuming one story represents everyone.",
    source: "UN Women",
    category: "Gender Equality"
  },
  {
    question: "Schools can help challenge stereotypes by giving every learner equal chances to participate and lead.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Fact",
    explanation: "Fair opportunities in classrooms help learners develop skills without being limited by gender expectations.",
    source: "UNESCO",
    category: "Education"
  },
  {
    question: "Taking parental leave and sharing family care are responsibilities that can involve parents of every gender.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Fact",
    explanation: "Care policies and shared responsibilities can support families and help distribute unpaid care more fairly.",
    source: "International Labour Organization",
    category: "Gender Roles"
  },
  {
    question: "Only women should be expected to take notes and organize materials during group work.",
    options: ["Stereotype", "Fact", "Not sure"],
    answer: "Stereotype",
    explanation: "Assigning routine support tasks by gender reinforces unequal expectations; responsibilities should be shared fairly.",
    source: "UNESCO",
    category: "Education"
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
    source: "The LawPhil Project",
    url: "https://lawphil.net/statutes/repacts/ra2009/ra_9710_2009.html"
  },
  {
    id: "2",
    title: "Republic Act No. 7877 - Anti-Sexual Harassment Act",
    explanation: "Provides legal protection against sexual harassment in work, education, and training environments.",
    category: "Harassment",
    year: "1995",
    source: "The LawPhil Project",
    url: "https://lawphil.net/statutes/repacts/ra1995/ra_7877_1995.html"
  },
  {
    id: "3",
    title: "Republic Act No. 11313 - Safe Spaces Act",
    explanation: "Strengthens protections against gender-based harassment in public and private spaces, including online and community settings.",
    category: "Protection",
    year: "2019",
    source: "The LawPhil Project",
    url: "https://lawphil.net/statutes/repacts/ra2019/ra_11313_2019.html"
  },
  {
    id: "4",
    title: "Philippine Labor Code - Equal employment opportunity principles",
    explanation: "Sets the legal framework for fairness and non-discrimination in the workplace and supports equal opportunity protections.",
    category: "Workplace",
    year: "1974",
    source: "The LawPhil Project",
    url: "https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html"
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
