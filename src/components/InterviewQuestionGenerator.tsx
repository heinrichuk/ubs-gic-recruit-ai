
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, List, FileQuestion } from "lucide-react";
import FileUpload from './FileUpload';
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: number;
  text: string;
  category: string;
}

const InterviewQuestionGenerator: React.FC = () => {
  const [jobSpec, setJobSpec] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("upload");
  const [manualJobSpec, setManualJobSpec] = useState<string>("");
  
  const { toast } = useToast();

  const handleGenerateQuestions = async () => {
    if ((selectedTab === "upload" && (!jobSpec || !cv)) || 
        (selectedTab === "manual" && !manualJobSpec)) {
      toast({
        title: "Missing information",
        description: "Please provide both job specification and CV",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API response
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const generatedQuestions: Question[] = [
        { id: 1, text: "Tell me about your experience with TypeScript and React.", category: "Technical" },
        { id: 2, text: "Describe a challenging project you worked on and how you overcame the obstacles.", category: "Experience" },
        { id: 3, text: "How do you approach testing in your development workflow?", category: "Methodology" },
        { id: 4, text: "What interests you about working at UBS Global Investment Center?", category: "Culture Fit" },
        { id: 5, text: "How do you stay updated with the latest industry trends and technologies?", category: "Professional Development" },
        { id: 6, text: "Describe a situation where you had to learn a new technology quickly.", category: "Adaptability" },
        { id: 7, text: "How would you explain complex technical concepts to non-technical stakeholders?", category: "Communication" },
        { id: 8, text: "What is your approach to debugging and troubleshooting issues?", category: "Problem Solving" },
        { id: 9, text: "Describe your experience working in agile environments.", category: "Process" },
        { id: 10, text: "What are your long-term career goals?", category: "Career Planning" },
      ];
      
      setQuestions(generatedQuestions);
      
      toast({
        title: "Questions generated",
        description: "Interview questions have been created based on the provided information",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Interview Question Generator</CardTitle>
          <CardDescription>
            Generate tailored interview questions based on job specification and candidate's CV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="manual">Enter Manually</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 mt-2">
              <FileUpload 
                label="Upload Job Specification" 
                onChange={setJobSpec}
              />
              
              <FileUpload 
                label="Upload Candidate CV" 
                onChange={setCv}
              />
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4 mt-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Job Specification Details
                </label>
                <Textarea 
                  value={manualJobSpec}
                  onChange={(e) => setManualJobSpec(e.target.value)}
                  placeholder="Enter key details from the job specification..."
                  rows={8}
                  className="w-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateQuestions}
            disabled={isGenerating || 
              (selectedTab === "upload" && (!jobSpec || !cv)) || 
              (selectedTab === "manual" && !manualJobSpec)
            }
            className="w-full bg-ubs-red hover:bg-ubs-red/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Generating Questions...
              </>
            ) : (
              <>
                <FileQuestion className="mr-2 h-4 w-4" /> 
                Generate Interview Questions
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Generated Interview Questions</CardTitle>
          <CardDescription>
            Tailored questions based on the job requirements and candidate's profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          {questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question) => (
                <div 
                  key={question.id}
                  className="p-3 bg-gray-50 border rounded-md"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{question.text}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-ubs-red/10 text-ubs-red">
                      {question.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <List className="h-16 w-16 mb-4 opacity-30" />
              <p>Interview questions will appear here after generation</p>
              <p className="text-sm mt-2">Upload the required files or enter job specification details to get started</p>
            </div>
          )}
        </CardContent>
        {questions.length > 0 && (
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">
              Export Questions
            </Button>
            <Button variant="default" className="bg-ubs-red hover:bg-ubs-red/90">
              Save Questions
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default InterviewQuestionGenerator;
