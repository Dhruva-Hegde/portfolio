-- Contact messages from public visitors
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact message
CREATE POLICY "Anyone can insert contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) > 0 AND char_length(name) <= 100
  AND char_length(email) > 0 AND char_length(email) <= 255
  AND char_length(message) > 0 AND char_length(message) <= 1000
);

-- Only authenticated users (the owner via dashboard) can read
CREATE POLICY "Authenticated users can read contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);