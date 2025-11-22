-- Supabase Storage Setup Script
-- Run this in Supabase SQL Editor to create buckets and policies

-- Note: Buckets must be created via Dashboard or API, not SQL
-- This script only sets up the policies

-- Policy for artifacts bucket (images)
-- Allow anyone to read (SELECT)
INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Public Access for artifacts',
  'artifacts',
  '(bucket_id = ''artifacts''::text)',
  '(bucket_id = ''artifacts''::text)'
);

-- Allow anyone to upload (INSERT) - for admin panel
INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Allow uploads to artifacts',
  'artifacts',
  '(bucket_id = ''artifacts''::text)',
  '(bucket_id = ''artifacts''::text)'
);

-- Policy for audio bucket
INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Public Access for audio',
  'audio',
  '(bucket_id = ''audio''::text)',
  '(bucket_id = ''audio''::text)'
);

INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Allow uploads to audio',
  'audio',
  '(bucket_id = ''audio''::text)',
  '(bucket_id = ''audio''::text)'
);

-- Policy for videos bucket
INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Public Access for videos',
  'videos',
  '(bucket_id = ''videos''::text)',
  '(bucket_id = ''videos''::text)'
);

INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Allow uploads to videos',
  'videos',
  '(bucket_id = ''videos''::text)',
  '(bucket_id = ''videos''::text)'
);

-- Policy for models bucket
INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Public Access for models',
  'models',
  '(bucket_id = ''models''::text)',
  '(bucket_id = ''models''::text)'
);

INSERT INTO storage.policies (name, bucket_id, definition, check_definition)
VALUES (
  'Allow uploads to models',
  'models',
  '(bucket_id = ''models''::text)',
  '(bucket_id = ''models''::text)'
);

