// Content for the About Us & Founder Story page (/about/).

export const ABOUT_IMAGES = {
  // Academy photograph: the founder with Bharatanatyam students.
  dance: {
    sources: [
      { src: '/images/asserts/gallery_1-800.webp', width: 800 },
      { src: '/images/asserts/gallery_1-1220.webp', width: 1220 },
    ],
    width: 1220,
    height: 869,
    alt: 'Guru Dr. P. Nisha with Bharatanatyam students in blue and orange performance costumes',
  },
  // Founder portrait (founder.png, cropped to 4:5 for the web).
  founder: {
    sources: [
      { src: '/images/asserts/founder-640.webp', width: 640 },
      { src: '/images/asserts/founder-1200.webp', width: 1200 },
    ],
    width: 1200,
    height: 1500,
    alt: 'Portrait of Guru Dr. P. Nisha in a red and gold silk saree',
  },
}

export const FOUNDER = {
  name: 'Guru Dr. P. Nisha',
  role: 'Founder · Kavithalaya Naatiyapalli',
  bio: [
    "Guru Dr. P. Nisha is a Bharatanatyam exponent whose journey reflects a deep commitment to artistic practice, research, teaching, and cultural preservation. Through Kavithalaya Naatiyapalli, she continues to guide students in developing their artistic abilities, discipline, confidence, and appreciation for India's rich performing arts traditions.",
    'Her work includes postgraduate research, participation in international seminars and conferences, and awards recognising her contribution to the arts.',
  ],
}

export const JOURNEY = [
  {
    marker: '2004',
    title: 'A beginning',
    text: 'Guru Dr. P. Nisha founded Kavithalaya Naatiyapalli to share the discipline and joy of the classical arts.',
  },
  {
    marker: 'Classes',
    title: 'Many art forms, one home',
    text: 'Alongside Bharatham, the academy teaches Western dance, drawing, Silambam and vocal music.',
  },
  {
    marker: 'Growth',
    title: 'Reaching more students',
    text: 'The academy has grown to teach students across more than one location.',
  },
  {
    marker: 'Stages',
    title: 'On international stages',
    text: 'Students of the academy have taken part in international dance events.',
  },
  {
    marker: 'Recognition',
    title: 'Recognition for our students',
    text: 'Students have received recognition at dance competitions.',
  },
  {
    marker: 'Today',
    title: 'Continuing the tradition',
    text: 'The academy continues to guide new students in Bharatham and the fine arts, one step at a time.',
  },
]

// The statement quotes the certificate's own wording.
export const CREDENTIALS = [
  {
    id: 'auss',
    name: 'American University of Spiritual Science',
    title: 'Certificate of Affiliation',
    issued: '13 August 2026',
    statement:
      'Dr. P. Nisha “is hereby affiliated with American University of Spiritual Science as an authorized institution to align with the mission, vision, and academic values of the University.”',
    image: { src: '/images/asserts/american_university.webp', width: 1448, height: 1086 },
  },
]
