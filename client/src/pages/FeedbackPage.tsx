import React, { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import type { Feedback } from '../types';
import { BrandLogo } from '../components/BrandLogo';


export const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [serviceReceived, setServiceReceived] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const loadApprovedFeedbacks = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchApprovedFeedbacks();
        setFeedbacks(data);
      } catch (err) {
        console.error('Failed to load feedback:', err);
      } finally {
        setLoading(false);
      }
    };
    loadApprovedFeedbacks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const res = await apiService.submitFeedback({
        patientName,
        serviceReceived,
        rating,
        reviewText,
        location: location || 'Alanganallur, Madurai',
      });

      setSubmitSuccess(res.message || 'Thank you! Your review has been submitted for admin verification.');
      setPatientName('');
      setServiceReceived('');
      setReviewText('');
      setLocation('');
      setRating(5);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex justify-center mb-1">
          <BrandLogo size="lg" linkToHome={false} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Feedback & Family Testimonials
        </h1>
        <p className="text-slate-600 text-sm">
          Read genuine experiences from families in Alanganallur & Madurai who trusted Sri Kannathal Home Care & Nursing Service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: List of Approved Reviews */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-heading">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            Verified Patient Feedback ({feedbacks.length})
          </h2>

          {loading ? (
            <div className="text-center py-12 text-xs text-slate-500 font-semibold">
              Loading patient reviews...
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="space-y-4">
              {feedbacks.map((fb) => (
                <div key={fb._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">{new Date(fb.createdAt).toLocaleDateString()}</span>
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                    "{fb.reviewText}"
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900">{fb.patientName}</h4>
                      <p className="text-emerald-700 text-[11px] font-semibold">{fb.serviceReceived}</p>
                    </div>
                    <span className="text-slate-400 text-[11px]">{fb.location || 'Alanganallur'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-500 text-xs">
              No approved reviews available right now. Be the first to share your experience!
            </div>
          )}
        </div>

        {/* Right Column: Submit Feedback Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 font-heading">Share Your Experience</h3>
            <p className="text-xs text-slate-500">Your feedback helps us continuously improve our nursing care.</p>
          </div>

          {submitSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-900 text-base">Feedback Submitted!</h4>
              <p className="text-xs text-emerald-700">{submitSuccess}</p>
              <button
                onClick={() => setSubmitSuccess('')}
                className="text-xs font-bold text-emerald-800 underline pt-2"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name / Patient Family Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Ramanathan"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Received <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elderly Caregiver / Wound Dressing"
                  value={serviceReceived}
                  onChange={(e) => setServiceReceived(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Overall Rating <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{rating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Review / Comments <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write a few lines about nurse punctuality, staff behavior, hygiene..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Location (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thanichiyam Road, Alanganallur"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting Review...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
