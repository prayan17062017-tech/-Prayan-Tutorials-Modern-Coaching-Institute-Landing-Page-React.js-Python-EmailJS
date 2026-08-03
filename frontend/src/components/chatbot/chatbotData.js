export const quickQuestions = [
  { text: "Location", icon: "📍" },
  { text: "Contact Number", icon: "📞" },
  { text: "Courses", icon: "📚" },
  { text: "Faculties", icon: "👨🏫" },
  { text: "Results", icon: "🏆" },
  { text: "Features", icon: "🎯" },
  { text: "Timings", icon: "⏰" },
  { text: "Admissions", icon: "💰" }
];

export const addressText = `Prayan Tutorials\nGhanshyam Complex, B-101,\nMahatma Gandhi Rd,\nAbove Vodafone Gallery,\nNear DNS Bank,\nVishnu Nagar,\nDombivli West,\nKalyan,\nMaharashtra 421202`;

// ── Specific intent responses ─────────────────────────────────────────────

const specificResponses = {

  // ── Features (specific) ───────────────────────────────────────────────
  ac_classroom: {
    text: `Yes! ✅\n\nPrayan Tutorials provides fully **air-conditioned classrooms** to ensure a comfortable learning environment, helping students stay focused throughout lectures.`,
    type: "info"
  },
  weekly_test: {
    text: `Yes! ✅\n\nWe conduct regular **Weekly Test Series** to evaluate student progress, strengthen concepts, and improve exam readiness.`,
    type: "info"
  },
  doubt_session: {
    text: `Yes! ✅\n\nWe conduct dedicated **Personal Doubt Sessions** where students can clarify concepts individually or in small groups with faculty.`,
    type: "info"
  },
  parent_teacher: {
    text: `Yes! ✅\n\nWe maintain a strong **Parent-Teacher Interaction** system and regularly communicate student progress with parents.`,
    type: "info"
  },
  career_guidance: {
    text: `Yes! ✅\n\nOur faculty provides **Career Guidance** to help students choose the right academic and professional path after Class XII.`,
    type: "info"
  },
  digital_learning: {
    text: `Yes! ✅\n\nWe provide **Digital Learning Support** to complement classroom teaching through modern tools and resources.`,
    type: "info"
  },
  small_batch: {
    text: `Yes! ✅\n\nWe maintain **Small Batch Sizes** to ensure every student gets personal attention from the faculty.`,
    type: "info"
  },
  qa_session: {
    text: `Yes! ✅\n\nWe conduct regular **Question & Answer Sessions** to ensure students thoroughly understand every concept.`,
    type: "info"
  },

  // ── Courses (specific) ────────────────────────────────────────────────
  course_neet: {
    text: `Yes! 🩺\n\nWe provide comprehensive **NEET** coaching with:\n\n• Concept-based learning\n• Regular mock tests\n• Biology, Physics & Chemistry focus\n• Experienced faculty guidance`,
    type: "courses"
  },
  course_jee: {
    text: `Yes! 🎯\n\nWe offer **JEE (Main)** preparation covering:\n\n• Physics, Chemistry & Mathematics\n• Exam-oriented practice\n• Regular test series\n• Problem-solving workshops`,
    type: "courses"
  },
  course_xi: {
    text: `Yes! 📘\n\nWe provide complete coaching for **Class XI Science** with:\n\n• Strong conceptual foundations\n• Regular assessments\n• PCM and PCB streams`,
    type: "courses"
  },
  course_xii: {
    text: `Yes! 📗\n\nWe provide **Class XII Science** coaching with:\n\n• Board exam preparation\n• Competitive exam guidance\n• Subject-wise expert faculty`,
    type: "courses"
  },
  course_mht_cet: {
    text: `Yes! 📊\n\nWe offer **MHT-CET** preparation with:\n\n• PCM and PCB streams\n• Practice papers & mock tests\n• Our 2025 toppers achieved up to **98.60 Percentile**`,
    type: "courses"
  },

  // ── Faculty (specific) ────────────────────────────────────────────────
  faculty_physics: {
    text: `Our **Physics** faculty:\n\n• **Dr. Shweta Jambhale**\n  M.Sc., B.Ed., PhD\n\n• **Anita Govilkar**\n  M.Sc.`,
    type: "faculties"
  },
  faculty_chemistry: {
    text: `Our **Chemistry** faculty:\n\n• **Sandeep Gupta**\n  M.Sc.\n\n• **Rutuja Madam**\n  M.Sc.`,
    type: "faculties"
  },
  faculty_biology: {
    text: `Our **Biology** faculty:\n\n• **Adesh Jade**\n  M.Sc.\n\n• **Priyanka Shirke-Mhatre**\n  M.Sc.\n\n• **Suhasini Madam**\n  M.Sc., B.Ed.`,
    type: "faculties"
  },
  faculty_maths: {
    text: `Our **Mathematics** faculty:\n\n• **Krantish Pol**\n  M.E.\n\n• **Yash Mahajan**\n  B.E. (AI & Data Science)`,
    type: "faculties"
  },

  // ── Results (specific) ────────────────────────────────────────────────
  result_hsc: {
    text: `🏆 **HSC 2026 Result:**\n\nPrayan Tutorials proudly achieved a **100% HSC Result** in 2026.\n\n📊 **HSC 2025 Toppers:**\n• Tanmay Potdar – 93.50%\n• Manas Chaudhari – 90.00%\n• Aishwarya Wani – 85.17%`,
    type: "results"
  },
  result_cet: {
    text: `🏆 **MHT-CET 2025 Top Score:**\n\n**Tanmay Sachin Potdar**\n98.60 Percentile (PCM)\n\n📊 Other toppers:\n• Manas Chaudhari – 98.35 %ile\n• Khushi Qureshi – 97.86 %ile`,
    type: "results"
  },

  // ── Contact (specific) ────────────────────────────────────────────────
  phone_only: {
    text: `📞 **Phone Number:**\n\n**082912 37037**\n\nYou can also reach us on WhatsApp at the same number.`,
    type: "contact"
  },

  // ── Full category responses (shown only when explicitly asked) ────────
  location: {
    text: `📍 **Prayan Tutorials**\n\nGhanshyam Complex, B-101,\nMahatma Gandhi Rd,\nAbove Vodafone Gallery,\nNear DNS Bank,\nVishnu Nagar,\nDombivli West,\nKalyan,\nMaharashtra 421202\n\n📞 **Phone:** 082912 37037`,
    type: "location"
  },
  contact: {
    text: `📞 **Phone:**\n082912 37037\n\n📸 **Instagram:**\nhttps://www.instagram.com/prayantutorials/`,
    type: "contact"
  },
  courses: {
    text: `We offer:\n\n📘 **XI Science**\n\n📗 **XII Science**\n\n🎯 **JEE (Mains)**\n\n🩺 **NEET**\n\nFocused preparation with concept clarity, regular tests, and personal guidance.`,
    type: "courses"
  },
  results: {
    text: `🏆 **HSC 2026 Result:**\n100% Result\n\n🏆 **HSC 2025 Toppers:**\n\nTanmay Potdar – 93.50%\nManas Chaudhari – 90.00%\nAishwarya Wani – 85.17%\n\n🏆 **MHT-CET 2025:**\n\nTanmay Potdar – 98.60 %ile\nManas Chaudhari – 98.35 %ile\nKhushi Qureshi – 97.86 %ile`,
    type: "results"
  },
  faculties: {
    text: `**Our Faculties:**\n\n• **Ravina Mhatre**\nLeadership & Vision\n\n• **Dr. Shweta Jambhale**\nPhysics\n\n• **Anita Govilkar**\nPhysics\n\n• **Sandeep Gupta**\nChemistry\n\n• **Rutuja Madam**\nChemistry\n\n• **Adesh Jade**\nBiology\n\n• **Priyanka Shirke-Mhatre**\nBiology\n\n• **Suhasini Madam**\nBiology\n\n• **Krantish Pol**\nMathematics\n\n• **Yash Mahajan**\nMathematics\n\n• **Saloni Malusare**\nAdministration`,
    type: "faculties"
  },
  features: {
    text: `✓ Experienced Faculties\n\n✓ AC Classrooms\n\n✓ Weekly Test Series\n\n✓ Parent Teacher Interaction\n\n✓ Personal Doubt Sessions\n\n✓ Question Answer Sessions\n\n✓ Career Guidance\n\n✓ Small Batch Sizes\n\n✓ Digital Learning Support`,
    type: "features"
  },
  admission: {
    text: `Admissions Open for:\n\n✓ XI Science\n\n✓ XII Science\n\n✓ JEE (Mains)\n\n✓ NEET\n\nClick the Admission Form section to submit your enquiry.`,
    type: "admission"
  },
  timings: {
    text: `Please contact:\n**082912 37037**\n\nfor the latest batch timings and schedules.`,
    type: "timings"
  },
  fallback: {
    text: `I'm sorry, I couldn't find an exact answer to your question.\n\nYou can ask me about:\n\n📍 Location\n📞 Contact\n📚 Courses\n👨🏫 Faculties\n🏆 Results\n🎯 Facilities\n⏰ Timings\n💰 Admissions`,
    type: "fallback"
  }
};

// Export combined responses object (ChatMessage.jsx uses .type from here)
export const responses = specificResponses;

// ── Intent matcher ────────────────────────────────────────────────────────

export const findResponseKey = (input) => {
  if (!input) return "fallback";
  const q = input.toLowerCase().trim();

  // ── LOCATION ──────────────────────────────────────────────────────────
  if (/\b(location|address|where|map|directions|locate|place|branch|landmark|near|find us|how to reach)\b/.test(q))
    return "location";

  // ── PHONE / CONTACT ───────────────────────────────────────────────────
  if (/\b(phone|mobile|number|call|contact|reach|instagram|insta|social|whatsapp)\b/.test(q)) {
    if (/\b(phone|mobile|number|call|whatsapp)\b/.test(q) && !/instagram|insta|social/.test(q))
      return "phone_only";
    return "contact";
  }

  // ── FEATURES (specific first, full list only if explicitly asked) ─────
  if (/\b(ac|air.condition|air.condition\w*|cooling)\b/.test(q) || /classroom/.test(q))
    return "ac_classroom";
  if (/\b(weekly.?test|test.?series|practice.?test|weekly.?exam|mock.?test)\b/.test(q))
    return "weekly_test";
  if (/\b(doubt|doubts|doubt.?session|doubt.?class|clearing)\b/.test(q))
    return "doubt_session";
  if (/\b(parent|parents|parent.?teacher|pta|progress.?update|guardian)\b/.test(q))
    return "parent_teacher";
  if (/\b(career|guidance|counsell)\b/.test(q))
    return "career_guidance";
  if (/\b(digital|online|e.?learn|virtual|technology)\b/.test(q))
    return "digital_learning";
  if (/\b(small.?batch|batch.?size|strength|students.?per)\b/.test(q))
    return "small_batch";
  if (/\b(q\s*&?\s*a|question.?answer|qa.?session)\b/.test(q))
    return "qa_session";
  // Full features list
  if (/\b(feature|features|facilities|facility|what.?do.?you.?provide|what.?do.?you.?offer|all.?feature|all.?facilit)\b/.test(q))
    return "features";

  // ── FACULTY (specific subject) ────────────────────────────────────────
  if (/\b(physics|phy)\b/.test(q) && /\b(teacher|faculty|sir|madam|who|teach)\b/.test(q))
    return "faculty_physics";
  if (/\b(chem(istry)?)\b/.test(q) && /\b(teacher|faculty|sir|madam|who|teach)\b/.test(q))
    return "faculty_chemistry";
  if (/\b(bio(logy)?)\b/.test(q) && /\b(teacher|faculty|sir|madam|who|teach)\b/.test(q))
    return "faculty_biology";
  if (/\b(math(s|ematics)?|maths)\b/.test(q) && /\b(teacher|faculty|sir|madam|who|teach)\b/.test(q))
    return "faculty_maths";
  // Named faculty lookups
  if (/shweta|jambhale/.test(q))   return "faculty_physics";
  if (/anita|govilkar/.test(q))    return "faculty_physics";
  if (/sandeep|gupta/.test(q))     return "faculty_chemistry";
  if (/rutuja/.test(q))            return "faculty_chemistry";
  if (/adesh|jade/.test(q))        return "faculty_biology";
  if (/priyanka|mhatre/.test(q))   return "faculty_biology";
  if (/suhasini/.test(q))          return "faculty_biology";
  if (/krantish|pol/.test(q))      return "faculty_maths";
  if (/yash|mahajan/.test(q))      return "faculty_maths";
  // Full faculty list
  if (/\b(faculty|faculties|teacher|teachers|staff|all.?faculty|show.?faculty|list.?faculty)\b/.test(q))
    return "faculties";

  // ── COURSES (specific) ────────────────────────────────────────────────
  if (/\b(neet)\b/.test(q))                          return "course_neet";
  if (/\b(jee|joint.?entrance)\b/.test(q))           return "course_jee";
  if (/\b(mht.?cet|cet)\b/.test(q))                  return "course_mht_cet";
  if (/\b(class\s*11|xi|11th|grade\s*11)\b/.test(q)) return "course_xi";
  if (/\b(class\s*12|xii|12th|grade\s*12)\b/.test(q)) return "course_xii";
  // Full courses list
  if (/\b(course|courses|program|programs|all.?course|what.?do.?you.?teach|subjects)\b/.test(q))
    return "courses";

  // ── RESULTS (specific) ────────────────────────────────────────────────
  if (/\b(hsc|board|12th.?result|percentage)\b/.test(q))    return "result_hsc";
  if (/\b(cet|percentile|mht)\b/.test(q) && /result|score|rank/.test(q)) return "result_cet";
  if (/\b(tanmay|potdar)\b/.test(q))                        return "result_cet";
  // Full results list
  if (/\b(result|results|topper|toppers|score|scores|all.?result|show.?result)\b/.test(q))
    return "results";

  // ── ADMISSIONS ────────────────────────────────────────────────────────
  if (/\b(admission|admissions|join|enroll|enrolment|register|apply|fee|fees|cost|price|enquiry)\b/.test(q))
    return "admission";

  // ── TIMINGS ───────────────────────────────────────────────────────────
  if (/\b(timing|timings|schedule|time|hours|batch|batches|when)\b/.test(q))
    return "timings";

  return "fallback";
};
