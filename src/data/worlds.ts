import type { World, Lesson } from "../types/game";

// Lessons for Dyslexia Discovery
const dyslexiaLessons: Lesson[] = [
  {
    id: "dyslexia-intro",
    title: "What is Dyslexia?",
    type: "scenario",
    worldId: "dyslexia-discovery",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Your classmate Taylor takes much longer to finish reading assignments and often asks the teacher to read instructions out loud. When writing, they sometimes mix up letters like b and d.",
        question: "What might be happening?",
        choices: [
          {
            text: "Taylor is not trying hard enough",
            isCorrect: false,
            feedback: "Dyslexia is not about effort. People with dyslexia often work harder than their peers but still face challenges with reading and writing.",
          },
          {
            text: "Taylor may have dyslexia, which affects how the brain processes written language",
            isCorrect: true,
            feedback: "Exactly! Dyslexia is a learning difference that affects reading, writing, and spelling. It has nothing to do with intelligence or effort.",
          },
          {
            text: "Taylor needs glasses",
            isCorrect: false,
            feedback: "While vision problems can affect reading, dyslexia is a neurological difference in how the brain processes language, not a vision issue.",
          },
        ],
        correctChoice: 1,
        explanation: "Dyslexia is a common learning difference that affects 1 in 5 people. It affects how the brain processes written language but has nothing to do with intelligence.",
      },
    },
  },
  {
    id: "dyslexia-strengths",
    title: "Dyslexic Strengths",
    type: "sorting",
    worldId: "dyslexia-discovery",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these into Strengths associated with dyslexia or Challenges",
        items: [
          {
            id: "str1",
            text: "Big picture thinking",
            correctCategory: "Strengths",
          },
          {
            id: "chal1",
            text: "Difficulty with spelling",
            correctCategory: "Challenges",
          },
          {
            id: "str2",
            text: "Creative problem solving",
            correctCategory: "Strengths",
          },
          {
            id: "chal2",
            text: "Slower reading speed",
            correctCategory: "Challenges",
          },
          {
            id: "str3",
            text: "Strong visual-spatial skills",
            correctCategory: "Strengths",
          },
          {
            id: "str4",
            text: "Thinking outside the box",
            correctCategory: "Strengths",
          },
        ],
        categories: ["Strengths", "Challenges"],
      },
    },
  },
  {
    id: "dyslexia-myths",
    title: "Busting Dyslexia Myths",
    type: "quiz",
    worldId: "dyslexia-discovery",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "Which statement about dyslexia is TRUE?",
            options: [
              "People with dyslexia see letters backwards",
              "Dyslexia affects how the brain processes language",
              "Dyslexia means someone is not intelligent",
              "People grow out of dyslexia",
            ],
            correctIndex: 1,
            explanation: "Dyslexia is about how the brain processes written language. It is not about seeing things backwards, and it has no connection to intelligence. It is a lifelong difference, though people develop strategies to work with it.",
          },
          {
            question: "What percentage of people have dyslexia?",
            options: [
              "About 1%",
              "About 5%",
              "About 15-20%",
              "About 50%",
            ],
            correctIndex: 2,
            explanation: "Dyslexia affects about 15-20% of the population, making it one of the most common learning differences. Many successful people have dyslexia!",
          },
        ],
      },
    },
  },
  {
    id: "dyslexia-support",
    title: "Supporting Dyslexic Learners",
    type: "matching",
    worldId: "dyslexia-discovery",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the challenge to a helpful accommodation",
        pairs: [
          {
            left: "Difficulty reading long texts",
            right: "Audiobooks and text-to-speech",
            matched: false,
          },
          {
            left: "Struggles with spelling",
            right: "Spell-check tools and word prediction",
            matched: false,
          },
          {
            left: "Needs more time to process text",
            right: "Extended time on tests",
            matched: false,
          },
          {
            left: "Difficulty with dense text layouts",
            right: "Larger fonts and more spacing",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "dyslexia-famous",
    title: "Famous Dyslexic Minds",
    type: "scenario",
    worldId: "dyslexia-discovery",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "You learn that many famous and successful people have dyslexia, including Steven Spielberg, Whoopi Goldberg, Richard Branson, and Albert Einstein.",
        question: "What does this teach us about dyslexia?",
        choices: [
          {
            text: "These people succeeded despite being less capable",
            isCorrect: false,
            feedback: "Dyslexia does not make someone less capable. These individuals often credit their dyslexic thinking style as part of their success.",
          },
          {
            text: "Dyslexia can come with unique strengths that lead to success",
            isCorrect: true,
            feedback: "Correct! Many people with dyslexia develop strong problem-solving, creative, and big-picture thinking skills that help them excel in their fields.",
          },
          {
            text: "Only famous people can overcome dyslexia",
            isCorrect: false,
            feedback: "Everyone with dyslexia can develop strategies and find success. These examples show dyslexia is not a barrier to achievement.",
          },
        ],
        correctChoice: 1,
        explanation: "Many successful innovators, artists, and entrepreneurs have dyslexia. The unique way dyslexic minds process information often leads to creative and innovative thinking.",
      },
    },
  },
];

// Lessons for Autism Awareness Island
const autismLessons: Lesson[] = [
  {
    id: "autism-intro",
    title: "What is Autism?",
    type: "scenario",
    worldId: "autism-awareness",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Your classmate Alex always sits in the same seat and gets upset when someone takes it. They also prefer to eat lunch alone with headphones on.",
        question: "What might be happening?",
        choices: [
          {
            text: "Alex is being rude and antisocial",
            isCorrect: false,
            feedback: "Not quite. Autistic people often have routines that help them feel comfortable and safe.",
          },
          {
            text: "Alex prefers routines and needs quiet time to manage sensory input",
            isCorrect: true,
            feedback: "Exactly! Many autistic people rely on routines and need breaks from sensory stimulation.",
          },
          {
            text: "Alex does not like anyone at school",
            isCorrect: false,
            feedback: "This assumes too much. They might just need structure and sensory breaks to feel comfortable.",
          },
        ],
        correctChoice: 1,
        explanation: "Autistic individuals often thrive with consistent routines and may need quiet spaces to recharge from sensory overload.",
      },
    },
  },
  {
    id: "autism-eye-contact",
    title: "Understanding Eye Contact",
    type: "scenario",
    worldId: "autism-awareness",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "During a group project, Morgan does not make eye contact when you talk to them. Some classmates think Morgan is being rude or not listening.",
        question: "What is the best way to understand this situation?",
        choices: [
          {
            text: "Morgan is definitely not listening and being disrespectful",
            isCorrect: false,
            feedback: "Eye contact and attention are not the same thing. Many people listen better when not making eye contact.",
          },
          {
            text: "For many autistic people, avoiding eye contact helps them focus and feel comfortable",
            isCorrect: true,
            feedback: "Correct! Eye contact can be uncomfortable or distracting for many autistic people. They may actually listen better without it.",
          },
          {
            text: "You should force Morgan to look at you when speaking",
            isCorrect: false,
            feedback: "Forcing eye contact can be stressful and counterproductive. Respect different communication styles.",
          },
        ],
        correctChoice: 1,
        explanation: "Eye contact norms vary across cultures and neurotypes. Many autistic people find direct eye contact uncomfortable or overwhelming.",
      },
    },
  },
  {
    id: "autism-special-interests",
    title: "The Power of Special Interests",
    type: "scenario",
    worldId: "autism-awareness",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Your friend Sam can talk for hours about trains and knows every detail about different train systems around the world. Some people think this is weird.",
        question: "How should you view special interests?",
        choices: [
          {
            text: "Special interests are weird and should be discouraged",
            isCorrect: false,
            feedback: "Special interests are a source of joy and often become areas of expertise. They should be celebrated!",
          },
          {
            text: "Special interests are a strength and can lead to expertise and careers",
            isCorrect: true,
            feedback: "Yes! Many autistic people turn their special interests into successful careers. Deep knowledge is valuable.",
          },
          {
            text: "Sam should learn to talk about more normal topics",
            isCorrect: false,
            feedback: "There is no such thing as a normal topic. Passionate knowledge about any subject is impressive.",
          },
        ],
        correctChoice: 1,
        explanation: "Special interests bring joy and often lead to deep expertise. Many successful professionals credit their autistic focus for their achievements.",
      },
    },
  },
  {
    id: "autism-meltdowns",
    title: "Understanding Meltdowns",
    type: "scenario",
    worldId: "autism-awareness",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "During a fire drill, Casey suddenly starts crying and covering their ears. They seem unable to calm down even after the drill ends.",
        question: "What is Casey likely experiencing?",
        choices: [
          {
            text: "Casey is throwing a tantrum for attention",
            isCorrect: false,
            feedback: "Meltdowns are not tantrums. They are involuntary responses to overwhelming situations and cannot be controlled.",
          },
          {
            text: "Casey is having an autistic meltdown from sensory overload",
            isCorrect: true,
            feedback: "Correct! Meltdowns happen when the brain becomes overwhelmed. The best response is patience and creating a calm environment.",
          },
          {
            text: "Casey should just try harder to control themselves",
            isCorrect: false,
            feedback: "Meltdowns cannot be controlled through willpower. They require understanding and support, not judgment.",
          },
        ],
        correctChoice: 1,
        explanation: "Meltdowns are involuntary responses to overwhelming situations. The best support is patience, reduced stimulation, and compassion.",
      },
    },
  },
  {
    id: "autism-communication",
    title: "Communication Styles",
    type: "matching",
    worldId: "autism-awareness",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the communication preference to the right response",
        pairs: [
          {
            left: "Prefers direct communication",
            right: "Say exactly what you mean without hints",
            matched: false,
          },
          {
            left: "Needs processing time",
            right: "Give them a moment to think before expecting a response",
            matched: false,
          },
          {
            left: "Enjoys deep conversations about interests",
            right: "Ask about their special interests",
            matched: false,
          },
          {
            left: "Finds small talk difficult",
            right: "Skip to meaningful conversation topics",
            matched: false,
          },
          {
            left: "Prefers written communication",
            right: "Text or email instead of calling",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "autism-support-matching",
    title: "How to Be Supportive",
    type: "matching",
    worldId: "autism-awareness",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the situation to the supportive response",
        pairs: [
          {
            left: "Friend seems overwhelmed at a party",
            right: "Offer to find a quiet space together",
            matched: false,
          },
          {
            left: "Classmate is upset about a schedule change",
            right: "Acknowledge their feelings and help them prepare",
            matched: false,
          },
          {
            left: "Someone is sharing their special interest",
            right: "Listen with genuine interest and ask questions",
            matched: false,
          },
          {
            left: "Person is stimming (rocking, hand-flapping)",
            right: "Let them be - it is a healthy coping mechanism",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "autism-myths",
    title: "Busting Autism Myths",
    type: "sorting",
    worldId: "autism-awareness",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these statements into Myth or Fact",
        items: [
          {
            id: "myth1",
            text: "Autistic people do not have emotions",
            correctCategory: "Myth",
          },
          {
            id: "fact1",
            text: "Autistic people may express emotions differently",
            correctCategory: "Fact",
          },
          {
            id: "myth2",
            text: "All autistic people are the same",
            correctCategory: "Myth",
          },
          {
            id: "fact2",
            text: "Autism is a spectrum with diverse experiences",
            correctCategory: "Fact",
          },
          {
            id: "myth3",
            text: "Autism can be cured",
            correctCategory: "Myth",
          },
          {
            id: "fact3",
            text: "Autism is a lifelong neurological difference",
            correctCategory: "Fact",
          },
        ],
        categories: ["Myth", "Fact"],
      },
    },
  },
  {
    id: "autism-strengths-sorting",
    title: "Autism Strengths",
    type: "sorting",
    worldId: "autism-awareness",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these into common Strengths or Challenges for autistic people",
        items: [
          {
            id: "str1",
            text: "Attention to detail and patterns",
            correctCategory: "Strengths",
          },
          {
            id: "chal1",
            text: "Sensory sensitivities",
            correctCategory: "Challenges",
          },
          {
            id: "str2",
            text: "Deep focus on interests",
            correctCategory: "Strengths",
          },
          {
            id: "chal2",
            text: "Difficulty with unexpected changes",
            correctCategory: "Challenges",
          },
          {
            id: "str3",
            text: "Honest and direct communication",
            correctCategory: "Strengths",
          },
          {
            id: "str4",
            text: "Strong memory for facts and details",
            correctCategory: "Strengths",
          },
        ],
        categories: ["Strengths", "Challenges"],
      },
    },
  },
  {
    id: "autism-masking",
    title: "Understanding Masking",
    type: "scenario",
    worldId: "autism-awareness",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Jamie seems fine at school but comes home exhausted every day. They told you that they spend all day pretending to be someone else so people will not think they are weird.",
        question: "What is Jamie experiencing?",
        choices: [
          {
            text: "Jamie is just tired from homework",
            isCorrect: false,
            feedback: "The exhaustion is from social effort, not academics. Masking takes enormous energy.",
          },
          {
            text: "Jamie is masking, which is hiding autistic traits to fit in",
            isCorrect: true,
            feedback: "Correct! Masking is exhausting because it requires constant self-monitoring and suppression of natural behaviors.",
          },
          {
            text: "Jamie needs to try harder at school",
            isCorrect: false,
            feedback: "Jamie is already trying very hard - that is the problem. Masking is unsustainable.",
          },
        ],
        correctChoice: 1,
        explanation: "Masking is common especially in autistic girls and women. It can lead to burnout. Everyone deserves to be their authentic self.",
      },
    },
  },
  {
    id: "autism-girls",
    title: "Autism in Girls",
    type: "quiz",
    worldId: "autism-awareness",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "Why are girls often diagnosed with autism later than boys?",
            options: [
              "Girls cannot be autistic",
              "Girls may mask better and have less visible symptoms",
              "Doctors do not test girls",
              "Autism is different in girls",
            ],
            correctIndex: 1,
            explanation: "Girls often learn to mask autistic traits earlier, making symptoms less obvious. They may be misdiagnosed with anxiety or depression first.",
          },
          {
            question: "What might autism look like in girls?",
            options: [
              "Intense interest in animals, celebrities, or fiction",
              "Always being disruptive in class",
              "Having no friends at all",
              "Being exactly like autistic boys",
            ],
            correctIndex: 0,
            explanation: "Autistic girls may have interests that seem more typical but are still intensely focused. They may have one or two close friends rather than none.",
          },
          {
            question: "What is social camouflaging?",
            options: [
              "Hiding from social situations completely",
              "Copying others social behaviors to fit in",
              "Wearing camouflage clothing",
              "Avoiding all friendships",
            ],
            correctIndex: 1,
            explanation: "Social camouflaging is when autistic people, especially girls, copy social behaviors they observe in others to blend in. This is exhausting but common.",
          },
        ],
      },
    },
  },
  {
    id: "autism-quiz-understanding",
    title: "Understanding Autism Quiz",
    type: "quiz",
    worldId: "autism-awareness",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What does the phrase 'autism spectrum' mean?",
            options: [
              "Autism comes in different colors",
              "Autism presents differently in each person",
              "Some autistic people are more intelligent than others",
              "Autism is a disease with stages",
            ],
            correctIndex: 1,
            explanation: "The autism spectrum means autism presents differently in each individual. No two autistic people are exactly alike.",
          },
          {
            question: "What is stimming?",
            options: [
              "A negative behavior that should be stopped",
              "Self-stimulating behaviors that help regulate emotions",
              "A sign of low intelligence",
              "Something only children do",
            ],
            correctIndex: 1,
            explanation: "Stimming (self-stimulatory behavior) like hand-flapping or rocking helps regulate emotions and sensory input. It is healthy and natural.",
          },
          {
            question: "How can you best support an autistic friend?",
            options: [
              "Try to fix them",
              "Accept them as they are and learn their communication style",
              "Avoid them to not make things awkward",
              "Treat them exactly like everyone else ignoring their needs",
            ],
            correctIndex: 1,
            explanation: "The best support is acceptance, understanding, and adapting communication to work for both of you.",
          },
        ],
      },
    },
  },
];

// Lessons for ADHD Adventure Park
const adhdLessons: Lesson[] = [
  {
    id: "adhd-intro",
    title: "Understanding ADHD",
    type: "scenario",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Your friend Jordan starts many projects but rarely finishes them. They also interrupt conversations and seem to always be moving or fidgeting.",
        question: "Which response shows understanding?",
        choices: [
          {
            text: "Jordan is lazy and needs to try harder",
            isCorrect: false,
            feedback: "ADHD is not about effort. The ADHD brain works differently in managing attention and impulses. Labelling it laziness makes Jordan feel worse and does not address what is actually happening.",
          },
          {
            text: "Jordan has ADHD traits like difficulty with task completion and impulse control",
            isCorrect: true,
            feedback: "Yes! ADHD affects executive function, making it harder to finish tasks and control impulses. As an ally, try breaking big tasks into small steps together and celebrate each step they complete.",
          },
          {
            text: "Jordan just needs to focus more",
            isCorrect: false,
            feedback: "Telling someone with ADHD to focus more does not help. Their brain regulates attention differently. Instead, ask what kind of support would actually be useful for them.",
          },
        ],
        correctChoice: 1,
        explanation: "ADHD affects how the brain manages attention, impulses, and task completion. It is not a choice or lack of effort. Ally tip: ask what helps rather than assuming, since strategies that work vary a lot from person to person.",
      },
    },
  },
  {
    id: "adhd-time-blindness",
    title: "Time Blindness",
    type: "scenario",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Casey promised to meet you at 3pm but arrived at 3:45pm. They seem genuinely surprised that so much time passed and apologize sincerely.",
        question: "What is likely happening with Casey?",
        choices: [
          {
            text: "Casey does not respect your time",
            isCorrect: false,
            feedback: "Time blindness is a real ADHD symptom. Casey likely genuinely lost track of time, not intentionally. Assuming disrespect can damage the friendship and adds shame.",
          },
          {
            text: "Casey experiences time blindness, a common ADHD trait",
            isCorrect: true,
            feedback: "Correct! Time blindness makes it genuinely difficult to perceive time passing. Ally tip: agree on a system together, like Casey setting a phone alarm 20 minutes before you need to meet, so neither of you has to stress.",
          },
          {
            text: "Casey is just making excuses",
            isCorrect: false,
            feedback: "Time blindness is real and frustrating for the person experiencing it too. Dismissing it as excuses shuts down the conversation. Instead, work together on practical solutions.",
          },
        ],
        correctChoice: 1,
        explanation: "Time blindness is when someone has difficulty accurately perceiving how much time has passed. It is a neurological difference, not a character flaw. Ally tip: help your friend set visible countdowns or alarms before important events. Offering a friendly reminder text 30 minutes ahead can also make a big difference.",
      },
    },
  },
  {
    id: "adhd-rejection-sensitivity",
    title: "Rejection Sensitive Dysphoria",
    type: "scenario",
    worldId: "adhd-adventure",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "You gave Alex constructive feedback on their presentation. They seemed devastated and could not stop thinking about it for days, even though your feedback was gentle and helpful.",
        question: "What might Alex be experiencing?",
        choices: [
          {
            text: "Alex is being overdramatic",
            isCorrect: false,
            feedback: "RSD causes real, intense emotional pain. It is not drama - it is a neurological response. Dismissing it as overdramatic makes the person feel even more rejected.",
          },
          {
            text: "Alex may have Rejection Sensitive Dysphoria (RSD), common in ADHD",
            isCorrect: true,
            feedback: "Correct! RSD causes extreme emotional sensitivity to perceived criticism or rejection. Ally tip: when giving feedback to someone with RSD, lead clearly with what is going well before anything constructive, and check in with them afterwards to reassure them you value them.",
          },
          {
            text: "Alex just cannot handle any criticism",
            isCorrect: false,
            feedback: "RSD is not about being unable to handle criticism - it is about the brain processing feedback with extreme emotional intensity. With the right framing and support, people with RSD can receive and use feedback well.",
          },
        ],
        correctChoice: 1,
        explanation: "Rejection Sensitive Dysphoria (RSD) is an intense emotional response to perceived rejection or criticism. Ally tip: be explicit with reassurance - saying 'I value you and I am sharing this because I want to help, not criticize' can significantly reduce the emotional impact for someone with RSD.",
      },
    },
  },
  {
    id: "adhd-waiting-mode",
    title: "The Waiting Mode",
    type: "scenario",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Your friend has a dentist appointment at 4pm. They cannot seem to start any tasks all day because they are waiting for the appointment.",
        question: "What is happening here?",
        choices: [
          {
            text: "They are just procrastinating",
            isCorrect: false,
            feedback: "Waiting mode is a real ADHD experience where upcoming events consume mental bandwidth. It is not a choice - the brain gets locked onto what is coming next.",
          },
          {
            text: "They are experiencing ADHD waiting mode",
            isCorrect: true,
            feedback: "Yes! Many people with ADHD struggle to engage in tasks when they know something is coming up. Ally tip: offer to 'body double' with them - sitting nearby (even quietly working on your own thing) can give them enough grounding to get tasks done while they wait.",
          },
          {
            text: "They need to better organize their day",
            isCorrect: false,
            feedback: "Waiting mode is not about organization - it is about how the ADHD brain handles anticipation. No planner can fully switch it off, but having company or a low-stakes distraction nearby can help.",
          },
        ],
        correctChoice: 1,
        explanation: "ADHD waiting mode is when an upcoming event takes up so much mental space that it is hard to focus on anything else until it happens. Ally tip: offer to body double - simply being present with someone while they try to work can make a surprisingly big difference. You do not need to help directly, just be there.",
      },
    },
  },
  {
    id: "adhd-hyperfocus",
    title: "The Hyperfocus Paradox",
    type: "quiz",
    worldId: "adhd-adventure",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What is hyperfocus in ADHD?",
            options: [
              "The ability to focus on everything equally",
              "Intense concentration on one thing, losing track of time",
              "Never being able to focus on anything",
              "Only focusing during tests",
            ],
            correctIndex: 1,
            explanation: "Hyperfocus is when someone with ADHD becomes so absorbed in an interesting activity that they lose track of time and surroundings. It is not controllable on demand - it tends to happen with things the brain finds genuinely engaging.",
          },
          {
            question: "Why can hyperfocus be both a strength and a challenge?",
            options: [
              "It only happens during boring tasks",
              "It allows deep work but can mean missing meals, sleep, or obligations",
              "It makes everything easier",
              "It never happens to people with ADHD",
            ],
            correctIndex: 1,
            explanation: "Hyperfocus can lead to amazing productivity and expertise, but can also cause people to forget to eat, miss appointments, or neglect other responsibilities. Ally tip: if you live or work with someone who hyperfocuses, agree in advance on a gentle signal (like a tap on the shoulder or a specific phrase) they are comfortable with as a check-in cue.",
          },
          {
            question: "How can you help someone exit hyperfocus?",
            options: [
              "Yell at them to snap out of it",
              "Set gentle timers and give verbal reminders",
              "Take away what they are working on",
              "It is impossible to interrupt hyperfocus",
            ],
            correctIndex: 1,
            explanation: "Gentle, non-startling reminders like timers or calm verbal cues can help someone transition out of hyperfocus without causing stress. Ally tip: give a 10-minute heads-up before a transition ('just so you know, dinner is in 10 minutes') rather than a sudden interruption. Abrupt endings can feel jarring and frustrating.",
          },
        ],
      },
    },
  },
  {
    id: "adhd-types-quiz",
    title: "ADHD Presentations",
    type: "quiz",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What are the three presentations of ADHD?",
            options: [
              "Mild, moderate, and severe",
              "Inattentive, hyperactive-impulsive, and combined",
              "Childhood, teenage, and adult",
              "Mental, physical, and emotional",
            ],
            correctIndex: 1,
            explanation: "ADHD has three presentations: primarily inattentive (ADHD-I), primarily hyperactive-impulsive (ADHD-H), and combined (ADHD-C). These are presentations, not fixed types, because they can shift over time.",
          },
          {
            question: "Sam often loses school supplies, forgets homework, and daydreams in class but sits quietly. Which ADHD presentation best describes Sam?",
            options: [
              "ADHD-H (Hyperactive-Impulsive)",
              "ADHD-C (Combined)",
              "ADHD-I (Inattentive)",
              "Sam does not have ADHD",
            ],
            correctIndex: 2,
            explanation: "ADHD-I (Inattentive presentation) is characterized by difficulty focusing, forgetfulness, losing things, and daydreaming, without prominent hyperactivity. It is often quieter and easier to miss.",
          },
          {
            question: "Alex cannot sit still in class, blurts out answers before questions finish, and acts before thinking. Which ADHD presentation fits best?",
            options: [
              "ADHD-I (Inattentive)",
              "ADHD-H (Hyperactive-Impulsive)",
              "ADHD-C (Combined)",
              "This is just bad behavior",
            ],
            correctIndex: 1,
            explanation: "ADHD-H (Hyperactive-Impulsive presentation) involves prominent restlessness, impulsivity, and difficulty waiting or self-regulating. It is often the most visible and noticed presentation, especially in children.",
          },
          {
            question: "Jordan struggles to focus during lessons AND cannot stop fidgeting, interrupting, and acting impulsively. Which presentation does this describe?",
            options: [
              "ADHD-I (Inattentive)",
              "ADHD-H (Hyperactive-Impulsive)",
              "ADHD-C (Combined)",
              "Two separate conditions",
            ],
            correctIndex: 2,
            explanation: "ADHD-C (Combined presentation) is when someone shows significant traits from both inattentive and hyperactive-impulsive presentations. It is the most commonly diagnosed presentation.",
          },
          {
            question: "Are ADHD presentations fixed for life?",
            options: [
              "Yes, you are born with one presentation and it never changes",
              "No, presentations are fluid and can shift with age or circumstances",
              "Yes, but only the combined presentation can change",
              "No, ADHD disappears completely by adulthood",
            ],
            correctIndex: 1,
            explanation: "ADHD presentations are fluid, not fixed labels. Someone may show hyperactive traits as a child, then shift toward primarily inattentive patterns as an adult. This is why they are called presentations rather than types.",
          },
        ],
      },
    },
  },
  {
    id: "adhd-presentations-matching",
    title: "Match the Presentation",
    type: "matching",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match each trait or pattern to the ADHD presentation it best describes",
        pairs: [
          {
            left: "Daydreams constantly, loses things, misses instructions",
            right: "ADHD-I (Inattentive)",
            matched: false,
          },
          {
            left: "Fidgets, talks excessively, blurts out answers, cannot wait",
            right: "ADHD-H (Hyperactive-Impulsive)",
            matched: false,
          },
          {
            left: "Both easily distracted AND significantly restless and impulsive",
            right: "ADHD-C (Combined)",
            matched: false,
          },
          {
            left: "Symptoms shift from high energy as a child to mostly forgetfulness as an adult",
            right: "Presentations are fluid",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "adhd-strengths",
    title: "ADHD Strengths",
    type: "sorting",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these into Strengths or Challenges",
        items: [
          {
            id: "str1",
            text: "Creative thinking and innovation",
            correctCategory: "Strengths",
          },
          {
            id: "chal1",
            text: "Time management difficulties",
            correctCategory: "Challenges",
          },
          {
            id: "str2",
            text: "High energy and enthusiasm",
            correctCategory: "Strengths",
          },
          {
            id: "chal2",
            text: "Easy distractibility",
            correctCategory: "Challenges",
          },
          {
            id: "str3",
            text: "Thinking outside the box",
            correctCategory: "Strengths",
          },
          {
            id: "str4",
            text: "Ability to hyperfocus on interesting tasks",
            correctCategory: "Strengths",
          },
          {
            id: "chal3",
            text: "Difficulty with boring tasks",
            correctCategory: "Challenges",
          },
        ],
        categories: ["Strengths", "Challenges"],
      },
    },
  },
  {
    id: "adhd-myths-sorting",
    title: "ADHD Myths vs Facts",
    type: "sorting",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these statements into Myth or Fact",
        items: [
          {
            id: "myth1",
            text: "ADHD is just an excuse for bad behavior",
            correctCategory: "Myth",
          },
          {
            id: "fact1",
            text: "ADHD is a real neurological condition",
            correctCategory: "Fact",
          },
          {
            id: "myth2",
            text: "Only children have ADHD",
            correctCategory: "Myth",
          },
          {
            id: "fact2",
            text: "ADHD continues into adulthood for most people",
            correctCategory: "Fact",
          },
          {
            id: "myth3",
            text: "If you can hyperfocus, you do not have ADHD",
            correctCategory: "Myth",
          },
          {
            id: "fact3",
            text: "Hyperfocus is actually a common ADHD trait",
            correctCategory: "Fact",
          },
        ],
        categories: ["Myth", "Fact"],
      },
    },
  },
  {
    id: "adhd-girls",
    title: "ADHD in Girls",
    type: "scenario",
    worldId: "adhd-adventure",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Maya daydreams in class, struggles to follow conversations, and feels overwhelmed by her messy room. She has never been hyperactive but feels like she cannot keep up with her peers. Her teachers describe her as quiet and polite, so nobody has raised concerns.",
        question: "Could Maya have ADHD?",
        choices: [
          {
            text: "No, because she is not hyperactive",
            isCorrect: false,
            feedback: "ADHD has different presentations. Girls more often show the inattentive presentation (ADHD-I), which has no visible hyperactivity. Being quiet does not rule out ADHD.",
          },
          {
            text: "Yes, she shows inattentive ADHD symptoms common in girls",
            isCorrect: true,
            feedback: "Correct! ADHD in girls often looks like daydreaming, disorganization, and feeling overwhelmed rather than hyperactivity. Because she is quiet and polite, her struggles are easy to overlook.",
          },
          {
            text: "She just needs to try harder to pay attention",
            isCorrect: false,
            feedback: "ADHD is not about effort. Maya's brain regulates attention differently. Girls are often told to try harder, which delays diagnosis and increases self-doubt.",
          },
        ],
        correctChoice: 1,
        explanation: "ADHD in girls often goes undiagnosed because it presents as inattention, anxiety, or overwhelm rather than hyperactivity. Girls are also more likely to mask their struggles to fit in socially. Ally tip: if a girl in your life seems overwhelmed, forgetful, or perpetually behind despite obvious effort, take it seriously and encourage her to speak to someone who understands ADHD in girls. Believing her experience is a powerful first step.",
      },
    },
  },
  {
    id: "adhd-girls-masking",
    title: "How Girls Mask ADHD",
    type: "scenario",
    worldId: "adhd-adventure",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Priya is 16 and top of her class. She spends hours re-doing homework until it is perfect, writes everything down so she does not forget, and quietly panics when plans change. At home she crashes from exhaustion. She has never been flagged for ADHD.",
        question: "What might explain Priya's experience?",
        choices: [
          {
            text: "She is just a perfectionist and an introvert",
            isCorrect: false,
            feedback: "While perfectionism and introversion exist, the level of exhaustion after intense compensating can be a sign of masking ADHD. Ally tip: if someone seems to be working three times as hard as everyone else just to keep up, ask how they are really doing - not just about results.",
          },
          {
            text: "She is masking ADHD with compensating strategies that hide her struggles",
            isCorrect: true,
            feedback: "Exactly. Many girls with ADHD develop elaborate systems (lists, perfectionism, overpreparation) to compensate. Ally tip: let her know it is okay not to have everything perfect. Reducing the pressure to mask - by accepting imperfection and checking in on how she feels, not just how she performs - can prevent burnout.",
          },
          {
            text: "She cannot have ADHD because her grades are good",
            isCorrect: false,
            feedback: "Good grades do not rule out ADHD. Many girls work twice as hard as their peers just to keep up. Ally tip: look beyond grades and ask about energy levels, anxiety, and how she feels at the end of the day - not just outcomes.",
          },
        ],
        correctChoice: 1,
        explanation: "Masking means using strategies like people-pleasing, perfectionism, or over-preparation to hide ADHD symptoms. Girls are more likely to mask than boys, which is one reason ADHD in girls is diagnosed later. Ally tip: create low-pressure spaces where she does not have to perform or compensate. Simply saying 'you do not have to have it all together around me' can be deeply relieving for someone who has been masking for years.",
      },
    },
  },
  {
    id: "adhd-girls-quiz",
    title: "ADHD in Girls: Key Facts",
    type: "quiz",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "Why is ADHD often diagnosed later in girls than in boys?",
            options: [
              "Girls actually have milder ADHD than boys",
              "Girls more often mask symptoms and show inattentive rather than hyperactive traits",
              "Girls develop ADHD later in life",
              "Doctors do not test girls for ADHD",
            ],
            correctIndex: 1,
            explanation: "Girls are more likely to show the inattentive presentation (ADHD-I) and to mask symptoms through people-pleasing, perfectionism, and social mimicry. Ally tip: if you suspect someone is masking, try asking open questions like 'how are you really finding things?' rather than assuming everything is fine because they seem to be coping.",
          },
          {
            question: "Which condition is girls with undiagnosed ADHD more likely to also develop?",
            options: [
              "Dyslexia",
              "Anxiety or depression",
              "Hyperactivity later in life",
              "Learning disabilities only",
            ],
            correctIndex: 1,
            explanation: "Girls with undiagnosed or untreated ADHD are significantly more likely to develop anxiety and depression. Ally tip: if a girl in your life is struggling with anxiety or low mood and seems to work unusually hard just to function day to day, it may be worth gently raising the possibility that ADHD could be a piece of the puzzle.",
          },
          {
            question: "What does 'social camouflaging' look like in girls with ADHD?",
            options: [
              "Hiding in social situations to avoid interaction",
              "Carefully watching and copying peers to mask difficulties with attention or impulsivity",
              "Preferring to work alone to avoid distractions",
              "Talking excessively to cover up inattention",
            ],
            correctIndex: 1,
            explanation: "Social camouflaging means carefully observing and imitating peers to blend in and hide ADHD-related struggles. It is exhausting and means real difficulties stay hidden. Ally tip: be the kind of friend who makes it safe not to perform. Authenticity and acceptance reduce the need to camouflage.",
          },
          {
            question: "Which ADHD presentation is most commonly seen in girls?",
            options: [
              "ADHD-H (Hyperactive-Impulsive)",
              "ADHD-C (Combined)",
              "ADHD-I (Inattentive)",
              "Girls show all three equally",
            ],
            correctIndex: 2,
            explanation: "Girls with ADHD are more frequently diagnosed with the inattentive presentation (ADHD-I). The hyperactive-impulsive symptoms that often lead to earlier diagnoses in boys are less prominent in many girls. Ally tip: do not assume someone needs to be bouncing off the walls to have ADHD. A quiet girl who is constantly losing things, forgetting, and struggling to keep up may need support just as much.",
          },
        ],
      },
    },
  },
  {
    id: "adhd-emotions",
    title: "Emotional Regulation",
    type: "matching",
    worldId: "adhd-adventure",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the emotional experience to the ADHD trait",
        pairs: [
          {
            left: "Feeling devastated by small criticism",
            right: "Rejection Sensitive Dysphoria (RSD)",
            matched: false,
          },
          {
            left: "Emotions feel more intense than others expect",
            right: "Emotional dysregulation",
            matched: false,
          },
          {
            left: "Going from excited to frustrated quickly",
            right: "Mood variability",
            matched: false,
          },
          {
            left: "Feeling paralyzed when overwhelmed",
            right: "Executive dysfunction",
            matched: false,
          },
          {
            left: "Difficulty waiting for things",
            right: "Impulsivity",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "adhd-support-matching",
    title: "Supporting ADHD Friends",
    type: "matching",
    worldId: "adhd-adventure",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the ADHD challenge to a helpful support strategy",
        pairs: [
          {
            left: "Difficulty starting tasks",
            right: "Body doubling - working alongside them",
            matched: false,
          },
          {
            left: "Frequently running late",
            right: "Send friendly reminder texts",
            matched: false,
          },
          {
            left: "Trouble remembering conversations",
            right: "Follow up important talks with a text summary",
            matched: false,
          },
          {
            left: "Gets overwhelmed by big projects",
            right: "Help break tasks into smaller steps",
            matched: false,
          },
        ],
      },
    },
  },
];

// Lessons for Sensory World
const sensoryLessons: Lesson[] = [
  {
    id: "sensory-intro",
    title: "What is Sensory Processing?",
    type: "scenario",
    worldId: "sensory-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "During lunch, Sam covers their ears and looks distressed. The cafeteria is loud with talking, clattering trays, and squeaking chairs.",
        question: "What is Sam likely experiencing?",
        choices: [
          {
            text: "Sam is being dramatic for attention",
            isCorrect: false,
            feedback: "Sensory overload is real and can be overwhelming. It is not about seeking attention.",
          },
          {
            text: "Sam is experiencing sensory overload from too much noise",
            isCorrect: true,
            feedback: "Correct! Some people process sensory input more intensely, making loud environments painful or overwhelming.",
          },
          {
            text: "Sam just does not like cafeteria food",
            isCorrect: false,
            feedback: "The covering of ears suggests an auditory sensitivity issue, not a food preference.",
          },
        ],
        correctChoice: 1,
        explanation: "Sensory overload occurs when the brain receives more sensory input than it can process comfortably.",
      },
    },
  },
  {
    id: "sensory-textures",
    title: "Texture Sensitivities",
    type: "scenario",
    worldId: "sensory-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Your friend refuses to wear the school sweater even when it is cold. They say it feels scratchy and unbearable, even though it seems soft to you.",
        question: "What should you understand about this?",
        choices: [
          {
            text: "They are being picky and should just wear it",
            isCorrect: false,
            feedback: "Texture sensitivities are real. What feels fine to you might genuinely feel painful to someone with sensory differences.",
          },
          {
            text: "Their brain processes textures more intensely, making it genuinely uncomfortable",
            isCorrect: true,
            feedback: "Correct! Sensory processing differences mean the same texture can feel completely different to different people.",
          },
          {
            text: "They just want attention",
            isCorrect: false,
            feedback: "Sensory sensitivities are not attention-seeking. They are real neurological experiences.",
          },
        ],
        correctChoice: 1,
        explanation: "Texture sensitivities are common and real. Supporting someone means respecting their sensory needs, not dismissing them.",
      },
    },
  },
  {
    id: "sensory-food",
    title: "Food and Sensory Needs",
    type: "scenario",
    worldId: "sensory-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "At dinner, Alex only eats certain foods and gets upset when different foods touch on their plate. Family members call them a picky eater.",
        question: "What might be happening?",
        choices: [
          {
            text: "Alex is just being difficult and needs to try new foods",
            isCorrect: false,
            feedback: "Sensory food issues go beyond being picky. Forcing foods can create anxiety and negative associations.",
          },
          {
            text: "Alex may have sensory sensitivities to textures, tastes, or food mixing",
            isCorrect: true,
            feedback: "Yes! Many people with sensory differences have strong responses to food textures, temperatures, or combinations.",
          },
          {
            text: "Alex is trying to control the family",
            isCorrect: false,
            feedback: "Sensory food needs are not about control. They are genuine neurological responses.",
          },
        ],
        correctChoice: 1,
        explanation: "Food sensitivities are common in neurodivergent people. What seems picky is often a real sensory need.",
      },
    },
  },
  {
    id: "sensory-shutdown",
    title: "Sensory Shutdowns",
    type: "scenario",
    worldId: "sensory-world",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "After a loud assembly, Jordan becomes very quiet and withdrawn. They cannot seem to respond to questions and just want to be alone in a dark room.",
        question: "What is Jordan experiencing?",
        choices: [
          {
            text: "Jordan is being antisocial and rude",
            isCorrect: false,
            feedback: "Shutdowns are involuntary responses to overwhelming input. Jordan needs space to recover.",
          },
          {
            text: "Jordan is having a sensory shutdown and needs quiet time to recover",
            isCorrect: true,
            feedback: "Correct! Sensory shutdowns happen when the brain becomes overwhelmed. Rest in a calm environment helps recovery.",
          },
          {
            text: "Jordan is just tired and should power through",
            isCorrect: false,
            feedback: "Powering through a shutdown can make things worse. Rest and reduced stimulation are what helps.",
          },
        ],
        correctChoice: 1,
        explanation: "Sensory shutdowns are the brain's protective response to overwhelm. Quiet, low-stimulation spaces help recovery.",
      },
    },
  },
  {
    id: "sensory-seeking-avoiding",
    title: "Seeking vs Avoiding",
    type: "sorting",
    worldId: "sensory-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort behaviors into Sensory Seeking or Sensory Avoiding",
        items: [
          {
            id: "seek1",
            text: "Always fidgeting or moving",
            correctCategory: "Sensory Seeking",
          },
          {
            id: "avoid1",
            text: "Covers ears in loud places",
            correctCategory: "Sensory Avoiding",
          },
          {
            id: "seek2",
            text: "Loves strong flavors and textures",
            correctCategory: "Sensory Seeking",
          },
          {
            id: "avoid2",
            text: "Dislikes certain clothing textures",
            correctCategory: "Sensory Avoiding",
          },
          {
            id: "seek3",
            text: "Enjoys spinning or movement",
            correctCategory: "Sensory Seeking",
          },
          {
            id: "avoid3",
            text: "Prefers dim lighting",
            correctCategory: "Sensory Avoiding",
          },
          {
            id: "seek4",
            text: "Likes deep pressure hugs",
            correctCategory: "Sensory Seeking",
          },
        ],
        categories: ["Sensory Seeking", "Sensory Avoiding"],
      },
    },
  },
  {
    id: "sensory-senses-sorting",
    title: "The Eight Senses",
    type: "sorting",
    worldId: "sensory-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these into the five main senses or the three hidden senses",
        items: [
          {
            id: "main1",
            text: "Sight (visual)",
            correctCategory: "Main Senses",
          },
          {
            id: "main2",
            text: "Hearing (auditory)",
            correctCategory: "Main Senses",
          },
          {
            id: "hidden1",
            text: "Proprioception (body awareness)",
            correctCategory: "Hidden Senses",
          },
          {
            id: "hidden2",
            text: "Vestibular (balance and movement)",
            correctCategory: "Hidden Senses",
          },
          {
            id: "main3",
            text: "Touch (tactile)",
            correctCategory: "Main Senses",
          },
          {
            id: "hidden3",
            text: "Interoception (internal body signals)",
            correctCategory: "Hidden Senses",
          },
        ],
        categories: ["Main Senses", "Hidden Senses"],
      },
    },
  },
  {
    id: "sensory-tools",
    title: "Sensory Tools & Support",
    type: "matching",
    worldId: "sensory-world",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the sensory need to the helpful tool",
        pairs: [
          {
            left: "Overwhelmed by noise",
            right: "Noise-canceling headphones",
            matched: false,
          },
          {
            left: "Needs movement input",
            right: "Fidget toys or movement breaks",
            matched: false,
          },
          {
            left: "Sensitive to bright lights",
            right: "Dimmer lighting or sunglasses",
            matched: false,
          },
          {
            left: "Needs deep pressure",
            right: "Weighted blanket or compression clothing",
            matched: false,
          },
          {
            left: "Oral sensory needs",
            right: "Chewy jewelry or crunchy snacks",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "sensory-environments-matching",
    title: "Creating Sensory-Friendly Spaces",
    type: "matching",
    worldId: "sensory-world",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the environment to sensory-friendly modifications",
        pairs: [
          {
            left: "Classroom",
            right: "Provide quiet corners and fidget options",
            matched: false,
          },
          {
            left: "Birthday party",
            right: "Have a calm room available for breaks",
            matched: false,
          },
          {
            left: "Movie theater",
            right: "Sensory-friendly screenings with lights up and sound down",
            matched: false,
          },
          {
            left: "Shopping mall",
            right: "Visit during quiet hours, use noise-canceling headphones",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "sensory-quiz",
    title: "Sensory Processing Quiz",
    type: "quiz",
    worldId: "sensory-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What is sensory overload?",
            options: [
              "Being bored by too little stimulation",
              "The brain receiving more sensory input than it can process",
              "A type of tantrum",
              "Something that only happens to children",
            ],
            correctIndex: 1,
            explanation: "Sensory overload happens when the brain cannot process all the sensory information it receives. It can feel overwhelming or painful.",
          },
          {
            question: "Can someone be both sensory seeking AND sensory avoiding?",
            options: [
              "No, you are either one or the other",
              "Yes, people can seek some inputs while avoiding others",
              "Only children can be both",
              "This is not possible",
            ],
            correctIndex: 1,
            explanation: "Many people are sensory seeking in some areas (like movement) while sensory avoiding in others (like loud sounds). It varies by sense.",
          },
          {
            question: "What is the best way to help someone in sensory overload?",
            options: [
              "Tell them to calm down",
              "Reduce sensory input and give them space",
              "Distract them with something interesting",
              "Ignore them until they feel better",
            ],
            correctIndex: 1,
            explanation: "Reducing sensory input (quieter, dimmer, less crowded) and giving space helps the brain recover from overload.",
          },
        ],
      },
    },
  },
  {
    id: "sensory-interoception-quiz",
    title: "Understanding Interoception",
    type: "quiz",
    worldId: "sensory-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What is interoception?",
            options: [
              "The sense of balance",
              "The ability to sense internal body signals like hunger and temperature",
              "The sense of touch",
              "The ability to see in the dark",
            ],
            correctIndex: 1,
            explanation: "Interoception is our sense of internal body signals - hunger, thirst, temperature, needing the bathroom, and emotions.",
          },
          {
            question: "Why might someone with interoception differences forget to eat?",
            options: [
              "They do not like food",
              "They do not feel hunger signals as strongly",
              "They are too lazy to eat",
              "They are trying to lose weight",
            ],
            correctIndex: 1,
            explanation: "When interoception is different, internal signals like hunger may be weaker or harder to notice. Scheduled meals can help.",
          },
        ],
      },
    },
  },
];

// Lessons for Communication Forest
const communicationLessons: Lesson[] = [
  {
    id: "comm-styles",
    title: "Different Communication Styles",
    type: "scenario",
    worldId: "communication-forest",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "You ask Taylor if they want to hang out. They say yes but look uncomfortable and avoid eye contact. Later, they cancel.",
        question: "What might be happening?",
        choices: [
          {
            text: "Taylor was lying and never wanted to hang out",
            isCorrect: false,
            feedback: "Taylor might have difficulty saying no directly or felt pressured. This is not the same as lying.",
          },
          {
            text: "Taylor may struggle with direct communication or felt overwhelmed",
            isCorrect: true,
            feedback: "Yes! Some people find it hard to say no directly or may initially agree but then realize they need alone time.",
          },
          {
            text: "Taylor is a bad friend",
            isCorrect: false,
            feedback: "Different communication styles do not make someone a bad friend. Understanding helps build better connections.",
          },
        ],
        correctChoice: 1,
        explanation: "Not everyone communicates the same way. Some people need more time to process their feelings or struggle with saying no directly.",
      },
    },
  },
  {
    id: "comm-direct",
    title: "Direct vs Indirect Communication",
    type: "scenario",
    worldId: "communication-forest",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "You hint to Morgan that you want help with a project by saying 'This project is really hard.' Morgan says 'Yeah, it is' and walks away.",
        question: "What happened here?",
        choices: [
          {
            text: "Morgan was being mean and unhelpful",
            isCorrect: false,
            feedback: "Morgan likely did not understand the hint. They responded literally to what you said.",
          },
          {
            text: "Morgan may process communication literally and did not understand your hint",
            isCorrect: true,
            feedback: "Correct! If you need help, saying 'Can you help me with this project?' would be clearer for Morgan.",
          },
          {
            text: "Morgan does not want to be your friend",
            isCorrect: false,
            feedback: "This is a communication style difference, not a reflection of friendship. Direct requests work better.",
          },
        ],
        correctChoice: 1,
        explanation: "Many neurodivergent people communicate and understand language literally. Direct, clear requests help everyone.",
      },
    },
  },
  {
    id: "comm-processing",
    title: "Processing Time",
    type: "scenario",
    worldId: "communication-forest",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "You ask Jamie a question and they pause for a long time before answering. You start to repeat the question, thinking they did not hear.",
        question: "What might be happening?",
        choices: [
          {
            text: "Jamie was not listening and needs the question repeated",
            isCorrect: false,
            feedback: "The pause might be processing time. Repeating too quickly can actually disrupt their thinking.",
          },
          {
            text: "Jamie needs extra time to process the question before responding",
            isCorrect: true,
            feedback: "Yes! Many people need more time to process information. Waiting patiently shows respect for their communication style.",
          },
          {
            text: "Jamie is ignoring you",
            isCorrect: false,
            feedback: "Processing time is not ignoring. Jamie is actively thinking about their response.",
          },
        ],
        correctChoice: 1,
        explanation: "Processing time varies between people. Giving someone space to think without rushing shows understanding and respect.",
      },
    },
  },
  {
    id: "comm-aac",
    title: "Alternative Communication",
    type: "scenario",
    worldId: "communication-forest",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "You meet a new student who uses a tablet to communicate instead of speaking. Some classmates think this is strange.",
        question: "How should you view AAC (Augmentative and Alternative Communication)?",
        choices: [
          {
            text: "Speaking is the only real communication",
            isCorrect: false,
            feedback: "Communication takes many forms. AAC is just as valid and meaningful as spoken words.",
          },
          {
            text: "AAC is a valid and important way to communicate that deserves respect",
            isCorrect: true,
            feedback: "Correct! Whether someone speaks, types, signs, or uses pictures, all communication is valid.",
          },
          {
            text: "They should learn to speak normally",
            isCorrect: false,
            feedback: "There is no normal way to communicate. AAC users are communicating in the way that works best for them.",
          },
        ],
        correctChoice: 1,
        explanation: "AAC includes devices, sign language, and picture boards. All forms of communication deserve equal respect.",
      },
    },
  },
  {
    id: "comm-literal",
    title: "Literal vs Figurative Language",
    type: "quiz",
    worldId: "communication-forest",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "Why might someone take figurative language literally?",
            options: [
              "They are not smart enough to understand",
              "Their brain processes language more concretely",
              "They are not paying attention",
              "They are trying to be difficult",
            ],
            correctIndex: 1,
            explanation: "Many neurodivergent people process language literally. Saying exactly what you mean helps everyone communicate better.",
          },
          {
            question: "How can you make communication clearer?",
            options: [
              "Use more idioms and metaphors",
              "Speak faster so they have to pay attention",
              "Be direct and say exactly what you mean",
              "Use complicated vocabulary",
            ],
            correctIndex: 2,
            explanation: "Clear, direct communication helps everyone understand. Avoid idioms when possible or explain them.",
          },
          {
            question: "If someone says 'it is raining cats and dogs,' a literal thinker might:",
            options: [
              "Be confused or take it literally at first",
              "Automatically understand the metaphor",
              "Get angry at you",
              "Ignore you completely",
            ],
            correctIndex: 0,
            explanation: "Literal thinkers may initially picture actual cats and dogs falling. Explaining idioms or using clear language helps.",
          },
        ],
      },
    },
  },
  {
    id: "comm-social-quiz",
    title: "Social Communication Quiz",
    type: "quiz",
    worldId: "communication-forest",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What is small talk and why might it be challenging for some people?",
            options: [
              "Talking in a small voice - it is hard to hear",
              "Brief casual conversation - it can feel pointless or confusing for literal thinkers",
              "Talking about small things - everyone finds it easy",
              "Whispering - only shy people struggle with it",
            ],
            correctIndex: 1,
            explanation: "Small talk is casual conversation about unimportant topics. Some neurodivergent people prefer meaningful conversations.",
          },
          {
            question: "How can you be a good communication ally?",
            options: [
              "Always speak for neurodivergent people",
              "Adapt your communication style to what works for them",
              "Assume everyone communicates the same way",
              "Only use text communication",
            ],
            correctIndex: 1,
            explanation: "Being a good ally means learning how someone prefers to communicate and adapting when you can.",
          },
        ],
      },
    },
  },
  {
    id: "comm-matching",
    title: "Communication Adaptations",
    type: "matching",
    worldId: "communication-forest",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the communication need to the helpful adaptation",
        pairs: [
          {
            left: "Prefers written communication",
            right: "Text instead of calling",
            matched: false,
          },
          {
            left: "Needs processing time",
            right: "Wait patiently for responses",
            matched: false,
          },
          {
            left: "Takes language literally",
            right: "Be direct and avoid idioms",
            matched: false,
          },
          {
            left: "Struggles with phone calls",
            right: "Send information by email first",
            matched: false,
          },
          {
            left: "Gets overwhelmed in groups",
            right: "Have one-on-one conversations instead",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "comm-body-language",
    title: "Body Language Differences",
    type: "sorting",
    worldId: "communication-forest",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these into Neurotypical Expectations or Neurodivergent Realities",
        items: [
          {
            id: "exp1",
            text: "Eye contact shows you are listening",
            correctCategory: "Neurotypical Expectations",
          },
          {
            id: "real1",
            text: "Some people listen better without eye contact",
            correctCategory: "Neurodivergent Realities",
          },
          {
            id: "exp2",
            text: "Sitting still means paying attention",
            correctCategory: "Neurotypical Expectations",
          },
          {
            id: "real2",
            text: "Some people focus better while moving or fidgeting",
            correctCategory: "Neurodivergent Realities",
          },
          {
            id: "exp3",
            text: "Quick responses show engagement",
            correctCategory: "Neurotypical Expectations",
          },
          {
            id: "real3",
            text: "Processing time does not mean disinterest",
            correctCategory: "Neurodivergent Realities",
          },
        ],
        categories: ["Neurotypical Expectations", "Neurodivergent Realities"],
      },
    },
  },
];

// Lessons for Executive Function Mountain
const executiveLessons: Lesson[] = [
  {
    id: "exec-intro",
    title: "What is Executive Function?",
    type: "scenario",
    worldId: "executive-function",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Riley knows they have a project due Friday but cannot seem to start it. They keep getting distracted and do not know where to begin.",
        question: "What executive function challenge might Riley be facing?",
        choices: [
          {
            text: "Riley is procrastinating because they are lazy",
            isCorrect: false,
            feedback: "Executive dysfunction is not laziness. The brain struggles with initiation, planning, and task management.",
          },
          {
            text: "Riley has difficulty with task initiation and planning",
            isCorrect: true,
            feedback: "Exactly! Executive function helps us start tasks, plan steps, and manage time. When it is impaired, these become very difficult.",
          },
          {
            text: "Riley just does not care about school",
            isCorrect: false,
            feedback: "Caring and being able to execute are different things. Executive dysfunction can affect anyone, regardless of motivation.",
          },
        ],
        correctChoice: 1,
        explanation: "Executive function is like the brain's management system. When it is not working well, even simple tasks can feel impossible to start.",
      },
    },
  },
  {
    id: "exec-task-paralysis",
    title: "Task Paralysis",
    type: "scenario",
    worldId: "executive-function",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Alex has a messy room and really wants to clean it. But when they look at the mess, they feel frozen and cannot figure out where to start.",
        question: "What is Alex experiencing?",
        choices: [
          {
            text: "Alex is just lazy and does not want to clean",
            isCorrect: false,
            feedback: "Alex wants to clean! The brain is struggling to break down the task into manageable steps.",
          },
          {
            text: "Alex is experiencing task paralysis from executive dysfunction",
            isCorrect: true,
            feedback: "Correct! Task paralysis happens when a task feels too big to start. Breaking it into tiny steps can help.",
          },
          {
            text: "Alex should just start anywhere",
            isCorrect: false,
            feedback: "For someone with executive dysfunction, just starting anywhere is exactly what is difficult.",
          },
        ],
        correctChoice: 1,
        explanation: "Task paralysis is when the brain gets overwhelmed by the scope of a task. External structure and tiny first steps help.",
      },
    },
  },
  {
    id: "exec-transitions",
    title: "Transition Difficulties",
    type: "scenario",
    worldId: "executive-function",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "It is time to leave for school but Jordan is still playing a video game. Even though they know they need to stop, they seem unable to transition away from the game.",
        question: "What executive function skill is Jordan struggling with?",
        choices: [
          {
            text: "Jordan is being defiant and does not want to go to school",
            isCorrect: false,
            feedback: "Transition difficulties are real. Jordan may want to stop but their brain struggles to shift activities.",
          },
          {
            text: "Jordan struggles with task switching and transitions",
            isCorrect: true,
            feedback: "Yes! Executive function helps us shift between tasks. Warnings like '5 more minutes' can help ease transitions.",
          },
          {
            text: "Jordan is addicted to video games",
            isCorrect: false,
            feedback: "This is likely an executive function issue, not addiction. The brain has trouble disengaging from one activity.",
          },
        ],
        correctChoice: 1,
        explanation: "Task switching requires executive function. Advance warnings and transition routines can make shifting activities easier.",
      },
    },
  },
  {
    id: "exec-working-memory",
    title: "Working Memory Challenges",
    type: "scenario",
    worldId: "executive-function",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Morgan went upstairs to get something but by the time they got there, they forgot why they went up. This happens multiple times a day.",
        question: "What is happening with Morgan?",
        choices: [
          {
            text: "Morgan has a serious memory problem",
            isCorrect: false,
            feedback: "This is working memory, not long-term memory. It is common and manageable with strategies.",
          },
          {
            text: "Morgan has working memory differences common in neurodivergent people",
            isCorrect: true,
            feedback: "Correct! Working memory holds information temporarily. External aids like notes and verbal reminders help.",
          },
          {
            text: "Morgan is not paying attention to life",
            isCorrect: false,
            feedback: "Working memory differences are not about attention. The brain just processes information differently.",
          },
        ],
        correctChoice: 1,
        explanation: "Working memory is like the brain's sticky note. Some brains need external supports like actual sticky notes to help.",
      },
    },
  },
  {
    id: "exec-strategies",
    title: "Supporting Executive Function",
    type: "matching",
    worldId: "executive-function",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the challenge to a helpful strategy",
        pairs: [
          {
            left: "Cannot start tasks",
            right: "Break into tiny first steps",
            matched: false,
          },
          {
            left: "Loses track of time",
            right: "Use timers and visual schedules",
            matched: false,
          },
          {
            left: "Forgets important things",
            right: "Create checklists and reminders",
            matched: false,
          },
          {
            left: "Difficulty transitioning between tasks",
            right: "Give advance warnings (5 minutes left)",
            matched: false,
          },
          {
            left: "Gets overwhelmed by big projects",
            right: "Break into smaller milestones with deadlines",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "exec-tools-matching",
    title: "Executive Function Tools",
    type: "matching",
    worldId: "executive-function",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the executive function need to the helpful tool",
        pairs: [
          {
            left: "Planning and scheduling",
            right: "Calendar apps with reminders",
            matched: false,
          },
          {
            left: "Remembering tasks",
            right: "To-do list apps",
            matched: false,
          },
          {
            left: "Staying focused",
            right: "Pomodoro timer technique",
            matched: false,
          },
          {
            left: "Morning routines",
            right: "Visual checklists by the door",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "exec-skills-sorting",
    title: "Executive Function Skills",
    type: "sorting",
    worldId: "executive-function",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these into Executive Function Skills or Other Skills",
        items: [
          {
            id: "ef1",
            text: "Planning and organization",
            correctCategory: "Executive Function Skills",
          },
          {
            id: "ef2",
            text: "Working memory",
            correctCategory: "Executive Function Skills",
          },
          {
            id: "ef3",
            text: "Impulse control",
            correctCategory: "Executive Function Skills",
          },
          {
            id: "other1",
            text: "Physical strength",
            correctCategory: "Other Skills",
          },
          {
            id: "ef4",
            text: "Time management",
            correctCategory: "Executive Function Skills",
          },
          {
            id: "ef5",
            text: "Emotional regulation",
            correctCategory: "Executive Function Skills",
          },
          {
            id: "other2",
            text: "Artistic talent",
            correctCategory: "Other Skills",
          },
        ],
        categories: ["Executive Function Skills", "Other Skills"],
      },
    },
  },
  {
    id: "exec-quiz",
    title: "Executive Function Quiz",
    type: "quiz",
    worldId: "executive-function",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What is executive function?",
            options: [
              "Physical fitness and coordination",
              "The brain's management system for planning, organizing, and completing tasks",
              "Intelligence and IQ",
              "Social skills and popularity",
            ],
            correctIndex: 1,
            explanation: "Executive function is the brain's management system. It controls planning, organization, time management, and task completion.",
          },
          {
            question: "Is executive dysfunction the same as laziness?",
            options: [
              "Yes, people just need to try harder",
              "No, it is a real neurological difference that requires support and strategies",
              "Only sometimes",
              "Only in adults",
            ],
            correctIndex: 1,
            explanation: "Executive dysfunction is not laziness. It is a real neurological difference. People with EF challenges often try very hard.",
          },
          {
            question: "What is body doubling?",
            options: [
              "Having two bodies",
              "Working alongside someone else to help with task initiation",
              "Copying someone else's work",
              "A type of exercise",
            ],
            correctIndex: 1,
            explanation: "Body doubling is when having another person present helps someone start or complete tasks. The other person does not need to help, just be there.",
          },
        ],
      },
    },
  },
  {
    id: "exec-strategies-quiz",
    title: "Strategies That Help",
    type: "quiz",
    worldId: "executive-function",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "Why does breaking tasks into small steps help?",
            options: [
              "It makes the task take longer",
              "It makes each step feel manageable and less overwhelming",
              "It confuses the brain more",
              "It does not actually help",
            ],
            correctIndex: 1,
            explanation: "Small steps reduce overwhelm and make it easier for the brain to know exactly what to do next.",
          },
          {
            question: "What is the best way to help someone with executive dysfunction?",
            options: [
              "Tell them to just try harder",
              "Offer external structure and support without judgment",
              "Do everything for them",
              "Ignore their struggles",
            ],
            correctIndex: 1,
            explanation: "Offering support like reminders, helping break down tasks, or being a body double helps without taking away their autonomy.",
          },
        ],
      },
    },
  },
];

// Lessons for Strengths Arena
const strengthsLessons: Lesson[] = [
  {
    id: "strengths-reframe",
    title: "Reframing Traits as Strengths",
    type: "sorting",
    worldId: "strengths-arena",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "These traits can be both! Sort them by their strength perspective",
        items: [
          {
            id: "s1",
            text: "Attention to detail",
            correctCategory: "Strength",
          },
          {
            id: "s2",
            text: "Passionate about interests",
            correctCategory: "Strength",
          },
          {
            id: "s3",
            text: "Thinks differently and creatively",
            correctCategory: "Strength",
          },
          {
            id: "s4",
            text: "Honest and direct communication",
            correctCategory: "Strength",
          },
          {
            id: "s5",
            text: "High empathy for others' feelings",
            correctCategory: "Strength",
          },
          {
            id: "s6",
            text: "Ability to hyperfocus",
            correctCategory: "Strength",
          },
          {
            id: "s7",
            text: "Pattern recognition",
            correctCategory: "Strength",
          },
        ],
        categories: ["Strength", "Challenge"],
      },
    },
  },
  {
    id: "strengths-careers-sorting",
    title: "Neurodivergent-Friendly Careers",
    type: "sorting",
    worldId: "strengths-arena",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these careers by which neurodivergent strength they often utilize",
        items: [
          {
            id: "c1",
            text: "Software Developer (pattern recognition, focus)",
            correctCategory: "Detail & Pattern Skills",
          },
          {
            id: "c2",
            text: "Artist or Designer (creative thinking)",
            correctCategory: "Creative Skills",
          },
          {
            id: "c3",
            text: "Researcher (deep focus on interests)",
            correctCategory: "Detail & Pattern Skills",
          },
          {
            id: "c4",
            text: "Entrepreneur (thinking outside the box)",
            correctCategory: "Creative Skills",
          },
          {
            id: "c5",
            text: "Data Analyst (attention to detail)",
            correctCategory: "Detail & Pattern Skills",
          },
          {
            id: "c6",
            text: "Musician (pattern recognition, creativity)",
            correctCategory: "Creative Skills",
          },
        ],
        categories: ["Detail & Pattern Skills", "Creative Skills"],
      },
    },
  },
  {
    id: "strengths-examples",
    title: "Famous Neurodivergent People",
    type: "quiz",
    worldId: "strengths-arena",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What do Temple Grandin, Simone Biles, and many innovators have in common?",
            options: [
              "They all play the same sport",
              "They are neurodivergent and successful in their fields",
              "They all live in the same country",
              "They went to the same school",
            ],
            correctIndex: 1,
            explanation: "Many successful people are neurodivergent! Their different ways of thinking contribute to innovation, creativity, and excellence.",
          },
          {
            question: "Why do many successful entrepreneurs have ADHD?",
            options: [
              "It is just a coincidence",
              "ADHD traits like creativity, risk-taking, and hyperfocus can be business strengths",
              "They are less successful than others",
              "Entrepreneurs do not have ADHD",
            ],
            correctIndex: 1,
            explanation: "Many entrepreneurs credit their ADHD traits - like creative thinking, willingness to take risks, and hyperfocus - for their success.",
          },
          {
            question: "What strength do many autistic people bring to scientific fields?",
            options: [
              "They avoid science",
              "Detail orientation, pattern recognition, and deep focus on interests",
              "They are only good at art",
              "There is no connection between autism and science",
            ],
            correctIndex: 1,
            explanation: "Many autistic scientists credit their ability to see details, recognize patterns, and deeply focus for breakthrough discoveries.",
          },
        ],
      },
    },
  },
  {
    id: "strengths-identify-quiz",
    title: "Identifying Strengths",
    type: "quiz",
    worldId: "strengths-arena",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "How can you help a neurodivergent friend see their strengths?",
            options: [
              "Focus on what they struggle with",
              "Notice and name specific things they do well",
              "Compare them to neurotypical peers",
              "Tell them to be more normal",
            ],
            correctIndex: 1,
            explanation: "Pointing out specific strengths helps people recognize their own value. Everyone has unique abilities.",
          },
          {
            question: "Why is it important to see neurodivergence as different, not less?",
            options: [
              "It is not important",
              "Because different minds contribute different valuable perspectives to the world",
              "Because neurodivergent people are always better",
              "Because differences do not matter",
            ],
            correctIndex: 1,
            explanation: "Different perspectives lead to innovation and better solutions. The world needs diverse thinkers.",
          },
        ],
      },
    },
  },
  {
    id: "strengths-scenario",
    title: "Strength in Action",
    type: "scenario",
    worldId: "strengths-arena",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "In a group project, Jamie (who is autistic) notices a small error in the data that everyone else missed. This error would have caused the whole project to fail.",
        question: "What strength did Jamie demonstrate?",
        choices: [
          {
            text: "Jamie got lucky",
            isCorrect: false,
            feedback: "This was not luck - it was a genuine skill. Attention to detail is a valuable neurodivergent strength.",
          },
          {
            text: "Jamie showed exceptional attention to detail and pattern recognition",
            isCorrect: true,
            feedback: "Exactly! Many neurodivergent people have keen attention to detail that catches things others miss.",
          },
          {
            text: "Jamie was just being picky",
            isCorrect: false,
            feedback: "Catching errors is not being picky - it is a valuable skill that saved the project!",
          },
        ],
        correctChoice: 1,
        explanation: "Attention to detail is a superpower. Many neurodivergent people excel at quality control, debugging, and finding errors.",
      },
    },
  },
  {
    id: "strengths-creativity-scenario",
    title: "Creative Problem Solving",
    type: "scenario",
    worldId: "strengths-arena",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "The class is stuck on a problem. Everyone keeps trying the same approaches. Then Casey (who has ADHD) suggests a completely different method that works perfectly.",
        question: "What strength did Casey demonstrate?",
        choices: [
          {
            text: "Casey was just guessing randomly",
            isCorrect: false,
            feedback: "Thinking outside the box is a genuine cognitive strength, not random guessing.",
          },
          {
            text: "Casey showed creative thinking and the ability to see problems from new angles",
            isCorrect: true,
            feedback: "Yes! Divergent thinking and creativity are common ADHD strengths. Seeing problems differently leads to innovative solutions.",
          },
          {
            text: "Casey just got lucky this time",
            isCorrect: false,
            feedback: "This is a pattern, not luck. Many neurodivergent people consistently bring fresh perspectives.",
          },
        ],
        correctChoice: 1,
        explanation: "Divergent thinking - seeing problems from unexpected angles - is a valuable neurodivergent strength that drives innovation.",
      },
    },
  },
  {
    id: "strengths-matching",
    title: "Strengths and Careers",
    type: "matching",
    worldId: "strengths-arena",
    xpReward: 15,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match the neurodivergent strength to a career that uses it",
        pairs: [
          {
            left: "Intense focus and deep knowledge",
            right: "Researcher or specialist",
            matched: false,
          },
          {
            left: "Creative and divergent thinking",
            right: "Entrepreneur or designer",
            matched: false,
          },
          {
            left: "Attention to detail and patterns",
            right: "Quality assurance or data analyst",
            matched: false,
          },
          {
            left: "Strong sense of justice and honesty",
            right: "Advocate or journalist",
            matched: false,
          },
          {
            left: "Ability to hyperfocus on interesting work",
            right: "Programmer or artist",
            matched: false,
          },
        ],
      },
    },
  },
];

// Lessons for Tourette Syndrome World
const tourettesLessons: Lesson[] = [
  {
    id: "tourettes-intro",
    title: "Understanding Tourette Syndrome",
    type: "scenario",
    worldId: "tourettes-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "During class, your classmate Sam suddenly blinks rapidly, clears their throat loudly, and shrugs their shoulder repeatedly. This happens several times. Another student starts giggling.",
        question: "What is most likely happening with Sam?",
        choices: [
          {
            text: "Sam is doing it for attention",
            isCorrect: false,
            feedback: "Tics are involuntary - Sam cannot simply choose to stop them. Tics are neurological, not attention-seeking behavior. Laughing or drawing attention makes it significantly worse.",
          },
          {
            text: "Sam has tics, which are involuntary movements or sounds caused by Tourette Syndrome",
            isCorrect: true,
            feedback: "Correct! Tics are sudden, repetitive, involuntary movements or sounds. Sam cannot control them the way you control deliberate actions. Ally tip: the kindest response is to carry on normally - not staring, commenting, or laughing helps Sam feel far less self-conscious.",
          },
          {
            text: "Sam is being deliberately disruptive",
            isCorrect: false,
            feedback: "Tics are not intentional. People with Tourette Syndrome often feel embarrassed by their tics and work hard to manage them. Treating tics as deliberate misbehavior is hurtful and factually wrong.",
          },
        ],
        correctChoice: 1,
        explanation: "Tourette Syndrome (TS) is a neurological condition involving involuntary repetitive movements and sounds called tics. Ally tip: act naturally around someone who is ticcing. Carrying on the conversation without making it a moment helps the person feel included rather than watched.",
      },
    },
  },
  {
    id: "tourettes-tic-types",
    title: "Types of Tics",
    type: "quiz",
    worldId: "tourettes-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What are the two main categories of tics in Tourette Syndrome?",
            options: [
              "Loud and quiet",
              "Motor (movement) and vocal (sound)",
              "Fast and slow",
              "Visible and hidden",
            ],
            correctIndex: 1,
            explanation: "Tics are classified as motor tics (body movements like blinking, head jerking, or shoulder shrugging) and vocal tics (sounds like throat clearing, sniffing, or words). Most people with TS have both types, and they can change over time.",
          },
          {
            question: "Which is an example of a simple motor tic?",
            options: [
              "Acting out a sequence of movements in order",
              "Eye blinking or nose twitching",
              "Repeating full sentences",
              "Copying other people's actions",
            ],
            correctIndex: 1,
            explanation: "Simple motor tics involve a single brief movement like eye blinking or nose twitching. Complex motor tics involve sequences of movements. Both are involuntary, and simple tics are far more common than complex ones.",
          },
          {
            question: "What percentage of people with Tourette Syndrome experience coprolalia - the involuntary use of offensive words?",
            options: [
              "Almost everyone with TS",
              "About half of people with TS",
              "Only around 10 to 15 percent",
              "Nobody - it is a myth",
            ],
            correctIndex: 2,
            explanation: "Coprolalia is one of the most commonly portrayed TS symptoms in TV and films, but only about 10-15% of people with TS actually experience it. Most tics are subtle things like blinking, throat clearing, or small movements. Media portrayals have created a very misleading picture.",
          },
        ],
      },
    },
  },
  {
    id: "tourettes-suppression",
    title: "Can Tics Be Stopped?",
    type: "scenario",
    worldId: "tourettes-world",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "During a quiet exam, Jordan keeps making a soft clicking sound. The teacher says 'just stop making that noise.' Jordan looks distressed and concentrates hard on suppressing the tic - but after a few minutes the tics return, more intense than before.",
        question: "What is happening here?",
        choices: [
          {
            text: "Jordan is not trying hard enough",
            isCorrect: false,
            feedback: "Tics can sometimes be suppressed briefly, but this takes significant mental effort and often causes a rebound - tics come back more strongly afterward. Asking someone to suppress tics is like asking them to hold their breath indefinitely.",
          },
          {
            text: "Jordan is suppressing tics temporarily, which is exhausting and causes a rebound",
            isCorrect: true,
            feedback: "Exactly. Some people with TS can suppress tics for a short time, but it requires intense concentration and the tics often return with more force. The mental energy used suppressing tics is energy unavailable for the actual exam. Ally tip: where possible, advocate for a quiet separate space for exams rather than expecting tic suppression.",
          },
          {
            text: "The teacher is right - Jordan just needs more practice staying quiet",
            isCorrect: false,
            feedback: "Tics are neurological, not behavioral. Expecting someone to practice suppressing tics is like expecting someone to practice not sneezing. It does not work and causes significant distress and shame.",
          },
        ],
        correctChoice: 1,
        explanation: "Tic suppression is possible briefly but comes at a real cost. Many people with TS describe it like holding back a sneeze - uncomfortable, exhausting, and followed by a stronger release. Ally tip: if you see someone being told to 'just stop it', a calm private word explaining that tics are involuntary can help both the person with TS and whoever gave the instruction.",
      },
    },
  },
  {
    id: "tourettes-triggers",
    title: "Tics and Triggers",
    type: "sorting",
    worldId: "tourettes-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these into things that typically make tics WORSE or things that can help tics EASE",
        items: [
          {
            id: "tt1",
            text: "High stress or anxiety",
            correctCategory: "Makes tics worse",
          },
          {
            id: "tt2",
            text: "Calm, low-pressure environments",
            correctCategory: "Helps tics ease",
          },
          {
            id: "tt3",
            text: "Intense excitement",
            correctCategory: "Makes tics worse",
          },
          {
            id: "tt4",
            text: "Deep focus on an absorbing activity",
            correctCategory: "Helps tics ease",
          },
          {
            id: "tt5",
            text: "Being watched or pointed out",
            correctCategory: "Makes tics worse",
          },
          {
            id: "tt6",
            text: "Adequate sleep and rest",
            correctCategory: "Helps tics ease",
          },
          {
            id: "tt7",
            text: "Fatigue and exhaustion",
            correctCategory: "Makes tics worse",
          },
        ],
        categories: ["Makes tics worse", "Helps tics ease"],
      },
    },
  },
  {
    id: "tourettes-myths",
    title: "Tourette Myths vs Facts",
    type: "sorting",
    worldId: "tourettes-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these statements into Myth or Fact",
        items: [
          {
            id: "tm1",
            text: "Everyone with Tourette Syndrome constantly swears",
            correctCategory: "Myth",
          },
          {
            id: "tf1",
            text: "Involuntary swearing only affects around 10-15% of people with TS",
            correctCategory: "Fact",
          },
          {
            id: "tm2",
            text: "Tics can always be controlled with enough willpower",
            correctCategory: "Myth",
          },
          {
            id: "tf2",
            text: "Tics are involuntary and suppression is exhausting and only temporary",
            correctCategory: "Fact",
          },
          {
            id: "tm3",
            text: "People with Tourette Syndrome cannot have successful careers",
            correctCategory: "Myth",
          },
          {
            id: "tf3",
            text: "ADHD and OCD commonly co-occur with Tourette Syndrome",
            correctCategory: "Fact",
          },
          {
            id: "tm4",
            text: "Tourette Syndrome gets worse throughout life",
            correctCategory: "Myth",
          },
          {
            id: "tf4",
            text: "Tics often peak in childhood and ease significantly for many people in adulthood",
            correctCategory: "Fact",
          },
        ],
        categories: ["Myth", "Fact"],
      },
    },
  },
  {
    id: "tourettes-cooccurring",
    title: "Beyond the Tics",
    type: "quiz",
    worldId: "tourettes-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "Which conditions most commonly co-occur with Tourette Syndrome?",
            options: [
              "Only physical conditions like asthma",
              "ADHD and OCD are among the most common",
              "Hearing loss and vision problems",
              "Tourette Syndrome never co-occurs with other conditions",
            ],
            correctIndex: 1,
            explanation: "ADHD occurs in around 50-60% of people with TS, and OCD in around 50%. Anxiety is also common. This means supporting someone with TS often involves understanding these overlapping conditions too - not just the tics.",
          },
          {
            question: "What is the premonitory urge that most people with TS describe?",
            options: [
              "A warning sign visible to others that a tic is coming",
              "An uncomfortable building sensation just before a tic that is relieved by releasing it",
              "The feeling of relief after successfully suppressing a tic",
              "A signal that medication needs adjusting",
            ],
            correctIndex: 1,
            explanation: "Most people with TS describe a premonitory urge - an uncomfortable, building sensation like an itch or pressure right before a tic. Releasing the tic relieves that urge. This is why suppression is so mentally taxing: it means resisting a constantly building discomfort.",
          },
          {
            question: "How do tics typically change as someone with TS grows up?",
            options: [
              "Tics always get more severe with age",
              "Tics often peak around ages 10-12 and ease for many people in late adolescence and adulthood",
              "Tics never change throughout life",
              "Tics disappear completely by age 10 for everyone",
            ],
            correctIndex: 1,
            explanation: "Tics often peak between ages 10-12 and improve significantly by late adolescence or adulthood for many - though not all - people with TS. This is important to share with young people who are struggling: for many, things do get easier.",
          },
        ],
      },
    },
  },
  {
    id: "tourettes-support",
    title: "Being a Tourette Ally",
    type: "matching",
    worldId: "tourettes-world",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match each situation to the most supportive ally response",
        pairs: [
          {
            left: "A classmate tics during a presentation",
            right: "Continue listening normally without drawing attention to it",
            matched: false,
          },
          {
            left: "Someone asks why your friend makes those sounds",
            right: "Explain calmly that your friend has Tourette Syndrome and tics are involuntary",
            matched: false,
          },
          {
            left: "Your friend's tics are much worse than usual today",
            right: "Check in warmly - stress and anxiety often increase tics",
            matched: false,
          },
          {
            left: "A teacher tells your friend to stop the noise",
            right: "Privately tell a trusted adult that tics cannot simply be switched off",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "tourettes-scenario-classroom",
    title: "Responding with Empathy",
    type: "scenario",
    worldId: "tourettes-world",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "You are sitting next to Riley at lunch. Riley has Tourette Syndrome and suddenly lets out a loud vocal tic - a sharp bark sound. Several people at nearby tables turn and stare. Riley goes red and looks mortified.",
        question: "What is the most supportive thing to do?",
        choices: [
          {
            text: "Announce loudly to the table that Riley has Tourette Syndrome so everyone understands",
            isCorrect: false,
            feedback: "Disclosing someone else's diagnosis publicly without their permission is not supportive - it takes away their control over their own story. Even with good intentions, it can feel embarrassing and violating.",
          },
          {
            text: "Calmly continue your conversation with Riley as if nothing happened, giving a quiet reassuring smile",
            isCorrect: true,
            feedback: "Perfect. Carrying on normally is the most grounding thing you can do. It signals to Riley that the tic does not change how you see them and that they are safe with you. Ally tip: a warm, brief check-in afterwards - just 'you alright?' - can mean everything to someone who has just felt very exposed.",
          },
          {
            text: "Tell Riley they should warn people before having a tic",
            isCorrect: false,
            feedback: "Tics cannot be predicted or announced - they are involuntary. Suggesting Riley should warn people implies it is their responsibility to manage others' reactions, which adds to the burden they already carry.",
          },
        ],
        correctChoice: 1,
        explanation: "In the moment, normalcy is the greatest gift you can give someone whose tic just drew unwanted attention. Ally tip: after a moment like this, checking in privately - not making a big deal of it, but letting them know you are there - is one of the most meaningful things a friend can do.",
      },
    },
  },
];

// Lessons for Down Syndrome World
const downSyndromeLessons: Lesson[] = [
  {
    id: "ds-intro",
    title: "Understanding Down Syndrome",
    type: "quiz",
    worldId: "down-syndrome-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "What causes Down Syndrome?",
            options: [
              "A virus during pregnancy",
              "An extra copy of chromosome 21",
              "A vitamin deficiency",
              "A rare genetic mutation passed only from fathers",
            ],
            correctIndex: 1,
            explanation: "Down Syndrome (also called Trisomy 21) occurs when a person is born with three copies of chromosome 21 instead of two. It is a chromosomal difference, not a disease, and it is not caused by anything a parent did or did not do.",
          },
          {
            question: "Down Syndrome occurs across all populations. Which statement about it is true?",
            options: [
              "It only occurs in certain ethnic groups",
              "It affects people of all ethnicities, backgrounds, and family types",
              "It is caused by poor prenatal care",
              "It is extremely rare and getting rarer",
            ],
            correctIndex: 1,
            explanation: "Down Syndrome occurs in all populations worldwide regardless of ethnicity, socioeconomic status, or family background. It is one of the most common chromosomal conditions, occurring in approximately 1 in 700 births.",
          },
          {
            question: "Which best describes how Down Syndrome affects people?",
            options: [
              "Everyone with Down Syndrome is affected in exactly the same way",
              "Down Syndrome affects each person differently - abilities, personality, and strengths vary widely",
              "All people with Down Syndrome have severe intellectual disabilities",
              "Down Syndrome only affects physical appearance, not cognition",
            ],
            correctIndex: 1,
            explanation: "Down Syndrome is a spectrum. Every person with Down Syndrome is a unique individual with their own personality, strengths, interests, and abilities. Ability levels vary widely, and many people with Down Syndrome lead rich, fulfilling, semi-independent lives.",
          },
        ],
      },
    },
  },
  {
    id: "ds-strengths",
    title: "Remarkable Strengths",
    type: "sorting",
    worldId: "down-syndrome-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Many people with Down Syndrome show particular strengths in these areas. Sort them into Strengths that are often notable, or Common Challenges",
        items: [
          {
            id: "ds-s1",
            text: "Strong social awareness and reading the room",
            correctCategory: "Notable Strengths",
          },
          {
            id: "ds-s2",
            text: "Deep emotional warmth and empathy for others",
            correctCategory: "Notable Strengths",
          },
          {
            id: "ds-s3",
            text: "Visual learning and memory for faces and places",
            correctCategory: "Notable Strengths",
          },
          {
            id: "ds-s4",
            text: "Long-term memory for routines and meaningful events",
            correctCategory: "Notable Strengths",
          },
          {
            id: "ds-c1",
            text: "Processing verbal instructions quickly",
            correctCategory: "Common Challenges",
          },
          {
            id: "ds-c2",
            text: "Short-term verbal memory",
            correctCategory: "Common Challenges",
          },
          {
            id: "ds-s5",
            text: "Strong sense of humor and love of music",
            correctCategory: "Notable Strengths",
          },
          {
            id: "ds-c3",
            text: "Fine motor tasks requiring precise hand coordination",
            correctCategory: "Common Challenges",
          },
        ],
        categories: ["Notable Strengths", "Common Challenges"],
      },
    },
  },
  {
    id: "ds-emotional-intelligence",
    title: "Emotional Intelligence in Action",
    type: "scenario",
    worldId: "down-syndrome-world",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "You are having a rough day and trying to hide it. Maya, your classmate who has Down Syndrome, walks over quietly, sits beside you, and says 'you seem sad today. I am here.' She noticed when nobody else did.",
        question: "What does this moment show about Maya?",
        choices: [
          {
            text: "It is just a coincidence - Maya does not really understand emotions",
            isCorrect: false,
            feedback: "Research consistently shows that many people with Down Syndrome have exceptional emotional attunement. Maya picking up on subtle emotional cues is not coincidence - it reflects a genuine strength.",
          },
          {
            text: "Maya shows the strong emotional intelligence and empathy that many people with Down Syndrome possess",
            isCorrect: true,
            feedback: "Exactly. High emotional sensitivity and deep empathy are well-documented strengths in many people with Down Syndrome. Maya noticed, cared, and acted on it. Ally tip: recognize and appreciate these emotional gifts - they are real strengths, not just personality quirks.",
          },
          {
            text: "Maya is being taught to say that by her teachers",
            isCorrect: false,
            feedback: "Dismissing authentic emotional responses as trained behavior is a common and hurtful assumption. Maya responded genuinely to what she perceived. Her emotional intelligence is her own.",
          },
        ],
        correctChoice: 1,
        explanation: "Emotional warmth and social sensitivity are among the most consistently described strengths of people with Down Syndrome. Many friends and family members describe people with DS as the most caring, perceptive people in their lives. Ally tip: lean into these connections - friendships with people with Down Syndrome are often deeply rewarding for everyone involved.",
      },
    },
  },
  {
    id: "ds-visual-learning",
    title: "Visual and Memory Strengths",
    type: "quiz",
    worldId: "down-syndrome-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      quiz: {
        questions: [
          {
            question: "Research shows that many people with Down Syndrome learn best through which channel?",
            options: [
              "Long verbal explanations and lectures",
              "Visual information, pictures, demonstrations, and modelling",
              "Reading dense written text",
              "Auditory instruction only",
            ],
            correctIndex: 1,
            explanation: "Visual learning is a well-documented strength for many people with Down Syndrome. They often respond much better to pictures, visual cues, demonstrations, and visual schedules than to verbal-only instruction. Ally tip: when explaining something, show as well as tell - a visual paired with words makes a big difference.",
          },
          {
            question: "Which type of memory is often a relative strength for people with Down Syndrome?",
            options: [
              "Short-term verbal memory",
              "Long-term memory for visual information, faces, and familiar routines",
              "Sequential multi-step verbal instructions",
              "Memorising abstract spoken lists",
            ],
            correctIndex: 1,
            explanation: "Long-term visual memory is often strong - many people with Down Syndrome excel at remembering faces, places, and routines they have experienced. Short-term verbal memory (holding a spoken list in mind briefly) is more challenging. Understanding this helps allies support learning effectively.",
          },
          {
            question: "How can an ally best support learning for someone with Down Syndrome?",
            options: [
              "Repeat verbal instructions louder and slower",
              "Use visual supports, break tasks into small steps, and demonstrate rather than just describe",
              "Avoid giving instructions altogether",
              "Assume they cannot learn new skills",
            ],
            correctIndex: 1,
            explanation: "Visual supports, clear demonstrations, and breaking tasks into small achievable steps all play to the strengths of visual and long-term memory. Ally tip: pair every verbal instruction with something visual - a gesture, a written note, a picture, or a demonstration. This is not dumbing down - it is smart communication.",
          },
        ],
      },
    },
  },
  {
    id: "ds-myths",
    title: "Down Syndrome Myths vs Facts",
    type: "sorting",
    worldId: "down-syndrome-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      sorting: {
        instruction: "Sort these statements into Myth or Fact",
        items: [
          {
            id: "dsm1",
            text: "People with Down Syndrome are always happy",
            correctCategory: "Myth",
          },
          {
            id: "dsf1",
            text: "People with Down Syndrome experience the full range of human emotions, including sadness, frustration, and anxiety",
            correctCategory: "Fact",
          },
          {
            id: "dsm2",
            text: "People with Down Syndrome cannot live independently or hold jobs",
            correctCategory: "Myth",
          },
          {
            id: "dsf2",
            text: "Many people with Down Syndrome live semi-independently, maintain friendships, and hold meaningful employment",
            correctCategory: "Fact",
          },
          {
            id: "dsm3",
            text: "All people with Down Syndrome have the same abilities and personality",
            correctCategory: "Myth",
          },
          {
            id: "dsf3",
            text: "Down Syndrome is a spectrum - every person is a unique individual with their own strengths and interests",
            correctCategory: "Fact",
          },
          {
            id: "dsm4",
            text: "People with Down Syndrome cannot form deep or meaningful friendships",
            correctCategory: "Myth",
          },
          {
            id: "dsf4",
            text: "People with Down Syndrome are often described as exceptionally loyal, empathetic, and caring friends",
            correctCategory: "Fact",
          },
        ],
        categories: ["Myth", "Fact"],
      },
    },
  },
  {
    id: "ds-communication",
    title: "Communicating Well",
    type: "matching",
    worldId: "down-syndrome-world",
    xpReward: 20,
    completed: false,
    unlocked: true,
    content: {
      matching: {
        instruction: "Match each communication challenge with the most helpful ally approach",
        pairs: [
          {
            left: "Processing verbal instructions takes longer",
            right: "Give one instruction at a time and pause to allow processing",
            matched: false,
          },
          {
            left: "Visual memory is stronger than verbal memory",
            right: "Use pictures, gestures, or written notes alongside spoken words",
            matched: false,
          },
          {
            left: "Speech may be harder to understand at first",
            right: "Listen patiently and ask clarifying questions rather than pretending to understand",
            matched: false,
          },
          {
            left: "New multi-step tasks can be harder to follow verbally",
            right: "Break tasks into small steps and demonstrate each one",
            matched: false,
          },
        ],
      },
    },
  },
  {
    id: "ds-inclusion-scenario",
    title: "Inclusion in Action",
    type: "scenario",
    worldId: "down-syndrome-world",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "Your group is planning a project and someone suggests not including Jamie (who has Down Syndrome) because 'it will slow us down.' Jamie has shown real enthusiasm for the topic and strong memory for the visual elements you covered.",
        question: "What is the most thoughtful response?",
        choices: [
          {
            text: "Agree - the project grade matters more than inclusion",
            isCorrect: false,
            feedback: "Excluding someone based on a disability is both hurtful and often inaccurate. Jamie has already shown strengths relevant to this project. Assuming someone will slow things down without evidence is a harmful assumption.",
          },
          {
            text: "Include Jamie and assign tasks that play to visual memory and enthusiasm for the topic",
            isCorrect: true,
            feedback: "Well done. Genuine inclusion means finding meaningful roles that draw on real strengths. Jamie's visual memory and enthusiasm are genuine assets. Ally tip: when including someone with a disability, focus on what they bring - not just on accommodation. Role assignment based on strengths benefits everyone.",
          },
          {
            text: "Include Jamie but give them nothing important to do so nothing goes wrong",
            isCorrect: false,
            feedback: "Token inclusion - where someone is present but not genuinely contributing - is not real inclusion. It can feel patronising and isolating. Meaningful participation, not just presence, is what matters.",
          },
        ],
        correctChoice: 1,
        explanation: "True inclusion means recognising what someone brings, not just tolerating their presence. Ally tip: before assuming someone will struggle, ask what they are good at and build from there. People with Down Syndrome often surprise those who underestimate them - and the friendship and loyalty that follows is remarkable.",
      },
    },
  },
  {
    id: "ds-identity",
    title: "Identity and Dignity",
    type: "scenario",
    worldId: "down-syndrome-world",
    xpReward: 25,
    completed: false,
    unlocked: true,
    content: {
      scenario: {
        situation: "A new student refers to Jamie as 'a Down's kid' when describing them to someone else. Jamie is nearby and hears it.",
        question: "What is the most respectful way to address this?",
        choices: [
          {
            text: "It does not matter - it is just a description",
            isCorrect: false,
            feedback: "Language shapes how people see themselves and are seen by others. Reducing someone to their diagnosis - especially within earshot - strips away their individuality and can be genuinely hurtful.",
          },
          {
            text: "Gently explain that person-first language like 'Jamie, who has Down Syndrome' puts the person before the diagnosis",
            isCorrect: true,
            feedback: "Correct. Person-first language (a person with Down Syndrome, not a Down's person or a Down's kid) is the widely preferred standard and respects that Jamie is a whole person, not defined by a chromosome count. Ally tip: a gentle, private correction is usually enough - you do not need to make it a lecture.",
          },
          {
            text: "Loudly correct the student in front of everyone to make the point",
            isCorrect: false,
            feedback: "Public shaming rarely changes minds and can embarrass Jamie further. A calm, private conversation about language is more effective and more respectful to everyone involved.",
          },
        ],
        correctChoice: 1,
        explanation: "Person-first language (a person with Down Syndrome) is preferred by most self-advocacy groups because it centres the person, not the condition. Ally tip: model it naturally in conversation - you do not need to lecture others every time, but your language sets a tone that others often follow.",
      },
    },
  },
];

export const getInitialWorlds = (): World[] => {
  return [
    {
      id: "strengths-arena",
      name: "Strengths Arena",
      description: "Celebrate neurodivergent strengths and abilities",
      icon: "trophy",
      color: "#10B981",
      unlocked: true,
      progress: 0,
      lessons: strengthsLessons,
    },
    {
      id: "autism-awareness",
      name: "Island of Autism Awareness",
      description: "Discover communication styles, routines, and the autism spectrum",
      icon: "island",
      color: "#3B82F6",
      unlocked: true,
      progress: 0,
      lessons: autismLessons,
    },
    {
      id: "adhd-adventure",
      name: "ADHD Adventure Park",
      description: "Explore attention, hyperfocus, and executive function",
      icon: "rocket",
      color: "#F59E0B",
      unlocked: true,
      progress: 0,
      lessons: adhdLessons,
    },
    {
      id: "dyslexia-discovery",
      name: "Dyslexia Discovery",
      description: "Learn about reading differences, dyslexic strengths, and support strategies",
      icon: "book",
      color: "#14B8A6",
      unlocked: true,
      progress: 0,
      lessons: dyslexiaLessons,
    },
    {
      id: "sensory-world",
      name: "Sensory World",
      description: "Understand sensory processing and sensory needs",
      icon: "sparkles",
      color: "#8B5CF6",
      unlocked: true,
      progress: 0,
      lessons: sensoryLessons,
    },
    {
      id: "communication-forest",
      name: "Communication Forest",
      description: "Learn about different ways people communicate",
      icon: "message-circle",
      color: "#10B981",
      unlocked: true,
      progress: 0,
      lessons: communicationLessons,
    },
    {
      id: "executive-function",
      name: "Executive Function Mountain",
      description: "Climb the mountain of planning, organization, and task management",
      icon: "mountain",
      color: "#EF4444",
      unlocked: true,
      progress: 0,
      lessons: executiveLessons,
    },
    {
      id: "tourettes-world",
      name: "Tourette Syndrome",
      description: "Understand tics, dispel myths, and learn how to be a genuine ally",
      icon: "flash",
      color: "#EC4899",
      unlocked: true,
      progress: 0,
      lessons: tourettesLessons,
    },
    {
      id: "down-syndrome-world",
      name: "Down Syndrome",
      description: "Discover the strengths, stories, and humanity of people with Down Syndrome",
      icon: "heart",
      color: "#3B82F6",
      unlocked: true,
      progress: 0,
      lessons: downSyndromeLessons,
    },
  ];
};
