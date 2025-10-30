import { SchoolInfo, NewsItem, Event, Faculty, Student, Program, ContactInfo, Leadership, AboutContent, CoreValue, Facility, House, UniformSpecification, LibraryRegulation, AttendancePolicy } from '../types/school';

// Carousel data for hero section
export const carouselData = [
  {
    id: "1",
    image: "./carousel1.jpeg",
    title: "Welcome to Excellence",
    subtitle: "ज्ञानं परमं ध्येयम् - Where Learning Meets Innovation",
    description: "Discover a world of possibilities where every student is empowered to reach their full potential through cutting-edge CBSE education and personalized learning experiences while staying rooted in Indian values.",
    ctaText: "Explore Our Programs",
    ctaLink: "/programs"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Building Future Leaders of India",
    subtitle: "Character, Knowledge, Success",
    description: "Our comprehensive approach to education combines academic rigor with character development, preparing students to become confident leaders of tomorrow while preserving Indian cultural heritage.",
    ctaText: "Meet Our Faculty",
    ctaLink: "/faculty"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
    title: "State-of-the-Art Facilities",
    subtitle: "Modern Learning Environment",
    description: "Experience learning in our world-class facilities equipped with the latest technology, science labs, and creative spaces designed to inspire innovation while maintaining Indian educational standards.",
    ctaText: "Schedule a Visit",
    ctaLink: "/contact"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    title: "Join Our Community",
    subtitle: "Where Dreams Take Flight",
    description: "Become part of a vibrant community where students, teachers, and families work together to create an environment of growth, discovery, and achievement in the spirit of Indian educational excellence.",
    ctaText: "Apply Now",
    ctaLink: "/apply"
  }
];

// About page content
export const aboutContent: AboutContent[] = [
  {
    id: "1",
    section: "story",
    title: "Our Story",
    subtitle: "A Catholic Educational Institute in Buxar Diocese",
    content: "St. Joseph Catholic School is one of the Educational institutes of the Catholic Diocese of Buxar. This school is motivated by the teachings of Jesus Christ, promoting human values and excellence in each one. Love, joy, fellowship, hard work and sincerity are few of the prominent elements instilled in students during their formation in the school. The main aim of St. Joseph Catholic School is to develop the individual personality of each pupil and to elicit those qualities which are best and noblest in them.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    order: 1,
    isActive: true
  },
  {
    id: "2",
    section: "vision",
    title: "Our Vision",
    subtitle: "Formation of Human Person Committed to God and Country",
    content: "Our Vision is the formation of human person committed to God and country. We aim to develop individuals who are rooted in Christian values while contributing meaningfully to the nation's progress and development.",
    order: 2,
    isActive: true
  },
  {
    id: "3",
    section: "mission",
    title: "Our Mission",
    subtitle: "Forming Men and Women of Character, Competence, Conscience and Compassion",
    content: "Our Mission is to form the young as men and women of character, competence, conscience and compassion, committed to build a just society. We strive to create individuals who embody Christian values and work towards building a more just and compassionate world.",
    order: 3,
    isActive: true
  },
  {
    id: "4",
    section: "goals",
    title: "Our Goals",
    subtitle: "Building a Just Society Through Education",
    content: "Our Goals include: Christian formation of our community members through faith education reflected in word and action; Creation of a society inspired by Gospel values of service in love and peace rooted in justice and fellowship based on equality; Provision for quality education that is relevant to all and in particular to the marginalized in the diocese of Buxar; An education that promotes intellectual excellence, religious tolerance, patriotism and uprightness of character.",
    order: 4,
    isActive: true
  }
];

// Core values data
export const coreValues: CoreValue[] = [
  {
    id: "1",
    title: "Love & Fellowship",
    description: "We promote love, joy, fellowship, hard work and sincerity as prominent elements in student formation, following the teachings of Jesus Christ and fostering human values.",
    icon: "heart",
    color: "from-red-500 to-pink-600",
    order: 1
  },
  {
    id: "2",
    title: "Character & Discipline",
    description: "We instill high standards of moral values and discipline, developing individual personality and eliciting the best and noblest qualities in each pupil through Christian formation.",
    icon: "users",
    color: "from-blue-500 to-indigo-600",
    order: 2
  },
  {
    id: "3",
    title: "Service & Justice",
    description: "We form students as men and women of character, competence, conscience and compassion, committed to build a just society inspired by Gospel values of service in love and peace.",
    icon: "hand-heart",
    color: "from-green-500 to-teal-600",
    order: 3
  },
  {
    id: "4",
    title: "Excellence & Patriotism",
    description: "We provide quality education that promotes intellectual excellence, religious tolerance, patriotism and uprightness of character, especially for the marginalized in our community.",
    icon: "star",
    color: "from-yellow-500 to-orange-600",
    order: 4
  }
];

// House System data
export const houseSystem: House[] = [
  {
    id: "1",
    name: "Mahatma Gandhi House",
    color: "Red",
    description: "Named after the Father of the Nation, Mahatma Gandhi House embodies the values of truth, non-violence, and service to humanity. Students in this house are encouraged to develop leadership qualities through peaceful means and social service.",
    motto: "Truth and Non-violence",
    captain: "To be announced",
    viceCaptain: "To be announced"
  },
  {
    id: "2",
    name: "Mother Teresa House",
    color: "Yellow",
    description: "Inspired by Saint Mother Teresa's life of service to the poor and marginalized, this house focuses on compassion, charity, and selfless service. Students learn the importance of caring for others and making a difference in society.",
    motto: "Service to Humanity",
    captain: "To be announced",
    viceCaptain: "To be announced"
  },
  {
    id: "3",
    name: "Abdul Kalam House",
    color: "Green",
    description: "Named after Dr. A.P.J. Abdul Kalam, the People's President, this house emphasizes scientific thinking, innovation, and dedication to learning. Students are encouraged to pursue excellence in academics and contribute to nation-building.",
    motto: "Dream, Believe, Achieve",
    captain: "To be announced",
    viceCaptain: "To be announced"
  },
  {
    id: "4",
    name: "Savithri Phule House",
    color: "Blue",
    description: "Named after Savitribai Phule, the pioneer of women's education in India, this house promotes gender equality, education for all, and social reform. Students learn about the importance of education in transforming society.",
    motto: "Education for All",
    captain: "To be announced",
    viceCaptain: "To be announced"
  }
];

// Facilities data
export const facilities: Facility[] = [
  {
    id: "1",
    name: "Modern Library",
    description: "A comprehensive library with over 50,000 books, digital resources, and study spaces designed for collaborative learning.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["50,000+ Books", "Digital Resources", "Study Spaces", "Collaborative Areas"],
    capacity: "200+ Students",
    order: 1
  },
  {
    id: "2",
    name: "Science Laboratories",
    description: "Fully equipped physics, chemistry, and biology labs with the latest equipment for hands-on scientific exploration.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
    features: ["Physics Lab", "Chemistry Lab", "Biology Lab", "Latest Equipment"],
    capacity: "30 Students per Lab",
    order: 2
  },
  {
    id: "3",
    name: "Sports Complex",
    description: "Multi-purpose sports facilities including indoor gymnasium, outdoor fields, and swimming pool for physical development.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    features: ["Indoor Gymnasium", "Outdoor Fields", "Swimming Pool", "Fitness Center"],
    capacity: "500+ Students",
    order: 3
  }
];

// Leadership data
export const leadershipData: Leadership[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    position: "Principal",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    message: "At Vidya Bharati International School, we believe that every child has the potential to achieve greatness. Our mission is to provide an environment where students can discover their passions, develop their talents, and build the character needed to become leaders of tomorrow. We are committed to academic excellence, innovative teaching methods, and the holistic development of each student while preserving our rich Indian heritage.",
    bio: "Dr. Priya Sharma brings over 20 years of experience in educational leadership and has been instrumental in transforming our school into a center of excellence. She holds a Ph.D. in Education Leadership from Delhi University and has received numerous awards for her contributions to education in India.",
    email: "principal@vidyabharati.edu.in",
    phone: "+91 120 4567891",
    experience: "20+ Years in Education Leadership",
    achievements: [
      "CBSE Excellence Award 2023",
      "Published 15+ Research Papers in Indian Education",
      "Led 3 School Transformation Projects",
      "Mentored 50+ Educational Leaders across India"
    ]
  },
  {
    id: "2",
    name: "Mr. Rajesh Kumar",
    position: "Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    message: "Our vision extends beyond traditional education. We are creating a learning ecosystem that prepares students for the challenges of the 21st century while staying rooted in Indian values. Through innovative programs, cutting-edge technology, and a focus on critical thinking, we empower our students to become problem-solvers and innovators who will shape the future of India.",
    bio: "Mr. Rajesh Kumar is a visionary leader with expertise in educational technology and curriculum development. He has successfully implemented numerous innovative programs that have enhanced student learning outcomes and engagement across CBSE schools in India.",
    email: "director@vidyabharati.edu.in",
    phone: "+91 120 4567892",
    experience: "15+ Years in Educational Innovation",
    achievements: [
      "Digital India Education Award 2022",
      "Developed 10+ STEM Programs for CBSE",
      "International Education Speaker",
      "Digital Learning Pioneer in Indian Schools"
    ]
  },
  {
    id: "3",
    name: "Mrs. Sunita Agarwal",
    position: "Chairman",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    message: "As Chairman, I am proud to lead an institution that has been at the forefront of educational excellence for over 25 years. Our commitment to providing world-class education, fostering innovation, and building character has made us a trusted name in Indian education. We continue to invest in our students, faculty, and facilities to ensure that Vidya Bharati International School remains a beacon of learning and growth in the Indian education landscape.",
    bio: "Mrs. Sunita Agarwal is a distinguished education leader and philanthropist who has dedicated her life to advancing educational opportunities in India. She has served on numerous educational boards and has been recognized for her contributions to community development and women's education.",
    email: "chairman@vidyabharati.edu.in",
    phone: "+91 120 4567893",
    experience: "25+ Years in Educational Leadership",
    achievements: [
      "Lifetime Achievement in Indian Education 2023",
      "Founded 5 Educational Institutions across India",
      "Community Service Excellence Award",
      "Educational Philanthropy Leader"
    ]
  }
];

// Updated faculty data as "Heroes"
export const heroesData: Faculty[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    position: "Principal & Academic Head",
    department: "Administration",
    email: "priya.sharma@vidyabharati.edu.in",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    bio: "Dr. Sharma has over 20 years of experience in education and is passionate about creating an inclusive learning environment that empowers every student to reach their full potential while preserving Indian values and culture.",
    qualifications: ["Ph.D. in Education Leadership (Delhi University)", "M.Ed. in School Administration", "B.A. in Hindi Literature", "CBSE Excellence Award Winner"]
  },
  {
    id: "2",
    name: "Prof. Rajesh Kumar",
    position: "Director of Innovation",
    department: "Technology & Innovation",
    email: "rajesh.kumar@vidyabharati.edu.in",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    bio: "Professor Kumar specializes in educational technology and has pioneered numerous innovative learning programs that have transformed how students engage with education in the Indian context.",
    qualifications: ["Ph.D. in Computer Science (IIT Delhi)", "M.S. in Educational Technology", "B.Tech. in Computer Engineering", "Digital India Innovation Award"]
  },
  {
    id: "3",
    name: "Ms. Sunita Agarwal",
    position: "Chairman & Visionary Leader",
    department: "Board of Directors",
    email: "sunita.agarwal@vidyabharati.edu.in",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    bio: "Ms. Agarwal brings literature to life through innovative teaching methods and a love for both Indian classical literature and contemporary works that inspire students to think critically.",
    qualifications: ["M.A. in Hindi Literature (Delhi University)", "B.A. in Education", "Teaching Excellence Award", "Community Leadership Certificate"]
  }
];

export const mockSchoolInfo: SchoolInfo = {
  name: "St. Joseph Catholic School",
  tagline: "Let your light shine",
  description: "St. Joseph Catholic School is one of the Educational institutes of the Catholic Diocese of Buxar. This school is motivated by the teachings of Jesus Christ, promoting human values and excellence in each one. Love, joy, fellowship, hard work and sincerity are few of the prominent elements instilled in students during their formation in the school.",
  address: "Kochas, Rohtas, Bihar",
  phone: "+91 120 4567890",
  email: "info@stjosephcatholic.edu",
  website: "www.stjosephcatholic.edu",
  established: 2015,
  city: "Kochas",
  logo: "/Kochas%20Logo.JPG",
  id: "1"
};

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "National Science Fair Winners Announced",
    content: "Congratulations to our students who won first place in the CBSE Regional Science Fair! Their innovative project on solar energy and waste management impressed judges and showcased our commitment to STEM education aligned with India's sustainable development goals.",
    image: "/news/science-fair.jpg",
    date: "2024-01-15",
    author: "Dr. Priya Sharma",
    category: "achievement"
  },
  {
    id: "2",
    title: "New Digital Library Inauguration",
    content: "Join us for the grand opening of our new state-of-the-art digital library on February 1st. The facility features modern study spaces, digital resources, and a collection of over 50,000 books including Hindi and regional language literature.",
    image: "/news/library.jpg",
    date: "2024-01-20",
    author: "Principal Rajesh Kumar",
    category: "event"
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting Schedule",
    content: "Parent-teacher meetings will be held on March 15-16. Please check your email for scheduling information and prepare any questions you may have about your child's academic progress and CBSE exam preparation.",
    image: "/news/parent-teacher.jpg",
    date: "2024-01-25",
    author: "Administration",
    category: "announcement"
  }
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "CBSE Regional Science Fair 2024",
    description: "Students showcase their innovative scientific projects and research findings. This year's theme focuses on sustainable solutions for environmental challenges aligned with India's Swachh Bharat and Green India missions.",
    date: "2024-03-15",
    time: "9:00 AM - 3:00 PM",
    location: "School Auditorium & Science Labs",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isUpcoming: true,
    category: "academic",
    organizer: "Science Department",
    targetAudience: "Students, Parents, Community",
    registrationRequired: false
  },
  {
    id: "2",
    title: "Holi Cultural Festival",
    description: "Celebrate the festival of colors with traditional Indian music, classical dance performances, folk art exhibitions, and cultural programs showcasing India's rich heritage.",
    date: "2024-03-25",
    time: "5:00 PM - 8:00 PM",
    location: "School Grounds & Auditorium",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    isUpcoming: true,
    category: "cultural",
    organizer: "Cultural Committee",
    targetAudience: "Students, Parents, Community",
    registrationRequired: true
  },
  {
    id: "3",
    title: "Annual Sports Meet",
    description: "Inter-house athletic competition featuring track and field events, cricket, kabaddi, kho-kho, and individual championships promoting Indian sports culture.",
    date: "2024-04-10",
    time: "8:00 AM - 4:00 PM",
    location: "School Sports Complex",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isUpcoming: true,
    category: "sports",
    organizer: "Physical Education Department",
    targetAudience: "Students, Parents",
    registrationRequired: true
  },
  {
    id: "4",
    title: "Parent-Teacher Meeting",
    description: "Meet with teachers to discuss your child's academic progress, CBSE exam preparation, achievements, and areas for improvement.",
    date: "2024-04-20",
    time: "2:00 PM - 6:00 PM",
    location: "Classrooms & Conference Rooms",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    isUpcoming: true,
    category: "community",
    organizer: "Administration",
    targetAudience: "Parents",
    registrationRequired: true
  },
  {
    id: "5",
    title: "National Mathematics Olympiad",
    description: "Competitive mathematics competition for students to showcase their problem-solving skills and mathematical thinking, preparing for national-level competitions.",
    date: "2024-05-05",
    time: "10:00 AM - 2:00 PM",
    location: "Mathematics Department",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isUpcoming: true,
    category: "academic",
    organizer: "Mathematics Department",
    targetAudience: "Students (Classes 6-12)",
    registrationRequired: true
  },
  {
    id: "6",
    title: "Indian Art & Craft Exhibition",
    description: "Showcase of student artwork, traditional Indian crafts, rangoli, pottery, and creative projects celebrating Indian artistic heritage from all grade levels.",
    date: "2024-05-15",
    time: "3:00 PM - 6:00 PM",
    location: "Art Gallery & Classrooms",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isUpcoming: true,
    category: "cultural",
    organizer: "Art Department",
    targetAudience: "Students, Parents, Community",
    registrationRequired: false
  },
  {
    id: "7",
    title: "Community Service Day - Swachh Bharat",
    description: "Students participate in various community service activities including cleanliness drives, tree plantation, and social responsibility projects aligned with Swachh Bharat mission.",
    date: "2024-06-01",
    time: "9:00 AM - 3:00 PM",
    location: "Various Community Locations",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isUpcoming: true,
    category: "community",
    organizer: "Student Council",
    targetAudience: "Students, Teachers",
    registrationRequired: true
  },
  {
    id: "8",
    title: "Annual Prize Distribution Ceremony",
    description: "Celebration of student achievements and recognition of academic excellence, sports, and extracurricular accomplishments with traditional Indian cultural performances.",
    date: "2024-06-15",
    time: "4:00 PM - 7:00 PM",
    location: "School Auditorium",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    isUpcoming: true,
    category: "academic",
    organizer: "Administration",
    targetAudience: "Students, Parents, Teachers",
    registrationRequired: false
  }
];

export const mockFaculty: Faculty[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    position: "Principal",
    department: "Administration",
    email: "priya.sharma@vidyabharati.edu.in",
    image: "/faculty/priya-sharma.jpg",
    bio: "Dr. Sharma has over 20 years of experience in education and is passionate about creating an inclusive learning environment rooted in Indian values.",
    qualifications: ["Ph.D. in Education (Delhi University)", "M.Ed. in School Leadership", "B.A. in Hindi Literature"]
  },
  {
    id: "2",
    name: "Prof. Rajesh Kumar",
    position: "Head of Science Department",
    department: "Science",
    email: "rajesh.kumar@vidyabharati.edu.in",
    image: "/faculty/rajesh-kumar.jpg",
    bio: "Professor Kumar specializes in physics and has published numerous research papers in leading Indian scientific journals.",
    qualifications: ["Ph.D. in Physics (IIT Delhi)", "M.S. in Physics", "B.Sc. in Physics"]
  },
  {
    id: "3",
    name: "Ms. Sunita Agarwal",
    position: "Hindi Literature Teacher",
    department: "Hindi",
    email: "sunita.agarwal@vidyabharati.edu.in",
    image: "/faculty/sunita-agarwal.jpg",
    bio: "Ms. Agarwal brings Hindi literature to life through innovative teaching methods and a love for both classical and contemporary Indian works.",
    qualifications: ["M.A. in Hindi Literature (Delhi University)", "B.A. in Hindi", "B.Ed. Teaching Certification"]
  }
];

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Arjun Singh",
    grade: "12th Grade",
    achievements: ["School Topper", "National Science Fair Winner", "Student Council President"],
    image: "/students/arjun-singh.jpg"
  },
  {
    id: "2",
    name: "Priya Sharma",
    grade: "11th Grade",
    achievements: ["National Math Olympiad Champion", "Debate Team Captain", "Community Service Award"],
    image: "/students/priya-sharma.jpg"
  },
  {
    id: "3",
    name: "Rahul Kumar",
    grade: "10th Grade",
    achievements: ["Art Competition Winner", "Cricket Team Captain", "Academic Excellence Award"],
    image: "/students/rahul-kumar.jpg"
  }
];

export const mockPrograms: Program[] = [
  {
    id: "1",
    name: "Pre-Nursery (Play Group)",
    description: "Early childhood education program for children ages 2-3, focusing on foundational learning, social skills, and creative development through play-based activities in a nurturing Catholic environment that promotes Christian values.",
    duration: "1 Year",
    category: "elementary",
    requirements: ["Age 2-3", "Basic health checkup", "Parent interview", "Baptism certificate (if applicable)"],
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Play-based learning", "Christian values formation", "Social skills development", "Creative arts", "Prayer and reflection time"],
    ageGroup: "2-3 years",
    classSize: "15 students max",
    tuition: "₹1,20,000/year"
  },
  {
    id: "2",
    name: "Nursery",
    description: "Foundation year preparing children for formal education with focus on reading readiness, basic math concepts, and social development while introducing Christian values and moral formation.",
    duration: "1 Year",
    category: "elementary",
    requirements: ["Age 3-4", "Basic health checkup", "Parent interview", "Character reference"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
    features: ["Reading readiness", "Basic math", "Christian values", "Creative expression", "Prayer time", "Moral formation"],
    ageGroup: "3-4 years",
    classSize: "18 students max",
    tuition: "₹1,50,000/year"
  },
  {
    id: "3",
    name: "Primary School (Classes 1-5)",
    description: "Comprehensive primary education following CBSE curriculum, focusing on core academic subjects, character development, and Christian formation with emphasis on moral values and discipline.",
    duration: "5 Years",
    category: "elementary",
    requirements: ["Age 5-10", "Previous school records", "Assessment test", "Character reference", "Parent commitment to school values"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    features: ["CBSE curriculum", "Christian values formation", "Moral education", "Prayer and reflection", "Character development", "House system participation"],
    ageGroup: "5-10 years",
    classSize: "25 students max",
    tuition: "₹2,00,000/year"
  },
  {
    id: "4",
    name: "Middle School (Classes 6-8)",
    description: "Transitional program preparing students for secondary education with advanced academics, leadership opportunities, and Christian formation focusing on character, competence, conscience and compassion.",
    duration: "3 Years",
    category: "middle",
    requirements: ["Age 11-13", "Primary completion", "Academic assessment", "Character evaluation", "Parent interview"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Advanced academics", "Christian leadership", "Moral formation", "Science & Mathematics", "Service learning", "House leadership opportunities"],
    ageGroup: "11-13 years",
    classSize: "30 students max",
    tuition: "₹2,50,000/year"
  },
  {
    id: "5",
    name: "Secondary School (Classes 9-10)",
    description: "CBSE Class 9-10 education offering comprehensive academic preparation, career exploration, and board exam preparation with strong emphasis on Christian values and moral formation.",
    duration: "2 Years",
    category: "high",
    requirements: ["Age 14-15", "Middle school completion", "Academic records", "Character assessment", "Parent commitment interview"],
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["CBSE Class 10 preparation", "Christian leadership", "Service learning", "Career counseling", "Moral formation", "Student council participation"],
    ageGroup: "14-15 years",
    classSize: "35 students max",
    tuition: "₹3,00,000/year"
  },
  {
    id: "6",
    name: "Senior Secondary (Classes 11-12)",
    description: "CBSE Class 11-12 education with Science, Commerce, and Humanities streams, offering comprehensive preparation for competitive exams and higher education while forming students as men and women of character, competence, conscience and compassion.",
    duration: "2 Years",
    category: "specialized",
    requirements: ["Class 10 completion", "Strong academic background", "Character evaluation", "Stream selection", "Service commitment"],
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["CBSE Class 12 preparation", "JEE/NEET coaching", "Commerce/Humanities streams", "Christian leadership", "Service to community", "Moral excellence"],
    ageGroup: "16-17 years",
    classSize: "30 students max",
    tuition: "₹3,50,000/year"
  }
];

export const mockContactInfo: ContactInfo = {
  address: "Catholic Diocese of Buxar, Buxar, Bihar",
  phone: "+91 120 4567890",
  email: "info@stjosephcatholic.edu",
  website: "www.stjosephcatholic.edu",
  socialMedia: {
    facebook: "https://facebook.com/stjosephcatholicschool",
    twitter: "https://twitter.com/stjosephcatholic",
    instagram: "https://instagram.com/stjosephcatholic",
    linkedin: "https://linkedin.com/company/stjosephcatholicschool"
  }
};

// School Uniform Specifications
export const uniformSpecifications: UniformSpecification[] = [
  {
    id: "1",
    category: "lkg-ukg",
    days: "Monday, Tuesday, Thursday and Friday",
    description: "Regular uniform for LKG & UKG students",
    applicableClasses: "LKG & UKG",
    season: "regular",
    items: [
      "Boys: Parrot Green Colour T.Shirt with school monogram and Dark Navy-Blue colour full pants",
      "Black shoes, Parrot Green colour socks with Carbon blue colour double rings atop",
      "School Belt",
      "Girls: Parrot Green Colour T.Shirt with school monogram and Dark Navy-Blue Skirts",
      "Black shoes, Parrot Green colour socks with Carbon blue colour double rings atop",
      "School Belt"
    ]
  },
  {
    id: "2",
    category: "lkg-ukg",
    days: "Wednesday and Saturday",
    description: "House uniform for LKG & UKG students",
    applicableClasses: "LKG & UKG",
    season: "house",
    items: [
      "House T.Shirt with school monogram and black colour long trousers with strips of all the colours of the houses",
      "White colour shoes, white colour socks with Carbon blue colour double rings atop"
    ]
  },
  {
    id: "3",
    category: "primary-boys",
    days: "Monday, Tuesday, Thursday and Friday",
    description: "Regular uniform for Classes I to X Boys",
    applicableClasses: "Classes I to X (Boys)",
    season: "regular",
    items: [
      "Maroon colour shirt with Navy Blue colour Check with school monogram",
      "Dark Navy Blue colour full pants",
      "Black colour shoes, Navy Blue colour socks with Maroon colour double rings atop",
      "School Belt and Tie"
    ]
  },
  {
    id: "4",
    category: "primary-girls",
    days: "Monday, Tuesday, Thursday and Friday",
    description: "Regular uniform for Classes I to V Girls",
    applicableClasses: "Classes I to V (Girls)",
    season: "regular",
    items: [
      "Maroon colour shirt with Navy Blue colour Check with school monogram",
      "Dark Navy-Blue colour Skirts",
      "Black colour shoes, Navy Blue colour socks with Maroon colour double rings atop",
      "School Belt and Tie"
    ]
  },
  {
    id: "5",
    category: "middle-girls",
    days: "Monday, Tuesday, Thursday and Friday",
    description: "Regular uniform for Classes VI to X Girls",
    applicableClasses: "Classes VI to X (Girls)",
    season: "regular",
    items: [
      "Salwar Suit (Maroon colour with Navy Blue colour Check with school monogram Top and Dark Navy – Blue colour Lower)",
      "Black colour shoes, Navy Blue colour socks with Maroon colour double rings atop"
    ]
  },
  {
    id: "6",
    category: "primary-boys",
    days: "Wednesday and Saturday",
    description: "House uniform for Classes I to X Boys & Girls",
    applicableClasses: "Classes I to X (Boys & Girls)",
    season: "house",
    items: [
      "House T.Shirt with school monogram and black colour long trousers with strips of all the colours of the houses",
      "White colour shoes, white colour socks with Carbon blue colour double rings atop"
    ]
  },
  {
    id: "7",
    category: "winter",
    days: "Winter Season",
    description: "Winter uniform for LKG & UKG",
    applicableClasses: "LKG & UKG",
    season: "winter",
    items: [
      "Black colour Sweater and Black colour Woolen Cap with the Daily Uniform"
    ]
  },
  {
    id: "8",
    category: "winter",
    days: "Winter Season",
    description: "Winter uniform for Classes I to X",
    applicableClasses: "Classes I to X",
    season: "winter",
    items: [
      "Maroon colour blazers, Maroon colour half sleeved sweaters and Maroon colour Woolen Cap with the Daily Uniform"
    ]
  }
];

// Library Regulations
export const libraryRegulations: LibraryRegulation[] = [
  {
    id: "1",
    title: "Book Borrowing Policy",
    description: "Guidelines for borrowing and returning library books",
    rules: [
      "Students may borrow two books at a time for a period of one week using the library card",
      "Books must be returned on time to avoid fines",
      "If books are returned late, a fine of Rs. 10/- is charged per day for the book",
      "If student is absent on the return day, books must be returned on the day they return to school with notification of absence in School Diary",
      "Books to be renewed must be brought to the library on the date of return for renewal"
    ],
    fines: {
      lateReturn: "Rs. 10/- per day per book",
      damage: "Amount fixed by librarian to compensate loss/damage"
    }
  },
  {
    id: "2",
    title: "Reference Books Policy",
    description: "Rules for using reference materials",
    rules: [
      "Reference books are for consultation/reference only within the library",
      "Reference books are not issued for home use",
      "All reference work must be done in the library itself"
    ]
  },
  {
    id: "3",
    title: "Library Conduct and Care",
    description: "Behavioral guidelines and book care policies",
    rules: [
      "Library books should be handled carefully - no tearing/folding of papers",
      "Students who damage or lose library books must pay compensation fixed by librarian",
      "Students causing damage to library furniture will pay for repairs/replacement",
      "Do not lend your library books or library card to others"
    ]
  },
  {
    id: "4",
    title: "Library Environment Rules",
    description: "Maintaining proper library atmosphere",
    rules: [
      "Silence must be observed at all times in the library",
      "No eatables are allowed in the library",
      "Use of mobile phones is strictly prohibited inside the library",
      "The Librarian is available to help students"
    ]
  }
];

// Attendance and Punctuality Policies
export const attendancePolicies: AttendancePolicy[] = [
  {
    id: "1",
    category: "attendance",
    title: "Regular Attendance Requirements",
    description: "Mandatory attendance standards for all students",
    rules: [
      "Regular attendance is a key requisite for all students of St. Joseph's",
      "Students must have minimum 75% attendance (examination board rule)",
      "Students failing to meet attendance requirement will not receive promotion",
      "Such students should repeat in the same class or be withdrawn",
      "All students expected to attend on reopening day after vacation and day before vacation begins"
    ]
  },
  {
    id: "2",
    category: "leave",
    title: "Leave and Absence Procedures",
    description: "Proper procedures for taking leave and handling absences",
    rules: [
      "No student may absent without obtaining leave previously in writing",
      "For unplanned absence, submit parent/guardian letter stating reason upon return",
      "Obtain permission from principal or vice principal before entering class",
      "Parents/guardian must make entry in student's diary on 'Non-Attendance and Leave records' page",
      "1-2 days absence: get diary signed by Class Teacher with leave application",
      "3+ days absence: submit application signed by parent/guardian and countersigned by principal/vice principal",
      "Medical absence of 3+ days must include medical certificate copy"
    ],
    penalties: [
      {
        type: "Excessive Leave",
        amount: "Rs. 20/- per day",
        consequence: "Fine for more than 20 days leave in a year"
      },
      {
        type: "Absence without leave",
        consequence: "Disciplinary action at discretion of principal/vice principal"
      },
      {
        type: "Continuous unexplained absence",
        consequence: "Name struck off rolls after 8+ working days, re-admission required"
      }
    ]
  },
  {
    id: "3",
    category: "punctuality",
    title: "Punctuality and Late Coming",
    description: "Standards for timely arrival and consequences for tardiness",
    rules: [
      "Punctuality is a main aspect of self-discipline",
      "All students expected to be punctual for school arrival and all functions/activities",
      "Students must arrive at school at least 10 minutes before first bell",
      "Late students will not be admitted to class without principal/vice principal permission",
      "Late coming data must be entered in appropriate diary page",
      "Student council members may record ordinary delays in diary with date"
    ],
    penalties: [
      {
        type: "Late Coming Fine",
        amount: "Rs. 20/- per day",
        consequence: "Fine imposed after 5+ late days in a year, paid to class teacher"
      }
    ]
  },
  {
    id: "4",
    category: "withdrawal",
    title: "Student Withdrawal and Dismissal",
    description: "Policies regarding student departure and disciplinary actions",
    rules: [
      "No refund of fees for students who leave school or are dismissed",
      "Students sent away or struck off rolls will not be re-admitted as a rule",
      "Habitual idleness, disobedience, bad conduct, or contagious sickness can lead to dispersal",
      "Transfer Certificate requires written application 3 days in advance",
      "All dues must be cleared before T.C. issuance",
      "T.C. fee: Rs. 200/-"
    ]
  }
];

// Arrival and Departure Policies
export const arrivalDeparturePolicies: AttendancePolicy[] = [
  {
    id: "1",
    category: "attendance",
    title: "Arrival and Departure Guidelines",
    description: "Safety and conduct rules for school arrival and departure",
    rules: [
      "Students must arrive at school at least 10 minutes before first bell",
      "School does not provide transportation - parents responsible for arrangements",
      "School not liable for student safety once they leave premises",
      "All students must leave or be collected within 20 minutes of dispersal",
      "Students expected to conduct themselves responsibly while traveling",
      "After arrival, go directly to respective classes for first period or self-study",
      "No playing, running around, or unnecessary noise after arrival",
      "No staying back to play after dispersal except for enrolled activities",
      "Follow instructions of watchman and assigned staff during arrival/departure",
      "No arguments with security staff - they ensure safety and convenience"
    ],
    penalties: [
      {
        type: "Misconduct during travel",
        consequence: "Expulsion from school for conduct contrary to discipline or injurious to school reputation"
      },
      {
        type: "Leaving during school hours",
        consequence: "Written permission from principal/vice principal required, gate pass needed"
      }
    ]
  }
];

// Fee Payment Policies
export const feePaymentPolicies: AttendancePolicy[] = [
  {
    id: "1",
    category: "attendance",
    title: "Fee Payment Schedule",
    description: "Quarterly payment structure and deadlines for school fees",
    rules: [
      "School fees are to be paid in 4 quarters/installments",
      "Quarterly installment must be paid by the 15th of the first month of that quarter",
      "Late fee of Rs. 20/- per month applies if fees are not paid by the prescribed date",
      "All dues must be paid up before each terminal exam irrespective of the due date",
      "Students with overdue fees may be barred from sitting for exams",
      "No student will be allowed to return until outstanding dues are settled in full",
      "Students are liable to be charged full fee as long as their names are officially on the rolls"
    ],
    penalties: [
      {
        type: "Late Fee",
        amount: "Rs. 20/- per month",
        consequence: "Applied if fees not paid by prescribed date"
      },
      {
        type: "Overdue Fees (30+ days)",
        consequence: "Student's name liable to be struck off school rolls"
      },
      {
        type: "Unpaid Fees at Exam Time",
        consequence: "Student barred from exams and name struck off rolls"
      }
    ]
  },
  {
    id: "2",
    category: "withdrawal",
    title: "Fee Payment Consequences",
    description: "Consequences of non-payment and re-admission procedures",
    rules: [
      "Student's name liable to be struck off rolls if dues remain unpaid for more than 30 days",
      "Re-admission only after previous dues are cleared and re-admission fees paid afresh",
      "No student allowed to return until outstanding fee dues of previous term are settled",
      "Bonafide Certificate issued from office after two working days when applied for"
    ]
  }
];

// Parent Guidelines and Responsibilities
export const parentGuidelines: AttendancePolicy[] = [
  {
    id: "1",
    category: "attendance",
    title: "Parent Cooperation & Responsibilities",
    description: "Essential guidelines for parent involvement in student education",
    rules: [
      "Parents must ensure regular attendance and discipline of their ward",
      "Monitor ward's progress by checking diaries and notebooks regularly",
      "Attend all school functions such as parent-teacher meetings and result days",
      "If parent fails to attend parent-teacher meeting, ward cannot attend school until meeting with class teacher",
      "Tutors, relatives, or unauthorized persons not allowed to attend meetings unless written request provided",
      "Occasional reports from teachers must be countersigned as proof of reading",
      "When communicating with school, include full name, standard, section, and roll number of ward"
    ]
  },
  {
    id: "2",
    category: "leave",
    title: "School Visit & Communication Guidelines",
    description: "Proper procedures for school visits and communication",
    rules: [
      "Parents/guardians should not visit classes or interact with teachers without principal/vice principal approval",
      "Bring ID card provided whenever visiting the school",
      "Criticism of teachers and school in student's presence should be avoided",
      "For legitimate complaints, meet principal or secretary without fear of reprisal",
      "Parents cannot dictate terms to management - principal has discretionary power",
      "Notify school in writing of any change in address/telephone number"
    ]
  },
  {
    id: "3",
    category: "punctuality",
    title: "Academic Expectations & Study Requirements",
    description: "Academic standards and study requirements for students",
    rules: [
      "Students in higher classes should put in minimum 2.5 hours of private work/study at home daily",
      "Home tasks must be done neatly and completely each day",
      "Private tuitions not encouraged - students not permitted to take tuition from same school teachers",
      "Violation of tuition rule will result in leaving the school",
      "Students who are ill should not be sent to school for classes or tests"
    ]
  },
  {
    id: "4",
    category: "withdrawal",
    title: "Health & Safety Guidelines",
    description: "Health protocols and safety measures for students",
    rules: [
      "If child reports being sick in school, they will be sent back home immediately",
      "School provides only first aid - no medical treatment except first aid",
      "In case of sickness or accident, parents will be called immediately",
      "For prolonged illness, inform school and send child only after full recovery",
      "Medical certificate required when returning from prolonged illness",
      "Cases of illness settled based on term's work and previous records"
    ]
  },
  {
    id: "5",
    category: "attendance",
    title: "Disciplinary Actions & Grievances",
    description: "Procedures for handling disciplinary matters and complaints",
    rules: [
      "No parent permitted to take action against any other student for misconduct",
      "If parent takes such action, they will be asked to withdraw their ward",
      "For grievances, lodge written complaint to principal with all details",
      "If parent misbehaves with principal/teacher/staff, management empowered to strike off student's name",
      "Parents must go through rules and regulations in diary - ignorance not an excuse",
      "Management reserves right to amend, add, subtract or modify rules for better school running"
    ]
  }
]; 