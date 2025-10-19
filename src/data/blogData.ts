export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: {
    name: string;
    slug: string;
    color: string;
  };
  tags: string[];
  published_date: string;
  read_time: number;
  meta_description: string;
  sections: Section[];
}

export interface Section {
  id: string;
  type: 'heading' | 'paragraph' | 'list' | 'info-box' | 'cards' | 'table' | 'faq' | 'contact-form';
  title?: string;
  content?: string;
  items?: string[];
  cards?: Array<{
    id: string;
    title: string;
    items: string[];
    color?: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  boxType?: 'warning' | 'info' | 'success' | 'error';
  level?: 2 | 3 | 4;
}

export const blogPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: "NRI Category Seats in NEET PG 2025: Understanding the New MEA Guidelines",
//     slug: "nri-category-seats-neet-pg-2025-mea-guidelines",
//     excerpt: "The NRI quota has always been the most important gateway for candidates aiming to secure a postgraduate medical seat in India. However, recent MEA notifications have created significant changes.",
//     featured_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop",
//     author: {
//       name: "Believers Team",
//       avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
//       bio: "Expert medical education consultants with over 10 years of experience in NEET counseling and admissions."
//     },
//     category: {
//       name: "NEET PG",
//       slug: "neet-pg",
//       color: "bg-blue-100 text-blue-800"
//     },
//     tags: ["NEET PG 2025", "NRI Quota", "MEA Guidelines", "Medical Admissions"],
//     published_date: "2024-12-15",
//     read_time: 5,
//     meta_description: "Complete guide to NRI category seats in NEET PG 2025 with new MEA guidelines, eligibility criteria, and documentation requirements.",
//     sections: [
//       {
//         id: "intro",
//         type: "paragraph",
//         content: "The NRI (Non-Resident Indian) quota has always been the most important gateway for all the candidates who are aiming to secure a postgraduate medical seat in India. However, with the recent Ministry of External Affairs (MEA) notifications, the process of acquiring an NRI certificate from Indian embassies abroad has seen remarkable changes. These changes have created some confusion for many NEET PG 2025 aspirants.\n\nThis blog explains the updated details, eligibility, and other documentation challenges so that candidates can be clear about how these rules impact All India Counselling and State Counselling."
//       },
//       {
//         id: "why-change",
//         type: "heading",
//         title: "Why This Change Matters",
//         level: 2
//       },
//       {
//         id: "why-change-content",
//         type: "paragraph",
//         content: "Commonly, NRI eligibility and documentation varied across states and institutions. While many states depend on an embassy-issued NRI certificate, there is no systematic format. To make the process smooth, the MEA has issued fresh guidelines in 2024 (first for NEET UG) and now it has been extended for NEET PG 2025, which regulates who can be issued an NRI certificate for their educational purposes."
//       },
//       {
//         id: "why-change-alert",
//         type: "info-box",
//         boxType: "warning",
//         content: "As a result, many PG aspirants are struggling to secure the valid embassy certificates, especially for those who depend upon their relatives for NRI sponsorship."
//       },
//       {
//         id: "eligibility",
//         type: "heading",
//         title: "Who Is Eligible for NRI Seats?",
//         level: 2
//       },
//       {
//         id: "eligibility-intro",
//         type: "paragraph",
//         content: "Eligibility for NRI quota seats is not uniform. It depends on whether you are applying through All India Counselling (MCC) or State Counselling."
//       },
//       {
//         id: "eligibility-cards",
//         type: "cards",
//         cards: [
//           {
//             id: "direct-nri",
//             title: "Direct NRI Candidates",
//             color: "green",
//             items: [
//               "If you are an NRI yourself, you are eligible.",
//               "Proof: Residence abroad for more than 180 days and an embassy-issued NRI certificate."
//             ]
//           },
//           {
//             id: "children-nri",
//             title: "Children of NRI Parents",
//             color: "blue",
//             items: [
//               "If either parent is an NRI, you qualify for the NRI quota in most states.",
//               "An embassy certificate of the parent is required."
//             ]
//           },
//           {
//             id: "sponsored",
//             title: "Sponsored Candidates ⚠️",
//             color: "red",
//             items: [
//               "Previously allowed sponsorship by relatives",
//               "Now restricted to minor wards only",
//               "Adult candidates (22+) are effectively blocked"
//             ]
//           }
//         ]
//       },
//       {
//         id: "mea-guidelines",
//         type: "heading",
//         title: "MEA Guidelines: What Changed?",
//         level: 2
//       },
//       {
//         id: "mea-content",
//         type: "paragraph",
//         content: "The new MEA notification has been circulated to all the Indian embassies and commissions abroad, specifying:"
//       },
//       {
//         id: "mea-eligible",
//         type: "info-box",
//         boxType: "success",
//         content: "✅ Eligibility for NRI Certificate (Educational Purposes):\n• NRI candidates themselves\n• Children of NRIs\n• Wards only if minors under genuine guardianship"
//       },
//       {
//         id: "mea-excluded",
//         type: "info-box",
//         boxType: "error",
//         content: "❌ Exclusions:\nAdult wards or relatives (e.g., cousins, uncles, aunts) cannot be issued sponsorship-based NRI certificates. This is why many PG aspirants are being denied certificates at embassies, especially in the US and UAE."
//       },
//       {
//         id: "impact-counselling",
//         type: "heading",
//         title: "Impact on NEET PG 2025 Counselling",
//         level: 2
//       },
//       {
//         id: "impact-cards",
//         type: "cards",
//         cards: [
//           {
//             id: "all-india",
//             title: "All India Counselling (Deemed Universities)",
//             color: "blue",
//             items: [
//               "Only deemed universities have NRI seats under MCC",
//               "15% of deemed university seats are reserved for NRIs",
//               "Till 2024, sponsorship by first-degree relatives was valid",
//               "From 2025, only NRIs themselves or children of NRIs will likely be recognized under Priority 1"
//             ]
//           },
//           {
//             id: "state-counselling",
//             title: "State Counselling",
//             color: "purple",
//             items: [
//               "Many states reserve 15% of private medical seats under NRI quota",
//               "Some states give priority to their own NRI candidates first",
//               "If embassy certificates cannot be issued to adult wards, sponsorship eligibility may collapse"
//             ]
//           }
//         ]
//       },
//       {
//         id: "priority-system",
//         type: "info-box",
//         boxType: "info",
//         content: "Priority System Introduced:\n\nPriority 1: NRI candidates and children of NRIs\nPriority 2: First- or second-degree relatives sponsoring wards (practically blocked due to 'minor only' rule)\n\nThis means direct NRI candidates and children of NRIs will have a clear advantage, while relatives-based sponsorship faces uncertainty."
//       },
//       {
//         id: "documentation",
//         type: "heading",
//         title: "Documentation Requirements",
//         level: 2
//       },
//       {
//         id: "documentation-intro",
//         type: "paragraph",
//         content: "If you are applying under the NRI category, keep these documents ready:"
//       },
//       {
//         id: "documentation-list",
//         type: "list",
//         items: [
//           "Embassy-issued NRI Certificate (valid for only 1 year)",
//           "Passport & Visa copies (of NRI candidate/parent)",
//           "Relationship proof (Birth certificate, family tree affidavit)",
//           "Affidavit (for financial sponsorship, if applicable)",
//           "NEET PG Scorecard",
//           "Self-declaration by the candidate"
//         ]
//       },
//       {
//         id: "documentation-note",
//         type: "info-box",
//         boxType: "error",
//         content: "📌 Note: Old NRI certificates issued last year are not valid for NEET PG 2025."
//       },
//       {
//         id: "challenges",
//         type: "heading",
//         title: "The Challenge for PG Aspirants",
//         level: 2
//       },
//       {
//         id: "challenges-cards",
//         type: "cards",
//         cards: [
//           {
//             id: "ug-candidates",
//             title: "✅ For UG Candidates",
//             color: "green",
//             items: [
//               "Relatives can still sponsor undergraduate (UG) candidates who are minors."
//             ]
//           },
//           {
//             id: "pg-candidates",
//             title: "❌ For PG Candidates",
//             color: "red",
//             items: [
//               "Postgraduate (PG) candidates (adults) cannot obtain sponsorship certificates from embassies if they are not children of an NRI."
//             ]
//           }
//         ]
//       },
//       {
//         id: "challenge-key",
//         type: "info-box",
//         boxType: "warning",
//         content: "Key Issue: Many embassies are now outright refusing to issue sponsorship-based NRI certificates for PG candidates. This creates significant problems for candidates who depend on uncles, aunts, or grandparents for eligibility."
//       },
//       {
//         id: "practical-implications",
//         type: "heading",
//         title: "Practical Implications for Candidates",
//         level: 2
//       },
//       {
//         id: "practical-aspirants",
//         type: "heading",
//         title: "For Current NEET PG Aspirants",
//         level: 3
//       },
//       {
//         id: "practical-list",
//         type: "list",
//         items: [
//           "If you are an NRI yourself or child of an NRI, the process is still straightforward, but documentation requirements are more stringent",
//           "Sponsorship by extended family (uncle, aunt, grandmother) is no longer possible for adult candidates",
//           "OCI/PIO status holders may benefit from reduced competition due to fewer eligible sponsored candidates"
//         ]
//       },
//       {
//         id: "financial",
//         type: "heading",
//         title: "💰 Financial Considerations",
//         level: 3
//       },
//       {
//         id: "financial-list",
//         type: "list",
//         items: [
//           "NRI quota seats cost 3-5 times higher than general seats",
//           "With concentrated demand among eligible candidates, remaining NRI seats may become even more expensive",
//           "Limited eligibility may lead to increased competition and higher fees"
//         ]
//       },
//       {
//         id: "final-word",
//         type: "info-box",
//         boxType: "info",
//         content: "Final Word\n\nNRI eligibility for NEET PG 2025 has been restricted by the new MEA guidelines. This has simplified the process for direct NRIs and their children, but created challenges for candidates dependent on extended family sponsorship.\n\nIf you are a candidate, please confirm your eligibility and required documents thoroughly before counselling starts.\n\nThe path remains open for genuine NRI candidates, but the biggest challenge for sponsored candidates this year will be obtaining embassy certificates."
//       },
//       {
//         id: "faqs",
//         type: "heading",
//         title: "Frequently Asked Questions",
//         level: 2
//       },
//       {
//         id: "faqs-list",
//         type: "faq",
//         faqs: [
//           {
//             question: "Q1. Who can get an educational NRI certificate from an Indian Mission/Post?",
//             answer: "Issued only to NRIs, their children, or minors under guardianship. Adult-ward sponsorships aren't allowed. Valid for one year."
//           },
//           {
//             question: "Q2. Will MCC PG follow UG's NRI priority system?",
//             answer: "Likely similar, but wait for the latest MCC PG notice before assuming allotment priority."
//           },
//           {
//             question: "Q3. Can extended relatives sponsor a PG candidate for an NRI certificate?",
//             answer: "No. 'Ward' means a minor; adult candidates cannot use extended-relative sponsorship. Use parent NRI proof or apply under NRI/OCI/PIO rules."
//           },
//           {
//             question: "Q4. What documents are needed for NRI admission?",
//             answer: "Valid NRI certificate, NRI parent/candidate passport & visa, relationship proof, NEET PG scorecard, and state forms. Originals verified at reporting."
//           }
//         ]
//       },
//       {
//         id: "contact-form",
//         type: "contact-form",
//         title: "Submit queries to Believers Consultancy",
//         content: "Have a question beyond these FAQs? Submit the Google Form and our team will respond during 9 AM–7 PM support hours."
//       }
//     ]
//   },

    {
    id: 1,
    title: "NRI Category Seats in NEET PG 2025: Understanding the New MEA Guidelines",
    slug: "nri-category-seats-neet-pg-2025-mea-guidelines",
    excerpt: "The NRI quota has always been the most important gateway for candidates aiming to secure a postgraduate medical seat in India. However, recent MEA notifications have created significant changes.",
    featured_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop",
    author: {
      name: "Believers Team",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      bio: "Expert medical education consultants with over 10 years of experience in NEET counseling and admissions."
    },
    category: {
      name: "NEET PG",
      slug: "neet-pg",
      color: "bg-blue-100 text-blue-800"
    },
    tags: ["NEET PG 2025", "NRI Quota", "MEA Guidelines", "Medical Admissions"],
    published_date: "2024-12-15",
    read_time: 5,
    meta_description: "Complete guide to NRI category seats in NEET PG 2025 with new MEA guidelines, eligibility criteria, and documentation requirements.",
    sections: [
      {
        id: "intro",
        type: "paragraph",
        content: "The NRI (Non-Resident Indian) quota has always been the most important gateway for all the candidates who are aiming to secure a postgraduate medical seat in India. However, with the recent Ministry of External Affairs (MEA) notifications, the process of acquiring an NRI certificate from Indian embassies abroad has seen remarkable changes. These changes have created some confusion for many NEET PG 2025 aspirants.\n\nThis blog explains the updated details, eligibility, and other documentation challenges so that candidates can be clear about how these rules impact All India Counselling and State Counselling."
      },
      {
        id: "why-change",
        type: "heading",
        title: "Why This Change Matters",
        level: 2
      },
      {
        id: "why-change-content",
        type: "paragraph",
        content: "Commonly, NRI eligibility and documentation varied across states and institutions. While many states depend on an embassy-issued NRI certificate, there is no systematic format. To make the process smooth, the MEA has issued fresh guidelines in 2024 (first for NEET UG) and now it has been extended for NEET PG 2025, which regulates who can be issued an NRI certificate for their educational purposes."
      },
      {
        id: "why-change-alert",
        type: "info-box",
        boxType: "warning",
        content: "As a result, many PG aspirants are struggling to secure the valid embassy certificates, especially for those who depend upon their relatives for NRI sponsorship."
      },
      {
        id: "eligibility",
        type: "heading",
        title: "Who Is Eligible for NRI Seats?",
        level: 2
      },
      {
        id: "eligibility-intro",
        type: "paragraph",
        content: "Eligibility for NRI quota seats is not uniform. It depends on whether you are applying through All India Counselling (MCC) or State Counselling."
      },
      {
        id: "eligibility-cards",
        type: "cards",
        cards: [
          {
            id: "direct-nri",
            title: "Direct NRI Candidates",
            color: "green",
            items: [
              "If you are an NRI yourself, you are eligible.",
              "Proof: Residence abroad for more than 180 days and an embassy-issued NRI certificate."
            ]
          },
          {
            id: "children-nri",
            title: "Children of NRI Parents",
            color: "blue",
            items: [
              "If either parent is an NRI, you qualify for the NRI quota in most states.",
              "An embassy certificate of the parent is required."
            ]
          },
          {
            id: "sponsored",
            title: "Sponsored Candidates ⚠️",
            color: "red",
            items: [
              "Previously allowed sponsorship by relatives",
              "Now restricted to minor wards only",
              "Adult candidates (22+) are effectively blocked"
            ]
          }
        ]
      },
      {
        id: "mea-guidelines",
        type: "heading",
        title: "MEA Guidelines: What Changed?",
        level: 2
      },
      {
        id: "mea-content",
        type: "paragraph",
        content: "The new MEA notification has been circulated to all the Indian embassies and commissions abroad, specifying:"
      },
      {
        id: "mea-eligible",
        type: "info-box",
        boxType: "success",
        content: "✅ Eligibility for NRI Certificate (Educational Purposes):\n• NRI candidates themselves\n• Children of NRIs\n• Wards only if minors under genuine guardianship"
      },
      {
        id: "mea-excluded",
        type: "info-box",
        boxType: "error",
        content: "❌ Exclusions:\nAdult wards or relatives (e.g., cousins, uncles, aunts) cannot be issued sponsorship-based NRI certificates. This is why many PG aspirants are being denied certificates at embassies, especially in the US and UAE."
      },
      {
        id: "impact-counselling",
        type: "heading",
        title: "Impact on NEET PG 2025 Counselling",
        level: 2
      },
      {
        id: "impact-cards",
        type: "cards",
        cards: [
          {
            id: "all-india",
            title: "All India Counselling (Deemed Universities)",
            color: "blue",
            items: [
              "Only deemed universities have NRI seats under MCC",
              "15% of deemed university seats are reserved for NRIs",
              "Till 2024, sponsorship by first-degree relatives was valid",
              "From 2025, only NRIs themselves or children of NRIs will likely be recognized under Priority 1"
            ]
          },
          {
            id: "state-counselling",
            title: "State Counselling",
            color: "purple",
            items: [
              "Many states reserve 15% of private medical seats under NRI quota",
              "Some states give priority to their own NRI candidates first",
              "If embassy certificates cannot be issued to adult wards, sponsorship eligibility may collapse"
            ]
          }
        ]
      },
      {
        id: "priority-system",
        type: "info-box",
        boxType: "info",
        content: "Priority System Introduced:\n\nPriority 1: NRI candidates and children of NRIs\nPriority 2: First- or second-degree relatives sponsoring wards (practically blocked due to 'minor only' rule)\n\nThis means direct NRI candidates and children of NRIs will have a clear advantage, while relatives-based sponsorship faces uncertainty."
      },
      {
        id: "documentation",
        type: "heading",
        title: "Documentation Requirements",
        level: 2
      },
      {
        id: "documentation-intro",
        type: "paragraph",
        content: "If you are applying under the NRI category, keep these documents ready:"
      },
      {
        id: "documentation-list",
        type: "list",
        items: [
          "Embassy-issued NRI Certificate (valid for only 1 year)",
          "Passport & Visa copies (of NRI candidate/parent)",
          "Relationship proof (Birth certificate, family tree affidavit)",
          "Affidavit (for financial sponsorship, if applicable)",
          "NEET PG Scorecard",
          "Self-declaration by the candidate"
        ]
      },
      {
        id: "documentation-note",
        type: "info-box",
        boxType: "error",
        content: "📌 Note: Old NRI certificates issued last year are not valid for NEET PG 2025."
      },
      {
        id: "challenges",
        type: "heading",
        title: "The Challenge for PG Aspirants",
        level: 2
      },
      {
        id: "challenges-cards",
        type: "cards",
        cards: [
          {
            id: "ug-candidates",
            title: "✅ For UG Candidates",
            color: "green",
            items: [
              "Relatives can still sponsor undergraduate (UG) candidates who are minors."
            ]
          },
          {
            id: "pg-candidates",
            title: "❌ For PG Candidates",
            color: "red",
            items: [
              "Postgraduate (PG) candidates (adults) cannot obtain sponsorship certificates from embassies if they are not children of an NRI."
            ]
          }
        ]
      },
      {
        id: "challenge-key",
        type: "info-box",
        boxType: "warning",
        content: "Key Issue: Many embassies are now outright refusing to issue sponsorship-based NRI certificates for PG candidates. This creates significant problems for candidates who depend on uncles, aunts, or grandparents for eligibility."
      },
      {
        id: "practical-implications",
        type: "heading",
        title: "Practical Implications for Candidates",
        level: 2
      },
      {
        id: "practical-aspirants",
        type: "heading",
        title: "For Current NEET PG Aspirants",
        level: 3
      },
      {
        id: "practical-list",
        type: "list",
        items: [
          "If you are an NRI yourself or child of an NRI, the process is still straightforward, but documentation requirements are more stringent",
          "Sponsorship by extended family (uncle, aunt, grandmother) is no longer possible for adult candidates",
          "OCI/PIO status holders may benefit from reduced competition due to fewer eligible sponsored candidates"
        ]
      },
      {
        id: "financial",
        type: "heading",
        title: "💰 Financial Considerations",
        level: 3
      },
      {
        id: "financial-list",
        type: "list",
        items: [
          "NRI quota seats cost 3-5 times higher than general seats",
          "With concentrated demand among eligible candidates, remaining NRI seats may become even more expensive",
          "Limited eligibility may lead to increased competition and higher fees"
        ]
      },
      {
        id: "final-word",
        type: "info-box",
        boxType: "info",
        content: "Final Word\n\nNRI eligibility for NEET PG 2025 has been restricted by the new MEA guidelines. This has simplified the process for direct NRIs and their children, but created challenges for candidates dependent on extended family sponsorship.\n\nIf you are a candidate, please confirm your eligibility and required documents thoroughly before counselling starts.\n\nThe path remains open for genuine NRI candidates, but the biggest challenge for sponsored candidates this year will be obtaining embassy certificates."
      },
      {
        id: "faqs",
        type: "heading",
        title: "Frequently Asked Questions",
        level: 2
      },
      {
        id: "faqs-list",
        type: "faq",
        faqs: [
          {
            question: "Q1. Who can get an educational NRI certificate from an Indian Mission/Post?",
            answer: "Issued only to NRIs, their children, or minors under guardianship. Adult-ward sponsorships aren't allowed. Valid for one year."
          },
          {
            question: "Q2. Will MCC PG follow UG's NRI priority system?",
            answer: "Likely similar, but wait for the latest MCC PG notice before assuming allotment priority."
          },
          {
            question: "Q3. Can extended relatives sponsor a PG candidate for an NRI certificate?",
            answer: "No. 'Ward' means a minor; adult candidates cannot use extended-relative sponsorship. Use parent NRI proof or apply under NRI/OCI/PIO rules."
          },
          {
            question: "Q4. What documents are needed for NRI admission?",
            answer: "Valid NRI certificate, NRI parent/candidate passport & visa, relationship proof, NEET PG scorecard, and state forms. Originals verified at reporting."
          }
        ]
      },
      {
        id: "contact-form",
        type: "contact-form",
        title: "Submit queries to Believers Consultancy",
        content: "Have a question beyond these FAQs? Submit the Google Form and our team will respond during 9 AM–7 PM support hours."
      }
    ]
  },


  {
    id: 2,
    title: "NEET PG 2025: Can You Change Your Category in All India Counselling?",
    slug: "neet-pg-2025-change-category-all-india-counselling",
    excerpt: "This happens with almost every NEET PG candidate; the same doubt keeps popping up: 'Can I change my category during counseling?' Let's clear all your doubts.",
    featured_image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
    author: {
      name: "Believers Team",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      bio: "Expert medical education consultants with over 10 years of experience in NEET counseling and admissions."
    },
    category: {
      name: "NEET PG",
      slug: "neet-pg",
      color: "bg-blue-100 text-blue-800"
    },
    tags: ["NEET PG 2025", "Category Change", "Counselling", "MCC"],
    published_date: "2024-12-10",
    read_time: 5,
    meta_description: "Complete guide on category changes in NEET PG 2025 All India Counselling. Learn which changes are possible and which aren't.",
    sections: [
      {
        id: "intro",
        type: "paragraph",
        content: "This happens with almost every NEET PG candidate; the same doubt keeps popping up: 'Can I change my category during counseling?'\n\nUnfortunately, many students face various problems, including realising late that they belong to the OBC-NCL category and not the General category, and some discover that their state and central lists don't match.\n\nThis blog is part of our FAQ series for NEET PG 2025, where we'll discuss the topic of category change in All India Counselling (MCC counseling) simply and practically."
      },
      {
        id: "category-origin",
        type: "heading",
        title: "First Things: Where Does Your Category Come From?",
        level: 2
      },
      {
        id: "category-origin-content",
        type: "paragraph",
        content: "Firstly, when you applied for NEET PG 2025 on the official NBE portal, you would have selected:\n\n• Category: General, OBC-NCL, SC, ST, or EWS\n• PwD status: Yes or No\n\nOnce you confirm your overall data, it will be locked in your application form and will be shared directly with MCC for All India Counselling."
      },
      {
        id: "important-note",
        type: "info-box",
        boxType: "info",
        content: "Important Note:\nIf the admit card displays only 'GEN', rely on the category/PwD details captured in the NBEMS application—those are the details sent to the counselling portal.\n\nDuring registration, personal details are pre-filled from the exam records. Depending on the year's interface, reservation fields may be non-editable; opt-out to General is typically offered for certain categories.\n\nSo, your counselling identity is basically carried forward from your NBE application."
      },
      {
        id: "why-matters",
        type: "heading",
        title: "Why Does It Matter So Much in All India Counselling?",
        level: 2
      },
      {
        id: "why-matters-content",
        type: "paragraph",
        content: "Okay, so now, here's the tricky part. Please note that MCC doesn't give you an option like: 'I only want to compete for General seats even though I applied as OBC.'\n\nWhen you fill in choices, say XYZ Pediatrics, MCC will automatically check:\n• Are General seats available or not, as per your rank?\n• If yes, you can be allotted by one.\n• But if no OBC seat is available at your rank, you will be allotted a seat in the General category.\n\nif you don't have an OBC certificate, the institute won't give you admission, and you'll have to wait for the next round.\n\nSo, that's why this category issue becomes such a make-or-break factor in MCC counselling."
      },
      {
        id: "common-questions",
        type: "heading",
        title: "Common Questions Students Ask",
        level: 2
      },
      {
        id: "common-questions-intro",
        type: "paragraph",
        content: "Let's go one by one, because the rules are different depending on what you want to change."
      },
      {
        id: "q1",
        type: "heading",
        title: "Q1: I applied as a General. Can I change to OBC/SC/ST/EWS?",
        level: 3
      },
      {
        id: "q1-answer",
        type: "info-box",
        boxType: "error",
        content: "From General → OBC/SC/ST/EWS: NOT POSSIBLE\n\nThis is the most frequently asked question by candidates, but unfortunately, it's not possible through the regular MCC registration process.\n\nEven if you made a genuine mistake or if you suddenly realised that you're eligible for a reservation, MCC does not provide this option."
      },
      {
        id: "pwd-status-1",
        type: "info-box",
        boxType: "error",
        content: "PWD STATUS?\nFrom PWD No → PWD Yes: NOT POSSIBLE\n\nYou need to know that if you applied as PWD No, you cannot change to PWD Yes during MCC counselling, even if you became disabled between the examination and counselling dates"
      },
      {
        id: "q2",
        type: "heading",
        title: "Q2: I applied as OBC/SC/ST/EWS. Can I change to General?",
        level: 3
      },
      {
        id: "q2-answer",
        type: "info-box",
        boxType: "success",
        content: "Yes, this is possible.\n\nOkay, so when you register for MCC counseling, you will be able to see your current category displayed, which says OBC-NCL. Then MCC will give you an option to convert to General if you don't want to benefit from a reservation."
      },
      {
        id: "q3",
        type: "heading",
        title: "Q3: PWD STATUS?",
        level: 3
      },
      {
        id: "q3-answer",
        type: "info-box",
        boxType: "success",
        content: "PWD Yes to PWD No\nFrom PWD Yes → PWD No: POSSIBLE\n\nIf you have applied as PWD Yes but cannot obtain the required disability certificate or don't meet PWD criteria, you can change from PWD Yes to PWD No during registration.\n\nNote: This is a reminder, PWD status can only be changed from Yes to No, not the other way."
      },
      {
        id: "q4",
        type: "heading",
        title: "Q4: Does This Apply to State Counselling Too?",
        level: 3
      },
      {
        id: "q4-answer",
        type: "paragraph",
        content: "No, state counselling is a different ball game.\n\nEvery state has its own reservation categories, rules, and registration process. For example:\n\n• You may have applied as a General in NBE, but in your state, you can still apply under OBC if you are eligible.\n• States don't blindly copy your NBE category data. They take fresh information when you register for state counseling.\n\nThe only special case reported so far is Bihar, which has stricter rules for PWD changes.\n\nSo relax, your NBE category doesn't bind you in state quota counselling."
      },
      {
        id: "certificates",
        type: "heading",
        title: "Certificate Requirements",
        level: 2
      },
      {
        id: "certificates-content",
        type: "paragraph",
        content: "You know the reservation system for NEET PG 2025 assigns seats as follows: 27% is for OBC, 15% is for SC, 7.5% is for ST, 10% is for EWS, and 5% horizontal reservation for PWD. Each category includes its specific certificates:"
      },
      {
        id: "certificates-list",
        type: "list",
        items: [
          "OBC: Non-Creamy Layer certificate along with the family income, which is below ₹8 lakh annually.",
          "SC/ST: includes valid caste certificates from qualified authorities.",
          "EWS: Income certificate showing the family income below ₹8 lakh annually",
          "PWD: Disability certificate from the well-designed medical board",
          "General: No certificate required"
        ]
      },
      {
        id: "recommendations",
        type: "heading",
        title: "Key Recommendations",
        level: 2
      },
      {
        id: "recommendations-heading",
        type: "heading",
        title: "Best Practices",
        level: 3
      },
      {
        id: "recommendations-list",
        type: "list",
        items: [
          "Choose Carefully: Make sure you select the correct category during the NBE examination",
          "Certificate Availability: Before counseling, make sure you can obtain the required certificates.",
          "Better understanding the Limitations: This is a reminder that General to Reserved changes are not possible through the regular process.",
          "Plan for Multiple outlines: Consider both All India and State counseling options",
          "Stay Updated Regularly: Check the official MCC and NBE websites for current year guidelines"
        ]
      },
      {
        id: "final-advice",
        type: "heading",
        title: "Final Advice for NEET PG 2025 Aspirants",
        level: 2
      },
      {
        id: "final-advice-content",
        type: "paragraph",
        content: "If you are preparing for All India Counselling, keep these in mind:"
      },
      {
        id: "final-advice-list",
        type: "list",
        items: [
          "Please double-check your category section while registering for the exam. That could be the safest way.",
          "If you're OBC or EWS, then make sure that all your certificates are valid as per the central list. Don't just wait until counselling to discover issues.",
          "However, if you are unable to produce a reservation certificate, then you should always opt to switch to General in MCC registration instead of risking cancellation.",
          "This is especially for those who have genuine, uncommon cases (like disability after exams); you should be prepared that you may need legal help to claim your rights.",
          "You know what is the most important thing? You should keep your eye on MCC notifications for NEET PG 2025 for updates, because rules sometimes change year to year."
        ]
      },
      {
        id: "faqs",
        type: "heading",
        title: "FAQs",
        level: 2
      },
      {
        id: "faqs-list",
        type: "faq",
        faqs: [
          {
            question: "Q1. Can a General-category applicant switch to OBC/SC/ST/EWS during All India Counselling?",
            answer: "No. Changing from General to a reserved category is not permitted in All India (MCC) counselling; reservation changes of this kind are disallowed during registration."
          },
          {
            question: "Q2. Can OBC/SC/ST/EWS applicants switch to General in MCC registration?",
            answer: "Yes. Candidates registered under a reserved category may opt to participate as General during MCC registration if they choose to forgo reservation benefits."
          },
          {
            question: "Q3. Can PwD status be changed during counselling?",
            answer: "PwD Yes to PwD No is allowed if the candidate cannot meet certification requirements; PwD No to PwD Yes is not permitted in MCC and typically requires legal recourse to consider exceptions."
          },
          {
            question: "Q4. Do these change rules also apply to state counselling?",
            answer: "Not necessarily. State counselling runs under separate rules and fresh registration; many states allow category selection per state norms, independent of the exam application data (with some state-specific exceptions)"
          }
        ]
      },
      {
        id: "contact-form",
        type: "contact-form",
        title: "Submit queries to Believers Consultancy",
        content: "Have a question beyond these FAQs? Submit the Google Form and the team will respond during 9 AM–7 PM support hours."
      }
    ]
  }
];

// Helper function to get blog by slug
export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get related blogs
export const getRelatedBlogs = (currentSlug: string, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
};