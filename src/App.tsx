import React, { useState } from 'react';
import { generatePDFReport, generateExcelReport, copyDashboardLink } from './utils/exportUtils';
import { 
  Upload, 
  FileText, 
  Brain, 
  BarChart3, 
  Download, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Ship,
  Calendar,
  DollarSign
} from 'lucide-react';

type DemoStep = 'intro' | 'upload' | 'processing' | 'extraction' | 'calculation' | 'results' | 'dashboard' | 'export';

interface ExtractedEvent {
  timestamp: string;
  event: string;
  status: 'operational' | 'waiting' | 'delay';
  description: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('intro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string>('');

  const extractedEvents: ExtractedEvent[] = [
    { timestamp: '2024-01-15 08:30', event: 'Vessel Arrival', status: 'operational', description: 'MV PACIFIC GLORY arrived at anchorage' },
    { timestamp: '2024-01-15 09:15', event: 'NOR Tendered', status: 'operational', description: 'Notice of Readiness tendered to terminal' },
    { timestamp: '2024-01-15 14:20', event: 'Berth Available', status: 'operational', description: 'Terminal confirmed berth availability' },
    { timestamp: '2024-01-15 15:45', event: 'Loading Commenced', status: 'operational', description: 'Cargo operations started' },
    { timestamp: '2024-01-16 03:30', event: 'Weather Delay', status: 'delay', description: 'Operations suspended due to heavy rain' },
    { timestamp: '2024-01-16 08:15', event: 'Loading Resumed', status: 'operational', description: 'Weather cleared, operations resumed' },
    { timestamp: '2024-01-16 22:45', event: 'Loading Completed', status: 'operational', description: 'All cargo loaded, vessel ready to sail' }
  ];

  const laytimeData = {
    vesselName: 'MV PACIFIC GLORY',
    port: 'Hamburg, Germany',
    cargo: 'Containerized Goods',
    charterParty: 'GENCON 1994',
    laycanPeriod: '72 hours',
    totalTimeUsed: '38.25 hours',
    excludedTime: '4.75 hours (Weather)',
    netLaytime: '33.5 hours',
    balance: '+38.5 hours',
    dispatch: '$15,400',
    status: 'Under Laytime'
  };

  const handlePDFDownload = () => {
    generatePDFReport(laytimeData, extractedEvents);
  };

  const handleExcelDownload = () => {
    generateExcelReport(laytimeData, extractedEvents);
  };

  const handleCopyLink = () => {
    copyDashboardLink();
  };

  const handleFileUpload = () => {
    setUploadedFile('SOF_PACIFIC_GLORY_Jan2024.pdf');
    setCurrentStep('processing');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('extraction');
    }, 3000);
  };

  const progressSteps = [
    'Extracting vessel data',
    'Identifying time events',
    'Parsing cargo operations',
    'Detecting delays & exceptions',
    'Applying laytime rules'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Ship className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">SoF Event Extractor</h1>
            <span className="text-blue-300 text-sm">Laytime Intelligence</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              {/* <p className="text-white text-sm font-medium">Live Demo</p> */}
              {/* <p className="text-blue-300 text-xs">Hackathon 2025</p> */}
            </div>
          </div>
        </div>
      </header>

      {/* Intro Screen */}
      {currentStep === 'intro' && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">The Problem</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Manual laytime calculation from Statement of Facts documents is <span className="text-red-400 font-semibold">time-consuming</span>, 
                <span className="text-red-400 font-semibold"> error-prone</span>, and often leads to <span className="text-red-400 font-semibold">costly disputes</span> 
                in maritime operations.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Clock className="w-12 h-12 text-orange-400 mb-4 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Hours of Manual Work</h3>
                <p className="text-gray-300 text-sm">Analysts spend 4-8 hours per SoF document</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <AlertTriangle className="w-12 h-12 text-red-400 mb-4 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Human Errors</h3>
                <p className="text-gray-300 text-sm">Calculation mistakes lead to disputes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <DollarSign className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Financial Impact</h3>
                <p className="text-gray-300 text-sm">Disputes can cost $50K+ per incident</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                <Brain className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Our Solution</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Automated SoF event extraction with intelligent laytime calculation, 
                delivering <span className="text-green-400 font-semibold">instant results</span> and 
                <span className="text-green-400 font-semibold"> transparent visualizations</span>.
              </p>
            </div>

            <button 
              onClick={() => setCurrentStep('upload')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Live Demo →
            </button>
          </div>
        </div>
      )}

      {/* Upload Screen */}
      {currentStep === 'upload' && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Step 1: Upload SoF Document</h2>
            <p className="text-gray-300 mb-8">Upload your Statement of Facts in PDF, Excel, or Word format</p>
            
            <div className="bg-white/10 backdrop-blur-sm border-2 border-dashed border-blue-400 rounded-lg p-12 mb-6">
              <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Drag & Drop Your SoF Document</h3>
              <p className="text-gray-300 mb-6">or click to browse files</p>
              
              <div className="bg-green-500/20 border border-green-400 rounded-lg p-4 inline-block">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-green-400" />
                  <span className="text-white font-medium">SOF_PACIFIC_GLORY_Jan2024.pdf</span>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handleFileUpload}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Processing →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Screen */}
      {currentStep === 'processing' && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Step 2: AI Processing</h2>
            <p className="text-gray-300 mb-8">Our intelligent system is extracting events and analyzing your document...</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-6">
              <div className="animate-spin w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-6"></div>
              
              <div className="space-y-4">
                {progressSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${index < 3 ? 'bg-green-400' : index === 3 ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
                    <span className={`${index < 3 ? 'text-green-300' : index === 3 ? 'text-blue-300' : 'text-gray-400'}`}>
                      {step}
                    </span>
                    {index < 3 && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extraction Results */}
      {currentStep === 'extraction' && (
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Step 3: Event Extraction Results</h2>
              <p className="text-gray-300">AI successfully extracted 7 key events from your SoF document</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <div className="grid gap-4">
                {extractedEvents.map((event, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg border-l-4 ${
                    event.status === 'operational' ? 'border-green-400 bg-green-500/10' :
                    event.status === 'waiting' ? 'border-yellow-400 bg-yellow-500/10' :
                    'border-red-400 bg-red-500/10'
                  }`}>
                    <div className={`w-4 h-4 rounded-full ${
                      event.status === 'operational' ? 'bg-green-400' :
                      event.status === 'waiting' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{event.event}</span>
                        <span className="text-gray-300 text-sm">{event.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setCurrentStep('calculation')}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Apply Laytime Rules →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calculation Screen */}
      {currentStep === 'calculation' && (
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Step 4: Rule Engine Calculation</h2>
              <p className="text-gray-300">Calculating laytime used vs. allowed, excluding weather delays</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Clock className="w-6 h-6 text-blue-400 mr-2" />
                  Laytime Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Laytime Allowed:</span>
                    <span className="text-white font-semibold">{laytimeData.laycanPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Time Used:</span>
                    <span className="text-white font-semibold">{laytimeData.totalTimeUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Excluded Time:</span>
                    <span className="text-yellow-400 font-semibold">{laytimeData.excludedTime}</span>
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between">
                    <span className="text-gray-300">Net Laytime:</span>
                    <span className="text-green-400 font-semibold">{laytimeData.netLaytime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 text-green-400 mr-2" />
                  Financial Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Status:</span>
                    <span className="text-green-400 font-semibold">{laytimeData.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Time Balance:</span>
                    <span className="text-green-400 font-semibold">{laytimeData.balance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Dispatch Due:</span>
                    <span className="text-green-400 font-semibold text-xl">{laytimeData.dispatch}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setCurrentStep('results')}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                View Results →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Screen */}
      {currentStep === 'results' && (
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Step 5: Laytime Statement</h2>
              <p className="text-gray-300">Professional laytime statement ready for stakeholders</p>
            </div>

            <div className="bg-white rounded-lg p-8 mb-6 text-black">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">LAYTIME STATEMENT</h3>
                <p className="text-gray-600">MV PACIFIC GLORY - January 2024</p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-bold mb-3 text-blue-600">Vessel Details</h4>
                  <div className="space-y-1 text-sm">
                    <div>Vessel: MV PACIFIC GLORY</div>
                    <div>Port: Hamburg, Germany</div>
                    <div>Cargo: Containerized Goods</div>
                    <div>Charter Party: GENCON 1994</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-blue-600">Laytime Terms</h4>
                  <div className="space-y-1 text-sm">
                    <div>Laytime Allowed: 72 hours</div>
                    <div>Rate: PWWD SHEX</div>
                    <div>Demurrage: $8,500/day</div>
                    <div>Dispatch: $4,250/day</div>
                  </div>
                </div>
              </div>

              <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-gray-300 p-2 text-left">Date/Time</th>
                    <th className="border border-gray-300 p-2 text-left">Event</th>
                    <th className="border border-gray-300 p-2 text-left">Time Used</th>
                    <th className="border border-gray-300 p-2 text-left">Exceptions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-2">15/01 08:30</td><td className="border border-gray-300 p-2">Vessel Arrival</td><td className="border border-gray-300 p-2">-</td><td className="border border-gray-300 p-2">-</td></tr>
                  <tr><td className="border border-gray-300 p-2">15/01 09:15</td><td className="border border-gray-300 p-2">NOR Tendered</td><td className="border border-gray-300 p-2">Laytime Starts</td><td className="border border-gray-300 p-2">-</td></tr>
                  <tr><td className="border border-gray-300 p-2">16/01 03:30-08:15</td><td className="border border-gray-300 p-2">Weather Delay</td><td className="border border-gray-300 p-2">-</td><td className="border border-gray-300 p-2">4h 45m excluded</td></tr>
                  <tr><td className="border border-gray-300 p-2">16/01 22:45</td><td className="border border-gray-300 p-2">Loading Complete</td><td className="border border-gray-300 p-2">33h 30m</td><td className="border border-gray-300 p-2">-</td></tr>
                </tbody>
              </table>

              <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>DISPATCH PAYABLE:</span>
                  <span className="text-green-600">USD $15,400</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Balance: +38.5 hours × $4,250/day × (38.5/24) = $15,400
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setCurrentStep('dashboard')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                View Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Screen */}
      {currentStep === 'dashboard' && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Visualization Dashboard</h2>
              <p className="text-gray-300">Interactive timeline with real-time laytime intelligence</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">Time Saved</p>
                    <p className="text-white text-2xl font-bold">38.5h</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Efficiency</p>
                    <p className="text-white text-2xl font-bold">91.2%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Dispatch</p>
                    <p className="text-white text-2xl font-bold">$15.4K</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg p-4 border border-orange-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm font-medium">Status</p>
                    <p className="text-white text-lg font-bold">On Time</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Interactive Timeline</h3>
              <div className="relative">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span className="text-gray-300 text-sm">Operations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span className="text-gray-300 text-sm">Waiting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-400 rounded"></div>
                    <span className="text-gray-300 text-sm">Delays</span>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 h-8">
                    <div className="bg-green-400 h-full rounded" style={{width: '25%'}}></div>
                    <div className="bg-yellow-400 h-full rounded" style={{width: '15%'}}></div>
                    <div className="bg-green-400 h-full rounded" style={{width: '35%'}}></div>
                    <div className="bg-red-400 h-full rounded" style={{width: '10%'}}></div>
                    <div className="bg-green-400 h-full rounded" style={{width: '15%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Jan 15, 08:30</span>
                    <span>Jan 15, 12:00</span>
                    <span>Jan 16, 06:00</span>
                    <span>Jan 16, 18:00</span>
                    <span>Jan 16, 22:45</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setCurrentStep('export')}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Export Report →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Screen */}
      {currentStep === 'export' && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Export & Share</h2>
            <p className="text-gray-300 mb-8">Generate professional reports for all stakeholders</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-blue-400 transition-colors cursor-pointer">
                <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">PDF Report</h3>
                <p className="text-gray-300 text-sm">Complete laytime statement with calculations</p>
                <button 
                  onClick={handlePDFDownload}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                >
                  Download PDF
                </button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-green-400 transition-colors cursor-pointer">
                <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Excel Analysis</h3>
                <p className="text-gray-300 text-sm">Detailed spreadsheet with all calculations</p>
                <button 
                  onClick={handleExcelDownload}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                >
                  Download Excel
                </button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-purple-400 transition-colors cursor-pointer">
                <Download className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Dashboard Link</h3>
                <p className="text-gray-300 text-sm">Share interactive dashboard with team</p>
                <button 
                  onClick={handleCopyLink}
                  className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-8 border border-green-400/30">
              
              <p className="text-xl text-gray-300 mb-6">
                Our solution reduces manual workload by <span className="text-green-400 font-bold">80%</span>, 
                eliminates costly disputes and brings transparency to maritime laytime settlement.
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-green-400">80%</p>
                  <p className="text-gray-300 text-sm">Time Saved</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-400">100%</p>
                  <p className="text-gray-300 text-sm">Accuracy</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-400">$50K+</p>
                  <p className="text-gray-300 text-sm">Dispute Prevention</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentStep('intro')}
              className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              ← Restart Demo
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;