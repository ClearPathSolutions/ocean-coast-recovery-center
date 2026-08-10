export type Population = {
  slug: string;
  navLabel: string;
  heroTitle: string;
  heroSubtitle: string; // hero (landscape)
  introTitle: string;
  intro: string[];
  stats?: { value: string; label: string }[];
  sections: { title: string; body: string[]; bullets?: string[] }[];
  metaDescription: string;
};

export const populations: Population[] = [
  {
    slug: "young-adults",
    navLabel: "Young Adults",
    heroTitle: "Addiction treatment for young adults",
    heroSubtitle:
      "Roughly 1 in 7 young adults is living with a substance use disorder — about one person in every senior class. Age-matched, developmentally aware care makes all the difference.",
    introTitle: "Meeting young adults where they are",
    intro: [
      "The teenage and young-adult years are a period of rapid growth — and rapid risk. With alcohol the most commonly used substance and drug experimentation widespread, early use can quietly become dependency.",
      "At Ocean Coast Recovery, we offer medical detox and residential inpatient care for alcohol, opioids, fentanyl, cocaine, benzodiazepines, methamphetamine, and prescription drugs — in an environment built for connection, not judgment.",
    ],
    stats: [
      { value: "1 in 7", label: "Young adults live with a substance use disorder" },
      { value: "mid-20s", label: "Age the brain finishes developing" },
      { value: "50%+", label: "Of high-school seniors have used alcohol" },
    ],
    sections: [
      {
        title: "How substance abuse affects young adults differently",
        body: [
          "The brain continues developing into the mid-20s, so substance use during these years can interfere with healthy development. Young adults face higher risks of depression, conduct problems, personality disorders, and suicidal ideation.",
          "Early marijuana use is linked with short-term memory, learning, and psychomotor deficits, and young people face higher rates of arrests and involvement with the justice system. Getting help early changes the entire trajectory of a life.",
        ],
      },
      {
        // VIS-1648
        title: "Young adult addiction statistics",
        body: [
          "Adults aged 18 to 25 have the highest rate of substance use disorder of any adult age group in the United States, and roughly one in seven meets the clinical criteria in a given year. That is about one person in every high-school senior class.",
          "Young adulthood is also when most substance use disorders begin. The brain's prefrontal cortex — the region governing impulse control, risk assessment and long-term planning — is still maturing into the mid-twenties, which is part of why substances take hold faster at this age and why early intervention changes outcomes so significantly.",
          "Co-occurring mental health conditions are common rather than exceptional in this group: anxiety, depression and untreated trauma frequently sit underneath the substance use, which is why treating only the substance tends to fail.",
          "Figures cited here are drawn from the Substance Abuse and Mental Health Services Administration's National Survey on Drug Use and Health.",
        ],
      },
      {
        title: "The benefits of a young-adult program",
        body: [
          "Young adults often struggle to connect with much older clients in a mixed group. Age-matched groups provide relatability, validation, and a powerful reduction in isolation — the sense that someone truly gets it.",
          "We also work closely with parents and guardians, offering guidance on how to raise concerns and support a young person through treatment and beyond.",
        ],
        bullets: ["Alcohol", "Cocaine", "Fentanyl", "Benzodiazepines", "Methamphetamine", "Prescription medications"],
      },
    ],
    metaDescription:
      "Age-matched addiction treatment for young adults in Costa Mesa, CA — detox and residential inpatient care built around developmental needs and real connection.",
  },
  {
    slug: "college-students",
    navLabel: "College Students",
    heroTitle: "Addiction treatment for college students",
    heroSubtitle:
      "College culture normalizes drinking and drug use — and newfound freedom makes it easy to hide. Our inpatient program helps students heal without derailing their education.",
    introTitle: "When academic pressure meets addiction",
    intro: [
      "College is culturally tied to partying, and that association is reinforced everywhere from TV to social media. With freedom from family oversight, students can hide substance use for a long time before anyone notices.",
      "Ocean Coast Recovery provides inpatient detox and residential care designed around the realities of student life — including how to fit treatment around the academic calendar.",
    ],
    stats: [
      { value: "~60%", label: "Of college students drank in the past month" },
      { value: "39%", label: "Reported binge drinking" },
      { value: "9.9%", label: "Used Adderall to focus or study" },
    ],
    sections: [
      {
        title: "Why do college students use drugs?",
        body: [
          "For many, college is the first real taste of freedom, where experimentation is practically expected and access is easy. Academic pressure, social anxiety, and the desire to keep up can turn casual use into a serious problem.",
          "The most common substances on campus include alcohol, marijuana, prescription stimulants, cocaine, and hallucinogens — often used to cope, focus, or fit in.",
        ],
      },
      {
        title: "What are the signs a college student is abusing drugs?",
        body: ["Substance use rarely stays hidden forever. Common warning signs include:"],
        bullets: [
          "Missing classes and assignments",
          "A sudden drop in grades",
          "Changes in appearance, hygiene, or weight",
          "Sleep disturbances",
          "A new friend group and withdrawal from family",
          "Appearing impaired or hungover frequently",
          "New legal or disciplinary concerns",
        ],
      },
      {
        // VIS-1644
        title: "Which drugs are most common in college?",
        body: [
          "Alcohol remains by far the most widely used substance on campus, and binge drinking is often treated as an ordinary part of college life rather than a warning sign. Because it is so normalized, an alcohol problem can go unnoticed for years.",
          "Cannabis is the next most common, and is frequently used alongside alcohol. Prescription stimulants — Adderall and similar medications taken without a prescription — are widely misused as study aids during exam periods, and students often do not think of them as drugs at all.",
          "We also see benzodiazepines used to come down from stimulants or manage anxiety, and cocaine in social settings. Where prescription pills are bought outside a pharmacy, there is a real risk of fentanyl contamination.",
        ],
        bullets: [
          "Alcohol",
          "Cannabis",
          "Prescription stimulants",
          "Benzodiazepines",
          "Cocaine",
          "Fentanyl",
        ],
      },
      {
        // VIS-1647
        title: "What are the challenges in college student addiction treatment?",
        body: [
          "The first challenge is the calendar. Students worry that treatment means losing a semester, their financial aid, their housing, or their place on a team — so they delay asking for help until a crisis forces the issue.",
          "The second is the environment they return to. Unlike most clients, a student usually goes back to the exact setting where the substance use happened, where alcohol is available nightly and peers may not understand the change.",
          "The third is that heavy use is genuinely hard to distinguish from normal college behaviour, which delays recognition — by the student, and often by the people around them.",
          "We plan for all three from day one: coordinating with academic advisors where a student wants us to, building relapse-prevention strategies specific to campus life, and connecting students to alumni support they can lean on once the term restarts.",
        ],
      },
      {
        title: "Fitting treatment around the semester",
        body: [
          "One of the biggest barriers is timing. We help students weigh options — withdrawing for a term, using winter or summer recess, or coordinating with academic advisors — so getting well doesn't mean giving up on a degree.",
          "Relapse-prevention planning is central, because campus life means potential triggers are everywhere. We prepare students to protect their recovery when they return.",
        ],
      },
    ],
    metaDescription:
      "Inpatient drug & alcohol rehab for college students in Costa Mesa, CA — treatment that fits around the semester with relapse-prevention planning for campus life.",
  },
  {
    slug: "professionals",
    navLabel: "Professionals",
    heroTitle: "Addiction treatment for professionals & executives",
    heroSubtitle:
      "High-stakes careers create high-stakes pressure. Our discreet, executive-friendly program helps you heal without walking away from everything you've built.",
    introTitle: "Care that respects your career",
    intro: [
      "Lawyers, doctors, executives, and business owners make decisions that impact many people — and addiction can affect anyone, regardless of status or success.",
      "Our program looks like excellent standard treatment on the surface, but adds the work-life boundary support professionals need. Rather than forcing you to fully unplug, we help you set healthy limits so you can maintain an appropriate work presence while you focus on recovery.",
    ],
    sections: [
      {
        title: "Why substance abuse is common among professionals",
        body: [
          "High pressure and heavy responsibility, combined with a culture of never showing strain, lead many professionals to bottle up emotions and use alcohol or drugs as coping tools.",
          "The substances most often involved include alcohol, cocaine, opioids, benzodiazepines, methamphetamine, and other prescription medications.",
        ],
      },
      {
        title: "The challenges of executive treatment",
        body: [
          "Many professionals believe taking time off is impossible, and worry they'll feel misunderstood among peers who don't share their world. Both are real barriers — and both are solvable.",
          "Our intimate, six-bed setting offers the privacy and peer relatability executives need, plus the flexibility to stay responsibly connected to work when it supports recovery.",
        ],
      },
      {
        title: "What to look for in an executive rehab",
        body: ["When choosing a program, professionals should prioritize:"],
        bullets: [
          "A private, comfortable environment and accommodations",
          "Evidence-based treatment approaches",
          "Reasonable access to work-related essentials",
          "Location flexibility for inpatient care",
          "Peer-specific groups with other professionals",
        ],
      },
    ],
    metaDescription:
      "Discreet, executive-friendly addiction treatment for professionals in Costa Mesa, CA — private care with work-life boundary support in an intimate six-bed setting.",
  },
  {
    slug: "first-responders",
    navLabel: "First Responders",
    heroTitle: "Addiction treatment for first responders",
    heroSubtitle:
      "Law enforcement, firefighters, and EMTs carry trauma most people never see. Our trauma-informed, peer-aware program is built for those who run toward danger.",
    introTitle: "For those who carry the weight",
    intro: [
      "First responders willingly put themselves in harm's way — and the cumulative stress and trauma of the job put them at elevated risk for depression, anxiety, PTSD, and substance use.",
      "Ocean Coast Recovery offers detox and inpatient treatment for alcohol, cocaine, fentanyl, benzodiazepines, methamphetamine, and prescription drug abuse, with care designed around the realities of a high-stress, dangerous profession.",
    ],
    // VIS-1655 — this page had no stats block. Figures are SAMHSA's; see the
    // attribution line in the "Substance abuse rates" section below.
    stats: [
      { value: "~30%", label: "Of first responders develop behavioral health conditions" },
      { value: "~20%", label: "Rate in the general population, for comparison" },
      { value: "24/7", label: "Confidential admissions — call anytime" },
    ],
    sections: [
      {
        title: "Why first responders turn to substances",
        body: [
          "The motives are deeply human — socializing, escape, coping, and experimentation — but the job stacks the deck. Repeated exposure to trauma raises the risk of depression, anxiety, and trauma-related disorders.",
          "Studies have found sharply elevated drinking among first responders, particularly following disaster-relief work and other high-intensity events.",
        ],
      },
      {
        title: "Signs a first responder may be struggling",
        body: ["Warning signs to watch for include:"],
        bullets: [
          "Withdrawing from friends and family",
          "Coming to work hungover or sick",
          "Increasing frequency of use, tolerance, or withdrawal",
          "New or worsening mental health concerns",
          "Changes in appearance, grooming, weight, or sleep",
          "Cravings and an inability to cut back or stop",
        ],
      },
      {
        // VIS-1655
        title: "Substance abuse rates among first responders",
        body: [
          "First responders carry a measurably heavier behavioral-health burden than the general public. The Substance Abuse and Mental Health Services Administration estimates that roughly 30% of first responders develop behavioral health conditions — including depression and PTSD — compared with about 20% of the general population.",
          "Alcohol is the substance most often involved. Studies of firefighters and police officers consistently report elevated rates of heavy and binge drinking, frequently tied to shift work, post-incident decompression and long-standing occupational drinking culture.",
          "Rates of PTSD are also substantially higher than in the general population, and PTSD and substance use disorder very often occur together in this group — which is why we treat them as one clinical picture rather than two separate problems.",
          "Figures cited here come from SAMHSA's guidance on first responders and behavioral health. If you are reviewing this page for accuracy, confirm them against the current SAMHSA publication before relying on them in outreach materials.",
        ],
      },
      {
        // VIS-1657
        title: "What are the challenges in first responders' addiction treatment?",
        body: [
          "The biggest barrier is rarely the addiction itself — it is what asking for help is believed to cost. Many first responders fear losing a certification, a security clearance, a specialist assignment, or the confidence of the crew they depend on. Silence feels safer than disclosure.",
          "Departmental culture reinforces it. Stoicism is a professional virtue in emergency work, and the same emotional control that makes someone effective at a scene makes it very hard to say they are struggling afterwards.",
          "Trauma is almost always part of the picture. Substance use is frequently the thing that makes sleep possible after a bad call, so treating the drinking or the pills without treating the underlying PTSD leaves the reason for the use fully intact.",
          "Shift patterns matter too. Rotating and overnight schedules disrupt sleep and make consistent outpatient attendance difficult, which is one reason a residential setting often works better for this group.",
          "Our answer is confidential admissions, trauma-informed clinical care, and staff who understand the work — so treatment does not require explaining the job from scratch.",
        ],
      },
      {
        title: "Trauma-informed, peer-specific care",
        body: [
          "Effective treatment must account for career trauma and co-occurring conditions. Specialized peer groups break down the barrier of talking to civilians who haven't lived through a similar work environment.",
          "In our small setting, first responders find the privacy, respect, and understanding they deserve — from a team that treats the whole person.",
        ],
      },
    ],
    metaDescription:
      "Trauma-informed addiction treatment for first responders in Costa Mesa, CA — detox and inpatient care with peer-aware support for police, fire, and EMS.",
  },
  {
    slug: "lgbtq",
    navLabel: "LGBTQ+ Community",
    heroTitle: "LGBTQ+ affirming addiction treatment",
    heroSubtitle:
      "Recovery should feel safe. Our specialized, affirming care addresses the unique experiences of the LGBTQ+ community — never a cookie-cutter program.",
    introTitle: "Specialized, affirming care",
    intro: [
      "The risk factors for addiction — behavioral, physiological, environmental, genetic, and demographic — affect everyone, but LGBTQ+ people often experience them differently, especially in the wake of discrimination, harassment, and violence.",
      "At Ocean Coast Recovery, we provide affirming care that recognizes those realities, in a setting where you can be fully yourself while you heal.",
    ],
    stats: [
      { value: "~1 in 2", label: "LGBTQ+ adults have struggled with illicit drugs" },
      { value: "3 in 5", label: "Have struggled with alcohol" },
      { value: "41%", label: "Used marijuana in the past year vs. 19% general population" },
    ],
    sections: [
      {
        title: "Why substance abuse is common in the LGBTQ+ community",
        body: [
          "Higher exposure to hate, discrimination, and violence takes a serious toll on mental health. Past discrimination within healthcare settings can also become a barrier to seeking help in the first place.",
          "This is why generic, one-size-fits-all programs often fall short for LGBTQ+ clients.",
        ],
      },
      {
        title: "The value of specialized care",
        body: [
          "Research shows LGBTQ+-specialized groups yield better outcomes. They create space to process experiences that generic groups can't safely hold — homophobia, transphobia, family challenges, isolation, harassment, and violence.",
          "We also provide integrated dual-diagnosis care for the anxiety, depression, and trauma that so often accompany addiction.",
        ],
      },
      {
        title: "What to look for in an LGBTQ+ rehab",
        body: ["When choosing a program, look for:"],
        bullets: [
          "The right level of care for your needs",
          "Integrated dual-diagnosis and medication-assisted treatment",
          "A realistic, comfortable location",
          "Clear understanding of cost and in-network coverage",
          "A genuinely affirming, safe environment",
        ],
      },
    ],
    metaDescription:
      "LGBTQ+ affirming drug & alcohol rehab in Costa Mesa, CA — specialized, safe, dual-diagnosis care that honors your identity and lived experience.",
  },
  {
    slug: "men",
    navLabel: "Men",
    heroTitle: "Addiction treatment for men",
    heroSubtitle:
      "Men face distinct expectations, pressures, and stigmas around addiction and recovery. A men-only specialty group creates the safe space to talk honestly.",
    introTitle: "Gender-specific care for men",
    intro: [
      "Addiction affects both sexes, but the expectations placed on men — to be strong, to not show emotion — often make them reluctant to ask for help.",
      "Our men-only specialty group layers onto comprehensive treatment, creating a safe space to discuss the fears and worries men often won't raise in a mixed setting.",
    ],
    stats: [
      { value: "22%", label: "Of men used drugs in the past year" },
      { value: "Higher", label: "Rates of ER visits and overdose than women (NIDA)" },
      { value: "Younger", label: "Men tend to start using earlier and try more substances" },
    ],
    sections: [
      {
        title: "How substance abuse impacts men differently",
        body: [
          "Biological differences matter — for example, differences in gastric tissue mean men and women are affected differently by the same amount of alcohol. Men are also more swayed by peer pressure in early use.",
          "The cultural expectation to 'be strong and not show emotion' becomes a real barrier to reaching out for help.",
        ],
      },
      {
        title: "The benefits of a men's program",
        body: [
          "Men-only group therapy, individual therapy, and educational sessions provide validation and a powerful reduction in isolation. Being among others who share similar pressures makes it easier to be honest.",
          "We treat alcohol, opioids, benzodiazepines, amphetamines, cocaine, fentanyl, meth, and other prescription substances — always with a plan built around the individual.",
        ],
      },
    ],
    metaDescription:
      "Men's addiction treatment in Costa Mesa, CA — gender-specific groups and evidence-based care that create a safe space for men to heal.",
  },
  {
    slug: "women",
    navLabel: "Women",
    heroTitle: "Addiction treatment for women",
    heroSubtitle:
      "Addiction develops and progresses differently in women — and so do the barriers to getting help. Our women's program meets those realities with compassion.",
    introTitle: "Compassionate care for women",
    intro: [
      "Addiction is chronic and progressive, and it does not discriminate. It is never too late to get sober — and our women's drug and alcohol program combines traditional and alternative therapies in a safe, supportive environment.",
      "We recognize that women face unique physiological realities and unique barriers, especially around caretaking and motherhood.",
    ],
    sections: [
      {
        title: "How addiction affects women differently",
        body: [
          "Women are just as likely as men to develop a substance use disorder, and may be more susceptible to cravings and relapse. Research from NIDA shows shorter use histories can lead to faster progression across cocaine, opioids, marijuana, and alcohol.",
          "Higher body-fat content can mean faster effects from less alcohol, alongside elevated risks of fertility problems, diabetes, and cardiovascular issues.",
        ],
      },
      {
        title: "Barriers to treatment for women",
        body: [
          "Women often face added obstacles: finances, access, and denial, plus extra shame and guilt — particularly for mothers and pregnant or breastfeeding women. The lack or cost of child care can make stepping away feel impossible.",
          "We help women navigate these barriers so that getting well becomes achievable, not out of reach.",
        ],
      },
      {
        title: "The benefits of a women's program",
        body: [
          "Women-only groups create validation and safety, reducing isolation and making it easier to open up. Combined with integrated dual-diagnosis care, this gives women the foundation for lasting recovery.",
        ],
      },
    ],
    metaDescription:
      "Women's addiction treatment in Costa Mesa, CA — women-only groups and dual-diagnosis care that address the unique realities women face in recovery.",
  },
];

export const getPopulation = (slug: string) => populations.find((p) => p.slug === slug);
