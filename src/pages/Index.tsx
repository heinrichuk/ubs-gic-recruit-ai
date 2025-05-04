
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobSpecGenerator from '@/components/JobSpecGenerator';
import InterviewQuestionGenerator from '@/components/InterviewQuestionGenerator';
import { Button } from '@/components/ui/button';
import { FileText, Users, Info } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("job-specs");

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-ubs-darkGray md:text-4xl">
            UBS GIC Recruitment
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Create job specifications and generate tailored interview questions for candidates
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button 
              variant={activeTab === "job-specs" ? "default" : "outline"} 
              className={activeTab === "job-specs" ? "bg-ubs-red hover:bg-ubs-red/90" : ""}
              onClick={() => setActiveTab("job-specs")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Job Specifications
            </Button>
            <Button 
              variant={activeTab === "interviews" ? "default" : "outline"} 
              className={activeTab === "interviews" ? "bg-ubs-red hover:bg-ubs-red/90" : ""}
              onClick={() => setActiveTab("interviews")}
            >
              <Users className="mr-2 h-4 w-4" />
              Interview Questions
            </Button>
            <Button 
              variant={activeTab === "about" ? "default" : "outline"} 
              className={activeTab === "about" ? "bg-ubs-red hover:bg-ubs-red/90" : ""}
              onClick={() => setActiveTab("about")}
            >
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>
          </div>
        </div>

        <div className="mt-8">
          {activeTab === "job-specs" && <JobSpecGenerator />}
          {activeTab === "interviews" && <InterviewQuestionGenerator />}
          {activeTab === "about" && (
            <div className="prose max-w-none">
              <h2>About UBS GIC Recruitment</h2>
              <p>
                The UBS Global Investment Center (GIC) Recruitment tool is designed to streamline the hiring process by leveraging AI to generate detailed job specifications and tailored interview questions.
              </p>
              <p>
                This application connects to Azure ChatGPT chat completion API to provide intelligent suggestions and automate parts of the recruitment workflow, allowing HR professionals and hiring managers to focus on finding the best talent.
              </p>
              <h3>Key Features</h3>
              <ul>
                <li>Generate job specifications from templates</li>
                <li>Upload existing job specifications or CVs</li>
                <li>Create tailored interview questions based on job requirements and candidate profiles</li>
                <li>Export and save generated content for future reference</li>
              </ul>
              <h3>Get Started</h3>
              <p>
                Select "Job Specifications" to create or upload job requirements, or choose "Interview Questions" to generate tailored questions for your candidates.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
