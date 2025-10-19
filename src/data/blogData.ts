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
  },

 {
    id: 3,
    title: "The Ultimate NEET-PG Counselling Strategy: Your Complete Guide to All India and State Rounds",
    slug: "neet-pg-counselling-strategy-complete-guide",
    excerpt: "Managing NEET-PG counselling is a pivotal step in your medical career. You are supposed to navigate multiple rounds, tight timelines, and critical decisions at every stage.",
    featured_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
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
    tags: ["NEET PG Counselling", "All India Quota", "State Counselling", "Medical Career"],
    published_date: "2024-12-18",
    read_time: 5,
    meta_description: "Complete strategic guide to NEET-PG counselling covering All India Quota and State rounds, choice filling strategies, and expert tips for success.",
    sections: [
      {
        id: "intro",
        type: "paragraph",
        content: "Managing NEET-PG counselling is a pivotal step in your medical career. You are supposed to navigate multiple rounds, tight timelines, and critical decisions at every stage. Your success depends not only on your rank but also on strategic planning and informed choices.\n\nThis guide provides a clear step-by-step strategy to navigate both All India Quota (AIQ) and State counselling processes effectively, helping you make confident decisions and secure your ideal seat."
      },
      {
        id: "foundation",
        type: "heading",
        title: "Understanding the Foundation: Why Choice List Preparation is Everything",
        level: 2
      },
      {
        id: "foundation-content",
        type: "paragraph",
        content: "The biggest lesson from successful counselling: Your choice list is more important than your rank.\n\nMany aspirants spend countless hours collecting data about seats and cutoffs, but the real work lies in evaluating and ranking their preferences correctly."
      },
      {
        id: "fifty-rule",
        type: "heading",
        title: "The 50% Rule",
        level: 3
      },
      {
        id: "fifty-rule-content",
        type: "paragraph",
        content: "Here's a reality check: Only about 50% of all available information will apply to your specific situation. The problem is, you don't know in advance which half is relevant. That's why detailed preparation is essential."
      },
      {
        id: "eighty-twenty",
        type: "heading",
        title: "The 80/20 Rule for Preparation",
        level: 3
      },
      {
        id: "eighty-twenty-content",
        type: "paragraph",
        content: "Spend 80% of your time evaluating choices with help from current PG residents/seniors, and only 20% collecting raw data."
      },
      {
        id: "key-principles",
        type: "heading",
        title: "Key Principles for Choice List Preparation:",
        level: 3
      },
      {
        id: "key-principles-list",
        type: "list",
        items: [
          "Include every seat you'd genuinely join",
          "Rank options by true preference, not perceived difficulty",
          "Add backup options for lower probability scenarios",
          "Consult current residents, not random online lists"
        ]
      },
      {
        id: "counselling-order",
        type: "heading",
        title: "Counselling Round Order",
        level: 2
      },
      {
        id: "counselling-order-content",
        type: "paragraph",
        content: "The counselling rounds always follow this order:\n\nAll India Round 1 - State Round 1\nAll India Round 2 - State Round 2\nAll India Round 3 - State Round 3\nAll India Stray - State Stray\n\nRule: All India results always come before corresponding State results."
      },
      {
        id: "eligibility",
        type: "heading",
        title: "Eligibility Criteria: What You Need to Know",
        level: 2
      },
      {
        id: "eligibility-neet",
        type: "paragraph",
        content: "For NEET UG Qualification: This is basically mandatory to appear in both AIQ and state counselling."
      },
      {
        id: "eligibility-lodging",
        type: "paragraph",
        content: "Lodging & Residency: This is very important, especially for the state quota. Many states require that you have studied class 10/class 12 from the same state or have a certificate that proves your residence."
      },
      {
        id: "eligibility-category",
        type: "paragraph",
        content: "Category Certificate (OBC, SC/ST, EWS, PwD): These certificates must be valid and are required to be accepted during the counselling or document verification process.\n\nParticipants were motivated to have all required and preferred documents, which would be ready and verified before registering, as this is especially important for state-specific quotas, where criteria are stringent and may vary."
      },
      {
        id: "master-streams",
        type: "heading",
        title: "Master the Counselling Streams",
        level: 2
      },
      {
        id: "aiq-counselling",
        type: "heading",
        title: "All India Quota (AIQ) Counselling:",
        level: 3
      },
      {
        id: "aiq-content",
        type: "paragraph",
        content: "It is basically managed by the Medical Counselling Committee (MCC) under the DGHS (Director General of Health Services). This process covers:\n\nOverall, 15% of seats in state government colleges.\n\nAll seats are in central institutions (AIIMS, JIPMER, DU, BHU, AMU, ESIC, AFMC, and deemed universities).\n\nLet us start with Round 1, which involves choice filling, and then the process moves forward to the mop-up round and the stray vacancy round."
      },
      {
        id: "state-counselling",
        type: "heading",
        title: "State Quota Counselling:",
        level: 3
      },
      {
        id: "state-content",
        type: "paragraph",
        content: "This is specifically conducted by individual states for the remaining 85% of seats in state government and private colleges.\n\nEach state applies its own merit rules. Some factors, such as residence status, category certificates, and academic qualification, play a role."
      },
      {
        id: "sequence-movement",
        type: "heading",
        title: "Sequence & Movement Between Counselling Rounds",
        level: 2
      },
      {
        id: "sequence-intro",
        type: "paragraph",
        content: "The video highlights the advances and limitations of moving between AIQ and state counselling:"
      },
      {
        id: "sequence-cards",
        type: "cards",
        cards: [
          {
            id: "round-1",
            title: "Round 1",
            color: "blue",
            items: [
              "In this round, candidates can register in both AIQ and state counselling. But choose wisely, which could be based on your rank."
            ]
          },
          {
            id: "round-2",
            title: "Round 2",
            color: "purple",
            items: [
              "If you're assigned both in AIQ and the state, then you must decide which to join; both cannot be maintained."
            ]
          },
          {
            id: "beyond-round-2",
            title: "Beyond Round 2",
            color: "red",
            items: [
              "There will be no upgradation or switching between colleges or streams in the whole AIQ and state allowed."
            ]
          }
        ]
      },
      {
        id: "mopup-rounds",
        type: "info-box",
        boxType: "warning",
        content: "Mop-up & Stray Vacancy Rounds:\n\nMobility is restricted after Round 2 due to Supreme Court orders (to prevent seat blocking).\n\nThis means flexibility is permitted only within the first two rounds, and once you give your commitment, you can't jump on categories or upgrade later."
      },
      {
        id: "strategy-options",
        type: "heading",
        title: "Strategy Options",
        level: 2
      },
      {
        id: "strategy-high-rank",
        type: "paragraph",
        content: "High-rank aspirants: Candidates who have high ranks can participate in both AIQ and their home state counselling just to maximize chances.\n\nBasic Financial Considerations: Security deposits apply across states and quotas. If any student fails to join after allocation may lead to surrender.\n\nTiming & exit rules: when you take exit after Round 1, which is often allowed without any penalty, but exiting after Round 2 may lead you to lose the security deposit, so this is something crucial that every aspirant must weight carefully."
      },
      {
        id: "single-participation",
        type: "heading",
        title: "Single Counselling Participation",
        level: 3
      },
      {
        id: "single-participation-list",
        type: "list",
        items: [
          "AIQ only: Fill your choice list, accept/upgrade through rounds, and consider stray rounds.",
          "State only: Same process, but check state-specific rules (e.g., Karnataka: no upgradation for clinical seats)."
        ]
      },
      {
        id: "dual-participation",
        type: "heading",
        title: "Dual Participation (Maximum Opportunities)",
        level: 3
      },
      {
        id: "dual-participation-list",
        type: "list",
        items: [
          "You can participate in both AIQ and State simultaneously",
          "States won't remove you for having an AIQ seat",
          "Free exit is allowed for AIQ Round 1",
          "Eligibility Rule: Joining, skipping, or resigning from AIQ Round 1 keeps you eligible for both State Round 1 and AIQ Round 2."
        ]
      },
      {
        id: "timeline-scenarios",
        type: "heading",
        title: "Timeline Scenarios",
        level: 3
      },
      {
        id: "timeline-scenarios-list",
        type: "list",
        items: [
          "State results before AIQ joining deadline – Wait for both, pick the better seat, zero risk",
          "State results between AIQ joining and resignation – Join AIQ first, switch if the state offers a better seat",
          "State results after AIQ resignation – conservative: Join AIQ; aggressive: skip AIQ if confident about State"
        ]
      },
      {
        id: "state-specific",
        type: "heading",
        title: "State-Specific Rules:",
        level: 3
      },
      {
        id: "state-specific-list",
        type: "list",
        items: [
          "Telangana: No free exit. If you skip Round 1, you lose eligibility for further rounds.",
          "Karnataka: No upgradation allowed for clinical seats"
        ]
      },
      {
        id: "quick-tips",
        type: "heading",
        title: "Quick Tips for Success",
        level: 2
      },
      {
        id: "quick-tips-do",
        type: "heading",
        title: "Do:",
        level: 3
      },
      {
        id: "quick-tips-do-list",
        type: "list",
        items: [
          "Consult seniors, use the previous year's data",
          "Fill all genuinely acceptable choices",
          "Plan travel and document logistics"
        ]
      },
      {
        id: "quick-tips-dont",
        type: "heading",
        title: "Don't:",
        level: 3
      },
      {
        id: "quick-tips-dont-list",
        type: "list",
        items: [
          "Rely simply on rank or online lists",
          "Ignore state-specific rules",
          "Make major changes after Round 1"
        ]
      },
      {
        id: "quick-tips-remember",
        type: "info-box",
        boxType: "info",
        content: "Remember: Preparation is easier than panicking. You have to secure one good seat, then pursue upgrades systematically."
      },
      {
        id: "action-plan",
        type: "heading",
        title: "Action Plan for Aspirants",
        level: 2
      },
      {
        id: "action-plan-intro",
        type: "paragraph",
        content: "Here's a consolidated checklist based on the session:"
      },
      {
        id: "action-plan-list",
        type: "list",
        items: [
          "First, need to qualify NEET UG, then register on MCC (for AIQ) and respective state portals.",
          "Then, prepare all your documentation, including identity, NEET scorecard, domicile/residency, and category.",
          "Then fill in your preferences, prioritizing colleges based on your rank and aspirations.",
          "Monitor Round 1 results, which are under AIQ and state counselling.",
          "Decide early; if seats are allocated in both channels, you must choose one (you cannot retain both).",
          "Complete reporting and document verification under the deadlines.",
          "Track following rounds if not allocated, but remember, no switching after Round 2.",
          "Consider mop-up or stray vacancy rounds if still unplaced.",
          "Use insights like closing ranks, category-wise trends, and seat matrix to refine choices."
        ]
      },
      {
        id: "conclusion",
        type: "heading",
        title: "Conclusion",
        level: 2
      },
      {
        id: "conclusion-content",
        type: "paragraph",
        content: "NEET-PG counselling success is all about strategy, patience, and informed decisions. Rank matters, but planning your choices, understanding rules, and learning from seniors is what truly counts.\n\nYour medical specialization journey begins here. Make every counselling decision count."
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
            question: "Q1. How should the choice list be built to maximize outcomes?",
            answer: "Include every option genuinely acceptable, rank strictly by true preference (not perceived difficulty), add layered backups, and validate with current residents for on-ground insights."
          },
          {
            question: "Q2. Can AIQ and State counselling run in parallel without risk?",
            answer: "Yes. Participate in both; AIQ Round 1 has free exit. If allotted in both later, only one can be retained—decide based on joining deadlines and comparative seat quality."
          },
          {
            question: "Q3. What's the best way to handle timeline clashes between AIQ and State?",
            answer: "If State results arrive before the AIQ join deadline, compare both and pick the better seat. If State results come later, join AIQ first and switch only if State offers a clearly better, secure option."
          },
          {
            question: "Q4. Which common mistakes derail counselling strategy?",
            answer: "Over-relying on rank over preferences, too few choices, ignoring state-specific rules (e.g., no free exit or no clinical upgradation), late choice locking, and neglecting document/logistics planning."
          },
          {
            question: "Q5. Can candidates register for both AIQ and State counselling in Round 1?",
            answer: "Yes. Registration in both channels is allowed in Round 1; however, once a seat is allotted in both streams later, only one can be retained and the other must be relinquished."
          },
          {
            question: "Q6. Is switching between AIQ and State allowed after Round 2?",
            answer: "No. Post–Supreme Court directives restrict round 2, switching/upgradation across AIQ and State to prevent seat blocking; choices must be finalized by then."
          },
          {
            question: "Q7. What documents are critical for State quota eligibility?",
            answer: "State-specific domicile/residency proofs (or schooling criteria), valid category certificates (OBC/EWS/SC/ST/PwD), identity proof, NEET scorecard, and internship/registration documents as required."
          },
          {
            question: "Q8. How should a rank-based strategy be planned across rounds?",
            answer: "Prioritize safer options in Rounds 1–2, use Round 3 for targeted upgrades, and treat mop-up/stray rounds as high-risk fallback; reference past closing ranks, seat matrix, and applicable security deposit/exit rules."
          }
        ]
      },
      {
        id: "contact-form",
        type: "contact-form",
        title: "Submit queries to BelieversConsultancy",
        content: "Have a question beyond these FAQs? Submit the Google Form and the team will respond during 9 AM–7 PM support hours."
      }
    ]
  },
 {
  id: 4,
    title: "Decoding NEET PG 2025: All India 50% Quota Seats Counselling Explained",
    slug: "decoding-neet-pg-2025-all-india-50-quota-seats-counselling",
    excerpt: "NEET PG 2025 results have been released officially, along with the All India 50% Quota (AIQ) seat counselling merit list. Learn everything about AIQ counselling, ranks, and how to make informed decisions.",
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
    tags: ["NEET PG 2025", "AIQ Counselling", "Merit List", "MCC", "Category Rank"],
    published_date: "2024-12-10",
    read_time: 5,
    meta_description: "Complete guide to NEET PG 2025 All India 50% Quota counselling. Understand AIQ merit list, rank types, eligibility criteria, and counselling strategies.",
    sections: [
      {
        id: "intro",
        type: "paragraph",
        content: "NEET PG 2025 results have been released officially, along with the All India 50% Quota (AIQ) seat counselling merit list has also been made available online.\n\nNaturally, a lot of questions are raised in candidates' minds, like: What exactly does this merit list act for? How is it different from your overall NEET PG rank? What is the significance of category rank? And most importantly, how should you use this information to make counselling decisions?\n\nThis blog explains the overall process in a very clear and step-by-step way so that your doubts are cleared and you can make better decisions for your next steps."
      },
      {
        id: "understanding-aiq",
        type: "heading",
        title: "Understanding the All-India 50% Quota Merit List",
        level: 2
      },
      {
        id: "understanding-aiq-content",
        type: "paragraph",
        content: "The AIQ merit list is simply for All India Counselling and includes:\n\n• AIQ seats\n• DNB seats\n• NBE diploma seats\n• Deemed university seats\n\nEvery student needs to know that if their roll number is not on this merit list, they will not be eligible for All India Counselling. Along with that, you cannot register/participate in MCC AIQ counselling if not in the AIQ merit list. However, this list does not influence your eligibility for state counselling, as it is managed separately by individual states."
      },
      {
        id: "eligibility-criteria",
        type: "heading",
        title: "Eligibility Criteria for AIQ 2025",
        level: 2
      },
      {
        id: "eligibility-table",
        type: "paragraph",
        content: "To be included in the AIQ merit list, candidates must meet these score-based cutoffs:\n\nGeneral/EWS: 50th Percentile - 276 marks\nOBC/SC/ST/PWD: 40th Percentile - 235 marks\nGeneral-PWD/EWS-PWD: 45th Percentile - 255 marks\n\nCandidates who are scoring below these cutoffs are excluded from the AIQ merit list, but they can still apply for state counselling (if they are eligible as per state rules)."
      },
      {
        id: "rank-types",
        type: "heading",
        title: "NEET PG Rank vs. AIQ Rank vs. Category Rank",
        level: 2
      },
      {
        id: "rank-types-intro",
        type: "paragraph",
        content: "The counselling rank list can be confusing for you because it includes multiple types of ranks. Here's what they mean:"
      },
      {
        id: "neet-pg-rank",
        type: "heading",
        title: "NEET PG Rank",
        level: 3
      },
      {
        id: "neet-pg-rank-content",
        type: "list",
        items: [
          "This is your overall rank among all candidates who appeared for the exam.",
          "It remains your primary reference for most admissions processes."
        ]
      },
      {
        id: "aiq-rank",
        type: "heading",
        title: "All India Quota (AIQ) Rank",
        level: 3
      },
      {
        id: "aiq-rank-content",
        type: "list",
        items: [
          "Prepared by filtering only those candidates who meet the AIQ cutoffs.",
          "Your NEET PG rank may match your AIQ rank initially, but as filtering happens (especially for General/EWS candidates below the cutoff), the AIQ rank adjusts."
        ]
      },
      {
        id: "category-rank",
        type: "heading",
        title: "Category Rank",
        level: 3
      },
      {
        id: "category-rank-content",
        type: "list",
        items: [
          "It specifically indicates your standing within your specific reservation category.",
          "Example: If you're an OBC candidate ranked 72,757 overall but 25,526 in the OBC category, then your primary competition for OBC seats is among those 25,525 candidates above you."
        ]
      },
      {
        id: "aiq-preparation",
        type: "heading",
        title: "How the AIQ List is Prepared",
        level: 2
      },
      {
        id: "aiq-preparation-content",
        type: "paragraph",
        content: "Here's a simplified snapshot of how the AIQ list is generated:"
      },
      {
        id: "aiq-preparation-list",
        type: "list",
        items: [
          "All the candidates who have scored 276 marks (General/EWS), 235 marks (OBC/SC/ST/PWD), and 255 marks (General-PWD/EWS-PWD) have been shortlisted.",
          "These candidates are allocated AIQ ranks based on their NEET PG scores.",
          "Ranks that do not appear in the AIQ list represent candidates who did not meet the cut‑off criteria for their category.",
          "Category-wise filtering ensures that the reserved seats are distributed fairly."
        ]
      },
      {
        id: "missing-ranks",
        type: "heading",
        title: "Why Some Ranks Are Missing",
        level: 2
      },
      {
        id: "missing-ranks-content",
        type: "paragraph",
        content: "If your NEET PG rank appears in the main results, but if it's not in the AIQ merit list, it means:"
      },
      {
        id: "missing-ranks-list",
        type: "list",
        items: [
          "You're below the qualifying cutoff for your category.",
          "You will not be eligible to participate in All India Counselling, but remain eligible for state-level processes (if it's applicable)."
        ]
      },
      {
        id: "category-rank-role",
        type: "heading",
        title: "The Role of Category Ranks",
        level: 2
      },
      {
        id: "category-rank-role-content",
        type: "paragraph",
        content: "Category ranks are crucial because they help to evaluate competition within your category. For example:\n\nA candidate ranked 28,456 overall but 1,519 in the SC category knows that 1,518 SC candidates are ahead.\n\nThis information helps gauge realistic seat allotments, especially for reserved categories.\n\nFor SC/ST candidates, category rank analysis is critical because very few opt for General seats, making category rank a more reliable predictor. For OBC candidates, AIQ rank often suffices because half of them secure General seats, reducing direct category competition."
      },
      {
        id: "allotment-process",
        type: "heading",
        title: "Allotment Process: Rank-Based, Not Category-Based",
        level: 2
      },
      {
        id: "allotment-process-content",
        type: "paragraph",
        content: "Counselling does not allot seats category-wise in isolation. Instead, it works rank-by-rank:"
      },
      {
        id: "allotment-process-list",
        type: "list",
        items: [
          "The system reviews the candidate's top choice and checks seat availability in both the General and reserved categories.",
          "A reserved-category candidate (OBC/SC/ST/EWS) can take a General seat if available.",
          "Once all General seats are filled, reserved seats are allocated to candidates eligible under those categories.",
          "For example, if a General seat in MAMC Pediatrics is available, even an OBC candidate may be allotted that seat."
        ]
      },
      {
        id: "key-dates",
        type: "heading",
        title: "Key Dates to Remember",
        level: 2
      },
      {
        id: "key-dates-list",
        type: "list",
        items: [
          "Aug 19, 2025: Results published (with NEET PG rank).",
          "Aug 27, 2025: AIQ 50% quota merit list released.",
          "Aug 29, 2025: NEET PG scorecards available.",
          "Sept 5, 2025: AIQ rank cards released."
        ]
      },
      {
        id: "key-dates-note",
        type: "info-box",
        boxType: "info",
        content: "Always carry your Aug 29 scorecard for counselling purposes. AIQ rank cards are useful for reference, but not mandatory."
      },
      {
        id: "state-counselling",
        type: "heading",
        title: "Why State Counselling Is Different",
        level: 2
      },
      {
        id: "state-counselling-content",
        type: "paragraph",
        content: "State counselling has its own eligibility and category rules. For instance:\n\n• A candidate listed as General in NEET PG might qualify as OBC or BCA in a state.\n• Similarly, missing a category in the NBE application does not affect your state-level eligibility if you have the correct certificates."
      },
      {
        id: "using-aiq-data",
        type: "heading",
        title: "How to Use the AIQ Data",
        level: 2
      },
      {
        id: "using-aiq-data-content",
        type: "paragraph",
        content: "This data is valuable for:"
      },
      {
        id: "using-aiq-data-list",
        type: "list",
        items: [
          "Predicting seat availability: Compare this year's category ranks with last year's.",
          "Identifying trends: E.g., if OBC candidates increased by 10% in the top 5,000 ranks, plan backup options.",
          "Strategizing seat preferences: Know where competition is rising and adjust your choices accordingly.",
          "For SC/ST candidates, category rank-based comparisons provide better accuracy."
        ]
      },
      {
        id: "pro-tips",
        type: "heading",
        title: "Pro Tips for Counselling",
        level: 2
      },
      {
        id: "pro-tips-list",
        type: "list",
        items: [
          "Start building your preference list with a ±20% buffer based on your rank.",
          "Add backup options beyond your ideal choices to avoid missing seats.",
          "Follow MCC updates closely; no category changes are allowed in AIQ counselling.",
          "Join Telegram or MCC resources to access sorted PDFs and rank analysis."
        ]
      },
      {
        id: "conclusion",
        type: "heading",
        title: "Conclusion",
        level: 2
      },
      {
        id: "conclusion-content",
        type: "paragraph",
        content: "The NEET PG 2025 All India 50% Quota merit list is not just a rank sheet; it's a key guide for AIQ counselling. Understanding how AIQ rank, NEET PG rank, and category rank interact will help you navigate the process confidently.\n\nWhile rank analysis can give insights, counselling success depends on careful planning, backup choices, and staying updated with MCC notifications. State counselling remains independent, so being missing from this merit list doesn't end your chances.\n\nFor real-time guidance, detailed PDFs, and counselling support, join dedicated Telegram groups or explore MCC resources. Knowledge is your biggest tool in securing your dream seat."
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
            question: "Q1. Who is eligible for AIQ counselling?",
            answer: "Candidates meeting NEET PG cutoffs: General/EWS – 50th percentile, OBC/SC/ST/PwD 40th percentile, General-PwD/EWS-PwD – 45th percentile. Eligible candidates can participate in MCC AIQ rounds, Deemed/Central Universities, ESIC/AFMS, and DNB counselling. State counselling is separate."
          },
          {
            question: "Q2. Difference between NEET PG Rank, AIQ Rank, and Category Rank?",
            answer: "NEET PG Rank: Overall rank among all candidates. AIQ Rank: Rank after filtering only AIQ-eligible candidates; may differ from NEET PG Rank. Category Rank: Position within your reserved category; shows intra-category competition."
          },
          {
            question: "Q3. Why is my AIQ rank missing? Can I join state counselling?",
            answer: "Missing AIQ rank = cutoff not met for AIQ; you cannot participate in MCC AIQ rounds. Yes, you can join state counselling, as it follows separate merit lists and rules."
          },
          {
            question: "Q4. How should I use AIQ ranks for counselling?",
            answer: "Use AIQ and Category ranks to benchmark, make a choice list with backups, and follow MCC rules for seat allotment."
          }
        ]
      },
      {
        id: "contact-form",
        type: "contact-form",
        title: "Submit queries to BelieversConsultancy",
        content: "Have a question beyond these FAQs? Submit the Google Form and the team will respond during 9 AM–7 PM support hours: https://docs.google.com/forms/d/1uE2R_rzlOv-3LA-L3VJtFDDQx-kLQ496dPZVYrcKdkE/edit"
      },
      {
        id: "about",
        type: "paragraph",
        content: "Believers Consultancy has distilled the original notice into a clear, easy-to-read summary, highlighting every key point so candidates, state authorities, and institutions can quickly understand everything without any inconvenience."
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