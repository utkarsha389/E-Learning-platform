import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

export default function CourseCard({ course, showProgress = false }: CourseCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatStudentsCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            course.level === 'Beginner' 
              ? 'bg-green-100 text-green-700' 
              : course.level === 'Intermediate'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
            {formatPrice(course.price)}
          </span>
        </div>
        {showProgress && course.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 p-3">
            <div className="flex items-center justify-between text-white text-sm mb-2">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {course.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(course.duration)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{formatStudentsCount(course.studentsCount)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons.length} lessons</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            by <span className="font-medium text-gray-900">{course.instructor}</span>
          </div>
          <Link
            to={`/course/${course.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {course.isEnrolled ? 'Continue' : 'View Course'}
          </Link>
        </div>
      </div>
    </div>
  );
}