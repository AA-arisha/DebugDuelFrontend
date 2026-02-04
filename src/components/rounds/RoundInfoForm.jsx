'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Card } from '../ui/Card';

export function RoundInfoForm({
  level = 'Level 1',
  duration = '2 hours',
  startTime = '2025-01-25T10:00:00',
  onSave,
}) {
  const [formData, setFormData] = useState({ level, duration, startTime });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  return (
    <Card className="bg-[#1a1a1d] border-gray-800 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Round Information</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="level" className="text-gray-300 block mb-2">
            Level
          </Label>
          <Input
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-[#050406] border-gray-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="duration" className="text-gray-300 block mb-2">
            Duration
          </Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-[#050406] border-gray-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="startTime" className="text-gray-300 block mb-2">
            Start Time
          </Label>
          <Input
            id="startTime"
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-[#050406] border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#ff7a00] text-white hover:bg-[#ff9933]"
          >
            Edit
          </Button>
        ) : (
          <>
            <Button onClick={handleSave} className="bg-[#ff7a00] text-white hover:bg-[#ff9933]">
              Save
            </Button>
            <Button
              onClick={() => {
                setFormData({ level, duration, startTime });
                setIsEditing(false);
              }}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-900 bg-transparent"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
