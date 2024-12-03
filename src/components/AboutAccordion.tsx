import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const AboutAccordion = () => {
  return (
    <div className="mt-7 p-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Why to use URL Sharpener?</AccordionTrigger>
          <AccordionContent>
            You should use the URL Sharpener because it&apos;s free, easy to
            use, and helps you share your long URLs more effectively. You can
            also customize your shortened URLs and make them more memorable.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does the URL Sharpener works?</AccordionTrigger>
          <AccordionContent>
            The URL Sharpener works by taking a long URL and shortening it to a
            more manageable length. It then redirects the shortened URL to the
            original long URL when visited.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What makes the URL Sharpener special?
          </AccordionTrigger>
          <AccordionContent>
            The URL Sharpener is special because it&apos;s simple, fast, and
            secure. You can generate QR codes for your shortened URLs and track
            the number of clicks on them along with the location of the visitors
            and the devices they used.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AboutAccordion;
