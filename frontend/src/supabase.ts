import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://egnuwqvtuxctatbhwrfq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnbnV3cXZ0dXhjdGF0Ymh3cmZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1NjkzNjYsImV4cCI6MjAzMDE0NTM2Nn0.qjnn3QVci-R5EtYZq6D2IQbWRkKilsKJ67JxD2MBvcA"
);

export default supabase;
