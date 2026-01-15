

import React, { useState, useEffect } from 'react';
import { Calendar, Bell, ExternalLink, RefreshCw, AlertCircle, X } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  content?: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  is_active?: boolean;
  created_at?: string;
  link?: string;
  source?: string;
}

const AnnouncementPage: React.FC = () => {
  const [apiAnnouncements, setApiAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const staticAnnouncements: Announcement[] = [
    {
      id: 1,
      title: "NEET PG 2025: Supreme Court declines to pause counselling",
      content: "Supreme Court declines to pause counselling; transparency plea listed for hearing next week",
      date: "2025-09-06T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-final-answer-key-supreme-court-plea-response-sheets-natboard-edu-in-nbems-10218766/',
      source: 'Indian Express',
      is_active: true,
      created_at: "2025-09-06T00:00:00Z"
    },
    {
      id: 2,
      title: "NEET PG merit list for 50% AIQ seats out",
      content: "The National Board of Examinations in Medical Sciences (NBEMS) has released the merit list for 50% All India Quota (AIQ) seats for NEET PG 2025. Candidates can check their merit list status and await further counselling schedule announcements.",
      date: "2025-09-05T16:45:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-05T16:45:00Z"
    },
    {
      id: 3,
      title: "Gujarat NEET PG counselling 2025 opens",
      content: "Gujarat NEET PG counselling 2025 registration has commenced. Candidates can register and obtain their PIN. Tie-breaking procedures have been implemented for 211 applicants with similar scores.",
      date: "2025-09-05T09:45:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.medadmgujarat.org/pg/home.aspx',
      is_active: true,
      source: 'Medad Gujarat',
      created_at: "2025-09-05T09:45:00Z"
    },
    {
      id: 4,
      title: "SC to Hear Transparency Plea Today",
      content: "Supreme Court to take up NEET PG 2025 transparency case tomorrow as MCC readies 50% AIQ counselling timeline",
      date: "2025-09-11T00:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: '',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-09-04T00:00:00Z"
    },
    {
      id: 5,
      title: "NEET PG 2025 scorecards now live",
      content: "NEET PG 2025 scorecards and response sheets are now available on the NBEMS portal. Candidates can log in using their credentials to view and download their scorecard and response sheet.",
      date: "2025-08-29T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-scorecard-answer-key-released-download-directly-here-9181634',
      is_active: true,
      source: 'NDTV',
      created_at: "2025-08-29T00:00:00Z"
    },
    {
      id: 6,
      title: "NEET PG merit list released",
      content: "The merit list for 50% All India Quota seats has been officially released by NBEMS. Candidates can access the merit list directly through the provided link and check their ranking status.",
      date: "2025-09-05T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-live-nbems-release-today-scorecard-for-50-percent-aiq-seats-at-natboard-edu-in-direct-link-here-lb-106148',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-05T00:00:00Z"
    },
    {
      id: 7,
      title: "Counselling dates to be announced",
      content: "Counselling dates to be announced; 50% AIQ merit list released, with answer key and cutoff updates.",
      date: "2025-09-09T00:00:00Z",
      priority: 'medium',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-mcc-to-announce-50-aiq-counselling-schedule-soon-sc-hearing-awaited-check-details-here/articleshow/123765991.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-09T00:00:00Z"
    },
    {
      id: 8,
      title: "MCC to announce AIQ schedule",
      content: "MCC to announce AIQ schedule amid Supreme Court case.",
      date: "2025-09-09T10:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-2025-mcc-to-announce-50-aiq-counselling-schedule-soon-sc-hearing-awaited-check-details-here/articleshow/123765991.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-09T10:00:00Z"
    },
    {
      id: 9,
      title: "How to find counselling timetable",
      content: "NEET PG Counselling 2025: How and where to find the counselling timetable once it's announced",
      date: "2025-09-11T04:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-news-live-mcc-counselling-schedule-round-1-direct-link-seat-allotment-how-to-apply-mcc-nic-in-101757478660284.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-11T06:00:00Z"
    },
    {
      id: 10,
      title: "NBEMS to Release Counselling Soon",
      content: "NBEMS to Release NEET PG Counselling 2025 Soon, Check Expected Release Date, Updates here",
      date: "2025-09-10T04:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/nbems-to-release-neet-pg-counselling-2025-soon-check-expected-release-date-updates-here-181133',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-10T06:00:00Z"
    },
    {
      id: 11,
      title: "Tamil Nadu Registration Opens",
      content: "Registration for Tamil Nadu NEET PG 2025 has begun deadline to apply is September 16 on the official site.",
      date: "2025-09-10T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://tnmedicalselection.net',
      is_active: true,
      source: 'TN MEDICAL',
      created_at: "2025-09-10T08:00:00Z"
    },
    {
      id: 12,
      title: "CEE Kerala Counselling Begins",
      content: "CEE Kerala begins NEET PG 2025 counselling registration for 50% state‑quota MD/MS seats.",
      date: "2025-09-12T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-12T08:00:00Z"
    },
    {
      id: 13,
      title: "SC hearing deferred by two weeks",
      content: "NEET PG Supreme Court hearing deferred by two weeks: when to expect the next date.",
      date: "2025-09-13T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/kerala-neet-pg-2025-counselling-registration-opens-for-50-state-quota-seats-apply-here/articleshow/123848766.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-13T08:00:00Z"
    },
    {
      id: 14,
      title: "MCC Yet to Announce Schedule",
      content: "The official NEET PG 2025 AIQ counselling schedule from MCC is still awaited. Candidates must monitor mcc.nic.in for the official PDF and dates.",
      date: "2025-09-16T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-schedule-2025-live-update-check-and-download-mcc-nic-in-neet-counselling-schedule-pdf-direct-link-101757917204348.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-16T08:00:00Z"
    },
    {
      id: 15,
      title: "TN Applications Close Today",
      content: "Tamil Nadu NEET PG 2025 Counselling Applications Close at 5 PM. Final Call for State Counselling Registration",
      date: "2025-09-16T10:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/tamil-nadu-neet-pg-2025-counselling-registration-closes-at-5-pm-today-at-tnmedicalselection-net/articleshow/123913827.cms',
      is_active: true,
      source: 'Times Of India',
      created_at: "2025-09-16T10:00:00Z"
    },
    {
      id: 16,
      title: "TN Registration Extended",
      content: "Tamil Nadu NEET PG 2025 Registration Extended to September 18",
      date: "2025-09-17T10:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/tn-neet-pg-counselling-2025-schedule-extended-check-revised-dates-here-181226',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-17T10:00:00Z"
    },
    {
      id: 17,
      title: "SC Transparency Hearing Tomorrow",
      content: "Supreme Court to Hear NEET PG 2025 Answer Key Transparency Case Tomorrow",
      date: "2025-09-19T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/neet-pg-2025-sc-to-hear-petition-on-transparency-of-answer-key-tomorrow-9581587.html',
      is_active: true,
      source: 'News 18',
      created_at: "2025-09-19T08:00:00Z"
    },
    {
      id: 18,
      title: "SC Hearing Rescheduled",
      content: "Supreme Court to hear answer key transparency plea on September 23. SC Reschedules Hearing On Answer Key Transparency",
      date: "2025-09-20T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/neet-pg-2025-sc-to-hear-petition-on-transparency-of-answer-key-tomorrow-9581587.html',
      is_active: true,
      source: 'News 18',
      created_at: "2025-09-20T08:00:00Z"
    },
    {
      id: 19,
      title: "SC to hear score discrepancies",
      content: "Supreme Court to hear plea on score discrepancies today",
      date: "2025-09-21T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/cities/mumbai-news/irregular-neet-pg-scores-take-medical-students-to-sc-s-door-petition-to-be-heard-today-101758222662559.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-21T08:00:00Z"
    },
    {
      id: 20,
      title: "Transparency Plea Listed",
      content: "Supreme Court lists transparency plea for hearing on September 23",
      date: "2025-09-21T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-supreme-court-transparency-plea-rationalisation-answer-key-counselling-10258787/',
      is_active: true,
      source: 'Indian Express',
      created_at: "2025-09-21T08:00:00Z"
    },
    {
      id: 21,
      title: "How to Check MCC Schedule",
      content: "The Medical Counselling Committee (MCC) is yet to release the NEET PG 2025 counselling schedule. Check mcc.nic.in when it is published.",
      date: "2025-09-22T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-mcc-neet-pg-counselling-2025-schedule-admission-process-seat-matrix-mcc-nic-in-101758440968818.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-21T08:00:00Z"
    },
    {
      id: 22,
      title: "Counselling Schedule Expected Soon",
      content: "The Supreme Court will hear petitions seeking greater transparency in NEET PG 2025. The MCC is expected to announce the counselling schedule soon.",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/supreme-court-to-hear-neet-pg-2025-transparency-plea-today-counselling-schedule-soon-9590272.html',
      is_active: true,
      source: 'News18',
      created_at: "2025-09-21T08:00:00Z"
    },
    {
      id: 23,
      title: "Telangana HC Permits OCI",
      content: "Telangana HC Permits NEET PG Registration Under NRI Quota for OCI",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/city/hyderabad/court-allows-oci-to-register-for-neet-pg/articleshow/124056177.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-09-23T08:00:00Z"
    },
    {
      id: 24,
      title: "Transparency Hearing Today",
      content: "The Supreme Court is hearing a critical plea from NEET PG 2025 candidates demanding complete transparency in the scoring process.",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/supreme-court-neet-pg-2025-transparency-hearing-candidate-response-sheet-answer-key-link-fairness-raw-scores-10264206/',
      is_active: true,
      source: 'Indian Express',
      created_at: "2025-09-23T08:00:00Z"
    },
    {
      id: 25,
      title: "Answer Key Hearing Set",
      content: "Supreme Court is set to hear a crucial plea today regarding transparency in the NEET PG 2025 answer key.",
      date: "2025-09-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/net-pg-2025-supreme-court-hearing-on-answer-key-transparency-check-latest-updates-here-181301',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-23T08:00:00Z"
    },
    {
      id: 26,
      title: "UP: 148 Candidates Barred",
      content: "148 Candidates Barred for Seat Blocking; DGME Releases List",
      date: "2025-09-24T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/up-neet-pg-counselling-2025-148-candidates-debarred-for-seat-withdrawal-dgme-issues-list/articleshow/124071018.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-09-24T08:00:00Z"
    },
    {
      id: 27,
      title: "Medical College Upgradation Approved",
      content: "Government Approves Phase 3 of Medical College Upgradation to Add 10,000+ MBBS and PG Seats",
      date: "2025-09-25T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/up-neet-pg-counselling-2025-148-candidates-debarred-for-seat-withdrawal-dgme-issues-list/articleshow/124071018.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-09-25T08:00:00Z"
    },
    {
      id: 28,
      title: "Counselling Start Date Expected",
      content: "The Medical Counselling Committee (MCC) will release the NEET PG 2025 counselling schedule soon on mcc.nic.in.",
      date: "2025-09-26T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counselling-expected-start-date-process-details-here-9347182',
      is_active: true,
      source: 'NDTV',
      created_at: "2025-09-26T08:00:00Z"
    },
    {
      id: 29,
      title: "NBEMS Gets Two Week Extension",
      content: "Supreme Court grants NBEMS two-week extension to address transparency concerns raised by medical aspirants.",
      date: "2025-09-27T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-hearing-supreme-court-orders-board-to-submit-response-on-transparency-issues-within-two-weeks-181350',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-09-27T08:00:00Z"
    },
    {
      id: 30,
      title: "How to Check Schedule",
      content: "Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet; candidates can check updates on mcc.nic.in",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-supreme-court-hearing-check-mcc-neet-pg-counselling-2025-schedule-latest-update-101758951217299.html',
      is_active: true,
      source: 'Hindustan Times',
      created_at: "2025-09-27T08:00:00Z"
    },
    {
      id: 31,
      title: "SC Notice ",
      content:"SC Notice to Centre and NBEMS on NEET PG Answer Key Publication Demand ",
      date: "2025-09-27T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.thehindu.com/news/national/supreme-court-issues-notice-on-pleas-seeking-transparency-in-neet-pg-exam-evaluation-process/article70098286.ece',
      is_active: true,
      source: '  the hindu',
      created_at: "2025-09-27T08:00:00Z"
    },
    {
      id: 32,
      title: "NEET PG 2025  ",
      content:"Counselling Expected to Start in October: Complete Process Guide",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counselling-check-expected-start-date-allotment-process-details-here-9364881',
      is_active: true,
      source: '  NDTV',
      created_at: "2025-09-29T08:00:00Z"
    },
    {
      id: 33,
      title: "Karnataka HC ",
      content:"Karnataka HC Dismisses NEET PG 2025 Plea for Category Change After Results Declaration ",
      date: "2025-09-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://timesofindia.indiatimes.com/city/raipur/hc-dismisses-plea-challenging-change-in-category-in-neet/articleshow/123571100.cms',
      is_active: true,
      source: '  Times of India',
      created_at: "2025-09-29T08:00:00Z"
    },
    {
      id: 34,
      title: "NEET PG 2025 Counselling: ",
      content:" Expected Mid-October Start Date, Complete Allotment : Medical Counselling Committee expected to release NEET PG 2025 counselling schedule by mid-October 2025 on mcc.nic.in following FAIMA's communication with health ministry. ",
      date: "2025-10-03T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-counselling-2025-check-expected-start-date-allotment-process-top-medical-colleges-9387163',
      is_active: true,
      source: ' NDTV',
      created_at: "2025-10-03T08:00:00Z"
    },
    {
      id: 35,
      title: "MCC Yet to Announce ",
      content:" NEET PG 2025 Counselling Schedule; Medical Aspirants Await Dates : Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet as Supreme Court seeks NBEMS response on transparency issues.",
      date: "2025-10-02T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.etnownews.com/exams-results/neet-pg-counselling-schedule-2025-mcc-yet-to-release-dates-sc-seeks-nbems-reply-on-transparency-plea-article-152931347',
      is_active: true,
      source: '   ET Now News',
      created_at: "2025-10-02T08:00:00Z"
    },
    {
      id: 36,
      title: "NEET PG 2025",
      content:"NEET PG 2025 Counselling Expected to Begin Mid-October: Complete Details",
      date: "2025-10-01T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.news18.com/education-career/neet-pg-2025-counselling-likely-to-start-by-mid-october-details-here-9608658.html',
      is_active: true,
      source: ' News18 ',
      created_at: "2025-10-01T08:00:00Z"
    },
     {
      id: 37,
      title: "Karnataka NEET PG 2025 ",
      content:"Round 1 Registration Begins Today at cetonline.karnataka.gov.in :Karnataka Examination Authority begins NEET PG 2025 counselling round 1 registration today October 4 at 11 AM on cetonline.karnataka.gov.in portal.",
      date: "2025-10-04T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/karnataka-neet-pg-counselling-2025-round-1-registration-at-cetonline-karnataka-gov-in-get-direct-link-here-181412',
      is_active: true,
      source: ' Jagran Josh ',
      created_at: "2025-10-04T08:00:00Z"
    },
     {
      id: 38,
      title: "NEET PG 2025 Counselling Schedule",
      content:"How to Check MCC Updates at mcc.nic.in :Medical Counselling Committee has not released NEET PG 2025 counselling schedule yet; candidates can check mcc.nic.in when dates become available.",
      date: "2025-10-06T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.hindustantimes.com/education/admissions/neet-pg-counselling-2025-live-news-check-mcc-allotment-process-neet-pg-counselling-2025-schedule-date-latest-news-101759639482477.html',
      is_active: true,
      source: ' Hindustan Times',
      created_at: "2025-10-06T08:00:00Z"
    },
     {
      id: 39,
      title: "NEET PG 2025",
      content:" Counselling Expected to Begin by Mid-October: ",
      date: "2025-10-06T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/neet-pg-2025-counelling-expected-to-start-in-third-week-of-october-details-here-9399606',
      is_active: true,
      source: ' NDTV',
      created_at: "2025-10-06T08:00:00Z"
    },
    {
      id: 40,
      title: "NEET PG 2025",
      content:"  Data Breach Alert: NBEMS Officials Respond to Leak Allegations ",
      date: "2025-10-07T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-candidates-data-leaked-heres-what-nbe-said-10290545/',
      is_active: true,
      source: '  Indian Express',
      created_at: "2025-10-07T08:00:00Z"
    },
    {
      id: 41,
      title: "NEET PG 2025",
      content:" NEET PG 2025 Privacy Breach: Student Information Allegedly Sold for Rs 15,000 Online ",
      date: "2025-10-08T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.timesnownews.com/education/neet-pg-2025-data-leak-students-claim-personal-details-sold-online-for-rs-15000-article-152955394',
      is_active: true,
      source: ' Times Now News',
      created_at: "2025-10-08T08:00:00Z"
    },
    {
      id: 42,
      title: "NEET PG 2025",
      content:" NEET PG 2025 Admission Process Stalled by Regulatory Delays and Supreme Court Cases ",
      date: "2025-10-09T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/city/chennai/regulatory-delays-court-battles-stall-neet-pg-admission/articleshow/124398972.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-10-09T08:00:00Z"
    },
    {
      id: 43,
      title: "NEET PG 2025",
      content:" NBEMS Disqualifies 22 NEET PG Candidates for Exam Malpractice Over Five Years ",
      date: "2025-10-10T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/neet-pg-result-cancelled-22-aspirants-disqualified-by-nbems-for-malpractice-in-exams-from-2021-2025/articleshow/124442605.cms ',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-10-10T08:00:00Z"
    },
    {
      id: 44,
      title: "NEET PG 2025",
      content:" NEET PG 2025 Counselling Start Date: Expected Timeline and Complete Process Guide ",
      date: "2025-10-11T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/when-will-neet-pg-counselling-2025-begin-check-expected-dates-and-details-for-eligible-candidates/articleshow/124413386.cms ',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-10-11T08:00:00Z"
    },
    {
      id: 45,
      title: "NEET PG 2025",
      content:" NBEMS Disqualifies 33 Medical Candidates: NEET PG and FMGE Results Cancelled for Malpractice",
      date: "2025-10-11T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.timesnownews.com/education/33-medical-aspirants-dreams-shattered-nbems-neet-pg-result-2025-cancellation-fmge-results-scrapped-between-2021-and-2025-unfair-means-use-article-152981611 ',
      is_active: true,
      source: 'Times Now News',
      created_at: "2025-10-11T08:00:00Z"
    },
    {
      id: 46,
      title: "NEET PG 2025",
      content:" NBEMS Cancels NEET PG Results of 22 Candidates Over Examination Malpractice Allegations",
      date: "2025-10-12T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-result-cancelled-nbems-annuls-results-of-22-candidates-for-malpractice-10298319/ ',
      is_active: true,
      source: 'Indian Express',
      created_at: "2025-10-12T08:00:00Z"
    },
    {
      id: 47,
      title: "NEET PG Counselling 2025:",
      content:" MCC Schedule Expected Soon – Registration Process and Key Dates: The Medical Counselling Committee (MCC) is anticipated to announce the NEET PG 2025 counselling schedule shortly on mcc.nic.in. Candidates should prepare for registration, choice-filling, and seat allotment across four rounds including a stray vacancy round.",
      date: "2025-10-13T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/mcc-neet-pg-counselling-2025-expected-to-release-soon-check-details-here/articleshow/124527012.cms',
      is_active: true,
      source: 'Times of India',
      created_at: "2025-10-13T08:00:00Z"
    },
    {
      id: 48,
      title: "NEET PG Counselling 2025:",
      content:" MCC NEET PG Counselling 2025 Schedule Release Expected: Registration, Seat Allotment Dates at mcc.nic.in, Admission Process Details",
      date: "2025-10-15T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-counselling-2025-schedule-to-release-soon-check-details-here-181494',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-10-15T08:00:00Z"
    },
    {
      id: 49,
      title: "NEET PG Counselling 2025:",
      content:" MCC NEET PG Counselling 2025 Round 1 Registration Started at mcc.nic.in: Direct Link, Complete Schedule, Login Process for AIQ Seats",
      date: "2025-10-17T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-2025-counselling-round-1-registration-begin-at-mcc-nic-in-get-direct-link-here-181509',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-10-17T08:00:00Z"
    },
    {
      id: 50,
      title: "MCC Online NEET PG Seats",
      content:"  Allotment Process 2025: 50% All India Quota Counselling for MD MS and Dental Seats at mcc.nic.in :MCC conducts online counselling for 50% All India Quota NEET PG seats in medical and dental programs at mcc.nic.in following Supreme Court directives for transparent seat allotment",
      date: "2025-10-18T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'MCC',
      created_at: "2025-10-18T08:00:00Z"
    },
    {
      id: 51,
      title: "NEET PG Counselling 2025:",
      content:" MCC NEET PG 2025 Counselling Registration Process Ongoing at mcc.nic.in: Complete Round-Wise Schedule to be Released Soon for MD MS Admission",
      date: "2025-10-24T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://www.jagranjosh.com/news/neet-pg-2025-counselling-registration-underway-complete-schedule-at-mcc.nic.in-181549',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-10-24T08:00:00Z"
    },
    {
      id: 52,
      title: "NEET PG Counselling 2025:",
      content:" MCC NEET PG 2025 Round 1 RESET Registration Option Active at mcc.nic.in: Deadline November 5 for Corrections, NRI Documents Due October 28",
      date: "2025-10-26T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://www.jagranjosh.com/news/neet-pg-2025-counselling-registration-underway-complete-schedule-at-mcc.nic.in-181549',
      is_active: true,
      source: 'Jagran Josh',
      created_at: "2025-10-26T08:00:00Z"
    },
    {
      id: 53,
      title: "NEET PG Counselling 2025:",
      content:" NEET PG 2025 Round 1: MCC Activates RESET Registration Until November 5 and Releases NRI Admission Guidelines with October 28 Document Deadline at mcc.nic.in ",
      date: "2025-10-27T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://timesofindia.indiatimes.com/education/news/neet-pg-2025-round-1-mcc-opens-reset-registration-releases-nri-admission-guidelines-counselling-soon/articleshow/124827600.cms',
      is_active: true,
      source: 'Times of india',
      created_at: "2025-10-27T08:00:00Z"
    },
    {
      id: 54,
      title: "NEET PG Counselling 2025:",
      content:" MCC Releases NEET PG 2025 Counselling Schedule at mcc.nic.in: Round 1 Choice Filling Begins October 28, Seat Allotment Result on November 8 for AIQ and State Quota Seats ",
      date: "2025-10-29T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://indianexpress.com/article/education/neet-pg-counselling-2025-schedule-released-mcc-nic-in-aiq-seats-state-quota-seats-10331493/',
      is_active: true,
      source: 'Indian Express',
      created_at: "2025-10-29T08:00:00Z"
    },
    {
      id: 55,
      title: "NEET PG Counselling 2025:",
      content:" Bihar NEET PG 2025 State Counselling Registration Announced at bceceboard.bihar.gov.in: BCECE Issues Advertisement for MD/MS/Diploma Admissions Based on NEET PG 2025 Scores  ",
      date: "2025-10-30T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://bceceboard.bihar.gov.in/',
      is_active: true,
      source: 'Bceceboard Bihar Gov.in',
      created_at: "2025-10-30T08:00:00Z"
    },
    {
      id: 56,
      title: "NEET PG Counselling 2025:",
      content:" UP NEET PG 2025 Counselling Schedule Released at upneet.gov.in: Round-Wise Dates Announced for Uttar Pradesh State Quota MD/MS/Diploma Admissions ",
      date: "2025-10-31T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://upneet.gov.in/',
      is_active: true,
      source: 'upneet.gov.in',
      created_at: "2025-10-31T08:00:00Z"
    },
    {
      id: 57,
      title: "NEET PG Counselling 2025:",
      content:" Maharashtra CET Cell Launches CAP 2025-26 Centralised Admission Process Portal for Engineering, MBA, Medical, and Other Postgraduate and Undergraduate Courses Registration ",
      date: "2025-10-31T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://cetcell.mahacet.org/cap-_2025-26/',
      is_active: true,
      source: 'cetcell.mahacet.org',
      created_at: "2025-10-31T08:00:00Z"
    },
     {
      id: 58,
      title: "NEET PG Counselling 2025:",
      content:"National Medical Commission Approves 62 New PG Medical Seats in Six Odisha Government Colleges for 2025-26 Academic Year NEET PG Counselling",
      date: "2025-11-01T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://www.hindustantimes.com/education/centre-approved-62-more-pg-seats-in-6-medical-colleges-of-odisha-cm-101761976390832.html',
      is_active: true,
      source: 'hindustan times',
      created_at: "2025-11-01T08:00:00Z"
    },
    {
      id: 59,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025 Round 1 Registration and Choice Filling Ends Tomorrow  November 5 - Final Hours to Register",
      date: "2025-11-04T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-04T08:00:00Z"
    },
    {
      id: 60,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025 Round 1 Choice Filling Extended - New Deadline Update for Candidates",
      date: "2025-11-05T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-05T08:00:00Z"
    },
    {
      id: 61,
      title: "NEET PG Counselling 2025:",
      content:"PwD Certificate Generation Portal Open for NEET PG 2025 Round 1 - Deadline November 8 at 5 PM",
      date: "2025-11-06T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-06T08:00:00Z"
    },
    {
      id: 62,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025 Round 1 Choice Filling Extended Indefinitely - MCC Revises Seat Matrix After 169 DNB Seats Withdrawn",
      date: "2025-11-06T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-06T08:00:00Z"
    },
    {
      id: 63,
      title: "NEET PG Counselling 2025:",
      content:"Rajasthan NEET PG Counselling 2025 Round 1 Schedule Released - Registration Opens November 7",
      date: "2025-11-07T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://raj.nic.in/',
      is_active: true,
      source: 'raj.nic.in',
      created_at: "2025-11-07T08:00:00Z"
    },
    {
      id: 64,
      title: "NEET PG Counselling 2025:",
      content:"Supreme Court Orders NBE to Disclosure Answer Key Policy as NEET PG 2025 Round 1 Choice Filling Deadline Extended Until Further Notice – MCC Counselling Update",
      date: "2025-11-08T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://indianexpress.com/article/education/neet-pg-2025-counselling-choice-filling-extends-supreme-court-directs-nbems-nbe-disclose-answer-key-policy-counselling-delays-10351941/',
      is_active: true,
      source: 'Indian Express',
      created_at: "2025-11-08T08:00:00Z"
    },
    {
      id: 65,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025: NBEMS Releases Important Reporting and Joining Instructions for DNB Seat Holders in All India Quota Counselling",
      date: "2025-11-11T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://natboard.edu.in',
      is_active: true,
      source: 'NBEMS',
      created_at: "2025-11-11T08:00:00Z"
    },
    {
      id: 66,
      title: "NEET PG Counselling 2025:",
      content:"Jharkhand NEET PG 2025 Round 1 Final Merit List Declared by JCECEB – Choice Filling Open for 267 Eligible Candidates",
      date: "2025-11-11T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: ' https://timesofindia.indiatimes.com/education/news/jharkhand-neet-pg-counselling-2025-round-1-final-merit-list-released-check-steps-to-download-and-other-details-here/articleshow/125246017.cms',
      is_active: true,
      source: 'NBEMS',
      created_at: "2025-11-11T08:00:00Z"
    },
    {
      id: 67,
      title: "AIIMS Confirms INI CET November 2025:",
      content:"AIIMS Confirms INI CET November 2025 tentative Result Date – January 2026 Session Scorecard to be tentatively Released Tomorrow (November 15)",
      date: "2025-11-11T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://oldwebsite.aiimsexams.ac.in/info/keydates_2025.html',
      is_active: true,
      source: 'NBEMS',
      created_at: "2025-11-11T08:00:00Z"
    },
    {
      id: 68,
      title: "NEET PG Counselling 2025:",
      content:"Haryana NEET PG Counselling 2025 Round 1: Registration and Choice Filling Open Until November 16 – Check Complete Schedule",
      date: "2025-11-15T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.telegraphindia.com/edugraph/news/haryana-neet-pg-2025-counselling-round-1-choice-filling-open-till-november-16-detailed-schedule-here/cid/2132881',
      is_active: true,
      source: 'telegraphindia',
      created_at: "2025-11-15T08:00:00Z"
    },
    {
      id: 69,
      title: "NEET PG Counselling 2025:",
      content:"MCC Releases Complete NEET PG 2025 Counselling Calendar—All India Quota, State Quota, and Deemed University Schedule Announced",
      date: "2025-11-15T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-15T08:00:00Z"
    },
    {
      id: 70,
      title: "AIIMS INI CET 2025 Result Declared:",
      content:"AIIMS INI CET 2025 Result Declared: 32,374 Candidates Qualify for January 2026 Session MD/MS/DM/MCh/MDS Admissions - Download Score at aiimsexams.ac.in",
      date: "2025-11-16T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.ndtv.com/education/aiims-ini-cet-2025-exam-roll-number-wise-result-released-download-directly-here-9643761',
      is_active: true,
      source: 'ndtv',
      created_at: "2025-11-15T08:00:00Z"
    },
    {
      id: 71,
      title: "NEET PG Counselling 2025:",
      content:"The choice filling has been extended by 2-3 days in larger interest of candidates.",
      date: "2025-11-19T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/pg-medical-counselling',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-19T08:00:00Z"
    },
    {
      id: 72,
      title: "NEET PG Counselling 2025:",
      content:"MCC Round 1 Choice Locking Begins Today at 5 PM; Locking Window Open Till Tomorrow Noon",
      date: "2025-11-12T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-20T08:00:00Z"
    },
    {
      id: 73,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG Counselling 2025: Round 1 Provisional Results Announced, Round 2 Schedule Released",
      date: "2025-11-21T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.indiatoday.in/education-today/news/story/neet-pg-counselling-2025-round-1-provisional-result-out-round-2-schedule-here-2824182-2025-11-22',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-21T08:00:00Z"
    },
    {
      id: 74,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG Counselling 2025 Round 1 Seat Allotment PDF Available, MCC Announces Reporting and Round 2 Schedule",
      date: "2025-11-22T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in',
      created_at: "2025-11-22T08:00:00Z"
    },
    {
      id: 74,
      title: "NEET PG Counselling 2025:",
      content:"Maharashtra NEET PG Counselling 2025: Revised Schedule for Round 1 & 2 Announced",
      date: "2025-11-25T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/maharashtra-neet-pg-counselling-2025-round-1-and-2-revised-schedule-out-at-medicalug2025-mahacet-org-check-here-181926',
      is_active: true,
      source: 'jagranjosh',
      created_at: "2025-11-22T08:00:00Z"
    },
    {
      id: 75,
      title: "NEET PG Counselling 2025:",
      content:"Odisha NEET PG 2025 Round 1 Seat Allotment Result Released at dmetodisha.in, Download Allotment Letter Online",
      date: "2025-11-28T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/odisha-neet-pg-counselling-2025-round-1-seat-allotment-result-out-at-dmetodisha-in-direct-link-here-181973',
      is_active: true,
      source: 'jagranjosh',
      created_at: "2025-11-28T08:00:00Z"
    },
    {
      id: 76,
      title: "NEET PG Counselling 2025:",
      content:"Uttarakhand NEET PG Counselling 2025: Round 1 Seat Allotment Result Out, 1,122 Candidates Allotted MD/MS, DNB Seats",
      date: "2025-12-02T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/uttarakhand-neet-pg-counselling-2025-round-1-seat-allotment-result-released-at-hnbumu-ac-in-check-direct-link-here/articleshow/125711458.cms',
      is_active: true,
      source: 'jagranjosh',
      created_at: "2025-12-02T08:00:00Z"
    },
    {
      id: 77,
      title: "NEET PG Counselling 2025:",
      content:"Telangana NEET PG 2025 Round 1 Final Merit List Released; Check Eligible Candidates at knruhs.telangana.gov.in ",
      date: "2025-12-04T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/telangana-neet-pg-2025-counselling-round-1-final-merit-list-out-at-knruhs-telangana-gov-in-182060',
      is_active: true,
      source: 'Times Internet / Jagran Josh Education ',
      created_at: "2025-12-04T08:00:00Z"
    },
     {
      id: 78,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG Counselling 2025: Round 2 Registration Starts Today, Apply Online at mcc.nic.in Till 9 December",
      date: "2025-12-05T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-counselling-2025-round-2-registration-at-mcc-nic-in-apply-till-9-december-182074',
      is_active: true,
      source: 'Jagran Josh Education ',
      created_at: "2025-12-05T08:00:00Z"
    },
    {
      id: 79,
      title: "INI‑CET January 2026 PG Counselling:",
      content:"INI‑CET January 2026 PG Counselling: AIIMS Releases Online Seat Allocation Schedule for Mock, Round 1 and Round 2",
      date: "2025-12-06T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://drive.google.com/file/d/1xX5C9xXtYBDL24Wum0W8fvoWv9_4-49d/view?usp=sharing',
      is_active: true,
      source: 'Jagran Josh Education ',
      created_at: "2025-12-06T08:00:00Z"
    },
    {
      id: 80,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG Counselling 2025 Round 2: 2,620 New Seats Added, 32,080 Seats in Updated Matrix; Choice Filling Live at mcc.nic.in",
      date: "2025-12-07T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://indianexpress.com/article/education/neet-pg-2025-round-two-2620-new-seats-added-to-matrix-mcc-nic-in-10407121/',
      is_active: true,
      source: 'indianexpress ',
      created_at: "2025-12-07T08:00:00Z"
    },
     {
      id: 81,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025 Round 2 Choice Filling Extended: MCC Keeps PG Counselling Window Open Till 12 December",
      date: "2025-12-08T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in ',
      created_at: "2025-12-07T08:00:00Z"
    },
    {
      id: 82,
      title: "NEET PG Counselling 2025:",
      content:"MCC NEET PG Counselling 2025 Round 2 Choice Filling Halted Today 2 PM–6 PM for Seat Matrix Update; Fresh Vacant Seats to Be Added, Choice Filling and Locking Extended Till 11:55 PM on December 12 at mcc.nic.in",
      date: "2025-12-10T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in ',
      created_at: "2025-12-10T08:00:00Z"
    },
    {
      id: 83,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025 Round 2 Choice Filling, Locking Available Till 1 PM on 13 December – Check Final Timings",
      date: "2025-12-12T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/pg-medical-counselling/',
      is_active: true,
      source: 'mcc.nic.in ',
      created_at: "2025-12-12T08:00:00Z"
    },
    {
      id: 84,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025 Round 2 Updated Schedule Released: MCC Extends Choice Filling Till 14 December, Result on 16 December",
      date: "2025-12-13T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/12/20251213294404571.pdf',
      is_active: true,
      source: 'mcc.nic.in ',
      created_at: "2025-12-13T08:00:00Z"
    },
    {
      id: 85,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025 Round 2 Provisional Seat Allotment Result Released for All India Quota",
      date: "2025-12-17T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/12/202512161123505831.pdf',
      is_active: true,
      source: 'mcc.nic.in ',
      created_at: "2025-12-17T08:00:00Z"
    },
    {
      id: 86,
      title: "NEET PG Counselling 2025:",
      content:"Karnataka NEET PG 2025 Round 2 Provisional Seat Allotment Today After 6 PM, Check Result on KEA Portal",
      date: "2025-12-22T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/karnataka-neet-pg-counselling-2025-round-2-seat-allotment-result-to-be-released-today-steps-to-check-online-portal/articleshow/126112714.cms',
      is_active: true,
      source: 'mcc.nic.in ',
      created_at: "2025-12-22T08:00:00Z"
    },
    {
      id: 87,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025: MCC Extends Resignation Window for Round 1 & 2 Seats Till December 26",
      date: "2025-12-23T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/mcc-extends-neet-pg-2025-resignation-window-for-round-1-and-2-seats-check-official-notice-here/articleshow/126135069.cms',
      is_active: true,
      source: 'timesofindia ',
      created_at: "2025-12-23T08:00:00Z"
    },
     {
      id: 88,
      title: "NEET PG Counselling 2025:",
      content:"NEET PG 2025 Round 3 Counselling: Registration Begins Today at mcc.nic.in, Apply Till January 2",
      date: "2025-12-26T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.jagranjosh.com/news/neet-pg-counselling-2025-round-3-registration-begins-at-mcc-nic-in-steps-to-register-here-182298',
      is_active: true,
      source: 'jagranjosh ',
      created_at: "2025-12-26T08:00:00Z"
    },
    {
      id: 89,
      title: "NEET PG Counselling 2025:",
      content:"Rajasthan NEET PG 2025 Round 2 Seat Allotment Result Out; Report to Allotted Colleges by December 30| You can check your result from here: Click Now",
      date: "2025-12-26T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://rajpgneet2025.in/notifications/1766732402146.pdf',
      is_active: true,
      source: 'rajpgneet2025 ',
      created_at: "2025-12-26T08:00:00Z"
    },
    {
      id: 90,
      title: "FMGE December 2025:",
      content:"FMGE December 2025: NBEMS Extends Deficient Documents Submission Deadline Till January 7, 2026",
      date: "2025-12-30T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://natboard.edu.in/allnotice.php',
      is_active: true,
      source: 'natboard ',
      created_at: "2025-12-30T08:00:00Z"
    },
    {
      id: 91,
      title: "INI CET January 2026:",
      content:"INI CET January 2026: AIIMS Releases Round 2 Online Seat Allotment Result",
      date: "2026-01-10T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://www.aiimsexams.ac.in/result/68dbf1add6fe8f55c65468ab',
      is_active: true,
      source: 'natboard ',
      created_at: "2026-01-10T08:00:00Z"
    },
    {
      id: 92,
      title: "NEET PG Counselling 2026:",
      content:"NEET PG 2025: DGHS Directs States to Halt Round 3 Counselling Until MCC Releases Official Schedule",
      date: "2026-01-07T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://mcc.nic.in/news-events-pg/',
      is_active: true,
      source: 'natboard ',
      created_at: "2026-01-10T08:00:00Z"
    },
     {
      id: 93,
      title: "NEET PG Counselling 2026:",
      content:"MCC Releases Round-3 PG Counselling 2025 Seat Matrix; Institutes Asked to Verify by Jan 15 Published Date",
      date: "2026-01-14T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://pdflink.to/efdb78c3/',
      is_active: true,
      source: 'natboard ',
      created_at: "2026-01-14T08:00:00Z"
    },
    {
      id: 94,
      title: "FMGE December 2025",
      content:"FMGE December 2025 Admit Card Released: Download Hall Ticket from natboard.edu.in",
      date: "2026-01-14T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://timesofindia.indiatimes.com/education/news/fmge-december-2025-admit-card-released-at-natboard-edu-in-direct-link-to-download-hall-ticket-here/articleshow/126519255.cms',
      is_active: true,
      source: 'natboard ',
      created_at: "2026-01-14T08:00:00Z"
    },
     {
      id: 95,
      title: "NEET PG Counselling 2025",
      content:"NEET PG Counselling 2025 Round-3 Schedule Released: Registration Starts January 15 ",
      date: "2026-01-15T08:00:00Z",
      priority: 'high',
      category: 'NEET PG',
      link: 'https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2026/01/20260115689301834.pdf',
      is_active: true,
      source: 'MCC ',
      created_at: "2026-01-14T08:00:00Z"
    },
  ];

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/announcements/');
      if (!response.ok) throw new Error('Failed to fetch announcements');
      const data = await response.json();
      setApiAnnouncements(data.results || []);
      setError(null);
    } catch (err) {
      setError('Failed to load API announcements');
      console.error('Error fetching announcements:', err);
      if (staticAnnouncements.length > 0) {
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const allAnnouncements = [...staticAnnouncements, ...apiAnnouncements]
    .filter(announcement => announcement.is_active !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLinkClick = (link: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">Loading announcements...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl mb-6 md:mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3">
                  <Bell className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold">📢 Announcements</h1>
                  <p className="text-blue-100 mt-1 text-xs md:text-base">Stay updated with NEET PG 2025</p>
                </div>
              </div>
              <button
                onClick={fetchAnnouncements}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full p-2 md:p-3"
              >
                <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Grid Layout */}
        {allAnnouncements.length === 0 && !loading ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="bg-gray-100 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">No Announcements</h3>
            <p className="text-gray-500 text-sm md:text-base">Check back later for updates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {allAnnouncements.map((announcement) => (
              <div
                key={`${announcement.id}-${announcement.category}`}
                onClick={() => setSelectedAnnouncement(announcement)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="p-4 md:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                  
                  <h2 className="text-base md:text-lg font-bold text-gray-800 mb-2 leading-tight line-clamp-2">
                    {announcement.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                    {announcement.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                      {formatDate(announcement.date)}
                    </span>
                    {announcement.source && (
                      <span className="text-xs text-blue-600 font-medium truncate max-w-[120px]">
                        {announcement.source}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Bar */}
        <div className="mt-6 md:mt-8 bg-white rounded-xl shadow-md p-4 md:p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl md:text-2xl font-bold text-blue-600">{allAnnouncements.length}</div>
              <div className="text-gray-600 text-xs md:text-sm">Total</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-red-600">
                {allAnnouncements.filter(a => a.priority === 'high').length}
              </div>
              <div className="text-gray-600 text-xs md:text-sm">High Priority</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-green-600">
                {allAnnouncements.filter(a => a.category === 'NEET PG').length}
              </div>
              <div className="text-gray-600 text-xs md:text-sm">NEET PG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 md:p-6 text-white flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border border-white/30 bg-white/20`}>
                    {selectedAnnouncement.priority.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 border border-white/30">
                    {selectedAnnouncement.category}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold leading-tight">
                  {selectedAnnouncement.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200 flex-shrink-0"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6">
              <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(selectedAnnouncement.date)}</span>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                  {selectedAnnouncement.content}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-3">
                {selectedAnnouncement.source && (
                  <span className="text-xs md:text-sm text-gray-500 italic">
                    Source: {selectedAnnouncement.source}
                  </span>
                )}
                {selectedAnnouncement.link && (
                  <button
                    onClick={() => handleLinkClick(selectedAnnouncement.link!)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 rounded-lg px-4 py-2 text-sm md:text-base font-medium"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementPage;
