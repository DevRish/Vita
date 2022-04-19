import React from 'react';

export interface AppbarProps {
  window?: () => Window;
  children: React.ReactElement;
}

export interface OptionType {
  label: string;
  value: number;
}

export interface Topic {
  value: number;
  topicName: string;
  motivation: MotivationEnumType;
  description: string;
  emojiIcon: string;
  emojiBadge: string;
}

export type DayEnumType =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface DurationType {
  start_hour: number;
  end_hour: number;
  available: boolean;
  locale: string;
}

export type Timeslot = Record<DayEnumType, DurationType>;

export interface TopicSchemaType {
  value: number;
  emojiIcon: string;
  emojiBadge: string;
  motivation: string;
  topicName: string;
  topicDescription: string;
}

export interface MentorSchemaType {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  image_link: string;
  job_title: string;
  company: string;
  description: string[];
  expertise: string[];
  language: string[];
  linkedIn: string;
  is_mentoring: boolean;
  topics: number[];
  time_slot: Timeslot;
}

export type MotivationEnumType =
  | 'Job Search'
  | 'Career Advice'
  | 'Mentorship'
  | 'Leadership'
  | 'Skills';
