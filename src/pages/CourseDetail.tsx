import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, CheckCircle, Lock } from 'lucide-react';
import { mockCourses } from '../data/mockData';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  
  const course = mockCourses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/courses" className="text-blue-600 hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                    {course.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <p className="text-gray-600 text-lg">{course.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{formatPrice(course.price)}</div>
                  <div className="text-sm text-gray-500">One-time payment</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="ml-1">({course.studentsCount.toLocaleString('en-IN')} students)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{course.lessons.length} lessons</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    course.level === 'Beginner' 
                      ? 'bg-green-100 text-green-700' 
                      : course.level === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Content/Lessons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : lesson.isLocked ? (
                            <Lock className="h-6 w-6 text-gray-400" />
                          ) : (
                            <Play className="h-6 w-6 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {formatDuration(lesson.duration)}
                        </span>
                        <Link
                          to={`/learn/${course.id}/${lesson.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {lesson.isCompleted ? 'Review' : 'Watch'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Preview */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors mb-4">
                  {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                </button>
                <div className="text-center text-sm text-gray-600">
                  30-day money-back guarantee
                </div>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{course.instructor}</div>
                  <div className="text-sm text-gray-600">Expert Instructor</div>
                </div>
              </div>
            </div>

            {/* Course Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">This course includes:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span>{formatDuration(course.duration)} on-demand video</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span>{course.lessons.length} downloadable resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span>Full lifetime access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span>Access on mobile and desktop</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}