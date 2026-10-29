import type { ConceptCard } from "../types/game";

export const getInitialCards = (): ConceptCard[] => {
  return [
    // Dyslexia Cards
    {
      id: "dyslexia-basics",
      title: "Understanding Dyslexia",
      shortDescription: "A learning difference in reading and writing",
      fullDescription: "Dyslexia is a learning difference that primarily affects reading, writing, and spelling. It is neurological, meaning the brain processes written language differently. Dyslexia has nothing to do with intelligence - many dyslexic people are highly creative and successful. About 15-20% of people have some degree of dyslexia.",
      category: "shared",
      categories: ["executive"],
      unlocked: false,
      quizQuestion: {
        question: "What is dyslexia?",
        options: [
          "A vision problem",
          "A learning difference in how the brain processes written language",
          "A sign of low intelligence",
          "Something only children have"
        ],
        correctIndex: 1
      }
    },
    {
      id: "dyslexia-strengths",
      title: "Dyslexic Strengths",
      shortDescription: "Unique abilities that come with dyslexia",
      fullDescription: "People with dyslexia often develop remarkable strengths. These include big-picture thinking, creativity, problem-solving, and strong visual-spatial skills. Many entrepreneurs, artists, architects, and scientists are dyslexic. The same brain differences that make reading challenging often lead to innovative thinking and seeing connections others miss.",
      category: "shared",
      categories: ["executive"],
      unlocked: false,
      quizQuestion: {
        question: "Which is often a strength associated with dyslexia?",
        options: [
          "Memorizing long lists",
          "Big-picture and creative thinking",
          "Fast reading speed",
          "Spelling accuracy"
        ],
        correctIndex: 1
      }
    },
    {
      id: "phonological-processing",
      title: "Phonological Processing",
      shortDescription: "How the brain handles sounds in words",
      fullDescription: "Phonological processing is how the brain recognizes and manipulates sounds in language. In dyslexia, this process works differently, making it harder to connect letters with sounds (phonemes). This is why sounding out words can be challenging. Understanding this helps us see that dyslexia is not about effort or intelligence - it is about different brain wiring.",
      category: "shared",
      categories: ["communication", "executive"],
      unlocked: false,
      quizQuestion: {
        question: "What does phonological processing affect?",
        options: [
          "How the brain connects letters with sounds",
          "How fast someone can run",
          "Mathematical abilities",
          "Social skills"
        ],
        correctIndex: 0
      }
    },
    {
      id: "dyslexia-accommodations",
      title: "Dyslexia Accommodations",
      shortDescription: "Tools and strategies that help",
      fullDescription: "Many tools can help people with dyslexia thrive. Text-to-speech software reads text aloud, audiobooks provide another way to access stories, and spell-check helps with writing. Extra time on tests, larger fonts, and colored overlays can also help. These accommodations are not cheating - they level the playing field so dyslexic people can show their true abilities.",
      category: "shared",
      categories: ["executive"],
      unlocked: false,
      quizQuestion: {
        question: "Why are accommodations for dyslexia important?",
        options: [
          "They give unfair advantages",
          "They help people show their true abilities",
          "They make things too easy",
          "They are only for young children"
        ],
        correctIndex: 1
      }
    },
    // Shared/Cross-Condition Cards
    {
      id: "hyperfocus",
      title: "Hyperfocus",
      shortDescription: "Intense concentration on engaging tasks",
      fullDescription: "Hyperfocus is experienced by people with ADHD and autism. It is when someone becomes completely absorbed in an activity they find engaging. Time seems to disappear, and they may not notice hunger, tiredness, or other people around them. For autistic individuals, this often connects to special interests. While this can be a superpower for getting things done, it can also mean missing important events or forgetting basic needs.",
      category: "shared",
      categories: ["adhd", "autism"],
      unlocked: false,
      quizQuestion: {
        question: "What happens during hyperfocus?",
        options: [
          "The person gets easily distracted",
          "The person becomes completely absorbed in an activity",
          "The person falls asleep",
          "The person loses interest quickly"
        ],
        correctIndex: 1
      }
    },
    {
      id: "time-blindness",
      title: "Time Blindness",
      shortDescription: "Difficulty perceiving time passing",
      fullDescription: "Time blindness is when someone has trouble accurately estimating how much time has passed or how long a task will take. Five minutes can feel like an hour, or two hours can pass in what feels like minutes. This is common in ADHD and autism. It is not about being careless—the brain simply processes time differently.",
      category: "shared",
      categories: ["adhd", "autism"],
      unlocked: false,
      quizQuestion: {
        question: "What is time blindness?",
        options: [
          "Being unable to read clocks",
          "Always being late on purpose",
          "Difficulty accurately perceiving how much time has passed",
          "Ignoring time completely"
        ],
        correctIndex: 2
      }
    },
    {
      id: "rsd",
      title: "Rejection Sensitivity (RSD)",
      shortDescription: "Intense emotional response to perceived rejection",
      fullDescription: "Rejection Sensitive Dysphoria (RSD) is an extreme emotional response to perceived criticism or rejection. Even small comments can feel devastating. This is common in people with ADHD and can also appear in autism. Understanding this helps both the person experiencing RSD and those around them to be more compassionate.",
      category: "shared",
      categories: ["adhd", "autism"],
      unlocked: false,
      quizQuestion: {
        question: "How does Rejection Sensitive Dysphoria (RSD) affect someone?",
        options: [
          "They enjoy criticism",
          "They have no reaction to feedback",
          "Even small comments can feel devastating",
          "They become aggressive"
        ],
        correctIndex: 2
      }
    },
    {
      id: "executive-dysfunction",
      title: "Executive Dysfunction",
      shortDescription: "Challenges with planning and task management",
      fullDescription: "Executive dysfunction affects the brain's ability to plan, organize, start tasks, manage time, and shift between activities. It is like having a disorganized manager in your brain. This is common in both ADHD and autism. It is not laziness—it is a real difference in how the brain's executive control system works.",
      category: "shared",
      categories: ["executive", "adhd", "autism"],
      unlocked: false,
      quizQuestion: {
        question: "Executive dysfunction is best described as:",
        options: [
          "Being lazy and not wanting to work",
          "A difference in how the brain plans and organizes tasks",
          "Being too smart for simple tasks",
          "Not caring about responsibilities"
        ],
        correctIndex: 1
      }
    },

    // ADHD Presentation Cards
    {
      id: "adhd-in-girls",
      title: "ADHD in Girls",
      shortDescription: "How ADHD often looks different in girls",
      fullDescription: "ADHD presents differently in girls and women. While boys often show hyperactivity and impulsivity, girls may appear inattentive, daydreamy, or disorganized. Girls might seem bored in class, struggle to follow conversations, or feel overwhelmed by social dynamics. They often develop anxiety from trying to mask symptoms. Many girls are diagnosed later in life because their symptoms are less visible.",
      category: "adhd",
      unlocked: false,
      quizQuestion: {
        question: "How does ADHD often present differently in girls?",
        options: [
          "Girls are always hyperactive",
          "Girls may appear inattentive, daydreamy, or disorganized",
          "Girls never have ADHD",
          "Girls are always diagnosed early"
        ],
        correctIndex: 1
      }
    },
    {
      id: "emotional-dysregulation",
      title: "Emotional Dysregulation",
      shortDescription: "Intense emotions that are hard to manage",
      fullDescription: "Emotional dysregulation means experiencing emotions more intensely and having trouble managing them. Small frustrations can feel huge, and emotional reactions may seem disproportionate. This is common in ADHD and autism. It is not about being dramatic—the brain processes emotions differently and needs understanding, not judgment.",
      category: "shared",
      categories: ["adhd", "autism"],
      unlocked: false,
      quizQuestion: {
        question: "What is emotional dysregulation?",
        options: [
          "Having no emotions at all",
          "Being dramatic on purpose",
          "Experiencing emotions intensely and having trouble managing them",
          "Always being calm"
        ],
        correctIndex: 2
      }
    },

    // Autism Cards
    {
      id: "stimming",
      title: "Stimming",
      shortDescription: "Self-stimulating behaviors for regulation",
      fullDescription: "Stimming (self-stimulatory behavior) includes repetitive movements like hand-flapping, rocking, fidgeting, or vocalizations. These behaviors help regulate emotions, manage sensory input, or express excitement. Stimming is natural and should not be discouraged unless it causes harm. It is a healthy coping mechanism found in both autism and ADHD!",
      category: "shared",
      categories: ["autism", "adhd"],
      unlocked: false,
      quizQuestion: {
        question: "What is the purpose of stimming?",
        options: [
          "To annoy other people",
          "To help regulate emotions and manage sensory input",
          "To show off",
          "It serves no purpose"
        ],
        correctIndex: 1
      }
    },
    {
      id: "special-interest",
      title: "Special Interest",
      shortDescription: "Intense, focused interest in specific topics",
      fullDescription: "Special interests are topics that autistic people feel deeply passionate about. They might learn everything possible about trains, astronomy, animals, K-pop, or any subject. These interests bring joy, comfort, and can become areas of expertise. They are a strength, not something to discourage! People with ADHD also experience intense interests, though they may shift more frequently.",
      category: "autism",
      unlocked: false,
      quizQuestion: {
        question: "Special interests in autistic people are:",
        options: [
          "Something to discourage",
          "A weakness",
          "A strength that brings joy and can become areas of expertise",
          "Always about trains"
        ],
        correctIndex: 2
      }
    },
    {
      id: "masking",
      title: "Masking",
      shortDescription: "Hiding neurodivergent traits to fit in",
      fullDescription: "Masking is when neurodivergent people hide their natural behaviors to appear more neurotypical. This might include forcing eye contact, suppressing stims, or mimicking social behaviors. While it helps someone fit in, masking is exhausting and can lead to burnout. Both autistic people and those with ADHD may mask. Everyone deserves to be their authentic self.",
      category: "autism",
      unlocked: false,
      quizQuestion: {
        question: "What is masking?",
        options: [
          "Wearing a physical mask",
          "Hiding neurodivergent traits to appear neurotypical",
          "A fun game",
          "Showing your true self"
        ],
        correctIndex: 1
      }
    },
    {
      id: "literal-thinking",
      title: "Literal Thinking",
      shortDescription: "Processing language concretely",
      fullDescription: "Many autistic people process language literally, meaning figurative expressions like idioms or sarcasm can be confusing. Saying exactly what you mean (clear, direct communication) helps everyone understand each other better. This is not a deficit—it is just a different communication style!",
      category: "communication",
      unlocked: false,
      quizQuestion: {
        question: "How can you best communicate with someone who thinks literally?",
        options: [
          "Use lots of sarcasm and idioms",
          "Be vague and indirect",
          "Use clear, direct communication",
          "Speak very fast"
        ],
        correctIndex: 2
      }
    },
    {
      id: "autism-in-girls",
      title: "Autism in Girls",
      shortDescription: "How autism often presents in girls",
      fullDescription: "Autism often looks different in girls and women. They may be better at masking, have strong social motivation, or have interests that seem more typical (like animals, celebrities, or fiction). Girls might seem shy rather than socially different, and may internalize struggles rather than acting out. This leads to many girls being diagnosed later or misdiagnosed with anxiety or depression.",
      category: "autism",
      unlocked: false,
      quizQuestion: {
        question: "Why are many girls diagnosed with autism later in life?",
        options: [
          "Girls cannot have autism",
          "Their symptoms often present differently and are less visible",
          "They always get diagnosed early",
          "Doctors refuse to diagnose girls"
        ],
        correctIndex: 1
      }
    },

    // Sensory Cards
    {
      id: "sensory-overload",
      title: "Sensory Overload",
      shortDescription: "Too much sensory input at once",
      fullDescription: "Sensory overload happens when the brain receives more sensory information than it can process. This might include loud noises, bright lights, strong smells, or crowded spaces. It can feel overwhelming, painful, or cause shutdowns. This affects people with autism and ADHD. Creating sensory-friendly spaces helps everyone feel comfortable.",
      category: "sensory",
      unlocked: false,
      quizQuestion: {
        question: "What causes sensory overload?",
        options: [
          "Not enough sensory input",
          "The brain receiving more sensory information than it can process",
          "Being bored",
          "Sleeping too much"
        ],
        correctIndex: 1
      }
    },
    {
      id: "sensory-seeking",
      title: "Sensory Seeking",
      shortDescription: "Craving sensory input",
      fullDescription: "Sensory seeking is when someone actively looks for sensory experiences. They might love loud music, spicy foods, spinning, jumping, or deep pressure. Their nervous system needs more input to feel regulated. This is common in both autism and ADHD. Providing safe sensory opportunities helps seekers meet their needs.",
      category: "sensory",
      unlocked: false,
      quizQuestion: {
        question: "Someone who is sensory seeking might:",
        options: [
          "Avoid all sounds and textures",
          "Stay very still and quiet",
          "Actively look for loud music, movement, or deep pressure",
          "Have no sensory preferences"
        ],
        correctIndex: 2
      }
    },
    {
      id: "sensory-avoiding",
      title: "Sensory Avoiding",
      shortDescription: "Avoiding overwhelming sensory input",
      fullDescription: "Sensory avoiders find certain sensory inputs painful or overwhelming. They might dislike specific textures, loud sounds, bright lights, or strong smells. Their nervous system is more sensitive, so what seems normal to others can be too much for them. Respecting these boundaries is important.",
      category: "sensory",
      unlocked: false,
      quizQuestion: {
        question: "How should we respond to someone who is sensory avoiding?",
        options: [
          "Force them to experience more sensory input",
          "Ignore their discomfort",
          "Respect their boundaries and sensory needs",
          "Tell them to get over it"
        ],
        correctIndex: 2
      }
    },

    // Communication Cards
    {
      id: "nonverbal-communication",
      title: "Nonverbal Communication",
      shortDescription: "Communicating without words",
      fullDescription: "Not everyone communicates verbally all the time. Some people use AAC (augmentative and alternative communication) devices, sign language, or text to communicate. Others may be verbal sometimes but not always, especially when overwhelmed. All communication is valid and deserves respect.",
      category: "communication",
      unlocked: false,
      quizQuestion: {
        question: "What is true about nonverbal communication?",
        options: [
          "It is not real communication",
          "Only verbal communication is valid",
          "All forms of communication are valid and deserve respect",
          "People should be forced to speak verbally"
        ],
        correctIndex: 2
      }
    },
    {
      id: "info-dumping",
      title: "Info Dumping",
      shortDescription: "Sharing lots of information about interests",
      fullDescription: "Info dumping is when someone shares a lot of information about their special interest or something they are excited about. This is a way of connecting and sharing joy! If you are on the receiving end, it means they trust you and want to share what they love. This is common in autism and ADHD.",
      category: "communication",
      unlocked: false,
      quizQuestion: {
        question: "When someone info dumps to you, it means:",
        options: [
          "They are trying to annoy you",
          "They trust you and want to share what they love",
          "They are showing off",
          "They want you to leave"
        ],
        correctIndex: 1
      }
    },
    {
      id: "parallel-play",
      title: "Parallel Play",
      shortDescription: "Being together without direct interaction",
      fullDescription: "Parallel play is when people enjoy being in the same space doing their own activities, rather than directly interacting. For neurodivergent people, this is often a preferred way to socialize. It offers connection without the demands of conversation. Being together in comfortable silence can be just as meaningful as talking!",
      category: "communication",
      unlocked: false,
      quizQuestion: {
        question: "What is parallel play?",
        options: [
          "Playing the same game together",
          "Being together in the same space while doing separate activities",
          "Ignoring each other completely",
          "Playing video games"
        ],
        correctIndex: 1
      }
    },

    // Executive Function Cards
    {
      id: "task-initiation",
      title: "Task Initiation",
      shortDescription: "Difficulty getting started on tasks",
      fullDescription: "Task initiation is the ability to start a task. Many neurodivergent people struggle with this—even when they want to do something, getting started feels impossible. This is not procrastination or laziness. Breaking tasks into tiny steps, using body doubling, or starting with the easiest part can help.",
      category: "executive",
      unlocked: false,
      quizQuestion: {
        question: "Difficulty with task initiation is:",
        options: [
          "The same as being lazy",
          "A choice people make",
          "Not the same as procrastination - getting started genuinely feels impossible",
          "Something that only affects lazy people"
        ],
        correctIndex: 2
      }
    },
    {
      id: "working-memory",
      title: "Working Memory",
      shortDescription: "Holding information in mind temporarily",
      fullDescription: "Working memory is like your brain's sticky note—it holds information temporarily while you use it. Many people with ADHD and autism have differences in working memory. They might forget what they were doing mid-task, lose track of conversations, or need things written down. External reminders and lists are helpful accommodations.",
      category: "executive",
      unlocked: false,
      quizQuestion: {
        question: "What is a helpful accommodation for working memory differences?",
        options: [
          "Expecting people to just remember everything",
          "External reminders and written lists",
          "Getting frustrated with forgetfulness",
          "No accommodations are needed"
        ],
        correctIndex: 1
      }
    },
  ];
};
