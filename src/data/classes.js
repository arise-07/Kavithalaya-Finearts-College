// Content for the Our Classes page (/classes/), in display order.
//
// Images are matched to classes by what they show. A class with
// `image: null` shows an ornamental panel instead of a photograph.
//
// `focus` sets object-position so each subject stays in frame when the
// landscape photo is cropped to the card's 4:3 frame.

const image = (n, alt, focus = '50% 50%') => ({
  src: `/images/asserts/course_${n}.webp`,
  width: 1024,
  height: 572,
  alt,
  focus,
})

export const CLASSES = [
  {
    name: 'Bharatham',
    description: 'Learn the grace, expressions, rhythm, and traditions of classical Indian dance.',
    image: image(1, 'Four Bharatanatyam dancers in red and gold costumes holding a pose in a temple hall', '52% 50%'),
  },
  {
    name: 'Western Dance',
    description: 'Explore energetic movement, choreography, and contemporary dance styles.',
    image: image(2, 'A group of dancers performing a contemporary routine on a studio stage'),
  },
  {
    name: 'Drawing & Painting',
    description: 'Develop creativity and artistic skills through drawing and painting.',
    image: image(3, 'Children drawing and painting at easels with their teacher in a bright art room', '55% 50%'),
  },
  {
    name: 'Silambam',
    description: 'Discover the traditional Tamil martial art of Silambam.',
    image: image(4, 'Two Silambam practitioners crossing bamboo staffs in a stone courtyard', '45% 50%'),
  },
  {
    name: 'Vocal Music',
    description: 'Develop your voice, musical understanding, and singing skills.',
    image: image(5, 'A young singer with a tanpura practising Carnatic music, an elder musician seated beside him', '90% 50%'),
  },
  {
    name: 'Keyboard / Instrumental Music',
    description: 'Learn musical notes, rhythm, and instrumental playing.',
    image: image(6, 'A young musician playing an electronic keyboard in a music room', '66% 50%'),
  },
]
