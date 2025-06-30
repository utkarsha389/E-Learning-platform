import { Course, User, Progress } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Development Course',
    description: 'Master React from basics to advanced concepts including hooks, context, and modern patterns.',
    instructor: 'Priya Sharma',
    duration: 1200,
    level: 'Intermediate',
    category: 'Web Development',
    price: 6999,
    rating: 4.8,
    studentsCount: 15420,
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['React', 'JavaScript', 'Frontend'],
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to React',
        duration: 45,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'Get started with React fundamentals'
      },
      {
        id: '1-2',
        title: 'JSX and Components',
        duration: 60,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'Understanding JSX syntax and component creation'
      },
      {
        id: '1-3',
        title: 'State and Props',
        duration: 75,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'Managing component state and passing data'
      }
    ]
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Learn Python programming specifically for data analysis, visualization, and machine learning.',
    instructor: 'Dr. Rajesh Kumar',
    duration: 1800,
    level: 'Beginner',
    category: 'Data Science',
    price: 9999,
    rating: 4.9,
    studentsCount: 23100,
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Python', 'Data Science', 'Machine Learning'],
    lessons: [
      {
        id: '2-1',
        title: 'Python Basics',
        duration: 90,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'Python syntax and fundamentals'
      }
    ]
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Comprehensive guide to user interface and user experience design principles and tools.',
    instructor: 'Ananya Patel',
    duration: 900,
    level: 'Intermediate',
    category: 'Design',
    price: 5999,
    rating: 4.7,
    studentsCount: 8900,
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Design', 'UI/UX', 'Figma'],
    lessons: [
      {
        id: '3-1',
        title: 'Design Principles',
        duration: 60,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'Fundamental design principles'
      }
    ]
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Build comprehensive digital marketing campaigns that drive results and grow your business.',
    instructor: 'Vikram Singh',
    duration: 720,
    level: 'Beginner',
    category: 'Marketing',
    price: 4999,
    rating: 4.6,
    studentsCount: 12300,
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Marketing', 'Digital Strategy', 'SEO'],
    lessons: [
      {
        id: '4-1',
        title: 'Marketing Fundamentals',
        duration: 50,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'Core marketing concepts'
      }
    ]
  },
  {
    id: '5',
    title: 'Full Stack JavaScript Development',
    description: 'Complete guide to building modern web applications with Node.js, Express, and MongoDB.',
    instructor: 'Arjun Mehta',
    duration: 2400,
    level: 'Advanced',
    category: 'Web Development',
    price: 12999,
    rating: 4.9,
    studentsCount: 18750,
    thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['JavaScript', 'Node.js', 'MongoDB', 'Full Stack'],
    lessons: [
      {
        id: '5-1',
        title: 'JavaScript Fundamentals',
        duration: 120,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'Advanced JavaScript concepts'
      }
    ]
  },
  {
    id: '6',
    title: 'Machine Learning with TensorFlow',
    description: 'Deep dive into machine learning algorithms and neural networks using TensorFlow.',
    instructor: 'Dr. Kavya Reddy',
    duration: 2100,
    level: 'Advanced',
    category: 'Data Science',
    price: 14999,
    rating: 4.8,
    studentsCount: 9500,
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['Machine Learning', 'TensorFlow', 'AI', 'Neural Networks'],
    lessons: [
      {
        id: '6-1',
        title: 'Introduction to ML',
        duration: 90,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'Machine learning fundamentals'
      }
    ]
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Aarav Gupta',
  email: 'aarav.gupta@example.com',
  enrolledCourses: ['1', '2'],
  completedCourses: [],
  totalHoursLearned: 45,
  certificates: 2
};

export const mockProgress: Progress[] = [
  {
    courseId: '1',
    completedLessons: ['1-1'],
    currentLesson: '1-2',
    progressPercentage: 33,
    totalTimeSpent: 45
  },
  {
    courseId: '2',
    completedLessons: [],
    currentLesson: '2-1',
    progressPercentage: 0,
    totalTimeSpent: 0
  }
];