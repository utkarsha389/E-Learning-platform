import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Award, BookOpen, Play } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/ProgressBar';
import { mockCourses, mockUser, mockProgress } from '../data/mockData';

export default function Dashboard() {
  // Get enrolled courses with progress
  const enrolledCourses = mockCourses
    .filter(course => mockUser.enrolledCourses.includes(course.id))
    .map(course => {
      const progress = mockProgress.find(p => p.courseId === course.id);
      return {
        ...course,
        isEnrolled: true,
        progress: progress?.progressPercentage || 0
      };
    });

  const recentlyWatchedCourses = enrolledCourses.slice(0, 2);
  const totalProgress = enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / enrolledCourses.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {mockUser.name}!
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-3xl font-bold text-gray-900">{enrolledCourses.length}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-3xl font-bold text-gray-900">{mockUser.totalHoursLearned}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{mockUser.completedCourses.length}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-3xl font-bold text-gray-900">{Math.round(totalProgress)}%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Continue Learning */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
                <Link
                  to="/courses"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Browse all courses
                </Link>
              </div>

              {recentlyWatchedCourses.length > 0 ? (
                <div className="space-y-6">
                  {recentlyWatchedCourses.map((course) => {
                    const progress = mockProgress.find(p => p.courseId === course.id);
                    const currentLesson = course.lessons.find(l => l.id === progress?.currentLesson);
                    
                    return (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 mb-1 truncate">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {currentLesson ? `Current: ${currentLesson.title}` : 'Ready to start'}
                            </p>
                            <ProgressBar progress={course.progress || 0} size="sm" />
                          </div>
                          <Link
                            to={currentLesson ? `/learn/${course.id}/${currentLesson.id}` : `/course/${course.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses yet</h3>
                  <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                  <Link
                    to="/courses"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>

            {/* All Enrolled Courses */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">My Courses</h2>
              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} showProgress={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No enrolled courses</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Overall Progress */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium text-gray-900">{Math.round(totalProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${totalProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{mockUser.totalHoursLearned}</div>
                    <div className="text-xs text-gray-600">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{mockUser.certificates}</div>
                    <div className="text-xs text-gray-600">Certificates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Streak */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Streak</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">7</div>
                <div className="text-sm text-gray-600 mb-4">Days in a row</div>
                <div className="text-xs text-gray-500">Keep it up! 🔥</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="block w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  Browse New Courses
                </Link>
                <Link
                  to="/profile"
                  className="block w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  Update Profile
                </Link>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors">
                  Download Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}