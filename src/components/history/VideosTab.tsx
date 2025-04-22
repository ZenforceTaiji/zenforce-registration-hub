
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const VideosTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TaijiQuan Videos</CardTitle>
        <CardDescription>
          Visual demonstrations of forms, techniques, and philosophical concepts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="bg-black rounded-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center p-6">
                  <p className="mb-2">Video player placeholder</p>
                  <p className="text-sm">Videos will be added in a future update</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <p className="text-gray-600">Video thumbnail placeholder</p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Yang Style 24 Form</h4>
                <p className="text-sm text-gray-500 mt-1">Complete demonstration with instructions</p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <p className="text-gray-600">Video thumbnail placeholder</p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Chen Style Fundamentals</h4>
                <p className="text-sm text-gray-500 mt-1">Silk-reeling exercises and principles</p>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <p className="text-gray-600">Video thumbnail placeholder</p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Understanding Yin-Yang in Movement</h4>
                <p className="text-sm text-gray-500 mt-1">Practical applications of philosophical principles</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
