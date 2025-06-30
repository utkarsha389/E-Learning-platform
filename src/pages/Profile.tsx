import React, { useState } from 'react';
import { User, Mail, Calendar, Award, BookOpen, Clock, Download, Edit } from 'lucide-react';
import { mockUser, mockCourses, mockProgress } from '../data/mockData';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email
  });

  const enrolledCourses = mockCourses.filter(course => 
    mockUser.enrolledCourses.includes(course.id)
  );

  const completedCourses = mockCourses.filter(course => 
    mockUser.completedCourses.includes(course.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd make an API call here
    setIsEditing(false);
  };

  const achievements = [
    { title: 'First Course', description: 'Completed your first course', icon: '🎓', earned: true },
    { title: 'Fast Learner', description: 'Completed 3 courses in a month', icon: '⚡', earned: true },
    { title: 'Dedicated Student', description: '7-day learning streak', icon: '🔥', earned: true },
    { title: 'Expert Level', description: 'Completed 10 courses', icon: '🏆', earned: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{mockUser.name}</h2>
                <p className="text-gray-600">{mockUser.email}</p>
                <p className="text-sm text-gray-500 mt-2">Member since January 2024</p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Enrolled Courses</span>
                  </div>
                  <span className="font-semibold text-gray-900">{enrolledCourses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900">{completedCourses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-600 mr-3" />
                    <span className="text-gray-700">Hours Learned</span>
                  </div>
                  <span className="font-semibold text-gray-900">{mockUser.totalHoursLearned}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Download className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Certificates</span>
                  </div>
                  <span className="font-semibold text-gray-900">{mockUser.certificates}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Edit Profile Form */}
            {isEditing && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Profile</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      achievement.earned
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Progress */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Course Progress</h3>
              <div className="space-y-4">
                {enrolledCourses.map((course) => {
                  const progress = mockProgress.find(p => p.courseId === course.id);
                  return (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                        <span className="text-sm font-medium text-blue-600">
                          {progress?.progressPercentage || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress?.progressPercentage || 0}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{progress?.completedLessons.length || 0} / {course.lessons.length} lessons</span>
                        <span>{progress?.totalTimeSpent || 0} minutes</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Certificates</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Download All
                </button>
              </div>
              {completedCourses.length > 0 ? (
                <div className="space-y-4">
                  {completedCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Award className="h-8 w-8 text-yellow-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600">Completed on January 15, 2024</p>
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No certificates earned yet</p>
                  <p className="text-sm text-gray-500">Complete courses to earn certificates</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}