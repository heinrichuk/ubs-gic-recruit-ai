
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText } from "lucide-react";
import FileUpload from './FileUpload';
import { useToast } from "@/components/ui/use-toast";

const jobTemplates = [
  { id: "software-engineer", name: "Software Engineer" },
  { id: "data-scientist", name: "Data Scientist" },
  { id: "product-manager", name: "Product Manager" },
  { id: "ux-designer", name: "UX Designer" },
  { id: "financial-analyst", name: "Financial Analyst" },
];

const JobSpecGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [generatedJobSpec, setGeneratedJobSpec] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [uploadedJobSpec, setUploadedJobSpec] = useState<File | null>(null);
  
  const { toast } = useToast();

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    
    // Set some default requirements based on template
    switch(value) {
      case "software-engineer":
        setRequirements("Experience with React, TypeScript, and cloud technologies. Strong problem-solving skills and computer science fundamentals.");
        break;
      case "data-scientist":
        setRequirements("Experience with Python, data analysis, machine learning, and statistical modeling. Knowledge of data visualization tools.");
        break;
      case "product-manager":
        setRequirements("Experience in product management, agile methodologies, and stakeholder management. Strong analytical and communication skills.");
        break;
      case "ux-designer":
        setRequirements("Experience with UX/UI design tools, user research, wireframing, and prototyping. Strong portfolio demonstrating design thinking.");
        break;
      case "financial-analyst":
        setRequirements("Experience in financial analysis, modeling, and forecasting. Knowledge of financial markets and investment products.");
        break;
    }
  };

  const generateJobSpec = async () => {
    if (!position || !requirements) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedText = `
# ${position} - Job Specification

## Overview
We are looking for an exceptional ${position} to join our team at UBS Global Investment Center. The ideal candidate will bring a wealth of experience and innovative thinking to help drive our business forward.

## Requirements
${requirements}

## Responsibilities
- Drive innovation and excellence in our products and services
- Collaborate with cross-functional teams to deliver high-quality solutions
- Contribute to the strategic vision and roadmap
- Mentor junior team members and foster a culture of learning

## Qualifications
- Bachelor's degree in a relevant field
- 3+ years of experience in a similar role
- Strong communication and interpersonal skills
- Ability to work in a fast-paced, dynamic environment

## Benefits
- Competitive salary and bonus structure
- Comprehensive health and retirement benefits
- Professional development opportunities
- Flexible working arrangements
      `;
      
      setGeneratedJobSpec(generatedText);
      
      toast({
        title: "Job specification generated",
        description: "Your job specification has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate job specification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (file: File | null) => {
    setUploadedJobSpec(file);
    
    if (file) {
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
      
      // Clear the generated spec when uploading a file
      setGeneratedJobSpec("");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Job Specification</CardTitle>
          <CardDescription>
            Create a detailed job specification from a template or upload an existing one
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jobTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position Title</Label>
            <Input 
              id="position" 
              value={position} 
              onChange={e => setPosition(e.target.value)} 
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requirements">Key Requirements</Label>
            <Textarea 
              id="requirements" 
              value={requirements} 
              onChange={e => setRequirements(e.target.value)}
              placeholder="List the key skills and experience required"
              rows={4}
            />
          </div>

          <div className="pt-4">
            <FileUpload 
              label="Or upload an existing job specification" 
              onChange={handleFileUpload}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={generateJobSpec} 
            disabled={isGenerating || (!position && !requirements && !uploadedJobSpec)}
            className="w-full bg-ubs-red hover:bg-ubs-red/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Generating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" /> 
                Generate Job Specification
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Job Specification Preview</CardTitle>
          <CardDescription>
            Preview your generated job specification here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedJobSpec ? (
            <div className="bg-white border rounded-md p-4 whitespace-pre-line prose max-w-none">
              {generatedJobSpec}
            </div>
          ) : uploadedJobSpec ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <FileText className="h-12 w-12 text-ubs-red mb-2" />
              <h3 className="text-lg font-medium">{uploadedJobSpec.name}</h3>
              <p className="text-sm text-gray-500">
                File uploaded successfully. In a real application, we would parse and display the content.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <FileText className="h-16 w-16 mb-4 opacity-30" />
              <p>Your job specification will appear here after generation</p>
              <p className="text-sm mt-2">Complete the form or upload a file to get started</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {(generatedJobSpec || uploadedJobSpec) && (
            <Button variant="outline">
              Save as Draft
            </Button>
          )}
          {(generatedJobSpec || uploadedJobSpec) && (
            <Button variant="default" className="bg-ubs-red hover:bg-ubs-red/90">
              Use This Specification
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobSpecGenerator;
