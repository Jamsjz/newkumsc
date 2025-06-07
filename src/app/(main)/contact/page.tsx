// src/app/contact/page.tsx
"use client"; // This must be a client component to handle interaction

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles the form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form redirect
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/jamsjz63@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.ok) {
        toast.success("Message has been sent successfully!");
        (event.target as HTMLFormElement).reset(); // Reset form fields
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
            Contact Us
          </CardTitle>
          <CardDescription>
            Have a question or want to get in touch? Fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* We now use the `onSubmit` handler */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* These hidden inputs can still be useful for FormSubmit's features */}
            <input
              type="hidden"
              name="_subject"
              value="New contact form submission!"
            />
            <input type="hidden" name="_captcha" value="false" />

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                required
                rows={5}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
