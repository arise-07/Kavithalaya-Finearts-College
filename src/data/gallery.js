// Gallery photographs (academy stage performances), in display order.
// Source files are public/images/asserts/gallery_N.jpg; the web copies in
// public/images/asserts/gallery/ have white padding trimmed.
//
// gallery_3.jpg is an exact duplicate of gallery_2.jpg and is not listed.
// gallery_18.png is the same group photo as gallery_1.png (used in Our Story).
// gallery_19.png is only 537 px wide, so both its copies stay at that size.
// To add a photo: put its 720 px and 1440 px WebP copies in the gallery
// folder and add an entry here with the larger copy's width and height.

const photo = (n, width, height, alt) => ({
  id: n,
  small: `/images/asserts/gallery/gallery_${n}-720.webp`,
  large: `/images/asserts/gallery/gallery_${n}-1440.webp`,
  width,
  height,
  alt,
})

export const GALLERY = [
  photo(9, 1440, 1800, 'Bharatanatyam dancer in red seated in a deep pose, palms joined above her head'),
  photo(21, 1440, 1800, 'Close view of a Bharatanatyam dancer framing her face with a hand gesture'),
  photo(2, 1129, 1511, 'Bharatanatyam dancer in a red costume in a wide stance on stage, arms extended'),
  photo(5, 1440, 1800, 'Bharatanatyam dancer with arms outstretched on a stage lit in violet'),
  photo(1, 1440, 965, 'Close view of a Bharatanatyam dancer with expressive eyes and raised hands'),
  photo(4, 1134, 1512, 'Bharatanatyam dancer in red smiling as she performs a hand gesture'),
  photo(7, 1135, 1512, 'Bharatanatyam dancer mid-step on a stage with coloured lights behind'),
  photo(6, 1136, 1512, 'Bharatanatyam dancer in red holding a pose with one hand raised'),
  photo(8, 1130, 1512, 'Bharatanatyam dancer reaching upward on a stage lit in blue'),
  photo(10, 1126, 1510, 'Bharatanatyam dancer bending into a low pose beside stage lights'),
  photo(15, 1440, 1800, 'A group of Bharatanatyam dancers in red performing together, arms raised'),
  photo(11, 1128, 1511, 'Bharatanatyam dancer in a wide stance under coloured stage beams'),
  photo(18, 1220, 869, 'Guru Dr. P. Nisha with Bharatanatyam students in blue and orange costumes'),
  photo(13, 1440, 1800, 'Bharatanatyam dancer kneeling in a pose on a stage lit in violet'),
  photo(16, 1126, 1511, 'A young Bharatanatyam dancer holding a certificate on stage'),
  photo(12, 1128, 1511, 'Bharatanatyam dancer mid-movement in front of a decorated stage backdrop'),
  photo(19, 537, 757, 'A teacher in a red silk saree seated with a young Bharatanatyam student'),
  photo(14, 1131, 1511, 'Bharatanatyam dancers in red performing in a line on stage'),
  photo(17, 1129, 1511, 'A young Bharatanatyam dancer in red holding a gift on stage'),
  photo(20, 1129, 1511, 'Bharatanatyam dancer in red balancing on one foot, a hand raised above her head'),
]
