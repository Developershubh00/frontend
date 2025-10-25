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
    featured_image: "https://cdn.dribbble.com/userupload/45442253/file/9ebb4e15e40c6628ad591e2bcfefa16a.png?w=1200&h=600&fit=crop",
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
    published_date: "2025-10-05",
    read_time: 5,
    meta_description: " Explore NRI category seat eligibility, documentation, and MEA’s latest guidelines for NEET PG 2025 Counselling to secure your dream postgraduate seat.",
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
    published_date: "2025-10-07",
    read_time: 5,
    meta_description: "Find out if you can change your category during NEET PG 2025 All India Counselling. Know rules, process, and key updates for hassle-free seat allocation..",
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
    published_date: "2025-10-09",
    read_time: 5,
    meta_description: "Master your NEET-PG Counselling with smart strategies for All India and State rounds. Learn seat choice tactics, category rules, and top ranker insights..",
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
    published_date: "2025-10-11",
    read_time: 5,
    meta_description: "Understand the NEET PG 2025 All India 50% Quota Counselling process, eligibility, and seat allotment steps to secure your desired postgraduate seat.",
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
  },
    {
    id: 5,
    title: "NEET PG 2025: Understanding PG Diploma vs NBE Diploma",
    slug: "neet-pg-2025-understanding-pg-diploma-vs-nbe-diploma",
    excerpt: "Many NEET PG 2025 aspirants are considering options beyond MD/MS. Learn about PG Diploma and NBE Diploma courses, their differences, and which pathway suits your career goals.",
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
    tags: ["NEET PG 2025", "PG Diploma", "NBE Diploma", "Medical Education", "Career Pathways"],
    published_date: "2025-10-13",
    read_time: 5,
    meta_description: "Compare PG Diploma and NBE Diploma under NEET PG 2025. Understand course structure, recognition, and career scope to make the right postgraduate choice.",
    sections: [
      {
        id: "intro",
        type: "paragraph",
        content: "From per NEET PG 2025 point of view, many aspirants are considering their options beyond the traditional MD/MS route. Among these preferences, PG Diploma and NBE Diploma courses often serve curiosity and confusion at the same time. Both are valid, recognized, two-year postgraduate medical programs, but they are different in terms of structure, authorization, and long-term career pathways.\n\nHere's a detailed breakdown to help you make an informed decision."
      },
      {
        id: "what-are-courses",
        type: "heading",
        title: "What Are PG Diploma and NBE Diploma Courses?",
        level: 2
      },
      {
        id: "pg-diploma",
        type: "heading",
        title: "PG Diploma",
        level: 3
      },
      {
        id: "pg-diploma-list",
        type: "list",
        items: [
          "It has been offered in both medical colleges, either government and private.",
          "There are two-year courses like DCH (Child Health), DGO (Obstetrics and Gynecology), and many more.",
          "It was once widely available, but now it is highly limited to around 300 seats after most of the programs were converted into MD/MS degrees.",
          "Regulated by NMC (National Medical Commission)."
        ]
      },
      {
        id: "nbe-diploma",
        type: "heading",
        title: "NBE Diploma",
        level: 3
      },
      {
        id: "nbe-diploma-list",
        type: "list",
        items: [
          "Offered in hospitals (including private hospitals, government hospitals, and district hospitals).",
          "Introduced to expand training opportunities, especially in smaller institutions.",
          "About 3,500 seats are available, with roughly 2,700–2,800 filled annually.",
          "Accredited by NBEMS (National Board of Examinations in Medical Sciences) and recognized under the NMC Act's First Schedule.",
          "Currently offered in 9 specialties, including the relatively new Diploma in Emergency Medicine."
        ]
      },
      {
        id: "key-differences",
        type: "heading",
        title: "Key Differences Between PG Diploma and NBE Diploma",
        level: 2
      },
      {
        id: "comparison-table",
        type: "table",
        headers: ["Feature", "PG Diploma", "NBE Diploma"],
        rows: [
          ["Duration", "2 years", "2 years"],
          ["Offered At", "Medical colleges", "Hospitals (Govt./Private)"],
          ["Accrediting Body", "National Medical Commission (NMC)", "National Board of Examinations (NBE)"],
          ["Recognition", "First Schedule, NMC Act", "First Schedule, NMC Act"],
          ["Seats", "300", "3,500"],
          ["Exams Conducted By", "University", "NBEMS"],
          ["Specialties", "Broader range", "Limited (9 specialties)"],
          ["Fee Structure", "Varies by institute", "₹1.25 lakh/year (fixed, no mgmt quota)"],
          ["Bond", "As per state/institute policy", "None in private hospitals"]
        ]
      },
      {
        id: "why-choose-diplomas",
        type: "heading",
        title: "Why Candidates Choose Diplomas",
        level: 2
      },
      {
        id: "why-choose-diplomas-content",
        type: "paragraph",
        content: "Many doctors consider diploma programs because:"
      },
      {
        id: "why-choose-diplomas-list",
        type: "list",
        items: [
          "MD/MS seats are limited or financially inaccessible.",
          "Diplomas allow practitioners to start clinical practice sooner.",
          "They create a pathway for career growth through secondary DNB or MD/MS programs."
        ]
      },
      {
        id: "pathways-after-diploma",
        type: "heading",
        title: "Pathways After Completing a Diploma",
        level: 2
      },
      {
        id: "practice-specialty",
        type: "heading",
        title: "Practice in Your Specialty",
        level: 3
      },
      {
        id: "practice-specialty-content",
        type: "paragraph",
        content: "Both diplomas are recognized, allowing you to practice in your chosen field after completion."
      },
      {
        id: "secondary-dnb",
        type: "heading",
        title: "Secondary DNB (Post-Diploma DNB)",
        level: 3
      },
      {
        id: "secondary-dnb-list",
        type: "list",
        items: [
          "After completing a diploma, candidates can appear for DNB-PDCET to enter a 2-year secondary DNB course in the same specialty.",
          "This is a less competitive path compared to NEET PG.",
          "Example: DCH → DNB Pediatrics (2 years)."
        ]
      },
      {
        id: "md-ms-after-diploma",
        type: "heading",
        title: "MD/MS After Diploma",
        level: 3
      },
      {
        id: "md-ms-after-diploma-list",
        type: "list",
        items: [
          "Diploma holders can pursue an MD/MS in the same specialty in just two years (as per regulations).",
          "However, few examples exist yet for NBE diploma holders; policy is clear, but real-world verification is limited."
        ]
      },
      {
        id: "teaching-hospitals",
        type: "heading",
        title: "Career in Teaching Hospitals",
        level: 3
      },
      {
        id: "teaching-hospitals-list",
        type: "list",
        items: [
          "Diploma holders can practice, but some posts, such as Senior Resident or faculty positions, often require a degree (MD/MS/DNB).",
          "Rarely, diploma holders with 6+ years' experience in government institutes may become eligible for teaching roles."
        ]
      },
      {
        id: "super-specialization",
        type: "heading",
        title: "No Direct Entry to Super Specialization",
        level: 3
      },
      {
        id: "super-specialization-content",
        type: "paragraph",
        content: "Super specialty courses require a degree. A diploma alone is not sufficient."
      },
      {
        id: "fees-stipends-bonds",
        type: "heading",
        title: "Fees, Stipends, and Bonds",
        level: 2
      },
      {
        id: "fees",
        type: "heading",
        title: "Fees:",
        level: 3
      },
      {
        id: "fees-list",
        type: "list",
        items: [
          "PG Diplomas vary widely (₹1–6 lakh annually in some deemed institutes).",
          "NBE Diplomas are fixed at ₹1.25 lakh/year, making them a more affordable choice."
        ]
      },
      {
        id: "stipend",
        type: "heading",
        title: "Stipend:",
        level: 3
      },
      {
        id: "stipend-content",
        type: "paragraph",
        content: "Usually follows state norms, though adherence can vary in private institutions."
      },
      {
        id: "bond",
        type: "heading",
        title: "Bond:",
        level: 3
      },
      {
        id: "bond-list",
        type: "list",
        items: [
          "State-specific bonds apply to PG Diplomas in medical colleges.",
          "No bond applies for NBE Diploma seats in private hospitals."
        ]
      },
      {
        id: "seat-availability",
        type: "heading",
        title: "Seat Availability Snapshot",
        level: 2
      },
      {
        id: "seat-availability-list",
        type: "list",
        items: [
          "PG Diploma: 300 seats (limited growth, mostly legacy programs).",
          "NBE Diploma: 3,500 seats; ~2,100 under All India Counseling.",
          "Seats in government hospitals may also be reserved for in-service candidates."
        ]
      },
      {
        id: "choosing-between",
        type: "heading",
        title: "Choosing Between PG Diploma and NBE Diploma",
        level: 2
      },
      {
        id: "choosing-between-content",
        type: "paragraph",
        content: "While both qualifications are recognized and valid, here are a few practical considerations:"
      },
      {
        id: "choosing-between-list",
        type: "list",
        items: [
          "Location & Training Quality: Evaluate hospital/college reputation, case load, and mentorship rather than the diploma type alone.",
          "Future Plans: If you plan to pursue a degree (DNB/MD/MS), the NBE Diploma offers more flexible entry through PDCET.",
          "Cost & Bond: NBE Diplomas are generally more affordable with fewer restrictions.",
          "Long-Term Career Goals: If teaching or super-specialization is a priority, aim to upgrade to a degree."
        ]
      },
      {
        id: "final-takeaway",
        type: "heading",
        title: "Final Takeaway",
        level: 2
      },
      {
        id: "final-takeaway-content",
        type: "paragraph",
        content: "Both PG Diploma and NBE Diploma are valid courses and can be a strong stepping stone to your medical career. If you want early clinical experience and an affordable option, Also there are opportunities to transition to a degree later, so NBE diploma is a good option. If you are interested in established medical colleges and get a PG diploma seat, that is equally important.\n\nThe Diploma is not a 'shortcut' but a strategic route for doctors who wish to start practising early and keep future avenues open."
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
            question: "Q1. How do PG Diploma and NBE Diploma differ in structure and governance?",
            answer: "Both are two-year programs, but PG Diplomas are offered by medical colleges and regulated by NMC with university exams, whereas NBE Diplomas run in accredited hospitals and are examined centrally by NBEMS."
          },
          {
            question: "Q2. Which pathway offers more flexibility to upgrade to a degree later?",
            answer: "NBE Diploma holders can appear for DNB-PDCET to complete a 2-year secondary DNB in the same specialty; PG Diploma holders may also pursue a 2-year MD/MS in the same specialty, where permitted by regulations."
          },
          {
            question: "Q3. What are the practical differences in seats, fees, and bonds?",
            answer: "PG Diplomas have limited seats (~300) with institute/state-dependent fees and possible bonds; NBE Diplomas have larger availability (~3,500 seats), a typical fee around ₹1.25 lakh/year, and generally no bond in private hospitals."
          },
          {
            question: "Q4. Can diploma holders teach or pursue a super-specialty later?",
            answer: "Diplomas allow independent practice; some senior resident/faculty posts often require MD/MS/DNB. Super-specialty (DM/MCh) requires a degree, so diploma holders should plan to upgrade via secondary DNB or MD/MS before SS."
          }
        ]
      },
      {
        id: "contact-form",
        type: "contact-form",
        title: "Submit queries to BelieversConsultancy",
        content: "Have a question beyond these FAQs? Submit the Google Form and the team will respond during 9 AM–7 PM support hours: https://docs.google.com/forms/d/1uE2R_rzlOv-3LA-L3VJtFDDQx-kLQ496dPZVYrcKdkE/edit"
      }
    ]
  },
  {
  "id": 6,
  "title": "NEET PG 2025 Counselling: A Guide to Category Change Rules Counselling",
  "slug": "neet-pg-2025-category-change-rules-counselling",
  "excerpt": "Comprehensive guide to category modification rules during NEET PG 2025 All India Counselling. Learn what changes are permitted, eligibility criteria, and how category selection impacts your seat allotment.",
  "featured_image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
  "author": {
    "name": "Believers Team",
    "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    "bio": "Expert medical education consultants with over 10 years of experience in NEET counseling and admissions."
  },
  "category": {
    "name": "NEET PG",
    "slug": "neet-pg",
    "color": "bg-blue-100 text-blue-800"
  },
  "tags": ["NEET PG 2025", "Counselling", "Category Changes", "Medical Admissions", "Reservation"],
  "published_date": "2025-10-24",
  "read_time": 10,
  "meta_description": "Know the NEET PG 2025 Counselling category change rules and process to make informed decisions and secure your rightful seat with clarity and confidence.",
  "sections": [
    {
      "id": "intro",
      "type": "paragraph",
      "content": "The NEET PG 2025 counselling process is an essential step in shaping the postgraduate careers of medical graduates across India. There are various queries that candidates raise during this high-stakes process; one of the most pressing concerns is the possibility of modifying their reservation category once counselling begins.\n\nThis guide clarifies the official rules regarding category modifications during the All India Counselling process, outlining what is permissible and what is not. It clarifies the concepts of what is permitted and what is not, and explains how these rules can significantly impact your seat allotment and overall admission process."
    },
    {
      "id": "source-category",
      "type": "heading",
      "title": "Source of Category Information",
      "level": 2
    },
    {
      "id": "source-category-content",
      "type": "paragraph",
      "content": "During the NEET PG application process on the National Board of Examinations (NBE) portal, candidates were required to select their respective category either it's (General, OBC, SC, ST, or EWS) and specify their Persons with Disabilities (PWD) status (Yes/No).\n\nThis information is:"
    },
    {
      "id": "source-category-list",
      "type": "list",
      "items": [
        "Reflected in the NEET PG scorecard",
        "Shared directly with the Medical Counselling Committee (MCC) for All India Counselling",
        "Used to determine reservation eligibility for 50% All India Quota (AIQ) Government Seats and DNB and NB Diploma seats in both private and government institutions"
      ]
    },
    {
      "id": "source-category-note",
      "type": "paragraph",
      "content": "Once submitted, these details form the foundation of the candidate's entire All India Counselling journey."
    },
    {
      "id": "category-changes",
      "type": "heading",
      "title": "Category Changes: What Is Possible and What Is Not",
      "level": 2
    },
    {
      "id": "category-changes-table",
      "type": "table",
      "headers": ["Scenario", "Change Allowed?", "Notes"],
      "rows": [
        ["General → OBC/SC/ST/EWS", "No", "Not permitted, even in genuine cases. Legal direction would be required for exceptions."],
        ["OBC/SC/ST/EWS → General", "Yes", "Candidates can voluntarily surrender their reservation benefits during MCC registration."],
        ["PWD Yes → No", "Yes", "Allowed if a valid disability certificate cannot be provided."],
        ["PWD No → Yes", "No", "Not permitted under MCC rules; legal intervention is required in genuine cases."]
      ]
    },
    {
      "id": "state-counselling",
      "type": "heading",
      "title": "State Counselling Rules",
      "level": 2
    },
    {
      "id": "state-counselling-content",
      "type": "paragraph",
      "content": "It is important to note that state counselling is independent of your NEET PG application category. In the state counselling, candidates can apply under different reservation categories during their state counselling registration processes.\n\nThe only state exception is Bihar, where PWD status changes may not be allowed. Whereas other states typically allow changes if candidates have valid documentation."
    },
    {
      "id": "categories-eligibility",
      "type": "heading",
      "title": "Categories and Seat Eligibility in NEET PG 2025",
      "level": 2
    },
    {
      "id": "categories-eligibility-content",
      "type": "paragraph",
      "content": "MCC categorizes candidates according to established reservation policies, with category assignment determining seat eligibility across different quotas.\n\nCategories:"
    },
    {
      "id": "categories-list",
      "type": "list",
      "items": [
        "General",
        "OBC",
        "SC",
        "ST",
        "EWS",
        "PWD (horizontal reservation of 5%)"
      ]
    },
    {
      "id": "important-notes",
      "type": "heading",
      "title": "Important Notes",
      "level": 3
    },
    {
      "id": "important-notes-list",
      "type": "list",
      "items": [
        "Category information is transferred from NBE to MCC without modification capabilities. Candidates requiring category corrections must address these through NBE before data transmission for counselling.",
        "Candidates eligible for reserved categories maintain concurrent eligibility for unreserved seats based on merit ranking, with no additional registration required for general category consideration.",
        "State counselling is separate and follows different rules."
      ]
    },
    {
      "id": "seat-eligibility-glance",
      "type": "heading",
      "title": "Seat Eligibility at a Glance",
      "level": 2
    },
    {
      "id": "seat-eligibility-table",
      "type": "table",
      "headers": ["Candidate Category", "Eligible for Seats in"],
      "rows": [
        ["General", "General seats only"],
        ["OBC", "OBC + General seats"],
        ["SC", "SC + General seats"],
        ["ST", "ST + General seats"],
        ["EWS", "EWS + General seats"],
        ["PWD", "PWD in their category + General PWD + General seats"]
      ]
    },
    {
      "id": "seat-reservation",
      "type": "heading",
      "title": "Seat Reservation Structure",
      "level": 2
    },
    {
      "id": "seat-reservation-content",
      "type": "paragraph",
      "content": "Here's how seats are reserved under All India Counselling:"
    },
    {
      "id": "seat-reservation-list",
      "type": "list",
      "items": [
        "General: 40.5%",
        "OBC: 27%",
        "SC: 15%",
        "ST: 7.5%",
        "EWS: 10%",
        "PWD: 5% (horizontal, across all categories)"
      ]
    },
    {
      "id": "seat-reservation-note",
      "type": "paragraph",
      "content": "Candidates should review both category-specific and general seat options to maximize placement opportunities within their eligibility range."
    },
    {
      "id": "key-takeaways",
      "type": "heading",
      "title": "Key Takeaways",
      "level": 2
    },
    {
      "id": "key-takeaways-list",
      "type": "list",
      "items": [
        "Always check both your category and General category seats to avoid missing opportunities.",
        "Reserved-category candidates often secure General seats first, so filtering wisely is crucial.",
        "Seat distribution follows a multi-point reservation roster that cycles across years; PWD is a 5% horizontal reservation applied within each category, not a separate vertical rotation.",
        "Use your All India Rank and Category Rank together for a clear picture of your chances.",
        "Remember that state counselling is separate and follows different eligibility criteria."
      ]
    },
    {
      "id": "why-matters",
      "type": "heading",
      "title": "Why This Matters",
      "level": 2
    },
    {
      "id": "why-matters-content",
      "type": "paragraph",
      "content": "A comprehensive understanding of MCC procedures and reservation policies is essential for optimal seat allocation outcomes."
    },
    {
      "id": "category-selection",
      "type": "heading",
      "title": "Suggestions for Category Selection",
      "level": 2
    },
    {
      "id": "category-selection-content",
      "type": "paragraph",
      "content": "Your preferred category affects:"
    },
    {
      "id": "category-selection-list",
      "type": "list",
      "items": [
        "Eligibility for reserved and general category seats",
        "The requirement to present valid reservation certificates at the time of admission",
        "Your ability to claim or opt out of reservation benefits"
      ]
    },
    {
      "id": "incorrect-category",
      "type": "heading",
      "title": "Incorrect or Mismatched Category Details Can Lead To",
      "level": 3
    },
    {
      "id": "incorrect-category-list",
      "type": "list",
      "items": [
        "Cancellation of allotted seats at the reporting institute",
        "Loss of opportunities for both general and reserved category seats"
      ]
    },
    {
      "id": "key-recommendations",
      "type": "heading",
      "title": "Key Recommendations for NEET PG 2025 Candidates",
      "level": 2
    },
    {
      "id": "key-recommendations-list",
      "type": "list",
      "items": [
        "Review your category information in your NEET PG application",
        "Remember that downgrades (e.g., OBC to General) are straightforward, while upgrades (General to OBC/SC/ST/EWS) are not permitted",
        "PWD candidates must secure valid disability certificates to avoid losing allotted seats",
        "Stay updated with official MCC notifications for any changes to the counselling process"
      ]
    },
    {
      "id": "conclusion",
      "type": "heading",
      "title": "Conclusion",
      "level": 2
    },
    {
      "id": "conclusion-content",
      "type": "paragraph",
      "content": "Category selection in the NEET PG application plays a pivotal role in regulating the seat allotment and admission eligibility. While the system allows candidates to surrender reservation benefits, candidates are not allowed to upgrade to reserved categories after initial application submission. Understanding these rules, preparing valid documentation, and staying informed about both All India and state-level counselling procedures are beneficial in reducing the risk of elimination or missed opportunities.\n\nBy planning ahead and adhering to MCC guidelines, candidates can ensure a smooth and transparent counselling experience for NEET PG 2025."
    },
    {
      "id": "faqs",
      "type": "heading",
      "title": "FAQs on NEET PG 2025 Category Changes",
      "level": 2
    },
    {
      "id": "faqs-list",
      "type": "faq",
      "faqs": [
        {
          "question": "Can I change my category from General to OBC/SC/ST/EWS during counselling?",
          "answer": "No. Upgrading to a reserved category after application submission is not allowed under MCC rules."
        },
        {
          "question": "Can I switch from OBC/SC/ST/EWS to General?",
          "answer": "Yes. Candidates can voluntarily give up their reservation benefits at the time of counselling registration."
        },
        {
          "question": "Can I change my PWD status?",
          "answer": "Yes to No: Allowed if a valid disability certificate isn't available. No to Yes: Not permitted without legal intervention."
        },
        {
          "question": "Are state counselling category rules the same as All India Counselling?",
          "answer": "No. State counselling has separate processes, often allowing changes if valid proof is provided. Bihar may have stricter rules for PWD status."
        },
        {
          "question": "Can I change my category during All India Counselling?",
          "answer": "No. Candidates cannot upgrade from General to OBC/SC/ST/EWS or change their category once registered on the NBE portal. However, candidates who applied under OBC, SC, ST, or EWS can opt to participate as General during MCC registration."
        },
        {
          "question": "Does my All India category selection affect State Counselling?",
          "answer": "No. State counselling is entirely separate and follows its own reservation structure. Candidates can register under a different category in state counselling based on valid certificates and state-specific norms."
        },
        {
          "question": "How do PWD reservations work in NEET PG 2025?",
          "answer": "PWD candidates receive 5% horizontal reservation across all categories. If a PWD candidate qualifies for a General seat, they may claim it, and additional PWD category seats remain open for others."
        },
        {
          "question": "Why do top-ranked reserved-category candidates often take General seats?",
          "answer": "All seats are allotted strictly based on merit. Reserved-category candidates with top ranks can take General seats first, allowing other reserved candidates to claim category-specific seats."
        }
      ]
    },
    {
      "id": "contact-form",
      "type": "contact-form",
      "title": "Submit queries to BelieversConsultancy",
      "content": "Have a question beyond these FAQs? Submit the Google Form and the team will respond during 9 AM–7 PM support hours: https://docs.google.com/forms/d/1uE2R_rzlOv-3LA-L3VJtFDDQx-kLQ496dPZVYrcKdkE/edit"
    }
  ]
},
  
{
  id: 7,
  title: "NEET PG 2025: A Complete Guide to the OBC-NCL Certificate",
  slug: "neet-pg-2025-complete-guide-obc-ncl-certificate",
  excerpt: "The OBC-NCL certificate is mandatory for medical graduates seeking admission under the 27% OBC quota in All India Quota seats for NEET PG 2025. This explainer clarifies purpose, eligibility, validity, and the application pathway for claiming OBC-NCL under AIQ.",
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
  tags: ["NEET PG 2025", "OBC-NCL Certificate", "All India Quota", "Medical Admissions", "Reservation"],
  published_date: "2025-10-24",
  read_time: 8,
  meta_description: " Learn everything about the OBC NCL certificate for NEET PG 2025 including eligibility documents and how to ensure a smooth counselling process.",
  sections: [
    {
      id: "intro",
      type: "paragraph",
      content: "The OBC-NCL (Other Backward Class – Non-Creamy Layer) certificate is very important for NEET PG 2025 aspirants applying through All India Quota (AIQ). This guide explains eligibility, benefits, the application process, and common queries.\n\nHere is the detailed explanation:"
    },
    {
      id: "why-need-certificate",
      type: "heading",
      title: "Why You Need an OBC-NCL Certificate",
      level: 2
    },
    {
      id: "why-need-certificate-list",
      type: "list",
      items: [
        "For AIQ under MCC, the OBC certificate must certify Non-Creamy Layer status as per the Central OBC List and be in the prescribed format issued by a competent authority; state-list-only OBC status is not accepted for AIQ.",
        "State-issued OBC certificates are not valid for AIQ admissions.",
        "MCC applies 27% OBC-NCL reservation in AIQ; open AIQ includes 50% AIQ of government seats and 100% DNB under AIQ, as per the counselling scheme.",
        "OBC-NCL candidates qualify at the 40th percentile; UR/EWS require the 50th percentile; UR-PwBD is 45th percentile"
      ]
    },
    {
      id: "central-vs-state",
      type: "heading",
      title: "Central vs. State Certificates",
      level: 2
    },
    {
      id: "central-vs-state-list",
      type: "list",
      items: [
        "Certificates must be issued by a competent authority (e.g., Tehsildar/SDM/DM); for AIQ, the caste must be in the NCBC Central List and the certificate must follow MCC's proforma.",
        "State OBC/Backward Class Certificate - For state counselling only.",
        "Always verify your caste in the NCBC (National Commission for Backward Classes) central list to ensure eligibility."
      ]
    },
    {
      id: "what-is-certificate",
      type: "heading",
      title: "What Is the OBC-NCL Certificate?",
      level: 2
    },
    {
      id: "what-is-certificate-content",
      type: "paragraph",
      content: "The OBC-NCL certificate verifies two things:"
    },
    {
      id: "what-is-certificate-list",
      type: "list",
      items: [
        "OBC Status: The candidate belongs to a caste or community listed in the Central OBC list, notified by the National Commission for Backward Classes (NCBC).",
        "Non-Creamy Layer (NCL) Status: The candidate's family falls under the non-creamy layer category, determined mainly by parents' income and occupation, making them eligible for reservation benefits.",
        "This is different from a state OBC certificate. A state OBC certificate is valid only for state quota seats, whereas a central OBC-NCL certificate is mandatory for all seats allotted through All India Counselling by the Medical Counselling Committee (MCC)."
      ]
    },
    {
      id: "eligibility-rules",
      type: "heading",
      title: "Key Eligibility Rules",
      level: 2
    },
    {
      id: "eligibility-rules-content",
      type: "paragraph",
      content: "To qualify for an OBC-NCL certificate, you must meet the following conditions:"
    },
    {
      id: "caste-central-list",
      type: "heading",
      title: "Caste in Central List:",
      level: 3
    },
    {
      id: "caste-central-list-list",
      type: "list",
      items: [
        "Verify that your caste/community is listed in the NCBC Central OBC List.",
        "State OBC status alone makes you eligible for AIQ reservation."
      ]
    },
    {
      id: "income-criteria",
      type: "heading",
      title: "Income Criteria:",
      level: 3
    },
    {
      id: "income-criteria-list",
      type: "list",
      items: [
        "Parents' combined annual income (excluding salary and agricultural income) must be below ₹8 lakh for the last three financial years.",
        "For NEET PG 2025, income is assessed for the years 2022–2023, 2023–2024, and 2024–2025."
      ]
    },
    {
      id: "exclusions",
      type: "heading",
      title: "Exclusions:",
      level: 3
    },
    {
      id: "exclusions-content",
      type: "paragraph",
      content: "Children of specified constitutional/functionary categories and Group-A/Group-B officers fall under creamy-layer exclusions as per DoPT OMs, irrespective of income."
    },
    {
      id: "validity",
      type: "heading",
      title: "Validity of the Certificate",
      level: 2
    },
    {
      id: "validity-list",
      type: "list",
      items: [
        "It must be issued on or after April 1, 2025, for it to be valid for NEET PG 2025 counselling.",
        "Certificates issued before April 1, 2025, are not accepted, even if they mention validity.",
        "Ensure your certificate is digitally recorded in government databases for hassle-free verification."
      ]
    },
    {
      id: "how-to-apply",
      type: "heading",
      title: "How to Apply for an OBC-NCL Certificate",
      level: 2
    },
    {
      id: "how-to-apply-content",
      type: "paragraph",
      content: "You can apply online or offline, depending on your state's process:"
    },
    {
      id: "online-application",
      type: "heading",
      title: "Online Application",
      level: 3
    },
    {
      id: "online-application-list",
      type: "list",
      items: [
        "Visit your state's e-Seva or caste certificate portal.",
        "Fill out the application, upload the required documents, and obtain a digitally signed certificate with a QR code."
      ]
    },
    {
      id: "offline-application",
      type: "heading",
      title: "Offline Application",
      level: 3
    },
    {
      id: "offline-application-content",
      type: "paragraph",
      content: "Visit the Tehsildar, Sub-Divisional Officer (SDO), or District Magistrate's office. Submit documents and request a certificate. Ensure the certificate is properly recorded in government records to avoid counselling issues."
    },
    {
      id: "documents-required",
      type: "heading",
      title: "Documents Required",
      level: 2
    },
    {
      id: "documents-required-list",
      type: "list",
      items: [
        "Proof of identity (Aadhaar, PAN, Voter ID)",
        "Caste proof (OBC caste certificate of the candidate or parents)",
        "Parents' income certificates or IT returns for the past three years",
        "Proof of residence (domicile certificate, ration card, etc.)",
        "Passport-sized photographs"
      ]
    },
    {
      id: "quick-checklist",
      type: "heading",
      title: "Quick Checklist for Your Certificate",
      level: 2
    },
    {
      id: "quick-checklist-content",
      type: "paragraph",
      content: "Before submitting your certificate during counselling, check:"
    },
    {
      id: "quick-checklist-list",
      type: "list",
      items: [
        "Issued after April 1, 2025",
        "Clearly states Non-Creamy Layer",
        "Signed by a Tehsildar or higher authority",
        "Includes a reference to Central Educational Institutions",
        "Proper resolution/order number mentioned"
      ]
    },
    {
      id: "common-mistakes",
      type: "heading",
      title: "Common Mistakes to Avoid",
      level: 2
    },
    {
      id: "common-mistakes-list",
      type: "list",
      items: [
        "Submitting only the state-only OBC certificate for All India Counselling.",
        "Using an outdated certificate issued before April 2025.",
        "Not verifying whether your caste is on the Central OBC list.",
        "Skipping the official registration of your certificate in government databases."
      ]
    },
    {
      id: "key-benefits",
      type: "heading",
      title: "Key Benefits of OBC-NCL Status",
      level: 2
    },
    {
      id: "key-benefits-list",
      type: "list",
      items: [
        "Reservation: 27% AIQ seats in government colleges, DNB institutes, and NBE diploma courses.",
        "Lower Cut-Off: OBC-NCL candidates are eligible from the 40th percentile (compared to the 50th percentile for the General category).",
        "High-merit OBC candidates are considered in UR merit and may also be allotted OBC-reserved seats per AIQ reservation rules."
      ]
    },
    {
      id: "important-rules",
      type: "heading",
      title: "Important Rules & Clarifications",
      level: 2
    },
    {
      id: "important-rules-list",
      type: "list",
      items: [
        "A state OBC certificate cannot be used for AIQ seats.",
        "If you applied under the General category in NEET PG, you cannot later switch to OBC-NCL.",
        "UR→reserved switches are not permitted in AIQ; in prior cycles, MCC enabled one-way conversion from reserved to UR during registration when the certificate was unavailable.",
        "For married candidates, only parents' income is considered, not the spouse's.",
        "Certificates not properly issued or verified in government records may be rejected."
      ]
    },
    {
      id: "final-takeaway",
      type: "heading",
      title: "Final Takeaway",
      level: 2
    },
    {
      id: "final-takeaway-content",
      type: "paragraph",
      content: "The OBC-NCL certificate is essential for claiming OBC reservation in NEET PG 2025. Start the process early, confirm your caste in the Central OBC List, and ensure your certificate is accurate and valid. Being proactive will help you secure your reservation benefits and avoid last-minute hurdles during counselling."
    },
    {
      id: "faqs",
      type: "heading",
      title: "Frequently Asked Questions (FAQs)",
      level: 2
    },
    {
      id: "faqs-list",
      type: "faq",
      faqs: [
        {
          question: "Q1. I am not from Gujarat, but I did my MBBS there. Can I apply for a Government Quota seat?",
          answer: "Yes. If you have completed your MBBS from a recognized university in Gujarat, you are eligible to apply for both Government Quota (GQ) and Management Quota (MQ) seats, but you will be considered under the Unreserved (UR) category."
        },
        {
          question: "Q2. What is the process for purchasing the PIN for registration?",
          answer: "You must purchase a 14-digit PIN online through the official website, medadmgujarat.org, by paying the non-refundable application fee. This PIN is essential to access the registration form."
        },
        {
          question: "Q3. Is there a separate counselling for government and private colleges in Gujarat?",
          answer: "No, Gujarat conducts a single, combined counselling process through ACPPGMEC for all Government Quota and Management Quota seats in both government and private medical colleges across the state."
        },
        {
          question: "Q4. Are the fees paid during registration refundable?",
          answer: "The online PIN purchase fee (application fee) is non-refundable. However, the security deposit paid during the counselling rounds is refundable if you are not allotted a seat or if you join your allotted seat."
        },
        {
          question: "Q5. Is a state OBC certificate valid for All India Quota (AIQ)?",
          answer: "No. AIQ requires a Central OBC-NCL certificate aligned with the NCBC central list; state OBC/SEBC certificates are valid only for state counselling."
        },
        {
          question: "Q6. What income and validity rules apply for OBC-NCL?",
          answer: "Parents' combined non-salary, non-agricultural income must be below ₹8 lakh per year per current norms, and the certificate should be issued after April 1, 2025 for NEET PG 2025."
        },
        {
          question: "Q7. Can category be changed from General to OBC-NCL in MCC counselling?",
          answer: "No. A General-to-reserved switch is not permitted in All India counselling; if listed as OBC-NCL but a certificate cannot be produced, opt to participate as General during MCC registration."
        },
        {
          question: "Q8. Which documents are typically required for a Central OBC-NCL certificate?",
          answer: "Candidate/parents' caste proofs, parents' income tax returns or income statements for the last three financial years, and government-issued ID/address proofs; obtain a digitally signed or Tehsildar/DM-issued certificate."
        }
      ]
    },
    {
      id: "contact-form",
      type: "contact-form",
      title: "Submit queries to BelieversConsultancy",
      content: "Have a question beyond these FAQs? Submit the Google Form and the team will respond during 9 AM–7 PM support hours: https://docs.google.com/forms/d/1uE2R_rzlOv-3LA-L3VJtFDDQx-kLQ496dPZVYrcKdkE/edit"
    }
  ]
},
{
  id: 8,
  title: "Andhra Pradesh NEET PG 2025: Competent Authority Quota (State Government Quota) – Complete Guide",
  slug: "andhra-pradesh-neet-pg-2025-competent-authority-quota-complete-guide",
  excerpt: "This overview addresses key aspects of Andhra Pradesh NEET PG 2025 Competent Authority Quota (CQ) counselling, including eligibility, seat distribution, and application procedures for both local and non-local candidates.",
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
  tags: ["NEET PG 2025", "Andhra Pradesh", "Competent Authority Quota", "State Counselling", "Medical Admissions"],
  published_date: "2025-10-24",
  read_time: 10,
  meta_description: " Explore Andhra Pradesh NEET PG 2025 Counselling under the Competent Authority Quota. Learn eligibility, registration steps, and seat allotment details.",
  sections: [
    {
      id: "intro",
      type: "paragraph",
      content: "This overview addresses key aspects of Andhra Pradesh NEET PG 2025 Competent Authority Quota (CQ) counselling, including eligibility, seat distribution, and application procedures. The CQ counselling process applies to both candidates who completed MBBS in Andhra Pradesh and eligible non-local applicants meeting specific criteria.\n\nKey topics covered:\n• Eligibility criteria\n• Seat distribution\n• Local vs non-local status\n• Reservation rules\n• Application process\n• Fees, penalties, and bond requirements"
    },
    {
      id: "what-is-cq",
      type: "heading",
      title: "What is the Competent Authority Quota (CQ)?",
      level: 2
    },
    {
      id: "what-is-cq-content",
      type: "paragraph",
      content: "Andhra Pradesh conducts two major PG medical counseling rounds:"
    },
    {
      id: "cq-counseling",
      type: "heading",
      title: "Competent Authority Quota (CQ) Counseling",
      level: 3
    },
    {
      id: "cq-counseling-content",
      type: "paragraph",
      content: "Conducted by Dr. YSR University of Health Sciences (YSRUHS) for:"
    },
    {
      id: "cq-counseling-list",
      type: "list",
      items: [
        "50% of the Government college seats",
        "50% of Private college Category A seats",
        "50% seats in SVIMS Tirupati",
        "50% seats in Siddhartha Medical College"
      ]
    },
    {
      id: "management-quota",
      type: "paragraph",
      content: "Management Quota Counseling (for Category B, C, and NRI seats) – To be conducted separately.\n\nThe CQ counselling is conducted for candidates classified as local or those non-local candidates meeting specified residency or employment criteria, distinct from All India Quota eligibility."
    },
    {
      id: "seats-covered",
      type: "heading",
      title: "Seats Covered Under CQ",
      level: 2
    },
    {
      id: "seats-covered-list",
      type: "list",
      items: [
        "50% of seats in Government Medical Colleges (rest go to All India Quota)",
        "50% of Private Medical College (Category A) seats",
        "50% seats in SVIMS Tirupati",
        "50% seats in Siddhartha Medical College, Vijayawada (exclusive to AP)"
      ]
    },
    {
      id: "seats-covered-note",
      type: "paragraph",
      content: "Fee for Category A seats: Category A seat fees are regulated at ₹4.96 lakhs per year as per current guidelines, subject to judicial proceedings. SVIMS Tirupati follows distinct fee structures and stipend policies as outlined in institutional notifications."
    },
    {
      id: "eligibility-criteria",
      type: "heading",
      title: "Eligibility Criteria",
      level: 2
    },
    {
      id: "eligibility-criteria-content",
      type: "paragraph",
      content: "To be eligible for AP CQ counseling, candidates must:"
    },
    {
      id: "qualify-neet-pg",
      type: "heading",
      title: "Qualify NEET PG 2025:",
      level: 3
    },
    {
      id: "qualify-neet-pg-list",
      type: "list",
      items: [
        "UR/EWS: 50th percentile",
        "UR-PwD: 45th percentile",
        "SC/ST/OBC (BCA–BCE): 40th percentile"
      ]
    },
    {
      id: "eligibility-note",
      type: "paragraph",
      content: "Eligibility for reservation benefits under CQ counselling is determined by Andhra Pradesh-issued caste certificates rather than NEET PG category classification."
    },
    {
      id: "local-vs-nonlocal",
      type: "heading",
      title: "Local vs Non-Local Status",
      level: 2
    },
    {
      id: "local-candidates",
      type: "heading",
      title: "Local Candidates:",
      level: 3
    },
    {
      id: "local-candidates-content",
      type: "paragraph",
      content: "You're considered local if you:"
    },
    {
      id: "local-candidates-list",
      type: "list",
      items: [
        "Did MBBS from the AU region (Andhra University) or the SVU region (Sri Venkateshwara University)",
        "Studied in Siddhartha Medical College (status based on MBBS admission region)"
      ]
    },
    {
      id: "local-status-note",
      type: "paragraph",
      content: "Local status is conferred based on the regional classification of the MBBS institution (AU or SVU), independent of state domicile."
    },
    {
      id: "nonlocal-candidates",
      type: "heading",
      title: "Non-Local Candidates:",
      level: 3
    },
    {
      id: "nonlocal-candidates-content",
      type: "paragraph",
      content: "Eligible for 15% unreserved seats in each region if you:"
    },
    {
      id: "nonlocal-candidates-list",
      type: "list",
      items: [
        "Lived in AP for 10 years (excluding education)",
        "Parent/spouse is employed in the AP government/PSU",
        "Employed in AP government/quasi-government institutions",
        "Your spouse is a local candidate"
      ]
    },
    {
      id: "seat-distribution",
      type: "heading",
      title: "Seat Distribution in AP Colleges",
      level: 2
    },
    {
      id: "au-svu-region",
      type: "heading",
      title: "AU and SVU Region Colleges:",
      level: 3
    },
    {
      id: "au-svu-region-list",
      type: "list",
      items: [
        "85% reserved for local candidates",
        "15% unreserved (open to both local & eligible non-local)"
      ]
    },
    {
      id: "siddhartha-medical",
      type: "heading",
      title: "Siddhartha Medical College:",
      level: 3
    },
    {
      id: "siddhartha-medical-list",
      type: "list",
      items: [
        "65.62% for AU local candidates",
        "34.38% for SVU locals",
        "15% unreserved"
      ]
    },
    {
      id: "community-reservation",
      type: "heading",
      title: "Community-Based Reservation (2025)",
      level: 2
    },
    {
      id: "sc-subcategories",
      type: "heading",
      title: "SC Subcategories:",
      level: 3
    },
    {
      id: "sc-subcategories-list",
      type: "list",
      items: [
        "SC1 – 6.5%",
        "SC2 – 7.5%",
        "SC3 – 1%"
      ]
    },
    {
      id: "other-categories",
      type: "list",
      items: [
        "ST: As per existing norms",
        "BC (BCA–BCE): Category-wise as before",
        "Women: 33.3% across all categories",
        "PwD: 5% horizontal reservation",
        "EWS: Not applicable unless approved officially"
      ]
    },
    {
      id: "inservice-reservation",
      type: "heading",
      title: "In-Service Candidate Reservation",
      level: 2
    },
    {
      id: "reservation-quota",
      type: "heading",
      title: "Reservation Quota:",
      level: 3
    },
    {
      id: "reservation-quota-list",
      type: "list",
      items: [
        "Clinical specialties: 15% reserved",
        "Non-clinical specialties: 30% reserved"
      ]
    },
    {
      id: "reservation-note",
      type: "paragraph",
      content: "The in-service reservation percentage for clinical specialties is currently set at 15% as per updated state guidelines."
    },
    {
      id: "eligibility-conditions",
      type: "heading",
      title: "Eligibility Conditions:",
      level: 3
    },
    {
      id: "eligibility-conditions-list",
      type: "list",
      items: [
        "2 years in a tribal/rural area OR",
        "6 years in services like Health Services, IAB, PVP, AP Insurance, University of Health Sciences",
        "Minimum 10 years of service remaining",
        "Should not hold an existing PG degree (diploma holders can apply in the same specialty if prior in-service)"
      ]
    },
    {
      id: "inservice-important",
      type: "heading",
      title: "Important:",
      level: 3
    },
    {
      id: "inservice-important-content",
      type: "paragraph",
      content: "No incentive marks are given. Must join service after PG; otherwise:"
    },
    {
      id: "inservice-important-list",
      type: "list",
      items: [
        "Refund tuition + stipend",
        "₹10 lakh penalty"
      ]
    },
    {
      id: "application-process",
      type: "heading",
      title: "Application Process (on Dr. NTRUHS Portal)",
      level: 2
    },
    {
      id: "registration-steps",
      type: "heading",
      title: "Registration Steps:",
      level: 3
    },
    {
      id: "registration-steps-list",
      type: "list",
      items: [
        "Visit the NTRUHS portal",
        "Register with: NEET PG Roll Number, Caste & PWD status, OTP verification",
        "Login, pay fee, upload: Personal & academic info, Signature & photo, Required documents in PDF",
        "Save and print the application"
      ]
    },
    {
      id: "essential-documents",
      type: "heading",
      title: "Essential Documents",
      level: 2
    },
    {
      id: "mandatory-all",
      type: "heading",
      title: "Mandatory for All:",
      level: 3
    },
    {
      id: "mandatory-all-list",
      type: "list",
      items: [
        "NEET PG scorecard (remove password)",
        "Date of birth proof (10th mark sheet)",
        "Govt. ID proof",
        "CRRI certificate",
        "MBBS degree or provisional",
        "MBBS study certificates (year-wise)",
        "Passport-size photo & signature",
        "Migration/Transfer certificate (or affidavit)",
        "6th–12th class certificates (for local status)",
        "Caste certificate (latest, integrated)",
        "PWD certificate (if applicable)"
      ]
    },
    {
      id: "nonlocal-documents",
      type: "heading",
      title: "For Non-Local Candidates (anyone):",
      level: 3
    },
    {
      id: "nonlocal-documents-list",
      type: "list",
      items: [
        "10-year AP residency certificate",
        "MRO-issued residency certificate",
        "Parent/spouse employment proof in AP govt."
      ]
    },
    {
      id: "inservice-documents",
      type: "heading",
      title: "For In-Service Candidates:",
      level: 3
    },
    {
      id: "inservice-documents-list",
      type: "list",
      items: [
        "Annexure 4A & 4B",
        "Local status certificate",
        "Migrated candidates: Digitally signed local status from AP"
      ]
    },
    {
      id: "application-fees",
      type: "heading",
      title: "Application Fees",
      level: 2
    },
    {
      id: "application-fees-list",
      type: "list",
      items: [
        "OC/BC (Andhra Pradesh locals): ₹7,080",
        "SC/ST (Andhra Pradesh locals): ₹5,900",
        "Non-local MBBS candidates: ₹3,540",
        "FMGs (Foreign Medical Graduates): ₹8,260"
      ]
    },
    {
      id: "tuition-fee-structure",
      type: "heading",
      title: "Tuition Fee Structure",
      level: 2
    },
    {
      id: "tuition-fee-structure-list",
      type: "list",
      items: [
        "Government Colleges (Govt. Quota): ₹30,000 per year",
        "SVIMS Tirupati: ₹1,75,000 per year",
        "Private Colleges (Category A – Clinical): ₹4.96 lakhs per year",
        "Pre/Para-clinical in Private Colleges: Fee varies (typically lesser than clinical branches)"
      ]
    },
    {
      id: "tuition-fee-note",
      type: "paragraph",
      content: "SVIMS has a higher stipend (~₹96,000/month). Court-reduced fees in private colleges (to ₹3.85 lakhs) are still under litigation."
    },
    {
      id: "penalty-resignation",
      type: "heading",
      title: "Penalty for Resignation",
      level: 2
    },
    {
      id: "penalty-table",
      type: "table",
      headers: ["Action", "Penalty"],
      rows: [
        ["After Round 3 Resignation", "₹3.54 lakhs + stipend + 18% GST"],
        ["SVIMS Resignation", "₹5 lakhs + stipend"],
        ["Debarment", "3 years"]
      ]
    },
    {
      id: "service-bond",
      type: "heading",
      title: "Service Bond Requirements",
      level: 2
    },
    {
      id: "bond-details",
      type: "heading",
      title: "Bond Details",
      level: 3
    },
    {
      id: "ap-govt-quota",
      type: "paragraph",
      content: "AP Government Quota (Non-Service) Candidates: Bond duration is 1 year, with a penalty of ₹40 lakhs + GST for non-compliance."
    },
    {
      id: "svims-bond",
      type: "paragraph",
      content: "SVIMS (All Candidates): Bond duration is 1 year, with a penalty of ₹40 lakhs + GST."
    },
    {
      id: "inservice-bond",
      type: "paragraph",
      content: "In-Service Candidates: Required to serve for 10 years, failing which they must pay a penalty of ₹50 lakhs, along with stipend refund."
    },
    {
      id: "aiq-bond",
      type: "paragraph",
      content: "All India Quota Candidates: No bond obligation applicable."
    },
    {
      id: "stipend-overview",
      type: "heading",
      title: "Stipend Overview",
      level: 2
    },
    {
      id: "stipend-list",
      type: "list",
      items: [
        "Government Institutes: Monthly stipend ranges between ₹60,800 to ₹64,000.",
        "SVIMS, Tirupati: The monthly stipend is approximately ₹96,000.",
        "Private Colleges: Stipend varies by institution; candidates should confirm directly with the respective college."
      ]
    },
    {
      id: "stipend-note",
      type: "paragraph",
      content: "Prospective candidates may evaluate net educational costs by considering tuition fees relative to stipend amounts offered by different institutions."
    },
    {
      id: "final-takeaways",
      type: "heading",
      title: "Final Takeaways",
      level: 2
    },
    {
      id: "final-takeaways-list",
      type: "list",
      items: [
        "Local or non-local classification is determined by the regional affiliation of the candidate's MBBS institution.",
        "Check category-wise eligibility based on AP caste certificates",
        "Apply on time and upload complete, correct documents",
        "In-service candidates must follow strict eligibility and bond rules",
        "Financial planning for postgraduate education should account for both tuition obligations and stipend income across different institutional categories."
      ]
    },
    {
      id: "official-updates",
      type: "paragraph",
      content: "Official updates regarding counselling procedures are published on the Dr. NTRUHS portal at drntr.uhsap.in."
    },
    {
      id: "faqs",
      type: "heading",
      title: "Frequently Asked Questions (FAQs)",
      level: 2
    },
    {
      id: "faqs-list",
      type: "faq",
      faqs: [
        {
          question: "Q1: What is the difference between local and non-local candidates in AP NEET PG CQ counselling?",
          answer: "Local status is determined by the regional classification of the MBBS institution—candidates who completed MBBS from colleges under Andhra University (AU) or Sri Venkateswara University (SVU) regions are considered local, regardless of their domicile. Non-local candidates can qualify for 15% unreserved seats if they meet specific criteria such as 10 years of residency in AP (excluding education period), having a parent/spouse employed in AP government/PSU, or being married to a local candidate."
        },
        {
          question: "Q2: What are the application fees for AP NEET PG CQ counselling 2025?",
          answer: "Application fees vary based on category and MBBS completion location: ₹7,080 for OC/BC candidates who completed MBBS in Andhra Pradesh; ₹5,900 for SC/ST candidates from AP; ₹3,540 for non-local MBBS candidates; and ₹8,260 for Foreign Medical Graduates (FMGs)."
        },
        {
          question: "Q3: What is the service bond requirement for candidates admitted through CQ counselling?",
          answer: "Non-service candidates admitted through government quota must complete 1 year of compulsory service with a penalty of ₹40 lakhs plus GST for non-compliance. SVIMS candidates have similar 1-year bond requirements. In-service candidates must serve for 10 years or pay a penalty of ₹50 lakhs along with stipend refund. Candidates who resign after Round 3 face a penalty of ₹3.54 lakhs plus stipend plus 18% GST, and may be debarred for 3 years."
        },
        {
          question: "Q4: How many candidates have been barred from AP NEET PG 2025 counselling and why?",
          answer: "A total of 191 candidates have been disqualified from participating in AP NEET PG 2025 counselling. This includes 22 candidates who failed to report to their allotted institutions after seat allocation in the previous year, and 169 candidates who discontinued their courses between June 2022 and the present date. The state has implemented strict measures to prevent seat blocking and ensure compliance with counselling regulations."
        }
      ]
    },
    {
      id: "contact-form",
      type: "contact-form",
      title: "Submit queries to BelieversConsultancy",
      content: "Have a question beyond these FAQs? Submit the Google Form and the team will respond during 9 AM–7 PM support hours: https://docs.google.com/forms/d/1uE2R_rzlOv-3LA-L3VJtFDDQx-kLQ496dPZVYrcKdkE/edit"
    }
  ]
},
{
  "id": 9,
  "title": "NEET PG 2025 Counselling: A Practical, 5‑Minute Walkthrough for Postgraduate Aspirants",
  "slug": "neet-pg-2025-counselling-practical-walkthrough",
  "excerpt": "Get a quick 5-minute walkthrough of NEET PG 2025 Counselling from registration to seat allotment and make smarter choices for your medical future.",
  "featured_image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
  "author": {
    "name": "Believers Team",
    "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    "bio": "Expert medical education consultants with over 10 years of experience in NEET counseling and admissions."
  },
  "category": {
    "name": "NEET PG",
    "slug": "neet-pg",
    "color": "bg-blue-100 text-blue-800"
  },
  "tags": ["NEET PG 2025", "Counselling Guide", "Medical Admissions", "Postgraduate", "Career Planning"],
  "published_date": "2025-10-24",
  "read_time": 5,
  "meta_description": " NEET PG 2025 Counselling: A Practical, 5‑Minute Walkthrough for Postgraduate Aspirants Get a quick 5-minute walkthrough of NEET PG 2025 Counselling from registration to seat allotment and make smarter choices for your medical future",
  "sections": [
    {
      "id": "intro",
      "type": "paragraph",
      "content": "NEET PG 2025 counselling is a crucial milestone in every doctor's journey toward further specialization. After months of careful and serious preparation and at last clearing the exam, counselling becomes the bridge between your hard work and securing a postgraduate medical seat.\n\nThis guide will provide you with a clear and structured overview of the entire process, which covers course options, types of institutes, counseling devices, major documentation requirements, and successful strategies to help you make informed decisions."
    },
    {
      "id": "timeline",
      "type": "heading",
      "title": "Timeline and Expectations",
      "level": 2
    },
    {
      "id": "timeline-content",
      "type": "list",
      "items": [
        "Results: it would be expected within 10 days (based on past trends)",
        "Counselling Start Date: likely from mid-September (provisional)",
        "Preparation Window: 1–1.5 months to get fully ready"
      ]
    },
    {
      "id": "timeline-note",
      "type": "paragraph",
      "content": "After your tests, take a short rest, but start looking into counselling early to get ahead in this competitive procedure."
    },
    {
      "id": "building-blocks",
      "type": "heading",
      "title": "Five Building Blocks of Counselling Decisions",
      "level": 2
    },
    {
      "id": "building-blocks-intro",
      "type": "paragraph",
      "content": "The NEET PG counselling process can be simplified into five essential components:"
    },
    {
      "id": "building-blocks-list",
      "type": "list",
      "items": [
        "Courses, Institutes, and Counsellings: Understand your postgraduate options, the institutions offering them, along with the relevant counselling authorities.",
        "Eligibility judgement: Check which types of counselling you qualify for, based on domicile, MBBS state, and category rules.",
        "Possibility investigation: Use past cut-offs and rank trends to create realistic expectations.",
        "Process and Documentation: Learn registration steps and keep all documents ready in advance.",
        "Seat Evaluation and Choice Filling: Prioritize preferences strategically to maximize opportunities."
      ]
    },
    {
      "id": "counselling-process",
      "type": "heading",
      "title": "Understanding the Counselling Process",
      "level": 2
    },
    {
      "id": "registration",
      "type": "heading",
      "title": "Registration & Notifications",
      "level": 3
    },
    {
      "id": "registration-content",
      "type": "paragraph",
      "content": "MCC initiates the counselling process following official result declaration by NBEMS, typically within a specified timeline outlined in official notifications."
    },
    {
      "id": "registration-points",
      "type": "list",
      "items": [
        "Candidates must register online within the notified timeline.",
        "Regularly monitor official portals for updates on seat matrix, eligibility criteria, and deadlines."
      ]
    },
    {
      "id": "seat-types",
      "type": "heading",
      "title": "Types of Seats",
      "level": 3
    },
    {
      "id": "seat-types-list",
      "type": "list",
      "items": [
        "All India Quota (AIQ) – 50% seats from government medical colleges across India.",
        "State Quota – Seats reserved for domicile candidates in respective states.",
        "Deemed Universities – Renowned private institutions like Kasturba, Amrita, JSS Mysore, KIMS, IMS, etc. These offer quality education but often come with higher fees.",
        "Private Colleges & Management Quota – Institutes like CMC Vellore may have government-linked seats as well as open management quota seats.",
        "DNB Courses – Available in government and private hospitals, especially in departments where MD/MS is not offered."
      ]
    },
    {
      "id": "course-options",
      "type": "heading",
      "title": "Postgraduate Course Options After MBBS",
      "level": 2
    },
    {
      "id": "md-ms",
      "type": "heading",
      "title": "MD/MS (3 Years):",
      "level": 3
    },
    {
      "id": "md-ms-content",
      "type": "paragraph",
      "content": "These are the most popular postgraduate degrees."
    },
    {
      "id": "md-ms-list",
      "type": "list",
      "items": [
        "MD focuses on medical fields like Pediatrics, Dermatology, and Psychiatry.",
        "MS is for surgical specialties like General Surgery, Orthopedics, and ENT.",
        "Offers great career growth, faculty positions, private practice opportunities, and eligibility for super-specialty training."
      ]
    },
    {
      "id": "pg-diploma",
      "type": "heading",
      "title": "PG Diploma (2 Years):",
      "level": 3
    },
    {
      "id": "pg-diploma-list",
      "type": "list",
      "items": [
        "A shorter course that allows quicker entry into clinical practice.",
        "Fewer academic opportunities compared to MD/MS.",
        "Can be upgraded to a degree via the DNB-PDCET exam."
      ]
    },
    {
      "id": "direct-dm-mch",
      "type": "heading",
      "title": "Direct DM/MCh (6 Years):",
      "level": 3
    },
    {
      "id": "direct-dm-mch-list",
      "type": "list",
      "items": [
        "A fast-track option for those certain about a super-specialty career.",
        "Available only in select top institutes."
      ]
    },
    {
      "id": "dnb-fnb",
      "type": "heading",
      "title": "DNB/FNB (NBEMS):",
      "level": 3
    },
    {
      "id": "dnb-fnb-list",
      "type": "list",
      "items": [
        "DNB (Diplomate of National Board) is equivalent to MD/MS, offered in leading hospitals.",
        "FNB (Fellow of National Board) offers 2-year super-specialty fellows"
      ]
    },
    {
      "id": "institute-types",
      "type": "heading",
      "title": "Types of Medical Institutes",
      "level": 2
    },
    {
      "id": "institute-types-list",
      "type": "list",
      "items": [
        "State Govt. Medical Colleges: 50% of all India (MCC) + 50% State Quota; affordable fees, strong academics, and national-level competition.",
        "Central Universities/Institutes: MAMC, UCMS, LHMC, BHU, AMU; some offer internal graduate quotas.",
        "AFMS: MCC counselling has very limited seats for civilians.",
        "Deemed Universities: 85% Management + 15% quota; modern infrastructure, higher fees. Karnataka deemed colleges also participate in state counselling.",
        "Private Medical Colleges: State counselling; eligibility varies by open states, which allow all-India candidates.",
        "DNB Programs: All Private hospitals like Apollo, Max, Fortis; Govt. hospitals split 50% All India + 50% in-service quota."
      ]
    },
    {
      "id": "counselling-types",
      "type": "heading",
      "title": "Understanding Counselling Types",
      "level": 2
    },
    {
      "id": "all-india-counselling",
      "type": "heading",
      "title": "All India Counselling (MCC)",
      "level": 3
    },
    {
      "id": "all-india-counselling-content",
      "type": "paragraph",
      "content": "Covers:"
    },
    {
      "id": "all-india-counselling-list",
      "type": "list",
      "items": [
        "50% AIQ seats in government medical colleges",
        "Deemed university seats",
        "AFMS and NBEMS quotas"
      ]
    },
    {
      "id": "state-counselling",
      "type": "heading",
      "title": "State Counselling",
      "level": 3
    },
    {
      "id": "state-counselling-list",
      "type": "list",
      "items": [
        "For state quotas and all private college seats",
        "Eligibility depends on domicile, MBBS location, schooling, or property ownership"
      ]
    },
    {
      "id": "specialized-counselling",
      "type": "heading",
      "title": "Specialized Counselling",
      "level": 3
    },
    {
      "id": "specialized-counselling-list",
      "type": "list",
      "items": [
        "DNB Sponsored Seats: For in-service candidates",
        "CPS Diploma seats are state-specific and conducted by designated state authorities; availability and schedules vary by state, year to year"
      ]
    },
    {
      "id": "key-considerations",
      "type": "heading",
      "title": "Key Considerations",
      "level": 2
    },
    {
      "id": "financial-planning",
      "type": "heading",
      "title": "Financial Planning",
      "level": 3
    },
    {
      "id": "financial-planning-list",
      "type": "list",
      "items": [
        "Complete total expense, which includes tuition, accommodation, and living costs",
        "Access, if you need a loan, also go through with the interest rate, repayment terms, etc. Explore education loan requirements"
      ]
    },
    {
      "id": "geographic-factors",
      "type": "heading",
      "title": "Geographic Factors",
      "level": 3
    },
    {
      "id": "geographic-factors-content",
      "type": "paragraph",
      "content": "Know about all the local languages, climate, and future practice opportunities."
    },
    {
      "id": "career-growth",
      "type": "heading",
      "title": "Career Growth",
      "level": 3
    },
    {
      "id": "career-growth-content",
      "type": "paragraph",
      "content": "Look at the institute's reputation, research faculty, mentorships quality and super-specialty pathways"
    },
    {
      "id": "common-pitfalls",
      "type": "heading",
      "title": "Common Pitfalls to Avoid",
      "level": 2
    },
    {
      "id": "common-pitfalls-list",
      "type": "list",
      "items": [
        "Give your command on top-tier DNB programs",
        "Focusing especially on government vs. private tags",
        "Do not delay preparation and overall documentation",
        "Inflexible preference lists with no flexibility"
      ]
    },
    {
      "id": "conclusion",
      "type": "heading",
      "title": "Conclusion",
      "level": 2
    },
    {
      "id": "conclusion-content",
      "type": "paragraph",
      "content": "NEET PG 2025 counselling is a decisive step toward your medical specialization.\n\nA systematic approach, early preparation, meticulous research, and strategic choice filling can help you secure a seat aligned with your aspirations.\n\nYour counselling strategy will shape your medical career. Approach it with the same dedication and focus that brought you success in NEET PG."
    }
  ]
},
{
  "id": 2,
  "title": "Kerala State PG Counselling 2025: Step-by-Step Guide for Applicants and Service Candidates",
  "slug": "kerala-state-pg-counselling-2025-step-by-step-guide",
  "excerpt": "Complete guide to Kerala NEET PG 2025 state quota counselling covering eligibility, registration process, documentation, reservations, and fees for both general and service candidates.",
  "featured_image": "https://cdn.dribbble.com/userupload/45442251/file/a6696a8c732ebd86e65dfa3004daf32e.jpeg?w=1200&h=600&fit=crop",
  "author": {
    "name": "Believers Team",
    "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    "bio": "Expert medical education consultants with over 10 years of experience in NEET counseling and admissions."
  },
  "category": {
    "name": "NEET PG",
    "slug": "neet-pg",
    "color": "bg-blue-100 text-blue-800"
  },
  "tags": ["NEET PG 2025", "Kerala", "State Counselling", "Service Quota", "Medical Admissions"],
  "published_date": "2025-10-24",
  "read_time": 12,
  "meta_description": " Get a complete guide to Kerala NEET PG Counselling 2025 for applicants and service candidates. Learn registration, eligibility, and seat allotment process.",
  "sections": [
    {
      "id": "intro",
      "type": "paragraph",
      "content": "The Commissioner for Entrance Examinations (CEE) Kerala administers NEET PG 2025 counselling for 50% state quota seats in government and private self-financing medical institutions. This guide covers eligibility, application requirements, documents, reservations, quotas, fees, and important rules for joining, upgrading, and exit policies.\n\nThe Commissioner for Entrance Examinations (CEE) Kerala has initiated the registration process for NEET PG 2025 state quota counselling. The registration window opened on September 10, 2025, and remains active until September 22, 2025, at 4:00 PM.\n\nCandidates must either have an MBBS degree from Kerala or be of Kerala origin. Candidates from other states are not eligible, even for NRI seats.\n\nKerala maintains eligibility restrictions requiring candidates to demonstrate Kerala origin or completion of MBBS from Kerala institutions. Candidates without a Kerala domicile or educational credentials from Kerala institutions are ineligible for state quota participation.\n\nThis overview covers the registration procedures, eligibility requirements, documentation specifications, and critical timelines for Kerala NEET PG 2025 counselling."
    },
    {
      "id": "seats-covered",
      "type": "heading",
      "title": "Seats Under Kerala State Counselling",
      "level": 2
    },
    {
      "id": "seats-covered-list",
      "type": "list",
      "items": [
        "Government Colleges: 50% of seats come under state counselling.",
        "Private Minority Colleges: All seats, including Christian and Muslim minority institutions, fall under the state counselling.",
        "Self-Financing Institutes: Most private colleges in Kerala are categorized as self-financing.",
        "Deemed University: the sole deemed university in Kerala, conducts admissions exclusively through MCC All India Quota counselling."
      ]
    },
    {
      "id": "eligibility-criteria",
      "type": "heading",
      "title": "Eligibility Criteria",
      "level": 2
    },
    {
      "id": "eligibility-intro",
      "type": "paragraph",
      "content": "Eligibility is divided into two categories:"
    },
    {
      "id": "kerala-origin",
      "type": "heading",
      "title": "1. Kerala Origin Candidates",
      "level": 3
    },
    {
      "id": "kerala-origin-list",
      "type": "list",
      "items": [
        "Indian citizens with Kerala origin who hold an MBBS degree recognized by the NMC.",
        "Origin Definition: Born in Kerala or have parents born in Kerala.",
        "Acceptable proof of Kerala origin includes Secondary School Leaving Certificate, Indian passport, birth certificate, or village officer-issued nativity certificate."
      ]
    },
    {
      "id": "non-keralite",
      "type": "heading",
      "title": "2. Non-Keralite Candidates",
      "level": 3
    },
    {
      "id": "non-keralite-content",
      "type": "paragraph",
      "content": "Candidates who are not of Kerala origin but completed MBBS from Kerala institutions are eligible for general merit category participation, though ineligible for communal or special reservations."
    },
    {
      "id": "non-keralite-list",
      "type": "list",
      "items": [
        "Eligible under the general merit category (state merit seats) and service quota if applicable."
      ]
    },
    {
      "id": "pg-percentile",
      "type": "heading",
      "title": "PG Percentile Requirement",
      "level": 3
    },
    {
      "id": "pg-percentile-list",
      "type": "list",
      "items": [
        "General/EWS: 50 percentile",
        "SC/ST/STBC/PWD: 40 percentile",
        "EWS PWD/General PWD: 45 percentile"
      ]
    },
    {
      "id": "pg-percentile-note",
      "type": "paragraph",
      "content": "Note: Kerala has its own criteria for EWS certification, different from the central government certificate."
    },
    {
      "id": "registration-process",
      "type": "heading",
      "title": "Registration Process",
      "level": 2
    },
    {
      "id": "registration-intro",
      "type": "paragraph",
      "content": "The process starts with basic registration, followed by uploading certificates, payment, and final submission. Here's a breakdown of the key steps:"
    },
    {
      "id": "step-1",
      "type": "heading",
      "title": "Step 1: Registration",
      "level": 3
    },
    {
      "id": "step-1-content",
      "type": "paragraph",
      "content": "The system generates a reference ID and OTP for authentication following initial data submission."
    },
    {
      "id": "step-1-list",
      "type": "list",
      "items": [
        "Confirm your details and enter a valid email ID and mobile number, which will be used for OTP verification.",
        "The system generates a reference ID and OTP for authentication following initial data submission."
      ]
    },
    {
      "id": "step-2",
      "type": "heading",
      "title": "Step 2: Application Form",
      "level": 3
    },
    {
      "id": "step-2-intro",
      "type": "paragraph",
      "content": "The application form is divided into multiple sections:"
    },
    {
      "id": "step-2-list",
      "type": "list",
      "items": [
        "Quota Selection: Choose General or Service quota based on your eligibility.",
        "Basic Details: Gender, nationality (Indian, OCI/PIO), and Kerala origin status.",
        "Guardian and Parents Information: Enter names and native districts.",
        "Communication and Permanent Address: Ensure these are correct, though all communication will be via email or OTP.",
        "Academic Details: Include total MBBS marks, month and year of passing, university, internship completion date, and medical council registration number."
      ]
    },
    {
      "id": "step-3",
      "type": "heading",
      "title": "Step 3: Communal Reservation",
      "level": 3
    },
    {
      "id": "step-3-list",
      "type": "list",
      "items": [
        "Only Keralite candidates can select a community for reservation purposes.",
        "For inter-caste or mixed-category backgrounds, the candidate can choose which community to apply under."
      ]
    },
    {
      "id": "step-4",
      "type": "heading",
      "title": "Step 4: Special Reservations and Minority Quotas",
      "level": 3
    },
    {
      "id": "step-4-list",
      "type": "list",
      "items": [
        "Ex-servicemen and dependents: Specific seats available.",
        "Children of fishermen or inmates of certain institutions may claim concessions.",
        "PWD, Muslim, and Christian minority candidates are eligible to claim reserved seats."
      ]
    },
    {
      "id": "step-5",
      "type": "heading",
      "title": "Step 5: NRI Quota",
      "level": 3
    },
    {
      "id": "step-5-list",
      "type": "list",
      "items": [
        "Both Indian and OCI/PIO candidates can be considered for NRI seats.",
        "NRI sponsorship documentation will be required during the application process."
      ]
    },
    {
      "id": "reservation-policy",
      "type": "heading",
      "title": "Reservation Policy",
      "level": 2
    },
    {
      "id": "reservation-policy-list",
      "type": "list",
      "items": [
        "EWS: 10%",
        "STBC (Socially and Economically Backward Classes, Non-Creamy Layer): 27%",
        "ST & SC: 8% and 2% respectively",
        "Ex-Servicemen & Dependent of Jawan killed in action: 1 seat each, rotation applied yearly",
        "PWD (Horizontal): 5%"
      ]
    },
    {
      "id": "reservation-note",
      "type": "paragraph",
      "content": "Reservation benefits under communal and special categories are available exclusively to candidates meeting Kerala origin requirements.\n\nCandidates claiming reservation benefits must submit certificates issued by designated revenue authorities as specified in the CEE guidelines"
    },
    {
      "id": "minority-quotas",
      "type": "heading",
      "title": "Minority Quotas",
      "level": 2
    },
    {
      "id": "minority-quotas-list",
      "type": "list",
      "items": [
        "Christian Minority, Muslim Minority, NRI Christian, and NRI Muslim seats are available in specific self-financing institutes.",
        "Minority category eligibility requires valid minority community certificates, with Non-Creamy Layer certification not being mandatory for such seats."
      ]
    },
    {
      "id": "service-quota",
      "type": "heading",
      "title": "Service Quota",
      "level": 2
    },
    {
      "id": "service-quota-list",
      "type": "list",
      "items": [
        "10% of total seats reserved for Kerala in-service candidates.",
        "Minimum of 10 years of service required.",
        "Service quota candidates receive incentive marks up to 30 based on service duration and location, as detailed in the official prospectus.",
        "Service candidates can apply for both general and service quotas."
      ]
    },
    {
      "id": "nri-quota",
      "type": "heading",
      "title": "NRI Quota Eligibility",
      "level": 2
    },
    {
      "id": "nri-quota-intro",
      "type": "paragraph",
      "content": "NRI sponsorship is applicable if the sponsor is:"
    },
    {
      "id": "nri-quota-list",
      "type": "list",
      "items": [
        "Father, mother, and siblings of the candidate",
        "Father/mother's brothers or sisters and their children (first cousins of parents)",
        "Husband or wife",
        "Adopted parents or half-siblings"
      ]
    },
    {
      "id": "nri-documents",
      "type": "heading",
      "title": "Required documents:",
      "level": 3
    },
    {
      "id": "nri-documents-list",
      "type": "list",
      "items": [
        "Passport, visa, green card, or OCI/PIO card of the sponsor",
        "Employment certificate attested by the embassy/consulate",
        "Relationship certificate issued by the revenue authorities",
        "Affidavit on ₹200 stamp paper for sponsorship"
      ]
    },
    {
      "id": "nri-note",
      "type": "paragraph",
      "content": "NRI category fee payment is accepted from both resident Indian and NRI bank accounts as per CEE financial regulations."
    },
    {
      "id": "application-process",
      "type": "heading",
      "title": "Application Process",
      "level": 2
    },
    {
      "id": "application-process-list",
      "type": "list",
      "items": [
        "Registration: The registration process requires candidates to provide valid email addresses and mobile numbers for OTP-based authentication and official communication.",
        "Basic Details: Fill in personal and academic information.",
        "Certificates Upload: Signature and required documents in PDF format.",
        "Printouts: Take the application printout and the fee payment receipt.",
        "In-Service Candidates: Forward printouts and enclosures to the Head of Department."
      ]
    },
    {
      "id": "application-note",
      "type": "paragraph",
      "content": "General category candidates complete the application process entirely online without physical document submission requirements."
    },
    {
      "id": "required-documents",
      "type": "heading",
      "title": "Required Documents",
      "level": 2
    },
    {
      "id": "required-documents-list",
      "type": "list",
      "items": [
        "Keralite Candidates: SSLC, birth certificate, passport, or nativity certificate",
        "Non-Keralites: MBBS completion certificate from the Kerala Institute",
        "Category Certificates: SC/ST/SCBC/OEC/EWS certificates",
        "PWD: Competent authority certificate (state medical board evaluation later)",
        "Minority Certificates: If applicable",
        "Special Fee Concessions: Children of fishermen, juvenile homes, Nirbhaya homes, etc."
      ]
    },
    {
      "id": "additional-documents",
      "type": "heading",
      "title": "Additional documents required during admission:",
      "level": 3
    },
    {
      "id": "additional-documents-list",
      "type": "list",
      "items": [
        "MBBS degree or provisional certificate",
        "CRRI completion certificate",
        "PG admit card and scorecard",
        "Permanent medical registration",
        "Transfer certificate (if MBBS not from KUHS, an eligibility certificate is needed)"
      ]
    },
    {
      "id": "fees-deposit",
      "type": "heading",
      "title": "Fees and Security Deposit",
      "level": 2
    },
    {
      "id": "fees-deposit-list",
      "type": "list",
      "items": [
        "Application Fee: ₹1000 (SC/ST candidates: ₹500)",
        "Service Quota Candidates: Additional ₹1000 if applying for the general quota"
      ]
    },
    {
      "id": "security-deposit",
      "type": "paragraph",
      "content": "Candidates must remit security deposits during choice filling: ₹10,000 for the general category and ₹5,000 for SC/ST candidates, which are subsequently adjusted against first-year tuition fees"
    },
    {
      "id": "tuition-fees",
      "type": "heading",
      "title": "Tuition Fees",
      "level": 2
    },
    {
      "id": "tuition-fees-list",
      "type": "list",
      "items": [
        "Government Colleges: ₹57,890 + caution deposit ₹23,160",
        "Private Colleges: Varies (approx. ₹3 lakhs for RCC Trivandrum, 2024)",
        "NRI Quota: Approx. ₹38 lakhs",
        "Clinical Fees: ₹17–19 lakhs"
      ]
    },
    {
      "id": "tuition-note",
      "type": "paragraph",
      "content": "Fees paid are adjusted if candidates shift institutes; a penalty applies for course discontinuation."
    },
    {
      "id": "bonds-penalties",
      "type": "heading",
      "title": "Bonds and Penalties",
      "level": 2
    },
    {
      "id": "bonds-penalties-list",
      "type": "list",
      "items": [
        "Non-Service Candidates: One-year bond of ₹50 lakhs with two sureties (parents/guardians).",
        "In-Service Candidates: Minimum 10-year bond; posted initially in remote/difficult areas."
      ]
    },
    {
      "id": "penalties-note",
      "type": "paragraph",
      "content": "Candidates failing to report to allotted institutions are subject to penalties, including financial charges and debarment from future counselling cycles as per CEE regulations"
    },
    {
      "id": "uploading-certificates",
      "type": "heading",
      "title": "Uploading Images and Certificates",
      "level": 2
    },
    {
      "id": "uploading-intro",
      "type": "paragraph",
      "content": "After completing registration and payment, you must upload:"
    },
    {
      "id": "uploading-list",
      "type": "list",
      "items": [
        "Photograph and signature in specified formats.",
        "Certificates required depending on your eligibility category, including: Nationality proof (passport, birth certificate, voter ID), Kerala origin certificates, MBBS degree and mark sheets, Special reservation certificates (if applicable), Minority or NRI sponsorship certificates"
      ]
    },
    {
      "id": "conclusion",
      "type": "heading",
      "title": "Conclusion",
      "level": 2
    },
    {
      "id": "conclusion-content",
      "type": "paragraph",
      "content": "Kerala PG Counselling 2025 comes with clear rules, strict eligibility, and detailed reservation policies. With proper documents, timely registration, and awareness of fee structures and bonds, candidates can secure their seats without confusion. Staying updated with official notifications is the key to a smooth counselling journey."
    },
    {
      "id": "faqs",
      "type": "heading",
      "title": "Frequently Asked Questions (FAQs)",
      "level": 2
    },
    {
      "id": "faqs-list",
      "type": "faq",
      "faqs": [
        {
          "question": "Q1: Who is eligible for Kerala NEET PG state quota counselling 2025?",
          "answer": "Eligibility includes two main categories: (1) Indian citizens of Kerala origin, demonstrated through birth in Kerala or parental birth in Kerala, verified via SSLC, birth certificate, passport, or nativity certificate; and (2) Non-Keralite candidates who completed MBBS from any medical institution in Kerala, eligible for general merit seats but not communal reservations. Additionally, in-service candidates with minimum 10 years of government service in Kerala qualify for service quota."
        },
        {
          "question": "Q2: What is the service quota in Kerala NEET PG counselling and how does it work?",
          "answer": "The service quota reserves 10% of total state quota seats for in-service government doctors in Kerala. Eligible candidates must have completed a minimum of 10 years of government medical service and receive incentive marks up to 30 based on service duration and location. Service candidates can apply for both service quota and general merit seats by paying separate application fees. The upper age limit for medical education service candidates is 49 years as of December 31, 2025."
        },
        {
          "question": "Q3: What is the bond requirement and penalty for Kerala NEET PG 2025 admissions?",
          "answer": "Non-service candidates must execute a one-year service bond with a penalty amount of ₹50 lakhs, requiring two sureties (typically parents or guardians) on ₹200 stamp paper. In-service candidates are bound to serve a minimum of 10 years with initial postings in remote or difficult areas. Candidates who fail to report to allotted institutions face financial penalties and may be debarred from future counselling cycles. The bond becomes enforceable upon seat acceptance."
        },
        {
          "question": "Q4: What are the tuition fees for different categories under Kerala NEET PG counselling?",
          "answer": "Government medical college fees are ₹57,890 per year plus a caution deposit of ₹23,160. Private self-financing colleges charge approximately ₹3 lakhs per year (varies by institution), while NRI quota seats cost approximately ₹38 lakhs. Clinical specialty courses in private institutions range from ₹17-19 lakhs. Security deposits of ₹10,000 (general category) or ₹5,000 (SC/ST) are collected during choice filling and adjusted against first-year tuition fees."
        },
        {
          "question": "Q5: Who is eligible to apply for Kerala NEET PG state quota counselling 2025?",
          "answer": "Eligibility is limited to two categories: (1) Indian citizens of Kerala origin, which includes candidates born in Kerala or whose parents were born in Kerala, verified through SSLC, birth certificate, passport, or village officer-issued nativity certificate; and (2) Non-Keralite candidates who completed MBBS from any medical institution in Kerala, regardless of their place of origin. OCI/PIO cardholders with Kerala connections may also be eligible."
        },
        {
          "question": "Q6: What is the application fee for Kerala NEET PG 2025 counselling?",
          "answer": "The application fee is ₹1,000 for general category candidates and ₹500 for SC/ST candidates. Service quota candidates pay ₹1,000, with an additional ₹1,000 required if applying for both general and service quota categories. All fees are non-refundable and must be paid online through credit card, debit card, or net banking."
        },
        {
          "question": "Q7: When is the registration deadline for Kerala NEET PG 2025 state counselling?",
          "answer": "Registration opened on September 10, 2025. The deadline was initially September 22, 2025, at 4:00 PM but has been extended to September 30, 2025, at 5:00 PM. Merit list publication is expected in the first week of October 2025, followed by choice filling in the second week."
        },
        {
          "question": "Q8: Can I edit my application after final submission in Kerala NEET PG counselling?",
          "answer": "No, the CEE Kerala system does not permit any modifications once candidates select 'Save and Finalise' and complete the payment process. Candidates must carefully verify all entered information, uploaded documents, and selections before final submission. However, if deficiencies are identified during verification, CEE may issue notifications requesting corrected documents, which candidates should monitor regularly through the official portal."
        }
      ]
    },
    {
      "id": "contact-form",
      "type": "contact-form",
      "title": "Submit queries to BelieversConsultancy",
      "content": "Have a question beyond these FAQs? Submit the Google Form and the team will respond during 9 AM–7 PM support hours: https://docs.google.com/forms/d/1uE2R_rzlOv-3LA-L3VJtFDDQx-kLQ496dPZVYrcKdkE/edit"
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