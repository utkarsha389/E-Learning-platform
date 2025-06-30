import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lock, BookOpen, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import ProgressBar from '../components/ProgressBar';
import { mockCourses, mockProgress } from '../data/mockData';

export default function Learn() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  const course = mockCourses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const progress = mockProgress.find(p => p.courseId === courseId);

  useEffect(() => {
    if (progress) {
      setCompletedLessons(progress.completedLessons);
    }
  }, [progress]);

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Content not found</h2>
          <Link to="/dashboard" className="text-blue-600 hover:underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentLessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  const nextLesson = course.lessons[currentLessonIndex + 1];
  const prevLesson = course.lessons[currentLessonIndex - 1];
  const courseProgress = (completedLessons.length / course.lessons.length) * 100;

  const handleLessonComplete = () => {
    if (!completedLessons.includes(lessonId!)) {
      setCompletedLessons([...completedLessons, lessonId!]);
    }
  };

  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to={`/course/${courseId}`}
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Back to Course</span>
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                  {course.title}
                </h1>
                <div className="hidden sm:block">
                  <ProgressBar progress={courseProgress} size="sm" showLabel={false} />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden md:inline">
                Lesson {currentLessonIndex + 1} of {course.lessons.length}
              </span>
              <div className="text-sm font-medium text-blue-600">
                {Math.round(courseProgress)}% Complete
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <VideoPlayer
                videoUrl={lesson.videoUrl}
                title={lesson.title}
                onComplete={handleLessonComplete}
              />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {isLessonCompleted(lessonId!) ? (
                      <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleLessonComplete}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div>
                    {prevLesson ? (
                      <Link
                        to={`/learn/${courseId}/${prevLesson.id}`}
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous: {prevLesson.title}
                      </Link>
                    ) : (
                      <span className="text-gray-400">First lesson</span>
                    )}
                  </div>
                  
                  <div>
                    {nextLesson ? (
                      <Link
                        to={`/learn/${courseId}/${nextLesson.id}`}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Next: {nextLesson.title}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    ) : (
                      <div className="text-center">
                        <div className="text-green-600 font-medium mb-2">🎉 Course Complete!</div>
                        <Link
                          to="/dashboard"
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Back to Dashboard
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Course Content</h3>
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="mb-6">
                <ProgressBar progress={courseProgress} size="sm" />
                <div className="text-xs text-gray-600 mt-1">
                  {completedLessons.length} of {course.lessons.length} lessons complete
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {course.lessons.map((courseLesson, index) => (
                  <Link
                    key={courseLesson.id}
                    to={`/learn/${courseId}/${courseLesson.id}`}
                    className={`block p-3 rounded-lg border transition-colors ${
                      courseLesson.id === lessonId
                        ? 'bg-blue-50 border-blue-200'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {isLessonCompleted(courseLesson.id) ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : courseLesson.isLocked ? (
                          <Lock className="h-5 w-5 text-gray-400" />
                        ) : (
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            courseLesson.id === lessonId
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {courseLesson.id === lessonId && (
                              <div className="w-full h-full bg-white rounded-full scale-50"></div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {index + 1}. {courseLesson.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.floor(courseLesson.duration / 60)}:{String(courseLesson.duration % 60).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}