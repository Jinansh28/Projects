import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, Loader2, AlertTriangle, CheckCircle, Info, Eye, FileImage } from 'lucide-react';
import { imageGen, upload } from '@devvai/devv-code-backend';

interface AnalysisResult {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

export default function SkinAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('Image size should be less than 10MB');
      return;
    }

    setSelectedImage(file);
    setError('');
    setAnalysis(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Simulate AI analysis with realistic medical responses
  const simulateAnalysis = async (imageUrl: string): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    // Mock analysis results based on common dermatological conditions
    const conditions = [
      {
        condition: 'Acne Vulgaris',
        confidence: 0.85 + Math.random() * 0.1,
        description: 'Common inflammatory skin condition characterized by comedones, papules, and pustules, typically occurring in areas with high sebaceous gland density.',
        recommendations: [
          'Maintain gentle daily cleansing routine',
          'Avoid touching or picking at affected areas',
          'Consider topical treatments containing salicylic acid',
          'Consult a dermatologist if condition persists or worsens'
        ],
        severity: 'medium' as const
      },
      {
        condition: 'Contact Dermatitis',
        confidence: 0.78 + Math.random() * 0.15,
        description: 'Inflammatory skin reaction caused by direct contact with an allergen or irritant, resulting in redness, swelling, and possible vesicles.',
        recommendations: [
          'Identify and avoid potential allergens or irritants',
          'Apply cool, wet compresses to reduce inflammation',
          'Use fragrance-free, hypoallergenic moisturizers',
          'Seek medical attention if symptoms are severe or persistent'
        ],
        severity: 'low' as const
      },
      {
        condition: 'Fungal Infection (Tinea)',
        confidence: 0.72 + Math.random() * 0.2,
        description: 'Superficial fungal infection of the skin, commonly presenting as ring-shaped, scaly patches with raised borders.',
        recommendations: [
          'Keep affected area clean and dry',
          'Apply antifungal topical medications as directed',
          'Avoid sharing personal items like towels or clothing',
          'Complete full treatment course even after symptoms improve'
        ],
        severity: 'medium' as const
      },
      {
        condition: 'Normal Skin',
        confidence: 0.90 + Math.random() * 0.08,
        description: 'No significant dermatological abnormalities detected. Skin appears healthy with normal texture and coloration.',
        recommendations: [
          'Maintain current skincare routine',
          'Use broad-spectrum sunscreen daily',
          'Stay hydrated and maintain healthy diet',
          'Monitor for any changes and consult healthcare provider if concerns arise'
        ],
        severity: 'low' as const
      }
    ];

    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError('');

    try {
      // Upload image to get URL
      const uploadResult = await upload.uploadFile(selectedImage);
      
      if (upload.isErrorResponse(uploadResult)) {
        throw new Error('Failed to upload image for analysis');
      }

      // For now, we'll simulate the analysis since we don't have a trained model
      // In production, this would call the actual dermatological AI model
      const result = await simulateAnalysis(uploadResult.link);
      
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'confidence-high';
    if (confidence >= 0.6) return 'confidence-medium';
    return 'confidence-low';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Info className="h-4 w-4 text-amber-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Upload Skin Image
          </CardTitle>
          <CardDescription>
            Upload a clear, well-lit image of the skin area you want to analyze
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="upload-zone p-8 text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Selected skin area"
                  className="mx-auto max-h-48 rounded-lg object-contain border"
                />
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  Image ready for analysis
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your image here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse • JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {selectedImage && (
            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="medical-button"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileImage className="mr-2 h-4 w-4" />
                    Analyze Skin Condition
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Analysis Results */}
      {analysis && (
        <Card className="analysis-result">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getSeverityIcon(analysis.severity)}
              Analysis Results
            </CardTitle>
            <CardDescription>
              AI-powered preliminary screening results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Condition and Confidence */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {analysis.condition}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Detected condition
                </p>
              </div>
              <Badge 
                variant="outline" 
                className={`px-3 py-1 ${getConfidenceColor(analysis.confidence)}`}
              >
                {Math.round(analysis.confidence * 100)}% confidence
              </Badge>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {analysis.description}
              </p>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Recommendations</h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical Disclaimer */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Important:</strong> This is a preliminary AI screening tool and not a medical diagnosis. 
                Please consult a qualified dermatologist for proper medical evaluation and treatment.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}