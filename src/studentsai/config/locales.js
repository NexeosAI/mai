/**
 * File: locales.js
 * Purpose: Defines locale-specific configuration for StudentsAI experiences
 * Location: src/studentsai/config/
 */

export const Locales = {
  'en-GB': {
    label: 'English (United Kingdom)',
    spelling: {
      colour: 'colour',
      programme: 'programme',
      organisation: 'organisation',
      centre: 'centre',
      practise: 'practise',
    },
    grammar: {
      collectiveNouns: 'Often treated as plural (e.g., "the team are")',
      presentPerfectUsage: 'Prefer present perfect with recent actions ("I have just eaten")',
      quotationMarks: 'Single quotation marks are standard',
    },
    dates: {
      format: 'DD/MM/YYYY',
      example: '14/07/2024',
      weekStart: 'Monday',
    },
    academicTerms: {
      undergraduateYear: ['first year', 'second year', 'third year', 'fourth year'],
      periods: ['autumn term', 'spring term', 'summer term'],
      gradingScale: 'First, Upper Second (2:1), Lower Second (2:2), Third',
      advisors: 'personal tutor',
    },
  },
  'en-US': {
    label: 'English (United States)',
    spelling: {
      colour: 'color',
      programme: 'program',
      organisation: 'organization',
      centre: 'center',
      practise: 'practice',
    },
    grammar: {
      collectiveNouns: 'Typically treated as singular (e.g., "the team is")',
      presentPerfectUsage: 'Simple past common for recent actions ("I just ate")',
      quotationMarks: 'Double quotation marks are standard',
    },
    dates: {
      format: 'MM/DD/YYYY',
      example: '07/14/2024',
      weekStart: 'Sunday',
    },
    academicTerms: {
      undergraduateYear: ['freshman', 'sophomore', 'junior', 'senior'],
      periods: ['fall semester', 'spring semester', 'summer session'],
      gradingScale: 'A, B, C, D, F',
      advisors: 'academic advisor',
    },
  },
};

export function getLocaleConfig(locale = 'en-GB') {
  return Locales[locale] || Locales['en-GB'];
}

