'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Card } from '../ui/Card';
import { ArrowLeft } from 'lucide-react';

export function RoundForm({
  initialData = { level: '', duration: '', startTime: '', title: '', description: '' },
  isEditMode = false,
  onSubmit,
  isLoading = false,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.level?.trim()) newErrors.level = 'Level is required';
    if (!formData.duration?.trim()) newErrors.duration = 'Duration is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await onSubmit(formData);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const borderClass = (field) => (errors[field] ? 'border-red-500' : 'border-gray-700');

  return (
    <div className="min-h-screen bg-[#050406]">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <Card className="bg-[#1a1a1d] border-gray-800 p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEditMode ? 'Edit Round' : 'Create New Round'}
          </h1>
          <p className="text-gray-400 mb-8">
            {isEditMode
              ? 'Update the round information below'
              : 'Fill in the details to create a new round'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-gray-300 block mb-2">
                Round Title *
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Qualification Round 1"
                value={formData.title}
                onChange={handleChange}
                className={`bg-[#050406] text-white ${borderClass('title')}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300 block mb-2">
                Description
              </Label>
              <textarea
                id="description"
                name="description"
                placeholder="Optional description..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#050406] text-white border border-gray-700 rounded-md px-3 py-2 focus:border-[#ff7a00] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <Label htmlFor="level" className="text-gray-300 block mb-2">
                Level *
              </Label>
              <Input
                id="level"
                name="level"
                placeholder="e.g., Beginner"
                value={formData.level}
                onChange={handleChange}
                className={`bg-[#050406] text-white ${borderClass('level')}`}
              />
              {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
            </div>

            <div>
              <Label htmlFor="duration" className="text-gray-300 block mb-2">
                Duration *
              </Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 2 hours"
                value={formData.duration}
                onChange={handleChange}
                className={`bg-[#050406] text-white ${borderClass('duration')}`}
              />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            <div>
              <Label htmlFor="startTime" className="text-gray-300 block mb-2">
                Start Time *
              </Label>
              <Input
                id="startTime"
                name="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={handleChange}
                className={`bg-[#050406] text-white ${borderClass('startTime')}`}
              />
              {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-800">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#ff7a00] text-white hover:bg-[#ff9933] disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : isEditMode ? 'Update Round' : 'Create Round'}
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-900 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
