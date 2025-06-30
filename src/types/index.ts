export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // in minutes
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  price: number;
  rating: number;
  studentsCount: number;
  thumbnail: string;
  lessons: Lesson[];
  tags: string[];
  isEnrolled?: boolean;
  progress?: number; // 0-100
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  videoUrl: string;
  description: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  totalHoursLearned: number;
  certificates: number;
}

export interface Progress {
  courseId: string;
  completedLessons: string[];
  currentLesson?: string;
  progressPercentage: number;
  totalTimeSpent: number; // in minutes
}