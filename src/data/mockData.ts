import { SchoolInfo, NewsItem, Event, Faculty, Student, Program, ContactInfo, Leadership, AboutContent, CoreValue, Facility } from '../types/school';

// Carousel data for hero section
export const carouselData = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
    subtitle: "A Journey of Excellence in Indian Education",
    content: "Founded in 1995, Vidya Bharati International School began with a simple yet powerful vision: to create an educational environment where every student could discover their potential while staying rooted in Indian values and culture. Over the years, we have grown from a small institution to a premier CBSE-affiliated educational establishment, serving thousands of students and families across India. Our commitment to academic excellence, character development, and innovative learning while preserving our rich Indian heritage has remained unwavering.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    order: 1,
    isActive: true
  },
  {
    id: "2",
    section: "mission",
    title: "Our Mission",
    subtitle: "Empowering Students for Success with Indian Values",
    content: "To provide exceptional CBSE education that empowers students with knowledge, skills, and character needed to succeed in an ever-changing world while preserving Indian cultural values. We are committed to fostering academic excellence, personal growth, social responsibility, and national pride.",
    order: 2,
    isActive: true
  },
  {
    id: "3",
    section: "vision",
    title: "Our Vision",
    subtitle: "Shaping Future Leaders of India",
    content: "To be the leading educational institution in India that inspires innovation, nurtures talent, and shapes future leaders who will make a positive impact on society while contributing to India's growth story. We envision a world where every student reaches their full potential while staying connected to their roots.",
    order: 3,
    isActive: true
  }
];

// Core values data
export const coreValues: CoreValue[] = [
  {
    id: "1",
    title: "Excellence (उत्कृष्टता)",
    description: "We strive for excellence in everything we do, setting high standards for academic achievement and personal growth while maintaining the highest quality of education as per CBSE guidelines.",
    icon: "check-circle",
    color: "from-blue-500 to-purple-600",
    order: 1
  },
  {
    id: "2",
    title: "Integrity (ईमानदारी)",
    description: "We uphold the highest standards of honesty, ethics, and moral character in all our interactions and decisions, following the principles of Dharma and righteous conduct.",
    icon: "users",
    color: "from-green-500 to-teal-600",
    order: 2
  },
  {
    id: "3",
    title: "Compassion (करुणा)",
    description: "We foster a caring and supportive environment where empathy, kindness, and understanding are valued and practiced, reflecting the Indian value of 'Vasudhaiva Kutumbakam' (World is one family).",
    icon: "heart",
    color: "from-purple-500 to-pink-600",
    order: 3
  },
  {
    id: "4",
    title: "Innovation (नवाचार)",
    description: "We embrace creativity and innovation, encouraging students to think critically and solve problems in new ways while staying connected to Indian traditions and values.",
    icon: "lightning-bolt",
    color: "from-yellow-500 to-orange-600",
    order: 4
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
  name: "Bright Future Academy",
  tagline: "Empowering Minds, Building Futures",
  description: "Bright Future Academy is a premier educational institution committed to academic excellence, character development, and innovative learning. We provide a nurturing environment where students can discover their potential and prepare for a successful future.",
  address: "123 Education Street, Knowledge City, KC 12345",
  phone: "+1 (555) 123-4567",
  email: "info@brightfutureacademy.edu",
  website: "www.brightfutureacademy.edu",
  established: 1995,
  logo: "/school-logo.png"
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
    description: "Early childhood education program for children ages 2-3, focusing on foundational learning, social skills, and creative development through play-based activities in a nurturing Indian environment.",
    duration: "1 Year",
    category: "elementary",
    requirements: ["Age 2-3", "Basic health checkup", "Parent interview"],
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Play-based learning", "Social skills development", "Creative arts", "Physical activities", "Indian cultural values"],
    ageGroup: "2-3 years",
    classSize: "15 students max",
    tuition: "₹1,20,000/year"
  },
  {
    id: "2",
    name: "Nursery",
    description: "Foundation year preparing children for formal education with focus on reading readiness, basic math concepts, and social development while introducing Indian cultural elements.",
    duration: "1 Year",
    category: "elementary",
    requirements: ["Age 3-4", "Basic health checkup", "Parent interview"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
    features: ["Reading readiness", "Basic math", "Social skills", "Creative expression", "Hindi alphabet introduction"],
    ageGroup: "3-4 years",
    classSize: "18 students max",
    tuition: "₹1,50,000/year"
  },
  {
    id: "3",
    name: "Primary School (Classes 1-5)",
    description: "Comprehensive primary education following CBSE curriculum, focusing on core academic subjects, character development, and exploration of various learning areas with Indian cultural integration.",
    duration: "5 Years",
    category: "elementary",
    requirements: ["Age 5-10", "Previous school records", "Assessment test"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    features: ["CBSE curriculum", "Hindi & English", "Art & Music", "Physical Education", "Indian cultural studies"],
    ageGroup: "5-10 years",
    classSize: "25 students max",
    tuition: "₹2,00,000/year"
  },
  {
    id: "4",
    name: "Middle School (Classes 6-8)",
    description: "Transitional program preparing students for secondary education with advanced academics, leadership opportunities, and specialized subjects as per CBSE guidelines.",
    duration: "3 Years",
    category: "middle",
    requirements: ["Age 11-13", "Primary completion", "Academic assessment"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["Advanced academics", "Leadership development", "Science & Mathematics", "Sports programs", "Computer education"],
    ageGroup: "11-13 years",
    classSize: "30 students max",
    tuition: "₹2,50,000/year"
  },
  {
    id: "5",
    name: "Secondary School (Classes 9-10)",
    description: "CBSE Class 9-10 education offering comprehensive academic preparation, career exploration, and board exam preparation with focus on Indian educational standards.",
    duration: "2 Years",
    category: "high",
    requirements: ["Age 14-15", "Middle school completion", "Academic records", "Interview"],
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["CBSE Class 10 preparation", "Board exam coaching", "Career counseling", "Extracurricular activities", "Competitive exam preparation"],
    ageGroup: "14-15 years",
    classSize: "35 students max",
    tuition: "₹3,00,000/year"
  },
  {
    id: "6",
    name: "Senior Secondary (Classes 11-12)",
    description: "CBSE Class 11-12 education with Science, Commerce, and Humanities streams, offering comprehensive preparation for competitive exams and higher education in India.",
    duration: "2 Years",
    category: "specialized",
    requirements: ["Class 10 completion", "Strong academic background", "Stream selection", "Application essay"],
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: ["CBSE Class 12 preparation", "JEE/NEET coaching", "Commerce/Humanities streams", "University preparation", "Academic excellence"],
    ageGroup: "16-17 years",
    classSize: "30 students max",
    tuition: "₹3,50,000/year"
  }
];

export const mockContactInfo: ContactInfo = {
  address: "123 Education Street, Knowledge City, Buxar 12345",
  phone: "+91 120 4567890",
  email: "info@brightfutureacademy.edu",
  website: "www.brightfutureacademy.edu",
  socialMedia: {
    facebook: "https://facebook.com/brightfutureacademy",
    twitter: "https://twitter.com/bfacademy",
    instagram: "https://instagram.com/brightfutureacademy",
    linkedin: "https://linkedin.com/company/brightfutureacademy"
  }
}; 